/**
 * Seeds the CMS with the content from the brand brochure.
 * Run with `pnpm seed`. Safe to re-run: documents are matched by slug or
 * filename and updated in place, so editor changes to seeded docs are overwritten.
 */
import path from 'path'
import { getPayload, type Payload } from 'payload'
import { fileURLToPath } from 'url'

import config from '../payload.config'
import {
  brandValues,
  catalogue,
  categories,
  media,
  mediaFocal,
  type MediaKey,
  partnerBenefits,
  pillars,
  products,
  qualityPromise,
  ranges,
  settings,
  treatments,
  treatmentsSection,
} from './content'
import { richText } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = { disableRevalidate: true }

type Ref = { relationTo: 'pages' | 'products' | 'product-categories' | 'ranges'; value: number }
const internal = (label: string, reference: Ref) => ({ type: 'internal' as const, label, reference })
const custom = (label: string, url: string) => ({ type: 'custom' as const, label, url })

async function seedMedia(payload: Payload) {
  const ids = {} as Record<MediaKey, number>
  for (const [key, alt] of Object.entries(media) as [MediaKey, string][]) {
    const filename = `${key}.jpg`
    const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
    if (existing.docs[0]) {
      ids[key] = existing.docs[0].id
      await payload.update({ collection: 'media', id: existing.docs[0].id, data: { alt, ...mediaFocal[key] }, context: ctx })
      continue
    }
    const doc = await payload.create({
      collection: 'media',
      data: { alt, ...mediaFocal[key] },
      filePath: path.resolve(dirname, 'images', filename),
      context: ctx,
    })
    ids[key] = doc.id
  }
  payload.logger.info(`Media ready (${Object.keys(ids).length})`)
  return ids
}

async function upsert<C extends 'pages' | 'products' | 'product-categories' | 'ranges'>(
  payload: Payload,
  collection: C,
  slug: string,
  data: Record<string, unknown>,
): Promise<number> {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, draft: true })
  const args = { collection, data: { ...data, slug } as never, context: ctx }
  const doc = existing.docs[0]
    ? await payload.update({ ...args, id: existing.docs[0].id })
    : await payload.create(args)
  return doc.id as number
}

/** Banners have no slug: they are matched by placement + heading. */
async function upsertBanner(payload: Payload, data: Record<string, unknown> & { placement: string; heading: string }) {
  const existing = await payload.find({
    collection: 'banners',
    where: { and: [{ placement: { equals: data.placement } }, { heading: { equals: data.heading } }] },
    limit: 1,
  })
  const args = { collection: 'banners' as const, data: data as never, context: ctx }
  if (existing.docs[0]) await payload.update({ ...args, id: existing.docs[0].id })
  else await payload.create(args)
}

async function main() {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding SELESTIN Professional content…')

  const img = await seedMedia(payload)

  const cat = {} as Record<string, number>
  for (const c of categories) {
    cat[c.slug] = await upsert(payload, 'product-categories', c.slug, {
      title: c.title,
      sortOrder: c.sortOrder,
      tagline: c.tagline,
      description: c.description,
      image: img[c.image],
      highlights: c.highlights.map((text) => ({ text })),
    })
  }

  const range = {} as Record<string, number>
  for (const r of ranges) {
    range[r.slug] = await upsert(payload, 'ranges', r.slug, {
      title: r.title,
      sortOrder: r.sortOrder,
      tagline: r.tagline,
      summary: r.summary,
      story: richText(...r.story),
      image: img[r.image as MediaKey],
      audience: [...r.audience],
    })
  }

  const prod = {} as Record<string, number>
  for (const p of products) {
    const facts = catalogue[p.slug]
    if (!facts) throw new Error(`No catalogue facts for product "${p.slug}"`)
    prod[p.slug] = await upsert(payload, 'products', p.slug, {
      ...p,
      _status: 'published',
      category: cat[p.category],
      range: range[facts.range],
      audience: facts.audience,
      concerns: facts.concerns,
      freeFrom: facts.freeFrom ?? [],
      professionalOnly: Boolean(facts.professionalOnly),
      featured: Boolean(p.featured),
      image: img[p.image],
      badges: (facts.badges ?? p.badges ?? []).map((text) => ({ text })),
      gallery: p.gallery?.map((g) => ({ image: img[g.image], caption: g.caption })),
    })
  }
  payload.logger.info(`Products ready (${products.length})`)

  const productRef = (slug: string): Ref => ({ relationTo: 'products', value: prod[slug] })
  const rangeRef = (slug: string): Ref => ({ relationTo: 'ranges', value: range[slug] })

  const treatmentCards = (style: 'studio' | 'editorial', background: string) => ({
    blockType: 'treatmentCards',
    ...treatmentsSection,
    style,
    background,
    items: treatments.map(({ link, ...t }) => ({
      ...t,
      link: link
        ? {
            type: 'internal',
            reference:
              link.relationTo === 'products' ? productRef(link.slug) : rangeRef(link.slug),
          }
        : undefined,
    })),
  })

  // Contact and Salon Partner first so other pages can link to them.
  const contactId = await upsert(payload, 'pages', 'contact', {
    title: 'Contact Us',
    _status: 'published',
    meta: {
      title: 'Contact Us | SELESTIN Professional',
      description: 'Contact SELESTIN Professional (Xplore Beauty Wellness LLP), Baner, Pune: product enquiries, WhatsApp, phone and email.',
    },
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'Contact us',
        heading: 'We would love',
        headingAccent: 'to hear from you.',
        intro: 'Questions about a product or where to find SELESTIN Professional? Send us a message.',
      },
      {
        blockType: 'contactSection',
        eyebrow: 'Get in touch',
        heading: 'SELESTIN Professional',
        formHeading: 'Send us an enquiry',
        showForm: true,
        formType: 'customer',
        showContactDetails: true,
        showMap: true,
      },
    ],
  })
  const contactRef: Ref = { relationTo: 'pages', value: contactId }

  const partnerId = await upsert(payload, 'pages', 'salon-partner', {
    title: 'Salon Partner',
    _status: 'published',
    meta: {
      title: 'Become a Salon Partner | SELESTIN Professional',
      description:
        'Partner with SELESTIN Professional: professional hair care, salon-exclusive treatments and premium wax for salons and distributors.',
      image: img['smoothing-mask-model'],
    },
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'For salons & distributors',
        heading: 'Partner with us',
        headingAccent: 'to deliver expert hair transformations.',
        intro: 'Exclusively for professional salons. B2B products, not for retail sale.',
        image: img['smoothing-mask-model'],
      },
      {
        blockType: 'pillars',
        eyebrow: 'Why partner with SELESTIN',
        heading: 'Professional Salon Solutions.',
        headingAccent: 'Trusted by Experts.',
        items: partnerBenefits,
        background: 'cream',
      },
      {
        blockType: 'productSteps',
        eyebrow: 'Salon system',
        heading: 'Nano Silk Arginina',
        products: [
          prod['pre-clarifying-shampoo'],
          prod['nano-silk-arginia-protein-treatment'],
          prod['prolonger-shampoo'],
          prod['prolonger-mask'],
        ],
        image: img['nano-silk-treatment'],
        background: 'white',
      },
      {
        blockType: 'contactSection',
        eyebrow: 'Salon & distributor enquiries',
        heading: 'Become a partner',
        intro: 'Tell us about your salon or distribution business and our team will get back to you.',
        formHeading: 'Partner enquiry',
        showForm: true,
        formType: 'partner',
        showContactDetails: true,
        showMap: false,
      },
    ],
  })
  const partnerRef: Ref = { relationTo: 'pages', value: partnerId }

  const aboutId = await upsert(payload, 'pages', 'about-us', {
    title: 'About Us',
    _status: 'published',
    meta: {
      title: 'About Us | SELESTIN Professional',
      description:
        'Luxury in Every Strand. Inspiration in Every Innovation. Our story, our R&D, our quality promise and Xplore Beauty Wellness LLP.',
    },
    layout: [
      {
        blockType: 'pageHero',
        eyebrow: 'About us',
        heading: 'Where Luxury Meets Science.',
        headingAccent: 'Where Beauty Begins.',
        image: img['brand-portrait'],
      },
      {
        blockType: 'splitContent',
        eyebrow: 'Our story',
        heading: 'SELESTIN Professional',
        headingAccent: 'Luxury in Every Strand.',
        body: richText(pillars[0].text, pillars[1].text, pillars[4].text),
        image: img['hero-models'],
        imagePosition: 'left',
        background: 'white',
      },
      {
        blockType: 'splitContent',
        eyebrow: 'Our R&D approach',
        heading: 'Advanced science,',
        headingAccent: 'the finest ingredients.',
        body: richText(pillars[2].text, pillars[3].text),
        image: img['argan-serum'],
        imagePosition: 'right',
        background: 'cream',
      },
      {
        blockType: 'pillars',
        eyebrow: 'Our quality promise',
        heading: 'Care you can trust',
        items: qualityPromise,
        background: 'white',
      },
      {
        blockType: 'companyDetails',
        eyebrow: 'The company',
        heading: 'Xplore Beauty Wellness LLP',
        body: richText('SELESTIN Professional is a brand of Xplore Beauty Wellness LLP, based in Baner, Pune.'),
        background: 'lavender',
      },
      { blockType: 'rangeGrid', eyebrow: 'Explore', heading: 'Our Ranges', background: 'white' },
      {
        blockType: 'ctaBanner',
        eyebrow: 'Exclusively for professional salons',
        heading: 'Partner with us',
        headingAccent: 'to deliver expert hair transformations.',
        primaryCta: internal('Become a salon partner', partnerRef),
        secondaryCta: internal('Contact us', contactRef),
        image: img['smoothing-mask-model'],
        background: 'dark',
      },
    ],
  })
  const aboutRef: Ref = { relationTo: 'pages', value: aboutId }

  // Policy pages stay drafts until the client's own texts are pasted in and published;
  // the footer hides links to unpublished pages.
  const policy = async (slug: string, title: string) => {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, draft: true })
    if (existing.docs[0]) return existing.docs[0].id
    return upsert(payload, 'pages', slug, {
      title,
      _status: 'draft',
      layout: [
        { blockType: 'pageHero', heading: title },
        {
          blockType: 'richText',
          content: richText(`Paste the ${title} text here, then publish the page.`),
        },
      ],
    })
  }
  const privacyRef: Ref = { relationTo: 'pages', value: await policy('privacy-policy', 'Privacy Policy') }
  const termsRef: Ref = { relationTo: 'pages', value: await policy('terms-and-conditions', 'Terms and Conditions') }

  // Hero slides, previously inline on the home page, are Banners now.
  const heroBanners = [
    {
      image: img['hero-models'],
      imagePosition: 'top',
      eyebrow: 'SELESTIN Professional',
      heading: 'Where Luxury Meets Science.',
      headingAccent: 'Where Beauty Begins.',
      text: 'Luxury in Every Strand. Inspiration in Every Innovation.',
      primaryCta: custom('Shop the range', '/shop'),
      secondaryCta: internal('Become a salon partner', partnerRef),
    },
    {
      image: img['smoothing-mask-model'],
      imagePosition: 'top',
      eyebrow: 'Nano Silk Arginina',
      heading: 'Smooth & Shiny',
      headingAccent: 'Hair, Every Day',
      text: 'Smoother. Shinier. Stronger.',
      primaryCta: internal('Discover the range', rangeRef('nano-silk-arginina')),
    },
    {
      image: img['argan-serum'],
      imagePosition: 'center',
      eyebrow: 'Luminous smoothening oil',
      heading: 'Morocco Argan Serum',
      text: 'For all hair types.',
      primaryCta: internal('Discover the serum', productRef('morocco-argan-serum')),
    },
    {
      image: img['wax-korean-glass'],
      imagePosition: 'top',
      eyebrow: 'Professional at Luxury Touch',
      heading: 'Premium Wax',
      headingAccent: 'For Smooth Perfection',
      text: 'Luxury Smooth — Silky • Gentle • Effective.',
      primaryCta: internal('Explore premium wax', rangeRef('premium-wax')),
    },
  ]
  for (const [i, b] of heroBanners.entries()) {
    await upsertBanner(payload, { ...b, placement: 'hero', sortOrder: i + 1, active: true })
  }

  const homeId = await upsert(payload, 'pages', 'home', {
    title: 'Home',
    _status: 'published',
    meta: { title: settings.defaultMetaTitle, description: settings.defaultMetaDescription, image: img['hero-models'] },
    layout: [
      { blockType: 'banners', placement: 'hero' },
      { blockType: 'banners', placement: 'offer', eyebrow: 'Offers', heading: 'Current offers' },
      {
        blockType: 'featureStrip',
        items: [
          { icon: 'droplet', title: 'Nourished & Healthy Hair' },
          { icon: 'waves', title: 'Smooth, Soft & Shiny' },
          { icon: 'shield', title: 'Stronger, More Manageable' },
          { icon: 'user', title: 'Professional Hair Care' },
        ],
      },
      {
        blockType: 'rangeGrid',
        eyebrow: 'Featured ranges',
        heading: 'Our Ranges',
        intro: 'Salon-grade hair care, skin care and premium wax.',
        background: 'white',
      },
      {
        blockType: 'productGrid',
        eyebrow: 'Complete Care. Visible Results.',
        heading: 'Best Sellers',
        source: 'featured',
        limit: 4,
        cta: custom('Shop all products', '/shop'),
        background: 'lavender',
      },
      {
        blockType: 'pillars',
        eyebrow: 'SELESTIN Professional',
        heading: 'Luxury in Every Strand.',
        headingAccent: 'Inspiration in Every Innovation.',
        items: brandValues,
        footnote: 'SELESTIN Professional – Where Luxury Meets Science. Where Beauty Begins.',
        background: 'cream',
      },
      {
        blockType: 'productSteps',
        eyebrow: 'Professional hair care',
        heading: 'Nano Silk Arginina',
        products: [
          prod['pre-clarifying-shampoo'],
          prod['nano-silk-arginia-protein-treatment'],
          prod['prolonger-shampoo'],
          prod['prolonger-mask'],
          prod['smoothing-mask'],
        ],
        image: img['range-nano-silk'],
        background: 'white',
      },
      {
        blockType: 'ctaBanner',
        eyebrow: 'For salons & distributors',
        heading: 'Become a SELESTIN',
        headingAccent: 'Salon Partner',
        intro: 'Professional salon solutions, trusted by experts. Partner with us to deliver expert hair transformations.',
        points: [
          { icon: 'ban', text: 'Formaldehyde Free' },
          { icon: 'ban', text: 'Sulfate Free' },
          { icon: 'ban', text: 'Paraben Free' },
          { icon: 'user', text: 'Professional Only' },
        ],
        primaryCta: internal('Become a partner', partnerRef),
        secondaryCta: internal('View the treatment', productRef('nano-silk-arginia-protein-treatment')),
        image: img['nano-silk-treatment'],
        background: 'dark',
      },
      {
        blockType: 'splitContent',
        eyebrow: 'Skincare',
        heading: 'Luxury Skincare',
        headingAccent: 'for Radiant Beauty',
        bullets: categories[1].highlights.map((text) => ({ text })),
        image: img.skincare,
        imagePosition: 'right',
        background: 'cream',
        cta: internal('Explore skincare', rangeRef('skincare')),
        footnote: 'Experience the difference.',
      },
    ],
  })

  // Alternative editorial homepage design, for comparison. Hidden from search engines.
  const ingredient = (productSlug: string, name: string) => {
    const p = products.find((x) => x.slug === productSlug)
    return { name, foundIn: p?.title, text: p?.keyIngredients?.find((k) => k.name === name)?.text }
  }
  await upsert(payload, 'pages', 'home-v2', {
    title: 'Home (version 2)',
    _status: 'published',
    hideFromSearch: true,
    meta: { title: settings.defaultMetaTitle, description: settings.defaultMetaDescription, image: img['hero-models'] },
    layout: [
      {
        blockType: 'editorialHero',
        eyebrow: 'SELESTIN Professional',
        heading: 'Luxury in Every Strand.',
        headingAccent: 'Inspiration in Every Innovation.',
        text: 'Where Luxury Meets Science. Where Beauty Begins.',
        image: img['smoothing-mask-model'],
        detailImage: img['argan-serum'],
        detailCaption: 'Morocco Argan Serum',
        sideLabel: 'Professional Hair Care',
        primaryCta: custom('Shop the range', '/shop'),
        secondaryCta: internal('Become a salon partner', partnerRef),
      },
      {
        blockType: 'marquee',
        background: 'dark',
        items: [
          { text: 'Smoother. Shinier. Stronger.' },
          { text: 'Nourish • Smooth • Shine' },
          { text: 'Complete Care. Visible Results.' },
          { text: 'Silky • Gentle • Effective' },
        ],
      },
      {
        blockType: 'manifesto',
        eyebrow: 'Luxury',
        lines: [
          { text: 'We believe true luxury lies in the details.', image: img['luxury-strands'] },
          { text: 'SELESTIN Professional delivers exceptional care with refined textures,', image: img['best-care-trio'] },
          { text: 'exquisite fragrances, and visible results.', image: img['wax-white-chocolate'] },
        ],
        footnote: 'Experience the difference',
        background: 'white',
      },
      {
        blockType: 'pillarIndex',
        eyebrow: 'SELESTIN Professional',
        heading: 'Where Luxury',
        headingAccent: 'Meets Science.',
        items: pillars.filter((p) => p.title !== 'Luxury'),
        image: img['brand-portrait'],
        background: 'cream',
      },
      treatmentCards('editorial', 'dark'),
      {
        blockType: 'productCarousel',
        eyebrow: 'Complete Care. Visible Results.',
        heading: 'Best Care for',
        headingAccent: 'Beautiful Hair',
        source: 'all',
        limit: 12,
        cta: custom('Shop all products', '/shop'),
        background: 'white',
      },
      {
        blockType: 'ingredientSpotlight',
        eyebrow: 'The goodness of',
        heading: 'Key Ingredients',
        items: [
          ingredient('smoothing-mask', 'Macadamia'),
          ingredient('smoothing-mask', 'Morocco Argan'),
          ingredient('keratin-shine-bond-shampoo', 'Hydrolyzed Keratin'),
          ingredient('white-chocolate-liposoluable-wax', 'White Chocolate'),
          ingredient('korean-glass-blueberry-liposoluable-gel-wax', 'Blueberry Extract'),
          ingredient('korean-glass-blueberry-liposoluable-gel-wax', 'Natural Beeswax'),
        ],
        image: img['argan-serum'],
        background: 'lavender',
      },
      { blockType: 'rangeGrid', eyebrow: 'Explore', heading: 'Our Ranges', background: 'white' },
      {
        blockType: 'statementCta',
        eyebrow: 'Exclusively for professional salons',
        heading: 'Partner with us',
        headingAccent: 'to deliver expert hair transformations.',
        intro: 'Nano Silk Arginina Protein Hair Treatment — Professional Salon Solution. Trusted by Experts.',
        image: img['hero-models'],
        primaryCta: internal('Become a partner', partnerRef),
        secondaryCta: internal('View the treatment', productRef('nano-silk-arginia-protein-treatment')),
      },
    ],
  })

  // Third design ("studio": clean sans headings, gold fills), for comparison. Hidden from search engines.
  await upsert(payload, 'pages', 'home-v3', {
    title: 'Home (version 3)',
    _status: 'published',
    hideFromSearch: true,
    meta: { title: settings.defaultMetaTitle, description: settings.defaultMetaDescription, image: img['stylist-portrait'] },
    layout: [
      {
        blockType: 'splitHero',
        eyebrow: 'Professional Hair Care',
        heading: 'Luxury in Every Strand. Inspiration in Every Innovation.',
        text: 'Where Luxury Meets Science. Where Beauty Begins.',
        primaryCta: custom('Explore products', '/shop'),
        secondaryCta: internal('Partner with us', partnerRef),
        points: [{ text: 'Premium formulas' }, { text: 'Professional care' }, { text: 'Visible results' }],
        image: img['stylist-portrait'],
        imageBadge: { eyebrow: 'SELESTIN', text: 'Professional performance, refined.' },
        background: 'mist',
      },
      {
        blockType: 'taglineStrip',
        items: [
          { text: 'Smoother. Shinier. Stronger.' },
          { text: 'Nourish • Smooth • Shine' },
          { text: 'Complete Care. Visible Results.' },
        ],
      },
      {
        blockType: 'statement',
        eyebrow: 'Luxury',
        heading: 'We believe true luxury lies in the details.',
        text: 'SELESTIN Professional delivers exceptional care with refined textures, exquisite fragrances, and visible results.',
        footnote: 'Experience the difference',
        background: 'white',
      },
      {
        blockType: 'pillarIndex',
        layout: 'list',
        eyebrow: 'SELESTIN Professional',
        heading: 'Where Luxury Meets Science.',
        intro: 'A thoughtful approach to performance, craft, and professional beauty.',
        items: pillars.filter((p) => p.title !== 'Luxury'),
        image: img['salon-styling'],
        background: 'lavender',
      },
      treatmentCards('studio', 'gold'),
      {
        blockType: 'productGrid',
        cardStyle: 'minimal',
        eyebrow: 'Complete Care. Visible Results.',
        heading: 'Best Care for Beautiful Hair',
        source: 'manual',
        products: [
          prod['pre-clarifying-shampoo'],
          prod['nano-silk-arginia-protein-treatment'],
          prod['prolonger-shampoo'],
          prod['morocco-argan-serum'],
        ],
        limit: 4,
        cta: custom('View all products', '/shop'),
        background: 'white',
      },
      {
        blockType: 'ingredientSpotlight',
        layout: 'split',
        eyebrow: 'The goodness of',
        heading: 'Key Ingredients',
        items: [
          ingredient('smoothing-mask', 'Macadamia'),
          ingredient('smoothing-mask', 'Morocco Argan'),
          ingredient('keratin-shine-bond-shampoo', 'Hydrolyzed Keratin'),
          {
            name: 'White Chocolate & Blueberry Extract',
            foundIn: 'Luxury Smooth Wax',
            text: 'Soothe and nourish the skin while protecting it from environmental stressors.',
          },
        ],
        image: img['glossy-hair'],
        imageBadge: { eyebrow: 'Focused care', text: 'Made to perform.' },
        background: 'mist',
      },
      {
        blockType: 'ctaBand',
        eyebrow: 'Exclusively for professional salons',
        heading: 'Partner with us to deliver expert hair transformations.',
        text: 'Nano Silk Arginia Treatment — Professional Salon Solution. Trusted by Experts.',
        cta: internal('Partner with us', partnerRef),
        background: 'gold',
      },
    ],
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: { ...settings, defaultOgImage: img['hero-models'] },
    context: ctx,
  })

  const rangeLinks = ranges.map((r) => ({ link: internal(r.title, rangeRef(r.slug)) }))

  await payload.updateGlobal({
    slug: 'header',
    data: {
      announcement: 'SELESTIN Professional — Where Luxury Meets Science. Where Beauty Begins.',
      navItems: [
        { link: internal('Home', { relationTo: 'pages', value: homeId }) },
        { link: internal('About Us', aboutRef) },
        { link: custom('Shop', '/shop') },
        { link: custom('Ranges', '/shop'), subLinks: rangeLinks },
        { link: internal('Salon Partner', partnerRef) },
        { link: custom('Blog', '/blog') },
        { link: internal('Contact', contactRef) },
      ],
      cta: internal('Become a partner', partnerRef),
    },
    context: ctx,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      about: 'Luxury in Every Strand. Inspiration in Every Innovation. SELESTIN Professional – Where Luxury Meets Science. Where Beauty Begins.',
      columns: [
        {
          heading: 'Explore',
          links: [
            { link: internal('About Us', aboutRef) },
            { link: custom('Shop', '/shop') },
            { link: internal('Salon Partner', partnerRef) },
            { link: custom('Blog', '/blog') },
            { link: internal('Contact Us', contactRef) },
          ],
        },
        { heading: 'Our Ranges', links: rangeLinks },
        {
          heading: 'Legal',
          links: [{ link: internal('Privacy Policy', privacyRef) }, { link: internal('Terms and Conditions', termsRef) }],
        },
      ],
    },
    context: ctx,
  })

  payload.logger.info('Seed complete ✔')
  process.exit(0)
}

// `payload run` exits once the import settles, so the work must be awaited at top level
try {
  await main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
