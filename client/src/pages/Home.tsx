import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clock, Layers3, Radar, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { articles, topics } from "@/lib/content";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const topicIcons = {
  AI: Sparkles,
  "Digital Life": ShieldCheck,
  "Future of Work": Layers3,
  "Emerging Tech": Radar,
};

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<(typeof topics)[number]>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visibleArticles = useMemo(
    () => activeTopic === "All" ? articles : articles.filter((article) => article.category === activeTopic),
    [activeTopic],
  );

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f3e8] text-[#071a2e]">
      <SiteHeader />
      <main>
        <section className="relative isolate min-h-[700px] overflow-hidden bg-[#06162b] text-[#f8f3e8] sm:min-h-[740px]">
          <img
            src="/manus-storage/hero-editorial_106889d6.jpg"
            alt="Abstract editorial collage showing the human side of emerging technology"
            className="absolute inset-0 h-full w-full object-cover object-[67%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#06162b_0%,rgba(6,22,43,.98)_31%,rgba(6,22,43,.45)_65%,rgba(6,22,43,.08)_100%)]" />
          <div className="absolute inset-0 opacity-20 noise-layer" />
          <div className="container relative flex min-h-[700px] items-center py-20 sm:min-h-[740px]">
            <div className="max-w-[720px] pb-16 pt-8 sm:pb-8">
              <div className="reveal-1 mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#b7c8dc]">
                <span className="h-2 w-2 rounded-full bg-[#c7dd2b] shadow-[0_0_0_5px_rgba(199,221,43,.14)]" />
                Technology, translated
              </div>
              <h1 className="reveal-2 font-display text-[clamp(4rem,9vw,8.4rem)] font-medium leading-[0.78] tracking-[-0.055em]">
                Where tech<br />meets <em className="font-normal text-[#ff6048]">real life.</em>
              </h1>
              <p className="reveal-3 mt-9 max-w-xl text-base leading-7 text-[#c6d1de] sm:text-lg sm:leading-8">
                Clear, curious notes on AI, digital culture, and the choices shaping what comes next—without the hype fog.
              </p>
              <div className="reveal-4 mt-9 flex flex-wrap gap-3">
                <a href="#latest" className="group flex h-13 items-center gap-3 rounded-full bg-[#ff6048] px-6 text-sm font-bold text-[#071a2e] transition hover:-translate-y-1 hover:bg-[#ff765f]">
                  Read the latest <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <Link href="/about" className="flex h-13 items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-bold transition hover:border-white/50 hover:bg-white/10">
                  Meet Dr. Vicki <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-[#06162b]/76 backdrop-blur-xl">
            <div className="container grid gap-0 md:grid-cols-[180px_1fr_170px]">
              <div className="flex items-center py-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c7dd2b] md:border-r md:border-white/15">The weekly question</div>
              <div className="py-5 font-display text-lg sm:text-xl md:px-7">What should AI never decide alone?</div>
              <div className="hidden items-center justify-end gap-2 py-5 text-xs text-[#91a3b8] md:flex"><span className="h-px w-7 bg-[#91a3b8]" /> Issue No. 24</div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#132841]/12 bg-[#c7dd2b] py-4 text-[#071a2e]">
          <div className="container flex items-center gap-5 overflow-hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.22em]">
            <span>Fresh perspective</span><span className="text-[#ff6048]">✦</span><span>Practical context</span><span className="text-[#ff6048]">✦</span><span>Human questions</span><span className="text-[#ff6048]">✦</span><span>No hype required</span>
          </div>
        </section>

        <section className="container py-20 sm:py-28">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Featured field note</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-6xl">A clearer view of what’s changing.</h2>
            </div>
            <span className="hidden text-xs font-semibold text-[#627086] md:block">SEPTEMBER 06 — 7 MIN</span>
          </div>
          <Link href={`/post/${articles[0].slug}`} className="feature-card group grid overflow-hidden rounded-[30px] bg-[#071a2e] text-[#f8f3e8] lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-[360px] overflow-hidden sm:min-h-[520px]">
              <img src={articles[0].image} alt={articles[0].imageAlt} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
              <span className="absolute left-5 top-5 rounded-full bg-[#f8f3e8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#071a2e]">Editor’s pick</span>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-12 lg:p-14">
              <div>
                <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c7dd2b]">{articles[0].category}</p>
                <h3 className="font-display text-4xl font-medium leading-[0.98] tracking-[-0.035em] sm:text-5xl">{articles[0].title}</h3>
                <p className="mt-6 max-w-md text-sm leading-7 text-[#b7c5d5] sm:text-base">{articles[0].excerpt}</p>
              </div>
              <div className="mt-12 flex items-end justify-between">
                <span className="flex items-center gap-2 text-xs text-[#8fa2b7]"><Clock className="h-3.5 w-3.5" /> {articles[0].readTime}</span>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#ff6048] text-[#071a2e] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105"><ArrowUpRight className="h-5 w-5" /></span>
              </div>
            </div>
          </Link>
        </section>

        <section id="latest" className="scroll-mt-24 border-y border-[#132841]/12 bg-[#fffaf1]">
          <div className="container py-20 sm:py-28">
            <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
              <aside>
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow">The notebook</p>
                  <h2 className="mt-4 font-display text-5xl font-medium leading-none tracking-[-0.04em]">Latest<br /><em className="text-[#315f95]">thinking.</em></h2>
                  <p className="mt-5 max-w-[220px] text-sm leading-6 text-[#627086]">Short on noise. Long on context. Choose a thread to follow.</p>
                  <div id="topics" className="mt-8 flex scroll-mt-28 flex-wrap gap-2 lg:flex-col lg:items-start">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setActiveTopic(topic)}
                        className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeTopic === topic ? "bg-[#071a2e] text-[#f8f3e8]" : "bg-[#e9e5dc] text-[#536073] hover:bg-[#dcd7cb]"}`}
                        aria-pressed={activeTopic === topic}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              <div>
                <div className="grid gap-x-7 gap-y-12 md:grid-cols-2">
                  {visibleArticles.slice(activeTopic === "All" ? 1 : 0).map((article, index) => (
                    <article key={article.slug} className={`article-card group ${index === 0 && activeTopic === "All" ? "md:col-span-2" : ""}`}>
                      <Link href={`/post/${article.slug}`} className="block">
                        <div className={`relative overflow-hidden rounded-[22px] ${index === 0 && activeTopic === "All" ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                          <img src={article.image} alt={article.imageAlt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#071a2e]/35 to-transparent opacity-30" />
                          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#f8f3e8]/90 text-[#071a2e] opacity-0 shadow-lg backdrop-blur transition duration-200 group-hover:rotate-3 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
                        </div>
                        <div className="pt-5">
                          <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.18em]">
                            <span className="text-[#ff6048]">{article.category}</span>
                            <span className="text-[#7b8796]">{article.readTime}</span>
                          </div>
                          <h3 className={`mt-3 font-display font-semibold leading-[1.02] tracking-[-0.025em] transition group-hover:text-[#315f95] ${index === 0 && activeTopic === "All" ? "text-3xl sm:text-4xl" : "text-[28px]"}`}>{article.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-[#627086]">{article.excerpt}</p>
                          <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold">Read note <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
                {visibleArticles.length === 0 && <p className="rounded-3xl bg-[#f0ece3] p-10 font-display text-2xl">More notes in this thread are on the way.</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#315f95] text-white">
          <div className="container py-20 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c7dd2b]">Dr. Vicki’s lens</p>
                <h2 className="mt-5 max-w-lg font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl">Technology is never <em>just</em> technology.</h2>
              </div>
              <div className="grid gap-px overflow-hidden rounded-[26px] bg-white/15 sm:grid-cols-3">
                {[
                  ["01", "Who gains?", "Look past the feature and notice whose choices become easier."],
                  ["02", "Who decides?", "Find the judgment hidden inside the system and name its owner."],
                  ["03", "What changes?", "Measure the new behavior—not simply the new capability."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="bg-[#315f95] p-7 transition hover:bg-[#2a568a] sm:min-h-[260px]">
                    <span className="font-display text-3xl text-[#c7dd2b]">{number}</span>
                    <h3 className="mt-14 font-display text-2xl font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#d6e0ed]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#ff6048] text-[#071a2e]">
          <div className="container grid items-center gap-10 py-20 lg:grid-cols-[1fr_.9fr] lg:py-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em]">Behind the notes</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl font-medium leading-[0.92] tracking-[-0.045em] sm:text-7xl">Curiosity with a point of view.</h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#172b40]">Dr. Vicki writes for people who want to understand technology without becoming trapped in its vocabulary. The goal is practical clarity—and better questions.</p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#071a2e] px-6 py-3.5 text-sm font-bold text-[#f8f3e8] transition hover:-translate-y-1">Read the story <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[480px]">
              <div className="absolute inset-[8%] rounded-full bg-[#c7dd2b]" />
              <div className="absolute inset-[19%] grid place-items-center rounded-full border-[3px] border-[#071a2e] bg-[#f8f3e8] font-display text-[clamp(6rem,16vw,11rem)] italic">V.</div>
              <div className="absolute right-[5%] top-[13%] grid h-20 w-20 place-items-center rounded-full bg-[#315f95] text-white"><Sparkles className="h-8 w-8" /></div>
              <div className="absolute bottom-[10%] left-[2%] rounded-full border-2 border-[#071a2e] bg-[#ff6048] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] -rotate-6">Stay curious</div>
            </div>
          </div>
        </section>

        <section id="newsletter" className="scroll-mt-24 bg-[#f8f3e8]">
          <div className="container py-20 sm:py-28">
            <div className="relative overflow-hidden rounded-[32px] bg-[#071a2e] px-6 py-12 text-[#f8f3e8] sm:px-12 sm:py-16 lg:px-20">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[46px] border-[#315f95] opacity-70" />
              <div className="absolute -bottom-14 right-28 h-32 w-32 rounded-full bg-[#c7dd2b] opacity-90" />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff6048]">One thoughtful email. Every Friday.</p>
                  <h2 className="mt-5 max-w-xl font-display text-5xl font-medium leading-[0.92] tracking-[-0.04em] sm:text-6xl">The week in tech, with the noise turned down.</h2>
                </div>
                <div>
                  {subscribed ? (
                    <div className="flex min-h-16 items-center gap-4 rounded-2xl bg-[#c7dd2b] px-5 text-[#071a2e]">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#071a2e] text-[#c7dd2b]"><Check className="h-4 w-4" /></span>
                      <div><p className="font-bold">You’re on the list.</p><p className="text-xs opacity-75">Your first Friday brief is queued.</p></div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-14 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm outline-none transition placeholder:text-[#8fa2b7] focus:border-[#c7dd2b] focus:ring-2 focus:ring-[#c7dd2b]/25" />
                      <button type="submit" className="h-14 rounded-full bg-[#ff6048] px-6 text-sm font-bold text-[#071a2e] transition hover:-translate-y-0.5 hover:bg-[#ff765f]">Join the brief</button>
                    </form>
                  )}
                  <p className="mt-3 text-[11px] text-[#7f91a7]">No spam. No trend-chasing. Unsubscribe whenever you like.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
