'use client'

import Image from 'next/image'
import { BookOpen, Clock, User as UserIcon } from 'lucide-react'

interface ArticleSection {
  heading?: string
  content: string
  images?: string[]
}

interface ArticleData {
  title: string
  author?: string
  publishDate?: string
  readTime?: number
  coverImage?: string
  toc?: { id: string; label: string }[]
  sections: ArticleSection[]
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function renderMarkdown(md: string): React.ReactNode[] {
  // Light markdown: paragraphs, **bold**, *italic*, lists (- / *), blockquote (>)
  const blocks = md.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
  return blocks.map((block, idx) => {
    if (block.startsWith('> ')) {
      return (
        <blockquote
          key={idx}
          className="my-4 border-l-2 border-[#00d4aa] pl-4 text-[#f0f0f5] italic"
        >
          {inlineFormat(block.slice(2))}
        </blockquote>
      )
    }
    if (/^[-*]\s/.test(block)) {
      const items = block.split(/\n/).map((l) => l.replace(/^[-*]\s+/, '').trim())
      return (
        <ul key={idx} className="my-3 list-disc space-y-1.5 pl-6 text-sm text-[#8888a0]">
          {items.map((it, i) => (
            <li key={i}>{inlineFormat(it)}</li>
          ))}
        </ul>
      )
    }
    return (
      <p key={idx} className="my-3 text-sm leading-relaxed text-[#8888a0]">
        {inlineFormat(block)}
      </p>
    )
  })
}

function inlineFormat(text: string): React.ReactNode {
  // Bold then italic
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0
  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const italicMatch = remaining.match(/\*(.+?)\*/)
    const nextBold = boldMatch?.index ?? Infinity
    const nextItalic = italicMatch?.index ?? Infinity
    const next = Math.min(nextBold, nextItalic)
    if (next === Infinity) {
      parts.push(remaining)
      break
    }
    if (next > 0) parts.push(remaining.slice(0, next))
    if (next === nextBold && boldMatch) {
      parts.push(
        <strong key={key++} className="font-semibold text-[#f0f0f5]">
          {boldMatch[1]}
        </strong>,
      )
      remaining = remaining.slice(next + boldMatch[0].length)
    } else if (italicMatch) {
      parts.push(
        <em key={key++} className="italic text-[#f0f0f5]">
          {italicMatch[1]}
        </em>,
      )
      remaining = remaining.slice(next + italicMatch[0].length)
    }
  }
  return parts
}

export function ArticleSection({ article }: { article: ArticleData }) {
  const toc =
    article.toc ??
    article.sections
      .filter((s) => s.heading)
      .map((s) => ({ id: slugify(s.heading ?? ''), label: s.heading ?? '' }))

  return (
    <article className="mt-12 overflow-hidden rounded-2xl border border-[#1e1e2a] bg-[#16161f]">
      {/* Header */}
      <header className="border-b border-[#1e1e2a] bg-[#111118] p-6 sm:p-8">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#00d4aa]">
          <BookOpen className="size-3.5" aria-hidden="true" />
          Bài viết đánh giá
        </div>
        <h2 className="text-balance text-2xl font-bold leading-tight text-[#f0f0f5] sm:text-3xl">
          {article.title}
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#55556a]">
          {article.author && (
            <span className="flex items-center gap-1.5">
              <UserIcon className="size-3.5" aria-hidden="true" />
              <span className="text-[#8888a0]">{article.author}</span>
            </span>
          )}
          {article.publishDate && (
            <time dateTime={article.publishDate}>
              {new Date(article.publishDate).toLocaleDateString('vi-VN')}
            </time>
          )}
          {article.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {article.readTime} phút đọc
            </span>
          )}
        </div>
      </header>

      <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
        {/* Table of contents (sticky) */}
        {toc.length > 1 && (
          <nav
            aria-label="Mục lục"
            className="border-b border-[#1e1e2a] bg-[#111118] p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:border-b-0 lg:border-r"
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#55556a]">
              Mục lục
            </p>
            <ol className="space-y-2">
              {toc.map((item, i) => (
                <li key={item.id} className="text-sm">
                  <a
                    href={`#${item.id}`}
                    className="block text-[#8888a0] transition-colors hover:text-[#00d4aa]"
                  >
                    <span className="mr-2 font-[JetBrains_Mono,Fira_Code,ui-monospace] text-[#55556a]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Body */}
        <div className="p-6 sm:p-8">
          {article.sections.map((section, i) => {
            const id = section.heading ? slugify(section.heading) : undefined
            return (
              <section key={i} id={id} className={i > 0 ? 'mt-10' : undefined}>
                {section.heading && (
                  <h3 className="mb-3 text-lg font-bold text-[#f0f0f5] sm:text-xl">
                    {section.heading}
                  </h3>
                )}
                {renderMarkdown(section.content)}
                {section.images && section.images.length > 0 && (
                  <div className="my-5 grid gap-3 sm:grid-cols-2">
                    {section.images.map((src, j) => (
                      <div
                        key={j}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1e1e2a] bg-[#0a0a0f]"
                      >
                        <Image
                          src={src}
                          alt={`${article.title} - ${section.heading ?? 'ảnh'} ${j + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </article>
  )
}