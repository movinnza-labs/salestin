import { Logo } from '../ui/Logo'
import { LOGO_PATH } from '../ui/logoPath'

export function AdminLogo() {
  return <Logo className="selestin-admin-logo" />
}

/** The leaf mark from the logo, used in the admin nav. */
export function AdminIcon() {
  return (
    <svg viewBox="868 47 278 143" className="selestin-admin-icon" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  )
}
