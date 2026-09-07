import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Check, Clock, Copy, Quote, Share2, Terminal } from "lucide-react";
import { Link } from "wouter";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import { articles, type ArticleBlock } from "@/lib/content";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

function formatInline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`} className="rounded-md bg-[#071a2e]/7 px-1.5 py-0.5 font-mono text-[.9em] font-semibold text-[#173d68]">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function CodeBlock({ code, language = "Code" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const highlightedCode = useMemo(() => {
    const languageKey = language.toLowerCase();
    const isShell = ["bash", "shell", "sh", "zsh"].includes(languageKey);

    if (isShell) {
      return Prism.highlight(code, Prism.languages.bash, "bash");
    }

    return code
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }, [code, language]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="my-7 overflow-hidden rounded-[20px] bg-[#06162b] shadow-[0_20px_50px_rgba(7,26,46,.13)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[#8fa2b7] sm:px-5">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"><Terminal className="h-3.5 w-3.5 text-[#c7dd2b]" /> {language}</span>
        <button type="button" onClick={copyCode} className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition hover:bg-white/10 hover:text-white" aria-label={`Copy ${language} code`}>
          {copied ? <Check className="h-3.5 w-3.5 text-[#c7dd2b]" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="syntax-code overflow-x-auto p-5 text-[13px] leading-7 text-[#e2eaf2] sm:p-6 sm:text-sm"><code dangerouslySetInnerHTML={{ __html: highlightedCode }} /></pre>
    </div>
  );
}

function ArticleContentBlock({ block }: { block: ArticleBlock }) {
  if (block.type === "paragraph") {
    return <p>{formatInline(block.text)}</p>;
  }
  if (block.type === "code") {
    return <CodeBlock code={block.code} language={block.language} />;
  }
  if (block.type === "list") {
    return (
      <ul className="article-list">
        {block.items.map((item) => <li key={item}>{formatInline(item)}</li>)}
      </ul>
    );
  }
  return (
    <div className="article-tip">
      <span className="article-tip-label">Dr. Vicki’s note</span>
      <p>{formatInline(block.text)}</p>
    </div>
  );
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = article ? `${article.title} | Dr. Vicki’s Tech Talk` : "Article not found | Dr. Vicki’s Tech Talk";
    return () => { document.title = "Dr. Vicki’s Tech Talk"; };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f8f3e8] text-[#071a2e]">
        <SiteHeader />
        <main className="container grid min-h-[65vh] place-items-center py-24 text-center">
          <div>
            <p className="eyebrow">Signal lost</p>
            <h1 className="mt-5 font-display text-6xl">That note isn’t here.</h1>
            <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#071a2e] px-6 py-3 text-sm font-bold text-white"><ArrowLeft className="h-4 w-4" /> Back home</Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  const shareArticle = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, text: article.excerpt, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3e8] text-[#071a2e]">
      <SiteHeader />
      <main>
        <header className="border-b border-[#132841]/12 bg-[#fffaf1]">
          <div className="container py-14 sm:py-20">
            <Link href="/#latest" className="mb-12 inline-flex items-center gap-2 text-xs font-bold text-[#536073] transition hover:text-[#315f95]"><ArrowLeft className="h-4 w-4" /> Back to the notebook</Link>
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff6048]">{article.category}</p>
              <h1 className="mt-6 font-display text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.05em]">{article.title}</h1>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#627086] sm:text-lg">{article.dek}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-[#627086]">
                <span>By Dr. Vicki</span><span className="h-1 w-1 rounded-full bg-[#ff6048]" /><span>{article.date}</span><span className="h-1 w-1 rounded-full bg-[#ff6048]" /><span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container py-8 sm:py-12">
          <img src={article.image} alt={article.imageAlt} className="aspect-[16/8.5] w-full rounded-[26px] object-cover shadow-[0_30px_80px_rgba(7,26,46,.15)]" />
        </div>

        <article className="container grid gap-10 pb-24 pt-10 lg:grid-cols-[180px_minmax(0,700px)_180px] lg:justify-center lg:pt-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7b8796]">In this note</p>
              <ol className="mt-5 space-y-4 border-l border-[#132841]/15 pl-4 text-xs font-semibold leading-5 text-[#627086]">
                {article.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`} className="transition hover:text-[#315f95]">{section.heading}</a></li>)}
              </ol>
            </div>
          </aside>

          <div className="article-body min-w-0">
            <p className="lead-copy">{article.excerpt}</p>
            <div className="my-10 flex gap-4 border-y border-[#132841]/12 py-7 sm:my-14">
              <Quote className="mt-1 h-6 w-6 shrink-0 text-[#ff6048]" />
              <p className="font-display text-2xl font-medium italic leading-8">“{article.quote ?? "Technology earns trust when the boundaries are as visible as the possibilities."}”</p>
            </div>
            {article.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-28">
                <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                {section.blocks?.map((block, blockIndex) => <ArticleContentBlock key={`${section.heading}-${blockIndex}`} block={block} />)}
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{formatInline(paragraph)}</p>)}
              </section>
            ))}
          </div>

          <aside className="lg:block">
            <div className="lg:sticky lg:top-28">
              <button onClick={shareArticle} className="flex items-center gap-2 rounded-full border border-[#132841]/15 bg-white/40 px-4 py-2.5 text-xs font-bold transition hover:bg-white"><Share2 className="h-3.5 w-3.5" /> Share note</button>
              <p className="mt-4 text-[10px] leading-4 text-[#7b8796]">Share sheet opens on supported devices. Otherwise, the link is copied.</p>
            </div>
          </aside>
        </article>

        <section className="border-t border-[#132841]/12 bg-[#fffaf1]">
          <div className="container py-20">
            <div className="mb-8 flex items-end justify-between">
              <div><p className="eyebrow">Keep reading</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Follow the thread.</h2></div>
              <Link href="/#latest" className="hidden items-center gap-2 text-xs font-bold sm:flex">All notes <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-7 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/post/${item.slug}`} className="group grid overflow-hidden rounded-[24px] bg-[#f0ece3] sm:grid-cols-[180px_1fr]">
                  <img src={item.image} alt="" className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-full" />
                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff6048]">{item.category}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-tight group-hover:text-[#315f95]">{item.title}</h3>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold">Read next <ArrowUpRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
