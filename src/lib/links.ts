import type { Header, Page, Post, Product, ProductCategory, Range } from '@/payload-types'

/** Shape produced by src/fields/link.ts */
export type LinkValue = NonNullable<Header['cta']>

type Reference = NonNullable<LinkValue['reference']>

const docHref = (reference: Reference): string | null => {
  const { relationTo, value } = reference
  if (typeof value !== 'object' || !value) return null
  // the Local API populates drafts too; links to unpublished documents would 404
  if ('_status' in value && value._status === 'draft') return null
  switch (relationTo) {
    case 'pages': {
      const slug = (value as Page).slug
      return slug === 'home' ? '/' : `/${slug}`
    }
    case 'products':
      return `/products/${(value as Product).slug}`
    case 'product-categories':
      return `/collections/${(value as ProductCategory).slug}`
    case 'ranges':
      return `/ranges/${(value as Range).slug}`
    case 'posts':
      return `/blog/${(value as Post).slug}`
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
