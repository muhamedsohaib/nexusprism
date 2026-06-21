import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Cormorant_Garamond, Manrope, Noto_Sans_Arabic } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import { site } from '@/lib/constants'
import './globals.css'
import './dotted-surface.css'

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
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
