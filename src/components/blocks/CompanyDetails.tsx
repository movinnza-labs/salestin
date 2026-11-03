import { Globe, Mail, MapPin, Phone } from 'lucide-react'

import { RichText } from '@/components/ui/RichText'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getGlobal } from '@/lib/payload'
import type { CompanyDetailsBlock } from '@/payload-types'

/** Intro text plus the company's legal name and contact details from Site settings. */
export async function CompanyDetails({ eyebrow, heading, headingAccent, intro, body, background }: CompanyDetailsBlock) {
  const settings = await getGlobal('site-settings')

  const details = [
    settings?.address && { icon: MapPin, label: 'Registered office', value: settings.address },
    settings?.phone && { icon: Phone, label: 'Telephone', value: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, '')}` },
    settings?.email && { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    settings?.website && {
      icon: Globe,
      label: 'Web',
      value: settings.website,
      href: settings.website.startsWith('http') ? settings.website : `https://${settings.website}`,
    },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string; href?: string }[]

  return (
    <Section background={background}>
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} align="left" />
          <RichText data={body} className="mt-6" />
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-line/60 sm:p-9">
          {settings?.companyName && <p className="font-serif text-xl font-semibold">{settings.companyName}</p>}
          <dl className="mt-6 space-y-5">
            {details.map(({ icon: IconC, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <IconC className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden />
                <div>
                  <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{label}</dt>
                  <dd className="mt-1 break-words whitespace-pre-line">
                    {href ? (
                      <a href={href} className="hover:text-plum-600 hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
