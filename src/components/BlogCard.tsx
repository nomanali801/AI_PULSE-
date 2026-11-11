import Link from "next/link";
import type { PostMetadata } from "@/lib/mdx";

type BlogCardProps = {
  post: PostMetadata;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex h-full transform flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-slate-800">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
          {post.category}
        </span>
        <span className="text-xs text-slate-500">{post.readTime}</span>
      </div>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        <Link
          className="after:absolute after:inset-0"
          href={`/blog/${post.slug}`}
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 leading-7 text-slate-600">{post.description}</p>
      <div className="mt-6 flex items-center justify-between text-sm">
        <time className="text-slate-500" dateTime={post.date}>
          {new Intl.DateTimeFormat("en", {
            dateStyle: "medium",
            timeZone: "UTC",
          }).format(new Date(`${post.date}T00:00:00Z`))}
        </time>
        <span aria-hidden="true" className="font-semibold text-indigo-600">
          Read article{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
