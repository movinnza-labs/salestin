import { MessageSquare, Phone } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductCard } from '@/components/product/ProductCard'
import { type GalleryItem, ProductGallery } from '@/components/product/ProductGallery'
import { CMSImage } from '@/components/ui/CMSImage'
import { buttonClass } from '@/components/ui/CMSLink'
import { Icon } from '@/components/ui/Icon'
import { RichText } from '@/components/ui/RichText'
import { asMedia } from '@/lib/media'
import { getGlobal, getProductBySlug, getProducts } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import type { ProductCategory } from '@/content/types'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => getProducts().map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return buildMetadata({
    meta: product.meta,
    fallbackTitle: product.title,
    fallbackDescription: product.summary,
    fallbackImage: product.image,
    path: `/products/${slug}`,
  })
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const category = typeof product.category === 'object' ? (product.category as ProductCategory) : null
  const [settings, related] = await Promise.all([
    getGlobal('site-settings'),
    category ? getProducts({ categoryId: category.id, excludeId: product.id, limit: 4 }) : [],
  ])

  const gallery: GalleryItem[] = [
    { media: product.image, caption: product.title, id: 'main' },
    ...(product.gallery ?? []).map((g, i) => ({ media: g.image, caption: g.caption, id: g.id ?? String(i) })),
  ]
    .filter((g) => asMedia(g.media))
    .map((g, i) => ({
      id: g.id,
      label: g.caption || asMedia(g.media)?.alt || product.title,
      image: (
        <CMSImage
          media={g.media}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          // brochure pages are informational: show them whole
          className={i === 0 ? undefined : 'object-contain!'}
        />
      ),
      thumb: <CMSImage media={g.media} fill sizes="96px" />,
    }))

  return (
    <>
      <section className="pt-8 pb-16 sm:pb-20">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: 'Products', href: '/products' },
              ...(category ? [{ label: category.title, href: `/collections/${category.slug}` }] : []),
              { label: product.title },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery items={gallery} />

            <div className="lg:py-6">
              {product.line && <p className="eyebrow">{product.line}</p>}
              <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{product.title}</h1>
              {product.tagline && <p className="mt-3 font-serif text-xl text-plum-600 italic">{product.tagline}</p>}
              {product.size && (
                <p className="mt-4 inline-flex rounded-full bg-cream px-4 py-1.5 text-sm font-medium">{product.size}</p>
              )}
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{product.summary}</p>

              {!!product.badges?.length && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {product.badges.map((b) => (
                    <li key={b.id ?? b.text} className="rounded-full border border-lavender-300 bg-lavender-50 px-3.5 py-1.5 text-xs font-medium text-plum-700">
                      {b.text}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/contact?product=${product.slug}`} className={buttonClass('primary')}>
                  <MessageSquare className="size-4" aria-hidden />
                  Enquire about this product
                </Link>
                {settings?.phone && (
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className={buttonClass('outline')}>
                    <Phone className="size-4" aria-hidden />
                    {settings.phone}
                  </a>
                )}
              </div>

              <RichText data={product.description} className="mt-10 border-t border-line pt-8" />
            </div>
          </div>
        </div>
      </section>

      {!!product.highlights?.length && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="container-x">
            <h2 className="text-center text-3xl font-semibold sm:text-4xl">{product.highlightsHeading || 'Benefits'}</h2>
            <span aria-hidden className="mx-auto mt-5 block h-px w-14 bg-gold-500" />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {product.highlights.map((h) => (
                <li key={h.id ?? h.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-card ring-1 ring-line/60">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold-300 text-gold-600">
                    <Icon name={h.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold">{h.title}</h3>
                    {h.text && <p className="mt-1 text-sm leading-relaxed text-muted">{h.text}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(!!product.keyIngredients?.length || product.fullIngredients) && (
        <section className="py-16 sm:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {!!product.keyIngredients?.length && (
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">{product.ingredientsHeading || 'Key ingredients'}</h2>
                <span aria-hidden className="mt-5 block h-px w-14 bg-gold-500" />
                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  {product.keyIngredients.map((k) => (
                    <div key={k.id ?? k.name} className="border-l-2 border-gold-300 pl-5">
                      <dt className="font-serif text-lg font-semibold">{k.name}</dt>
                      {k.text && <dd className="mt-1 text-sm leading-relaxed text-muted">{k.text}</dd>}
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {product.fullIngredients && (
              <div className="self-start rounded-3xl bg-lavender-50 p-7 ring-1 ring-lavender-200">
                <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-plum-700 uppercase">Full ingredients</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.fullIngredients}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-lavender-50/60 py-16 sm:py-20">
          <div className="container-x">
            <h2 className="text-3xl font-semibold sm:text-4xl">More from {category?.title}</h2>
            <span aria-hidden className="mt-5 block h-px w-14 bg-gold-500" />
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
