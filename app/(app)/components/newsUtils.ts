export const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Community: { bg: '#EEF2FF', text: '#4F46E5' },
  Awards: { bg: '#DBEAFE', text: '#1D4ED8' },
  Training: { bg: '#DCFCE7', text: '#15803D' },
  Product: { bg: '#FEF3C7', text: '#B45309' },
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
