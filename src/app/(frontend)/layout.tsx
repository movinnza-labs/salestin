import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Playfair_Display, Poppins } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getGlobal } from '@/lib/content'
import { siteUrl } from '@/lib/seo'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobal('site-settings')
  const siteName = settings?.siteName || 'SELESTIN Professional'
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings?.defaultMetaTitle || siteName, template: `%s | ${siteName}` },
    description: settings?.defaultMetaDescription || undefined,
    applicationName: siteName,
  }
}

export const viewport: Viewport = {
  themeColor: '#141414',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // browser extensions (e.g. QuillBot) add attributes to <html> before React hydrates
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
