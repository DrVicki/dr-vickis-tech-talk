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
          .quick-start {
            margin: 0 0 5rem;
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
            .quick-start { margin-bottom: 4rem; }
            .steps { grid-template-columns: 1fr; }
            .feed-bar { align-items: start; flex-direction: column; }
            .post { grid-template-columns: 1fr; }
            .arrow { justify-self: start; }
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .post { transition: none; }
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
            <p class="guide-note"><strong>Good to know:</strong> RSS is different from an email newsletter. Nothing is sent to your inbox, and following this feed does not create an account on this blog.</p>
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
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
