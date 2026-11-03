import { CMSImage } from '@/components/ui/CMSImage'
import { CMSLink } from '@/components/ui/CMSLink'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { resolveHref } from '@/lib/links'
import { getBanners } from '@/lib/payload'
import type { BannersBlock } from '@/payload-types'

import { HeroCarousel, type Slide } from './HeroCarousel'

const positions = { center: '50% 50%', top: '50% 20%', right: '80% 50%', left: '20% 50%' } as const

const toCta = (link?: { label?: string | null } | null) => {
  const href = resolveHref(link as Parameters<typeof resolveHref>[0])
  return href && link?.label ? { href, label: link.label } : null
}

/** Shows the active banners of one placement, managed under Content → Banners. */
export async function Banners({ placement, eyebrow, heading, headingAccent, intro }: BannersBlock) {
  const banners = await getBanners(placement)
  if (!banners.length) return null

  if (placement === 'hero') {
    const slides: Slide[] = banners.map((b, i) => ({
      id: String(b.id),
      image: (
        <CMSImage
          media={b.image}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 60vw, 100vw"
          objectPosition={positions[b.imagePosition ?? 'center']}
        />
      ),
      eyebrow: b.eyebrow,
      heading: b.heading,
      accent: b.headingAccent,
      text: b.text,
      primary: toCta(b.primaryCta),
      secondary: toCta(b.secondaryCta),
    }))
    return <HeroCarousel slides={slides} />
  }

  return (
    <Section background="cream" className="py-12! sm:py-16!">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {banners.map((b) => (
            <li
              key={b.id}
              className="on-dark relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl bg-plum-950 p-7 text-white"
            >
              <CMSImage
                media={b.image}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                objectPosition={positions[b.imagePosition ?? 'center']}
                className="-z-10 opacity-60"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-plum-950 via-plum-950/60 to-transparent" />
              {b.eyebrow && <p className="text-[11px] tracking-[0.2em] text-gold-300 uppercase">{b.eyebrow}</p>}
              <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                {b.heading}
                {b.headingAccent && <em className="block font-normal text-gold-300">{b.headingAccent}</em>}
              </h3>
              {b.text && <p className="mt-2 max-w-md text-sm text-white/80">{b.text}</p>}
              <div className="mt-5 flex flex-wrap gap-3">
                <CMSLink link={b.primaryCta} variant="gold" />
                <CMSLink link={b.secondaryCta} variant="outline-light" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
