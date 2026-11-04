import { pageMetadata, PageView } from '@/components/PageView'
import { getPageSlugs, safeParams } from '@/lib/payload'

// publishing refreshes pages at once (src/hooks/revalidate.ts); this is only a daily safety net
export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => safeParams(async () => (await getPageSlugs()).map((slug) => ({ slug })))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return pageMetadata(slug)
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  return <PageView slug={slug} />
}
