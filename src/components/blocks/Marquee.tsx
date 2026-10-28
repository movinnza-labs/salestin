import { cn } from '@/lib/cn'
import type { MarqueeBlock } from '@/content/types'

const tones = {
  dark: 'bg-plum-950 text-white',
  cream: 'bg-cream text-ink',
  lavender: 'bg-lavender-100 text-plum-900',
} as const

export function Marquee({ items, background }: MarqueeBlock) {
  if (!items?.length) return null
  // repeat short lists so one copy is always wider than the viewport
  const run = Array.from({ length: Math.max(1, Math.ceil(8 / items.length)) }, () => items).flat()

  return (
    <section className={cn('overflow-hidden py-6 sm:py-8', tones[background ?? 'dark'])}>
      <p className="sr-only">{items.map((i) => i.text).join(' · ')}</p>
      <div aria-hidden className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {run.map((item, i) => (
              <li key={`${copy}-${i}`} className="flex items-center font-display text-3xl font-light whitespace-nowrap italic sm:text-5xl">
                <span className="px-8 sm:px-12">{item.text}</span>
                <span className="size-2 rotate-45 bg-gold-500" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
