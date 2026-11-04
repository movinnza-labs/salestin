import 'server-only'

import configPromise from '@payload-config'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import type { Banner, Config, Page, Post, Product, ProductCategory, Range } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config: configPromise })

const published: Where = { _status: { equals: 'published' } }

type GlobalSlug = keyof Config['globals']

/**
 * Globals render in the site shell. If the database is unreachable we return
 * null so the shell still renders and the page-level error boundary explains.
 */
export const getGlobal = cache(async <T extends GlobalSlug>(slug: T): Promise<Config['globals'][T] | null> => {
  try {
    const payload = await getPayloadClient()
    return (await payload.findGlobal({ slug, depth: 1 })) as Config['globals'][T]
  } catch (error) {
    console.error(`[cms] Could not load global "${slug}":`, error)
    return null
  }
})

export const getPageBySlug = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { and: [{ slug: { equals: slug } }, published] },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getPageSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: published,
    select: { slug: true },
    limit: 1000,
    pagination: false,
  })
  return docs.map((d) => d.slug).filter((s) => s !== 'home')
}

export const getCategories = cache(async (): Promise<ProductCategory[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'product-categories',
    sort: 'sortOrder',
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
})

export const getCategoryBySlug = cache(async (slug: string): Promise<ProductCategory | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'product-categories',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getRanges = cache(async (): Promise<Range[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'ranges',
    sort: 'sortOrder',
    depth: 1,
    limit: 100,
    pagination: false,
  })
  return docs
})

export const getRangeBySlug = cache(async (slug: string): Promise<Range | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'ranges',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
})

type ProductQuery = {
  categoryId?: number
  rangeId?: number
  featured?: boolean
  ids?: number[]
  excludeId?: number
  limit?: number
}

export const getProducts = cache(
  async ({
    categoryId,
    rangeId,
    featured,
    ids,
    excludeId,
    limit = 100,
  }: ProductQuery = {}): Promise<Product[]> => {
    const payload = await getPayloadClient()
    const where: Where[] = [
      published,
      ...(categoryId ? [{ category: { equals: categoryId } }] : []),
      ...(rangeId ? [{ range: { equals: rangeId } }] : []),
      ...(featured ? [{ featured: { equals: true } }] : []),
      ...(ids ? [{ id: { in: ids } }] : []),
      ...(excludeId ? [{ id: { not_equals: excludeId } }] : []),
    ]
    const { docs } = await payload.find({
      collection: 'products',
      where: { and: where },
      sort: 'sortOrder',
      depth: 1,
      limit,
      pagination: false,
    })
    // hand-picked lists keep the editor's order
    if (ids) return ids.map((id) => docs.find((d) => d.id === id)).filter((d): d is Product => Boolean(d))
    return docs
  },
)

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { and: [{ slug: { equals: slug } }, published] },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

/** Active banners of one placement whose optional start/end dates include today. */
export const getBanners = cache(async (placement: Banner['placement']): Promise<Banner[]> => {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()
  const { docs } = await payload.find({
    collection: 'banners',
    where: {
      and: [
        { placement: { equals: placement } },
        { active: { equals: true } },
        { or: [{ startsAt: { exists: false } }, { startsAt: { less_than_equal: now } }] },
        { or: [{ endsAt: { exists: false } }, { endsAt: { greater_than: now } }] },
      ],
    },
    sort: 'sortOrder',
    depth: 1,
    limit: 12,
    pagination: false,
  })
  return docs
})

export const POSTS_PER_PAGE = 9

export const getPosts = cache(async (page = 1) => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'posts',
    where: published,
    sort: '-publishedAt',
    depth: 1,
    limit: POSTS_PER_PAGE,
    page,
  })
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, published] },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getPostSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: published,
    select: { slug: true },
    limit: 1000,
    pagination: false,
  })
  return docs.map((d) => d.slug)
}

/** For generateStaticParams: an unreachable DB at build time means "render on demand". */
export const safeParams = async <T,>(load: () => Promise<T[]>): Promise<T[]> => {
  try {
    return await load()
  } catch (error) {
    console.warn('[cms] Skipping static params — database unavailable:', (error as Error).message)
    return []
  }
}
