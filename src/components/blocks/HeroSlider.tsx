import { CMSImage } from '@/components/ui/CMSImage'
import { resolveHref } from '@/lib/links'
import type { HeroSliderBlock } from '@/content/types'

import { HeroCarousel, type Slide } from './HeroCarousel'

const positions = { center: '50% 50%', top: '50% 20%', right: '80% 50%', left: '20% 50%' } as const

const toCta = (link?: { label?: string | null } | null) => {
  const href = resolveHref(link as Parameters<typeof resolveHref>[0])
  return href && link?.label ? { href, label: link.label } : null
}

export function HeroSlider({ slides }: HeroSliderBlock) {
  const items: Slide[] = slides.map((slide, i) => ({
    id: slide.id ?? String(i),
    image: (
      <CMSImage
        media={slide.image}
        fill
        priority={i === 0}
        sizes="(min-width: 1024px) 60vw, 100vw"
        objectPosition={positions[slide.imagePosition ?? 'center']}
      />
    ),
    eyebrow: slide.eyebrow,
    heading: slide.heading,
    accent: slide.headingAccent,
    text: slide.text,
    primary: toCta(slide.primaryCta),
    secondary: toCta(slide.secondaryCta),
  }))

  return <HeroCarousel slides={items} />
}
