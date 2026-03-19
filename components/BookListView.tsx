'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Book, BookStatus } from '@/data/books'
import StarRating from './StarRating'

type SortKey = 'title' | 'rating' | 'dateFinished'

const STATUS_LABELS: Record<BookStatus, string> = {
  reading: 'Reading',
  finished: 'Finished',
  'want-to-read': 'Want to Read',
}

export default function BookListView({ books }: { books: Book[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [filterStatus, setFilterStatus] = useState<BookStatus | 'all'>('all')
  const [filterTag, setFilterTag] = useState<string>('all')

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    books.forEach((b) => b.tags?.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [books])

  const filtered = useMemo(() => {
    let result = [...books]
    if (filterStatus !== 'all') {
      result = result.filter((b) => b.status === filterStatus)
    }
    if (filterTag !== 'all') {
      result = result.filter((b) => b.tags?.includes(filterTag))
    }
    result.sort((a, b) => {
      if (sortKey === 'title') return a.title.localeCompare(b.title)
      if (sortKey === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
      if (sortKey === 'dateFinished') {
        return (b.dateFinished ?? '').localeCompare(a.dateFinished ?? '')
      }
      return 0
    })
    return result
  }, [books, filterStatus, filterTag, sortKey])

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as BookStatus | 'all')}
          className="text-sm px-3 py-1.5 rounded border border-stone-200 dark:border-dark-border bg-white dark:bg-dark-surface text-charcoal dark:text-stone-200"
        >
          <option value="all">All statuses</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
          <option value="want-to-read">Want to Read</option>
        </select>

        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="text-sm px-3 py-1.5 rounded border border-stone-200 dark:border-dark-border bg-white dark:bg-dark-surface text-charcoal dark:text-stone-200"
        >
          <option value="all">All tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="text-sm px-3 py-1.5 rounded border border-stone-200 dark:border-dark-border bg-white dark:bg-dark-surface text-charcoal dark:text-stone-200"
        >
          <option value="title">Sort by title</option>
          <option value="rating">Sort by rating</option>
          <option value="dateFinished">Sort by date read</option>
        </select>
      </div>

      <div className="divide-y divide-stone-100 dark:divide-dark-border">
        {filtered.map((book) => (
          <Link
            key={book.slug}
            href={`/books/${book.slug}`}
            className="flex items-center gap-4 py-3"
          >
            <div className="relative w-10 h-14 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-charcoal dark:text-stone-100 truncate">
                {book.title}
              </h3>
              <p className="text-xs text-stone-400 dark:text-stone-500">{book.author}</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
              {STATUS_LABELS[book.status]}
            </span>
            {book.rating && (
              <div className="hidden sm:block">
                <StarRating rating={book.rating} />
              </div>
            )}
            {book.tags && book.tags.length > 0 && (
              <div className="hidden md:flex gap-1">
                {book.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
