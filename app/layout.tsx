// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from './components/providers/LenisProvider'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: 'Slava | Full-stack Developer',
    template: '%s | Slava Portfolio' 
  },
  description: 'Full-stack разработчик из Бурятии. Next.js, React, Three.js. Превращаю хаос в сложные системы.', // Чуть конкретнее, чем просто "разработка приложений"
  openGraph: {
    title: 'Slava | Full-stack Developer',
    description: 'Портфолио разработчика. Next.js, React, Three.js, Docker.',
    url: 'https://твой-домен.vercel.app', 
    siteName: 'Slava Portfolio',
    locale: 'ru_RU',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico', 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>

        <link 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600&display=swap" 
          rel="stylesheet" 

        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[var(--bg-color)] text-[var(--text-color)]`}>
         <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}