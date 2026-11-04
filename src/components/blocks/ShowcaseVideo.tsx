'use client'

import { useEffect, useRef } from 'react'

type Props = { src: string; poster?: string | null; label: string; className?: string }

/** Muted looping video that only autoplays when the visitor has not asked for reduced motion. */
export function ShowcaseVideo({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {
      // autoplay blocked: the controls are there
    })
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster ?? undefined}
      aria-label={label}
      className={className}
      muted
      loop
      playsInline
      controls
      preload="metadata"
    />
  )
}
