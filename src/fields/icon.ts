import type { Field } from 'payload'

/** Keep in sync with the map in src/components/ui/Icon.tsx */
export const iconOptions = [
  { label: 'Leaf', value: 'leaf' },
  { label: 'Star', value: 'star' },
  { label: 'Flask (R&D)', value: 'flask' },
  { label: 'Eye (Vision)', value: 'eye' },
  { label: 'Heart', value: 'heart' },
  { label: 'Droplet', value: 'droplet' },
  { label: 'Sparkles', value: 'sparkles' },
  { label: 'Shield', value: 'shield' },
  { label: 'Waves', value: 'waves' },
  { label: 'Atom (Technology)', value: 'atom' },
  { label: 'Salon professional', value: 'user' },
  { label: 'Check', value: 'check' },
  { label: 'Flower', value: 'flower' },
  { label: 'Hair strand', value: 'hair' },
  { label: 'Gem', value: 'gem' },
  { label: 'Ban (Free from)', value: 'ban' },
] as const

export type IconName = (typeof iconOptions)[number]['value']

export const iconField = (overrides: Partial<Field> = {}): Field =>
  ({
    name: 'icon',
    type: 'select',
    options: [...iconOptions],
    defaultValue: 'sparkles',
    ...overrides,
  }) as Field
