'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

export type NavItem = { id: string; label: string; href: string }

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

export function NavLinks({ items, vertical = false, onNavigate }: { items: NavItem[]; vertical?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <ul className={cn(vertical ? 'flex flex-col' : 'flex items-center gap-1')}>
      {items.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative block font-medium transition-colors',
                vertical
                  ? 'border-b border-line py-4 font-serif text-2xl'
                  : 'px-3 py-2 text-sm after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform hover:text-plum-600 hover:after:scale-x-100',
                active && (vertical ? 'text-plum-600' : 'text-plum-600 after:scale-x-100'),
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
