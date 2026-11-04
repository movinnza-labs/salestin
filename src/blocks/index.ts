import type { Block, Field } from 'payload'

import { iconField } from '../fields/icon'
import { linkField } from '../fields/link'

const sectionIntro: Field[] = [
  { name: 'eyebrow', type: 'text', admin: { description: 'Small label shown above the heading.' } },
  {
    type: 'row',
    fields: [
      { name: 'heading', type: 'text', admin: { width: '60%' } },
      {
        name: 'headingAccent',
        type: 'text',
        admin: { width: '40%', description: 'Optional second line, shown in italic accent colour.' },
      },
    ],
  },
  { name: 'intro', type: 'textarea' },
]

const background: Field = {
  name: 'background',
  type: 'select',
  defaultValue: 'white',
  options: [
    { label: 'White', value: 'white' },
    { label: 'Cream', value: 'cream' },
    { label: 'Lavender', value: 'lavender' },
    { label: 'Dark', value: 'dark' },
    { label: 'Light grey', value: 'mist' },
    { label: 'Gold', value: 'gold' },
  ],
}

/** Small label card laid over an image corner. */
const imageBadge: Field = {
  name: 'imageBadge',
  type: 'group',
  admin: { description: 'Optional label card over the image.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'eyebrow', type: 'text', admin: { width: '50%' } },
        { name: 'text', type: 'text', admin: { width: '50%' } },
      ],
    },
  ],
}

const rangeSource: Field = {
  name: 'range',
  type: 'relationship',
  relationTo: 'ranges',
  admin: { condition: (_, s) => s?.source === 'range' },
}

export const HeroSlider: Block = {
  slug: 'heroSlider',
  interfaceName: 'HeroSliderBlock',
  labels: { singular: 'Hero slider', plural: 'Hero sliders' },
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'center',
          options: ['center', 'top', 'right', 'left'].map((v) => ({ label: v, value: v })),
          admin: { description: 'Which part of the image to keep visible when cropped.' },
        },
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text', required: true },
        { name: 'headingAccent', type: 'text' },
        { name: 'text', type: 'textarea' },
        linkField({ name: 'primaryCta', label: 'Primary button' }),
        linkField({ name: 'secondaryCta', label: 'Secondary button' }),
      ],
    },
  ],
}

export const PageHero: Block = {
  slug: 'pageHero',
  interfaceName: 'PageHeroBlock',
  labels: { singular: 'Page header', plural: 'Page headers' },
  fields: [...sectionIntro, { name: 'image', type: 'upload', relationTo: 'media' }],
}

export const FeatureStrip: Block = {
  slug: 'featureStrip',
  interfaceName: 'FeatureStripBlock',
  labels: { singular: 'Feature strip', plural: 'Feature strips' },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'text' }],
    },
  ],
}

export const CategoryGrid: Block = {
  slug: 'categoryGrid',
  interfaceName: 'CategoryGridBlock',
  labels: { singular: 'Category grid', plural: 'Category grids' },
  fields: [
    ...sectionIntro,
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: { description: 'Leave empty to show all categories.' },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Image cards', value: 'cards' },
        { label: 'Arches (editorial)', value: 'arches' },
      ],
    },
    background,
  ],
}

export const SplitContent: Block = {
  slug: 'splitContent',
  interfaceName: 'SplitContentBlock',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    ...sectionIntro.filter((f) => !('name' in f && f.name === 'intro')),
    { name: 'body', type: 'richText' },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Image left', value: 'left' },
            { label: 'Image right', value: 'right' },
          ],
          admin: { width: '50%' },
        },
        { ...background, admin: { width: '50%' } },
      ],
    },
    linkField({ name: 'cta', label: 'Button' }),
    { name: 'footnote', type: 'text' },
  ],
}

export const Pillars: Block = {
  slug: 'pillars',
  interfaceName: 'PillarsBlock',
  labels: { singular: 'Icon columns', plural: 'Icon columns' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
    { name: 'footnote', type: 'text' },
    background,
  ],
}

export const ProductSteps: Block = {
  slug: 'productSteps',
  interfaceName: 'ProductStepsBlock',
  labels: { singular: 'Numbered product system', plural: 'Numbered product systems' },
  fields: [
    ...sectionIntro,
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
      admin: { description: 'Shown in this order as 01, 02, 03…' },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'list',
      options: [
        { label: 'Numbered list (with image)', value: 'list' },
        { label: 'Numbered cards', value: 'cards' },
      ],
    },
    background,
  ],
}

export const ProductGrid: Block = {
  slug: 'productGrid',
  interfaceName: 'ProductGridBlock',
  labels: { singular: 'Product grid', plural: 'Product grids' },
  fields: [
    ...sectionIntro,
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Best sellers', value: 'featured' },
        { label: 'One range', value: 'range' },
        { label: 'One category', value: 'category' },
        { label: 'Hand-picked', value: 'manual' },
        { label: 'All products', value: 'all' },
      ],
    },
    rangeSource,
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      admin: { condition: (_, s) => s?.source === 'category' },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'manual' },
    },
    { name: 'limit', type: 'number', defaultValue: 8, min: 1, max: 48 },
    linkField({ name: 'cta', label: '"See all" link' }),
    {
      name: 'cardStyle',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard (with Enquire button)', value: 'standard' },
        { label: 'Minimal (image, range and size)', value: 'minimal' },
      ],
    },
    background,
  ],
}

export const CtaBanner: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    ...sectionIntro,
    { name: 'points', type: 'array', fields: [iconField(), { name: 'text', type: 'text', required: true }] },
    linkField({ name: 'primaryCta', label: 'Primary button' }),
    linkField({ name: 'secondaryCta', label: 'Secondary button' }),
    { name: 'image', type: 'upload', relationTo: 'media' },
    { ...background, defaultValue: 'dark' },
  ],
}

export const ContactSection: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  labels: { singular: 'Contact details + form', plural: 'Contact details + form' },
  fields: [
    ...sectionIntro,
    { name: 'formHeading', type: 'text', defaultValue: 'Send us an enquiry' },
    { name: 'showForm', type: 'checkbox', defaultValue: true },
    {
      name: 'formType',
      type: 'select',
      defaultValue: 'customer',
      options: [
        { label: 'Customer enquiry', value: 'customer' },
        { label: 'Salon / distributor partner enquiry', value: 'partner' },
      ],
      admin: { condition: (_, s) => s?.showForm !== false },
    },
    {
      name: 'showContactDetails',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Address, phone, email and WhatsApp from Site settings.' },
    },
    { name: 'showMap', type: 'checkbox', defaultValue: false, admin: { description: 'Google Map of the office.' } },
  ],
}

export const RangeGrid: Block = {
  slug: 'rangeGrid',
  interfaceName: 'RangeGridBlock',
  labels: { singular: 'Range grid', plural: 'Range grids' },
  fields: [
    ...sectionIntro,
    {
      name: 'ranges',
      type: 'relationship',
      relationTo: 'ranges',
      hasMany: true,
      admin: { description: 'Leave empty to show all ranges.' },
    },
    background,
  ],
}

export const BannersBlock: Block = {
  slug: 'banners',
  interfaceName: 'BannersBlock',
  labels: { singular: 'Banners', plural: 'Banners' },
  fields: [
    {
      name: 'placement',
      type: 'select',
      required: true,
      defaultValue: 'hero',
      options: [
        { label: 'Hero slider (active "Home hero slider" banners)', value: 'hero' },
        { label: 'Offers (active "Offers strip" banners)', value: 'offer' },
      ],
      admin: { description: 'Banners themselves are managed under Content → Banners. Nothing shows if none are active.' },
    },
    ...sectionIntro.map((f) => ({ ...f, admin: { ...f.admin, condition: (_: unknown, s: { placement?: string }) => s?.placement === 'offer' } }) as Field),
  ],
}

export const CompanyDetails: Block = {
  slug: 'companyDetails',
  interfaceName: 'CompanyDetailsBlock',
  labels: { singular: 'Company details', plural: 'Company details' },
  fields: [
    ...sectionIntro,
    { name: 'body', type: 'richText' },
    background,
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'Text', plural: 'Text' },
  fields: [{ name: 'content', type: 'richText', required: true }],
}

// ── Editorial (homepage v2) blocks ───────────────────────────────────────────

const productSource: Field[] = [
  {
    name: 'source',
    type: 'select',
    defaultValue: 'all',
    options: [
      { label: 'All products', value: 'all' },
      { label: 'Best sellers', value: 'featured' },
      { label: 'One range', value: 'range' },
      { label: 'One category', value: 'category' },
      { label: 'Hand-picked', value: 'manual' },
    ],
  },
  rangeSource,
  {
    name: 'category',
    type: 'relationship',
    relationTo: 'product-categories',
    admin: { condition: (_, s) => s?.source === 'category' },
  },
  {
    name: 'products',
    type: 'relationship',
    relationTo: 'products',
    hasMany: true,
    admin: { condition: (_, s) => s?.source === 'manual' },
  },
  { name: 'limit', type: 'number', defaultValue: 12, min: 1, max: 48 },
]

export const EditorialHero: Block = {
  slug: 'editorialHero',
  interfaceName: 'EditorialHeroBlock',
  labels: { singular: 'Editorial hero', plural: 'Editorial heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'headingAccent', type: 'text' },
    { name: 'text', type: 'textarea' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Portrait image, shown in an arch frame.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'detailImage',
          type: 'upload',
          relationTo: 'media',
          admin: { width: '50%', description: 'Small round image overlapping the arch.' },
        },
        { name: 'detailCaption', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'sideLabel', type: 'text', admin: { description: 'Vertical label along the left edge (wide screens).' } },
    linkField({ name: 'primaryCta', label: 'Primary button' }),
    linkField({ name: 'secondaryCta', label: 'Secondary link' }),
  ],
}

export const Marquee: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  labels: { singular: 'Scrolling ribbon', plural: 'Scrolling ribbons' },
  fields: [
    { name: 'items', type: 'array', minRows: 1, required: true, fields: [{ name: 'text', type: 'text', required: true }] },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Cream', value: 'cream' },
        { label: 'Lavender', value: 'lavender' },
      ],
    },
  ],
}

export const Manifesto: Block = {
  slug: 'manifesto',
  interfaceName: 'ManifestoBlock',
  labels: { singular: 'Manifesto', plural: 'Manifestos' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'lines',
      type: 'array',
      minRows: 1,
      required: true,
      admin: { description: 'Text runs on as one statement; an optional image is set inline after each line.' },
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'footnote', type: 'text' },
    background,
  ],
}

export const PillarIndex: Block = {
  slug: 'pillarIndex',
  interfaceName: 'PillarIndexBlock',
  labels: { singular: 'Numbered index', plural: 'Numbered indexes' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'accordion',
      options: [
        { label: 'Expandable list (arched image)', value: 'accordion' },
        { label: 'Open numbered list (sticky image)', value: 'list' },
      ],
    },
    background,
  ],
}

export const ProductCarousel: Block = {
  slug: 'productCarousel',
  interfaceName: 'ProductCarouselBlock',
  labels: { singular: 'Product carousel', plural: 'Product carousels' },
  fields: [...sectionIntro, ...productSource, linkField({ name: 'cta', label: '"See all" link' }), background],
}

export const IngredientSpotlight: Block = {
  slug: 'ingredientSpotlight',
  interfaceName: 'IngredientSpotlightBlock',
  labels: { singular: 'Ingredient spotlight', plural: 'Ingredient spotlights' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      required: true,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'foundIn', type: 'text', admin: { description: 'e.g. the product it features in.' } },
        { name: 'text', type: 'textarea' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'oval',
      options: [
        { label: 'Text left, oval image right', value: 'oval' },
        { label: 'Image left, list right', value: 'split' },
      ],
    },
    { ...imageBadge, admin: { ...imageBadge.admin, condition: (_, s) => s?.layout === 'split' } },
    background,
  ],
}

export const StatementCta: Block = {
  slug: 'statementCta',
  interfaceName: 'StatementCtaBlock',
  labels: { singular: 'Closing statement', plural: 'Closing statements' },
  fields: [
    ...sectionIntro,
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    linkField({ name: 'primaryCta', label: 'Primary button' }),
    linkField({ name: 'secondaryCta', label: 'Secondary button' }),
  ],
}

// ── Studio (homepage v3) blocks ──────────────────────────────────────────────

export const SplitHero: Block = {
  slug: 'splitHero',
  interfaceName: 'SplitHeroBlock',
  labels: { singular: 'Split hero', plural: 'Split heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    linkField({ name: 'primaryCta', label: 'Primary button' }),
    linkField({ name: 'secondaryCta', label: 'Secondary button' }),
    {
      name: 'points',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Short numbered points under the buttons (01, 02, 03…).' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    imageBadge,
    { ...background, defaultValue: 'mist' },
  ],
}

export const TaglineStrip: Block = {
  slug: 'taglineStrip',
  interfaceName: 'TaglineStripBlock',
  labels: { singular: 'Tagline strip', plural: 'Tagline strips' },
  fields: [
    { name: 'items', type: 'array', minRows: 1, maxRows: 4, required: true, fields: [{ name: 'text', type: 'text', required: true }] },
  ],
}

export const Statement: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'footnote', type: 'text' },
    background,
  ],
}

export const CtaBand: Block = {
  slug: 'ctaBand',
  interfaceName: 'CtaBandBlock',
  labels: { singular: 'Call-to-action band', plural: 'Call-to-action bands' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    linkField({ name: 'cta', label: 'Button' }),
    { ...background, defaultValue: 'gold' },
  ],
}

export const TreatmentCards: Block = {
  slug: 'treatmentCards',
  interfaceName: 'TreatmentCardsBlock',
  labels: { singular: 'Treatment cards', plural: 'Treatment cards' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 9,
      required: true,
      admin: { description: 'Numbered 01, 02, 03… in this order.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', required: true, admin: { width: '60%' } },
            {
              name: 'tag',
              type: 'text',
              admin: { width: '40%', description: 'Small label, e.g. "Salon treatment" or "Home care".' },
            },
          ],
        },
        { name: 'focus', type: 'text' },
        { name: 'positioning', type: 'text' },
        { name: 'keyIngredients', label: 'Key ingredients', type: 'text' },
        { name: 'idealFor', label: 'Ideal for', type: 'text' },
        linkField({ name: 'link', label: 'Link (optional)', withLabel: false }),
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'studio',
      options: [
        { label: 'Studio (sans headings, for homepage v3)', value: 'studio' },
        { label: 'Editorial (serif headings, for homepage v2)', value: 'editorial' },
      ],
    },
    { ...background, defaultValue: 'gold' },
  ],
}

export const pageBlocks: Block[] = [
  BannersBlock,
  HeroSlider,
  PageHero,
  FeatureStrip,
  RangeGrid,
  CategoryGrid,
  SplitContent,
  Pillars,
  ProductSteps,
  ProductGrid,
  CtaBanner,
  ContactSection,
  RichTextBlock,
  CompanyDetails,
  EditorialHero,
  Marquee,
  Manifesto,
  PillarIndex,
  ProductCarousel,
  IngredientSpotlight,
  StatementCta,
  SplitHero,
  TaglineStrip,
  Statement,
  CtaBand,
  TreatmentCards,
]
