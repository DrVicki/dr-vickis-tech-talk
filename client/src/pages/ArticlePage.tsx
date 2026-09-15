import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Facebook,
  FileSpreadsheet,
  FileText,
  Github,
  Link2,
  Linkedin,
  Mail,
  Package,
  Quote,
  Send,
  Share2,
  Table2,
  Terminal,
  Trophy,
} from "lucide-react";
import { Link } from "wouter";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import { articles, type ArticleBlock } from "@/lib/content";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const EXCEL_ARTICLE_SLUG = "working-with-excel-data-without-formulas";
const FORMULA_ARTICLE_SLUG = "how-to-let-ai-write-excel-formulas-for-you";

const downloadUrl = (fileName: string, storagePath: string) =>
  import.meta.env.VITE_USE_LOCAL_ASSETS === "true"
    ? `${import.meta.env.BASE_URL}assets/downloads/${fileName}`
    : storagePath;

const findPromptText = (slug: string, heading: string) => {
  const section = articles.find((article) => article.slug === slug)?.sections.find((item) => item.heading === heading);
  return section?.blocks?.find((block) => block.type === "code")?.code ?? "";
};

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the selection-based copy path when clipboard permission is unavailable.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

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
      text: findPromptText(EXCEL_ARTICLE_SLUG, "Prompt 1: Spot trends and assess risk"),
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
      text: findPromptText(EXCEL_ARTICLE_SLUG, "Prompt 2: Turn the finding into an action"),
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
      text: findPromptText(EXCEL_ARTICLE_SLUG, "Prompt 3: Build a reusable routine"),
      href: downloadUrl(
        "excel-ai-prompts/03-build-a-reusable-routine.txt",
        "/manus-storage/03-build-a-reusable-routine_d294dc9a.txt",
      ),
    },
  ],
};

const formulaDownloads = {
  workbook: downloadUrl(
    "dr-vicki-excel-formula-practice.xlsx",
    "/manus-storage/dr-vicki-excel-formula-practice_9be279f3.xlsx",
  ),
  promptPack: downloadUrl(
    "dr-vicki-excel-formula-prompt-pack.zip",
    "/manus-storage/dr-vicki-excel-formula-prompt-pack_ae8fe2d2.zip",
  ),
  prompts: [
    {
      label: "Prompt 1",
      title: "Translate goal to formula",
      description: "Turn a plain-language calculation into compatible Excel syntax with explicit assumptions.",
      fileName: "01-translate-goal-to-formula.txt",
      text: findPromptText(FORMULA_ARTICLE_SLUG, "Prompt 1: Translate the goal into a formula"),
      href: downloadUrl(
        "excel-formula-prompts/01-translate-goal-to-formula.txt",
        "/manus-storage/01-translate-goal-to-formula_c0a1d330.txt",
      ),
    },
    {
      label: "Prompt 2",
      title: "Stress-test edge cases",
      description: "Probe blanks, zeros, errors, duplicates, mixed formats, and silent failure modes.",
      fileName: "02-stress-test-edge-cases.txt",
      text: findPromptText(FORMULA_ARTICLE_SLUG, "Prompt 2: Stress-test the ugly rows"),
      href: downloadUrl(
        "excel-formula-prompts/02-stress-test-edge-cases.txt",
        "/manus-storage/02-stress-test-edge-cases_0e73d31e.txt",
      ),
    },
    {
      label: "Prompt 3",
      title: "Build a reusable library",
      description: "Save the business rule, placeholders, assumptions, and minimum tests with the formula.",
      fileName: "03-build-reusable-formula-library.txt",
      text: findPromptText(FORMULA_ARTICLE_SLUG, "Prompt 3: Make the reasoning reusable"),
      href: downloadUrl(
        "excel-formula-prompts/03-build-reusable-formula-library.txt",
        "/manus-storage/03-build-reusable-formula-library_9d7c55ec.txt",
      ),
    },
  ],
};

function formatInline(text: string): ReactNode[] {
  return text.split(/(\[(?:[^\[\]]|\[[^\]]*\])+\]\(https?:\/\/[^)\s]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    const link = part.match(/^\[((?:[^\[\]]|\[[^\]]*\])+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) {
      return <a key={`${part}-${index}`} href={link[2]} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#315f95] underline decoration-[#315f95]/40 underline-offset-4 hover:decoration-current">{formatInline(link[1])}</a>;
    }
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
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function CopyControl({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center justify-center gap-2 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] transition ${className}`}
      aria-label={label}
      aria-live="polite"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#c7dd2b]" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function CodeBlock({ code, language = "Code" }: { code: string; language?: string }) {
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

  const copyLabel = language.toLowerCase().includes("formula")
    ? "Copy formula"
    : language.toLowerCase() === "plaintext"
      ? "Copy prompt"
      : "Copy code";

  return (
    <div className="my-7 overflow-hidden rounded-[20px] bg-[#06162b] shadow-[0_20px_50px_rgba(7,26,46,.13)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[#8fa2b7] sm:px-5">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Terminal className="h-3.5 w-3.5 text-[#c7dd2b]" /> {language}
        </span>
        <CopyControl text={code} label={copyLabel} className="px-3 py-1.5 hover:bg-white/10 hover:text-white" />
      </div>
      <pre className="syntax-code overflow-x-auto p-5 text-[13px] leading-7 text-[#e2eaf2] sm:p-6 sm:text-sm">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}

function DatasetBlock({ block }: { block: Extract<ArticleBlock, { type: "dataset" }> }) {
  return (
    <div className="my-8 overflow-hidden rounded-[22px] border border-[#132841]/12 bg-[#fffaf1] shadow-[0_18px_55px_rgba(7,26,46,.08)]">
      <div className="flex items-center gap-3 border-b border-[#132841]/10 bg-[#071a2e] px-5 py-4 text-white sm:px-6">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c7dd2b] text-[#071a2e]"><Table2 className="h-4 w-4" /></span>
        <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#dbe4ee]">{block.caption}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#dce8f4] text-[#071a2e]">
              {block.headers.map((header) => <th key={header} className="border-b border-[#132841]/12 px-4 py-3 font-bold sm:px-5">{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${block.caption}-${rowIndex}`} className={rowIndex % 2 === 0 ? "bg-white/60" : "bg-[#f2ede3]"}>
                {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className="border-b border-[#132841]/8 px-4 py-3 font-medium text-[#445267] sm:px-5">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(block.formula || block.note) && <div className="px-4 pb-5 sm:px-6 sm:pb-6">
        {block.formula && <CodeBlock code={block.formula} language="Excel formula" />}
        {block.note && <div className="-mt-2 flex items-start gap-2 text-xs leading-5 text-[#627086]">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#315f95]" />
          <span>{formatInline(block.note)}</span>
        </div>}
      </div>}
    </div>
  );
}

function ResourceLinks({ block }: { block: Extract<ArticleBlock, { type: "links" }> }) {
  const featured = block.variant === "featured";

  return (
    <div className={`my-8 grid gap-3 ${featured ? "grid-cols-1" : "sm:grid-cols-2"}`}>
      {block.items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={`group rounded-[18px] p-5 shadow-[0_12px_35px_rgba(7,26,46,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(7,26,46,.11)] ${
            featured
              ? "border border-[#c7dd2b]/40 bg-[#071a2e] sm:p-7"
              : "border border-[#132841]/12 bg-[#fffaf1] hover:border-[#315f95]/40"
          }`}
        >
          <span className="flex items-start justify-between gap-4">
            <span className={`font-display font-semibold leading-tight ${featured ? "text-2xl text-white sm:text-3xl" : "text-xl text-[#071a2e] group-hover:text-[#315f95]"}`}>{item.title}</span>
            <ExternalLink className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-[#c7dd2b]" : "text-[#ff6048]"}`} />
          </span>
          <span className={`mt-3 block leading-6 ${featured ? "max-w-2xl text-sm text-[#c3cfdd]" : "text-xs text-[#627086]"}`}>{item.description}</span>
          <span className={`mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] ${featured ? "rounded-full bg-[#c7dd2b] px-4 py-2 text-[#071a2e]" : "text-[#315f95]"}`}>
            {item.label ?? "Open resource"}
            {featured && <ArrowUpRight className="h-3 w-3" />}
          </span>
        </a>
      ))}
    </div>
  );
}

function ArticleContentBlock({ block }: { block: ArticleBlock }) {
  if (block.type === "paragraph") {
    return <p>{formatInline(block.text)}</p>;
  }
  if (block.type === "subheading") {
    return <h3 className="mb-4 mt-9 font-display text-2xl font-semibold leading-tight text-[#071a2e]">{formatInline(block.text)}</h3>;
  }
  if (block.type === "quote") {
    return <blockquote className="my-8 border-l-4 border-[#ff6048] bg-[#fffaf1] px-6 py-5 font-display text-xl italic leading-8">{formatInline(block.text)}</blockquote>;
  }
  if (block.type === "image") {
    const image = <img src={block.src} alt={block.alt} loading="lazy" className={`h-auto w-full object-contain ${block.compact ? "max-w-[260px]" : "rounded-2xl border border-[#132841]/10"}`} />;
    return <figure className="my-8">{block.href ? <a href={block.href} target="_blank" rel="noopener noreferrer" aria-label={block.alt}>{image}</a> : image}</figure>;
  }
  if (block.type === "code") {
    return <CodeBlock code={block.code} language={block.language} />;
  }
  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul";
    return (
      <List className={`article-list ${block.ordered ? "list-decimal" : ""}`}>
        {block.items.map((item) => <li key={item}>{formatInline(item)}</li>)}
      </List>
    );
  }
  if (block.type === "dataset") {
    return <DatasetBlock block={block} />;
  }
  if (block.type === "links") {
    return <ResourceLinks block={block} />;
  }
  const isPracticePrompt = block.text.startsWith("Practice prompt:");
  const practicePrompt = isPracticePrompt
    ? block.text.replace(/^Practice prompt:\s*[“"]?/, "").replace(/[”"]$/, "")
    : block.text;
  return (
    <div className="article-tip">
      <div className="flex items-center justify-between gap-3">
        <span className="article-tip-label">{isPracticePrompt ? "Practice prompt" : "Dr. Vicki’s note"}</span>
        {isPracticePrompt && (
          <CopyControl
            text={practicePrompt}
            label="Copy prompt"
            className="border border-[#132841]/10 bg-white/65 px-3 py-1.5 text-[#315f95] hover:bg-white"
          />
        )}
      </div>
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
            <div key={prompt.fileName} className="download-prompt-card group">
              <span className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#8fa2b7]">
                  <FileText className="h-3.5 w-3.5 text-[#c7dd2b]" /> {prompt.label} · .txt
                </span>
              </span>
              <span className="mt-4 block font-display text-xl font-medium leading-tight text-white">{prompt.title}</span>
              <span className="mt-2 block text-[11px] leading-5 text-[#9fb0c1]">{prompt.description}</span>
              <span className="mt-5 grid grid-cols-2 gap-2">
                <CopyControl text={prompt.text} label="Copy prompt" className="border border-white/12 bg-white/6 px-2 py-2 text-[#dce6ef] hover:border-[#c7dd2b]/45 hover:bg-white/10" />
                <a href={prompt.href} download={prompt.fileName} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-2 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#dce6ef] hover:border-[#ff806b]/45 hover:bg-white/10">
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </span>
            </div>
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

function FormulaDownloadToolkit() {
  return (
    <div id="downloads" role="region" className="download-toolkit scroll-mt-28" aria-labelledby="formula-downloads-heading">
      <div className="download-toolkit-glow" aria-hidden="true" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c7dd2b]">Download and practice</p>
            <h2 id="formula-downloads-heading" className="mt-4 font-display text-4xl font-medium leading-[.95] text-white sm:text-5xl">
              Put the formula workflow on your desk.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#b8c7d7]">
              Download the three editable prompts, then work through fictional margin, lookup, and invoice-status datasets in the companion workbook.
            </p>
          </div>
          <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#dfe8f1]">
            5 files · practice-ready
          </span>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          <a href={formulaDownloads.workbook} download="dr-vicki-excel-formula-practice.xlsx" className="download-feature-card group">
            <span className="download-feature-icon"><FileSpreadsheet className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#c7dd2b]">Practice workbook · .xlsx</span>
              <span className="mt-2 block font-display text-2xl font-medium leading-tight text-white">Three formula labs + answer key</span>
              <span className="mt-2 block text-xs leading-5 text-[#aebfd0]">Five formatted sheets with fictional datasets, yellow work areas, reference results, and automatic match checks.</span>
            </span>
            <Download className="ml-auto h-5 w-5 shrink-0 text-[#c7dd2b] transition-transform group-hover:translate-y-0.5" />
          </a>

          <a href={formulaDownloads.promptPack} download="dr-vicki-excel-formula-prompt-pack.zip" className="download-feature-card group">
            <span className="download-feature-icon"><Package className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#ff806b]">Complete prompt pack · .zip</span>
              <span className="mt-2 block font-display text-2xl font-medium leading-tight text-white">Translate, test, and save</span>
              <span className="mt-2 block text-xs leading-5 text-[#aebfd0]">Three plain-text templates plus a guide to the formula-first sequence and its human checkpoints.</span>
            </span>
            <Download className="ml-auto h-5 w-5 shrink-0 text-[#ff806b] transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/12" />
          <span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#8296aa]">Or download one prompt</span>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {formulaDownloads.prompts.map((prompt) => (
            <div key={prompt.fileName} className="download-prompt-card group">
              <span className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#8fa2b7]">
                  <FileText className="h-3.5 w-3.5 text-[#c7dd2b]" /> {prompt.label} · .txt
                </span>
              </span>
              <span className="mt-4 block font-display text-xl font-medium leading-tight text-white">{prompt.title}</span>
              <span className="mt-2 block text-[11px] leading-5 text-[#9fb0c1]">{prompt.description}</span>
              <span className="mt-5 grid grid-cols-2 gap-2">
                <CopyControl text={prompt.text} label="Copy prompt" className="border border-white/12 bg-white/6 px-2 py-2 text-[#dce6ef] hover:border-[#c7dd2b]/45 hover:bg-white/10" />
                <a href={prompt.href} download={prompt.fileName} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-2 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#dce6ef] hover:border-[#ff806b]/45 hover:bg-white/10">
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-2 text-[10px] leading-4 text-[#8296aa]">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c7dd2b]" />
          The workbook uses fictional data. Use only an approved AI tool when you move from practice to real organizational data.
        </p>
      </div>
    </div>
  );
}

const challengeBrief = `Dr. Vicki's Formula Challenge: Order Review Queue

Write one Excel formula for G2 and fill it down.

Apply these rules in order:
1. If Priority in E2 is blank, return "Review priority".
2. If Sales in C2 or Cost in D2 is blank, return "Check data".
3. If profit margin ((Sales - Cost) / Sales) is below 20%, return "Escalate".
4. If Sales is at least 5000, return "Fast track".
5. Otherwise, return "Standard".

Return the exact labels shown above. Explain why your test order prevents a blank or low-margin row from receiving the wrong status.`;

type ChallengeIssue = {
  id: number;
  html_url: string;
  title: string;
  body: string | null;
  created_at: string;
  pull_request?: unknown;
  user: { login: string; avatar_url: string } | null;
};

function extractSubmittedFormula(body: string | null) {
  return body?.match(/### Formula\s*\n+```(?:excel)?\s*\n([\s\S]*?)```/i)?.[1]?.trim() ?? "Formula shared in the submission";
}

function FormulaChallenge() {
  const [displayName, setDisplayName] = useState("");
  const [formula, setFormula] = useState("");
  const [explanation, setExplanation] = useState("");
  const [platform, setPlatform] = useState("Microsoft 365");
  const [tests, setTests] = useState({ standard: false, blank: false, margin: false });
  const [submissions, setSubmissions] = useState<ChallengeIssue[]>([]);
  const [galleryStatus, setGalleryStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    if (window.location.hash !== "#formula-challenge") return;
    const scroll = window.setTimeout(() => {
      document.getElementById("formula-challenge")?.scrollIntoView({ block: "start" });
    }, 250);
    return () => window.clearTimeout(scroll);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("https://api.github.com/repos/DrVicki/dr-vickis-tech-talk/issues?state=all&labels=formula-challenge&per_page=6", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Challenge feed unavailable");
        return response.json() as Promise<ChallengeIssue[]>;
      })
      .then((issues) => {
        if (!active) return;
        setSubmissions(issues.filter((issue) => !issue.pull_request));
        setGalleryStatus("ready");
      })
      .catch(() => {
        if (active) setGalleryStatus("unavailable");
      });
    return () => { active = false; };
  }, []);

  const formulaReady = formula.trim().startsWith("=") && formula.trim().length >= 12;
  const explanationReady = explanation.trim().length >= 20;
  const testsReady = Object.values(tests).every(Boolean);
  const readyToSubmit = formulaReady && explanationReady && testsReady;
  const formattedSolution = `Dr. Vicki's Formula Challenge — Order Review Queue\n\nFormula (${platform}):\n${formula.trim() || "[Add your formula]"}\n\nWhy this order works:\n${explanation.trim() || "[Add your explanation]"}\n\nTests: standard row, blank input, and low-margin row.`;

  const submitChallenge = () => {
    if (!readyToSubmit) return;
    const alias = displayName.trim() || "Reader";
    const body = `## Formula Challenge Submission\n\n**Name or alias:** ${alias}\n**Excel version:** ${platform}\n\n### Formula\n\n\`\`\`excel\n${formula.trim()}\n\`\`\`\n\n### Why this order works\n\n${explanation.trim()}\n\n### Tests confirmed\n\n- [x] Standard row\n- [x] Blank priority or missing input\n- [x] Low-margin row\n\n> Submitted from Dr. Vicki's Tech Talk using fictional practice data only.`;
    const url = `https://github.com/DrVicki/dr-vickis-tech-talk/issues/new?labels=formula-challenge&title=${encodeURIComponent(`[Formula challenge] ${alias}'s order review solution`)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="formula-challenge" role="region" className="challenge-lab scroll-mt-28" aria-labelledby="formula-challenge-heading">
      <div className="challenge-orbit challenge-orbit-one" aria-hidden="true" />
      <div className="challenge-orbit challenge-orbit-two" aria-hidden="true" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#071a2e]">Community lab · Challenge 01</p>
            <h2 id="formula-challenge-heading" className="mt-4 font-display text-4xl font-medium leading-[.95] text-[#071a2e] sm:text-5xl">
              Can your formula survive the ugly rows?
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#31435a]">
              Solve the fictional order-review challenge, test the edge cases, then share your approach in the public reader gallery.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#071a2e]/15 bg-white/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#071a2e]">
            <Trophy className="h-3.5 w-3.5 text-[#ff6048]" /> Open challenge
          </span>
        </div>

        <div className="mt-9 overflow-hidden rounded-[20px] border border-[#071a2e]/12 bg-[#fffaf1]/85 shadow-[0_20px_55px_rgba(7,26,46,.09)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#071a2e]/10 bg-[#071a2e] px-5 py-4 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[.18em]">Fictional order review queue</span>
            <CopyControl text={challengeBrief} label="Copy challenge" className="border border-white/12 px-3 py-1.5 text-[#dce6ef] hover:bg-white/10" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left text-xs">
              <thead><tr className="bg-[#dce8f4] text-[#071a2e]">{["Order", "Region", "Sales", "Cost", "Priority", "Expected status"].map((header) => <th key={header} className="px-4 py-3 font-bold">{header}</th>)}</tr></thead>
              <tbody>
                {[
                  ["CH-101", "East", "$6,400", "$4,200", "High", "Fast track"],
                  ["CH-102", "West", "$2,800", "$2,500", "Low", "Escalate"],
                  ["CH-103", "South", "blank", "$1,200", "Medium", "Check data"],
                  ["CH-104", "North", "$4,100", "$2,700", "blank", "Review priority"],
                  ["CH-105", "East", "$4,300", "$3,000", "Medium", "Standard"],
                ].map((row, rowIndex) => (
                  <tr key={row[0]} className={rowIndex % 2 === 0 ? "bg-white/55" : "bg-[#eee9df]/75"}>
                    {row.map((cell) => <td key={cell} className="border-t border-[#071a2e]/8 px-4 py-3 font-medium text-[#425269]">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Blank priority → Review priority",
            "Missing sales or cost → Check data",
            "Margin below 20% → Escalate",
            "Sales of $5,000+ → Fast track",
            "Everything else → Standard",
          ].map((rule, index) => (
            <div key={rule} className="rounded-2xl border border-[#071a2e]/10 bg-white/45 p-3 text-[11px] font-semibold leading-5 text-[#34465d]">
              <span className="mb-2 grid h-6 w-6 place-items-center rounded-full bg-[#071a2e] text-[9px] font-bold text-[#c7dd2b]">{index + 1}</span>
              {rule}
            </div>
          ))}
        </div>

        <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
          <form className="challenge-form" onSubmit={(event) => { event.preventDefault(); submitChallenge(); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="challenge-field">
                <span>Name or alias <span className="font-normal text-[#7b8796]">(optional)</span></span>
                <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={60} placeholder="FormulaFan" />
              </label>
              <label className="challenge-field">
                <span>Excel version</span>
                <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
                  <option>Microsoft 365</option>
                  <option>Excel 2021</option>
                  <option>Excel 2019 or earlier</option>
                  <option>Excel for Mac</option>
                  <option>Other spreadsheet app</option>
                </select>
              </label>
            </div>
            <label className="challenge-field mt-4">
              <span>Your formula for G2</span>
              <textarea value={formula} onChange={(event) => setFormula(event.target.value)} maxLength={600} rows={4} spellCheck={false} placeholder={'=IF(E2="", ... )'} />
            </label>
            <label className="challenge-field mt-4">
              <span>Why does your test order work?</span>
              <textarea value={explanation} onChange={(event) => setExplanation(event.target.value)} maxLength={1200} rows={4} placeholder="I check blank priority first because…" />
            </label>
            <fieldset className="mt-5">
              <legend className="text-[10px] font-bold uppercase tracking-[.18em] text-[#536073]">I tested these rows</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {[
                  ["standard", "Standard result"],
                  ["blank", "Blank input"],
                  ["margin", "Low margin"],
                ].map(([key, label]) => (
                  <label key={key} className="challenge-check">
                    <input type="checkbox" checked={tests[key as keyof typeof tests]} onChange={(event) => setTests((current) => ({ ...current, [key]: event.target.checked }))} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="submit" disabled={!readyToSubmit} className="challenge-submit">
                <Github className="h-4 w-4" /> Review & submit publicly <Send className="h-3.5 w-3.5" />
              </button>
              <CopyControl text={formattedSolution} label="Copy solution" className="border border-[#071a2e]/15 bg-white/55 px-5 py-3 text-[#173d68] hover:bg-white" />
            </div>
            <p className="mt-4 text-[10px] leading-4 text-[#69778a]">Public submission opens a prefilled GitHub issue for your review. A free GitHub account is required. Share only fictional or non-sensitive data.</p>
          </form>

          <aside className="rounded-[20px] bg-[#071a2e] p-5 text-white shadow-[0_20px_55px_rgba(7,26,46,.16)]">
            <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#c7dd2b]">Ready check</p>
            <div className="mt-5 space-y-4">
              {[
                [formulaReady, "Formula starts with ="],
                [explanationReady, "Reasoning is explained"],
                [testsReady, "Three cases tested"],
              ].map(([complete, label]) => (
                <div key={String(label)} className="flex items-center gap-3 text-xs font-semibold text-[#d7e1ea]">
                  <span className={`grid h-7 w-7 place-items-center rounded-full ${complete ? "bg-[#c7dd2b] text-[#071a2e]" : "bg-white/8 text-[#7f93a8]"}`}>
                    {complete ? <Check className="h-4 w-4" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </span>
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="flex items-start gap-2 text-[10px] leading-4 text-[#9eb0c2]"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#ff806b]" />Your formula stays in this browser until you choose a sharing action.</p>
            </div>
          </aside>
        </div>

        <div className="mt-10 border-t border-[#071a2e]/12 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#315f95]">Reader gallery</p><h3 className="mt-2 font-display text-3xl font-semibold text-[#071a2e]">Compare the reasoning, not just the syntax.</h3></div>
            <a href="https://github.com/DrVicki/dr-vickis-tech-talk/issues?q=is%3Aissue%20label%3Aformula-challenge" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#173d68] hover:text-[#ff6048]">Browse all solutions <ExternalLink className="h-3.5 w-3.5" /></a>
          </div>
          {galleryStatus === "loading" && <p className="mt-6 text-xs text-[#627086]">Loading public solutions…</p>}
          {galleryStatus === "unavailable" && <p className="mt-6 rounded-2xl bg-white/45 p-4 text-xs leading-5 text-[#627086]">The live gallery is temporarily unavailable. You can still copy or submit your solution.</p>}
          {galleryStatus === "ready" && submissions.length === 0 && (
            <div className="mt-6 rounded-[20px] border border-dashed border-[#071a2e]/20 bg-white/35 p-6 text-center">
              <Trophy className="mx-auto h-6 w-6 text-[#ff6048]" />
              <p className="mt-3 font-display text-2xl font-semibold text-[#071a2e]">The first solution could be yours.</p>
              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#627086]">Different formulas can be correct. The gallery makes the assumptions and test order visible so readers can learn from the comparison.</p>
            </div>
          )}
          {submissions.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {submissions.map((submission) => (
                <a key={submission.id} href={submission.html_url} target="_blank" rel="noreferrer" className="group rounded-[18px] border border-[#071a2e]/10 bg-white/55 p-5 transition hover:-translate-y-0.5 hover:bg-white">
                  <span className="flex items-center gap-3"><img src={submission.user?.avatar_url} alt="" className="h-8 w-8 rounded-full" /><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#315f95]">{submission.user?.login ?? "Reader"}</span></span>
                  <code className="mt-4 block overflow-hidden text-ellipsis whitespace-nowrap rounded-xl bg-[#071a2e] px-3 py-2.5 font-mono text-[11px] text-[#dce6ef]">{extractSubmittedFormula(submission.body)}</code>
                  <span className="mt-3 flex items-center justify-between gap-4 text-xs font-bold text-[#071a2e]"><span>{submission.title.replace(/^\[Formula challenge\]\s*/i, "")}</span><ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#ff6048]" /></span>
                </a>
              ))}
            </div>
          )}
        </div>
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
    document.title = article ? `${article.title} | Dr. Vicki’s Tech Talk` : "Article not found | Dr. Vicki’s Tech Talk";
    return () => {
      document.title = "Dr. Vicki’s Tech Talk";
    };
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
  const hasFormulaToolkit = article.slug === FORMULA_ARTICLE_SLUG;
  const hasDownloadToolkit = hasExcelToolkit || hasFormulaToolkit;

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
              {article.source && <p className="mx-auto mt-5 max-w-2xl text-xs leading-6 text-[#627086]">Republished from <a href={article.source.href} target="_blank" rel="noopener noreferrer" className="font-bold text-[#315f95] underline underline-offset-4">{article.source.title}</a>. Original publication: {article.source.originalDate}.</p>}
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
                {hasFormulaToolkit && <li><a href="#formula-challenge" className="font-bold text-[#ff6048] transition hover:text-[#315f95]">Reader formula challenge</a></li>}
                {hasDownloadToolkit && <li><a href="#downloads" className="font-bold text-[#315f95] transition hover:text-[#ff6048]">Download the toolkit</a></li>}
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
            {hasFormulaToolkit && <FormulaChallenge />}
            {hasExcelToolkit && <ExcelDownloadToolkit />}
            {hasFormulaToolkit && <FormulaDownloadToolkit />}
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
