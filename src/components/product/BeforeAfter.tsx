'use client'

import { MoveHorizontal } from 'lucide-react'
import { type ReactNode, useId, useState } from 'react'

type Props = {
  before: ReactNode
  after: ReactNode
  caption?: string | null
}

/** Compare two images by dragging a divider; the native range input keeps it keyboard-accessible. */
export function BeforeAfter({ before, after, caption }: Props) {
  const [position, setPosition] = useState(50)
  const id = useId()

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-lavender-50 select-none">
        <div className="absolute inset-0">{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          {before}
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white">Before</span>
        <span className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white">After</span>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${position}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full bg-white text-ink shadow-lift">
            <MoveHorizontal className="size-5" />
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          Drag to compare before and after
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  )
}
