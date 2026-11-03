import Link from 'next/link'

import { ProductCard } from '@/components/product/ProductCard'
import { ShopFilters } from '@/components/product/ShopFilters'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { audienceOptions, concernOptions } from '@/fields/productOptions'
import { getCategories, getProducts, getRanges } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim().slice(0, 80) ?? ''

export async function generateMetadata({ searchParams }: Props) {
  const filtered = Object.values(await searchParams).some(Boolean)
  const metadata = await buildMetadata({
    fallbackTitle: 'Shop',
    fallbackDescription:
      'Browse SELESTIN Professional hair care, skin care and premium wax by range, concern and salon or home care.',
    path: '/shop',
  })
  // filtered views share the canonical /shop and stay out of search results
  return filtered ? { ...metadata, robots: { index: false, follow: true } } : metadata
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams
  const values = {
    q: one(params.q),
    range: one(params.range),
    category: one(params.category),
    concern: one(params.concern),
    audience: one(params.audience),
  }

  const [ranges, categories] = await Promise.all([getRanges(), getCategories()])
  const range = ranges.find((r) => r.slug === values.range)
  const category = categories.find((c) => c.slug === values.category)
  const concern = concernOptions.find((c) => c.value === values.concern)
  const audience = audienceOptions.find((a) => a.value === values.audience)

  const products = await getProducts({
    rangeId: range?.id,
    categoryId: category?.id,
    concern: concern?.value,
    audience: audience?.value,
    search: values.q || undefined,
  })

  return (
    <>
      <section className="bg-cream">
        <div className="container-x py-14 sm:py-16">
          <SectionHeading as="h1" eyebrow="Our range" heading="Shop" intro="Professional hair care, skin care and premium wax." />
          <div className="mx-auto mt-10 max-w-5xl">
            <ShopFilters
              values={values}
              ranges={ranges.map((r) => ({ value: r.slug, label: r.title }))}
              categories={categories.map((c) => ({ value: c.slug, label: c.title }))}
              concerns={concernOptions.map((c) => ({ value: c.value, label: c.label }))}
              audiences={audienceOptions.map((a) => ({ value: a.value, label: a.label }))}
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-x">
          <p className="text-sm text-muted" aria-live="polite">
            {products.length} {products.length === 1 ? 'product' : 'products'}
            {range && (
              <>
                {' '}
                in{' '}
                <Link href={`/ranges/${range.slug}`} className="font-medium text-plum-600 hover:underline">
                  {range.title}
                </Link>
              </>
            )}
          </p>

          {products.length ? (
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} headingLevel="h2" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto mt-6 max-w-lg rounded-3xl bg-cream p-10 text-center">
              <h2 className="text-2xl font-semibold">No products match these filters</h2>
              <p className="mt-3 text-muted">Try fewer filters, or ask us directly — we are happy to help.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/shop" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-plum-900">
                  Show all products
                </Link>
                <Link href="/contact" className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-ink">
                  Contact us
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
