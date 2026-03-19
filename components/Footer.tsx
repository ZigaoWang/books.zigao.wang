export default function Footer() {
  return (
    <footer className="border-t border-stone-100 dark:border-dark-border mt-16">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 dark:text-stone-500">
        <span>Built by Zigao</span>
        <div className="flex items-center gap-4">
          <a
            href="https://zigao.wang"
            target="_blank"
            rel="noopener noreferrer"
          >
            zigao.wang
          </a>
          <a
            href="https://github.com/ZigaoWang"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
