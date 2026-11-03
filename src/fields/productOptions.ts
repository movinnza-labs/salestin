/** Option lists shared by the Products collection, shop filters and badges. */

export const audienceOptions = [
  { label: 'Salon (professional)', value: 'salon' },
  { label: 'Home care', value: 'home' },
] as const

export const concernOptions = [
  { label: 'Frizz & smoothing', value: 'smoothing' },
  { label: 'Damage repair & strength', value: 'repair' },
  { label: 'Shine & nourishment', value: 'shine' },
  { label: 'Deep cleansing', value: 'cleansing' },
  { label: 'Skin hydration & glow', value: 'skin-glow' },
  { label: 'Hair removal & smooth skin', value: 'hair-removal' },
] as const

export const freeFromOptions = [
  { label: 'Sulfate free', value: 'sulfate' },
  { label: 'Paraben free', value: 'paraben' },
  { label: 'Formaldehyde free', value: 'formaldehyde' },
  { label: 'Colophony free', value: 'colophony' },
] as const

export type Audience = (typeof audienceOptions)[number]['value']
export type Concern = (typeof concernOptions)[number]['value']
export type FreeFrom = (typeof freeFromOptions)[number]['value']

const labelOf = <T extends { label: string; value: string }>(options: readonly T[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value

export const audienceLabel = (v: string) => labelOf(audienceOptions, v)
export const concernLabel = (v: string) => labelOf(concernOptions, v)
export const freeFromLabel = (v: string) => labelOf(freeFromOptions, v)
