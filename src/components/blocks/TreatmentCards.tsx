import Link from 'next/link'

import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import { resolveHref } from '@/lib/links'
import type { TreatmentCardsBlock } from '@/payload-types'

import { studioEyebrow, studioHeading } from './studio'

const details = [
  ['focus', 'Focus'],
  ['positioning', 'Positioning'],
  ['keyIngredients', 'Key ingredients'],
  ['idealFor', 'Ideal for'],
] as const

/** Numbered treatment overview cards: focus, positioning, key ingredients and who it is for. */
export function TreatmentCards({
  eyebrow,
  heading,
  headingAccent,
  intro,
  items,
  style,
  background,
}: TreatmentCardsBlock) {
  const editorial = style === 'editorial'

  return (
    <Section background={background}>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 border-b border-current/20 pb-9 md:flex-row md:items-end">
          <div>
            {eyebrow && <p className={editorial ? 'eyebrow' : studioEyebrow}>{eyebrow}</p>}
            {heading && (
              <h2
                className={cn(
                  'mt-4',
                  editorial
                    ? 'font-display text-5xl leading-[0.95] font-light sm:text-6xl'
                    : cn(studioHeading, 'text-4xl sm:text-5xl'),
                )}
              >
                {heading}
                {headingAccent && (
                  <span
                    className={cn(
                      'block',
                      editorial ? 'font-normal text-gold-300 italic' : 'font-semibold',
                    )}
                  >
                    {headingAccent}
                  </span>
                )}
              </h2>
            )}
          </div>
          {intro && <p className="max-w-md text-sm leading-relaxed opacity-90">{intro}</p>}
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item, i) => {
            const href = resolveHref(item.link)
            return (
              <li
                key={item.id ?? item.title}
                className={cn(
                  'relative flex flex-col rounded-xl border border-current/20 p-6 sm:p-8',
                  href && 'group transition-colors hover:bg-white/10',
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={cn(
                      'tabular-nums',
                      editorial
                        ? 'font-display text-3xl text-gold-300 italic'
                        : 'font-modern text-2xl font-bold',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.tag && (
                    <span className="rounded-full border border-current/30 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase">
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3
                  className={cn(
                    'mt-6',
                    editorial
                      ? 'font-display text-3xl leading-tight font-normal'
                      : 'font-modern text-xl font-semibold',
                  )}
                >
                  {href ? (
                    <Link
                      href={href}
                      className="after:absolute after:inset-0 after:content-[''] group-hover:underline"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <dl className="mt-5 grid gap-3 text-sm leading-relaxed">
                  {details.map(([key, label]) =>
                    item[key] ? (
                      <div key={key} className="grid gap-0.5 sm:grid-cols-[8.5rem_1fr] sm:gap-3">
                        <dt className="text-[11px] font-semibold tracking-[0.14em] uppercase opacity-75 sm:pt-0.5">
                          {label}
                        </dt>
                        <dd>{item[key]}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
