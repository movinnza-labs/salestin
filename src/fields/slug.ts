import type { Field, FieldHook } from 'payload'

export const formatSlug = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const formatSlugHook =
  (sourceField: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return formatSlug(value)
    const source = data?.[sourceField] ?? originalDoc?.[sourceField]
    return typeof source === 'string' ? formatSlug(source) : value
  }

/** URL slug, auto-generated from `sourceField` when left blank. */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `Used in the URL. Leave blank to generate from the ${sourceField}.`,
  },
  hooks: { beforeValidate: [formatSlugHook(sourceField)] },
  validate: (value: unknown) =>
    typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
      ? true
      : 'Use lowercase letters, numbers and hyphens only.',
})
