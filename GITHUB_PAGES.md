# GitHub Pages deployment

This repository publishes **Dr. Vicki's Tech Talk** as a static GitHub Pages project site.

| Setting | Value |
|---|---|
| Repository | `DrVicki/dr-vickis-tech-talk` |
| Publishing mode | Deploy from a branch |
| Branch | `main` |
| Folder | `/docs` |
| Expected URL | `https://drvicki.github.io/dr-vickis-tech-talk/` |

## Build and validate

Run the following commands from the repository root:

```bash
pnpm pages:build
pnpm pages:check
```

The build writes a self-contained static package to `docs/`. It includes a matching `404.html` fallback so direct article links can load through the client-side router, a `.nojekyll` marker, the RSS feed, and locally hosted optimized editorial images.

## Enable Pages once

Open the repository’s **Settings → Pages** panel. Under **Build and deployment**, choose **Deploy from a branch**, select `main`, choose `/docs`, and save. GitHub will publish the site at the expected URL above.

The Manus-hosted version remains available at [vickitech-k339utoj.manus.space](https://vickitech-k339utoj.manus.space). The GitHub Pages version is fully static: the newsletter form provides an in-page confirmation but does not send data to an email service.
