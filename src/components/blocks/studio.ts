import { cn } from '@/lib/cn'

/*
 * Shared styles for the "studio" design (homepage v3): clean Inter headings,
 * square-ish 8px corners and gold fills, instead of the serif + pill look.
 */

export const studioHeading = 'font-modern font-bold tracking-tight text-balance'

export const studioEyebrow = 'text-xs font-semibold tracking-[0.24em] uppercase'

type Variant = 'gold' | 'outline' | 'light'

const variants: Record<Variant, string> = {
  gold: 'bg-gold-500 text-ink shadow-md hover:bg-gold-600 hover:text-white',
  outline: 'border border-gold-500 bg-lavender-50 text-ink hover:border-ink',
  light: 'bg-gold-300 text-ink shadow-md hover:bg-white',
}

export const studioButton = (variant: Variant = 'gold', className?: string) =>
  cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors',
    variants[variant],
    className,
  )
