import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { siteUrl } from '@/lib/seo'

// publishing refreshes pages at once (src/hooks/revalidate.ts); this is only a daily safety net
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayloadClient()
    const published = { _status: { equals: 'published' } }
    const select = { slug: true, updatedAt: true } as const
    const [pages, products, categories, ranges, posts] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { and: [published, { hideFromSearch: { not_equals: true } }] },
        select,
        pagination: false,
      }),
      payload.find({ collection: 'products', where: published, select, pagination: false }),
      payload.find({ collection: 'product-categories', select, pagination: false }),
      payload.find({ collection: 'ranges', select, pagination: false }),
      payload.find({ collection: 'posts', where: published, select, pagination: false }),
    ])

    return [
      ...pages.docs.map((p) => ({ url: `${siteUrl}${p.slug === 'home' ? '' : `/${p.slug}`}`, lastModified: p.updatedAt })),
      { url: `${siteUrl}/shop` },
      ...ranges.docs.map((r) => ({ url: `${siteUrl}/ranges/${r.slug}`, lastModified: r.updatedAt })),
      ...categories.docs.map((c) => ({ url: `${siteUrl}/collections/${c.slug}`, lastModified: c.updatedAt })),
      ...products.docs.map((p) => ({ url: `${siteUrl}/products/${p.slug}`, lastModified: p.updatedAt })),
      { url: `${siteUrl}/blog` },
      ...posts.docs.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.updatedAt })),
    ]
  } catch (error) {
    console.error('[sitemap] database unavailable:', (error as Error).message)
    return [{ url: siteUrl }]
  }
}
