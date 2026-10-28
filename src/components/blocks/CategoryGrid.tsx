import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CMSImage } from '@/components/ui/CMSImage'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getCategories } from '@/lib/content'
import type { CategoryGridBlock, ProductCategory } from '@/content/types'

export async function CategoryGrid({ eyebrow, heading, headingAccent, intro, categories, style, background }: CategoryGridBlock) {
  const selected = (categories ?? []).filter((c): c is ProductCategory => typeof c === 'object')
  const list = selected.length ? selected : await getCategories()
  if (!list.length) return null
  if (style === 'arches') return <CategoryArches {...{ eyebrow, heading, headingAccent, intro, background, list }} />

  return (
    <Section background={background}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} accent={headingAccent} intro={intro} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((cat) => (
            <li key={cat.id} className="reveal">
              <Link
                href={`/collections/${cat.slug}`}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-white sm:aspect-[3/4]"
              >
                <CMSImage
                  media={cat.image}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                {cat.tagline && <p className="text-[11px] tracking-[0.2em] text-gold-300 uppercase">{cat.tagline}</p>}
                <h3 className="mt-2 text-3xl font-semibold">{cat.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-gold-300">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

type ArchesProps = Pick<CategoryGridBlock, 'eyebrow' | 'heading' | 'headingAccent' | 'intro' | 'background'> & {
  list: ProductCategory[]
}

/** Editorial variant: tall arch-framed images with large display titles. */
function CategoryArches({ eyebrow, heading, headingAccent, intro, background, list }: ArchesProps) {
  return (
    <Section background={background}>
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="mt-4 font-display text-5xl leading-[0.95] font-light sm:text-6xl">
              {heading}
              {headingAccent && <em className="block font-normal text-plum-600">{headingAccent}</em>}
            </h2>
          )}
          {intro && <p className="mt-6 text-muted">{intro}</p>}
        </div>
        <ul className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12">
          {list.map((cat, i) => (
            <li key={cat.id} className={i % 3 === 1 ? 'lg:translate-y-14' : undefined}>
              <Link href={`/collections/${cat.slug}`} className="group block text-center">
                <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-t-full bg-cream">
                  <CMSImage
                    media={cat.image}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 90vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-t-full ring-1 ring-inset ring-white/40" />
                </div>
                <p className="mt-6 font-display text-sm text-gold-600 italic">0{i + 1}</p>
                <h3 className="mt-1 font-display text-4xl font-light transition-colors group-hover:text-plum-600">{cat.title}</h3>
                {cat.tagline && <p className="mt-2 text-xs tracking-[0.2em] text-muted uppercase">{cat.tagline}</p>}
                <span className="mt-5 inline-flex items-center gap-2 border-b border-gold-500 pb-1 text-sm font-medium">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
