import Link from 'next/link'

import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import type { Product, ProductStepsBlock } from '@/content/types'

export function ProductSteps({
  eyebrow,
  heading,
  headingAccent,
  intro,
  products,
  image,
  background,
}: ProductStepsBlock) {
  const list = products.filter((p): p is Product => typeof p === 'object')
  if (!list.length) return null

  return (
    <Section background={background}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} />

        <div className={cn('mt-14 grid items-center gap-12', image && 'lg:grid-cols-[1fr_0.9fr]')}>
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {list.map((product, i) => (
              <li key={product.id} className="reveal group relative border-t border-line pt-6">
                <span className="font-serif text-5xl leading-none font-medium text-lavender-300 transition-colors group-hover:text-plum-500 in-[.on-dark]:text-plum-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-xl font-semibold uppercase">
                  <Link
                    href={`/products/${product.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] hover:text-plum-600"
                  >
                    {product.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted in-[.on-dark]:text-white/70">
                  {product.summary}
                </p>
              </li>
            ))}
          </ol>

          {image && (
            <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-lavender-100">
              <CMSImage media={image} fill sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
