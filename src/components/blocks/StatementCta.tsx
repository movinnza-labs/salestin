import { BrandSeal } from '@/components/ui/BrandSeal'
import { CMSImage } from '@/components/ui/CMSImage'
import { CMSLink } from '@/components/ui/CMSLink'
import type { StatementCtaBlock } from '@/content/types'

export function StatementCta({ eyebrow, heading, headingAccent, intro, image, primaryCta, secondaryCta }: StatementCtaBlock) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <CMSImage media={image} fill sizes="100vw" className="-z-20 opacity-55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(28_18_48/0.55),rgb(20_20_20/0.92)_75%)]" />

      <div className="container-x flex min-h-[80svh] flex-col items-center justify-center py-24 text-center">
        <BrandSeal className="relative size-24 text-gold-300 sm:size-28" />
        {eyebrow && <p className="eyebrow mt-10">{eyebrow}</p>}
        {heading && (
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] font-light">
            {heading}
            {headingAccent && <em className="mt-2 block text-[0.55em] leading-tight font-normal text-gold-300">{headingAccent}</em>}
          </h2>
        )}
        {intro && <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{intro}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CMSLink link={primaryCta} variant="gold" arrow className="px-7 py-3.5" />
          <CMSLink link={secondaryCta} variant="outline-light" className="px-7 py-3.5" />
        </div>
      </div>
    </section>
  )
}
