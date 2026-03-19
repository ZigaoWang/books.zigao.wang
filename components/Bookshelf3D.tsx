import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/data/books'

function BookOnShelf({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} className="book-cover block">
      <div className="relative w-[130px] h-[195px] sm:w-[150px] sm:h-[225px] md:w-[160px] md:h-[240px] rounded-[3px] overflow-hidden"
        style={{ boxShadow: '2px 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.1)' }}>
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>
      <div className="book-shadow" />
    </Link>
  )
}

export default function Bookshelf3D({ books }: { books: Book[] }) {
  if (books.length === 0) return null

  const perRow = 6
  const rows: Book[][] = []
  for (let i = 0; i < books.length; i += perRow) {
    rows.push(books.slice(i, i + perRow))
  }

  return (
    <div className="w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="shelf-section">
          <div className="shelf-books">
            {row.map((book) => (
              <BookOnShelf key={book.slug} book={book} />
            ))}
          </div>
          <div className="shelf-plank" />
          <div className="h-10 md:h-14" />
        </div>
      ))}
    </div>
  )
}
