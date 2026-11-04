import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { StatementBlock } from '@/payload-types'

import { studioEyebrow } from './studio'

/** A single centred statement: eyebrow, large heading, supporting line. */
export function Statement({ eyebrow, heading, text, footnote, background }: StatementBlock) {
  return (
    <Section background={background} className="lg:py-28!">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <p className={cn(studioEyebrow, 'text-gold-600 in-[.on-gold]:text-ink')}>{eyebrow}</p>
        )}
        <h2 className="mt-5 font-modern text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
          {heading}
        </h2>
        {text && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-muted">
            {text}
          </p>
        )}
        {footnote && (
          <>
            <span aria-hidden className="mx-auto mt-9 block h-px w-16 bg-gold-500" />
            <p className={cn(studioEyebrow, 'mt-6 text-gold-600 in-[.on-gold]:text-ink')}>
              {footnote}
            </p>
          </>
        )}
      </div>
    </Section>
  )
}
