import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Banners } from './collections/Banners'
import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { ProductCategories } from './collections/ProductCategories'
import { Products } from './collections/Products'
import { Ranges } from './collections/Ranges'
import { Users } from './collections/Users'
import { globals } from './globals'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteName = 'SELESTIN Professional'

// Email is optional: without SMTP settings, enquiries are still stored in the
// CMS and Payload logs outgoing mail to the console.
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@localhost',
      defaultFromName: process.env.SMTP_FROM_NAME || siteName,
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    // browser extensions (e.g. QuillBot) add attributes to <html> before React hydrates
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: ` — ${siteName}`,
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/brand/icon.svg' }],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminLogo#AdminIcon',
      },
    },
  },
  collections: [Pages, Posts, Banners, Products, Ranges, ProductCategories, Media, Inquiries, Users],
  globals,
  editor: lexicalEditor(),
  email,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      connectionTimeoutMillis: 10_000,
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema is changed only through committed migrations, never auto-pushed.
    push: false,
    // Pending migrations run automatically when the production server starts.
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts', 'products', 'ranges', 'product-categories'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => (doc?.title ? `${doc.title} | ${siteName}` : siteName),
      generateDescription: ({ doc }) => doc?.summary || doc?.excerpt || doc?.description || '',
      generateURL: ({ doc, collectionSlug }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
        if (collectionSlug === 'products') return `${base}/products/${doc?.slug}`
        if (collectionSlug === 'product-categories') return `${base}/collections/${doc?.slug}`
        if (collectionSlug === 'ranges') return `${base}/ranges/${doc?.slug}`
        if (collectionSlug === 'posts') return `${base}/blog/${doc?.slug}`
        return `${base}${doc?.slug === 'home' ? '/' : `/${doc?.slug}`}`
      },
    }),
  ],
})
