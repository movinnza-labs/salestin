import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/cn'
import { siteUrl } from '@/lib/seo'

import { JsonLd } from './JsonLd'

type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items]

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            ...(c.href && { item: `${siteUrl}${c.href}` }),
          })),
        }}
      />
      <nav aria-label="Breadcrumb">
        <ol className={cn('flex flex-wrap items-center gap-1.5 text-xs', dark ? 'text-white/70' : 'text-muted')}>
          {all.map((c, i) => (
            <li key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className={dark ? 'hover:text-white' : 'hover:text-ink'}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className={dark ? 'text-white' : 'text-ink'}>
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
