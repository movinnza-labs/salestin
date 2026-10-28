import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { PillarsBlock } from '@/content/types'

export function Pillars({ eyebrow, heading, headingAccent, intro, items, footnote, background }: PillarsBlock) {
  if (!items?.length) return null
  return (
    <Section background={background}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <li
              key={item.id ?? item.title}
              className="reveal flex flex-col items-center rounded-2xl bg-white p-7 text-center text-ink shadow-card ring-1 ring-line/60"
            >
              <span className="grid size-14 place-items-center rounded-full border border-gold-300 text-gold-600">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-sans text-sm font-semibold tracking-[0.14em] uppercase">{item.title}</h3>
              {item.text && <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>}
            </li>
          ))}
        </ul>
        {footnote && <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-lg italic">{footnote}</p>}
      </div>
    </Section>
  )
}
