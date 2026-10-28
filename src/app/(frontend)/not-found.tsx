import Link from 'next/link'

import { buttonClass } from '@/components/ui/CMSLink'

export default function NotFound() {
  return (
    <section className="bg-cream">
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-md text-muted">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass('dark')}>
            Back to home
          </Link>
          <Link href="/products" className={buttonClass('outline')}>
            View products
          </Link>
        </div>
      </div>
    </section>
  )
}
