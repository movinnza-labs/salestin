import { JsonLd } from '@/components/JsonLd'
import { pageMetadata, PageView } from '@/components/PageView'
import { getGlobal } from '@/lib/payload'
import { siteUrl } from '@/lib/seo'

// publishing refreshes pages at once (src/hooks/revalidate.ts); this is only a daily safety net
export const revalidate = 86400

export const generateMetadata = () => pageMetadata('home')

export default async function HomePage() {
  const settings = await getGlobal('site-settings')

  // Only facts that exist in Site settings are published as structured data.
  const organization = settings && {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName,
    ...(settings.companyName && { legalName: settings.companyName }),
    url: siteUrl,
    logo: `${siteUrl}/brand/logo.svg`,
    ...(settings.email && { email: settings.email }),
    ...(settings.phone && { telephone: settings.phone }),
    ...(settings.address && { address: settings.address }),
  }

  return (
    <>
      {organization && <JsonLd data={organization} />}
      <PageView slug="home" />
    </>
  )
}
