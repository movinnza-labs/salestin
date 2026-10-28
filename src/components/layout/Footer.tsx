import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/ui/Logo'
import { isExternal, resolveHref } from '@/lib/links'
import { getGlobal } from '@/lib/content'

export async function Footer() {
  const [footer, settings] = await Promise.all([getGlobal('footer'), getGlobal('site-settings')])
  const year = new Date().getFullYear()
  const siteName = settings?.siteName ?? 'SELESTIN Professional'

  const contact = [
    settings?.address && { icon: MapPin, text: settings.address, href: null },
    settings?.phone && { icon: Phone, text: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, '')}` },
    settings?.email && { icon: Mail, text: settings.email, href: `mailto:${settings.email}` },
    settings?.website && {
      icon: Globe,
      text: settings.website,
      href: settings.website.startsWith('http') ? settings.website : `https://${settings.website}`,
    },
  ].filter(Boolean) as { icon: typeof MapPin; text: string; href: string | null }[]

  return (
    <footer className="on-dark border-t-2 border-gold-500 bg-plum-950 text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <Link href="/" aria-label={`${siteName} — home`} className="inline-block text-white">
            <Logo className="h-12 w-auto" />
          </Link>
          {footer?.about && <p className="mt-6 text-sm leading-relaxed text-white/70">{footer.about}</p>}
        </div>

        {footer?.columns?.map((col) => (
          <div key={col.id ?? col.heading}>
            <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{col.heading}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links?.map(({ link, id }) => {
                const href = resolveHref(link)
                if (!href) return null
                return (
                  <li key={id ?? link.label}>
                    {isExternal(href) ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={href} className="text-white/75 hover:text-white">
                        {link.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        {contact.length > 0 && (
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Contact</h2>
            {settings?.companyName && <p className="mt-5 text-sm font-medium">{settings.companyName}</p>}
            <ul className="mt-3 space-y-3 text-sm">
              {contact.map(({ icon: IconC, text, href }) => (
                <li key={text} className="flex gap-3 text-white/75">
                  <IconC className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden />
                  {href ? (
                    <a href={href} className="break-words hover:text-white">
                      {text}
                    </a>
                  ) : (
                    <span className="whitespace-pre-line">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings?.companyName ?? siteName}. All rights reserved.
          </p>
          {footer?.bottomNote && <p>{footer.bottomNote}</p>}
        </div>
      </div>
    </footer>
  )
}
