export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-[5px] overflow-hidden">
      <div
        className="h-full bg-neutral-400 dark:bg-neutral-500 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}
