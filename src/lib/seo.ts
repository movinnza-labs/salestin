import type { Metadata } from 'next'

import { getGlobal } from './content'
import { asMedia, type MediaRef } from './media'

export const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

type MetaFields = {
  title?: string | null
  description?: string | null
  image?: MediaRef
} | null

type Args = {
  meta?: MetaFields
  fallbackTitle?: string
  fallbackDescription?: string | null
  fallbackImage?: MediaRef
  path: string
}

const ogImageUrl = (ref: MediaRef) => {
  const media = asMedia(ref)
  if (!media) return undefined
  const url = media.sizes?.og?.url || media.url
  if (!url) return undefined
  return url.startsWith('http') ? url : `${siteUrl}${url}`
}

export async function buildMetadata({ meta, fallbackTitle, fallbackDescription, fallbackImage, path }: Args): Promise<Metadata> {
  const settings = await getGlobal('site-settings')
  const siteName = settings?.siteName || 'SELESTIN Professional'

  const title = meta?.title || (fallbackTitle ? `${fallbackTitle} | ${siteName}` : settings?.defaultMetaTitle || siteName)
  const description = meta?.description || fallbackDescription || settings?.defaultMetaDescription || undefined
  const image = ogImageUrl(meta?.image) || ogImageUrl(fallbackImage) || ogImageUrl(settings?.defaultOgImage)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      url: path,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description },
  }
}
