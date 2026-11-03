'use client'

import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FormEvent, useRef } from 'react'

import { cn } from '@/lib/cn'

type Option = { value: string; label: string }

type Props = {
  values: { q: string; range: string; category: string; concern: string; audience: string }
  ranges: Option[]
  categories: Option[]
  concerns: Option[]
  audiences: Option[]
}

const selectClass =
  'block w-full rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink focus:border-plum-600 focus:ring-2 focus:ring-plum-600/20 focus:outline-none'

/** A plain GET form (works without JavaScript); with it, filters apply as soon as a select changes. */
export function ShopFilters({ values, ranges, categories, concerns, audiences }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const submit = () => formRef.current?.requestSubmit()

  // with JavaScript, leave empty filters out of the URL: /shop?range=x instead of /shop?q=&range=x&…
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    for (const [key, value] of new FormData(e.currentTarget)) {
      if (typeof value === 'string' && value.trim()) params.set(key, value.trim())
    }
    router.push(params.size ? `/shop?${params}` : '/shop', { scroll: false })
  }
  const active = Object.values(values).some(Boolean)

  const select = (name: keyof Props['values'], label: string, options: Option[]) => (
    <div>
      <label
        htmlFor={`f-${name}`}
        className="mb-1.5 block text-xs font-semibold tracking-[0.16em] text-muted uppercase"
      >
        {label}
      </label>
      <select
        id={`f-${name}`}
        name={name}
        defaultValue={values[name]}
        onChange={submit}
        className={selectClass}
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <form
      // remount when the URL changes so the selects show the current filters
      key={JSON.stringify(values)}
      ref={formRef}
      action="/shop"
      method="get"
      onSubmit={onSubmit}
      role="search"
      aria-label="Filter products"
      className="space-y-5"
    >
      <div className="relative">
        <label htmlFor="f-q" className="sr-only">
          Search products
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id="f-q"
          name="q"
          type="search"
          defaultValue={values.q}
          placeholder="Search products, e.g. keratin, serum, wax"
          className={cn(selectClass, 'py-3 pr-28 pl-11')}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white hover:bg-plum-900"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {select('range', 'Range', ranges)}
        {select('category', 'Category', categories)}
        {select('concern', 'Hair / skin concern', concerns)}
        {select('audience', 'For', audiences)}
      </div>

      <noscript>
        <button type="submit" className="rounded-full bg-ink px-5 py-2 text-sm text-white">
          Apply filters
        </button>
      </noscript>

      {active && (
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-plum-600 hover:underline"
        >
          <X className="size-4" aria-hidden />
          Clear all filters
        </Link>
      )}
    </form>
  )
}
