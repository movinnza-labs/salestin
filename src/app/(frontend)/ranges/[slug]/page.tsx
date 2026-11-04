import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductCard } from '@/components/product/ProductCard'
import { CMSImage } from '@/components/ui/CMSImage'
import { buttonClass } from '@/components/ui/CMSLink'
import { RichText } from '@/components/ui/RichText'
import { audienceLabel } from '@/fields/productOptions'
import { getProducts, getRangeBySlug, getRanges, safeParams } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

// publishing refreshes pages at once (src/hooks/revalidate.ts); this is only a daily safety net
export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => safeParams(async () => (await getRanges()).map((r) => ({ slug: r.slug })))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const range = await getRangeBySlug(slug)
  if (!range) return {}
  return buildMetadata({
    meta: range.meta,
    fallbackTitle: range.title,
    fallbackDescription: range.summary,
    fallbackImage: range.image,
    path: `/ranges/${slug}`,
  })
}

export default async function RangePage({ params }: Props) {
  const { slug } = await params
  const range = await getRangeBySlug(slug)
  if (!range) notFound()

  const products = await getProducts({ rangeId: range.id })
  const salonOnly = range.audience?.length === 1 && range.audience[0] === 'salon'

  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-plum-950 text-white">
        <CMSImage media={range.image} fill priority sizes="100vw" className="-z-10 opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-plum-950 via-plum-950/80 to-plum-950/20" />
        <div className="container-x py-16 sm:py-24 lg:py-28">
          <Breadcrumbs items={[{ label: 'Shop', href: '/shop' }, { label: range.title }]} dark />
          {range.tagline && <p className="eyebrow mt-8">{range.tagline}</p>}
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl lg:text-6xl">{range.title}</h1>
          {range.summary && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{range.summary}</p>}
          {!!range.audience?.length && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Who it is for">
              {range.audience.map((a) => (
                <li key={a} className="rounded-full border border-white/30 px-3.5 py-1.5 text-xs font-medium">
                  {audienceLabel(a)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {range.story && (
        <section className="py-14 sm:py-20">
          <div className="container-x max-w-3xl">
            <p className="eyebrow">The range story</p>
            <RichText data={range.story} className="mt-4 text-lg" />
          </div>
        </section>
      )}

      <section className="bg-lavender-50/60 py-14 sm:py-20">
        <div className="container-x">
          {products.length ? (
            <>
              <h2 className="text-3xl font-semibold sm:text-4xl">The {range.title} range</h2>
              <span aria-hidden className="mt-5 block h-px w-14 bg-gold-500" />
              <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="mx-auto max-w-lg rounded-3xl bg-white p-10 text-center shadow-card">
              <h2 className="text-2xl font-semibold">Enquire about {range.title}</h2>
              <p className="mt-3 text-muted">For information about this range, please get in touch with our team.</p>
              <Link href="/contact" className={buttonClass('dark', 'mt-6')}>
                Contact us
              </Link>
            </div>
          )}

          {salonOnly && products.length > 0 && (
            <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-plum-950 p-8 text-white sm:flex-row sm:items-center">
              <p className="font-serif text-xl">
                {range.title} is for professional salons. Interested in stocking it?
              </p>
              <Link href="/salon-partner" className={buttonClass('gold', 'shrink-0')}>
                Become a salon partner
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
