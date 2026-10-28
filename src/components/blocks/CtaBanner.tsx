import { CMSImage } from '@/components/ui/CMSImage'
import { CMSLink } from '@/components/ui/CMSLink'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { CtaBannerBlock } from '@/content/types'

export function CtaBanner(block: CtaBannerBlock) {
  const { eyebrow, heading, headingAccent, intro, points, primaryCta, secondaryCta, image, background } = block
  const dark = (background ?? 'dark') === 'dark'

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <div
          className={cn(
            'reveal relative isolate grid overflow-hidden rounded-[2rem] border-t-2 border-gold-500 shadow-lift lg:grid-cols-2',
            dark ? 'on-dark bg-plum-950 text-white' : 'bg-lavender-50',
          )}
        >
          {image && (
            <div className="relative min-h-64 lg:order-2 lg:min-h-full">
              <CMSImage media={image} fill sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className={cn('absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r', dark ? 'from-plum-950 via-plum-950/20 to-transparent' : 'from-lavender-50/80 to-transparent')} />
            </div>
          )}
          <div className={cn('p-8 sm:p-12 lg:p-16', !image && 'lg:col-span-2 lg:text-center')}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 className="mt-3 text-3xl leading-tight font-semibold sm:text-4xl">
                {heading}
                {headingAccent && (
                  <span className={cn('block font-medium italic', dark ? 'text-gold-300' : 'text-plum-600')}>{headingAccent}</span>
                )}
              </h2>
            )}
            {intro && <p className={cn('mt-5 max-w-xl text-base leading-relaxed', dark ? 'text-white/75' : 'text-muted', !image && 'lg:mx-auto')}>{intro}</p>}
            {!!points?.length && (
              <ul className={cn('mt-7 flex flex-wrap gap-2.5', !image && 'lg:justify-center')}>
                {points.map((p) => (
                  <li
                    key={p.id ?? p.text}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide',
                      dark ? 'bg-white/10 text-white ring-1 ring-white/15' : 'bg-white text-ink ring-1 ring-line',
                    )}
                  >
                    <Icon name={p.icon} className={cn('size-4', dark ? 'text-gold-300' : 'text-plum-600')} />
                    {p.text}
                  </li>
                ))}
              </ul>
            )}
            <div className={cn('mt-9 flex flex-wrap gap-3', !image && 'lg:justify-center')}>
              <CMSLink link={primaryCta} variant={dark ? 'gold' : 'primary'} arrow />
              <CMSLink link={secondaryCta} variant={dark ? 'outline-light' : 'outline'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
