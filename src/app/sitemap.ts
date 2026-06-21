import type { MetadataRoute } from 'next'
import { site } from '@/lib/constants'

const routes = ['', '/score', '/services', '/proof', '/contact'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : 0.8
  }))
}
