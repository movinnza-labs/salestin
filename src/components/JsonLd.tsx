export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // escape "<" so CMS text can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
