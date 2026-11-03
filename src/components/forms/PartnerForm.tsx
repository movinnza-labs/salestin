'use client'

import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useActionState, useEffect, useRef } from 'react'

import { submitPartnerEnquiry } from '@/app/(frontend)/actions'
import { buttonClass } from '@/components/ui/CMSLink'
import { cn } from '@/lib/cn'
import type { PartnerField, PartnerState } from '@/lib/validation/inquiry'

import { Field, inputClass } from './InquiryForm'

/** B2B enquiry form for salons and distributors (Salon Partner page). */
export function PartnerForm() {
  const [state, action, pending] = useActionState<PartnerState, FormData>(submitPartnerEnquiry, { status: 'idle' })
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
  const a11y = (name: PartnerField) => ({
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
      noValidate
      className="space-y-5"
      key={key}
    >
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

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          I am a <span className="text-plum-600">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3" aria-describedby={errors.partnerType ? 'inq-partnerType-error' : undefined}>
          {(['salon', 'distributor'] as const).map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm has-checked:border-plum-600 has-checked:ring-2 has-checked:ring-plum-600/20"
            >
              <input
                type="radio"
                name="partnerType"
                value={type}
                defaultChecked={(values.partnerType || 'salon') === type}
                className="accent-plum-600"
              />
              {type === 'salon' ? 'Salon' : 'Distributor'}
            </label>
          ))}
        </div>
        {errors.partnerType && (
          <p id="inq-partnerType-error" className="mt-1.5 text-sm text-red-700">
            {errors.partnerType}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" required error={errors.name}>
          <input {...a11y('name')} autoComplete="name" required maxLength={120} defaultValue={values.name} className={inputClass} />
        </Field>
        <Field name="businessName" label="Salon / business name" required error={errors.businessName}>
          <input
            {...a11y('businessName')}
            autoComplete="organization"
            required
            maxLength={160}
            defaultValue={values.businessName}
            className={inputClass}
          />
        </Field>
        <Field name="phone" label="Phone / WhatsApp" required error={errors.phone}>
          <input {...a11y('phone')} type="tel" autoComplete="tel" required maxLength={30} defaultValue={values.phone} className={inputClass} />
        </Field>
        <Field name="email" label="Email" required error={errors.email}>
          <input {...a11y('email')} type="email" autoComplete="email" required defaultValue={values.email} className={inputClass} />
        </Field>
        <Field name="city" label="City" required error={errors.city}>
          <input {...a11y('city')} autoComplete="address-level2" required maxLength={80} defaultValue={values.city} className={inputClass} />
        </Field>
      </div>

      <Field name="message" label="Tell us about your business" error={errors.message}>
        <textarea
          {...a11y('message')}
          rows={4}
          maxLength={3000}
          placeholder="e.g. number of chairs or outlets, services you offer, products you are interested in"
          defaultValue={values.message}
          className={cn(inputClass, 'resize-y')}
        />
      </Field>

      {/* spam protection: humans never see or fill this */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="partner-website">Leave this field empty</label>
        <input id="partner-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <button type="submit" disabled={pending} className={buttonClass('primary', 'w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto')}>
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {pending ? 'Sending…' : 'Send partner enquiry'}
      </button>
    </form>
  )
}
