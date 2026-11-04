import { BlogList } from '@/components/BlogList'
import { buildMetadata } from '@/lib/seo'

// publishing refreshes pages at once (src/hooks/revalidate.ts); this is only a daily safety net
export const revalidate = 86400

export const generateMetadata = () =>
  buildMetadata({
    fallbackTitle: 'Blog',
    fallbackDescription: 'Hair care, skin care and salon tips from SELESTIN Professional.',
    path: '/blog',
  })

export default function BlogPage() {
  return <BlogList page={1} />
}
