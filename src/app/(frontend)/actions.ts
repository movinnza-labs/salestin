'use server'

import { headers } from 'next/headers'
import type { z } from 'zod'

import { getPayloadClient } from '@/lib/payload'
import {
  type FormState,
  type InquiryField,
  type InquiryState,
  inquirySchema,
  type PartnerField,
  type PartnerState,
  partnerSchema,
} from '@/lib/validation/inquiry'
import type { Inquiry } from '@/payload-types'

const MIN_FILL_MS = 3_000
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }
const FAILED =
  'Sorry, we could not send your enquiry right now. Please try again later or contact us by phone, WhatsApp or email.'

// Per-instance limiter. Good enough for a single Node server; behind several
// instances/serverless, put a shared limiter (e.g. at the CDN/WAF) in front.
// Bounded: expired entries are pruned, and the map never holds more than MAX_TRACKED IPs.
const hits = new Map<string, number[]>()
const MAX_TRACKED = 2_000

const rateLimited = (key: string) => {
  const now = Date.now()
  if (hits.size >= MAX_TRACKED) {
    for (const [ip, times] of hits) {
      if (now - times[times.length - 1] >= RATE_LIMIT.windowMs) hits.delete(ip)
    }
    // still full of active IPs (e.g. a flood): drop the oldest entries
    for (const ip of hits.keys()) {
      if (hits.size < MAX_TRACKED) break
      hits.delete(ip)
    }
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.delete(key) // re-insert so Map order stays oldest-first
  hits.set(key, recent)
  return recent.length > RATE_LIMIT.max
}

type Checked<F extends string, T> = { ok: true; data: T; referer?: string } | { ok: false; state: FormState<F> }

/** Validation and spam checks shared by both forms. */
async function checkSubmission<F extends string, S extends z.ZodType<Record<F, unknown>>>(
  formData: FormData,
  fields: F[],
  schema: S,
): Promise<Checked<F, z.infer<S>>> {
  const raw = Object.fromEntries(fields.map((f) => [f, String(formData.get(f) ?? '')])) as Record<F, string>

  // Honeypot: only bots fill the hidden field. They get a generic success so
  // they don't adapt, but nothing is stored.
  if (String(formData.get('website') ?? '') !== '') {
    return { ok: false, state: { status: 'success', message: 'Thank you — your enquiry has been received.' } }
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<F, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as F
      fieldErrors[key] ??= issue.message
    }
    return { ok: false, state: { status: 'error', message: 'Please check the highlighted fields.', fieldErrors, values: raw } }
  }

  // Time trap: a complete form submitted within seconds of loading is almost
  // certainly scripted. Real people (e.g. with autofill) can simply resend.
  const startedAt = Number(formData.get('startedAt'))
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return {
      ok: false,
      state: { status: 'error', message: 'That was very quick — please wait a moment and send again.', values: raw },
    }
  }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) {
    return {
      ok: false,
      state: { status: 'error', message: 'Too many submissions. Please wait a few minutes and try again.', values: raw },
    }
  }

  return { ok: true, data: parsed.data, referer: h.get('referer')?.slice(0, 300) ?? undefined }
}

const label = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

/** Stores the enquiry, then emails the notification address (best-effort). */
async function saveEnquiry(data: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>, extraLines: string[]) {
  const payload = await getPayloadClient()
  await payload.create({ collection: 'inquiries', overrideAccess: true, data })

  // Notification is best-effort: the enquiry is already safely stored.
  try {
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    if (settings.enquiryNotificationEmail && process.env.SMTP_HOST) {
      const kind = data.kind === 'partner' ? 'salon/distributor partner enquiry' : 'website enquiry'
      await payload.sendEmail({
        to: settings.enquiryNotificationEmail,
        replyTo: data.email,
        subject: `New ${kind} from ${data.name}${data.businessName ? ` (${data.businessName})` : ''}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.phone && `Phone: ${data.phone}`,
          data.businessName && `Salon / business: ${data.businessName}`,
          data.city && `City: ${data.city}`,
          ...extraLines,
          data.sourcePage && `Sent from: ${data.sourcePage}`,
        ]
          .filter(Boolean)
          .concat(['', data.message || '(no message)'])
          .join('\n'),
      })
    }
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Enquiry saved but notification email failed' })
  }
}

const CUSTOMER_FIELDS: InquiryField[] = ['name', 'email', 'phone', 'businessName', 'city', 'enquiryType', 'product', 'message']

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const checked = await checkSubmission(formData, CUSTOMER_FIELDS, inquirySchema)
  if (!checked.ok) return checked.state
  const { data, referer } = checked

  try {
    const payload = await getPayloadClient()
    let product: { id: number; title: string } | undefined
    if (data.product) {
      const { docs } = await payload.find({
        collection: 'products',
        where: { and: [{ slug: { equals: data.product } }, { _status: { equals: 'published' } }] },
        select: { title: true },
        limit: 1,
      })
      product = docs[0]
    }

    await saveEnquiry(
      {
        kind: 'customer',
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        businessName: data.businessName || undefined,
        city: data.city || undefined,
        enquiryType: data.enquiryType,
        product: product?.id,
        message: data.message,
        sourcePage: referer,
      },
      [`Enquiry type: ${data.enquiryType}`, product && `Product: ${product.title}`].filter(Boolean) as string[],
    )
  } catch (error) {
    console.error('[enquiry] Failed to save enquiry:', error)
    return { status: 'error', message: FAILED, values: Object.fromEntries(CUSTOMER_FIELDS.map((f) => [f, data[f]])) }
  }

  return { status: 'success', message: 'Thank you — your enquiry has been received. Our team will get back to you soon.' }
}

const PARTNER_FIELDS: PartnerField[] = ['name', 'email', 'phone', 'businessName', 'city', 'partnerType', 'message']

export async function submitPartnerEnquiry(_prev: PartnerState, formData: FormData): Promise<PartnerState> {
  const checked = await checkSubmission(formData, PARTNER_FIELDS, partnerSchema)
  if (!checked.ok) return checked.state
  const { data, referer } = checked

  try {
    await saveEnquiry(
      {
        kind: 'partner',
        partnerType: data.partnerType,
        // customer-only field: keep its default ('product') off partner enquiries
        enquiryType: null,
        name: data.name,
        email: data.email,
        phone: data.phone,
        businessName: data.businessName,
        city: data.city,
        message: data.message || '(no message)',
        sourcePage: referer,
      },
      [`Partner type: ${label(data.partnerType)}`],
    )
  } catch (error) {
    console.error('[enquiry] Failed to save partner enquiry:', error)
    return { status: 'error', message: FAILED, values: Object.fromEntries(PARTNER_FIELDS.map((f) => [f, data[f]])) }
  }

  return {
    status: 'success',
    message: 'Thank you — your partner enquiry has been received. Our team will contact you shortly.',
  }
}
