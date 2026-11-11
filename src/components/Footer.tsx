import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getUTCFullYear()} AI Pulse. All rights reserved.</p>
        <Link
          className="transition hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          href="/privacy"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
