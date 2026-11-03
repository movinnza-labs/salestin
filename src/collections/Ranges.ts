import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { audienceOptions } from '../fields/productOptions'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../hooks/revalidate'

// Ranges appear in navigation, grids, filters and product pages, so refresh broadly.
const revalidate = revalidateCollection(() => ['/'], 'layout')

export const Ranges: CollectionConfig = {
  slug: 'ranges',
  labels: { singular: 'Range', plural: 'Ranges' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder'],
    group: 'Catalogue',
    description: 'Product ranges, e.g. Nano Silk Arginina. Each range has its own page at /ranges/<slug>.',
    preview: (doc) => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/ranges/${doc.slug}`,
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
  // tabs come first so the SEO plugin adds its tab alongside "Range"
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Range',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'tagline', type: 'text' },
            {
              name: 'summary',
              type: 'textarea',
              maxLength: 300,
              admin: { description: 'One or two sentences, shown on range cards and as the default meta description.' },
            },
            { name: 'story', type: 'richText', admin: { description: 'The range story, shown on the range page.' } },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'audience',
              type: 'select',
              hasMany: true,
              options: [...audienceOptions],
              admin: { description: 'Who the range is for. Shown as a label on the range page.' },
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
