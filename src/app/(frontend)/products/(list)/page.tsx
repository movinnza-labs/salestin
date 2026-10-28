import Link from 'next/link'

import { ProductCard } from '@/components/product/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getCategories, getProducts } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const generateMetadata = () =>
  buildMetadata({
    fallbackTitle: 'Products',
    fallbackDescription: 'Professional hair care, skin care and waxing products from SELESTIN Professional.',
    path: '/products',
  })

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])

  const groups = categories
    .map((cat) => ({ cat, items: products.filter((p) => (typeof p.category === 'object' ? p.category.id : p.category) === cat.id) }))
    .filter((g) => g.items.length)

  return (
    <>
      <section className="bg-cream">
        <div className="container-x py-16 sm:py-20">
          <SectionHeading as="h1" eyebrow="Our range" heading="Products" />
          {groups.length > 1 && (
            <nav aria-label="Product categories" className="mt-8 flex flex-wrap justify-center gap-2">
              {groups.map(({ cat }) => (
                <a
                  key={cat.id}
                  href={`#${cat.slug}`}
                  className="rounded-full border border-ink/15 bg-white px-5 py-2 text-sm font-medium hover:border-plum-600 hover:text-plum-600"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>

      {groups.map(({ cat, items }) => (
        <section key={cat.id} id={cat.slug} className="py-14 even:bg-lavender-50/60 sm:py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                {cat.tagline && <p className="eyebrow mb-2">{cat.tagline}</p>}
                <h2 className="text-3xl font-semibold sm:text-4xl">{cat.title}</h2>
                {cat.description && <p className="mt-3 max-w-2xl text-muted">{cat.description}</p>}
              </div>
              <Link href={`/collections/${cat.slug}`} className="border-b border-gold-500 pb-1 text-sm font-medium">
                View {cat.title}
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {!groups.length && <p className="container-x py-24 text-center text-muted">No products have been published yet.</p>}
    </>
  )
}
