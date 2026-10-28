import type { Header, Page, Product, ProductCategory } from '@/content/types'

/** A button / nav link: either a reference to a page, product or category, or a custom URL */
export type LinkValue = NonNullable<Header['cta']>

type Reference = NonNullable<LinkValue['reference']>

const docHref = (reference: Reference): string | null => {
  const { relationTo, value } = reference
  if (typeof value !== 'object' || !value) return null
  switch (relationTo) {
    case 'pages': {
      const slug = (value as Page).slug
      return slug === 'home' ? '/' : `/${slug}`
    }
    case 'products':
      return `/products/${(value as Product).slug}`
    case 'product-categories':
      return `/collections/${(value as ProductCategory).slug}`
    default:
      return null
  }
}

export const resolveHref = (link?: Partial<LinkValue> | null): string | null => {
  if (!link) return null
  if (link.type === 'custom') return link.url?.trim() || null
  return link.reference ? docHref(link.reference as Reference) : null
}

export const isExternal = (href: string) => /^(https?:)?\/\//.test(href)
