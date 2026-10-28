import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { isExternal, type LinkValue, resolveHref } from '@/lib/links'

/** Lexical rich-text JSON, as stored in src/content/*.json */
type Node = {
  type: string
  text?: string
  format?: number | string
  tag?: string
  listType?: string
  children?: Node[]
  fields?: {
    linkType?: 'internal' | 'custom'
    url?: string
    newTab?: boolean
    doc?: LinkValue['reference']
  }
}

// Lexical text format bit flags
const BOLD = 1
const ITALIC = 2
const STRIKETHROUGH = 4
const UNDERLINE = 8
const CODE = 16

const renderText = (node: Node): ReactNode => {
  const format = typeof node.format === 'number' ? node.format : 0
  let el: ReactNode = node.text
  if (format & CODE) el = <code>{el}</code>
  if (format & STRIKETHROUGH) el = <s>{el}</s>
  if (format & UNDERLINE) el = <u>{el}</u>
  if (format & ITALIC) el = <em>{el}</em>
  if (format & BOLD) el = <strong>{el}</strong>
  return el
}

const renderNodes = (nodes: Node[] = []): ReactNode =>
  nodes.map((node, i) => {
    const children = renderNodes(node.children)
    switch (node.type) {
      case 'text':
        return <Fragment key={i}>{renderText(node)}</Fragment>
      case 'linebreak':
        return <br key={i} />
      case 'paragraph':
        return <p key={i}>{children}</p>
      case 'heading': {
        const Tag = (node.tag ?? 'h2') as 'h2'
        return <Tag key={i}>{children}</Tag>
      }
      case 'list':
        return node.listType === 'number' ? (
          <ol key={i}>{children}</ol>
        ) : (
          <ul key={i}>{children}</ul>
        )
      case 'listitem':
        return <li key={i}>{children}</li>
      case 'quote':
        return <blockquote key={i}>{children}</blockquote>
      case 'link':
      case 'autolink': {
        const { linkType, url, newTab, doc } = node.fields ?? {}
        const href = resolveHref({
          type: linkType === 'internal' ? 'internal' : 'custom',
          url,
          reference: doc,
        })
        if (!href) return <span key={i}>{children}</span>
        const target = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
        return isExternal(href) ? (
          <a key={i} href={href} {...target}>
            {children}
          </a>
        ) : (
          <Link key={i} href={href} {...target}>
            {children}
          </Link>
        )
      }
      default:
        return <span key={i}>{children}</span>
    }
  })

type Props = {
  data?: unknown
  className?: string
}

export function RichText({ data, className }: Props) {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  const { root } = data as { root: Node }
  return <div className={cn('prose-brand', className)}>{renderNodes(root.children)}</div>
}
