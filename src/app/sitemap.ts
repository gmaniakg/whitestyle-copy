import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whitestyle.com';

  // 핵심 정적 라우트 (우선순위 최고)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/treatments`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/treatments/implant`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/treatments/orthodontics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/treatments/aesthetic`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/treatments/general`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/greeting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/doctors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about/tour`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/location`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/consult`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 추출된 포스트 및 상세 진료 페이지 동적 매핑
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    dynamicRoutes = posts.slice(0, 300).map((p) => {
      const filename = p.local_path.split('/').pop() ?? '';
      const fileId = filename.split('_')[0];
      const urlPath = p.type === 'static_page'
        ? `/treatments/${fileId}`
        : `/board/${p.type}/${fileId}`;

      return {
        url: `${baseUrl}${urlPath}`,
        lastModified: p.scraped_at ? new Date(p.scraped_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });
  } catch (err) {
    console.error('sitemap generation error:', err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
