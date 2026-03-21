# Deployment

## Platform

The site is hosted on **GitHub Pages** from the `main` branch of the repository `BlockJakub/hodinovy_manzel`. No build step or CI/CD pipeline is required — pushing to `main` deploys immediately.

---

## Deploying changes

```bash
git add .
git commit -m "describe your change"
git push origin main
```

GitHub Pages picks up the new commit and deploys within ~1 minute. There is no cache-busting mechanism — browsers may serve stale JS/CSS until the cache expires. For critical fixes, append a query string to CDN-linked files or hard-reload the browser with Ctrl+Shift+R.

---

## 404 Routing

GitHub Pages always serves the root `404.html` for any unmatched URL. The project's `404.html` is a minimal redirect:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=pages/cz/404_error_cz.html" />
    <title>404</title>
  </head>
  <body></body>
</html>
```

This sends the user to the full Czech 404 page. The English 404 is reachable via the language switcher on that page.

> **Note:** Deep-linked URLs like `hodinovymanzel.cz/services` will land on the 404 page because the site has no server-side routing. All navigation is anchor-based (`#section-id`) within a single-page layout, so this is not an issue in normal usage.

---

## `robots.txt`

Located at the project root. It is served by GitHub Pages at `https://hodinovymanzel.cz/robots.txt`. Review and update it if sections should be excluded from indexing.

---

## Custom Domain

If a custom domain (e.g. `hodinovymanzel.cz`) is configured:

1. A `CNAME` file must exist at the project root containing the domain name.
2. DNS must point to GitHub Pages IPs (check [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for current IPs).
3. HTTPS is provided automatically by GitHub Pages via Let's Encrypt.

---

## CDN Dependencies

All external resources are loaded from `cdn.jsdelivr.net` and Adobe Typekit. The site will not function correctly if these are unavailable. There are no local fallback copies.

| Resource               | CDN URL                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| Bootstrap 5.3.2 CSS    | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css`      |
| Bootstrap 5.3.2 JS     | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js` |
| Bootstrap Icons 1.10.5 | `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css` |
| anime.js               | `https://cdn.jsdelivr.net/npm/animejs/lib/anime.iife.min.js`                   |
| Typekit (CZ)           | `https://use.typekit.net/jhv2lht.css`                                          |
| Typekit (ENG)          | `https://use.typekit.net/lft2pcd.css`                                          |

---

## Performance Notes

- All images use `loading="lazy"` where applicable.
- Animation scripts (`anime.js`, `logo-anim.js`, etc.) are loaded with `defer` — they do not block first paint.
- `sidebar_responsive.js` is `defer`red in `<head>` because it must be available at `DOMContentLoaded`.
- `header.js` and `footer.js` are loaded synchronously (no `defer`) immediately after their respective placeholder `<div>` elements — this ensures the header/footer appear in the initial paint without layout shift.

---

## Security Considerations

- **No backend, no database** — attack surface is minimal.
- **No forms** — no user input is processed or stored. The disclaimer in the footer explicitly communicates this.
- **No cookies** — `localStorage` is used only for theme preference (`hm_theme`). No consent banner is required for this.
- **External content** — all CDN resources are loaded over HTTPS. CSP headers cannot be set on GitHub Pages without a reverse proxy.
- **`error_handler.js`** only redirects to pages within the same origin — no open redirect vulnerability.

---

## Pre-Deploy Checklist

Before pushing to production, verify:

- [ ] All 14 HTML pages have the same correct script set (see [architecture.md](architecture.md))
- [ ] `data-base`, `data-lang`, `data-cz-href`, `data-eng-href`, `data-home` are correct on every `#site-header` div
- [ ] `data-base` and `data-lang` are correct on every `#site-footer` div
- [ ] All images referenced in HTML actually exist in `Img/`
- [ ] `robots.txt` is up to date
- [ ] CZ and ENG language switch links point to the correct counterpart page
- [ ] The 500 error pages load without triggering another 500 redirect (they must not load `error_handler.js` in a way that loops — verify `error_handler.js` does not error internally)
