# FSBO4u — Website Redesign Proposal

A full redesign of [fsbo4u.com](https://fsbo4u.com) covering **every URL in the live sitemap** (31 pages), plus a 404 page.

## Run it

```bash
npm run dev        # builds to ./dist and serves http://localhost:4173
```

There are no dependencies to install: you only need Node 18+. Run `npm run build` to regenerate `dist/` after editing anything in `src/` or `assets/`.

## Deploy to Vercel

The repo is ready to deploy as-is, because `vercel.json` already sets everything up.

1. In Vercel, go to **Add New → Project**, then import `Enzizy/FSBO`.
2. Leave the defaults. Vercel reads these from `vercel.json`:
   - Framework: Other (static)
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 20, from `.nvmrc` (any version 18 or newer works)
3. Click **Deploy**. Every push to `main` redeploys automatically.

What the config handles:
- **Clean URLs with trailing slashes.** For example, `/listings` redirects to `/listings/`, and `/v2/...` and `/v3/...` work the same way.
- **Custom 404 page.**
- **Security headers:** `nosniff`, `SAMEORIGIN` framing, a referrer policy and a permissions policy.
- **Caching.** Every CSS/JS URL gets a content hash (`?v=…`) at build time, so a new deploy never serves stale styles or scripts. Images are cached for a week.
- **Kept out of search engines by default.** This is a proposal, so `robots.txt` blocks all crawlers and the client's live site isn't competing with a `*.vercel.app` copy. When this becomes the real fsbo4u.com, add the environment variable **`ALLOW_INDEXING=true`** in Vercel (Project → Settings → Environment Variables) and redeploy. That restores the normal `robots.txt` and sitemap.
- **Dashboards never indexed.** Seller and admin pages also send `X-Robots-Tag: noindex`, whatever the setting above.

To deploy from the command line instead:

```bash
npx vercel --prod
```

`.vercelignore` keeps `dist/` and local files from being uploaded, because Vercel builds `dist/` itself.

## Three design versions

Every page exists in three versions, built from the same content. Use the **Design** switcher in the bottom-left corner of any page to swap versions without leaving that page.

| | URL | Palette | Type | Themes | Motion |
|---|---|---|---|---|---|
| **V1 · Classic** | `/` | The current brand colours: navy `#1A1A2E`, gold `#C9A84C`, cream | Playfair Display + Inter | Light | Fade-ups and counters |
| **V2 · Modern** | `/v2/` | Emerald `#173A33` and brass `#B8913A` on ivory | Manrope + Inter | Light + dark, following the device setting by default | Same as V1 |
| **V3 · Immersive** | `/v3/` | Obsidian `#0B0B0E` and champagne `#D4B26A` | Bodoni Moda + Inter | Dark by default, plus a light "champagne paper" theme | The full set listed below |

V3 adds:
- A real-time **3D gold house** in the hero (Three.js) that reacts to the mouse and to scrolling. Its roofline, chimney, four-pane windows and sun arc all come from the logo.
- **Page transitions:** a curtain wipe between pages.
- **Native scrolling.** No smooth-scroll library takes over the mouse wheel, so scrolling feels as fast as the visitor’s own browser.
- **Headline reveals** word by word, and a manifesto whose words light up as you scroll.
- A **pinned horizontal scroll** for "How it works".
- **Stacking location panels** as you scroll down.
- A city **marquee** that speeds up with scroll velocity.
- **3D tilt with a light sheen** on cards, and **magnetic buttons**.
- A **custom cursor**.

All V3 motion is turned off under `prefers-reduced-motion`. If the CDN scripts or WebGL are unavailable, the pages still work normally.

The light/dark toggle is the sun/moon icon in the header and in the switcher, and the choice is remembered per version. V2 and V3 pages are marked `noindex`; only V1 goes in the sitemap.

**V3 CDN dependencies** (all pinned to exact versions): GSAP 3.12.5 with ScrollTrigger (cdnjs) and Three.js 0.160.0 (jsDelivr).

**V3 performance budget:**
- The 3D hero renders at no more than 1.25× pixel density, with lightweight materials and 260 particles. It pauses when it is scrolled off screen or the tab is hidden.
- Scroll-linked effects cost about 0.4 ms per scroll step (median) and 2.1 ms at worst, well inside the 16 ms budget for a 60 fps frame.
- No scroll-time blur effects, and only a handful of forced GPU layers.

## What's new compared with the current site

| Feature | Where |
|---|---|
| Buy / Rent / Sell search console. The Sell tab estimates the owner's savings | Home hero |
| **Commission calculator** (₱1M–₱50M, 3/4/5% plus 12% VAT) | Home `#calculator` |
| FSBO vs. traditional agent comparison | Home |
| "Commission-free · save up to ₱X" and price per sqm on every card | All listing cards |
| Working filters, sort, grid/list view, removable filter chips and shareable URLs | `/listings` |
| Listing detail page with gallery, key facts, enquiry or viewing form, and a **bank financing estimator** | `/listings/*` (these return **HTTP 500 on the live site**) |
| 6-step listing wizard with a **live preview card**, a savings nudge and photo drag-and-drop | `/post-property` |
| Monthly/annual billing toggle, full comparison table, FAQ | `/subscription-plans` |
| Saved properties: a shortlist kept in the browser, with combined value | `/favorites` |
| Email one-time-code login UI (seller and admin) | `/seller/login`, `/admin/login` |
| Seller dashboard (overview, listings, enquiries inbox, viewings, account) | `/seller/*` |
| Admin console (overview, moderation, enquiries, analytics) | `/admin/*` |
| Sticky table of contents on legal pages, and a privacy-first cookie banner | `/privacy`, `/terms` |
| SEO: canonical URLs, Open Graph tags, JSON-LD (WebSite, RealEstateListing, FAQPage), `sitemap.xml`, `robots.txt`, and `noindex` on portal pages | All pages |

## Structure

```
src/data.mjs          Content: listings, cities, plans, team (copy carried over from the live site)
src/layout.mjs        Head, header, footer, icons, listing card, version config and switcher
src/partials.mjs      Homepage blocks shared by V2/V3 (search console, calculator, comparison)
src/pages/*.mjs       One module per page group; each returns { path, html }
src/versions/*.mjs    V2 and V3 homepages (the other pages are shared and re-themed)
assets/css            styles.css (base design system, token-driven), v2.css, v3.css
assets/js             main.js (shared), listings.js, post.js, plans.js, portal.js,
                      v3.js (motion layer), v3-hero.js (Three.js scene)
assets/img            Client photos, logo.png, logo-dark.png (dark lettering for light themes)
build.mjs             Static build to ./dist: V1 at /, V2 at /v2/, V3 at /v3/ (96 pages)
serve.mjs             Local preview server that supports clean URLs
```

The output is plain, semantic HTML, CSS and JavaScript. You can port it directly to the client's current React stack: `layout.mjs` maps onto `<Header/>`, `<Footer/>` and `<ListingCard/>`, and the CSS tokens drop into Tailwind or shadcn theme variables.

## Notes for the client

1. **Photography is the biggest upgrade still open.** The live site has only 4 photos, and the "Spacious Family Home in Alabang" image shows a derelict structure. Listings without a usable photo currently show on-brand gold line-art placeholders.
2. **The live listing detail pages are broken** (HTTP 500 on all 6 `/listings/*` URLs).
3. **The stats contradict each other across pages.** The home page says 10,000+ listings and 50+ cities. The plans page says 3,500+ listings and 42 cities. The About page says 42 cities. Pick one set of figures.
4. **Copy that needs confirming:**
   * The listing descriptions, features and dashboard figures are sample content.
   * The plan FAQ answers are drafts, because the live accordion text wasn't readable.
   * The legal pages are condensed and need the final legal text pasted in.
   * The privacy page adds a section on rights under the Philippine Data Privacy Act (RA 10173), which is recommended.
5. **The blog has no posts yet.** The page shows planned launch topics, clearly labelled "Coming soon".
6. **Forms and logins are front-end demos.** They validate input and show a confirmation, but they need to be connected to the existing backend.
