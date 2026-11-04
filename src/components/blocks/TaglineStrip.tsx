import { cn } from '@/lib/cn'
import type { TaglineStripBlock } from '@/payload-types'

const columns = { 1: '', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' } as const

export function TaglineStrip({ items }: TaglineStripBlock) {
  return (
    <section className="border-b border-gold-500/40 bg-white">
      <ul
        className={cn(
          'container-x grid grid-cols-1 divide-y divide-gold-500/40 md:divide-x md:divide-y-0',
          columns[Math.min(items.length, 4) as keyof typeof columns],
        )}
      >
        {items.map((item) => (
          <li
            key={item.id ?? item.text}
            className="py-6 text-center font-modern text-lg font-semibold"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  )
}
