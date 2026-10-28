import { LOGO_PATH, LOGO_VIEWBOX } from './logoPath'

type Props = {
  className?: string
  title?: string
}

/** Official logo as inline SVG; colour follows `currentColor`. */
export function Logo({ className, title = 'SELESTIN Professional' }: Props) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label={title} className={className} fill="currentColor">
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  )
}
