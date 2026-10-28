import { Fragment } from 'react'

import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import type { ManifestoBlock } from '@/content/types'

/** A large editorial statement with small pill-shaped images set inline in the text. */
export function Manifesto({ eyebrow, lines, footnote, background }: ManifestoBlock) {
  return (
    <Section background={background} className="lg:py-32">
      <div className="container-x max-w-5xl text-center">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <p className="reveal mt-8 font-display text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.22] font-light text-balance">
          {lines.map((line, i) => (
            <Fragment key={line.id ?? i}>
              {line.text}{' '}
              {line.image && (
                <span className="relative mx-1 inline-block h-[0.85em] w-[2.1em] translate-y-[0.08em] overflow-hidden rounded-full align-baseline ring-1 ring-line">
                  <CMSImage media={line.image} fill sizes="200px" alt="" />
                </span>
              )}{' '}
            </Fragment>
          ))}
        </p>
        {footnote && (
          <p className="mt-10 flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            <span className="hidden h-px w-10 bg-gold-500 sm:block" aria-hidden />
            {footnote}
            <span className="hidden h-px w-10 bg-gold-500 sm:block" aria-hidden />
          </p>
        )}
      </div>
    </Section>
  )
}
