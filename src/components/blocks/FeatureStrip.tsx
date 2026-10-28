import { Icon } from '@/components/ui/Icon'
import type { FeatureStripBlock } from '@/content/types'

export function FeatureStrip({ items }: FeatureStripBlock) {
  if (!items?.length) return null
  return (
    <section className="border-b border-line bg-white">
      <ul className="container-x grid gap-6 py-8 sm:grid-cols-2 lg:flex lg:justify-between">
        {items.map((item) => (
          <li key={item.id ?? item.title} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream text-gold-600">
              <Icon name={item.icon} className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{item.title}</span>
              {item.text && <span className="block text-xs text-muted">{item.text}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
