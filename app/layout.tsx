// app/layout.tsx
import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces-var',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-var',
})

export const metadata: Metadata = {
  title: 'Sahabat Insurance — Solusi Lengkap Perlindungan Asuransi Anda',
  description:
    'PT Asuransi Sahabat Artha Proteksi — Fitch Rated A(idn), Infobank Excellent 5 tahun berturut-turut, 20+ cabang di seluruh Indonesia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}
