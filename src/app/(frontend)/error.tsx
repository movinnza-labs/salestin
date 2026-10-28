'use client'

import { useEffect } from 'react'

import { buttonClass } from '@/components/ui/CMSLink'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-cream">
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">We couldn&apos;t load this page</h1>
        <p className="mt-4 max-w-md text-muted">
          This is usually temporary. Please try again in a moment.
          {error.digest && <span className="mt-2 block text-xs">Reference: {error.digest}</span>}
        </p>
        <button type="button" onClick={reset} className={buttonClass('dark', 'mt-8')}>
          Try again
        </button>
      </div>
    </section>
  )
}
