import type { Media } from '@/payload-types'

export type MediaRef = number | Media | null | undefined

export const asMedia = (ref: MediaRef): Media | null => (ref && typeof ref === 'object' ? ref : null)

/**
 * Payload returns absolute URLs when serverURL is set. Keep same-origin files
 * relative so next/image treats them as local images.
 */
export const mediaSrc = (url?: string | null): string | null => {
  if (!url) return null
  const base = process.env.NEXT_PUBLIC_SERVER_URL
  if (base && url.startsWith(base)) return url.slice(base.length) || '/'
  return url
}
