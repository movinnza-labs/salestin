import type { Access, FieldAccess } from 'payload'

/** Any logged-in admin user. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const authenticatedField: FieldAccess = ({ req: { user } }) => Boolean(user)

export const anyone: Access = () => true

/** Admins see drafts; the public only sees published documents. */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
