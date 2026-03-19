export type BookStatus = 'reading' | 'finished' | 'want-to-read'

export type Book = {
  slug: string
  title: string
  author: string
  cover: string
  status: BookStatus
  rating?: number
  dateStarted?: string
  dateFinished?: string
  tags?: string[]
  progress?: number
  paused?: boolean
  amazonUrl?: string
  oneLiner?: string
  hasNotes: boolean
}

export const books: Book[] = [
  {
    slug: 'steve-jobs',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    cover: '/covers/steve-jobs.jpg',
    status: 'reading',
    paused: true,
    tags: ['biography', 'apple', 'innovation'],
    hasNotes: false,
    oneLiner: 'The exclusive biography of the co-founder of Apple — brilliant, driven, and impossibly difficult',
    amazonUrl: 'https://www.amazon.com/Steve-Jobs-Walter-Isaacson/dp/1451648537',
  },
  {
    slug: 'essential-ideas-serenity',
    title: 'Essential Ideas: Serenity',
    author: 'The School of Life',
    cover: '/covers/essential-ideas-serenity.jpg',
    status: 'reading',
    paused: true,
    tags: ['calm', 'philosophy', 'mindfulness'],
    hasNotes: false,
    oneLiner: 'Key ideas on the art of serenity — how to fight off anxiety, find perspective, and build a less turbulent life',
  },
  {
    slug: 'the-cold-start-problem',
    title: 'The Cold Start Problem',
    author: 'Andrew Chen',
    cover: '/covers/the-cold-start-problem.jpg',
    status: 'reading',
    tags: ['startups', 'network-effects', 'growth'],
    hasNotes: false,
    oneLiner: 'How the biggest tech platforms solved the chicken-and-egg problem',
    amazonUrl: 'https://www.amazon.com/Cold-Start-Problem-Andrew-Chen/dp/0062969749',
  },
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: '/covers/atomic-habits.webp',
    status: 'want-to-read',
    tags: ['habits', 'self-improvement', 'psychology'],
    hasNotes: false,
    oneLiner: 'Tiny changes, remarkable results — the definitive guide to building good habits and breaking bad ones',
    amazonUrl: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
  },
  {
    slug: 'surrounded-by-idiots',
    title: 'Surrounded by Idiots',
    author: 'Thomas Erikson',
    cover: '/covers/surrounded-by-idiots.webp',
    status: 'want-to-read',
    tags: ['psychology', 'communication', 'behavior'],
    hasNotes: false,
    oneLiner: 'The four types of human behavior and how to effectively communicate with each',
    amazonUrl: 'https://www.amazon.com/Surrounded-Idiots-Behavior-Effectively-Communicate/dp/1250179947',
  },
  {
    slug: 'surrounded-by-psychopaths',
    title: 'Surrounded by Psychopaths',
    author: 'Thomas Erikson',
    cover: '/covers/surrounded-by-psychopaths.webp',
    status: 'want-to-read',
    tags: ['psychology', 'manipulation', 'behavior'],
    hasNotes: false,
    oneLiner: 'How to protect yourself from being manipulated and exploited in everyday life',
    amazonUrl: 'https://www.amazon.com/Surrounded-Psychopaths-Protect-Yourself-Manipulated/dp/1250816696',
  },
  {
    slug: 'the-mom-test',
    title: 'The Mom Test',
    author: 'Rob Fitzpatrick',
    cover: '/covers/the-mom-test.jpg',
    status: 'want-to-read',
    tags: ['startups', 'customer-development', 'product'],
    hasNotes: false,
    oneLiner: 'How to talk to customers and learn if your business is a good idea when everyone is lying to you',
    amazonUrl: 'https://www.amazon.com/Mom-Test-customers-business-everyone/dp/1492180742',
  },
]

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug)
}

export function getBooksByStatus(status: BookStatus): Book[] {
  return books.filter((b) => b.status === status)
}
