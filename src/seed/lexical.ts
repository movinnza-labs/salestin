// Minimal builders for Lexical rich-text JSON used by the seed script.

const text = (value: string) => ({
  type: 'text',
  text: value,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const block = { direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 }

const paragraph = (value: string) => ({ type: 'paragraph', children: [text(value)], textFormat: 0, ...block })

const bulletList = (items: string[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((item, i) => ({ type: 'listitem', value: i + 1, children: [text(item)], ...block })),
  ...block,
})

type Node = string | { list: string[] }

/** Strings become paragraphs; `{ list: [...] }` becomes a bullet list. */
export const richText = (...nodes: Node[]) => ({
  root: {
    type: 'root',
    children: nodes.map((n) => (typeof n === 'string' ? paragraph(n) : bulletList(n.list))),
    ...block,
  },
})
