import 'server-only'

import categoriesData from '@/content/categories.json'
import footerData from '@/content/footer.json'
import headerData from '@/content/header.json'
import mediaData from '@/content/media.json'
import pagesData from '@/content/pages.json'
import productsData from '@/content/products.json'
import siteSettingsData from '@/content/site-settings.json'
import type {
  Footer,
  Header,
  Media,
  Page,
  Product,
  ProductCategory,
  SiteSetting,
} from '@/content/types'

/*
 * Site content lives in src/content/*.json. In those files images are referenced
 * by file name (served from public/media) and products, categories and pages by
 * slug. They are resolved here, once, into the full objects the components use.
 */

type Doc = { slug: string }
type MediaEntry = (typeof mediaData)[keyof typeof mediaData] & {
  sizes: Record<string, { filename: string }>
}

const MEDIA_FIELDS = new Set(['image', 'detailImage', 'defaultOgImage'])

const mediaUrl = (filename: string) => `/media/${filename}`

const media = new Map<string, Media>(
  Object.entries(mediaData as Record<string, MediaEntry>).map(([filename, m]) => [
    filename,
    {
      ...m,
      filename,
      url: mediaUrl(filename),
      sizes: Object.fromEntries(
        Object.entries(m.sizes).map(([name, s]) => [name, { ...s, url: mediaUrl(s.filename) }]),
      ),
    },
  ]),
)

const bySlug = <T extends Doc>(docs: T[]) => new Map(docs.map((d) => [d.slug, d]))

const lookup = <T>(map: Map<string, T>, key: string, what: string): T => {
  const found = map.get(key)
  if (!found) throw new Error(`[content] Unknown ${what} "${key}" — check src/content/*.json`)
  return found
}

// Filled in dependency order below: categories → products → pages.
const resolved = {
  categories: new Map<string, ProductCategory>(),
  products: new Map<string, Product>(),
}
const rawDocs: Record<string, Map<string, Doc>> = {
  pages: bySlug(pagesData as Doc[]),
  products: bySlug(productsData as Doc[]),
  'product-categories': bySlug(categoriesData as Doc[]),
}

const resolve = (value: unknown, key = ''): unknown => {
  if (Array.isArray(value)) {
    if (key === 'products')
      return value.map((slug: string) => lookup(resolved.products, slug, 'product'))
    if (key === 'categories')
      return value.map((slug: string) => lookup(resolved.categories, slug, 'category'))
    return value.map((v) => resolve(v))
  }
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    // link to another document: { relationTo, value: slug }; links only need the slug
    if (typeof o.relationTo === 'string' && typeof o.value === 'string') {
      return {
        relationTo: o.relationTo,
        value: lookup(rawDocs[o.relationTo] ?? new Map(), o.value, o.relationTo),
      }
    }
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, resolve(v, k)]))
  }
  if (typeof value === 'string') {
    if (MEDIA_FIELDS.has(key)) return lookup(media, value, 'image')
    if (key === 'category') return lookup(resolved.categories, value, 'category')
  }
  return value
}

const resolveAll = <T extends Doc>(docs: unknown[], into?: Map<string, T>) =>
  docs.map((d) => {
    const doc = resolve(d) as T
    into?.set(doc.slug, doc)
    return doc
  })

const categories = resolveAll<ProductCategory>(categoriesData, resolved.categories).sort(
  (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
)
const products = resolveAll<Product>(productsData, resolved.products).sort(
  (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
)
const pages = bySlug(resolveAll<Page>(pagesData))

const globals = {
  'site-settings': resolve(siteSettingsData) as SiteSetting,
  header: resolve(headerData) as Header,
  footer: resolve(footerData) as Footer,
}

export const getGlobal = <T extends keyof typeof globals>(slug: T): (typeof globals)[T] =>
  globals[slug]

export const getPages = (): Page[] => [...pages.values()]

export const getPageBySlug = (slug: string): Page | null => pages.get(slug) ?? null

export const getPageSlugs = (): string[] => [...pages.keys()].filter((s) => s !== 'home')

export const getCategories = (): ProductCategory[] => categories

export const getCategoryBySlug = (slug: string): ProductCategory | null =>
  resolved.categories.get(slug) ?? null

type ProductQuery = {
  categoryId?: number
  featured?: boolean
  ids?: number[]
  excludeId?: number
  limit?: number
}

const categoryIdOf = (p: Product) => (typeof p.category === 'object' ? p.category.id : p.category)

export const getProducts = ({
  categoryId,
  featured,
  ids,
  excludeId,
  limit = 100,
}: ProductQuery = {}): Product[] => {
  // hand-picked lists keep the editor's order
  if (ids) {
    return ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
      .slice(0, limit)
  }
  return products
    .filter(
      (p) =>
        (!categoryId || categoryIdOf(p) === categoryId) &&
        (!featured || p.featured) &&
        (!excludeId || p.id !== excludeId),
    )
    .slice(0, limit)
}

export const getProductBySlug = (slug: string): Product | null =>
  resolved.products.get(slug) ?? null
