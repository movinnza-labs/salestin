import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CMSImage } from '@/components/ui/CMSImage'
import { buttonClass } from '@/components/ui/CMSLink'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import { resolveHref } from '@/lib/links'
import { asMedia, mediaSrc } from '@/lib/media'
import type { ProductShowcaseBlock } from '@/payload-types'

import { ShowcaseVideo } from './ShowcaseVideo'
import { studioButton, studioEyebrow, studioHeading } from './studio'

/** One product in the spotlight: a tall image or video beside its benefits and buttons. */
export function ProductShowcase({
  eyebrow,
  heading,
  headingAccent,
  intro,
  benefits,
  footnote,
  primaryCta,
  secondaryCta,
  media,
  videoPoster,
  mediaPosition,
  style,
  background,
}: ProductShowcaseBlock) {
  const editorial = style === 'editorial'
  const doc = asMedia(media)
  const isVideo = Boolean(doc?.mimeType?.startsWith('video/'))
  const poster = asMedia(videoPoster)
  const primary = resolveHref(primaryCta)
  const secondary = resolveHref(secondaryCta)

  return (
    <Section background={background}>
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn('relative', mediaPosition === 'right' && 'lg:order-2')}>
          <div
            className={cn(
              'relative mx-auto aspect-[2/3] max-w-md overflow-hidden bg-ink shadow-lift',
              editorial ? 'rounded-t-full' : 'rounded-xl',
            )}
          >
            {isVideo && doc?.url ? (
              <ShowcaseVideo
                src={mediaSrc(doc.url) ?? doc.url}
                poster={mediaSrc(poster?.sizes?.card?.url || poster?.url)}
                label={doc.alt}
                className="size-full object-cover"
              />
            ) : (
              <CMSImage media={media} fill sizes="(min-width: 1024px) 448px, 90vw" />
            )}
          </div>
        </div>

        <div>
          {eyebrow && (
            <p className={editorial ? 'eyebrow' : cn(studioEyebrow, 'text-gold-600')}>{eyebrow}</p>
          )}
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
                    editorial ? 'font-normal text-plum-600 italic' : 'font-semibold text-gold-600',
                  )}
                >
                  {headingAccent}
                </span>
              )}
            </h2>
          )}
          {intro && <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{intro}</p>}

          {!!benefits?.length && (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b.id ?? b.text} className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold-300 text-gold-600">
                    <Icon name={b.icon} className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{b.text}</span>
                </li>
              ))}
            </ul>
          )}

          {(primary || secondary) && (
            <div className="mt-9 flex flex-wrap gap-3">
              {primary && primaryCta?.label && (
                <Link
                  href={primary}
                  className={editorial ? buttonClass('primary') : studioButton('gold')}
                >
                  {primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
              {secondary && secondaryCta?.label && (
                <Link
                  href={secondary}
                  className={editorial ? buttonClass('outline') : studioButton('outline')}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}

          {footnote && (
            <p className="mt-6 text-xs tracking-[0.12em] text-muted uppercase">{footnote}</p>
          )}
        </div>
      </div>
    </Section>
  )
}
