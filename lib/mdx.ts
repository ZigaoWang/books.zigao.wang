import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/books')

export async function getBookMdxSource(slug: string): Promise<string | null> {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContents)
  return content
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~{2}([^~]+)~{2}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function getBookNotesPreview(
  slug: string,
  maxLength = 180
): Promise<string | null> {
  const content = await getBookMdxSource(slug)
  if (!content) return null

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const firstParagraph = paragraphs.find((paragraph) => {
    const trimmed = paragraph.replace(/^>\s?/g, '').trim()
    if (trimmed.startsWith('#')) return false
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) return false
    if (trimmed.startsWith('```')) return false
    return trimmed.length > 0
  })

  if (!firstParagraph) return null

  const plain = stripMarkdown(firstParagraph)
  if (!plain) return null

  if (plain.length <= maxLength) return plain
  return `${plain.slice(0, maxLength).replace(/\s+\S*$/, '').trim()}…`
}
