import { notFound } from 'next/navigation'

import { BlogList, blogPageHref } from '@/components/BlogList'
import { buildMetadata } from '@/lib/seo'

// publishing refreshes pages at once (src/hooks/revalidate.ts); this is only a daily safety net
export const revalidate = 86400

type Props = { params: Promise<{ page: string }> }

// rendered on first visit, then cached like the other pages
export const generateStaticParams = () => []

const pageNumber = (value: string) => (/^[2-9]$|^[1-9]d+$/.test(value) ? Number(value) : null)

export async function generateMetadata({ params }: Props) {
  const n = pageNumber((await params).page)
  if (!n) return {}
  return buildMetadata({
    fallbackTitle: `Blog — page ${n}`,
    fallbackDescription: 'Hair care, skin care and salon tips from SELESTIN Professional.',
    path: blogPageHref(n),
  })
}

export default async function BlogPagePaginated({ params }: Props) {
  const n = pageNumber((await params).page)
  if (!n) notFound()
  return <BlogList page={n} />
}
