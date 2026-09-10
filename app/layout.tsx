// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

// Подключаем Clash Display через CDN (Fontshare)
// Добавляем этот тег в head
export const metadata: Metadata = {
  title: 'Slava | Full-stack Developer',
  description: 'Разработка сложных веб-приложений.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Вставляем стили для Clash Display прямо сюда */}
        <link 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[var(--bg-color)] text-[var(--text-color)]`}>
        {children}
      </body>
    </html>
  )
}