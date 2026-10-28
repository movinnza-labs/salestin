import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { Suspense } from 'react'

import { InquiryForm } from '@/components/forms/InquiryForm'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getGlobal, getProducts } from '@/lib/content'
import type { ContactSectionBlock } from '@/content/types'

export async function ContactSection({ eyebrow, heading, headingAccent, intro, formHeading, showForm }: ContactSectionBlock) {
  const [settings, products] = await Promise.all([getGlobal('site-settings'), showForm ? getProducts() : []])

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
    <Section background="white">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} align="left" />
          {settings?.companyName && <p className="mt-10 font-serif text-xl font-semibold">{settings.companyName}</p>}
          <dl className="mt-6 space-y-6">
            {details.map(({ icon: IconC, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-gold-600 ring-1 ring-line">
                  <IconC className="size-5" aria-hidden />
                </span>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{label}</dt>
                  <dd className="mt-1 text-base break-words whitespace-pre-line">
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

        {showForm && (
          <div className="relative rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line/60 sm:p-10">
            {formHeading && <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">{formHeading}</h2>}
            <Suspense fallback={<div className="h-[560px] animate-pulse rounded-xl bg-cream" />}>
              <InquiryForm products={products.map((p) => ({ slug: p.slug, title: p.title }))} />
            </Suspense>
          </div>
        )}
      </div>
    </Section>
  )
}
