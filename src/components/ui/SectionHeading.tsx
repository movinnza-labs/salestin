import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string | null
  heading?: string | null
  accent?: string | null
  intro?: string | null
  align?: 'center' | 'left'
  as?: 'h1' | 'h2'
  className?: string
}

/** Eyebrow + serif heading (with optional italic accent line) + gold rule + intro. */
export function SectionHeading({ eyebrow, heading, accent, intro, align = 'center', as: Tag = 'h2', className }: Props) {
  if (!eyebrow && !heading && !intro) return null
  const center = align === 'center'

  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {heading && (
        <Tag
          className={cn(
            'leading-[1.1] font-semibold',
            Tag === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-[2.75rem]',
          )}
        >
          {heading}
          {accent && (
            <span className="mt-1 block font-medium text-plum-600 italic in-[.on-dark]:text-lavender-300">
              {accent}
            </span>
          )}
        </Tag>
      )}
      <span aria-hidden className={cn('mt-5 block h-px w-14 bg-gold-500', center && 'mx-auto')} />
      {intro && <p className="mt-5 text-base leading-relaxed text-muted in-[.on-dark]:text-white/70">{intro}</p>}
    </div>
  )
}
