import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "AI & Digital Hustle Guides",
  description:
    "Actionable guides, zero-cost AI workflows, and strategic blueprints to scale your online income.",
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            AI &amp; AUTOMATION HUB
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Master AI Tools &amp; Modern Digital Side Hustles
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Actionable guides, zero-cost AI workflows, and strategic blueprints
            to scale your online income.
          </p>
          <a
            className="mt-8 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="#latest"
          >
            Explore Guides <span aria-hidden="true" className="ml-2">↓</span>
          </a>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        id="latest"
      >
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">The journal</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Latest articles
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </div>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">
            No articles yet. Add an .mdx file to the content directory to get
            started.
          </p>
        )}
      </section>
    </>
  );
}
