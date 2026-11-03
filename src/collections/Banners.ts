import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkField } from '../fields/link'
import { revalidateCollection } from '../hooks/revalidate'

const revalidate = revalidateCollection(() => ['/'], 'layout')

export const bannerPlacements = [
  { label: 'Home hero slider', value: 'hero' },
  { label: 'Offers strip', value: 'offer' },
] as const

export const Banners: CollectionConfig = {
  slug: 'banners',
  labels: { singular: 'Banner', plural: 'Banners' },
  admin: {
    useAsTitle: 'heading',
    defaultColumns: ['heading', 'placement', 'active', 'sortOrder', 'endsAt'],
    group: 'Content',
    description:
      'Home page hero slides and offers. A "Banners" block on a page shows the active banners of its placement.',
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
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'placement',
          type: 'select',
          required: true,
          defaultValue: 'hero',
          options: [...bannerPlacements],
          admin: { width: '50%' },
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
          admin: { width: '50%', description: 'Lower numbers appear first.' },
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'center',
      options: ['center', 'top', 'right', 'left'].map((v) => ({ label: v, value: v })),
      admin: { description: 'Which part of the image to keep visible when cropped.' },
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'headingAccent', type: 'text' },
    { name: 'text', type: 'textarea' },
    linkField({ name: 'primaryCta', label: 'Primary button' }),
    linkField({ name: 'secondaryCta', label: 'Secondary button' }),
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Untick to hide the banner without deleting it.' },
    },
    {
      name: 'startsAt',
      type: 'date',
      admin: { position: 'sidebar', description: 'Optional: show from this date.' },
    },
    {
      name: 'endsAt',
      type: 'date',
      admin: { position: 'sidebar', description: 'Optional: hide after this date (e.g. when an offer ends).' },
    },
  ],
}
