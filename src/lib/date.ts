/** "3 November 2026", in the site's Indian-English locale, independent of the server's time zone. */
export const formatDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }) : ''
