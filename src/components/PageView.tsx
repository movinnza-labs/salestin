import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getPageBySlug } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function pageMetadata(slug: string) {
  const page = await getPageBySlug(slug)
  if (!page) return {}
  const metadata = await buildMetadata({
    meta: page.meta,
    fallbackTitle: slug === 'home' ? undefined : page.title,
    path: slug === 'home' ? '/' : `/${slug}`,
  })
  return page.hideFromSearch ? { ...metadata, robots: { index: false, follow: false } } : metadata
}

/** Renders a published CMS page by slug, or the 404 page. */
export async function PageView({ slug }: { slug: string }) {
  const page = await getPageBySlug(slug)
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout} />
}
