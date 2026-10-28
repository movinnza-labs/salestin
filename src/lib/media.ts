import type { Media } from '@/content/types'

export type MediaRef = number | Media | null | undefined

export const asMedia = (ref: MediaRef): Media | null =>
  ref && typeof ref === 'object' ? ref : null

/** Image URLs are site-relative (/media/…), so next/image treats them as local images. */
export const mediaSrc = (url?: string | null): string | null => url || null
