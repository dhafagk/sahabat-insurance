interface TimelineItem {
  date: string
  description: string
}

interface TimelineBlockProps {
  items: TimelineItem[]
}

export default function TimelineBlock({ items }: TimelineBlockProps) {
  return (
    <div className="py-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-6 relative">
          {/* Left column: number + dashed line */}
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center z-10">
              <span className="text-sm font-semibold text-blue-400">
                {index + 1}
              </span>
            </div>
            {index < items.length - 1 && (
              <div className="w-px flex-1 border-l-2 border-dashed border-slate-200 my-1" />
            )}
          </div>

          {/* Right column: content */}
          <div className="pb-10 pt-1 flex-1 min-w-0">
            <p className="text-base font-bold text-slate-800 mb-2">
              {item.date}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
