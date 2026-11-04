import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { ProductCard } from '@/components/product/ProductCard'
import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { loadBlockProducts } from '@/lib/blockProducts'
import { resolveHref } from '@/lib/links'
import { cn } from '@/lib/cn'
import type { Product, ProductGridBlock } from '@/payload-types'

import { studioEyebrow, studioHeading } from './studio'

export async function ProductGrid(block: ProductGridBlock) {
  const { eyebrow, heading, headingAccent, intro, cta, background } = block

  const list = await loadBlockProducts(block, 8)
  if (!list.length) return null

  const ctaHref = resolveHref(cta)
  if (block.cardStyle === 'minimal') return <MinimalProductGrid {...{ block, list, ctaHref }} />

  return (
    <Section background={background}>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            accent={headingAccent}
            intro={intro}
            align="left"
          />
          {ctaHref && cta?.label && (
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 border-b border-gold-500 pb-1 text-sm font-medium"
            >
              {cta.label}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          )}
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {list.map((product) => (
            <li key={product.id} className="reveal">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

const rangeTitle = (p: Product) => (typeof p.range === 'object' ? p.range?.title : null)

/** Studio variant: bordered image cards with range and size, no buttons. */
function MinimalProductGrid({
  block,
  list,
  ctaHref,
}: {
  block: ProductGridBlock
  list: Product[]
  ctaHref: string | null
}) {
  const { eyebrow, heading, headingAccent, intro, cta, background } = block
  return (
    <Section background={background}>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            {eyebrow && <p className={cn(studioEyebrow, 'text-gold-600')}>{eyebrow}</p>}
            {heading && (
              <h2 className={cn(studioHeading, 'mt-4 text-4xl sm:text-5xl')}>
                {heading} {headingAccent}
              </h2>
            )}
            {intro && <p className="mt-4 max-w-xl text-muted">{intro}</p>}
          </div>
          {ctaHref && cta?.label && (
            <Link
              href={ctaHref}
              className="group inline-flex min-h-11 items-center gap-2 font-semibold text-gold-600"
            >
              {cta.label}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          )}
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product) => (
            <li key={product.id}>
              <article className="group relative overflow-hidden rounded-xl border border-gold-500/60 bg-lavender-50">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <CMSImage
                    media={product.image}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                    {[rangeTitle(product), product.size].filter(Boolean).join(' · ')}
                  </p>
                  <h3 className="mt-2 font-modern text-lg font-semibold">
                    <Link
                      href={`/products/${product.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {product.title}
                    </Link>
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
