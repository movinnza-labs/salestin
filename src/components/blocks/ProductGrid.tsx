import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { ProductCard } from '@/components/product/ProductCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { loadBlockProducts } from '@/lib/blockProducts'
import { resolveHref } from '@/lib/links'
import type { ProductGridBlock } from '@/content/types'

export async function ProductGrid(block: ProductGridBlock) {
  const { eyebrow, heading, headingAccent, intro, cta, background } = block

  const list = await loadBlockProducts(block, 8)
  if (!list.length) return null

  const ctaHref = resolveHref(cta)

  return (
    <Section background={background}>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} align="left" />
          {ctaHref && cta?.label && (
            <Link href={ctaHref} className="group inline-flex items-center gap-2 border-b border-gold-500 pb-1 text-sm font-medium">
              {cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
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
