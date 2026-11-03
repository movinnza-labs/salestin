import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Suspense } from 'react'

import { InquiryForm } from '@/components/forms/InquiryForm'
import { PartnerForm } from '@/components/forms/PartnerForm'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getGlobal, getProducts } from '@/lib/payload'
import { whatsappHref } from '@/lib/whatsapp'
import type { ContactSectionBlock } from '@/payload-types'

/** Google Maps embed: the URL from Site settings, or a search for the address. */
const mapSrc = (mapUrl?: string | null, address?: string | null) => {
  if (mapUrl?.startsWith('https://www.google.com/maps/embed')) return mapUrl
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`
  return null
}

export async function ContactSection({
  eyebrow,
  heading,
  headingAccent,
  intro,
  formHeading,
  showForm,
  formType,
  showContactDetails,
  showMap,
}: ContactSectionBlock) {
  const partner = formType === 'partner'
  const [settings, products] = await Promise.all([
    getGlobal('site-settings'),
    showForm && !partner ? getProducts() : [],
  ])

  const whatsapp = whatsappHref(settings?.whatsapp, 'Hello SELESTIN Professional, I have a question.')
  const details = showContactDetails === false
    ? []
    : ([
        settings?.address && { icon: MapPin, label: 'Office', value: settings.address },
        settings?.phone && { icon: Phone, label: 'Telephone', value: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, '')}` },
        whatsapp && settings?.whatsapp && { icon: MessageCircle, label: 'WhatsApp', value: settings.whatsapp, href: whatsapp, external: true },
        settings?.email && { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
        settings?.website && {
          icon: Globe,
          label: 'Web',
          value: settings.website,
          href: settings.website.startsWith('http') ? settings.website : `https://${settings.website}`,
        },
      ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string; href?: string; external?: boolean }[])
  const map = showMap ? mapSrc(settings?.mapUrl, settings?.address) : null

  return (
    <Section background="white">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} align="left" />
          {details.length > 0 && settings?.companyName && (
            <p className="mt-10 font-serif text-xl font-semibold">{settings.companyName}</p>
          )}
          <dl className="mt-6 space-y-6">
            {details.map(({ icon: IconC, label, value, href, external }) => (
              <div key={label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-gold-600 ring-1 ring-line">
                  <IconC className="size-5" aria-hidden />
                </span>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{label}</dt>
                  <dd className="mt-1 text-base break-words whitespace-pre-line">
                    {href ? (
                      <a
                        href={href}
                        className="hover:text-plum-600 hover:underline"
                        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                      >
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
          {map && (
            <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-line">
              <iframe
                src={map}
                title={`Map: ${settings?.companyName ?? 'our office'}`}
                className="block aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {showForm && (
          <div className="relative rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line/60 sm:p-10">
            {formHeading && <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">{formHeading}</h2>}
            {partner ? (
              <PartnerForm />
            ) : (
              <Suspense fallback={<div className="h-[560px] animate-pulse rounded-xl bg-cream" />}>
                <InquiryForm products={products.map((p) => ({ slug: p.slug, title: p.title }))} />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}
