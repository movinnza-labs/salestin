import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { IngredientSpotlightBlock } from '@/content/types'

export function IngredientSpotlight({ eyebrow, heading, headingAccent, intro, items, image, background }: IngredientSpotlightBlock) {
  return (
    <Section background={background}>
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className={cn(image ? 'lg:col-span-7' : 'lg:col-span-12')}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 className="mt-4 font-display text-5xl leading-[0.95] font-light sm:text-6xl">
                {heading}
                {headingAccent && <em className="block font-normal text-plum-600">{headingAccent}</em>}
              </h2>
            )}
            {intro && <p className="mt-6 max-w-lg text-muted">{intro}</p>}

            <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {items.map((item, i) => (
                <div key={item.id ?? item.name} className="reveal relative pl-14">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-gold-300 font-display text-base text-gold-600 italic"
                  >
                    {i + 1}
                  </span>
                  <dt>
                    <span className="block font-display text-3xl leading-none font-normal">{item.name}</span>
                    {item.foundIn && <span className="mt-2 block text-[11px] tracking-[0.18em] text-plum-600 uppercase">{item.foundIn}</span>}
                  </dt>
                  {item.text && <dd className="mt-3 text-sm leading-relaxed text-ink-soft">{item.text}</dd>}
                </div>
              ))}
            </dl>
          </div>

          {image && (
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-full ring-1 ring-gold-300 ring-offset-8 ring-offset-lavender-50">
                <CMSImage media={image} fill sizes="(min-width: 1024px) 420px, 90vw" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
