import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-cream/90 dark:bg-dark-bg/90 border-b border-stone-100 dark:border-dark-border">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        <Link href="/" className="font-serif text-base font-medium text-charcoal dark:text-stone-100">
          Zigao&apos;s Bookshelf
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="text-sm text-stone-400 dark:text-stone-500"
          >
            About
          </Link>
          <a
            href="https://zigao.wang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-400 dark:text-stone-500"
          >
            zigao.wang
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
