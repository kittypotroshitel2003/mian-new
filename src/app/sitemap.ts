import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mian.ru';

// Статические страницы
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${baseUrl}/objects`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/construction`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/mortgage`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${baseUrl}/faq`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
];

// Динамические страницы объектов (id 1–3 из текущих данных)
const objectIds = [1, 2, 3];
const objectRoutes: MetadataRoute.Sitemap = objectIds.map((id) => ({
  url: `${baseUrl}/objects/${id}`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.8,
}));

// Динамические страницы хода строительства
const constructionIds = [1, 2, 3];
const constructionRoutes: MetadataRoute.Sitemap = constructionIds.map((id) => ({
  url: `${baseUrl}/construction/${id}`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.7,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...objectRoutes, ...constructionRoutes];
}
