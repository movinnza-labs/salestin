import { Plus } from 'lucide-react'

import { CMSImage } from '@/components/ui/CMSImage'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import type { PillarIndexBlock } from '@/content/types'

/** Editorial numbered index; each entry expands (native <details>, no JS). */
export function PillarIndex({ eyebrow, heading, headingAccent, intro, items, image, background }: PillarIndexBlock) {
  return (
    <Section background={background}>
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 className="mt-4 font-display text-5xl leading-[0.95] font-light sm:text-6xl">
                {heading}
                {headingAccent && <em className="block font-normal text-plum-600">{headingAccent}</em>}
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
                  <span className="w-10 font-display text-lg text-gold-600 italic tabular-nums">{String(i + 1).padStart(2, '0')}</span>
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
