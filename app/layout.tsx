import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Zigao's Bookshelf",
    template: "%s — Zigao's Bookshelf",
  },
  description: "What I'm reading, what I've read, and what I think about them.",
  openGraph: {
    title: "Zigao's Bookshelf",
    description: "What I'm reading, what I've read, and what I think about them.",
    url: 'https://books.zigao.wang',
    siteName: "Zigao's Bookshelf",
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
