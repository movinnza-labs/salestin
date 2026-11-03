'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

export type NavLeaf = { id: string; label: string; href: string }
export type NavItem = NavLeaf & { children?: NavLeaf[] }

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

export function NavLinks({ items, vertical = false, onNavigate }: { items: NavItem[]; vertical?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <ul className={cn(vertical ? 'flex flex-col' : 'flex items-center gap-1')}>
      {items.map((item) => {
        const children = item.children ?? []
        const active = isActive(pathname, item.href) || children.some((c) => isActive(pathname, c.href))
        const linkClass = cn(
          'relative block font-medium transition-colors',
          vertical
            ? 'border-b border-line py-4 font-serif text-2xl'
            : 'px-3 py-2 text-sm after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform hover:text-plum-600 hover:after:scale-x-100',
          active && (vertical ? 'text-plum-600' : 'text-plum-600 after:scale-x-100'),
        )

        if (!children.length) {
          return (
            <li key={item.id}>
              <Link href={item.href} onClick={onNavigate} aria-current={active ? 'page' : undefined} className={linkClass}>
                {item.label}
              </Link>
            </li>
          )
        }

        if (vertical) {
          return (
            <li key={item.id}>
              <Link href={item.href} onClick={onNavigate} className={linkClass}>
                {item.label}
              </Link>
              <ul className="border-b border-line py-2 pl-4">
                {children.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={c.href}
                      onClick={onNavigate}
                      aria-current={isActive(pathname, c.href) ? 'page' : undefined}
                      className="block py-2 text-base text-ink-soft hover:text-plum-600 aria-[current=page]:text-plum-600"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )
        }

        // desktop dropdown: opens on hover and stays open while focus is inside
        return (
          <li key={item.id} className="group relative">
            <Link href={item.href} aria-haspopup="true" className={cn(linkClass, 'flex items-center gap-1')}>
              {item.label}
              <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
            </Link>
            <div className="invisible absolute top-full left-0 z-50 pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="min-w-60 rounded-2xl bg-white p-2 shadow-lift ring-1 ring-line">
                {children.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={c.href}
                      aria-current={isActive(pathname, c.href) ? 'page' : undefined}
                      className="block rounded-xl px-4 py-2.5 text-sm hover:bg-cream hover:text-plum-600 aria-[current=page]:text-plum-600"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
