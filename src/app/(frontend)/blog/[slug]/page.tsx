import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { CMSImage } from '@/components/ui/CMSImage'
import { RichText } from '@/components/ui/RichText'
import { formatDate } from '@/lib/date'
import { getGlobal, getPostBySlug, getPostSlugs, safeParams } from '@/lib/payload'
import { buildMetadata, ogImageUrl, siteUrl } from '@/lib/seo'

// publishing refreshes pages at once (src/hooks/revalidate.ts); this is only a daily safety net
export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => safeParams(async () => (await getPostSlugs()).map((slug) => ({ slug })))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    meta: post.meta,
    fallbackTitle: post.title,
    fallbackDescription: post.excerpt,
    fallbackImage: post.coverImage,
    path: `/blog/${slug}`,
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const settings = await getGlobal('site-settings')
  const image = ogImageUrl(post.meta?.image) || ogImageUrl(post.coverImage)

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          ...(post.excerpt && { description: post.excerpt }),
          ...(image && { image }),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { '@type': 'Organization', name: post.author || settings?.siteName || 'SELESTIN Professional' },
          publisher: { '@type': 'Organization', name: settings?.siteName || 'SELESTIN Professional' },
          mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
        }}
      />
      <header className="bg-cream">
        <div className="container-x max-w-3xl py-12 sm:py-16">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
          <h1 className="mt-8 text-4xl leading-tight font-semibold sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.author && <> · {post.author}</>}
          </p>
        </div>
      </header>

      {post.coverImage && typeof post.coverImage === 'object' && (
        <div className="container-x max-w-5xl">
          <div className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-3xl bg-lavender-50">
            <CMSImage media={post.coverImage} fill priority sizes="(min-width: 1024px) 1024px, 100vw" />
          </div>
        </div>
      )}

      <div className="container-x max-w-3xl py-12 sm:py-16">
        <RichText data={post.content} className="text-lg" />
        <p className="mt-14 border-t border-line pt-8">
          <Link href="/blog" className="text-sm font-medium text-plum-600 hover:underline">
            ← All articles
          </Link>
        </p>
      </div>
    </article>
  )
}
