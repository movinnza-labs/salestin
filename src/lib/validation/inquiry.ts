import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120, 'Name is too long.'),
  email: z.email('Please enter a valid email address.').trim().max(200),
  phone: z
    .string()
    .trim()
    .max(30, 'Phone number is too long.')
    .refine((v) => v === '' || /^[+()\d\s-]{7,}$/.test(v), 'Please enter a valid phone number.'),
  businessName: z.string().trim().max(160, 'Salon / business name is too long.'),
  city: z.string().trim().max(80, 'City is too long.'),
  enquiryType: z.enum(['partnership', 'product', 'other'], 'Please choose an enquiry type.'),
  product: z.string().trim().max(200),
  message: z.string().trim().min(10, 'Please tell us a little more (at least 10 characters).').max(3000, 'Message is too long.'),
})

export type InquiryInput = z.infer<typeof inquirySchema>
export type InquiryField = keyof InquiryInput

export type InquiryState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | {
      status: 'error'
      message: string
      fieldErrors?: Partial<Record<InquiryField, string>>
      values?: Partial<Record<InquiryField, string>>
    }
