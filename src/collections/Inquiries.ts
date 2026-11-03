import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const enquiryKinds = [
  { label: 'Customer', value: 'customer' },
  { label: 'Salon / distributor partner', value: 'partner' },
] as const

export const partnerTypes = [
  { label: 'Salon', value: 'salon' },
  { label: 'Distributor', value: 'distributor' },
] as const

export const enquiryTypes = [
  { label: 'Salon partnership', value: 'partnership' },
  { label: 'Product information', value: 'product' },
  { label: 'Other', value: 'other' },
] as const

/**
 * Website form submissions. The public cannot reach this collection through
 * the REST/GraphQL API — submissions are created by the server action in
 * src/app/(frontend)/actions.ts after validation and spam checks.
 */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'businessName', 'city', 'status', 'createdAt'],
    group: 'Enquiries',
  },
  defaultSort: '-createdAt',
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [...enquiryKinds],
      admin: { position: 'sidebar', description: 'Which form it came from: Contact (customer) or Salon Partner.' },
    },
    { name: 'name', type: 'text', required: true, maxLength: 120 },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
        { name: 'phone', type: 'text', maxLength: 30, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'businessName', label: 'Salon / business', type: 'text', maxLength: 160, admin: { width: '50%' } },
        { name: 'city', type: 'text', maxLength: 80, admin: { width: '50%' } },
      ],
    },
    {
      name: 'partnerType',
      type: 'select',
      options: [...partnerTypes],
      admin: { condition: (_, s) => s?.kind === 'partner' },
    },
    {
      name: 'enquiryType',
      type: 'select',
      options: [...enquiryTypes],
      defaultValue: 'product',
      admin: { condition: (_, s) => s?.kind !== 'partner' },
    },
    { name: 'product', type: 'relationship', relationTo: 'products' },
    { name: 'message', type: 'textarea', required: true, maxLength: 3000 },
    { name: 'sourcePage', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
  ],
  timestamps: true,
}
