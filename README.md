# BRAA GRAPHIX

Source repository: [moosev133/braa-graphics](https://github.com/moosev133/braa-graphics) (private).

An Arabic-first, trilingual creative boutique catalog built with React, TypeScript, Vite, and React Router. An inquiry storefront, with browser-local personalization and a structured WhatsApp handoff.

## Run locally

Use Node.js 22.22+ and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. The dev server binds only to `127.0.0.1` by default.

```sh
npm test        # order, validation, catalog and filter checks
npm run build  # TypeScript check and production build
npm run preview
```

The production build is in `dist/`. Serve it over HTTP; opening `index.html` directly via `file://` will not support routes or modules correctly.

## Included

- 12 category pages and 75 product concept records, each with its own product page.
- Arabic by default, with Arabic / Hebrew / English language selectors in desktop navigation, the mobile announcement bar, and the mobile menu. Choice persists on this browser.
- Automatic RTL/LTR layout, local Tajawal / Heebo fonts, keyboard controls and reduced-motion support.
- A short, skippable entrance that runs once per browser tab session.
- Six-slide promotional carousel with autoplay, pause, arrows, dots and touch swiping.
- Search, favorites, category/occasion/type filters, relevant requested-option filters and sorting.
- Product-specific personalization: name, message, original templates, colors, font, quantities and options.
- Drag and slider controls for text and the first uploaded image. Up to 10 image attachments per product, 10 MB each.
- Seven-step gift builder with per-item customization, greeting, review and inquiry.
- Saved browser-local drafts, gift contents and inquiry basket.
- Reviewable WhatsApp message with reference, product details, gift contents, greeting, quantities, options and attachment reminders. Long requests can be copied or downloaded without truncation.
- Graphic design services, portfolio placeholder, about, contact and privacy information.
- 13 original generated WebP images, each shown as illustrative content. No fabricated reviews, inventory, client portfolio or prices.

## Configuration and source map

| File | Responsibility |
| --- | --- |
| `src/catalog.ts` | Brand details, WhatsApp number, Instagram URL, logo path, product concepts, categories, allowed requested options and phone model list |
| `src/order.ts` | Personalization/gift types, validation, message generation, WhatsApp encoding |
| `src/storage.ts` | Local storage, private IndexedDB image storage and complete local-data deletion |
| `src/Editor.tsx` | Local image uploads and illustrative preview/editor |
| `src/GiftBuilder.tsx` | Seven-step gift workflow |
| `src/Inquiry.tsx` | Review, copy, download and WhatsApp handoff |
| `src/i18n.ts` | Reactive locale selection, persistence, document direction and safe translation interpolation |
| `src/locales/translations.json` | Arabic and English translations of canonical Hebrew application copy; explicit Hebrew equivalents for decorative English copy |
| `src/LanguageSwitcher.tsx` | Accessible Arabic / Hebrew / English selector |
| `src/styles.css` | Design system and responsive styles |
| `public/images/` | Optimized original demo photographs |
| `docs/ASSET-PROMPTS.md` | Exact built-in Imagegen prompts and asset notes |
| `docs/RESEARCH.md` | Reference research and original design decisions |
| `docs/TESTING.md` | Executed checks and limits |

### Brand assets and production content

Only the text brief was attached. The current text wordmark is a temporary identifier, not a recreation of the official logo. Supply the real logo in `public/images/` and set `studio.logo` in `src/catalog.ts` to its root-relative path. Supply the brand introduction post and real product photographs for final visual reconciliation.

All catalog entries are seed concepts. Confirm the actual offered products, compatibility, supported customization, dimensions, scents, finishes and fulfillment terms before presenting them as available stock. `Product.price` is nullable; enter real prices only after confirmation. `studio.productionTime` is also nullable. Product-specific field overrides live in `productFields()`.

Jewelry and perfume currently offer packaging/card personalization only. They do not promise engraving or perfume formulation. Device models are data-driven request options, not verified compatibility. All request options require studio approval.

Arabic is the default language for new visitors. A saved Arabic, Hebrew, or English choice is restored on reload. Translations cover navigation, product/category names, personalization choices, validation, gift-building, accessibility labels, information pages, and inquiry messages. BRAA GRAPHIX remains English. Search recognizes product/category names in all three languages. Customer-written names, messages, model names, notes and filenames are preserved verbatim. Existing canonical option values stay unchanged in saved drafts, gifts, favorites and baskets.

When adding application copy, add Arabic and English entries to `src/locales/translations.json` and render it through `t()`. Keep customer input out of translation lookups and pass it as interpolation values. Localized content updates without remounting the page or resetting selections.

## Privacy and ordering boundary

There is no server, database, account system, live inventory, payment gateway or third-party tracking. Customer images stay in IndexedDB on the same browser profile; they are never uploaded by this application. Text drafts, favorites, gift contents and basket are stored in localStorage. Browser storage is not encrypted or synchronized. A shared browser profile can access its drafts.

Removing an attachment from a draft removes its reference; the blob is retained locally because a saved basket may still reference it. The footer's “מחיקת הנתונים מהמכשיר” deletes all local application data and blobs. Browser storage clearing also removes them.

WhatsApp links prefill text only. Customers must attach images manually and send the message themselves. Opening WhatsApp is not an order confirmation. Large inquiries use a short reference link plus copy/download for the full details. The visual editor is illustrative, not a print-ready proof.

Instagram uses direct links and an explicitly labeled inspiration gallery, not an unauthorized live feed. Portfolio compositions are placeholders, not client work.

## Deploy

1. Run `npm ci`, `npm test`, and `npm run build`.
2. Deploy `dist/` to a static host with HTTPS and SPA fallback to `/index.html`.
3. Keep `/assets/*`, `/images/*`, `/fonts/*`, and `favicon.svg` serving as static assets.
4. A `_redirects` rule is included for compatible hosts such as Netlify/Cloudflare Pages. `vercel.json` is included for Vercel.
5. Set a real canonical URL and absolute Open Graph image after the production domain is known. No domain is invented in this project.
6. Check direct loads of `/product/mugs-1`, `/category/prints`, and `/gift-builder` on the chosen host.

Use a dedicated repository for this project. Its source, original assets, font licenses, configuration and tests are versioned together. Build output and dependencies are regenerated with the commands above. Keep this project separate from the electronics-store repository.

## Future backend boundary

Keep the typed `Product`, `Personalization`, `GiftDraft`, and `BasketItem` shapes as the UI contract. A future catalog API can replace the seed array; a draft repository can replace browser storage. Private uploads will require authenticated storage, ownership checks, retention policy, upload validation, and expiring attachment access. Add inventory and payment confirmation server-side before introducing checkout or availability claims.

## Assets and licensing

Product photography was generated specifically for this project using built-in Imagegen. Exact prompts are in `docs/ASSET-PROMPTS.md`. The optimized WebP set is about 1.3 MB. Heebo and Tajawal are bundled under the SIL Open Font License in `public/fonts/OFL.txt` and `public/fonts/Tajawal-OFL.txt`. Lucide icons are distributed with their package license. Competitor websites informed interaction patterns only; their content, code and assets were not copied.
