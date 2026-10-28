import { RichText } from '@/components/ui/RichText'
import type { RichTextBlock } from '@/content/types'

export function RichTextSection({ content }: RichTextBlock) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x max-w-3xl">
        <RichText data={content} />
      </div>
    </section>
  )
}
