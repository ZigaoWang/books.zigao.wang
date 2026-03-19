import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { books, getBookBySlug } from '@/data/books'
import { getBookMdxSource } from '@/lib/mdx'
import StarRating from '@/components/StarRating'
import ProgressBar from '@/components/ProgressBar'

export async function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) return { title: 'Book Not Found' }
  return {
    title: book.title,
    description: book.oneLiner || `${book.title} by ${book.author}`,
    openGraph: {
      title: `${book.title} — Zigao's Bookshelf`,
      description: book.oneLiner || `${book.title} by ${book.author}`,
    },
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) notFound()

  const mdxSource = book.hasNotes ? await getBookMdxSource(book.slug) : null

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-14">
      <Link
        href="/"
        className="inline-block text-[14px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-14"
      >
        &larr; Back to shelf
      </Link>

      <div className="flex flex-col md:flex-row gap-10 md:gap-14 mb-20">
        <div className="group book-hover-wrap relative inline-block mx-auto flex-shrink-0 [perspective:1600px] md:mx-0">
          <div className="book-hover-shadow absolute inset-x-2 bottom-[-10px] top-4 rounded-[999px] bg-black/10 blur-md opacity-35" />
          <div className="book-hover-body absolute inset-0 overflow-hidden rounded-sm">
            <div className="book-hover-page absolute inset-y-[2px] right-[1px] w-full rounded-sm bg-white border border-neutral-200/80 shadow-[0_10px_24px_rgba(0,0,0,0.07)] dark:bg-neutral-50" />
            <div className="book-hover-page absolute inset-y-[4px] right-[3px] w-full rounded-sm bg-white border border-neutral-200/70 shadow-[0_8px_18px_rgba(0,0,0,0.05)] dark:bg-neutral-100" />
            <div className="book-hover-page absolute inset-y-[6px] right-[6px] w-full rounded-sm bg-[linear-gradient(180deg,#ffffff_0%,#f8f8f8_100%)] border border-neutral-200/60 shadow-[0_6px_14px_rgba(0,0,0,0.04)]" />
          </div>
          <div
            className="book-hover-cover relative origin-left rounded-sm [transform-style:preserve-3d]"
            style={{ boxShadow: '0 2px 8px rgba(32,20,10,0.08), 0 8px 18px rgba(32,20,10,0.08)' }}
          >
            <div className="book-hover-thickness pointer-events-none absolute inset-y-0 -right-[3px] w-[4px] rounded-r-[2px]" />
            <div className="book-hover-spine pointer-events-none absolute inset-y-[2px] left-[2px] w-[6px] rounded-l-sm" />
            <div className="book-hover-gloss pointer-events-none absolute inset-0 rounded-sm" />
            <img
              src={book.cover}
              alt={book.title}
              className="book-hover-image block h-auto max-h-[300px] w-auto max-w-[200px] rounded-sm md:max-h-[390px] md:max-w-[260px]"
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left pt-2">
          <h1 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-3">
            {book.title}
          </h1>
          <p className="text-lg text-neutral-400 dark:text-neutral-500 mb-6">
            {book.author}
          </p>

          {book.rating && (
            <div className="mb-6 flex justify-center md:justify-start">
              <StarRating rating={book.rating} />
            </div>
          )}

          {book.oneLiner && (
            <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-[1.7] mb-6 max-w-lg">
              {book.oneLiner}
            </p>
          )}

          {book.status === 'reading' && book.progress !== undefined && (
            <div className="max-w-[200px] mx-auto md:mx-0 mb-6">
              <p className="text-[13px] text-neutral-400 dark:text-neutral-500 mb-2">
                {book.progress}% complete
              </p>
              <ProgressBar progress={book.progress} />
            </div>
          )}

          <div className="text-[14px] text-neutral-400 dark:text-neutral-500 space-y-1 mb-6">
            {book.dateStarted && (
              <p>Started {new Date(book.dateStarted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            )}
            {book.dateFinished && (
              <p>Finished {new Date(book.dateFinished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            )}
          </div>

          {book.tags && book.tags.length > 0 && (
            <p className="text-[14px] italic text-neutral-400 dark:text-neutral-500 mb-6">
              {book.tags.join(', ')}
            </p>
          )}

          {book.amazonUrl && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[14px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors underline underline-offset-2"
            >
              View on Amazon
            </a>
          )}
        </div>
      </div>

      {mdxSource ? (
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-14">
          <h2 className="font-serif text-xl font-medium mb-8">
            My Notes
          </h2>
          <div className="prose-book max-w-2xl">
            <MDXRemote source={mdxSource} />
          </div>
        </div>
      ) : book.hasNotes ? (
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-14">
          <p className="text-neutral-400 dark:text-neutral-500 text-[14px] italic">Notes coming soon.</p>
        </div>
      ) : null}
    </div>
  )
}
