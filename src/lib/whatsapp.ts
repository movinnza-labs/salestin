/** wa.me link for a WhatsApp number in any common format, with an optional pre-filled message. */
export const whatsappHref = (number?: string | null, message?: string): string | null => {
  const digits = number?.replace(/\D/g, '')
  if (!digits || digits.length < 8) return null
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export const productEnquiryMessage = (productTitle: string) =>
  `Hello SELESTIN Professional, I would like to know more about ${productTitle}.`
