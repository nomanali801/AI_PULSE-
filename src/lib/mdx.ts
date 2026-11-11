import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
};

export type Post = PostMetadata & {
  content: string;
};

function parsePostMetadata(data: Record<string, unknown>, slug: string): PostMetadata {
  const requiredFields = ["title", "description", "date", "category", "readTime"] as const;

  for (const field of requiredFields) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      throw new Error(`Invalid or missing "${field}" frontmatter in "${slug}.mdx".`);
    }
  }

  const date = data.date as string;
  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Invalid "date" frontmatter in "${slug}.mdx".`);
  }

  return {
    title: data.title as string,
    description: data.description as string,
    date,
    category: data.category as string,
    readTime: data.readTime as string,
    slug,
  };
}

function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.slice(0, -".mdx".length));
}

export function getAllPosts(): PostMetadata[] {
  return getPostSlugs()
    .map((slug) => {
      const filePath = path.join(postsDirectory, `${slug}.mdx`);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return parsePostMetadata(data, slug);
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  if (!/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(slug)) {
    return null;
  }

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { ...parsePostMetadata(data, slug), content };
}
