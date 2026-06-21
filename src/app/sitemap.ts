import type { MetadataRoute } from 'next'
import { site } from '@/lib/constants'

const routes = ['', '/home', '/score', '/services', '/proof', '/contact'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/home' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : route === '/home' ? 0.95 : 0.8
  }))
}
