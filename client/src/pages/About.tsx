import { ArrowLeft, ArrowUpRight, BookOpen, Compass, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8f3e8] text-[#071a2e]">
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-[#ff6048]">
          <div className="container grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div>
              <Link href="/" className="mb-14 inline-flex items-center gap-2 text-xs font-bold"><ArrowLeft className="h-4 w-4" /> Back home</Link>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em]">About the voice behind the notes</p>
              <h1 className="mt-6 font-display text-[clamp(4.3rem,9vw,8rem)] font-medium leading-[0.79] tracking-[-0.055em]">Hi, I’m<br /><em>Dr. Vicki.</em></h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#172b40]">I’m a technology educator, translator, and persistent asker of the question: <strong>what does this mean for people?</strong></p>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[510px]">
              <div className="absolute inset-[7%] rounded-full bg-[#c7dd2b] shadow-[18px_18px_0_#071a2e]" />
              <div className="absolute inset-[18%] grid place-items-center rounded-full border-[3px] border-[#071a2e] bg-[#f8f3e8] font-display text-[clamp(7rem,18vw,13rem)] italic">V.</div>
              <div className="absolute right-[1%] top-[12%] rounded-full bg-[#315f95] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white rotate-6">Human first</div>
              <div className="absolute bottom-[8%] left-[0] grid h-24 w-24 place-items-center rounded-full bg-[#071a2e] text-[#ff6048]"><Lightbulb className="h-9 w-9" /></div>
            </div>
          </div>
        </section>

        <section className="container py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Why this publication exists</p>
              <h2 className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-[-0.04em]">Clarity is a form of agency.</h2>
            </div>
            <div className="space-y-7 text-base leading-8 text-[#445267] sm:text-lg">
              <p>Technology stories are often told at the extremes: breathless promise on one side, certain catastrophe on the other. Most of us live in the complicated middle, where a tool can be useful and imperfect at the same time.</p>
              <p>Dr. Vicki’s Tech Talk is a place to slow that conversation down. Each note looks past a launch or buzzword to the behavior, tradeoff, and human choice underneath it.</p>
              <p>You do not need a technical background to belong here. You need curiosity, a healthy respect for evidence, and the willingness to ask one more question.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#132841]/12 bg-[#fffaf1]">
          <div className="container py-20 sm:py-24">
            <p className="eyebrow">The editorial promise</p>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {[
                [Compass, "Orient, don’t overwhelm", "Every note should help you place a new idea inside a larger map."],
                [BookOpen, "Explain the middle", "Definitions matter, but examples and consequences make them useful."],
                [Lightbulb, "Leave a better question", "A strong article opens the door to judgment rather than closing it with certainty."],
              ].map(([Icon, title, copy]) => {
                const IconComponent = Icon as typeof Compass;
                return (
                  <div key={title as string} className="rounded-[24px] bg-[#f0ece3] p-7 sm:p-8">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#c7dd2b]"><IconComponent className="h-5 w-5" /></span>
                    <h3 className="mt-12 font-display text-3xl font-semibold">{title as string}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#627086]">{copy as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container py-20 text-center sm:py-28">
          <p className="eyebrow">Start with a field note</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.94] tracking-[-0.04em] sm:text-7xl">The future is easier to meet when we can name what’s changing.</h2>
          <a href={`${import.meta.env.BASE_URL}#latest`} className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#071a2e] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1">Explore the notebook <ArrowUpRight className="h-4 w-4" /></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
