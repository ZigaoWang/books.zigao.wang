import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/data/books'
import StarRating from './StarRating'

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="flex flex-col rounded-lg overflow-hidden bg-white dark:bg-dark-surface border border-stone-100 dark:border-dark-border shadow-book"
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
        />
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-serif font-medium text-sm leading-tight text-charcoal dark:text-stone-100 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{book.author}</p>
        {book.rating && (
          <div className="mt-auto pt-2">
            <StarRating rating={book.rating} />
          </div>
        )}
      </div>
    </Link>
  )
}
