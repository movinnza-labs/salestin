import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { pageBlocks } from '../blocks'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../hooks/revalidate'

export const pagePath = (slug?: unknown) => (slug === 'home' ? '/' : `/${String(slug)}`)

const revalidate = revalidateCollection((doc) => [pagePath(doc.slug)])

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    description: 'The page with slug "home" is the homepage.',
    preview: (doc) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${pagePath(doc.slug)}`,
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: true, maxPerDoc: 25 },
  hooks: {
    afterChange: [revalidate.afterChange],
    afterDelete: [revalidate.afterDelete],
  },
  // tabs come first so the SEO plugin adds its tab alongside "Content"
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'layout',
              type: 'blocks',
              blocks: pageBlocks,
              required: true,
              minRows: 1,
              admin: { initCollapsed: true },
            },
          ],
        },
      ],
    },
    slugField('title'),
    {
      name: 'hideFromSearch',
      type: 'checkbox',
      label: 'Hide from search engines',
      admin: {
        position: 'sidebar',
        description: 'Adds "noindex" and leaves the page out of the sitemap — e.g. for design drafts.',
      },
    },
  ],
}
