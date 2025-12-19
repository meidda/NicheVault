import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXTAUTH_URL || 'https://nichevault.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/api/stripe'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
