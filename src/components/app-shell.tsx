'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isEntry = pathname === '/'

  if (isEntry) {
    return <main>{children}</main>
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
