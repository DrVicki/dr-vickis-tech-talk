import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Download,
  Facebook,
  FileSpreadsheet,
  FileText,
  Link2,
  Linkedin,
  Mail,
  Package,
  Quote,
  Share2,
  Terminal,
} from "lucide-react";
import { Link } from "wouter";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import { articles, type ArticleBlock } from "@/lib/content";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const EXCEL_ARTICLE_SLUG = "working-with-excel-data-without-formulas";

const downloadUrl = (fileName: string, storagePath: string) =>
  import.meta.env.VITE_USE_LOCAL_ASSETS === "true"
    ? `${import.meta.env.BASE_URL}assets/downloads/${fileName}`
    : storagePath;

const excelDownloads = {
  checklist: downloadUrl(
    "dr-vicki-excel-ai-checklist.xlsx",
    "/manus-storage/dr-vicki-excel-ai-checklist_390f1540.xlsx",
  ),
  promptPack: downloadUrl(
    "dr-vicki-excel-ai-prompt-pack.zip",
    "/manus-storage/dr-vicki-excel-ai-prompt-pack_79529e38.zip",
  ),
  prompts: [
    {
      label: "Prompt 1",
      title: "Spot trends & assess risk",
      description: "A plain-language first read with an evidence-based confidence note.",
      fileName: "01-spot-trends-and-assess-risk.txt",
      href: downloadUrl(
        "excel-ai-prompts/01-spot-trends-and-assess-risk.txt",
        "/manus-storage/01-spot-trends-and-assess-risk_03838217.txt",
      ),
    },
    {
      label: "Prompt 2",
      title: "Turn findings into action",
      description: "Convert a verified finding into an action, trade-off, and decision trigger.",
      fileName: "02-turn-findings-into-action.txt",
      href: downloadUrl(
        "excel-ai-prompts/02-turn-findings-into-action.txt",
        "/manus-storage/02-turn-findings-into-action_4da42dc6.txt",
      ),
    },
    {
      label: "Prompt 3",
      title: "Build a reusable routine",
      description: "Create standing questions for every weekly or monthly update.",
      fileName: "03-build-a-reusable-routine.txt",
      href: downloadUrl(
        "excel-ai-prompts/03-build-a-reusable-routine.txt",
        "/manus-storage/03-build-a-reusable-routine_d294dc9a.txt",
      ),
    },
  ],
};

function formatInline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded-md bg-[#071a2e]/7 px-1.5 py-0.5 font-mono text-[.9em] font-semibold text-[#173d68]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`} className="font-bold text-[#071a2e]">{part.slice(2, -2)}</strong>;
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
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Terminal className="h-3.5 w-3.5 text-[#c7dd2b]" /> {language}
        </span>
        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition hover:bg-white/10 hover:text-white"
          aria-label={`Copy ${language} code`}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[#c7dd2b]" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="syntax-code overflow-x-auto p-5 text-[13px] leading-7 text-[#e2eaf2] sm:p-6 sm:text-sm">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
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

function ExcelDownloadToolkit() {
  return (
    <div id="downloads" role="region" className="download-toolkit scroll-mt-28" aria-labelledby="downloads-heading">
      <div className="download-toolkit-glow" aria-hidden="true" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c7dd2b]">Download the workflow</p>
            <h2 id="downloads-heading" className="mt-4 font-display text-4xl font-medium leading-[.95] text-white sm:text-5xl">
              Take the Excel AI toolkit with you.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#b8c7d7]">
              Use the prompts to ask better questions, then document the evidence, assumptions, and decision in the companion workbook.
            </p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#dfe8f1]">
            4 files · ready to use
          </span>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          <a
            href={excelDownloads.checklist}
            download="dr-vicki-excel-ai-checklist.xlsx"
            className="download-feature-card group"
          >
            <span className="download-feature-icon"><FileSpreadsheet className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#c7dd2b]">Excel workbook · .xlsx</span>
              <span className="mt-2 block font-display text-2xl font-medium leading-tight text-white">Decision & verification checklist</span>
              <span className="mt-2 block text-xs leading-5 text-[#aebfd0]">Five formatted sheets for the first review, evidence checks, standing questions, and recurring decisions.</span>
            </span>
            <Download className="ml-auto h-5 w-5 shrink-0 text-[#c7dd2b] transition-transform group-hover:translate-y-0.5" />
          </a>

          <a
            href={excelDownloads.promptPack}
            download="dr-vicki-excel-ai-prompt-pack.zip"
            className="download-feature-card group"
          >
            <span className="download-feature-icon"><Package className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#ff806b]">Complete pack · .zip</span>
              <span className="mt-2 block font-display text-2xl font-medium leading-tight text-white">All three prompt templates</span>
              <span className="mt-2 block text-xs leading-5 text-[#aebfd0]">Plain-text files plus a concise guide to the observe, verify, decide, and record sequence.</span>
            </span>
            <Download className="ml-auto h-5 w-5 shrink-0 text-[#ff806b] transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/12" />
          <span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#8296aa]">Or choose one prompt</span>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {excelDownloads.prompts.map((prompt) => (
            <a key={prompt.fileName} href={prompt.href} download={prompt.fileName} className="download-prompt-card group">
              <span className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#8fa2b7]">
                  <FileText className="h-3.5 w-3.5 text-[#c7dd2b]" /> {prompt.label} · .txt
                </span>
                <Download className="h-4 w-4 text-[#8fa2b7] transition group-hover:text-[#c7dd2b]" />
              </span>
              <span className="mt-4 block font-display text-xl font-medium leading-tight text-white">{prompt.title}</span>
              <span className="mt-2 block text-[11px] leading-5 text-[#9fb0c1]">{prompt.description}</span>
            </a>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-2 text-[10px] leading-4 text-[#8296aa]">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c7dd2b]" />
          Built for Microsoft Excel, but the prompt templates also work with other approved AI tools that can analyze spreadsheet data.
        </p>
      </div>
    </div>
  );
}

function SocialShare({ title, excerpt }: { title: string; excerpt: string }) {
  const [copied, setCopied] = useState(false);
  const canonicalUrl = typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}`;
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} — ${excerpt}`);

  const copyLink = async () => {
    await navigator.clipboard.writeText(canonicalUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url: canonicalUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyLink();
  };

  return (
    <div className="share-panel" aria-label="Share this article">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#071a2e] text-[#c7dd2b]"><Share2 className="h-4 w-4" /></span>
        <div>
          <p className="text-xs font-bold text-[#071a2e]">Share this note</p>
          <p className="mt-0.5 text-[9px] leading-3 text-[#7b8796]">Send the useful part onward.</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-2">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="share-action"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" /><span>LinkedIn</span>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="share-action"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4" /><span>Facebook</span>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noreferrer"
          className="share-action"
          aria-label="Share on X"
          title="Share on X"
        >
          <span className="text-sm font-black leading-none">X</span><span>Post</span>
        </a>
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${excerpt}\n\n${canonicalUrl}`)}`}
          className="share-action"
          aria-label="Share by email"
          title="Share by email"
        >
          <Mail className="h-4 w-4" /><span>Email</span>
        </a>
        <button type="button" onClick={copyLink} className="share-action" aria-label="Copy article link" title="Copy article link">
          {copied ? <Check className="h-4 w-4 text-[#315f95]" /> : <Link2 className="h-4 w-4" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
        <button type="button" onClick={nativeShare} className="share-action" aria-label="Open device share menu" title="More sharing options">
          <Share2 className="h-4 w-4" /><span>More</span>
        </button>
      </div>
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
  const hasExcelToolkit = article.slug === EXCEL_ARTICLE_SLUG;

  return (
    <div className="min-h-screen bg-[#f8f3e8] text-[#071a2e]">
      <SiteHeader />
      <main>
        <header className="border-b border-[#132841]/12 bg-[#fffaf1]">
          <div className="container py-14 sm:py-20">
            <a href={`${import.meta.env.BASE_URL}#latest`} className="mb-12 inline-flex items-center gap-2 text-xs font-bold text-[#536073] transition hover:text-[#315f95]"><ArrowLeft className="h-4 w-4" /> Back to the notebook</a>
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
                {hasExcelToolkit && <li><a href="#downloads" className="font-bold text-[#315f95] transition hover:text-[#ff6048]">Download the toolkit</a></li>}
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
            {hasExcelToolkit && <ExcelDownloadToolkit />}
          </div>

          <aside>
            <div className="lg:sticky lg:top-28">
              <SocialShare title={article.title} excerpt={article.excerpt} />
            </div>
          </aside>
        </article>

        <section className="border-t border-[#132841]/12 bg-[#fffaf1]">
          <div className="container py-20">
            <div className="mb-8 flex items-end justify-between">
              <div><p className="eyebrow">Keep reading</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Follow the thread.</h2></div>
              <a href={`${import.meta.env.BASE_URL}#latest`} className="hidden items-center gap-2 text-xs font-bold sm:flex">All notes <ArrowUpRight className="h-4 w-4" /></a>
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
