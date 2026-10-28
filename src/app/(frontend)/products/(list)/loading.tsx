export default function Loading() {
  return (
    <div className="container-x py-16" role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="h-10 w-1/3 animate-pulse rounded-full bg-cream" />
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-cream" />
        ))}
      </div>
    </div>
  )
}
