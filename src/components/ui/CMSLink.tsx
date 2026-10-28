import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { isExternal, type LinkValue, resolveHref } from '@/lib/links'

type Variant = 'primary' | 'dark' | 'gold' | 'outline' | 'outline-light' | 'text'

const variants: Record<Variant, string> = {
  primary: 'bg-plum-600 text-white hover:bg-plum-700 shadow-sm',
  dark: 'bg-ink text-white hover:bg-plum-900',
  gold: 'bg-gold-500 text-ink hover:bg-gold-300 shadow-[0_8px_24px_-8px_rgb(176_138_78/0.7)]',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white',
  'outline-light': 'border border-white/50 text-white hover:bg-white hover:text-ink',
  text: 'text-ink underline-offset-8 hover:underline px-0! py-0!',
}

export const buttonClass = (variant: Variant = 'primary', className?: string) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200',
    variants[variant],
    className,
  )

type Props = {
  link?: Partial<LinkValue> | null
  href?: string
  label?: ReactNode
  variant?: Variant
  arrow?: boolean
  className?: string
}

/** Renders a CMS link field (or a plain href) as a styled button/link; nothing when unresolved. */
export function CMSLink({ link, href, label, variant = 'primary', arrow = false, className }: Props) {
  const target = href ?? resolveHref(link)
  const text = label ?? link?.label
  if (!target || !text) return null

  const content = (
    <>
      {text}
      {arrow && <ArrowRight className="size-4" aria-hidden />}
    </>
  )
  const cls = buttonClass(variant, className)

  if (isExternal(target) || target.startsWith('tel:') || target.startsWith('mailto:')) {
    const newTab = link?.newTab || isExternal(target)
    return (
      <a href={target} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }

  return (
    <Link href={target} className={cls} {...(link?.newTab ? { target: '_blank' } : {})}>
      {content}
    </Link>
  )
}
