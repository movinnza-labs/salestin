import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import { resolveHref } from '@/lib/links'
import type { CtaBandBlock } from '@/payload-types'

import { studioButton, studioEyebrow, studioHeading } from './studio'

export function CtaBand({ eyebrow, heading, text, cta, background }: CtaBandBlock) {
  const href = resolveHref(cta)

  return (
    <Section background={background} className="text-center lg:py-28!">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {eyebrow && <p className={studioEyebrow}>{eyebrow}</p>}
        <h2 className={cn(studioHeading, 'mt-5 text-4xl leading-tight sm:text-6xl')}>{heading}</h2>
        {text && <p className="mt-6 text-lg text-pretty">{text}</p>}
        {href && cta?.label && (
          <Link
            href={href}
            className={studioButton(background === 'gold' ? 'light' : 'gold', 'mt-9')}
          >
            {cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </Section>
  )
}
