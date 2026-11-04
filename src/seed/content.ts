/**
 * Website content transcribed from the brand brochure "salestin final.pdf"
 * (SELESTIN Professional / Xplore Beauty Wellness LLP). Wording is kept as in
 * the brochure; see README → "Content notes" for items flagged for review.
 */
import { richText } from './lexical'

export const media = {
  'hero-models': 'Three models with straight, curly and wavy hair against a warm beige background',
  // homepage v3 (studio design) imagery
  'stylist-portrait': 'Hair stylist with long glossy dark hair holding scissors and a comb in a bright studio',
  'salon-styling': 'Professional stylist blow-drying a client’s long brown hair in a luxury salon',
  'glossy-hair': 'Close-up of a model with long, glossy, flowing brown hair',
  'luxury-strands': 'Model with long, glossy brown straight hair',
  'brand-portrait': 'Black and white portrait of a model with long flowing hair',
  'range-nano-silk': 'SELESTIN Professional Nano-Silk Arginina salon range with Morocco Argan Serum',
  'nano-silk-treatment': 'Nano-Silk Arginia Protein Hair Treatment bottle on a marble stand',
  'smoothing-mask-model': 'Model with voluminous curly hair holding the Nano-Silk Arginina Smoothing Mask',
  'best-care-trio': 'Smoothing Prolonger Shampoo, Smoothing Mask and Moroccan Argan Serum',
  'keratin-shine-bond': 'Keratin Shine Bond Shampoo and Keratin Shine Bond Hair Mask',
  'argan-serum': 'Morocco Argan Serum bottle with argan nuts and flowing hair',
  skincare: 'Woman relaxing on white bedding holding a glass',
  'wax-white-chocolate': 'Model with a tin of White Chocolate Liposoluable Wax',
  'wax-korean-glass': 'Model with a tin of Korean Glass Blueberry Liposoluable Gel Wax',
  'shot-pre-clarifying-shampoo': 'Nano-Silk Arginina Pre Clarifying Shampoo bottle',
  'shot-protein-treatment': 'Nano-Silk Arginia Protein Hair Treatment bottle',
  'shot-prolonger-shampoo': 'Nano-Silk Arginina Prolonger Shampoo bottle',
  'shot-prolonger-mask': 'Nano-Silk Arginina Prolonger Mask jar',
  'shot-smoothing-prolonger-shampoo': 'Nano-Silk Arginina Smoothing Prolonger Shampoo pump bottle',
  'shot-smoothing-mask': 'Nano-Silk & Arginine Smoothing Mask jar',
  'shot-keratin-shampoo': 'Keratin Shine Bond Shampoo pump bottle',
  'shot-keratin-mask': 'Keratin Shine Bond Hair Mask jar',
  'brochure-p03': 'Brochure page: the Nano-Silk Arginina range, steps 01 to 05',
  'brochure-p04': 'Brochure page: Nano Silk Arginia Treatment, exclusively for professional salons',
  'brochure-p05': 'Brochure page: Nano-Silk Arginina Smoothing Mask — Smooth & Shiny Hair, Every Day',
  'brochure-p06': 'Brochure page: Best Care for Beautiful Hair — shampoo, mask and Morocco Argan Serum',
  'brochure-p07': 'Brochure page: Best Care for Beautiful Hair — Keratin Shine Bond shampoo and mask',
  'brochure-p08': 'Brochure page: Morocco Argan Serum, luminous smoothening oil for all hair types',
  'brochure-p10': 'Brochure page: White Chocolate Liposoluable Wax, key and full ingredients',
  'brochure-p11': 'Brochure page: Korean Glass Blueberry Liposoluable Gel Wax, key and full ingredients',
} as const

export type MediaKey = keyof typeof media

/** Focal points (percent) for images whose subject is not centred; default is 50/50. */
export const mediaFocal: Partial<Record<MediaKey, { focalX: number; focalY: number }>> = {
  'stylist-portrait': { focalX: 66, focalY: 28 },
  'salon-styling': { focalX: 55, focalY: 30 },
  'glossy-hair': { focalX: 50, focalY: 25 },
}

export const settings = {
  siteName: 'SELESTIN Professional',
  tagline: 'Where Luxury Meets Science. Where Beauty Begins.',
  companyName: 'Xplore Beauty Wellness LLP',
  // brochure read "Banner Pune Maharashta"; the client brief confirms the Baner office
  address: 'E-602, Green Zone, Sr. No. 57+58, Baner, Pune, Maharashtra 411038',
  phone: '+91 99756 06592',
  email: 'info@xplorebeauty.com',
  website: 'www.selestinprofessional.com',
  defaultMetaTitle: 'SELESTIN Professional – Where Luxury Meets Science. Where Beauty Begins.',
  defaultMetaDescription:
    'SELESTIN Professional – Luxury in Every Strand. Inspiration in Every Innovation. Professional hair care, skin care and premium wax.',
  enquiryNotificationEmail: 'info@xplorebeauty.com',
}

export const categories = [
  {
    title: 'Hair Care',
    slug: 'hair-care',
    sortOrder: 1,
    tagline: 'Professional Hair Care',
    description: 'Best Care for Beautiful Hair. Complete Care. Visible Results.',
    image: 'range-nano-silk',
    highlights: ['Nourished & Healthy Hair', 'Smooth, Soft & Shiny', 'Stronger, More Manageable'],
  },
  {
    title: 'Skin Care',
    slug: 'skin-care',
    sortOrder: 2,
    tagline: 'Luxury Skincare for Radiant Beauty',
    description: 'Experience the difference.',
    image: 'skincare',
    highlights: ['Rejuvenate & Hydrate', 'Smoother, Firmer Skin', 'Natural Ingredients', 'Clinically Proven Results'],
  },
  {
    title: 'Waxing',
    slug: 'waxing',
    sortOrder: 3,
    tagline: 'Premium Wax for Smooth Perfection',
    description: 'Professional at Luxury Touch. Luxury Smooth — Silky • Gentle • Effective.',
    image: 'wax-white-chocolate',
    highlights: ['For all types of skin', 'Natural professional formulation', 'Colophony free'],
  },
] as const

export type CategorySlug = (typeof categories)[number]['slug']

type ProductSeed = {
  title: string
  slug: string
  category: CategorySlug
  sortOrder: number
  featured?: boolean
  size?: string
  tagline?: string
  summary: string
  description?: ReturnType<typeof richText>
  badges?: string[]
  image: MediaKey
  gallery?: { image: MediaKey; caption?: string }[]
  highlightsHeading?: string
  highlights?: { icon: string; title: string; text?: string }[]
  ingredientsHeading?: string
  keyIngredients?: { name: string; text?: string }[]
  fullIngredients?: string
}

const hairResults = [
  { icon: 'droplet', title: 'Nourished & Healthy Hair' },
  { icon: 'waves', title: 'Smooth, Soft & Shiny' },
  { icon: 'shield', title: 'Stronger, More Manageable' },
]

const keratinGoodness = [
  {
    name: 'Hydrolyzed Keratin',
    text: 'Restores elasticity • Smooths frizz • Strengthens strands • Healthy, shiny hair',
  },
]

const nanoSilkGallery = [
  { image: 'range-nano-silk' as const, caption: 'The Nano-Silk Arginina range' },
  { image: 'brochure-p03' as const, caption: 'Nano-Silk Arginina — steps 01 to 05' },
]

export const products: ProductSeed[] = [
  {
    title: 'Pre Clarifying Shampoo',
    slug: 'pre-clarifying-shampoo',
    category: 'hair-care',
    sortOrder: 1,
    size: '1000 ml',
    summary:
      'Deeply cleanses the hair and scalp by removing buildup, excess oil, and impurities to prepare hair for treatment.',
    description: richText('Infused with deep cleansing proteins & extracts amino acid complex.'),
    badges: ['Professional Use'],
    image: 'shot-pre-clarifying-shampoo',
    gallery: nanoSilkGallery,
  },
  {
    title: 'Nano Silk Arginia Protein Treatment',
    slug: 'nano-silk-arginia-protein-treatment',
    category: 'hair-care',
    sortOrder: 2,
    size: '1000 ml',
    tagline: 'Professional Salon Solution. Trusted by Experts.',
    summary:
      'Advanced treatment enriched with Nano Silk and Arginia Protein to repair, strengthen, and nourish the hair from within.',
    description: richText(
      'Exclusively for professional salons. B2B product | Not for retail sale.',
      'Partner with us to deliver expert hair transformations.',
      'Infused with Hydrolyzed Keratin & Arginina Spinosa Kernel Oil.',
    ),
    badges: ['Formaldehyde Free', 'Sulfate Free', 'Paraben Free', 'Professional Only'],
    image: 'shot-protein-treatment',
    gallery: [
      { image: 'nano-silk-treatment', caption: 'Nano Silk Arginia Treatment' },
      { image: 'brochure-p04', caption: 'Exclusively for professional salons' },
      ...nanoSilkGallery,
    ],
    highlightsHeading: 'Why salons choose it',
    highlights: [
      { icon: 'atom', title: 'Nano Silk Technology' },
      { icon: 'droplet', title: 'Argania Oil Infusion' },
      { icon: 'heart', title: 'Intense Nourishment' },
      { icon: 'sparkles', title: 'Ultra Smooth & Shiny Hair' },
      { icon: 'waves', title: 'Frizz Control & Straightening' },
      { icon: 'check', title: 'Professional Results' },
      { icon: 'user', title: 'Salon Trusted' },
      { icon: 'star', title: 'Client Satisfaction' },
    ],
  },
  {
    title: 'Prolonger Shampoo',
    slug: 'prolonger-shampoo',
    category: 'hair-care',
    sortOrder: 3,
    size: '1000 ml',
    summary:
      'Maintains and extends the results of the treatment by gently cleansing while preserving smoothness, softness, and shine.',
    description: richText('Infused amino fusion technology.'),
    badges: ['Sodium & Paraben Free', 'Professional Use'],
    image: 'shot-prolonger-shampoo',
    gallery: nanoSilkGallery,
  },
  {
    title: 'Prolonger Mask',
    slug: 'prolonger-mask',
    category: 'hair-care',
    sortOrder: 4,
    size: '500 ml',
    summary: 'Deeply nourishes and strengthens the hair from the inside for softness, smoothness, and long-lasting shine.',
    description: richText('Deep nourishing mask.'),
    image: 'shot-prolonger-mask',
    gallery: nanoSilkGallery,
  },
  {
    title: 'Morocco Argan Serum',
    slug: 'morocco-argan-serum',
    category: 'hair-care',
    sortOrder: 5,
    size: '50 ml',
    tagline: 'Luminous Smoothening Oil — For All Hair Types',
    summary: 'Enriched with Moroccan Argan Oil to deeply hydrate, reduce frizz, protect from heat, and add brilliant shine.',
    description: richText(
      {
        list: ['Enriched with Moroccan Argan Oil', 'Controls frizz', 'Adds shine & silkiness', 'Protects & enhances hair beauty'],
      },
      'Nourish • Smooth • Shine',
    ),
    image: 'argan-serum',
    gallery: [
      { image: 'brochure-p08', caption: 'Morocco Argan Serum' },
      { image: 'best-care-trio', caption: 'Best Care for Beautiful Hair' },
    ],
    highlights: [
      { icon: 'droplet', title: 'Infused with Argan Oil', text: 'Deep nourishment and intense shine' },
      { icon: 'waves', title: 'Smoothes & Controls Frizz', text: 'Silky, soft and manageable hair' },
      { icon: 'sparkles', title: 'Enhances Shine & Radiance', text: 'Healthy, luminous hair every day' },
    ],
  },
  {
    title: 'Smoothing Prolonger Shampoo',
    slug: 'smoothing-prolonger-shampoo',
    category: 'hair-care',
    sortOrder: 6,
    featured: true,
    size: '300 ml',
    tagline: 'With Nano-Silk & Arginine',
    summary: 'Deeply cleanses the scalp & hair, removes buildup and leaves hair fresh, soft & manageable.',
    description: richText({
      list: ['Deeply cleanses the scalp & hair', 'Removes buildup', 'Leaves hair fresh, soft & manageable'],
    }),
    badges: ['Sulfate & Paraben Free'],
    image: 'shot-smoothing-prolonger-shampoo',
    gallery: [
      { image: 'best-care-trio', caption: 'Best Care for Beautiful Hair' },
      { image: 'brochure-p06', caption: 'Complete Care. Visible Results.' },
    ],
    highlightsHeading: 'Complete Care. Visible Results.',
    highlights: hairResults,
  },
  {
    title: 'Smoothing Mask',
    slug: 'smoothing-mask',
    category: 'hair-care',
    sortOrder: 7,
    featured: true,
    size: '250 ml',
    tagline: 'Smooth & Shiny Hair, Every Day',
    summary: 'Intense nourishment & hydration. Repairs & strengthens. Restores softness, smoothness & shine.',
    description: richText(
      { list: ['Intense nourishment & hydration', 'Repairs & strengthens', 'Restores softness, smoothness & shine'] },
      'Smoother. Shinier. Stronger.',
    ),
    image: 'shot-smoothing-mask',
    gallery: [
      { image: 'smoothing-mask-model', caption: 'Smooth & Shiny Hair, Every Day' },
      { image: 'brochure-p05', caption: 'Nano-Silk Arginina Smoothing Mask' },
      { image: 'brochure-p06', caption: 'Complete Care. Visible Results.' },
    ],
    highlights: [
      { icon: 'waves', title: 'Smooth and Shine' },
      { icon: 'sparkles', title: 'Anti Frizz' },
      { icon: 'shield', title: 'Control Hair Breakage' },
    ],
    ingredientsHeading: 'The goodness of',
    keyIngredients: [
      { name: 'Macadamia', text: 'Deeply nourishes, locks in moisture and adds intense shine to dull, dry hair.' },
      {
        name: 'Morocco Argan',
        text: 'Rich in antioxidants and vitamin E, it tames frizz, repairs damage and leaves hair silky smooth.',
      },
    ],
  },
  {
    title: 'Keratin Shine Bond Shampoo',
    slug: 'keratin-shine-bond-shampoo',
    category: 'hair-care',
    sortOrder: 8,
    featured: true,
    size: '300 ml',
    tagline: 'Infused with Hydrolyzed Keratin',
    summary: 'Deeply cleanses the scalp & hair, strengthens hair bonds, reduces breakage and enhances shine.',
    description: richText({
      list: ['Deeply cleanses the scalp & hair', 'Strengthens hair bonds', 'Reduces breakage', 'Enhances shine'],
    }),
    badges: ['Sulphate & Paraben Free'],
    image: 'shot-keratin-shampoo',
    gallery: [
      { image: 'keratin-shine-bond', caption: 'Keratin Shine Bond Shampoo and Hair Mask' },
      { image: 'brochure-p07', caption: 'Best Care for Beautiful Hair' },
    ],
    highlightsHeading: 'Complete Care. Visible Results.',
    highlights: hairResults,
    ingredientsHeading: 'Goodness of keratin',
    keyIngredients: keratinGoodness,
  },
  {
    title: 'Keratin Shine Bond Hair Mask',
    slug: 'keratin-shine-bond-hair-mask',
    category: 'hair-care',
    sortOrder: 9,
    featured: true,
    size: '250 ml',
    tagline: 'Intense Smoothness & Repair with Hydrolyzed Keratin',
    summary: 'Intense nourishment & repair. Hydrolyzed Keratin repairs & strengthens for smoothness & shine.',
    description: richText({
      list: ['Intense nourishment & repair', 'Hydrolyzed Keratin repairs & strengthens', 'Smoothness & shine'],
    }),
    image: 'shot-keratin-mask',
    gallery: [
      { image: 'keratin-shine-bond', caption: 'Keratin Shine Bond Shampoo and Hair Mask' },
      { image: 'brochure-p07', caption: 'Best Care for Beautiful Hair' },
    ],
    highlightsHeading: 'Complete Care. Visible Results.',
    highlights: hairResults,
    ingredientsHeading: 'Goodness of keratin',
    keyIngredients: keratinGoodness,
  },
  {
    title: 'White Chocolate Liposoluable Wax',
    slug: 'white-chocolate-liposoluable-wax',
    category: 'waxing',
    sortOrder: 10,
    size: '800 gms / 28.2 oz',
    tagline: 'Premium Wax for Smooth Perfection',
    summary: 'Especially developed for gentle & effective hair removal with minimal irritation.',
    description: richText(
      'Professional at Luxury Touch. Luxury Smooth — Silky • Gentle • Effective.',
      {
        list: [
          'Enriched with nourishing ingredients for softer, smoother & brighter skin.',
          'Provides a luxurious experience with a delightful white chocolate fragrance.',
        ],
      },
    ),
    badges: ['For All Types of Skin', 'Natural Professional Formulation', 'Colophony Free'],
    image: 'wax-white-chocolate',
    gallery: [{ image: 'brochure-p10', caption: 'White Chocolate Liposoluable Wax' }],
    highlights: [
      { icon: 'leaf', title: 'Gentle on Skin' },
      { icon: 'flower', title: 'Nourishing Ingredients' },
      { icon: 'droplet', title: 'Smooth & Moisturized Skin' },
      { icon: 'sparkles', title: 'Brightens & Radiance' },
      { icon: 'gem', title: 'Delightful White Chocolate Fragrance' },
    ],
    keyIngredients: [
      {
        name: 'White Chocolate',
        text: 'Soothe and nourish the skin while providing an indulgent waxing experience.',
      },
      {
        name: 'Vegetables Oil',
        text: 'Provide a smooth glide, reduce discomfort and contribute to moisturization.',
      },
      { name: 'Natural Beeswax', text: 'An emollient, it offers a gentle waxing experience.' },
      {
        name: 'Titanium Dioxide',
        text: 'Fights aging and dullness by boosting collagen, hydration, and skin radiance.',
      },
    ],
    fullIngredients:
      'Hydrogenated Polycyclopentadiene, Ethylene/VA Copolymer, Paraffinum Liquidum (Mineral Oil), Cera Alba (Beeswax), Titanium Dioxide, Glyceryl Rosinate, Parfum (Fragrance)',
  },
  {
    title: 'Korean Glass Blueberry Liposoluable Gel Wax',
    slug: 'korean-glass-blueberry-liposoluable-gel-wax',
    category: 'waxing',
    sortOrder: 11,
    size: '800 gms / 28.2 oz',
    tagline: 'Premium Wax for Smooth Perfection',
    summary: 'Removes unwanted hair efficiently from the root for a cleaner and longer-lasting smoothness.',
    description: richText(
      'Professional at Luxury Touch. Luxury Smooth — Silky • Gentle • Effective.',
      {
        list: [
          'Leaves the skin feeling touchably soft, refreshed & salon-smooth after every use.',
          "Helps enhance the skin's appearance with a polished, fresh & radiant look perfect for all occasions.",
        ],
      },
    ),
    badges: ['For All Types of Skin', 'Natural Professional Formulation', 'Colophony Free'],
    image: 'wax-korean-glass',
    gallery: [{ image: 'brochure-p11', caption: 'Korean Glass Blueberry Liposoluable Gel Wax' }],
    highlights: [
      { icon: 'hair', title: 'Effective Hair Removal' },
      { icon: 'flower', title: 'Nourishing Ingredients' },
      { icon: 'droplet', title: 'Smooth & Moisturized Skin' },
      { icon: 'sparkles', title: 'Brightens & Radiance' },
      { icon: 'gem', title: 'Delightful Blueberry Fragrance' },
    ],
    keyIngredients: [
      {
        name: 'Blueberry Extract',
        text: 'Rich in antioxidants, helps protect the skin from environmental stressors and keeps it fresh and healthy.',
      },
      {
        name: 'Mineral Oil',
        text: 'Provides a smooth glide, reduces discomfort, and helps retain skin moisture.',
      },
      {
        name: 'Natural Beeswax',
        text: 'An emollient that ensures gentle waxing with better grip and easy removal.',
      },
      {
        name: 'Titanium Dioxide',
        text: 'Helps soothe the skin and gives the wax a smooth, creamy texture.',
      },
    ],
    fullIngredients:
      'Hydrogenated Polycyclopentadiene, Ethylene/VA Copolymer, Paraffinum Liquidum (Mineral Oil), Cera Alba (Beeswax), Titanium Dioxide, Glyceryl Rosinate, Parfum (Fragrance), CI 60725.',
  },
]

export const pillars = [
  {
    icon: 'leaf',
    title: 'Luxury',
    text: 'We believe true luxury lies in the details. SELESTIN Professional delivers exceptional care with refined textures, exquisite fragrances, and visible results.',
  },
  {
    icon: 'star',
    title: 'Inspire',
    text: 'We are inspired by beauty in all its forms—natural, modern, bold, timeless. We create to inspire confidence, creativity, and self-expression.',
  },
  {
    icon: 'flask',
    title: 'Our R&D',
    text: 'Our Research & Development is at the heart of everything we do. We combine advanced science with the finest ingredients to create high-performance haircare solutions.',
  },
  {
    icon: 'eye',
    title: 'Our Vision',
    text: 'To be a global leader in professional haircare, setting new standards of quality, sustainability, and innovation—while empowering beauty professionals worldwide.',
  },
  {
    icon: 'heart',
    title: 'Our Believe',
    text: 'We believe in the power of care, the beauty of integrity, and the impact of innovation. We believe in you—and in the beauty you create every day.',
  },
]

// ── Ranges & catalogue facts (client brief, Nov 2026) ────────────────────────

export const ranges = [
  {
    slug: 'nano-silk-arginina',
    title: 'Nano Silk Arginina',
    sortOrder: 1,
    tagline: 'Professional salon system',
    audience: ['salon'],
    image: 'range-nano-silk',
    summary:
      'A professional salon system with Nano Silk and Arginia Protein: cleanse, treat, and prolong smooth, shiny results.',
    story: [
      'Nano Silk Arginina is the SELESTIN Professional salon system for smooth, strong and shiny hair.',
      'It starts with the Pre Clarifying Shampoo, which removes buildup to prepare the hair for treatment. The Protein Hair Treatment, enriched with Nano Silk and Arginia Protein, repairs, strengthens and nourishes the hair from within. The Prolonger Shampoo and Prolonger Mask then maintain and extend the results.',
    ],
  },
  {
    slug: 'keratin-shine-bond',
    title: 'Keratin Shine Bond',
    sortOrder: 2,
    tagline: 'Infused with Hydrolyzed Keratin',
    audience: ['salon', 'home'],
    image: 'keratin-shine-bond',
    summary: 'Shampoo and hair mask with Hydrolyzed Keratin to strengthen hair bonds, reduce breakage and enhance shine.',
    story: [
      'Keratin Shine Bond is infused with Hydrolyzed Keratin, which restores elasticity, smooths frizz and strengthens strands.',
      'The shampoo deeply cleanses while strengthening hair bonds; the hair mask gives intense nourishment and repair for smoothness and shine. Used in the salon and at home.',
    ],
  },
  {
    slug: 'morocco-argan-serum',
    title: 'Morocco Argan Serum',
    sortOrder: 3,
    tagline: 'Luminous smoothening oil',
    audience: ['salon', 'home'],
    image: 'argan-serum',
    summary: 'Enriched with Moroccan Argan Oil to hydrate, reduce frizz, protect from heat and add brilliant shine.',
    story: [
      'A luminous smoothening oil for all hair types, enriched with Moroccan Argan Oil.',
      'It deeply hydrates, reduces frizz, protects from heat and adds brilliant shine: a finishing step in the salon and every day at home.',
    ],
  },
  {
    slug: 'skincare',
    title: 'Skincare',
    sortOrder: 4,
    tagline: 'Luxury skincare for radiant beauty',
    audience: ['home'],
    image: 'skincare',
    summary: 'Luxury skincare for radiant beauty. Rejuvenate and hydrate for smoother, firmer skin.',
    story: ['Luxury Skincare for Radiant Beauty. Rejuvenate & hydrate for smoother, firmer skin, with natural ingredients.'],
  },
  {
    slug: 'premium-wax',
    title: 'Premium Wax',
    sortOrder: 5,
    tagline: 'Premium wax for smooth perfection',
    audience: ['salon'],
    image: 'wax-white-chocolate',
    summary: 'Professional liposoluble waxes for gentle, effective hair removal. Silky • Gentle • Effective.',
    story: [
      'Professional at Luxury Touch. The Luxury Smooth waxes are developed for gentle and effective hair removal, for all types of skin.',
      'Choose White Chocolate for minimal irritation, or Korean Glass Blueberry gel wax, which removes hair from the root for longer-lasting smoothness.',
    ],
  },
] as const

export type RangeSlug = (typeof ranges)[number]['slug']

type CatalogueFacts = {
  range: RangeSlug
  audience: ('salon' | 'home')[]
  concerns: string[]
  freeFrom?: string[]
  professionalOnly?: boolean
  /** replaces the brochure badges once their claims are structured */
  badges?: string[]
}

/** Per-product facts for the shop filters and badges, keyed by product slug. */
export const catalogue: Record<string, CatalogueFacts> = {
  'pre-clarifying-shampoo': {
    range: 'nano-silk-arginina',
    audience: ['salon'],
    concerns: ['cleansing'],
    professionalOnly: true,
    badges: [],
  },
  'nano-silk-arginia-protein-treatment': {
    range: 'nano-silk-arginina',
    audience: ['salon'],
    concerns: ['smoothing', 'repair'],
    freeFrom: ['formaldehyde', 'sulfate', 'paraben'],
    professionalOnly: true,
    badges: [],
  },
  // "Sodium & Paraben Free" is kept as written on the label
  'prolonger-shampoo': {
    range: 'nano-silk-arginina',
    audience: ['salon'],
    concerns: ['smoothing'],
    professionalOnly: true,
    badges: ['Sodium & Paraben Free'],
  },
  'prolonger-mask': { range: 'nano-silk-arginina', audience: ['salon'], concerns: ['smoothing', 'shine'] },
  'smoothing-prolonger-shampoo': {
    range: 'nano-silk-arginina',
    audience: ['salon'],
    concerns: ['smoothing', 'cleansing'],
    freeFrom: ['sulfate', 'paraben'],
    badges: [],
  },
  'smoothing-mask': { range: 'nano-silk-arginina', audience: ['salon'], concerns: ['smoothing', 'shine'] },
  'keratin-shine-bond-shampoo': {
    range: 'keratin-shine-bond',
    audience: ['salon', 'home'],
    concerns: ['repair', 'shine'],
    freeFrom: ['sulfate', 'paraben'],
    badges: [],
  },
  'keratin-shine-bond-hair-mask': { range: 'keratin-shine-bond', audience: ['salon', 'home'], concerns: ['repair', 'smoothing'] },
  'morocco-argan-serum': { range: 'morocco-argan-serum', audience: ['salon', 'home'], concerns: ['shine', 'smoothing'] },
  'white-chocolate-liposoluable-wax': {
    range: 'premium-wax',
    audience: ['salon'],
    concerns: ['hair-removal'],
    freeFrom: ['colophony'],
    badges: ['For All Types of Skin', 'Natural Professional Formulation'],
  },
  'korean-glass-blueberry-liposoluable-gel-wax': {
    range: 'premium-wax',
    audience: ['salon'],
    concerns: ['hair-removal'],
    freeFrom: ['colophony'],
    badges: ['For All Types of Skin', 'Natural Professional Formulation'],
  },
}

/** The four brand values the brief asks for on the home page. */
export const brandValues = pillars.filter((p) => ['Luxury', 'Inspire', 'Our R&D', 'Our Vision'].includes(p.title))

// Neutral wording only: commercial terms (margins, pricing, training) are for the client to add.
export const partnerBenefits = [
  {
    icon: 'user',
    title: 'Professional-only treatments',
    text: 'Salon-exclusive systems such as the Nano Silk Arginina Protein Hair Treatment, not for retail sale.',
  },
  {
    icon: 'sparkles',
    title: 'Complete salon systems',
    text: 'Cleanse, treat and prolong: products designed to work together for visible results.',
  },
  {
    icon: 'heart',
    title: 'Home care for your clients',
    text: 'Keratin Shine Bond and Morocco Argan Serum help clients keep their results at home.',
  },
  { icon: 'gem', title: 'Premium wax range', text: 'Liposoluble waxes for gentle, effective hair removal on all skin types.' },
]

export const qualityPromise = [
  {
    icon: 'ban',
    title: 'Free-from formulas',
    text: 'Sulfate- and paraben-free shampoos, and a formaldehyde-free salon treatment.',
  },
  {
    icon: 'flask',
    title: 'Science-led',
    text: 'Formulations built around Nano Silk, Arginine, Hydrolyzed Keratin and Moroccan Argan Oil.',
  },
  {
    icon: 'user',
    title: 'Made for professionals',
    text: 'Developed for salon results, with home-care products to maintain them.',
  },
]
