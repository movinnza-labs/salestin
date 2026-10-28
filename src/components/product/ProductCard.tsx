import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { buttonClass } from '@/components/ui/CMSLink'
import { CMSImage } from '@/components/ui/CMSImage'
import type { Product } from '@/content/types'

export function ProductCard({ product, headingLevel = 'h3' }: { product: Product; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  const href = `/products/${product.slug}`

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-line/70 transition-shadow duration-300 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-lavender-50">
        <CMSImage
          media={product.image}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.line && (
          <span className="absolute top-3 left-3 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-medium tracking-wider text-white uppercase backdrop-blur">
            {product.line}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Heading className="font-sans text-[15px] leading-snug font-medium text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.title}
          </Link>
        </Heading>
        {product.size && <p className="mt-1 text-xs text-muted">{product.size}</p>}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{product.summary}</p>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={`/contact?product=${product.slug}`}
            className={buttonClass('primary', 'relative z-10 flex-1 px-4 py-2.5 text-xs')}
          >
            Enquire
          </Link>
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors group-hover:border-plum-600 group-hover:bg-plum-600 group-hover:text-white"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  )
}
