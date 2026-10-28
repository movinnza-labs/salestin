'use client'

import { Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { buttonClass } from '@/components/ui/CMSLink'

import { type NavItem, NavLinks } from './NavLinks'

type Props = {
  items: NavItem[]
  cta: { label: string; href: string | null } | null
  phone?: string | null
}

export function MobileNav({ items, cta, phone }: Props) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const trigger = triggerRef.current
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-11 place-items-center rounded-full border border-line text-ink hover:bg-cream"
      >
        <Menu className="size-5" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm animate-[fade-up_0.3s_ease-out] flex-col bg-white px-6 pt-5 pb-8 shadow-2xl">
            <div className="flex justify-end">
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full border border-line hover:bg-cream"
              >
                <X className="size-5" aria-hidden />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-4 flex-1 overflow-y-auto">
              <NavLinks items={items} vertical onNavigate={() => setOpen(false)} />
            </nav>
            <div className="space-y-3 pt-6">
              {cta?.href && cta.label && (
                <Link href={cta.href} className={buttonClass('dark', 'w-full')} onClick={() => setOpen(false)}>
                  {cta.label}
                </Link>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className={buttonClass('outline', 'w-full')}>
                  <Phone className="size-4" aria-hidden />
                  {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
