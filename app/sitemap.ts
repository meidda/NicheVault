import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const baseUrl = process.env.NEXTAUTH_URL || 'https://nichevault.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const niches = await prisma.niche.findMany({
        select: {
            slug: true
        }
    });

    const nicheUrls = niches.map((niche) => ({
        url: `${baseUrl}/niche/${niche.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...nicheUrls,
    ];
}
