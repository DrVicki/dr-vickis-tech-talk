import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { articles } from "@/lib/content";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [searchOpen]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return articles.slice(0, 4);
    return articles.filter((article) =>
      `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  const closeMenus = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#132841]/10 bg-[#f8f3e8]/92 text-[#071a2e] backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between gap-6">
          <Link href="/" onClick={closeMenus} className="group flex items-center gap-3" aria-label="Dr. Vicki's Tech Talk home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff6048] font-display text-2xl italic text-[#071a2e] transition-transform duration-200 group-hover:-rotate-6">
              V.
            </span>
            <span className="leading-none">
              <span className="block font-display text-[20px] font-semibold tracking-[-0.01em]">Dr. Vicki’s</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#315f95]">Tech Talk</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-semibold lg:flex" aria-label="Primary navigation">
            <Link href="/" className="nav-link">Home</Link>
            <a href="/#latest" className="nav-link">Latest</a>
            <a href="/#topics" className="nav-link">Topics</a>
            <Link href="/about" className="nav-link">About</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-[#132841]/15 bg-white/60 px-3 text-xs font-semibold transition hover:border-[#132841]/35 hover:bg-white"
              aria-label="Search articles"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <a href="/#newsletter" className="hidden h-10 items-center gap-2 rounded-full bg-[#071a2e] px-5 text-xs font-bold text-[#f8f3e8] transition hover:-translate-y-0.5 hover:bg-[#173d68] sm:flex">
              Get the brief <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#132841]/15 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-[#132841]/10 bg-[#f8f3e8] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              <Link href="/" onClick={closeMenus} className="mobile-nav-link">Home</Link>
              <a href="/#latest" onClick={closeMenus} className="mobile-nav-link">Latest</a>
              <a href="/#topics" onClick={closeMenus} className="mobile-nav-link">Topics</a>
              <Link href="/about" onClick={closeMenus} className="mobile-nav-link">About Dr. Vicki</Link>
            </div>
          </nav>
        )}
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[80] bg-[#071a2e]/70 p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label="Search articles">
          <button className="absolute inset-0" onClick={closeMenus} aria-label="Close search" />
          <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-[28px] bg-[#f8f3e8] shadow-2xl sm:mt-16">
            <div className="flex items-center gap-3 border-b border-[#132841]/10 px-5 sm:px-7">
              <Search className="h-5 w-5 text-[#315f95]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-20 min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-[#627086]"
                placeholder="Search ideas, topics, and field notes…"
                aria-label="Search query"
              />
              <button onClick={closeMenus} className="grid h-9 w-9 place-items-center rounded-full bg-[#071a2e]/5 hover:bg-[#071a2e]/10" aria-label="Close search">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-5">
              <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#627086]">
                {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Suggested reading"}
              </p>
              {results.length > 0 ? results.map((article) => (
                <Link key={article.slug} href={`/post/${article.slug}`} onClick={closeMenus} className="group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-white">
                  <img src={article.image} alt="" className="h-16 w-20 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff6048]">{article.category}</span>
                    <span className="block font-display text-lg font-semibold leading-tight group-hover:text-[#315f95]">{article.title}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )) : (
                <div className="px-3 py-12 text-center">
                  <p className="font-display text-2xl">No signal found.</p>
                  <p className="mt-2 text-sm text-[#627086]">Try a broader phrase like “AI” or “privacy.”</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
