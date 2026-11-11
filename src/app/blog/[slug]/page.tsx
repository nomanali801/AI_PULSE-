import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/AdBanner";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type MdxAdBannerProps = {
  format?: string;
};

function MdxAdBanner({ format }: MdxAdBannerProps) {
  return (
    <AdBanner
      className={`my-10${format === "horizontal" ? " min-h-28" : ""}`}
      slot={process.env.NEXT_PUBLIC_ADSENSE_INLINE_SLOT ?? ""}
    />
  );
}

const mdxComponents = {
  AdBanner: MdxAdBanner,
};

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 text-slate-900 dark:text-slate-100 sm:px-6 sm:py-16">
      <header className="mb-10">
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700">
            {post.category}
          </span>
          <time className="text-slate-500" dateTime={post.date}>
            {new Intl.DateTimeFormat("en", {
              dateStyle: "long",
              timeZone: "UTC",
            }).format(new Date(`${post.date}T00:00:00Z`))}
          </time>
          <span className="text-slate-400" aria-hidden="true">·</span>
          <span className="text-slate-500">{post.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          {post.description}
        </p>
      </header>

      <AdBanner
        className="my-10"
        slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT ?? ""}
      />

      <div className="article-content text-slate-700 dark:text-slate-300">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <AdBanner
        className="my-10"
        slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT ?? ""}
      />
    </article>
  );
}
