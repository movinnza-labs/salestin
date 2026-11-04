'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { ProductCard, type ProductCardData } from './ProductCard'
import { emptyFilters, ShopFilters, type ShopFilterValues } from './ShopFilters'

type Option = { value: string; label: string }

export type ShopItem = {
  card: ProductCardData
  range: string
  category: string
  audience: string[]
  concerns: string[]
  /** lower-case title, summary, tagline and range, for the search box */
  text: string
}

type Props = {
  items: ShopItem[]
  ranges: Option[]
  categories: Option[]
  concerns: Option[]
  audiences: Option[]
}

const FILTER_KEYS = Object.keys(emptyFilters) as (keyof ShopFilterValues)[]

const matches = (item: ShopItem, f: ShopFilterValues) =>
  (!f.range || item.range === f.range) &&
  (!f.category || item.category === f.category) &&
  (!f.concern || item.concerns.includes(f.concern)) &&
  (!f.audience || item.audience.includes(f.audience)) &&
  f.q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => item.text.includes(word))

/**
 * The shop page is static (cached), so filtering happens here in the browser:
 * all products are in the page, and the filters live in the URL (/shop?range=…)
 * so filtered views can still be shared and bookmarked.
 */
export function ShopBrowser({ values, ...props }: Props & { values: ShopFilterValues }) {
  const { items, ranges } = props
  const results = useMemo(() => items.filter((item) => matches(item, values)), [items, values])
  const range = ranges.find((r) => r.value === values.range)

  const onChange = (next: ShopFilterValues) => {
    const params = new URLSearchParams()
    for (const key of FILTER_KEYS) if (next[key]) params.set(key, next[key])
    // Next.js keeps useSearchParams in sync with history.pushState, without a server request
    window.history.pushState(null, '', params.size ? `/shop?${params}` : '/shop')
  }

  return (
    <>
      <section className="bg-cream">
        <div className="container-x py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Our range</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Shop</h1>
            <span aria-hidden className="mx-auto mt-5 block h-px w-14 bg-gold-500" />
            <p className="mt-5 text-muted">Professional hair care, skin care and premium wax.</p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            {/* key: remount (and reset the search box) when the URL changes from outside, e.g. Back */}
            <ShopFilters key={JSON.stringify(values)} values={values} onChange={onChange} {...props} />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-x">
          <p className="text-sm text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? 'product' : 'products'}
            {range && (
              <>
                {' '}
                in{' '}
                <Link href={`/ranges/${range.value}`} className="font-medium text-plum-600 hover:underline">
                  {range.label}
                </Link>
              </>
            )}
          </p>

          {results.length ? (
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              {results.map((item) => (
                <li key={item.card.slug}>
                  <ProductCard product={item.card} headingLevel="h2" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto mt-6 max-w-lg rounded-3xl bg-cream p-10 text-center">
              <h2 className="text-2xl font-semibold">No products match these filters</h2>
              <p className="mt-3 text-muted">Try fewer filters, or ask us directly — we are happy to help.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onChange(emptyFilters)}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-plum-900"
                >
                  Show all products
                </button>
                <Link
                  href="/contact"
                  className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium hover:border-ink"
                >
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

/** Reads the filters from the URL. Rendered inside <Suspense>, with the unfiltered list as fallback. */
export function ShopBrowserFromUrl(props: Props) {
  const params = useSearchParams()
  const values = Object.fromEntries(
    FILTER_KEYS.map((key) => [key, (params.get(key) ?? '').trim().slice(0, 80)]),
  ) as ShopFilterValues
  return <ShopBrowser {...props} values={values} />
}
