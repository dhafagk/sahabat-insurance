import { TAG_COLORS } from '../LatestNews'

interface TagPillProps {
  name: string
}

export default function TagPill({ name }: TagPillProps) {
  const colors = TAG_COLORS[name] ?? { bg: '#F1F5F9', text: '#64748B' }
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: colors.bg, color: colors.text }}
    >
      {name}
    </span>
  )
}
