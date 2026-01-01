
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// Logic is duplicated below to avoid import issues with seed.ts outside of app directory
// But first, let's try to just use the logic directly in the file to avoid import issues.

/* 
 * NOTE: Due to Vercel bundling, importing from 'prisma/seed.ts' (outside app) is risky.
 * I will implement a robust seed function here that uses the SAME data structure.
 */

import { expertNiches } from '@/prisma/data/niche_data'; // Corrected import path

export async function POST(req: Request) {
    try {
        console.log('🔄 Admin triggered NICHE RESET...');

        // Verify admin (optional but recommended, for now just open or basic check)
        // const session = await getServerSession(authOptions);
        // if (!session?.user?.isAdmin) return new NextResponse("Unauthorized", { status: 403 });

        // COPY OF SEED LOGIC
        // Clean existing data
        await prisma.niche.deleteMany();

        // 1. Define Basic Niches (Same as seed.ts)
        const basicNiches = [
            { name: 'Future Tech Predictions', category: 'Tech & AI' },
            { name: 'Cybersecurity Basics', category: 'Tech & AI' },
            { name: 'Smart Home Automation', category: 'Tech & AI' },
            { name: 'Retro Tech Restoration', category: 'Tech & AI' },
            { name: 'PC Building Guides', category: 'Tech & AI' },
            { name: 'Side Hustle Ideas', category: 'Finance & Wealth' },
            { name: 'Stock Market Recaps', category: 'Finance & Wealth' },
            { name: 'Frugal Living Tips', category: 'Finance & Wealth' },
            { name: 'Real Estate Investing', category: 'Finance & Wealth' },
            { name: 'Home Workout Routines', category: 'Health & Wellness' },
            { name: 'Meditation & Mindfulness', category: 'Health & Wellness' },
            { name: 'Healthy Meal Prep', category: 'Health & Wellness' },
            { name: 'Yoga for Beginners', category: 'Health & Wellness' },
            { name: 'Biohacking & Longevity', category: 'Health & Wellness' },
            { name: 'Psychology Facts', category: 'Psychology & Self-Improvement' },
            { name: 'Body Language Analysis', category: 'Psychology & Self-Improvement' },
            { name: 'Dark Psychology', category: 'Psychology & Self-Improvement' },
            { name: 'Productivity Hacks', category: 'Psychology & Self-Improvement' },
            { name: 'Unsolved Mysteries', category: 'History & Mystery' },
            { name: 'War History Battles', category: 'History & Mystery' },
            { name: 'Scary Stories / Creepypasta', category: 'History & Mystery' },
            { name: 'Luxury Cars & Jets', category: 'Luxury & Lifestyle' },
            { name: 'Travel Guides (Cinematic)', category: 'Luxury & Lifestyle' },
            { name: 'Tiny Homes & Van Life', category: 'Luxury & Lifestyle' },
            { name: 'Roblox Stories', category: 'Gaming & Entertainment' },
            { name: 'Gaming Lore & Theories', category: 'Gaming & Entertainment' },
            { name: 'Speedrunning History', category: 'Gaming & Entertainment' },
            { name: 'Deep Sea Creatures', category: 'Nature & Relaxation' },
            { name: 'Space & Universe Facts', category: 'Nature & Relaxation' },
            { name: 'Life Hacks & DIY', category: 'Tech & AI' },
            { name: 'Satisfying Videos (ASMR)', category: 'Health & Wellness' },
            { name: 'Celebrity News & Drama', category: 'Gaming & Entertainment' },
            { name: 'Top 10 Lists', category: 'History & Mystery' },
            { name: 'Quiz & Trivia', category: 'Game & Entertainment' },
            { name: 'Animal Facts', category: 'Nature & Relaxation' },
            { name: 'Motivation Compilations', category: 'Psychology & Self-Improvement' },
            { name: 'Business Case Studies', category: 'Finance & Wealth' },
            { name: 'Coding Tutorials (ASMR)', category: 'Tech & AI' },
            { name: 'Minimalist Desk Setups', category: 'Tech & AI' },
            { name: 'Digital Marketing 101', category: 'Finance & Wealth' },
            { name: 'Instagram Growth Tips', category: 'Tech & AI' },
            { name: 'TikTok Trend Analysis', category: 'Tech & AI' },
            { name: 'Freelancing for Beginners', category: 'Finance & Wealth' },
            { name: 'Remote Work Jobs', category: 'Finance & Wealth' },
            { name: 'Email Marketing Guide', category: 'Tech & AI' },
            { name: 'Copywriting Masterclass', category: 'Finance & Wealth' }
        ];

        // Ensure expertNiches are imported or defined (import from file should work)

        const generateExpertContent = (name: string) => {
            return {
                description: `A systematic approach to building a "Faceless" channel in the **${name}** niche. Focus on high-retention editing and search-targeted scripts.`,
                detailedExplanation: `The **${name}** niche allows creators to build authority without showing their face. The audience is primarily looking for information, entertainment, or escapism. By focusing on high-quality visuals (stock footage, animation, or gameplay) and a clean voiceover, you can compete with major personalities.`,
                whyItWorks: `This niche consistently consistently attracts high search volume for "${name}" from viewers actively seeking information. It works perfectly for a faceless channel because the value is in the visual commentary and script, not the creator's appearance. Furthermore, it is highly scalable; once you generate revenue, you can easily outsource the scriptwriting and editing to build a content machine.`,
                contentStyle: `clean, fast-paced editing. Use B-roll to cover cuts. Voiceover should be authoritative but conversational.`,
                monetizationStrategy: `AdSense (Primary), Affiliate links in description, Sponsored segments from relevant brands.`,
                estimatedRevenue: `$3,000 - $10,000/mo`,
                difficulty: 'Medium',
                equipmentNeeded: `Mid-range PC, USB Microphone, Editing Software (CapCut/Premiere).`,
                videoIdeas: [
                    `${name} Explained in 10 Minutes`,
                    `The Truth About ${name}`,
                    `Top 5 Mistakes in ${name}`,
                    `How to Start ${name} in 2026`,
                    `The Future of ${name}`
                ],
                growthTips: `Focus on CTR (Click Through Rate). Your thumbnail must be better than the top result for your keyword. Post consistently.`
            }
        };

        const difficultyPool = [
            ...Array(25).fill('Easy'),
            ...Array(15).fill('Medium'),
            ...Array(10).fill('Hard')
        ];
        for (let i = difficultyPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [difficultyPool[i], difficultyPool[j]] = [difficultyPool[j], difficultyPool[i]];
        }

        const trendingPool = [
            ...Array(8).fill(true),
            ...Array(50 - 8).fill(false)
        ];
        for (let i = trendingPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [trendingPool[i], trendingPool[j]] = [trendingPool[j], trendingPool[i]];
        }

        const expertNames = new Set(expertNiches.map(n => n.name));
        const uniqueBasicNiches = basicNiches.filter(n => !expertNames.has(n.name));
        const allNichesToCreate = [];

        expertNiches.forEach(n => {
            allNichesToCreate.push({
                ...n,
                type: 'expert',
                videoIdeas: JSON.stringify(n.videoIdeas),
                tags: JSON.stringify(n.tags || [])
            });
        });

        const needed = 50 - allNichesToCreate.length;
        for (let i = 0; i < needed; i++) {
            const n = uniqueBasicNiches[i];
            if (!n) break;
            const content = generateExpertContent(n.name);
            const lower = Math.floor(Math.random() * 5) + 2;
            const upper = lower + Math.floor(Math.random() * 15) + 5;
            const revenueString = `$${lower},000 - $${upper},000/mo`;

            const keywords = [
                n.name.split(' ')[0],
                n.name.split(' ')[1] || n.category.split(' ')[0],
                n.category.split(' ')[0],
                "YoutubeGrowth",
                "ContentStrategy",
                "PassiveIncome",
                "Monetization",
                "ViralVideo"
            ].filter(Boolean);
            const tags = keywords.filter((item, index) => keywords.indexOf(item) === index);

            allNichesToCreate.push({
                name: n.name,
                category: n.category,
                trendScore: Math.floor(Math.random() * 20) + 70,
                isTrending: false,
                revenueEstimate: revenueString,
                cpmEstimate: "$5 - $15",
                description: content.description,
                detailedExplanation: content.detailedExplanation,
                whyItWorks: content.whyItWorks,
                contentStyle: content.contentStyle,
                monetizationStrategy: content.monetizationStrategy,
                estimatedRevenue: revenueString,
                difficulty: 'Medium',
                equipmentNeeded: content.equipmentNeeded,
                videoIdeas: JSON.stringify(content.videoIdeas),
                growthTips: content.growthTips,
                howToCreate: content.detailedExplanation,
                monetization: content.monetizationStrategy,
                equipment: content.equipmentNeeded,
                videoStructure: "Hook > Intro > Value > CTA",
                schedule: "Weekly",
                tags: JSON.stringify(tags),
                type: 'basic'
            });
        }

        for (let i = 0; i < allNichesToCreate.length; i++) {
            const niche = allNichesToCreate[i];
            const assignedDifficulty = difficultyPool[i];
            const assignedTrending = trendingPool[i];
            const slug = niche.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            await prisma.niche.create({
                data: {
                    name: niche.name,
                    slug,
                    category: niche.category,
                    trendScore: niche.trendScore,
                    isTrending: assignedTrending,
                    revenueEstimate: niche.revenueEstimate,
                    cpmEstimate: niche.cpmEstimate,
                    premiumOnly: true,
                    description: niche.description,
                    detailedExplanation: niche.detailedExplanation,
                    whyItWorks: niche.whyItWorks,
                    contentStyle: niche.contentStyle,
                    monetizationStrategy: niche.monetizationStrategy,
                    estimatedRevenue: niche.estimatedRevenue,
                    difficulty: assignedDifficulty,
                    equipmentNeeded: niche.equipmentNeeded,
                    videoIdeas: niche.videoIdeas,
                    growthTips: niche.growthTips,
                    howToCreate: niche.howToCreate || niche.detailedExplanation,
                    monetization: niche.monetization || niche.monetizationStrategy,
                    equipment: niche.equipment || niche.equipmentNeeded,
                    videoStructure: niche.videoStructure || "Hook > Intro > Value > CTA",
                    schedule: niche.schedule || "Weekly",
                    tags: niche.tags
                }
            })
        }

        return NextResponse.json({ success: true, count: allNichesToCreate.length });
    } catch (error) {
        console.error('Reset error:', error);
        return new NextResponse("Error resetting niches", { status: 500 });
    }
}
