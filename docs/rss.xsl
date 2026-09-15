<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/rss/channel">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="title" /> — RSS Feed</title>
        <style>
          :root {
            color-scheme: light;
            --ink: #071a2e;
            --paper: #f7f1e7;
            --cream: #fffaf1;
            --blue: #315f95;
            --coral: #ff6048;
            --lime: #c7dd2b;
            --muted: #627086;
          }
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            margin: 0;
            color: var(--ink);
            background:
              radial-gradient(circle at 78% 8%, rgba(199, 221, 43, .22), transparent 21rem),
              radial-gradient(circle at 12% 4%, rgba(255, 96, 72, .13), transparent 19rem),
              var(--paper);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            line-height: 1.6;
          }
          a { color: inherit; }
          .shell { width: min(1120px, calc(100% - 2rem)); margin: 0 auto; }
          .masthead {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 1.25rem 0;
            border-bottom: 1px solid rgba(7, 26, 46, .12);
          }
          .brand { display: inline-flex; align-items: center; gap: .75rem; text-decoration: none; font-weight: 800; letter-spacing: -.02em; }
          .brand-mark { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 999px; background: var(--coral); font-family: Georgia, serif; font-size: 1.3rem; font-style: italic; }
          .home-link { font-size: .75rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; text-decoration: none; }
          .hero { padding: clamp(4rem, 10vw, 7.5rem) 0 3.5rem; }
          .eyebrow { display: flex; align-items: center; gap: .65rem; font-size: .7rem; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; }
          .eyebrow::before { content: ""; width: .65rem; height: .65rem; border-radius: 50%; background: var(--lime); box-shadow: 0 0 0 .35rem rgba(199, 221, 43, .18); }
          h1 { max-width: 820px; margin: 1.4rem 0 .85rem; font-family: Georgia, "Times New Roman", serif; font-size: clamp(3.25rem, 8vw, 6.6rem); font-weight: 400; line-height: .92; letter-spacing: -.065em; }
          .intro { max-width: 710px; margin: 0; color: var(--muted); font-size: clamp(1rem, 2vw, 1.2rem); }
          .notice {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1rem;
            align-items: start;
            margin: 1.8rem 0 0;
            padding: 1.25rem;
            border: 1px solid rgba(49, 95, 149, .2);
            border-radius: 1.25rem;
            background: rgba(255, 250, 241, .8);
            box-shadow: 0 18px 50px rgba(7, 26, 46, .06);
          }
          .rss-icon { display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: .9rem; background: var(--coral); color: white; font-weight: 900; }
          .notice strong { display: block; margin-bottom: .2rem; }
          .notice p { margin: 0; color: var(--muted); font-size: .92rem; }
          .reader-actions { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1rem; }
          .reader-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .55rem;
            min-height: 2.75rem;
            padding: .7rem 1rem;
            border: 1px solid transparent;
            border-radius: 999px;
            text-decoration: none;
            font-size: .75rem;
            font-weight: 850;
            letter-spacing: .035em;
            transition: transform 160ms cubic-bezier(.23, 1, .32, 1), box-shadow 160ms cubic-bezier(.23, 1, .32, 1), background 160ms cubic-bezier(.23, 1, .32, 1);
          }
          .reader-button::before { content: "＋"; font-size: 1rem; line-height: 1; }
          .reader-button:hover { transform: translateY(-2px); }
          .reader-button:active { transform: scale(.97); }
          .reader-button:focus-visible { outline: 3px solid var(--lime); outline-offset: 3px; }
          .reader-button.feedly { background: #2bb24c; color: white; box-shadow: 0 10px 24px rgba(43, 178, 76, .2); }
          .reader-button.feedly:hover { background: #22973f; box-shadow: 0 14px 30px rgba(43, 178, 76, .28); }
          .reader-button.inoreader { background: var(--ink); color: white; box-shadow: 0 10px 24px rgba(7, 26, 46, .17); }
          .reader-button.inoreader:hover { background: var(--blue); box-shadow: 0 14px 30px rgba(49, 95, 149, .26); }
          .manual-copy { display: flex; align-items: center; flex-wrap: wrap; gap: .75rem; margin-top: .9rem; }
          .manual-copy-label { color: var(--muted); font-size: .78rem; }
          .copy-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .5rem;
            min-height: 2.45rem;
            padding: .55rem .85rem;
            border: 1px solid rgba(7, 26, 46, .2);
            border-radius: .75rem;
            background: white;
            color: var(--ink);
            font: inherit;
            font-size: .74rem;
            font-weight: 850;
            cursor: pointer;
            box-shadow: 0 7px 18px rgba(7, 26, 46, .07);
            transition: transform 160ms cubic-bezier(.23, 1, .32, 1), background 160ms cubic-bezier(.23, 1, .32, 1), border-color 160ms cubic-bezier(.23, 1, .32, 1);
          }
          .copy-button:hover { transform: translateY(-2px); border-color: rgba(49, 95, 149, .5); }
          .copy-button:active { transform: scale(.97); }
          .copy-button:focus-visible { outline: 3px solid var(--lime); outline-offset: 3px; }
          .copy-button.is-copied { border-color: var(--lime); background: #eef7a8; }
          .copy-icon { font-size: 1rem; line-height: 1; }
          .feed-address { margin-top: .9rem; }
          .feed-address label { display: block; margin-bottom: .25rem; font-size: .75rem; font-weight: 750; }
          .feed-address input { width: min(100%, 30rem); padding: .65rem; border: 1px solid rgba(7, 26, 46, .2); border-radius: .5rem; font: inherit; font-size: .8rem; background: white; color: var(--ink); }
          .feed-address input:focus-visible { outline: 3px solid var(--lime); outline-offset: 2px; }
          .copy-error { margin-top: .5rem !important; color: #933020 !important; font-weight: 650; }
          .quick-start {
            margin: 0 0 2rem;
            padding: clamp(1.5rem, 4vw, 2.5rem);
            border-radius: 1.6rem;
            background: var(--ink);
            color: white;
            box-shadow: 0 24px 60px rgba(7, 26, 46, .17);
          }
          .guide-label { color: var(--lime); font-size: .68rem; font-weight: 850; letter-spacing: .2em; text-transform: uppercase; }
          .guide-heading { max-width: 760px; margin: .55rem 0 0; color: white; }
          .guide-intro { max-width: 750px; margin: .65rem 0 0; color: #b9c6d5; font-size: .95rem; }
          .steps {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1px;
            margin: 2rem 0 0;
            padding: 0;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, .13);
            border-radius: 1.2rem;
            background: rgba(255, 255, 255, .13);
            list-style: none;
          }
          .step { padding: 1.35rem; background: #0d2743; }
          .step-number { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; background: var(--lime); color: var(--ink); font-size: .75rem; font-weight: 900; }
          .step h3 { margin: .85rem 0 .4rem; font-family: Georgia, "Times New Roman", serif; font-size: 1.35rem; line-height: 1.1; }
          .step p { margin: 0; color: #b9c6d5; font-size: .84rem; line-height: 1.65; }
          .guide-note { margin: 1.4rem 0 0; padding-top: 1.2rem; border-top: 1px solid rgba(255, 255, 255, .13); color: #b9c6d5; font-size: .82rem; }
          .guide-note strong { color: white; }
          .reader-directory { margin-top: 1.5rem; padding-top: 1.35rem; border-top: 1px solid rgba(255, 255, 255, .13); }
          .reader-directory-title { margin: 0 0 .8rem; color: white; font-size: .78rem; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
          .app-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .7rem; }
          .app-link {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: .75rem;
            align-items: center;
            padding: .95rem;
            border: 1px solid rgba(255, 255, 255, .14);
            border-radius: .9rem;
            background: rgba(255, 255, 255, .055);
            color: white;
            text-decoration: none;
            transition: transform 160ms cubic-bezier(.23, 1, .32, 1), background 160ms cubic-bezier(.23, 1, .32, 1), border-color 160ms cubic-bezier(.23, 1, .32, 1);
          }
          .app-link:hover { transform: translateY(-2px); border-color: rgba(199, 221, 43, .55); background: rgba(255, 255, 255, .09); }
          .app-link:focus-visible { outline: 3px solid var(--lime); outline-offset: 3px; }
          .app-name { display: block; font-family: Georgia, "Times New Roman", serif; font-size: 1.05rem; font-weight: 700; }
          .app-platforms { display: block; margin-top: .15rem; color: #b9c6d5; font-size: .67rem; }
          .free-badge { padding: .2rem .45rem; border-radius: 999px; background: var(--lime); color: var(--ink); font-size: .58rem; font-weight: 900; letter-spacing: .08em; }
          .faq { margin: 0 0 1rem; padding: clamp(1.35rem, 3vw, 2rem); border: 1px solid rgba(7, 26, 46, .11); border-radius: 1.4rem; background: rgba(255, 250, 241, .75); }
          .faq-label { color: var(--blue); font-size: .68rem; font-weight: 850; letter-spacing: .18em; text-transform: uppercase; }
          .faq-heading { margin: .4rem 0 1.2rem; font-size: clamp(1.8rem, 4vw, 2.6rem); }
          .faq-list { display: grid; gap: .65rem; }
          .faq details { border: 1px solid rgba(7, 26, 46, .1); border-radius: .9rem; background: rgba(255, 255, 255, .55); }
          .faq summary { display: grid; grid-template-columns: 1fr auto; gap: 1rem; align-items: center; padding: 1rem 1.1rem; font-weight: 800; cursor: pointer; list-style: none; }
          .faq summary::-webkit-details-marker { display: none; }
          .faq summary::after { content: "+"; color: var(--blue); font-size: 1.3rem; font-weight: 500; line-height: 1; }
          .faq details[open] summary::after { content: "−"; }
          .faq details[open] summary { padding-bottom: .6rem; }
          .faq details p { margin: 0; padding: 0 1.1rem 1rem; color: var(--muted); font-size: .86rem; }
          .faq summary:focus-visible { border-radius: .9rem; outline: 3px solid var(--lime); outline-offset: 3px; }
          .contact-card {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 1.5rem;
            align-items: center;
            margin: 0 0 5rem;
            padding: clamp(1.4rem, 4vw, 2.3rem);
            border-radius: 1.4rem;
            background: var(--coral);
            color: var(--ink);
            box-shadow: 0 18px 45px rgba(255, 96, 72, .18);
          }
          .contact-label { font-size: .67rem; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
          .contact-heading { margin: .35rem 0 .45rem; font-size: clamp(1.8rem, 4vw, 2.7rem); }
          .contact-copy { max-width: 700px; margin: 0; font-size: .9rem; }
          .contact-email { display: block; margin-top: .55rem; font-size: .75rem; font-weight: 850; }
          .contact-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 3rem;
            padding: .75rem 1.1rem;
            border-radius: 999px;
            background: var(--ink);
            color: white;
            font-size: .77rem;
            font-weight: 850;
            letter-spacing: .03em;
            text-decoration: none;
            white-space: nowrap;
            box-shadow: 0 12px 28px rgba(7, 26, 46, .18);
            transition: transform 160ms cubic-bezier(.23, 1, .32, 1), background 160ms cubic-bezier(.23, 1, .32, 1);
          }
          .contact-button:hover { transform: translateY(-2px); background: var(--blue); }
          .contact-button:active { transform: scale(.97); }
          .contact-button:focus-visible { outline: 3px solid white; outline-offset: 3px; }
          .copy-toast {
            position: fixed;
            right: 1.25rem;
            bottom: 1.25rem;
            z-index: 20;
            display: flex;
            align-items: center;
            gap: .65rem;
            max-width: min(24rem, calc(100% - 2rem));
            padding: .9rem 1rem;
            border-radius: .9rem;
            background: var(--ink);
            color: white;
            font-size: .82rem;
            font-weight: 750;
            box-shadow: 0 18px 45px rgba(7, 26, 46, .28);
            opacity: 0;
            transform: translateY(.65rem);
            transition: opacity 180ms cubic-bezier(.23, 1, .32, 1), transform 180ms cubic-bezier(.23, 1, .32, 1);
          }
          .copy-toast::before { content: "✓"; display: grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 50%; background: var(--lime); color: var(--ink); font-weight: 950; }
          .copy-toast.is-visible { opacity: 1; transform: translateY(0); }
          .copy-toast[hidden] { display: none; }
          .feed-bar { display: flex; align-items: end; justify-content: space-between; gap: 1rem; margin: 3.5rem 0 1rem; }
          h2 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 400; letter-spacing: -.04em; }
          .updated { color: var(--muted); font-size: .75rem; text-transform: uppercase; letter-spacing: .1em; }
          .posts { display: grid; gap: 1rem; padding-bottom: 5rem; }
          .post {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 1.25rem;
            padding: clamp(1.3rem, 3vw, 2rem);
            border: 1px solid rgba(7, 26, 46, .1);
            border-radius: 1.35rem;
            background: rgba(255, 250, 241, .92);
            text-decoration: none;
            box-shadow: 0 14px 40px rgba(7, 26, 46, .05);
            transition: transform 180ms cubic-bezier(.23, 1, .32, 1), box-shadow 180ms cubic-bezier(.23, 1, .32, 1), border-color 180ms cubic-bezier(.23, 1, .32, 1);
          }
          .post:hover { transform: translateY(-3px); border-color: rgba(49, 95, 149, .38); box-shadow: 0 22px 52px rgba(7, 26, 46, .1); }
          .post:focus-visible { outline: 3px solid var(--lime); outline-offset: 3px; }
          .post-title { display: block; font-family: Georgia, "Times New Roman", serif; font-size: clamp(1.45rem, 3vw, 2rem); font-weight: 600; line-height: 1.08; letter-spacing: -.035em; }
          .post-description { display: block; max-width: 780px; margin-top: .7rem; color: var(--muted); font-size: .9rem; }
          .post-date { display: block; margin-top: 1rem; color: var(--blue); font-size: .66rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
          .arrow { display: grid; place-items: center; align-self: center; width: 2.8rem; height: 2.8rem; border-radius: 50%; background: var(--ink); color: white; font-size: 1.2rem; }
          footer { border-top: 1px solid rgba(7, 26, 46, .12); padding: 1.6rem 0 2.5rem; color: var(--muted); font-size: .8rem; }
          @media (max-width: 620px) {
            .home-link { display: none; }
            .notice { grid-template-columns: 1fr; }
            .reader-actions { display: grid; grid-template-columns: 1fr; }
            .reader-button { width: 100%; }
            .manual-copy { align-items: stretch; flex-direction: column; }
            .copy-button { width: 100%; }
            .quick-start { margin-bottom: 1.5rem; }
            .steps { grid-template-columns: 1fr; }
            .app-links { grid-template-columns: 1fr; }
            .contact-card { grid-template-columns: 1fr; margin-bottom: 4rem; }
            .contact-button { width: 100%; }
            .feed-bar { align-items: start; flex-direction: column; }
            .post { grid-template-columns: 1fr; }
            .arrow { justify-self: start; }
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .post, .app-link, .copy-button, .contact-button, .copy-toast { transition: none; }
          }
        </style>
      </head>
      <body>
        <header class="shell masthead">
          <a class="brand" href="https://drvickitechtalk.org/">
            <span class="brand-mark">V.</span>
            <span>Dr. Vicki’s Tech Talk</span>
          </a>
          <a class="home-link" href="https://drvickitechtalk.org/">Back to the blog →</a>
        </header>

        <main class="shell">
          <section class="hero">
            <div class="eyebrow">Subscribe to the signal</div>
            <h1><xsl:value-of select="title" /></h1>
            <p class="intro"><xsl:value-of select="description" /></p>
            <div class="notice">
              <div class="rss-icon">RSS</div>
              <div>
                <strong>This is an RSS feed.</strong>
                <p>Copy this page’s URL into an RSS reader such as Feedly, Inoreader, or NetNewsWire to receive new posts automatically. The styling is for people; the underlying XML remains available to feed apps.</p>
                <div class="reader-actions" aria-label="Subscribe with an RSS reader">
                  <a
                    class="reader-button feedly"
                    href="https://feedly.com/i/subscription/feed/https%3A%2F%2Fdrvickitechtalk.org%2Frss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe to Dr. Vicki’s Tech Talk in Feedly"
                  >Subscribe in Feedly</a>
                  <a
                    class="reader-button inoreader"
                    href="https://www.inoreader.com/?add_feed=https%3A%2F%2Fdrvickitechtalk.org%2Frss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe to Dr. Vicki’s Tech Talk in Inoreader"
                  >Subscribe in Inoreader</a>
                </div>
                <div class="manual-copy">
                  <span class="manual-copy-label">Using another reader?</span>
                  <button class="copy-button" id="copy-feed-url" type="button" data-feed-url="https://drvickitechtalk.org/rss.xml">
                    <span class="copy-icon" aria-hidden="true">▣</span>
                    <span class="copy-label">Copy feed URL</span>
                  </button>
                </div>
                <div class="feed-address">
                  <label for="feed-url">Feed URL for any RSS reader</label>
                  <input id="feed-url" type="text" readonly="readonly" value="https://drvickitechtalk.org/rss.xml" spellcheck="false" />
                  <p class="copy-error" id="copy-error" role="status" aria-live="polite"></p>
                </div>
              </div>
            </div>
          </section>

          <section class="quick-start" aria-labelledby="rss-guide-title">
            <div class="guide-label">New to RSS? Start here.</div>
            <h2 class="guide-heading" id="rss-guide-title">RSS in three easy steps</h2>
            <p class="guide-intro">RSS brings updates from websites you choose into one reading app—without relying on a social-media algorithm.</p>
            <ol class="steps">
              <li class="step">
                <span class="step-number" aria-hidden="true">1</span>
                <h3>Choose a reader</h3>
                <p>An RSS reader is like an inbox for websites. Feedly and Inoreader are two popular options; use either button above.</p>
              </li>
              <li class="step">
                <span class="step-number" aria-hidden="true">2</span>
                <h3>Subscribe once</h3>
                <p>Sign in if asked, then follow Dr. Vicki’s Tech Talk. The reader saves this feed to your personal list.</p>
              </li>
              <li class="step">
                <span class="step-number" aria-hidden="true">3</span>
                <h3>Read on your terms</h3>
                <p>Open your reader whenever you like. New posts appear automatically, and you can unfollow at any time.</p>
              </li>
            </ol>
            <div class="reader-directory" aria-labelledby="recommended-readers-title">
              <p class="reader-directory-title" id="recommended-readers-title">Recommended free readers</p>
              <div class="app-links">
                <a class="app-link" href="https://feedly.com/news-reader" target="_blank" rel="noopener noreferrer">
                  <span><span class="app-name">Feedly</span><span class="app-platforms">Web · iOS · Android</span></span>
                  <span class="free-badge">FREE</span>
                </a>
                <a class="app-link" href="https://www.inoreader.com/" target="_blank" rel="noopener noreferrer">
                  <span><span class="app-name">Inoreader</span><span class="app-platforms">Web · desktop · mobile</span></span>
                  <span class="free-badge">FREE</span>
                </a>
                <a class="app-link" href="https://netnewswire.com/" target="_blank" rel="noopener noreferrer">
                  <span><span class="app-name">NetNewsWire</span><span class="app-platforms">Mac · iPhone · iPad</span></span>
                  <span class="free-badge">FREE</span>
                </a>
              </div>
              <p class="guide-note">Feedly and Inoreader offer free plans with limits and optional paid upgrades. NetNewsWire is free and open source. Check each app’s site for device requirements.</p>
            </div>
            <p class="guide-note"><strong>Good to know:</strong> RSS is different from an email newsletter. Nothing is sent to your inbox, and following this feed does not create an account on this blog.</p>
          </section>

          <section class="faq" aria-labelledby="rss-faq-title">
            <div class="faq-label">Tiny RSS glossary</div>
            <h2 class="faq-heading" id="rss-faq-title">A few terms, translated</h2>
            <div class="faq-list">
              <details>
                <summary>What is XML?</summary>
                <p>XML is a plain-text format that organizes each post’s title, link, date, and summary so reader apps can understand them. You never need to read or edit the code yourself.</p>
              </details>
              <details>
                <summary>What is an aggregator?</summary>
                <p>An aggregator is another name for an RSS reader. It gathers new posts from all the websites you follow and displays them together in one place.</p>
              </details>
              <details>
                <summary>Does “subscribe” mean I have to pay?</summary>
                <p>No. In RSS, subscribe simply means follow. This feed is free, and you can remove it from your reader whenever you like.</p>
              </details>
              <details>
                <summary>Do I need to revisit this page?</summary>
                <p>No. Once you add the feed, your reader checks it automatically. Return here only if you switch readers or need the feed URL again.</p>
              </details>
            </div>
          </section>

          <section class="contact-card" aria-labelledby="contact-title">
            <div>
              <div class="contact-label">Contact me</div>
              <h2 class="contact-heading" id="contact-title">Have a question for Dr. Vicki?</h2>
              <p class="contact-copy">Questions about a post, RSS, or a technology topic are welcome. Send a note and include enough context to make the conversation useful.</p>
              <span class="contact-email">vicki.bealman@devry.edu</span>
            </div>
            <a class="contact-button" href="mailto:vicki.bealman@devry.edu?subject=Question%20from%20Dr.%20Vicki%27s%20Tech%20Talk">Email Dr. Vicki ↗</a>
          </section>

          <div class="feed-bar">
            <h2>Latest dispatches</h2>
            <div class="updated">Updated <xsl:value-of select="lastBuildDate" /></div>
          </div>

          <section class="posts" aria-label="Published articles">
            <xsl:for-each select="item">
              <a class="post" href="{link}">
                <span>
                  <span class="post-title"><xsl:value-of select="title" /></span>
                  <span class="post-description"><xsl:value-of select="description" /></span>
                  <span class="post-date"><xsl:value-of select="pubDate" /></span>
                </span>
                <span class="arrow" aria-hidden="true">↗</span>
              </a>
            </xsl:for-each>
          </section>
        </main>

        <footer>
          <div class="shell">Dr. Vicki’s Tech Talk · Clear thinking for a changing world.</div>
        </footer>
        <div class="copy-toast" id="copy-toast" role="status" aria-live="polite" hidden="hidden">Feed URL copied to your clipboard.</div>
        <script type="text/javascript"><![CDATA[
          (function () {
            var button = document.getElementById("copy-feed-url");
            var toast = document.getElementById("copy-toast");
            var label = button ? button.querySelector(".copy-label") : null;
            var address = document.getElementById("feed-url");
            var error = document.getElementById("copy-error");
            var timer;
            var hideTimer;

            function legacyCopy(text) {
              var field = document.createElement("textarea");
              var previousFocus = document.activeElement;
              field.value = text;
              field.setAttribute("readonly", "readonly");
              field.style.position = "fixed";
              field.style.opacity = "0";
              document.body.appendChild(field);
              try {
                field.select();
                return document.execCommand("copy");
              } catch (failure) {
                return false;
              } finally {
                document.body.removeChild(field);
                if (previousFocus && previousFocus.focus) previousFocus.focus({ preventScroll: true });
              }
            }

            function resetFeedback() {
              clearTimeout(timer);
              clearTimeout(hideTimer);
              error.textContent = "";
              button.classList.remove("is-copied");
              label.textContent = "Copy feed URL";
              toast.classList.remove("is-visible");
              toast.hidden = true;
              toast.textContent = "";
            }

            function showSuccess() {
              button.classList.add("is-copied");
              label.textContent = "Copied!";
              toast.hidden = false;
              window.requestAnimationFrame(function () {
                toast.textContent = "Feed URL copied to your clipboard.";
                toast.classList.add("is-visible");
              });
              timer = window.setTimeout(function () {
                button.classList.remove("is-copied");
                label.textContent = "Copy feed URL";
                toast.classList.remove("is-visible");
                hideTimer = window.setTimeout(function () { toast.hidden = true; toast.textContent = ""; }, 200);
              }, 3000);
            }

            if (button && toast && label && address && error) {
              address.addEventListener("click", function () { address.select(); });
              button.addEventListener("click", async function () {
                resetFeedback();
                button.disabled = true;
                var feedUrl = button.getAttribute("data-feed-url");
                var copied = false;
                try {
                  if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(feedUrl);
                    copied = true;
                  }
                } catch (failure) {
                  // A denied permission still permits a user-initiated legacy fallback in some browsers.
                }
                if (!copied) copied = legacyCopy(feedUrl);
                button.disabled = false;
                if (copied) showSuccess();
                else {
                  error.textContent = "Automatic copying was blocked. Select the feed URL above and use Copy in your device’s menu (Ctrl+C or Command+C).";
                  address.focus({ preventScroll: true });
                  address.select();
                }
              });
            }
          }());
        ]]></script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
