# SELESTIN Professional — website

Marketing and catalogue website for **SELESTIN Professional** (Xplore Beauty Wellness LLP), built with
**Next.js 16 (App Router)**. There is no CMS and no database: all page content, products, navigation, footer and
company details live in JSON files in `src/content/`, and every page is pre-rendered at build time. Website
enquiries are validated on the server and emailed to the company.

| | |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide icons |
| Content | JSON files in `src/content/`, images in `public/media/` |
| Forms | Server action + Zod validation, honeypot / time-trap / rate-limit spam protection, email via nodemailer |
| SEO | Per-page meta + Open Graph, canonical URLs, `sitemap.xml`, `robots.txt`, Organization & Breadcrumb JSON-LD |

> Until October 2026 the site used Payload CMS + PostgreSQL. That setup was removed; a full backup of the old code
> and a database dump are in `D:\salestin-payload-backup-2026-10-28`.

---

## 1. Local development

**Requirements:** Node.js 22.23+ or 24.22+, pnpm 9+ (`corepack enable`).

```bash
pnpm install
cp .env.example .env          # then fill in the values (see below)
pnpm dev                      # http://localhost:3000
```

### Environment variables (`.env`)

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SERVER_URL` | yes | Public site URL, no trailing slash. Used for canonical URLs, sitemap, Open Graph images. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_ADDRESS`, `SMTP_FROM_NAME` | in production | Delivers enquiry emails (see §4). |

`.env` is git-ignored. Never commit real credentials; `.env.example` holds placeholders only.

---

## 2. Editing content

Edit the files below, then rebuild/redeploy (`pnpm dev` picks up changes immediately).

| File | What it controls |
|---|---|
| `src/content/pages.json` | Home (`slug: home`), About Us, Contact, Home v2 — each a list of blocks in `layout`. |
| `src/content/products.json` | Products: images & gallery, line, size, summary, description, badges, benefits, ingredients, SEO (`meta`). `featured: true` includes a product in “featured” grids; `sortOrder` sets the order. |
| `src/content/categories.json` | Hair Care, Skin Care, Waxing (`/collections/<slug>`). |
| `src/content/site-settings.json` | Company name, address, phone, email, website, SEO defaults, enquiry email address. |
| `src/content/header.json`, `footer.json` | Announcement bar, navigation links, header button, footer columns. |
| `src/content/media.json` | Alt text, dimensions and focal point for each image in `public/media/`. |
| `src/content/types.ts` | TypeScript types describing all of the above. |

References between files use readable keys, resolved by `src/lib/content.ts`:

- **Images** by file name: `"image": "argan-serum.jpg"`. To add an image, put it in `public/media/` and add an
  entry (at least `id`, `alt`, `width`, `height`, `sizes: {}`) to `media.json`. Alt text is required.
- **Products / categories** by slug: `"category": "hair-care"`, `"products": ["prolonger-shampoo", …]`.
- **Links:** `{ "type": "internal", "reference": { "relationTo": "pages", "value": "contact" }, "label": "…" }`
  (`relationTo` is `pages`, `products` or `product-categories`), or `{ "type": "custom", "url": "/products" }`.

An unknown image or slug fails the build with a message naming it.

**Page blocks** (`blockType`): `heroSlider` · `pageHero` · `featureStrip` · `categoryGrid` · `splitContent` ·
`pillars` · `productSteps` · `productGrid` · `ctaBanner` · `contactSection` · `richText` — plus the editorial
blocks used by homepage v2: `editorialHero` · `marquee` · `manifesto` · `pillarIndex` · `productCarousel` ·
`ingredientSpotlight` · `statementCta`. Each has a component in `src/components/blocks/`; see `types.ts` for fields.
Rich-text fields (`description`, `body`, `content`) use Lexical JSON, rendered by `src/components/ui/RichText.tsx`.

### Homepage version 2

An alternative, editorial homepage design lives at **`/home-v2`** (page “Home (version 2)”). It has
`"hideFromSearch": true` (noindex, not in the sitemap) and is not linked in the navigation.

To make it the live homepage, in `pages.json` change the current home page's slug to `home-v1` and set its
`hideFromSearch` to `true`, then change `home-v2`'s slug to `home` and remove its `hideFromSearch`.

---

## 3. Production deployment

The site is a standard Node.js Next.js app. Any host that runs `next start` works (VPS, Render, Railway, Fly.io,
DigitalOcean App Platform, Vercel, Docker).

```bash
pnpm install --frozen-lockfile
pnpm build              # pre-renders every page
pnpm start              # PORT defaults to 3000
```

Checklist:

- Set `NEXT_PUBLIC_SERVER_URL=https://your-domain` (used in canonical URLs and the sitemap) and the `SMTP_*`
  variables.
- Put HTTPS and a CDN/WAF in front. The form's rate limiter is in-memory per server instance; with several
  instances, add rate limiting at the proxy/WAF.
- **Docker:** `docker build --build-arg NEXT_PUBLIC_SERVER_URL=… -t selestin .` then run with the `SMTP_*` env vars.

> The build and dev scripts use webpack (`--webpack`) because Next 16's Turbopack currently fails to resolve
> `next/font/google` in this project.

---

## 4. Enquiry form & email

- Fields: name*, email*, phone, salon/business, city, enquiry type*, product, message*. Opening
  `/contact?product=<slug>` preselects a product (used by every “Enquire” button).
- Validation runs on the server (Zod, `src/lib/validation/inquiry.ts`); errors are shown per field.
- Spam protection: hidden honeypot field, minimum fill time, 5 submissions / 10 min per IP.
- Each enquiry is **emailed** to `enquiryNotificationEmail` in `site-settings.json` (falls back to `email`), with
  the sender as reply-to. **Enquiries are not stored anywhere else**, so a success message is only shown after the
  email was accepted by the SMTP server.
- Without `SMTP_HOST`: in development the enquiry is printed to the server console; in production the form shows
  an error asking visitors to phone or email instead.

---

## 5. Project structure

```
src/
  app/
    (frontend)/            public site: layout, home, [slug] pages, products, collections, actions.ts (form)
    sitemap.ts robots.ts icon.svg
  content/                 site content (JSON) + types.ts
  components/
    blocks/                one React component per block + RenderBlocks
    layout/ product/ forms/ ui/   header, footer, product card/gallery, enquiry form, primitives
  lib/                     content loading (content.ts), SEO, links, media, validation
public/brand/              logo SVGs (traced from the official logo) and favicon
public/media/              content images (with pre-made 400/900/1200 px sizes)
```

Quality checks: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

---

## 7. Content notes — please review with the client

Source material: `salestin final.pdf` (12 image-based brochure pages) and `logo.cdr.zip` (CorelDRAW logo).

1. **Brand spelling.** The logo and brochure spell the brand **SELĒSTIN / SELESTIN Professional**; the project
   brief said “Salestin”. The site uses the logo spelling. The back page of the brochure misspells it
   “SELESTN” — not used.
2. **Logo.** The CDR file only contained a 256 px preview, so the logo was vector-traced from the brochure.
   Please replace `public/brand/logo*.svg` and `src/components/ui/logoPath.ts` with an official SVG export when
   available (the ® mark was too small to trace).
3. **Address kept verbatim:** “E-602, Green Zone Sr. No. 57+58, Banner Pune Maharashta-411038”. “Maharashta”
   (Maharashtra?) and “Banner” (Baner?) look like typos — confirm and fix in `src/content/site-settings.json`.
4. **Corrected typo:** brochure page 9 “REJJENATE & HYDRATE” is shown as “Rejuvenate & Hydrate”.
5. **Kept as written:** “Our Believe”, “Vegetables Oil”, “Liposoluable”, and the product-name variants
   “Arginia / Arginina / Arginine”, “Sulfate / Sulphate”, “Sodium & Paraben Free” (Prolonger Shampoo label).
6. **Product structure is an interpretation.** The brochure shows a 1000 ml salon line (Pre Clarifying Shampoo,
   Protein Treatment, Prolonger Shampoo, Prolonger Mask, Argan Serum) and smaller home-care items (300 ml
   Smoothing Prolonger Shampoo, 250 ml Smoothing Mask). These are modelled as separate products. Confirm whether
   e.g. *Prolonger Mask* and *Smoothing Mask* are the same product.
7. **Sizes read from packaging photos:** Prolonger Mask “500 ml” is partly blurred on the label — please confirm.
8. **“Exclusively for professional salons · B2B · Not for retail sale”** appears in the brochure only for the
   Nano Silk Arginia Treatment, so it is only used there and on the Contact page — not site-wide.
9. **Skin Care** (brochure page 9) has no specific products, so the category page shows the brochure claims and an
   enquiry prompt. “Clinically proven results” is the brochure's claim — confirm it can be substantiated.
10. **Not created** (no source content): Privacy Policy, Terms, testimonials, prices, social media links,
    statistics. The site collects personal data through the enquiry form — a **privacy policy is recommended**
    before launch (add it to `pages.json` with a `richText` block and link it in `footer.json`).
11. Product photos and model imagery are cropped from the brochure. For sharper product pages, add original product
    photography to `public/media/` + `media.json` and assign it to each product.
