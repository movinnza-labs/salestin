'use client'

import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useActionState, useEffect, useRef } from 'react'

import { submitInquiry } from '@/app/(frontend)/actions'
import { buttonClass } from '@/components/ui/CMSLink'
import { cn } from '@/lib/cn'
import type { InquiryField, InquiryState } from '@/lib/validation/inquiry'

type ProductOption = { slug: string; title: string }

const inputClass =
  'block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-plum-600 focus:ring-2 focus:ring-plum-600/20 focus:outline-none aria-invalid:border-red-600 sm:text-sm'

function Field({
  name,
  label,
  required,
  error,
  children,
}: {
  name: InquiryField
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={`inq-${name}`} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-plum-600"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`inq-${name}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export function InquiryForm({ products }: { products: ProductOption[] }) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: 'idle' })
  const params = useSearchParams()
  const preselected = params.get('product') ?? ''
  const mountedAt = useRef(0)
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (state.status === 'idle') return
    statusRef.current?.focus()
    if (state.status === 'success') formRef.current?.reset()
  }, [state])

  const errors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}
  const values = state.status === 'error' ? (state.values ?? {}) : {}
  const a11y = (name: InquiryField) => ({
    id: `inq-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `inq-${name}-error` : undefined,
  })
  // remount fields with the submitted values after a failed attempt
  const key = state.status === 'error' ? JSON.stringify(values) : state.status

  return (
    <form
      ref={formRef}
      action={(formData) => {
        formData.set('startedAt', String(mountedAt.current))
        action(formData)
      }}
      noValidate className="space-y-5" key={key}>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status === 'success' && (
          <p className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-emerald-200">
            <CheckCircle2 className="size-5 shrink-0" aria-hidden />
            {state.message}
          </p>
        )}
        {state.status === 'error' && (
          <p className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-900 ring-1 ring-red-200">
            <AlertCircle className="size-5 shrink-0" aria-hidden />
            {state.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" required error={errors.name}>
          <input {...a11y('name')} autoComplete="name" required maxLength={120} defaultValue={values.name} className={inputClass} />
        </Field>
        <Field name="email" label="Email" required error={errors.email}>
          <input {...a11y('email')} type="email" autoComplete="email" required defaultValue={values.email} className={inputClass} />
        </Field>
        <Field name="phone" label="Phone" error={errors.phone}>
          <input {...a11y('phone')} type="tel" autoComplete="tel" maxLength={30} defaultValue={values.phone} className={inputClass} />
        </Field>
        <Field name="businessName" label="Salon / business name" error={errors.businessName}>
          <input {...a11y('businessName')} autoComplete="organization" maxLength={160} defaultValue={values.businessName} className={inputClass} />
        </Field>
        <Field name="city" label="City" error={errors.city}>
          <input {...a11y('city')} autoComplete="address-level2" maxLength={80} defaultValue={values.city} className={inputClass} />
        </Field>
        <Field name="enquiryType" label="Enquiry type" required error={errors.enquiryType}>
          <select {...a11y('enquiryType')} defaultValue={values.enquiryType || (preselected ? 'product' : 'partnership')} className={inputClass}>
            <option value="partnership">Salon partnership</option>
            <option value="product">Product information</option>
            <option value="other">Other</option>
          </select>
        </Field>
      </div>

      {products.length > 0 && (
        <Field name="product" label="Product" error={errors.product}>
          <select {...a11y('product')} defaultValue={values.product ?? preselected} className={inputClass}>
            <option value="">— Not about a specific product —</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field name="message" label="Message" required error={errors.message}>
        <textarea {...a11y('message')} rows={5} required maxLength={3000} defaultValue={values.message} className={cn(inputClass, 'resize-y')} />
      </Field>

      {/* spam protection: humans never see or fill this */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inq-website">Leave this field empty</label>
        <input id="inq-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <button type="submit" disabled={pending} className={buttonClass('primary', 'w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto')}>
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {pending ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
