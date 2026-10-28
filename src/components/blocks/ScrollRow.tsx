'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type ReactNode, useRef } from 'react'

/** Horizontal scroll-snap row with previous/next buttons. */
export function ScrollRow({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: smooth ? 'smooth' : 'auto' })
  }

  const btn =
    'grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white'

  return (
    <div>
      <div className="container-x flex justify-end gap-3">
        <button type="button" onClick={() => scroll(-1)} className={btn}>
          <ArrowLeft className="size-5" aria-hidden />
          <span className="sr-only">Scroll {label} left</span>
        </button>
        <button type="button" onClick={() => scroll(1)} className={btn}>
          <ArrowRight className="size-5" aria-hidden />
          <span className="sr-only">Scroll {label} right</span>
        </button>
      </div>
      <ul
        ref={ref}
        aria-label={label}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] scroll-px-4 sm:gap-8 sm:px-6 sm:scroll-px-6 lg:px-(--row-gutter) lg:scroll-px-(--row-gutter) [--row-gutter:max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  )
}
