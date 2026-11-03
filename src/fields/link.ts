import type { Field, GroupField } from 'payload'

type LinkOptions = {
  name?: string
  label?: string
  required?: boolean
  withLabel?: boolean
}

/** A button / nav link pointing at a CMS document or a custom URL. */
export const linkField = ({
  name = 'link',
  label = 'Link',
  required = false,
  withLabel = true,
}: LinkOptions = {}): GroupField => {
  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Internal page', value: 'internal' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: { width: '50%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'products', 'product-categories', 'ranges', 'posts'],
      required,
      maxDepth: 1,
      admin: { condition: (_, sibling) => sibling?.type !== 'custom' },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      required,
      admin: {
        condition: (_, sibling) => sibling?.type === 'custom',
        description: 'Relative (/products) or absolute (https://…), tel: and mailto: are allowed.',
      },
    },
  ]

  if (withLabel) {
    fields.push({ name: 'label', type: 'text', required })
  }

  return {
    name,
    label,
    type: 'group',
    admin: { hideGutter: true },
    fields,
  }
}
