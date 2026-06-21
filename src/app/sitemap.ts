import type { MetadataRoute } from 'next'
import { site } from '@/lib/constants'

const routes = ['', '/score', '/services', '/proof', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8
  }))
}
