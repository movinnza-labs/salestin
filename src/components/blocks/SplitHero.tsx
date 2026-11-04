import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import { resolveHref } from '@/lib/links'
import type { SplitHeroBlock } from '@/payload-types'

import { studioButton, studioEyebrow, studioHeading } from './studio'

export function SplitHero({
  eyebrow,
  heading,
  text,
  primaryCta,
  secondaryCta,
  points,
  image,
  imageBadge,
  background,
}: SplitHeroBlock) {
  const primary = resolveHref(primaryCta)
  const secondary = resolveHref(secondaryCta)

  return (
    <Section
      background={background}
      className="border-b border-gold-500/40 py-12! md:py-16! lg:py-20!"
    >
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="relative z-10 lg:col-span-5">
          {eyebrow && (
            <p className={cn(studioEyebrow, 'inline-flex items-center gap-3 text-muted')}>
              <span aria-hidden className="h-px w-8 bg-gold-500" />
              {eyebrow}
            </p>
          )}
          <h1 className={cn(studioHeading, 'mt-6 text-5xl leading-[0.96] sm:text-6xl lg:text-7xl')}>
            {heading}
          </h1>
          {text && (
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted">{text}</p>
          )}

          {(primary || secondary) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primary && primaryCta?.label && (
                <Link href={primary} className={studioButton('gold')}>
                  {primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
              {secondary && secondaryCta?.label && (
                <Link href={secondary} className={studioButton('outline')}>
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}

          {!!points?.length && (
            <ol className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-gold-500/50 pt-5">
              {points.map((p, i) => (
                <li key={p.id ?? p.text}>
                  <p className="font-modern text-xl font-semibold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="relative lg:col-span-7 lg:pl-8">
          <div className="overflow-hidden rounded-xl bg-lavender-50 p-3 shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <CMSImage media={image} fill priority sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          </div>
          {(imageBadge?.eyebrow || imageBadge?.text) && (
            <div className="absolute bottom-7 left-0 hidden max-w-52 rounded-lg bg-gold-500 p-5 text-ink shadow-md md:block">
              {imageBadge.eyebrow && (
                <p className={cn(studioEyebrow, 'tracking-[0.16em]')}>{imageBadge.eyebrow}</p>
              )}
              {imageBadge.text && (
                <p className="mt-2 font-modern text-lg font-semibold">{imageBadge.text}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
