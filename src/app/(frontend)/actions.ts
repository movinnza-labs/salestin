'use server'

import { headers } from 'next/headers'
import nodemailer from 'nodemailer'

import { getGlobal, getProductBySlug } from '@/lib/content'
import { type InquiryField, type InquiryState, inquirySchema } from '@/lib/validation/inquiry'

const UNAVAILABLE =
  'Sorry, we could not send your enquiry right now. Please try again later or contact us by phone or email.'

const mailTransport = () =>
  process.env.SMTP_HOST
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
    : null

const MIN_FILL_MS = 3_000
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }

// Per-instance limiter. Good enough for a single Node server; behind several
// instances/serverless, put a shared limiter (e.g. at the CDN/WAF) in front.
const hits = new Map<string, number[]>()

const rateLimited = (key: string) => {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5_000) hits.clear()
  return recent.length > RATE_LIMIT.max
}

const FIELDS: InquiryField[] = [
  'name',
  'email',
  'phone',
  'businessName',
  'city',
  'enquiryType',
  'product',
  'message',
]

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const raw = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? '')])) as Record<
    InquiryField,
    string
  >

  // Honeypot: only bots fill the hidden field. They get a generic success so
  // they don't adapt, but nothing is sent.
  if (String(formData.get('website') ?? '') !== '') {
    return { status: 'success', message: 'Thank you — your enquiry has been received.' }
  }

  const parsed = inquirySchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<InquiryField, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as InquiryField
      fieldErrors[key] ??= issue.message
    }
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors,
      values: raw,
    }
  }

  // Time trap: a complete form submitted within seconds of loading is almost
  // certainly scripted. Real people (e.g. with autofill) can simply resend.
  const startedAt = Number(formData.get('startedAt'))
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return {
      status: 'error',
      message: 'That was very quick — please wait a moment and send again.',
      values: raw,
    }
  }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) {
    return {
      status: 'error',
      message: 'Too many submissions. Please wait a few minutes and try again.',
      values: raw,
    }
  }

  const data = parsed.data
  const productTitle = data.product ? getProductBySlug(data.product)?.title : undefined
  const settings = getGlobal('site-settings')
  const to = settings.enquiryNotificationEmail || settings.email

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.businessName && `Salon / business: ${data.businessName}`,
    data.city && `City: ${data.city}`,
    `Enquiry type: ${data.enquiryType}`,
    productTitle && `Product: ${productTitle}`,
    `Sent from: ${h.get('referer')?.slice(0, 300) ?? 'unknown page'}`,
  ]
    .filter(Boolean)
    .concat(['', data.message])
    .join('\n')

  // Enquiries are not stored anywhere: email is the only delivery channel.
  const transport = mailTransport()
  if (!transport || !to) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[enquiry] SMTP or recipient not configured — enquiry could not be delivered')
      return { status: 'error', message: UNAVAILABLE, values: raw }
    }
    console.info(`[enquiry] SMTP not configured; enquiry not emailed:\n${text}`)
  } else {
    try {
      await transport.sendMail({
        from: {
          name: process.env.SMTP_FROM_NAME || settings.siteName,
          address: process.env.SMTP_FROM_ADDRESS || 'no-reply@localhost',
        },
        to,
        replyTo: data.email,
        subject: `New website enquiry from ${data.name}`,
        text,
      })
    } catch (error) {
      console.error('[enquiry] Failed to send enquiry email:', error)
      return { status: 'error', message: UNAVAILABLE, values: raw }
    }
  }

  return {
    status: 'success',
    message: 'Thank you — your enquiry has been received. Our team will get back to you soon.',
  }
}
