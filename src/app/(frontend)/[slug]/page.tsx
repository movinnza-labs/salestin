import { pageMetadata, PageView } from '@/components/PageView'
import { getPageSlugs } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => getPageSlugs().map((slug) => ({ slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return pageMetadata(slug)
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  return <PageView slug={slug} />
}
