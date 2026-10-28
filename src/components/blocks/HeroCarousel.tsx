'use client'

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Link from 'next/link'
import { type ReactNode, useCallback, useEffect, useState, useSyncExternalStore } from 'react'

import { buttonClass } from '@/components/ui/CMSLink'
import { cn } from '@/lib/cn'

export type Slide = {
  id: string
  image: ReactNode
  eyebrow?: string | null
  heading: string
  accent?: string | null
  text?: string | null
  primary?: { href: string; label: string } | null
  secondary?: { href: string; label: string } | null
}

const INTERVAL = 6500
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
  const playing = !paused && !reducedMotion
  const count = slides.length

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (!playing || count < 2) return
    const t = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(t)
  }, [index, playing, count, go])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate overflow-hidden bg-ink text-white"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1)
        if (e.key === 'ArrowLeft') go(index - 1)
      }}
    >
      <div className="relative h-[78svh] min-h-[520px] max-h-[820px]">
        {slides.map((slide, i) => {
          const active = i === index
          const Heading = i === 0 ? 'h1' : 'h2'
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                'absolute inset-0 transition-opacity duration-1000 ease-out',
                active ? 'z-10 opacity-100' : 'z-0 opacity-0',
              )}
            >
              {/* image fills the right side on desktop (brand imagery is mostly portrait), full-bleed on mobile */}
              <div className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[60%]">
                <div className={cn('absolute inset-0 transition-transform duration-[7000ms] ease-out', active ? 'scale-105' : 'scale-100')}>
                  {slide.image}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10 lg:bg-gradient-to-r lg:from-ink lg:from-40% lg:via-ink/60 lg:via-55% lg:to-transparent" />
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 hidden w-1/2 bg-[radial-gradient(ellipse_at_20%_50%,rgb(91_63_143/0.35),transparent_70%)] lg:block"
              />

              <div className="container-x relative flex h-full items-center">
                <div className={cn('max-w-xl', active && 'animate-fade-up')}>
                  {slide.eyebrow && (
                    <p className="mb-5 inline-flex rounded-full border border-gold-300/40 bg-ink/30 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-gold-300 uppercase backdrop-blur">
                      {slide.eyebrow}
                    </p>
                  )}
                  <Heading className="text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
                    {slide.heading}
                    {slide.accent && <span className="mt-2 block font-medium text-gold-300 italic">{slide.accent}</span>}
                  </Heading>
                  {slide.text && <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">{slide.text}</p>}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {slide.primary && (
                      <Link href={slide.primary.href} className={buttonClass('gold')}>
                        {slide.primary.label}
                      </Link>
                    )}
                    {slide.secondary && (
                      <Link href={slide.secondary.href} className={buttonClass('outline-light')}>
                        {slide.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {count > 1 && (
        <div className="container-x absolute inset-x-0 bottom-6 z-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={cn('h-1.5 rounded-full transition-all', i === index ? 'w-8 bg-gold-300' : 'w-3 bg-white/50 hover:bg-white')}
              />
            ))}
            <button
              type="button"
              onClick={() => setPaused(playing)}
              className="ml-3 grid size-8 place-items-center rounded-full text-white/80 hover:text-white"
            >
              {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              <span className="sr-only">{playing ? 'Pause slideshow' : 'Play slideshow'}</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm tracking-widest text-white/80 tabular-nums" aria-hidden>
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="grid size-11 place-items-center rounded-full border border-white/40 bg-ink/30 backdrop-blur hover:bg-white hover:text-ink"
            >
              <ChevronLeft className="size-5" aria-hidden />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="grid size-11 place-items-center rounded-full border border-white/40 bg-ink/30 backdrop-blur hover:bg-white hover:text-ink"
            >
              <ChevronRight className="size-5" aria-hidden />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
