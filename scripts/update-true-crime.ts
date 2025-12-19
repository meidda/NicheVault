import { prisma } from '@/lib/prisma';

async function updateTrueCrimeNiche() {
    console.log('🔧 Updating True Crime Documentaries niche with premium content...\n');

    // Find the niche by slug or name
    const niche = await prisma.niche.findFirst({
        where: {
            OR: [
                { slug: 'true-crime-documentaries' },
                { name: { contains: 'True Crime' } }
            ]
        }
    });

    if (!niche) {
        console.log('❌ True Crime Documentaries niche not found. Creating it...');

        const newNiche = await prisma.niche.create({
            data: {
                name: 'True Crime Documentaries',
                slug: 'true-crime-documentaries',
                category: 'Documentary',
                description: 'Create compelling true crime documentaries about real criminal cases, mysteries, and investigations.',
                difficulty: 'Medium-Hard',
                revenueEstimate: '$6,000-$50,000/month',
                cpmEstimate: '$4-$12',
                trendScore: 92,
                isTrending: true,
                premiumOnly: true,

                // Premium content
                detailedExplanation: 'True crime documentary channels create long-form or short-form videos about real criminal cases, solved or unsolved mysteries, psychological profiles, investigations, and forensic breakdowns. Viewers love the suspense, storytelling, and "real-life movie" vibe. This niche combines investigative journalism with cinematic storytelling.',

                contentStyle: '✔️ Smooth, calm narration (AI or human)\n✔️ Slow zooms & pan effects\n✔️ Crime scene photos (copyright-free sources)\n✔️ Courtroom footage\n✔️ Case timeline graphics\n✔️ Subtle background music\n✔️ Professional transitions',

                monetizationStrategy: 'High RPM ($4–$12) on YouTube due to high retention. Strong ad revenue potential with sponsors like VPNs, mystery boxes, and cybersecurity tools. Evergreen content means old cases continue generating views years later.',

                estimatedRevenue: 'Beginner (1–2 videos/week): $1,500–$6,000/month\nIntermediate (3 videos/week): $6,000–$18,000/month\nTop-tier editors: $20,000–$50,000/month',

                equipmentNeeded: '• ElevenLabs for AI voiceovers\n• ChatGPT/Claude for scriptwriting\n• Runway/Pika for B-roll generation\n• DaVinci Resolve (free) for professional editing\n• Stock photo subscriptions for crime scene imagery',

                videoIdeas: JSON.stringify([
                    'Case timeline deep dives',
                    'Missing person investigations',
                    'Solved cases with unexpected twists',
                    'Criminal psychology breakdowns',
                    '"What really happened..." series',
                    'Unsolved mysteries analysis',
                    'Forensic evidence breakdowns',
                    'Cold case updates',
                    'Serial killer profiles',
                    'Wrongful conviction stories'
                ]),

                growthTips: '1. Use compelling thumbnails similar to Netflix documentary covers\n2. Include Case Name + Year in titles for SEO\n3. Post consistently (2–3 videos/week)\n4. Build series formats - viewers love multi-part stories\n5. Avoid graphic violence to stay advertiser-friendly\n6. Engage with true crime community\n7. Create case update videos for ongoing stories\n8. Use storytelling hooks in first 10 seconds',

                whyItWorks: 'True crime is one of YouTube\'s fastest-growing evergreen categories. The combination of high retention rates, curiosity-driven storytelling, and endless content supply (both new and historical cases) makes it incredibly profitable. The niche benefits from:\n\n• High viewer engagement and watch time\n• Strong RPM due to mature audience\n• Evergreen content that generates views for years\n• Easy to batch-produce scripts\n• Growing audience demand\n• Multiple monetization opportunities',

                videoStructure: 'Hook (0–10 sec): "This case shocked investigators..."\nBackground: Introduce victim(s) and setting\nTimeline: Chronological retelling\nEvidence: Photos, police reports, interviews\nResolution/Mystery: What is still unknown?\nOutro: Encourage engagement, not sensationalism',

                howToCreate: 'Research thoroughly using public records, news archives, and court documents. Write compelling scripts with narrative structure. Use AI voiceover tools for professional narration. Edit with slow zooms, timeline graphics, and atmospheric music. Ensure all imagery is copyright-free or properly licensed.',

                monetization: 'Primary: YouTube AdSense ($4-12 RPM)\nSecondary: Sponsorships (VPNs, security tools)\nTertiary: Merchandise, Patreon for exclusive content\nAffiliate: True crime books, documentary streaming services',

                equipment: 'Software: DaVinci Resolve, Adobe Premiere\nVoice: ElevenLabs, Descript\nAI Tools: ChatGPT for scripts, Midjourney for graphics\nStock: Envato Elements, Storyblocks\nMusic: Epidemic Sound, Artlist',

                schedule: 'Recommended: 2-3 videos per week\nResearch: 2-3 days per video\nScript: 1 day\nEditing: 2-3 days\nBatch production recommended for efficiency'
            }
        });

        console.log('✅ Created True Crime Documentaries niche with full premium content!');
        console.log('   Slug:', newNiche.slug);
        console.log('   Premium:', newNiche.premiumOnly);

    } else {
        console.log('✅ Found existing niche:', niche.name);

        const updated = await prisma.niche.update({
            where: { id: niche.id },
            data: {
                detailedExplanation: 'True crime documentary channels create long-form or short-form videos about real criminal cases, solved or unsolved mysteries, psychological profiles, investigations, and forensic breakdowns. Viewers love the suspense, storytelling, and "real-life movie" vibe. This niche combines investigative journalism with cinematic storytelling.',

                contentStyle: '✔️ Smooth, calm narration (AI or human)\n✔️ Slow zooms & pan effects\n✔️ Crime scene photos (copyright-free sources)\n✔️ Courtroom footage\n✔️ Case timeline graphics\n✔️ Subtle background music\n✔️ Professional transitions',

                monetizationStrategy: 'High RPM ($4–$12) on YouTube due to high retention. Strong ad revenue potential with sponsors like VPNs, mystery boxes, and cybersecurity tools. Evergreen content means old cases continue generating views years later.',

                estimatedRevenue: 'Beginner (1–2 videos/week): $1,500–$6,000/month\nIntermediate (3 videos/week): $6,000–$18,000/month\nTop-tier editors: $20,000–$50,000/month',

                equipmentNeeded: '• ElevenLabs for AI voiceovers\n• ChatGPT/Claude for scriptwriting\n• Runway/Pika for B-roll generation\n• DaVinci Resolve (free) for professional editing\n• Stock photo subscriptions for crime scene imagery',

                videoIdeas: JSON.stringify([
                    'Case timeline deep dives',
                    'Missing person investigations',
                    'Solved cases with unexpected twists',
                    'Criminal psychology breakdowns',
                    '"What really happened..." series',
                    'Unsolved mysteries analysis',
                    'Forensic evidence breakdowns',
                    'Cold case updates',
                    'Serial killer profiles',
                    'Wrongful conviction stories'
                ]),

                growthTips: '1. Use compelling thumbnails similar to Netflix documentary covers\n2. Include Case Name + Year in titles for SEO\n3. Post consistently (2–3 videos/week)\n4. Build series formats - viewers love multi-part stories\n5. Avoid graphic violence to stay advertiser-friendly\n6. Engage with true crime community\n7. Create case update videos for ongoing stories\n8. Use storytelling hooks in first 10 seconds',

                whyItWorks: 'True crime is one of YouTube\'s fastest-growing evergreen categories. The combination of high retention rates, curiosity-driven storytelling, and endless content supply (both new and historical cases) makes it incredibly profitable. The niche benefits from:\n\n• High viewer engagement and watch time\n• Strong RPM due to mature audience\n• Evergreen content that generates views for years\n• Easy to batch-produce scripts\n• Growing audience demand\n• Multiple monetization opportunities',
            }
        });

        console.log('✅ Updated with premium content!');
        console.log('   ID:', updated.id);
        console.log('   Slug:', updated.slug);
    }

    console.log('\n✨ Done! Premium content is now available for True Crime Documentaries niche.');
}

updateTrueCrimeNiche()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
