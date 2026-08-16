import { MetadataRoute } from 'next';
import { getPosts, getTranslatedSlug } from '@/data/blog-posts';

const esServices = [
  'desarrollo-web-a-medida',
  'desarrollo-software',
  'diseno-ui-ux',
  'seo-optimizacion',
  'marketing-digital',
  'soporte-mantenimiento',
  'desarrollo-cms',
  'chatbots-ia',
  'automatizacion-procesos',
  'consultoria-tecnologica',
];

const enServices = [
  'custom-web-development',
  'custom-software-development',
  'ui-ux-design',
  'seo-optimization',
  'digital-marketing',
  'support-maintenance',
  'cms-development',
  'ai-chatbots',
  'process-automation',
  'tech-consulting',
];

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devmarkpe.com';

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios`,
          en: `${baseUrl}/en/services`,
        },
      },
    },
    {
      url: `${baseUrl}/hosting`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/hosting`,
          en: `${baseUrl}/en/hosting`,
        },
      },
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/portfolio`,
          en: `${baseUrl}/en/portfolio`,
        },
      },
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/contacto`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/quote`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/quote`,
          en: `${baseUrl}/en/quote`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/ai-assistant`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/ai-assistant`,
          en: `${baseUrl}/en/ai-assistant`,
        },
      },
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          es: `${baseUrl}/nosotros`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
  ];

  const esServiceRoutes: MetadataRoute.Sitemap = esServices.map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        es: `${baseUrl}/servicios/${slug}`,
        en: `${baseUrl}/en/services/${esServices.indexOf(slug) > -1 ? enServices[esServices.indexOf(slug)] : slug}`,
      },
    },
  }));

  const enServiceRoutes: MetadataRoute.Sitemap = enServices.map((slug) => ({
    url: `${baseUrl}/en/services/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        es: `${baseUrl}/servicios/${esServices[enServices.indexOf(slug)] ?? ''}`,
        en: `${baseUrl}/en/services/${slug}`,
      },
    },
  }));

  const enMainPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/servicios`,
          en: `${baseUrl}/en/services`,
        },
      },
    },
    {
      url: `${baseUrl}/en/hosting`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/hosting`,
          en: `${baseUrl}/en/hosting`,
        },
      },
    },
    {
      url: `${baseUrl}/en/portfolio`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/portfolio`,
          en: `${baseUrl}/en/portfolio`,
        },
      },
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/contacto`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/en/quote`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/quote`,
          en: `${baseUrl}/en/quote`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/en/ai-assistant`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/ai-assistant`,
          en: `${baseUrl}/en/ai-assistant`,
        },
      },
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          es: `${baseUrl}/nosotros`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
  ];

  const esPosts = getPosts('es');
  const enPosts = getPosts('en');

  const esBlogRoutes: MetadataRoute.Sitemap = esPosts.map((post) => {
    const enSlug = getTranslatedSlug(post.slug, 'es');
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: enSlug
        ? {
            languages: {
              es: `${baseUrl}/blog/${post.slug}`,
              en: `${baseUrl}/en/blog/${enSlug}`,
            },
          }
        : undefined,
    };
  });

  const enBlogRoutes: MetadataRoute.Sitemap = enPosts.map((post) => {
    const esSlug = getTranslatedSlug(post.slug, 'en');
    return {
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: esSlug
        ? {
            languages: {
              es: `${baseUrl}/blog/${esSlug}`,
              en: `${baseUrl}/en/blog/${post.slug}`,
            },
          }
        : undefined,
    };
  });

  return [
    ...mainPages,
    ...esServiceRoutes,
    ...esBlogRoutes,
    ...enMainPages,
    ...enServiceRoutes,
    ...enBlogRoutes,
  ];
}