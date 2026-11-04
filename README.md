# SELESTIN Professional — website

Marketing and catalogue website for **SELESTIN Professional** (Xplore Beauty Wellness LLP), built with
**Next.js 16 (App Router) + Payload CMS 3 + PostgreSQL**, hosted on **Railway**. Pages, products, ranges, banners,
blog posts, navigation, footer and company details are managed in the Payload admin at `/admin`. Customer and
salon/distributor enquiries are validated on the server, stored in the admin and emailed to the company.

| | |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide icons |
| CMS | Payload 3.92 (admin at `/admin`, REST at `/api`, GraphQL at `/api/graphql`) |
| Database | PostgreSQL 16 via `@payloadcms/db-postgres` (schema changes via migrations) |
| Forms | Server actions + Zod validation, honeypot / time-trap / rate-limit spam protection, email alerts |
| SEO | Per-page meta + Open Graph (Payload SEO plugin), canonical URLs, `sitemap.xml`, `robots.txt`, Organization / Breadcrumb / Product / BlogPosting JSON-LD |
| Analytics | Google Analytics 4 and Search Console verification, both set in **Site settings → Analytics** |

---

## 1. Local development

**Requirements:** Node.js 20.9+ (22 or 24 recommended), pnpm 9+ (`corepack enable`), PostgreSQL 14+.

```bash
pnpm install
cp .env.example .env          # then fill in the values (see below)
pnpm migrate                  # create / update the database tables
pnpm seed                     # load the brochure content (optional but recommended)
pnpm dev                      # http://localhost:3000  ·  admin: http://localhost:3000/admin
```

### Environment variables (`.env`)

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | `postgres://USER:PASSWORD@HOST:5432/DBNAME` |
| `PAYLOAD_SECRET` | yes | Long random string for signing auth tokens. Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXT_PUBLIC_SERVER_URL` | yes | Public site URL, no trailing slash. Used for canonical URLs, sitemap, Open Graph images. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_ADDRESS`, `SMTP_FROM_NAME` | for email alerts | Without them enquiries are still stored in the admin, but no alert email is sent. |

`.env` is git-ignored. Never commit real credentials; `.env.example` holds placeholders only.

**This machine:** a project-local PostgreSQL cluster lives in `.pgdata/` (port **5433**, git-ignored) and `.env`
points at it. Start it after a reboot, before `pnpm dev`:

```bash
pnpm db:start
pnpm db:stop
```

### Creating admin users

1. Open **`/admin`**. When no users exist, Payload shows **“Create your first user”** — enter email + password.
2. Further logins for the client's team are added under **Admin → Users** (only logged-in admins can do this).

Logins lock for 15 minutes after 5 failed attempts.

---

## 2. Database migrations

The Postgres adapter runs with `push: false`, so **the schema only changes through migration files** in
`src/migrations/` (committed to git).

| Task | Command |
|---|---|
| Apply pending migrations | `pnpm migrate` |
| Check status | `pnpm migrate:status` |
| After changing a collection / global / block | `pnpm migrate:create <name>` → review the file → `pnpm migrate` → commit it |
| Regenerate TypeScript types after schema changes | `pnpm generate:types` |
| Regenerate admin import map after adding admin components | `pnpm generate:importmap` |

Tip: when a change both removes and adds a column on the same table, `migrate:create` asks whether it is a rename.
Split such changes into an "add" migration and a later "drop" migration to avoid the prompt.

---

## 3. Content management (Payload admin)

| Admin section | What it controls |
|---|---|
| **Content → Pages** | Home (`slug: home`), About Us, Salon Partner, Contact Us, Privacy Policy, Terms and Conditions — each built from blocks. Draft/publish with version history. |
| **Content → Banners** | Home hero slides (**placement: Home hero slider**) and offers (**placement: Offers strip**). Untick *Active* or set start/end dates to schedule them. |
| **Content → Blog posts** | Blog at `/blog`: title, excerpt, cover image, rich-text content (with images), publish date, SEO tab (meta title, description, OG image). |
| **Catalogue → Products** | Images & gallery, before & after image pairs, size, summary, description, badges, free-from (sulfate / paraben / formaldehyde / colophony), *Professional only*, range, category, audience (salon / home care), concerns, benefits, key / full ingredients, SEO. Tick **Best seller** to include in best-seller grids. Unpublish to hide a product. |
| **Catalogue → Ranges** | Nano Silk Arginina, Keratin Shine Bond, Morocco Argan Serum, Skincare, Premium Wax — each with a story and its own page at `/ranges/<slug>`. *Sort order* arranges them. |
| **Catalogue → Product categories** | Hair Care, Skin Care, Waxing (shop filter and `/collections/<slug>`). |
| **Content → Media** | Image library. **Alt text is required.** Set a focal point to control cropping. |
| **Enquiries** | Website form submissions — admin-only. *Kind* is **Customer** (Contact page) or **Salon / distributor partner** (Salon Partner page); status New / Contacted / Closed. |
| **Settings → Site settings** | Company name, address, phone, email, **WhatsApp number**, Google Maps embed, SEO defaults, **Analytics** (GA4 ID, Search Console code), enquiry notification email. |
| **Settings → Header / Footer** | Announcement bar, navigation (items can have **dropdown links**, e.g. Ranges), header button, footer columns. |

**Page blocks:** Banners · Hero slider · Page header · Feature strip · Range grid · Category grid · Image + text ·
Icon columns · Numbered product system · Product grid (best sellers / range / category / hand-picked / all) ·
Call to action · Contact details + form (customer or partner form, optional map) · Text · Company details — plus the
editorial blocks used by homepage v2 and the studio blocks used by homepage v3 (Split hero · Tagline strip ·
Statement · Call-to-action band). Several blocks have a *style / layout / card style* option that switches them to
the v3 look, and sections can use the *Light grey* or *Gold* background.

**Shop** (`/shop`) is built from the products: search, and filters by range, category, concern and audience.
Concern options are defined in code (`src/fields/productOptions.ts`) — ask a developer to add one.

**WhatsApp:** once **Site settings → WhatsApp number** is filled in, every product page gets a *WhatsApp enquiry*
button with the product name pre-filled, and the contact block and footer show the number.

**Policy pages** were created as **drafts** with placeholder text. Paste the client's text into
**Pages → Privacy Policy / Terms and Conditions** and publish; the footer “Legal” links appear automatically once
the pages are published.

### Alternative homepage designs

Two alternative homepages exist for comparison (noindex, not linked):

- **`/home-v2`** — editorial design (serif display type, arches, scrolling ribbon).
- **`/home-v3`** — studio design (clean Inter headings, gold fills, split hero). Its three model photos
  (`stylist-portrait`, `salon-styling`, `glossy-hair`) are AI-generated stand-ins from the design mock-up;
  replace them with real photography before launch.

To make one the live homepage: change **Home**'s slug to `home-v1` and tick *Hide from search engines*; change
the chosen page's slug to `home` and untick it. Publish both.

**Publishing:** saving or publishing in the admin refreshes the affected pages immediately. Pages also refresh
hourly as a safety net.

**Re-running the seed** (`pnpm seed`) restores the brochure content and **overwrites edits** to seeded pages,
products, ranges, categories, banners and globals (policy pages are only created, never overwritten) — only use it
on a fresh database or to reset.

---

## 4. Deployment on Railway

The repo includes `railway.json` (build: `pnpm migrate && pnpm build`, start: `pnpm start`).

1. Create a Railway project with a **PostgreSQL** service and a service from this GitHub repo.
2. On the web service set the variables:
   - `DATABASE_URL` = `${{Postgres.DATABASE_PUBLIC_URL}}` — the **public** URL, because Railway's private network
     is not available during builds and the build pre-renders pages from the database.
   - `PAYLOAD_SECRET` = a new random string (never reuse the local one).
   - `NEXT_PUBLIC_SERVER_URL` = `https://selestinprofessional.com` (or the Railway URL until the domain is connected).
   - `SMTP_*` for enquiry alerts.
3. **Add a volume mounted at `/app/media`.** Uploaded images are stored on disk; without a volume they are lost on
   every redeploy.
4. Deploy. Migrations run in the build step (and again, harmlessly, when the server starts).
5. Load the brochure content once, **inside the Railway service** so the images land on the volume:
   `railway ssh` → `pnpm seed`.
6. Open `/admin`, create the first user, add the team's logins, fill in WhatsApp / GA4 / Search Console in
   **Site settings**, and publish the policy pages.
7. Connect `selestinprofessional.com` under the service's **Networking → Custom domain** (Railway issues SSL).
   Then submit `https://selestinprofessional.com/sitemap.xml` in Search Console.

Keeping it light for the $5 plan: one web service + one Postgres; pages are pre-rendered and cached for an hour;
images are resized by Next.js on demand.

> The build and dev scripts use webpack (`--webpack`) because Next 16's Turbopack currently fails to resolve
> `next/font/google` in this project. pnpm uses a flat (`nodeLinker: hoisted`) `node_modules`, and
> `pnpm-workspace.yaml` overrides a few vulnerable transitive dependencies; `pnpm audit` should show no high or
> critical issues.

---

## 5. Enquiry forms & email

- **Customer form** (Contact page): name*, email*, phone, salon/business, city, enquiry type*, product, message*.
  `/contact?product=<slug>` preselects a product (used by every “Enquire” button).
- **Salon / distributor form** (Salon Partner page): salon or distributor*, name*, business name*, phone/WhatsApp*,
  email*, city*, message.
- Validation runs on the server (Zod, `src/lib/validation/inquiry.ts`); errors are shown per field.
- Spam protection: hidden honeypot field, minimum fill time, 5 submissions / 10 min per IP.
- Both are saved to **Enquiries** (the public API cannot read or create them) and a success message is only shown
  after the enquiry is stored.
- **Email alert:** set the `SMTP_*` variables and **Site settings → Notifications → Enquiry notification email**
  (seeded as `info@xplorebeauty.com`). Email failures are logged and never lose the enquiry.

---

## 6. Project structure

```
src/
  app/
    (frontend)/            public site: home, [slug] pages, shop, ranges, products, collections, blog, actions.ts
    (payload)/             Payload admin + REST/GraphQL routes (generated) and admin styles
    sitemap.ts robots.ts icon.svg
  access/                  access-control helpers
  blocks/                  Payload block configs (page builder)
  collections/             Pages, Posts, Banners, Products, Ranges, ProductCategories, Media, Inquiries, Users
  globals/                 Site settings, Header, Footer
  fields/                  shared fields: slug, link, icon, product options (audience, concerns, free-from)
  hooks/                   on-demand revalidation
  components/
    blocks/                one React component per block + RenderBlocks
    layout/ product/ forms/ ui/   header, footer, product card/gallery/before-after/shop filters, forms, primitives
  lib/                     data access (payload.ts), SEO, links, media, WhatsApp, validation
  migrations/              database migrations (commit these)
  seed/                    brochure content + images, `pnpm seed`
  payload.config.ts  payload-types.ts (generated)
public/brand/              logo SVGs (traced from the official logo) and favicon
```

Quality checks: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

---

## 7. Content notes — please review with the client

Source material: `salestin final.pdf` (12 image-based brochure pages), `logo.cdr.zip` (CorelDRAW logo) and the
client brief (Nov 2026).

1. **Brand spelling.** The logo and brochure spell the brand **SELĒSTIN / SELESTIN Professional**; the site uses the
   logo spelling. The back page of the brochure misspells it “SELESTN” — not used.
2. **Logo.** The CDR file only contained a 256 px preview, so the logo was vector-traced from the brochure.
   Please replace `public/brand/logo*.svg` and `src/components/ui/logoPath.ts` with an official SVG export.
3. **Address:** the brochure read “Banner Pune Maharashta”; following the brief (“Baner office”) it is now
   “E-602, Green Zone, Sr. No. 57+58, Baner, Pune, Maharashtra 411038”. Please confirm.
4. **Products vs. the brief.** The brief lists Nano Silk Arginina as five products (incl. Smoothing Mask). The site
   also has **Smoothing Prolonger Shampoo (300 ml)** from the brochure, placed in Nano Silk Arginina. The brochure
   shows Smoothing Mask (250 ml) and Smoothing Prolonger Shampoo (300 ml) as smaller, home-care sizes, but the brief
   says the range is for salons, so both are set to *Salon*. Confirm whether to keep, move or hide them.
5. **Shop filters to confirm:** each product's audience and concerns were assigned from the brochure wording
   (`src/seed/content.ts` → `catalogue`). *Professional only* is set on the products labelled “Professional Use /
   Only” in the brochure (Pre Clarifying Shampoo, Protein Hair Treatment, Prolonger Shampoo).
6. **Salon Partner benefits** are written neutrally from the brochure; commercial terms (margins, minimum order,
   training) are for the client to add.
7. **Skincare** has no specific products yet, so its range page shows an enquiry prompt. “Clinically proven results”
   is the brochure's claim — confirm it can be substantiated.
8. **Corrected typo:** brochure page 9 “REJJENATE & HYDRATE” is shown as “Rejuvenate & Hydrate”.
9. **Kept as written:** “Our Believe”, “Vegetables Oil”, “Liposoluable”, “Arginia / Arginina / Arginine”,
   “Sulfate / Sulphate”, “Sodium & Paraben Free” (Prolonger Shampoo label).
10. **Waiting for the client:** WhatsApp number, GA4 measurement ID, Search Console code, policy texts, blog posts,
    before & after photos, offers for the home page, domain access.
11. Product photos are cropped from the brochure. For sharper pages, upload original photography in **Media**.
