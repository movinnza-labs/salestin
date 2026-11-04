import { Plus } from 'lucide-react'

import { CMSImage } from '@/components/ui/CMSImage'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { PillarIndexBlock } from '@/payload-types'

import { studioEyebrow, studioHeading } from './studio'

/** Editorial numbered index; each entry expands (native <details>, no JS). */
export function PillarIndex(block: PillarIndexBlock) {
  if (block.layout === 'list') return <PillarList {...block} />
  const { eyebrow, heading, headingAccent, intro, items, image, background } = block
  return (
    <Section background={background}>
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 className="mt-4 font-display text-5xl leading-[0.95] font-light sm:text-6xl">
                {heading}
                {headingAccent && (
                  <em className="block font-normal text-plum-600">{headingAccent}</em>
                )}
              </h2>
            )}
            {intro && <p className="mt-6 max-w-sm text-muted">{intro}</p>}
            {image && (
              <div className="relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-t-full lg:block">
                <CMSImage media={image} fill sizes="400px" />
              </div>
            )}
          </div>
        </div>

        <ol className="border-t border-ink/15 lg:col-span-7">
          {items.map((item, i) => (
            <li key={item.id ?? item.title} className="border-b border-ink/15">
              <details className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center gap-5 py-7 sm:gap-8 [&::-webkit-details-marker]:hidden">
                  <span className="w-10 font-display text-lg text-gold-600 italic tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display text-3xl font-light transition-colors group-hover:text-plum-600 sm:text-4xl">
                    {item.title}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-300 group-open:rotate-45 group-open:border-plum-600 group-open:bg-plum-600 group-open:text-white">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </summary>
                {item.text && (
                  <div className="flex gap-5 pb-8 pl-15 sm:gap-8 sm:pl-18">
                    <Icon name={item.icon} className="mt-1 size-5 shrink-0 text-gold-600" />
                    <p className="max-w-xl text-base leading-relaxed text-ink-soft">{item.text}</p>
                  </div>
                )}
              </details>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

/** Studio variant: sticky heading and image beside an always-open numbered list. */
function PillarList({
  eyebrow,
  heading,
  headingAccent,
  intro,
  items,
  image,
  background,
}: PillarIndexBlock) {
  return (
    <Section background={background}>
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-28">
          {eyebrow && <p className={cn(studioEyebrow, 'text-gold-600')}>{eyebrow}</p>}
          {heading && (
            <h2 className={cn(studioHeading, 'mt-4 text-4xl leading-tight sm:text-5xl')}>
              {heading}
              {headingAccent && (
                <span className="block font-semibold text-gold-600">{headingAccent}</span>
              )}
            </h2>
          )}
          {intro && <p className="mt-5 max-w-lg leading-relaxed text-muted">{intro}</p>}
          {image && (
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl shadow-md">
              <CMSImage media={image} fill sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          )}
        </div>

        <ol className="divide-y divide-gold-500/50 border-y border-gold-500/50">
          {items.map((item, i) => (
            <li key={item.id ?? item.title} className="flex gap-5 py-6">
              <span className="font-modern text-xl font-bold text-gold-600 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-modern text-xl font-semibold">{item.title}</h3>
                {item.text && <p className="mt-2 leading-relaxed text-muted">{item.text}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
