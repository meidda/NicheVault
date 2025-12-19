
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDistribution() {
    const easy = await prisma.niche.count({ where: { difficulty: 'Easy' } });
    const medium = await prisma.niche.count({ where: { difficulty: 'Medium' } });
    const hard = await prisma.niche.count({ where: { difficulty: 'Hard' } });

    console.log('Difficulty Distribution:');
    console.log(`Easy: ${easy} (Target: 25)`);
    console.log(`Medium: ${medium} (Target: 15)`);
    console.log(`Hard: ${hard} (Target: 10)`);

    if (easy === 25 && medium === 15 && hard === 10) {
        console.log('✅ Distribution matches target.');
    } else {
        console.log('❌ Distribution mismatch.');
    }
}

checkDistribution()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
