import { useId } from 'react'

import { cn } from '@/lib/cn'

import { LOGO_PATH } from './logoPath'

/**
 * Circular "SELESTIN • PROFESSIONAL" seal, after the round badge used in the
 * brand brochure, with the logo's leaf mark at the centre. Pass positioning
 * (`relative` or `absolute …`) in className.
 */
export function BrandSeal({ className }: { className?: string }) {
  const id = `seal-${useId().replace(/:/g, '')}`
  return (
    <div className={cn('grid place-items-center rounded-full', className)} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        {/* textLength stretches one phrase to exactly fill the circle (2πr ≈ 490) */}
        <text className="fill-current font-sans text-[15px] font-medium uppercase">
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">
            Selestin • Professional •
          </textPath>
        </text>
      </svg>
      <svg viewBox="868 47 278 143" className="w-[36%] fill-current">
        <path fillRule="evenodd" d={LOGO_PATH} />
      </svg>
    </div>
  )
}
