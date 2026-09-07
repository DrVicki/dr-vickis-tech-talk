import { ArrowUpRight, Rss } from "lucide-react";
import { Link } from "wouter";

export default function SiteFooter() {
  return (
    <footer className="bg-[#06162b] text-[#f8f3e8]">
      <div className="container py-12 sm:py-16">
        <div className="grid gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ff6048] font-display text-2xl italic text-[#071a2e]">V.</span>
              <span className="font-display text-2xl font-semibold">Dr. Vicki’s Tech Talk</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#afbdd0]">
              Clear thinking for a changing world. Notes on emerging technology, digital life, and the choices that keep people in the picture.
            </p>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#dce3ea]">
              <a href="/#latest" className="footer-link">Latest notes</a>
              <a href="/#topics" className="footer-link">Browse topics</a>
              <Link href="/about" className="footer-link">About Dr. Vicki</Link>
            </div>
          </div>
          <div>
            <p className="footer-label">Stay curious</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#dce3ea]">
              <a href="/#newsletter" className="footer-link flex items-center gap-2">Join the weekly brief <ArrowUpRight className="h-3.5 w-3.5" /></a>
              <a href="/rss.xml" className="footer-link flex items-center gap-2"><Rss className="h-3.5 w-3.5" /> RSS feed</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#7f91a7] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Dr. Vicki’s Tech Talk. Ideas for humans, not algorithms.</p>
          <p>Read slowly. Ask better questions.</p>
        </div>
      </div>
    </footer>
  );
}
