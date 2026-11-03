import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { iconField } from '../fields/icon'
import { audienceOptions, concernOptions, freeFromOptions } from '../fields/productOptions'
import { slugField } from '../fields/slug'
import { revalidateCollection } from '../hooks/revalidate'

// product cards appear on the homepage, category pages and related products
const revalidate = revalidateCollection(() => ['/'], 'layout')

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'range', 'featured', '_status', 'updatedAt'],
    group: 'Catalogue',
    preview: (doc) => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/products/${doc.slug}`,
  },
  defaultSort: 'sortOrder',
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
  // tabs come first so the SEO plugin adds its tab alongside the others
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'size', type: 'text', admin: { description: 'e.g. 1000 ml' } },
            { name: 'tagline', type: 'text' },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 400,
              admin: { description: 'Shown on product cards and as the default meta description.' },
            },
            { name: 'description', type: 'richText' },
            {
              name: 'professionalOnly',
              type: 'checkbox',
              label: 'Professional only',
              admin: { description: 'Shows a "Professional only" tag (salon / B2B product, not for retail sale).' },
            },
            {
              name: 'freeFrom',
              type: 'select',
              hasMany: true,
              options: [...freeFromOptions],
              admin: { description: 'Shown as "… free" badges.' },
            },
            {
              name: 'badges',
              type: 'array',
              admin: { description: 'Other short label claims, e.g. "For All Types of Skin".' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'beforeAfter',
              label: 'Before & after',
              type: 'array',
              admin: { description: 'Image pairs shown as a before/after slider. Use photos of the same size and framing.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'before', type: 'upload', relationTo: 'media', required: true, admin: { width: '50%' } },
                    { name: 'after', type: 'upload', relationTo: 'media', required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'caption', type: 'text' },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Benefits & ingredients',
          fields: [
            { name: 'highlightsHeading', type: 'text', defaultValue: 'Benefits' },
            {
              name: 'highlights',
              type: 'array',
              fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
            },
            { name: 'ingredientsHeading', type: 'text', defaultValue: 'Key ingredients' },
            {
              name: 'keyIngredients',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'text', type: 'textarea' },
              ],
            },
            { name: 'fullIngredients', type: 'textarea' },
          ],
        },
      ],
    },
    slugField('title'),
    {
      name: 'range',
      type: 'relationship',
      relationTo: 'ranges',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'audience',
      type: 'select',
      hasMany: true,
      required: true,
      options: [...audienceOptions],
      admin: { position: 'sidebar', description: 'Used by the shop filter.' },
    },
    {
      name: 'concerns',
      type: 'select',
      hasMany: true,
      options: [...concernOptions],
      admin: { position: 'sidebar', description: 'Hair or skin concerns, used by the shop filter.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Best seller',
      admin: { position: 'sidebar', description: 'Show in "Best sellers" product grids.' },
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
