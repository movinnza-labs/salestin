'use client'

import { Search, X } from 'lucide-react'
import { type FormEvent, useState } from 'react'

import { cn } from '@/lib/cn'

type Option = { value: string; label: string }

export type ShopFilterValues = { q: string; range: string; category: string; concern: string; audience: string }

export const emptyFilters: ShopFilterValues = { q: '', range: '', category: '', concern: '', audience: '' }

type Props = {
  values: ShopFilterValues
  onChange: (values: ShopFilterValues) => void
  ranges: Option[]
  categories: Option[]
  concerns: Option[]
  audiences: Option[]
}

const selectClass =
  'block w-full rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink focus:border-plum-600 focus:ring-2 focus:ring-plum-600/20 focus:outline-none'

/** Search box and filter selects; selects apply at once, the search on submit. */
export function ShopFilters({ values, onChange, ranges, categories, concerns, audiences }: Props) {
  const [query, setQuery] = useState(values.q)
  const active = Object.values(values).some(Boolean)

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onChange({ ...values, q: query.trim() })
  }

  const select = (name: Exclude<keyof ShopFilterValues, 'q'>, label: string, options: Option[]) => (
    <div>
      <label
        htmlFor={`f-${name}`}
        className="mb-1.5 block text-xs font-semibold tracking-[0.16em] text-muted uppercase"
      >
        {label}
      </label>
      <select
        id={`f-${name}`}
        value={values[name]}
        onChange={(e) => onChange({ ...values, [name]: e.target.value })}
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
    <div className="space-y-5">
      <form role="search" aria-label="Search products" onSubmit={onSearch} className="relative">
        <label htmlFor="f-q" className="sr-only">
          Search products
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id="f-q"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            // clearing the box (✕ or backspace) shows everything again
            if (!e.target.value && values.q) onChange({ ...values, q: '' })
          }}
          placeholder="Search products, e.g. keratin, serum, wax"
          className={cn(selectClass, 'py-3 pr-28 pl-11')}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white hover:bg-plum-900"
        >
          Search
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {select('range', 'Range', ranges)}
        {select('category', 'Category', categories)}
        {select('concern', 'Hair / skin concern', concerns)}
        {select('audience', 'For', audiences)}
      </div>

      {active && (
        <button
          type="button"
          onClick={() => {
            setQuery('')
            onChange(emptyFilters)
          }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-plum-600 hover:underline"
        >
          <X className="size-4" aria-hidden />
          Clear all filters
        </button>
      )}
    </div>
  )
}
