import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import { loadBlockProducts } from '@/lib/blockProducts'
import { resolveHref } from '@/lib/links'
import type { ProductCarouselBlock } from '@/content/types'

import { ScrollRow } from './ScrollRow'

export async function ProductCarousel(block: ProductCarouselBlock) {
  const { eyebrow, heading, headingAccent, intro, cta, background } = block
  const products = await loadBlockProducts(block, 12)
  if (!products.length) return null
  const ctaHref = resolveHref(cta)

  return (
    <Section background={background} className="overflow-hidden">
      <div className="container-x grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="mt-4 font-display text-5xl leading-[0.95] font-light sm:text-6xl">
              {heading}
              {headingAccent && <em className="block font-normal text-plum-600">{headingAccent}</em>}
            </h2>
          )}
        </div>
        <div className="lg:justify-self-end lg:text-right">
          {intro && <p className="max-w-sm text-muted lg:ml-auto">{intro}</p>}
          {ctaHref && cta?.label && (
            <Link href={ctaHref} className="mt-4 inline-flex items-center gap-2 border-b border-gold-500 pb-1 text-sm font-medium">
              {cta.label}
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6">
        <ScrollRow label="Products">
          {products.map((product, i) => (
            <li key={product.id} className="w-[72vw] max-w-[320px] shrink-0 snap-start sm:w-[300px]">
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-lavender-50 ring-1 ring-line">
                  <CMSImage
                    media={product.image}
                    fill
                    sizes="320px"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-card backdrop-blur transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="font-display text-lg text-gold-600 italic tabular-nums">No. {String(i + 1).padStart(2, '0')}</span>
                  {product.line && <span className="truncate text-[11px] tracking-[0.18em] text-muted uppercase">{product.line}</span>}
                </div>
                <h3 className="mt-1 font-display text-2xl leading-tight font-normal transition-colors group-hover:text-plum-600">
                  {product.title}
                </h3>
                {product.size && <p className="mt-1 text-sm text-muted">{product.size}</p>}
              </Link>
            </li>
          ))}
        </ScrollRow>
      </div>
    </Section>
  )
}
