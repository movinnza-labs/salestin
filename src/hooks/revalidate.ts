import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

type PathBuilder = (doc: Record<string, unknown>) => string[]

/**
 * Next's revalidatePath throws outside a request scope (e.g. `pnpm seed`),
 * and seeding sets `context.disableRevalidate` anyway.
 */
const safeRevalidate = (paths: string[], type?: 'layout' | 'page') => {
  for (const path of paths) {
    try {
      revalidatePath(path, type)
    } catch {
      // not running inside Next.js — nothing to revalidate
    }
  }
}

/** `type: 'layout'` also refreshes every route nested under each path. */
export const revalidateCollection = (
  buildPaths: PathBuilder,
  type?: 'layout' | 'page',
): { afterChange: CollectionAfterChangeHook; afterDelete: CollectionAfterDeleteHook } => ({
  afterChange: ({ doc, previousDoc, req }) => {
    if (req.context.disableRevalidate) return doc
    const paths = new Set(buildPaths(doc))
    // a renamed or unpublished doc must also drop its old URL
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      buildPaths(previousDoc).forEach((p) => paths.add(p))
    }
    safeRevalidate([...paths], type)
    safeRevalidate(['/sitemap.xml'])
    req.payload.logger.info(`Revalidated: ${[...paths].join(', ')}`)
    return doc
  },
  afterDelete: ({ doc, req }) => {
    if (!req.context.disableRevalidate) {
      safeRevalidate(buildPaths(doc), type)
      safeRevalidate(['/sitemap.xml'])
    }
    return doc
  },
})

/** Header, footer and site settings appear on every page. */
export const revalidateEverything: GlobalAfterChangeHook = ({ doc, req }) => {
  if (!req.context.disableRevalidate) {
    safeRevalidate(['/'], 'layout')
    req.payload.logger.info('Revalidated whole site after global change')
  }
  return doc
}
