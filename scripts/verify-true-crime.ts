import { prisma } from '@/lib/prisma';

async function verifyTrueCrime() {
    const niche = await prisma.niche.findUnique({
        where: { slug: 'true-crime-documentaries' }
    });

    if (!niche) {
        console.log('❌ Niche not found');
        return;
    }

    console.log('✅ True Crime Documentaries Niche Data:\n');
    console.log('Name:', niche.name);
    console.log('Slug:', niche.slug);
    console.log('\n📊 Premium Content Status:');
    console.log('Detailed Explanation:', niche.detailedExplanation ? '✅ Present' : '❌ Missing');
    console.log('Content Style:', niche.contentStyle ? '✅ Present' : '❌ Missing');
    console.log('Monetization Strategy:', niche.monetizationStrategy ? '✅ Present' : '❌ Missing');
    console.log('Estimated Revenue:', niche.estimatedRevenue ? '✅ Present' : '❌ Missing');
    console.log('Equipment Needed:', niche.equipmentNeeded ? '✅ Present' : '❌ Missing');
    console.log('Video Ideas:', niche.videoIdeas ? '✅ Present' : '❌ Missing');
    console.log('Growth Tips:', niche.growthTips ? '✅ Present' : '❌ Missing');
    console.log('Why It Works:', niche.whyItWorks ? '✅ Present' : '❌ Missing');

    if (niche.videoIdeas) {
        console.log('\n🎬 Video Ideas:');
        const ideas = JSON.parse(niche.videoIdeas);
        ideas.forEach((idea: string, i: number) => {
            console.log(`  ${i + 1}. ${idea}`);
        });
    }
}

verifyTrueCrime()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
