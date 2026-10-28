import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductCard } from '@/components/product/ProductCard'
import { CMSImage } from '@/components/ui/CMSImage'
import { buttonClass } from '@/components/ui/CMSLink'
import { getCategories, getCategoryBySlug, getProducts } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => getCategories().map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return {}
  return buildMetadata({
    meta: category.meta,
    fallbackTitle: category.title,
    fallbackDescription: category.description,
    fallbackImage: category.image,
    path: `/collections/${slug}`,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const products = await getProducts({ categoryId: category.id })

  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-plum-950 text-white">
        <CMSImage media={category.image} fill priority sizes="100vw" className="-z-10 opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-plum-950 via-plum-950/80 to-plum-950/20" />
        <div className="container-x py-16 sm:py-24 lg:py-28">
          <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: category.title }]} dark />
          {category.tagline && <p className="eyebrow mt-8">{category.tagline}</p>}
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl lg:text-6xl">{category.title}</h1>
          {category.description && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{category.description}</p>}
          {!!category.highlights?.length && (
            <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              {category.highlights.map((h) => (
                <li key={h.id ?? h.text} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden />
                  {h.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          {products.length ? (
            <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} headingLevel="h2" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-lg rounded-3xl bg-cream p-10 text-center">
              <h2 className="text-2xl font-semibold">Enquire about {category.title}</h2>
              <p className="mt-3 text-muted">For information about this range, please get in touch with our team.</p>
              <Link href="/contact" className={buttonClass('dark', 'mt-6')}>
                Contact us
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
