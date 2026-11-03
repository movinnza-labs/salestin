import type { Product, ProductCategory, Range } from '@/payload-types'

import { getProducts } from './payload'

type Source = {
  source?: 'all' | 'featured' | 'range' | 'category' | 'manual' | null
  range?: number | Range | null
  category?: number | ProductCategory | null
  products?: (number | Product)[] | null
  limit?: number | null
}

const idOf = (ref: number | { id: number }) => (typeof ref === 'object' ? ref.id : ref)

/** Resolves a block's product source settings (all / best sellers / range / category / hand-picked). */
export const loadBlockProducts = ({ source, range, category, products, limit }: Source, defaultLimit = 8) =>
  getProducts({
    featured: source === 'featured',
    rangeId: source === 'range' && range ? idOf(range) : undefined,
    categoryId: source === 'category' && category ? idOf(category) : undefined,
    ids: source === 'manual' ? (products ?? []).map(idOf) : undefined,
    limit: limit ?? defaultLimit,
  })
