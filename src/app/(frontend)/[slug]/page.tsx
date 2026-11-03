import { pageMetadata, PageView } from '@/components/PageView'
import { getPageSlugs, safeParams } from '@/lib/payload'

export const revalidate = 3600

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
