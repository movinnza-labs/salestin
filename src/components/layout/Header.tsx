import { Phone } from 'lucide-react'
import Link from 'next/link'

import { CMSLink } from '@/components/ui/CMSLink'
import { Logo } from '@/components/ui/Logo'
import { resolveHref } from '@/lib/links'
import { getGlobal } from '@/lib/content'

import { MobileNav } from './MobileNav'
import { NavLinks } from './NavLinks'

export async function Header() {
  const [header, settings] = await Promise.all([getGlobal('header'), getGlobal('site-settings')])

  const items = (header?.navItems ?? [])
    .map(({ link, id }) => ({ id: id ?? link.label, label: link.label, href: resolveHref(link) }))
    .filter((i): i is { id: string; label: string; href: string } => Boolean(i.href && i.label))

  const phone = settings?.phone

  return (
    <>
      {header?.announcement && (
        <div className="bg-ink text-white">
          <div className="container-x flex items-center justify-center gap-6 py-2 text-[11px] tracking-wide sm:justify-between sm:text-xs">
            <p className="text-center">{header.announcement}</p>
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hidden items-center gap-1.5 text-gold-300 hover:text-white sm:flex">
                <Phone className="size-3.5" aria-hidden />
                {phone}
              </a>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/85">
        <div className="container-x flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="shrink-0 text-ink" aria-label={`${settings?.siteName ?? 'SELESTIN Professional'} — home`}>
            <Logo className="h-10 w-auto lg:h-12" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks items={items} />
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <CMSLink link={header?.cta} variant="dark" />
            </div>
            <MobileNav items={items} cta={header?.cta ? { label: header.cta.label ?? '', href: resolveHref(header.cta) } : null} phone={phone} />
          </div>
        </div>
      </header>
    </>
  )
}
