import { CMSImage } from '@/components/ui/CMSImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { PageHeroBlock } from '@/content/types'

export function PageHero({ eyebrow, heading, headingAccent, intro, image }: PageHeroBlock) {
  if (image) {
    return (
      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <CMSImage media={image} fill priority sizes="100vw" className="-z-10 opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-plum-950/90 via-plum-950/50 to-ink/30" />
        <div className="container-x py-24 sm:py-32 lg:py-40">
          <SectionHeading as="h1" eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} />
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream">
      <div className="container-x py-16 sm:py-20">
        <SectionHeading as="h1" eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} />
      </div>
    </section>
  )
}
