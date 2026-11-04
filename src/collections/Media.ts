import path from 'path'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image (or what the video shows) for screen readers and search engines.' },
    },
  ],
  upload: {
    // <app>/media: the Railway volume is mounted here (the standalone server runs from the app root)
    staticDir: path.resolve(process.cwd(), 'media'),
    // Files never change in place (Payload renames re-uploads), so browsers and a CDN such as
    // Cloudflare may keep them for a year. Payload only calls this when a file is served, so
    // errors are never cached; the 416 "bad range" reply (Content-Range: bytes */n) is skipped.
    modifyResponseHeaders: ({ headers }) => {
      if (!headers.get('Content-Range')?.startsWith('bytes */')) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      }
      return headers
    },
    // images, plus MP4 for short product videos (resized versions are only made for images)
    mimeTypes: ['image/*', 'video/mp4'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 900 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
}
