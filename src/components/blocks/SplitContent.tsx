import { CheckCircle2 } from 'lucide-react'

import { CMSImage } from '@/components/ui/CMSImage'
import { CMSLink } from '@/components/ui/CMSLink'
import { RichText } from '@/components/ui/RichText'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import type { SplitContentBlock } from '@/content/types'

export function SplitContent(block: SplitContentBlock) {
  const { eyebrow, heading, headingAccent, body, bullets, image, imagePosition, background, cta, footnote } = block
  const dark = background === 'dark'

  return (
    <Section background={background}>
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={cn('reveal relative', imagePosition === 'right' && 'lg:order-2')}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <CMSImage media={image} fill sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          {footnote && (
            <p
              className={cn(
                'absolute -bottom-6 max-w-[80%] rounded-2xl px-5 py-4 font-serif text-sm leading-snug italic shadow-lift sm:text-base',
                imagePosition === 'right' ? 'left-4 sm:-left-6' : 'right-4 sm:-right-6',
                dark ? 'bg-white text-ink' : 'bg-ink text-white',
              )}
            >
              {footnote}
            </p>
          )}
        </div>

        <div className={cn(footnote && 'pt-6 lg:pt-0')}>
          <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} align="left" />
          <RichText data={body} className="mt-6" />
          {!!bullets?.length && (
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b.id ?? b.text} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-plum-600 in-[.on-dark]:text-gold-300" aria-hidden />
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          )}
          <CMSLink link={cta} variant={dark ? 'gold' : 'dark'} arrow className="mt-8" />
        </div>
      </div>
    </Section>
  )
}
