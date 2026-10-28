'use client'

import { type ReactNode, useState } from 'react'

import { cn } from '@/lib/cn'

export type GalleryItem = { id: string; image: ReactNode; thumb: ReactNode; label: string }

export function ProductGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0)
  const current = items[active] ?? items[0]
  if (!current) return null

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-lavender-50 ring-1 ring-line/60">{current.image}</div>
      {items.length > 1 && (
        <ul className="mt-4 flex gap-3 overflow-x-auto pb-1" aria-label="Product images">
          {items.map((item, i) => (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Show image: ${item.label}`}
                className={cn(
                  'relative block size-20 overflow-hidden rounded-xl bg-lavender-50 ring-2 transition sm:size-24',
                  i === active ? 'ring-plum-600' : 'ring-transparent hover:ring-lavender-300',
                )}
              >
                {item.thumb}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
