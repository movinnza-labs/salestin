import type { Product, ProductCategory } from '@/content/types'

import { getProducts } from './content'

type Source = {
  source?: 'all' | 'featured' | 'category' | 'manual' | null
  category?: number | ProductCategory | null
  products?: (number | Product)[] | null
  limit?: number | null
}

const idOf = (ref: number | { id: number }) => (typeof ref === 'object' ? ref.id : ref)

/** Resolves a block's product source settings (all / featured / category / hand-picked). */
export const loadBlockProducts = ({ source, category, products, limit }: Source, defaultLimit = 8) =>
  getProducts({
    featured: source === 'featured',
    categoryId: source === 'category' && category ? idOf(category) : undefined,
    ids: source === 'manual' ? (products ?? []).map(idOf) : undefined,
    limit: limit ?? defaultLimit,
  })
