import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TextTools - AI Text Processing Tools',
  description: 'Kraftfulla AI-verktyg för att transformera, förbättra och arbeta med dina texter. Allt på ett ställe, enkelt och effektivt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>{children}</body>
    </html>
  )
}