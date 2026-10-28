import { BrandSeal } from '@/components/ui/BrandSeal'
import { CMSImage } from '@/components/ui/CMSImage'
import { CMSLink } from '@/components/ui/CMSLink'
import { LOGO_PATH } from '@/components/ui/logoPath'
import type { EditorialHeroBlock } from '@/content/types'

export function EditorialHero(block: EditorialHeroBlock) {
  const { eyebrow, heading, headingAccent, text, image, detailImage, detailCaption, sideLabel, primaryCta, secondaryCta } =
    block

  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* oversized leaf mark from the logo as a watermark */}
      <svg
        viewBox="868 47 278 143"
        aria-hidden
        className="absolute -top-16 -right-40 -z-10 w-[900px] max-w-none fill-plum-600/[0.05] lg:-right-24"
      >
        <path fillRule="evenodd" d={LOGO_PATH} />
      </svg>

      {sideLabel && (
        <p
          aria-hidden
          className="absolute top-1/2 left-5 hidden -translate-y-1/2 rotate-180 text-[11px] tracking-[0.5em] text-muted uppercase [writing-mode:vertical-rl] xl:block"
        >
          {sideLabel}
        </p>
      )}

      <div className="container-x grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="animate-fade-up lg:col-span-6 xl:col-span-6">
          {eyebrow && (
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-10 bg-gold-500" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-6 font-display text-[clamp(3rem,7.2vw,6.75rem)] leading-[0.92] font-light tracking-[-0.01em] text-ink">
            {heading}
            {headingAccent && <em className="mt-3 block font-normal text-plum-600">{headingAccent}</em>}
          </h1>
          {text && <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">{text}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <CMSLink link={primaryCta} variant="dark" arrow className="px-7 py-3.5" />
            <CMSLink link={secondaryCta} variant="text" className="border-b border-gold-500 pb-1! hover:no-underline" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] lg:col-span-6 lg:mr-0 xl:col-span-5 xl:col-start-8">
          {/* offset outline arch */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-gold-300 sm:translate-x-6 sm:translate-y-6" aria-hidden />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-lavender-100 shadow-lift">
            <CMSImage media={image} fill priority sizes="(min-width: 1024px) 480px, 90vw" />
          </div>

          {detailImage && (
            <figure className="absolute bottom-8 left-2 w-32 sm:-left-12 sm:w-40">
              <div className="relative aspect-square overflow-hidden rounded-full shadow-lift ring-[6px] ring-cream">
                <CMSImage media={detailImage} fill sizes="160px" />
              </div>
              {detailCaption && (
                <figcaption className="mt-3 text-center font-display text-base text-ink italic sm:text-lg">{detailCaption}</figcaption>
              )}
            </figure>
          )}

          <BrandSeal className="absolute -top-6 -right-2 size-28 bg-cream/80 text-plum-700 backdrop-blur sm:-right-8 sm:size-32" />
        </div>
      </div>
    </section>
  )
}
