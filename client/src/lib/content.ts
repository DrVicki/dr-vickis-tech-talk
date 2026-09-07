export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "AI" | "Digital Life" | "Future of Work" | "Emerging Tech";
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  accent: string;
  dek: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "ai-agents-from-chat-to-action",
    title: "AI agents are moving from chat to action. Here’s what changes.",
    excerpt:
      "The useful question is no longer only what an AI can say—it’s what we should allow it to do.",
    category: "AI",
    date: "September 6, 2026",
    readTime: "7 min read",
    image: "/manus-storage/ai-agents_39842fb7.jpg",
    imageAlt: "Editorial illustration of small AI agents coordinating a workflow with a human decision-maker",
    accent: "coral",
    dek: "A practical field guide to the new layer between a prompt and a finished task—and the human judgment it still needs.",
    sections: [
      {
        heading: "The shift is bigger than a better chatbot",
        paragraphs: [
          "A chatbot waits for a question. An agent is designed to pursue an outcome. It can break a goal into steps, use tools, check intermediate results, and return with work that is closer to finished. That sounds like a subtle distinction, but it changes our relationship with software.",
          "The interface starts to recede. Instead of learning a sequence of menus, a person describes the destination. The system proposes a route. This can make routine work dramatically lighter—but it can also hide important choices inside an apparently smooth experience.",
        ],
      },
      {
        heading: "Autonomy should come in layers",
        paragraphs: [
          "The safest way to think about agents is not as either autonomous or not autonomous. Give them a ladder. At the first rung, the system observes and recommends. At the second, it drafts and waits. At the third, it acts within a narrow boundary. Only later should it handle broader, reversible work without a checkpoint.",
          "The higher the stakes, the more visible the handoff should be. Sending a calendar invitation is different from agreeing to a contract. Sorting files is different from deleting them. Good agent design makes those differences obvious instead of burying them in one universal ‘approve’ button.",
        ],
      },
      {
        heading: "Three questions to ask before you delegate",
        paragraphs: [
          "First: can the action be undone? Second: can you see the evidence behind the recommendation? Third: who notices when the system is confidently wrong? These questions are simple enough to remember and strong enough to expose most weak automation ideas.",
          "Agents are most valuable when they expand human attention—not when they ask us to surrender it. Start with tedious, reviewable work. Keep consequential decisions legible. And measure the quality of the outcome, not merely the speed of the process.",
        ],
      },
    ],
  },
  {
    slug: "personal-data-private-by-design",
    title: "Your personal data deserves a private-by-design future",
    excerpt:
      "Privacy cannot remain a settings page we visit after something goes wrong.",
    category: "Digital Life",
    date: "September 2, 2026",
    readTime: "6 min read",
    image: "/manus-storage/privacy_7f496d62.jpg",
    imageAlt: "Editorial illustration of a sculptural privacy shield surrounded by encrypted data fragments",
    accent: "blue",
    dek: "The next generation of digital products should make the protective choice the easiest choice—not the expert choice.",
    sections: [
      {
        heading: "Privacy is an experience, not a document",
        paragraphs: [
          "Most people encounter privacy as a wall of legal language or a long grid of toggles. That is compliance made visible, not care made tangible. A private-by-design product explains what it collects at the moment that information becomes relevant, and it offers a meaningful alternative.",
          "The best protective systems reduce the amount of trust they require. They collect less, retain it for less time, and process sensitive information as close to the user as possible. Good intentions matter, but architecture matters more.",
        ],
      },
      {
        heading: "Watch the defaults",
        paragraphs: [
          "Defaults quietly define the social contract of a product. If sharing, tracking, or permanent retention is turned on before a person understands it, the interface is making a decision on their behalf.",
          "A useful test is simple: would a reasonable person be surprised by what happens next? If the answer is yes, the design needs another pass. Consent should be specific, reversible, and proportionate to the benefit being offered.",
        ],
      },
      {
        heading: "A better bargain is possible",
        paragraphs: [
          "People should not have to trade dignity for convenience. Product teams can compete on restraint, clear explanations, local processing, and short retention windows. These choices can become visible advantages rather than invisible engineering details.",
        ],
      },
    ],
  },
  {
    slug: "spatial-computing-beyond-headsets",
    title: "Spatial computing is bigger than the headset",
    excerpt:
      "The more interesting future begins when digital information understands the room around us.",
    category: "Emerging Tech",
    date: "August 28, 2026",
    readTime: "5 min read",
    image: "/manus-storage/spatial-computing_af406f8d.jpg",
    imageAlt: "Editorial illustration of a hand arranging spatial interfaces around a globe in a room",
    accent: "lime",
    dek: "Look past the hardware cycle and a more consequential idea comes into focus: computing that is anchored to place.",
    sections: [
      {
        heading: "The room becomes part of the interface",
        paragraphs: [
          "For decades, digital work has been compressed into rectangles. Spatial systems loosen that constraint. Information can attach to a machine, a building, a route, or a shared table. The environment stops being a backdrop and becomes a source of context.",
          "This matters well beyond entertainment. A technician can see guidance beside the equipment being repaired. A student can explore a molecular structure at human scale. A designer can test proportion before an object exists.",
        ],
      },
      {
        heading: "The hard problem is social",
        paragraphs: [
          "When computers perceive a space, they may also perceive the people in it. That creates difficult questions about bystanders, shared ownership, recording, and the meaning of consent in a room with several participants.",
          "The winning systems will not simply render convincing objects. They will make sensing visible, give bystanders agency, and gracefully disappear when attention belongs elsewhere.",
        ],
      },
      {
        heading: "Judge it by what becomes easier",
        paragraphs: [
          "A new device is not automatically a new medium. Look for tasks that become clearer, safer, or more collaborative because information has a place. When spatial computing works, the technology is not the center of the story—the work is.",
        ],
      },
    ],
  },
  {
    slug: "human-checklist-before-adopting-ai",
    title: "A human checklist before your team adopts another AI tool",
    excerpt:
      "Six calm questions can save months of noisy experimentation.",
    category: "Future of Work",
    date: "August 22, 2026",
    readTime: "8 min read",
    image: "/manus-storage/hero-editorial_106889d6.jpg",
    imageAlt: "Editorial collage of a human profile, microchip, hand, and network pathways",
    accent: "navy",
    dek: "A useful AI strategy starts with the work, the people, and the consequences—not the feature list.",
    sections: [
      {
        heading: "Begin with friction, not fascination",
        paragraphs: [
          "New tools arrive wrapped in possibility. Teams often begin by asking where they can use AI, then go looking for a problem. Reverse the order. Find the recurring bottleneck, the neglected queue, or the task that consumes judgment without rewarding it.",
          "A clear problem gives you a baseline. Without one, every demo looks impressive and every pilot can declare victory without improving the work.",
        ],
      },
      {
        heading: "Name the human owner",
        paragraphs: [
          "Every AI-assisted workflow needs a person who owns the outcome. Ownership is not the same as manually reviewing every line. It means someone understands the standard, can inspect the evidence, and has the authority to stop or change the process.",
        ],
      },
      {
        heading: "Measure the right thing",
        paragraphs: [
          "Time saved is useful but incomplete. Track corrections, escalations, user trust, and the work that moved downstream. A faster first draft is not progress if it creates a slower approval process.",
        ],
      },
    ],
  },
  {
    slug: "signals-that-a-tech-trend-will-stick",
    title: "Five signals that a technology trend might actually stick",
    excerpt:
      "Ignore the volume. Watch behavior, infrastructure, and boring repetition.",
    category: "Emerging Tech",
    date: "August 15, 2026",
    readTime: "4 min read",
    image: "/manus-storage/spatial-computing_af406f8d.jpg",
    imageAlt: "Editorial scene of dimensional technology layers arranged in a physical space",
    accent: "coral",
    dek: "A durable shift usually looks less like a launch event and more like a habit quietly taking root.",
    sections: [
      {
        heading: "Watch what people repeat",
        paragraphs: [
          "Novelty earns a trial. Utility earns a routine. The strongest signal is not a download or a headline but the moment a person reorganizes work around a tool and feels its absence when it is gone.",
        ],
      },
      {
        heading: "Look for the invisible layer",
        paragraphs: [
          "Durable technologies grow an ecosystem of standards, training, maintenance, and complementary products. This infrastructure is rarely exciting, but it turns a clever demonstration into something other people can reliably build upon.",
        ],
      },
      {
        heading: "Boredom can be a milestone",
        paragraphs: [
          "A technology becomes consequential when it becomes ordinary. When people stop describing the mechanism and start discussing the result, the shift has moved from spectacle to substrate.",
        ],
      },
    ],
  },
  {
    slug: "quiet-reinvention-of-search",
    title: "The quiet reinvention of search",
    excerpt:
      "Finding an answer is becoming a conversation. Verifying it still takes work.",
    category: "Digital Life",
    date: "August 8, 2026",
    readTime: "6 min read",
    image: "/manus-storage/privacy_7f496d62.jpg",
    imageAlt: "Abstract editorial technology illustration with data fragments and a central frame",
    accent: "blue",
    dek: "Search is changing from a map of sources into a synthesized response. That makes source literacy more important, not less.",
    sections: [
      {
        heading: "From results to responses",
        paragraphs: [
          "Traditional search gives us a ranked set of doors. Conversational search increasingly attempts to walk through those doors, compare what is inside, and return with a summary. The experience is efficient precisely because so much of the process becomes invisible.",
        ],
      },
      {
        heading: "Convenience changes our responsibility",
        paragraphs: [
          "A fluent answer can make uncertainty difficult to see. Readers need visible sources, clear boundaries, and a habit of checking the evidence when the decision matters. The goal is not universal skepticism. It is calibrated trust.",
        ],
      },
      {
        heading: "A two-speed reading habit",
        paragraphs: [
          "Use fast synthesis to orient yourself. Switch to slow verification for consequential claims. A good system should help you make that transition by preserving links, exposing disagreement, and showing where the answer may be incomplete.",
        ],
      },
    ],
  },
];

export const topics = ["All", "AI", "Digital Life", "Future of Work", "Emerging Tech"] as const;
