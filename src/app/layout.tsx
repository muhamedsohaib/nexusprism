import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Cormorant_Garamond, Manrope, Noto_Sans_Arabic } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { site } from '@/lib/constants'
import './globals.css'
import './chrome-cleanup.css'

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark',
  viewportFit: 'cover'
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Nexus Prism | The AI Operating Layer for UAE Sellers',
    template: '%s | Nexus Prism'
  },
  description: site.description,
  openGraph: {
    title: 'Nexus Prism | The AI Operating Layer for UAE Sellers',
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
    <html lang="en-AE" className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <body>
        <div className="page-noise" aria-hidden="true" />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
