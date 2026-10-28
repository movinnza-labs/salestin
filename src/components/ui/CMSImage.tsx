import Image from 'next/image'

import { cn } from '@/lib/cn'
import { asMedia, type MediaRef, mediaSrc } from '@/lib/media'

type Props = {
  media: MediaRef
  sizes: string
  className?: string
  /** `fill` covers the positioned parent; otherwise intrinsic dimensions are used. */
  fill?: boolean
  priority?: boolean
  objectPosition?: string
  alt?: string
}

export function CMSImage({ media, sizes, className, fill = false, priority = false, objectPosition, alt }: Props) {
  const doc = asMedia(media)
  const src = mediaSrc(doc?.url)
  if (!doc || !src) return null

  const position =
    objectPosition ?? (doc.focalX != null && doc.focalY != null ? `${doc.focalX}% ${doc.focalY}%` : undefined)

  return (
    <Image
      src={src}
      alt={alt ?? doc.alt ?? ''}
      sizes={sizes}
      priority={priority}
      className={cn(fill && 'object-cover', className)}
      style={position ? { objectPosition: position } : undefined}
      {...(fill ? { fill: true } : { width: doc.width ?? 1200, height: doc.height ?? 800 })}
    />
  )
}
