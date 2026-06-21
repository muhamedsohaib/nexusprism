import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Cormorant_Garamond, Manrope, Noto_Sans_Arabic } from 'next/font/google'
import { AppShell } from '@/components/app-shell'
import { ThemeProvider } from '@/components/theme-provider'
import { site } from '@/lib/constants'
import './globals.css'
import './dotted-surface.css'
import './entry.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700']
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800']
})

const arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Nexus Prism | AI Commerce Operations for UAE Sellers',
    template: '%s | Nexus Prism'
  },
  description: site.description,
  openGraph: {
    title: 'Nexus Prism | AI Commerce Operations for UAE Sellers',
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
    locale: 'en_AE'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-AE" className={`${display.variable} ${sans.variable} ${arabic.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="page-noise" aria-hidden="true" />
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
