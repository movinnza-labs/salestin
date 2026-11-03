import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../hooks/revalidate'

// Categories appear in navigation, grids and product pages, so refresh broadly.
const revalidate = revalidateCollection(() => ['/'], 'layout')

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: { singular: 'Product category', plural: 'Product categories' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder'],
    group: 'Catalogue',
  },
  defaultSort: 'sortOrder',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
  },
  // tabs come first so the SEO plugin adds its tab alongside "Category"
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Category',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'tagline', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'highlights',
              type: 'array',
              admin: { description: 'Short benefit statements shown on the category page.' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
    slugField('title'),
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
