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
          <a class="brand" href="https://drvicki.github.io/dr-vickis-tech-talk/">
            <span class="brand-mark">V.</span>
            <span>Dr. Vicki’s Tech Talk</span>
          </a>
          <a class="home-link" href="https://drvicki.github.io/dr-vickis-tech-talk/">Back to the blog →</a>
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
              </div>
            </div>
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
