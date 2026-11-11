import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link
          className="text-lg font-bold tracking-tight text-slate-950 transition hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          href="/"
        >
          AI Pulse<span className="text-indigo-600">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            className="transition hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
            href="/"
          >
            Home
          </Link>
          <Link
            className="transition hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
            href="/"
          >
            Articles
          </Link>
          <Link
            className="transition hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
            href="/privacy"
          >
            Privacy
          </Link>
        </div>
      </nav>
    </header>
  );
}
