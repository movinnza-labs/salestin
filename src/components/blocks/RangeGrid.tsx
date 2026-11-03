import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getRanges } from '@/lib/payload'
import type { Range, RangeGridBlock } from '@/payload-types'

export async function RangeGrid({ eyebrow, heading, headingAccent, intro, ranges, background }: RangeGridBlock) {
  const selected = (ranges ?? []).filter((r): r is Range => typeof r === 'object')
  const list = selected.length ? selected : await getRanges()
  if (!list.length) return null

  return (
    <Section background={background}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((range) => (
            <li key={range.id} className="reveal">
              <Link
                href={`/ranges/${range.slug}`}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-white sm:aspect-[3/4]"
              >
                <CMSImage
                  media={range.image}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                {range.tagline && <p className="text-[11px] tracking-[0.2em] text-gold-300 uppercase">{range.tagline}</p>}
                <h3 className="mt-2 text-3xl font-semibold">{range.title}</h3>
                {range.summary && <p className="mt-2 line-clamp-2 text-sm text-white/75">{range.summary}</p>}
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-gold-300">
                  Explore the range
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
