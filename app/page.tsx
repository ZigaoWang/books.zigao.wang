import { books } from '@/data/books'
import Link from 'next/link'
import StarRating from '@/components/StarRating'
import ProgressBar from '@/components/ProgressBar'
import ThemeToggle from '@/components/ThemeToggle'

function BookRow({ book, showProgress }: { book: typeof books[number]; showProgress?: boolean }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="group block"
    >
      <div className="flex gap-6 md:gap-8 items-start">
        <div className="book-hover-wrap relative inline-block flex-shrink-0 [perspective:1600px]">
          <div className="book-hover-shadow absolute -inset-x-3 -inset-y-2 rounded-[10px] bg-[rgba(32,20,10,0.08)] blur-xl opacity-70" />
          <div className="book-hover-body absolute inset-0 overflow-hidden rounded-sm">
            <div className="book-hover-page absolute inset-y-[2px] right-[1px] w-full rounded-sm border border-neutral-200/80 bg-white dark:bg-neutral-50" />
            <div className="book-hover-page absolute inset-y-[4px] right-[3px] w-full rounded-sm border border-neutral-200/70 bg-white dark:bg-neutral-100" />
            <div className="book-hover-page absolute inset-y-[6px] right-[6px] w-full rounded-sm border border-neutral-200/60 bg-[linear-gradient(180deg,#ffffff_0%,#f8f8f8_100%)]" />
          </div>
          <div
            className="book-hover-cover relative origin-left rounded-sm [transform-style:preserve-3d]"
          >
            <div className="book-hover-spine pointer-events-none absolute inset-y-[2px] left-[2px] w-[6px] rounded-l-sm" />
            <div className="book-hover-gloss pointer-events-none absolute inset-0 rounded-sm" />
            <img
              src={book.cover}
              alt={book.title}
              className="book-hover-image block h-auto max-h-[180px] w-auto max-w-[120px] rounded-sm md:max-h-[240px] md:max-w-[160px]"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1 pt-1 md:pt-3">
          <h3 className="font-serif text-[26px] md:text-[34px] leading-[1.15] font-medium">
            {book.title}
          </h3>
          <p className="text-[15px] md:text-[17px] text-neutral-400 dark:text-neutral-500 mt-1.5">
            {book.author}
          </p>
          {book.rating && (
            <div className="mt-3">
              <StarRating rating={book.rating} />
            </div>
          )}
          {!book.paused && showProgress && book.progress !== undefined && (
            <div className="mt-3 max-w-[200px]">
              <p className="text-[13px] text-neutral-400 dark:text-neutral-500 mb-2 tabular-nums">
                {book.progress}% complete
              </p>
              <ProgressBar progress={book.progress} />
            </div>
          )}
          {book.tags && book.tags.length > 0 && (
            <p className="text-[14px] italic text-neutral-400 dark:text-neutral-500 mt-3">
              {book.tags.join(', ')}
            </p>
          )}
          {book.oneLiner && (
            <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mt-2 leading-[1.6] line-clamp-2 max-w-xl">
              {book.oneLiner}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default async function HomePage() {
  const reading = books.filter((book) => book.status === 'reading' && !book.paused)
  const paused = books.filter((book) => book.status === 'reading' && book.paused)
  const finished = books.filter((book) => book.status === 'finished')
  const wantToRead = books.filter((book) => book.status === 'want-to-read')

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
      {/* ── Header ── */}
      <header className="pt-14 md:pt-20 pb-10 md:pb-12 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight">
            Zigao&apos;s Bookshelf
          </h1>
          <p className="text-[15px] text-neutral-400 dark:text-neutral-500 mt-2">
            {books.length} books &middot; reading, finished &amp; up next
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* ── About ── */}
      <section className="mb-16 md:mb-20 max-w-2xl">
        <p className="text-[15px] leading-[1.75] text-neutral-500 dark:text-neutral-400">
          Hey, welcome. I&apos;m Zigao, a high school student who doesn&apos;t have a ton of time
          for reading. I do about 30 minutes before sleep each night, plus whatever pockets
          of free time I can find throughout the day. Progress is slow.
        </p>
        <p className="text-[15px] leading-[1.75] text-neutral-500 dark:text-neutral-400 mt-4">
          When I finish a book, I write notes and reflections here. Reading is passive input,
          and research shows we forget about 50% of new information within an hour and up to
          70% within 24 hours (the Ebbinghaus forgetting curve). By writing summaries, revisiting
          ideas, and reflecting on what I read, I retain far more. It&apos;s a bit like the Feynman
          technique: if you can explain it simply, you actually understand it. The notes are as
          much for me as they are for anyone else, but you&apos;re welcome to read them too.
          If you want to chat about any of these books, feel free to reach out
          at{' '}
          <a
            href="https://zigao.wang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 dark:text-neutral-100 underline underline-offset-2"
          >
            zigao.wang
          </a>.
        </p>
      </section>

      {/* ── Currently Reading ── */}
      {reading.length > 0 && (
        <section className="mb-20">
          <h2 className="font-serif text-lg md:text-xl text-neutral-900 dark:text-neutral-100 mb-8">
            Currently Reading
          </h2>
          <div className="space-y-6">
            {reading.map((book) => (
              <BookRow key={book.slug} book={book} showProgress />
            ))}
          </div>
        </section>
      )}

      {/* ── Paused Midway ── */}
      {paused.length > 0 && (
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-lg md:text-xl text-neutral-900 dark:text-neutral-100">
              Paused Midway
            </h2>
            <span className="text-[13px] text-neutral-400 dark:text-neutral-500">
              {paused.length} books
            </span>
          </div>
          <div className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {paused.map((book) => (
              <div key={book.slug} className="py-6 first:pt-0 last:pb-0">
                <BookRow book={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Finished ── */}
      {finished.length > 0 && (
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-lg md:text-xl text-neutral-900 dark:text-neutral-100">
              Finished
            </h2>
            <span className="text-[13px] text-neutral-400 dark:text-neutral-500">
              {finished.length} books
            </span>
          </div>
          <div className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {finished.map((book) => (
              <div key={book.slug} className="py-6 first:pt-0 last:pb-0">
                <BookRow book={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Want to Read ── */}
      {wantToRead.length > 0 && (
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-lg md:text-xl text-neutral-900 dark:text-neutral-100">
              Want to Read
            </h2>
            <span className="text-[13px] text-neutral-400 dark:text-neutral-500">
              {wantToRead.length} books
            </span>
          </div>
          <div className="space-y-0 divide-y divide-neutral-100 dark:divide-neutral-800/60">
            {wantToRead.map((book) => (
              <div key={book.slug} className="py-6 first:pt-0 last:pb-0">
                <BookRow book={book} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 flex items-center justify-between">
        <p className="text-[13px] text-neutral-400 dark:text-neutral-500">
          <a
            href="https://zigao.wang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            Zigao Wang
          </a>
        </p>
        <p className="text-[13px] text-neutral-400 dark:text-neutral-500">
          &copy; 2026
        </p>
      </footer>
    </div>
  )
}
