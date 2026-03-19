import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/data/books'
import ProgressBar from './ProgressBar'

export default function CurrentlyReading({ books }: { books: Book[] }) {
  if (books.length === 0) return null

  return (
    <section className="mb-16">
      <h2 className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-5">
        Currently Reading
      </h2>
      <div className="grid gap-6">
        {books.map((book) => (
          <Link
            key={book.slug}
            href={`/books/${book.slug}`}
            className="flex gap-6 p-5 rounded-lg bg-white dark:bg-dark-surface border border-stone-100 dark:border-dark-border shadow-book"
          >
            <div className="relative w-28 h-42 flex-shrink-0 rounded-md overflow-hidden shadow-book">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-medium text-charcoal dark:text-stone-100">
                {book.title}
              </h3>
              <p className="text-stone-400 dark:text-stone-500 text-sm mt-1">{book.author}</p>
              {book.oneLiner && (
                <p className="text-sm text-stone-400 dark:text-stone-500 mt-2 line-clamp-2">
                  {book.oneLiner}
                </p>
              )}
              {book.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 mb-1">
                    <span>{book.progress}% complete</span>
                  </div>
                  <ProgressBar progress={book.progress} />
                </div>
              )}
              {book.hasNotes && (
                <span className="inline-block mt-3 text-xs text-stone-400 dark:text-stone-500">
                  Read notes &rarr;
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
