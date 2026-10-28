import type { MetadataRoute } from 'next'

import { getCategories, getPages, getProducts } from '@/lib/content'
import { siteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...getPages()
      .filter((p) => !p.hideFromSearch)
      .map((p) => ({
        url: `${siteUrl}${p.slug === 'home' ? '' : `/${p.slug}`}`,
        lastModified: p.updatedAt,
      })),
    { url: `${siteUrl}/products` },
    ...getCategories().map((c) => ({
      url: `${siteUrl}/collections/${c.slug}`,
      lastModified: c.updatedAt,
    })),
    ...getProducts().map((p) => ({
      url: `${siteUrl}/products/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ]
}
