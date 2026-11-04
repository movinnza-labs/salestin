import { Suspense } from 'react'

import { ShopBrowser, ShopBrowserFromUrl, type ShopItem } from '@/components/product/ShopBrowser'
import { emptyFilters } from '@/components/product/ShopFilters'
import { audienceOptions, concernOptions } from '@/fields/productOptions'
import { getCategories, getProducts, getRanges } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import type { Product } from '@/payload-types'

// Static and cached: filtering runs in the browser (see ShopBrowser), so the shop
// costs no server work per visit. Publishing a product refreshes it at once.
export const revalidate = 86400

export const generateMetadata = () =>
  buildMetadata({
    fallbackTitle: 'Shop',
    fallbackDescription:
      'Browse SELESTIN Professional hair care, skin care and premium wax by range, concern and salon or home care.',
    path: '/shop',
  })

const slugOf = (ref: Product['range'] | Product['category']) => (typeof ref === 'object' && ref ? ref.slug : '')

export default async function ShopPage() {
  const [products, ranges, categories] = await Promise.all([getProducts(), getRanges(), getCategories()])

  const items: ShopItem[] = products.map((p) => {
    const range = typeof p.range === 'object' ? p.range : null
    return {
      // only what the card shows, to keep the page small
      card: {
        slug: p.slug,
        title: p.title,
        size: p.size,
        summary: p.summary,
        professionalOnly: p.professionalOnly,
        image: p.image,
        range: range ? { ...range, story: null, meta: undefined } : p.range,
      },
      range: slugOf(p.range),
      category: slugOf(p.category),
      audience: p.audience ?? [],
      concerns: p.concerns ?? [],
      text: [p.title, p.summary, p.tagline, range?.title].filter(Boolean).join(' ').toLowerCase(),
    }
  })

  const props = {
    items,
    ranges: ranges.map((r) => ({ value: r.slug, label: r.title })),
    categories: categories.map((c) => ({ value: c.slug, label: c.title })),
    concerns: concernOptions.map((c) => ({ value: c.value, label: c.label })),
    audiences: audienceOptions.map((a) => ({ value: a.value, label: a.label })),
  }

  return (
    // the fallback is the full, unfiltered list, so it is in the HTML for visitors and search engines
    <Suspense fallback={<ShopBrowser {...props} values={emptyFilters} />}>
      <ShopBrowserFromUrl {...props} />
    </Suspense>
  )
}
