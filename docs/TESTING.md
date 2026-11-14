# Validation report

Original checks November 3, 2026; catalog update checked November 4, 2026. Local development and production builds; no messages sent and no orders submitted.

## Automated checks

- `npm run build`: passed TypeScript checks and Vite production compilation.
- `npm test`: **14 tests passed**. Covers Arabic defaults and saved-locale recovery, catalog/option translation coverage, multilingual search, canonical option stability, customer-content preservation in all three inquiry languages, plus all 12 categories and unique product IDs; compound Hebrew search/filtering; print-type compatibility filtering; product-specific upload rules; phone-model validation; quantity/clothing validation; gift progression; complete inquiry contents and URL encoding.
- Dependency audit after updating affected packages: **0 known vulnerabilities**.
- Production bundle: approximately 384 KB JavaScript / 117 KB gzip; 63 KB CSS / 14 KB gzip. Local WebP product assets total approximately 1.3 MB. Fonts are served locally with their license.

## Browser checks performed

| Check | Result |
| --- | --- |
| Homepage, entry animation, session-only replay | Passed; entry observed on first visit and absent on subsequent navigation/reload |
| Desktop visual layout | Inspected at 1440px; saved screenshot |
| Mobile visual layout | Inspected at 390px; saved screenshot |
| Horizontal overflow | None observed on homepage at 320, 390, 768 and 1440px, or on mobile product/catalog pages |
| Mobile menu | Opened, navigation worked, closed after selection; focus moved to close control |
| Promotional carousel | Automatic rotation, pause/resume, arrows, dots and horizontal pointer swipe verified |
| Category and product routing | Navigated to categories and dedicated product pages; refreshed product route successfully |
| Search and meaningful filters | Prints → canvas returned only the canvas concept; Hebrew search for a couple print returned the matching product |
| Personalization | Hebrew name/message, template and finish updated; preview reflected the edits |
| Image upload | A project-owned WebP image appeared in the preview and persisted after reload through IndexedDB |
| Local drafts and favorites | Name, message, style, uploaded image, basket count and favorite survived reload |
| Inquiry basket | Personalized item retained values and attachment filename; review produced an encoded WhatsApp link for the supplied number |
| Phone cases | Empty brand/model blocked adding to basket; choosing Apple populated the data-driven model list |
| Gift builder | All seven stages completed with occasion, box/color, two different products, separate customizations and greeting |
| Gift persistence | Reload preserved the greeting and selected products; final message contained both personalizations and box details |
| Contact form | Prepared the requested message locally and exposed a WhatsApp link; no external message was sent |
| Portfolio | Dedicated route displayed explicitly labeled original inspiration placeholders |
| Instagram | Link destinations inspected; no live integration or fabricated feed |
| Image loading / RTL | No broken loaded images observed; Arabic/Hebrew use RTL; English uses LTR; document language updates correctly |
| Production console | No warnings/errors observed from the production preview origin |
| Production HTTP routes | Homepage and representative nested routes returned successful responses with SPA fallback |

## Trilingual update checks

- Fresh production origin opened in Arabic with `lang=ar`, `dir=rtl`, and the English BRAA GRAPHIX wordmark.
- Arabic → English → Hebrew → Arabic switches updated content and document direction. English and Arabic choices persisted after reload.
- Desktop selector, mobile announcement selector and mobile menu selector worked.
- Existing product name, message, selected style/finish, upload URL, positioning, quantity and notes were identical before and after switching languages; saved basket and gift remained available.
- All seven gift-builder steps checked in Arabic; customer-written Hebrew remained unchanged. Generated inquiry labels and options switched languages.
- Arabic catalog, phone-case page, services, portfolio, about, contact and privacy pages contained no leftover Hebrew interface text. English equivalents, basket and gift builder also checked; preserved customer content was excluded from this audit.
- Arabic homepage inspected at 320, 390, 768 and 1440px. English homepage checked at 320, 390 and 1440px. A narrow English artwork overflow was corrected and rechecked. Product, catalog, gift, basket, services and contact pages showed no horizontal overflow at 390px.
- Clean production preview: no console warnings/errors from the production origin. Development hot reload briefly invalidated the React context while its module was being edited; full navigation and production loading were clean.
- `npm test` and `npm run build` passed after the final source changes.

## Scope and limits

- Browser tests used the in-app browser and viewport resizing, not a physical-device lab. Horizontal pointer swipe was tested; individual mobile browser/OS combinations were not exhaustively tested.
- Reduced-motion behavior is implemented through CSS media rules and an autoplay guard. Code reviewed; OS reduced-motion settings were not changed during this test.
- Keyboard focus styles, native form controls, mobile-menu focus handling, skip link, labels, and slider alternatives are implemented. This is not a certified accessibility audit or a full screen-reader test.
- The preview is illustrative rather than a production artwork proof. Final size, alignment, colors, image resolution and print suitability require studio review.
- No live payments, inventory, private upload server, Instagram feed, or cloud order database are represented as implemented. These were deliberately outside the inquiry-only version.
- No WhatsApp message was sent. The generated content, destination and encoding were inspected before the external handoff.
- Brand logo and introduction-post image were not present in the attachment. The wordmark is temporary; product images are labeled generated demos.
- Product concepts and requested options remain subject to business confirmation. Prices and production time are unset.
- Source repository: `https://github.com/moosev133/braa-graphics` (private). Public review hosting is configured through Sites at `https://braa-graphics.meliodasin14.chatgpt.site`, with single-page application fallback. The electronics-store project was not modified.

## Review images

- `desktop-preview.jpg`: Arabic production homepage at desktop width.
- `mobile-preview.jpg`: Arabic production homepage at mobile width.
- `english-preview.jpg`: English production homepage at desktop width.

Start the project with the README commands to repeat interactive review. Temporary QA preview servers were stopped after the checks.

## November 4 catalog and palette update

- 21 automated tests pass, including seven hierarchy/localization/compatibility tests. TypeScript checks pass.
- 11 main categories; all 46 nodes have products. Parent membership includes all descendants without duplicate cards. Printing shows 53 distinct concepts across boards (4), paper (25), and products (28); four notebook concepts belong to both paper and product printing.
- Browser checks: printing → boards → wood; nested tabs and ancestor breadcrumbs; paper → business cards; products → phone cases; cups ready/custom; notebooks ready/custom; handmade accessories. Observed counts match the data.
- Arabic, Hebrew and English switch category titles, all tabs and product content, with RTL/LTR and English wordmark retained.
- Responsive checks at 1440, 390 and 320 CSS pixels: no horizontal document overflow on the checked catalog, home, or ready-made product pages.
- Six new category images load; new incense product offers gift-card/wrapping personalization and no image-printing upload.
- Old `/category/cases` redirects to `/category/printing/products/phone-cases`; all original 75 product IDs resolve for stored drafts and baskets.
- Gift-builder board filter shows four matching products. Existing two-item gift content was retained and its final review step restored after inspection.
- Browser console: no errors or warnings during these checks. No WhatsApp messages sent.
- Interface colors changed to deep teal, warm ivory, soft peach and sage. Product customization color values and stored customer selections remain unchanged.

## Original palette restored — November 4

The user requested keeping the original pink palette until replacement colors are supplied. Restored the exact original base stylesheet, Home/product color values, favicon, and browser theme color from the pre-catalog version. Added category panels use matching blush and lavender tones. Source comparisons confirm category definitions, memberships, routing, and personalization behavior are unchanged apart from color values. The established 21-test catalog validation remains applicable.

Verified the restored cream background, plum text, blush announcement bar and pink/lavender category panels in the browser. Desktop and 390px mobile catalog views retain all nested tabs and the four board-printing products without horizontal overflow.

## Quote mugs collection — November 15, 2026

- Added the 13 mug images supplied on November 14, under Cups → Quote mugs (`/category/mugs/quotes`). Each JPEG is byte-for-byte identical to its supplied file; checksums are in `docs/quote-mugs-images.json`.
- All 24 tests pass, including the existing catalog/localization checks and three new checks for collection membership, image integrity, page markup and identifiable inquiry details.
- Static React rendering verifies that all 13 photo cards appear without the generated-image label and the product page defaults to its supplied photo. Optional personalization remains limited to the gift card/wrapping.
- The local collection route returned HTTP 200. Browser visual/interaction QA was unavailable because local browser use is disabled in Work settings; no alternative browser automation was used.
- Existing colors, product IDs, saved drafts, and nested printing categories are preserved. No WhatsApp message was sent.

## Stanley tumblers collection — November 15, 2026

- Added all five supplied JPEGs unchanged under Cups → قناني ستانلي (`/category/mugs/stanley`), each with its own product page. Source checksums match `docs/stanley-bottles-images.json`.
- All 27 tests pass. Shared supplied-photo checks cover both collections: parent and child membership, image integrity, collection links and cards, photo-first product pages, and inquiry details in Arabic, Hebrew and English. Existing catalog and saved-product checks also pass.
- Static React rendering verifies the new subcategory link and its five supplied-photo cards. Browser visual/interaction QA remains unavailable because local browser use is disabled in Work settings.
- The original pink styling and all existing category/product IDs are unchanged. No WhatsApp message was sent.

## Eight ready-made cup photos — November 15, 2026

- Added the eight supplied JPEGs under Cups → Ready-made cups (`/category/mugs/ready`), also visible in the main Cups “All” view. Each supplied photo has a separate product page; checksums match the original uploads in `docs/ready-mugs-images.json`.
- All 30 tests pass. Shared supplied-photo checks now cover the quote mugs, Stanley tumblers, and ready-made cups, including category membership, image integrity, photo-first product pages and translated inquiry details. The two existing ready-made cup entries remain in the same collection.
- Static React rendering confirms ten cards in Ready-made cups, including all eight new photos. Only the two earlier illustrative entries have illustration labels.
- Browser visual/interaction QA remains unavailable because local browser use is disabled in Work settings. The existing design, palette, languages, product IDs and other collections are preserved.
