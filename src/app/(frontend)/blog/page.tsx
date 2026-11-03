import Link from 'next/link'

import { CMSImage } from '@/components/ui/CMSImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatDate } from '@/lib/date'
import { getPosts } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 3600

type Props = { searchParams: Promise<{ page?: string }> }

export const generateMetadata = () =>
  buildMetadata({
    fallbackTitle: 'Blog',
    fallbackDescription: 'Hair care, skin care and salon tips from SELESTIN Professional.',
    path: '/blog',
  })

export default async function BlogPage({ searchParams }: Props) {
  const page = Math.max(1, Number((await searchParams).page) || 1)
  const { docs: posts, totalPages } = await getPosts(page)

  return (
    <>
      <section className="bg-cream">
        <div className="container-x py-14 sm:py-16">
          <SectionHeading as="h1" eyebrow="Journal" heading="Blog" intro="Hair care, skin care and salon insights." />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          {posts.length ? (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-line/70 transition-shadow hover:shadow-lift">
                    <div className="relative aspect-[16/10] overflow-hidden bg-lavender-50">
                      <CMSImage
                        media={post.coverImage}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <time dateTime={post.publishedAt} className="text-xs tracking-[0.16em] text-muted uppercase">
                        {formatDate(post.publishedAt)}
                      </time>
                      <h2 className="mt-2 text-2xl leading-snug font-semibold">
                        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>}
                      <span className="mt-auto pt-5 text-sm font-medium text-plum-600">Read article →</span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-16 text-center text-muted">Articles are coming soon.</p>
          )}

          {totalPages > 1 && (
            <nav aria-label="Blog pages" className="mt-14 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={n === 1 ? '/blog' : `/blog?page=${n}`}
                  aria-current={n === page ? 'page' : undefined}
                  className="grid size-10 place-items-center rounded-full border border-line text-sm hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white"
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
