import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type Background = 'white' | 'cream' | 'lavender' | 'dark' | null | undefined

const backgrounds: Record<NonNullable<Background>, string> = {
  white: 'bg-white',
  cream: 'bg-cream',
  lavender: 'bg-lavender-50',
  dark: 'on-dark bg-plum-950 text-white',
}

export function Section({
  background,
  className,
  children,
  id,
}: {
  background?: Background
  className?: string
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-24', backgrounds[background ?? 'white'], className)}>
      {children}
    </section>
  )
}
