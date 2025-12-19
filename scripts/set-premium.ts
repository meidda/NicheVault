import { prisma } from '@/lib/prisma';

async function setPremium() {
    const email = 'legotaitemeida@gmail.com';

    console.log('🔧 Setting premium for:', email);

    const updated = await prisma.user.update({
        where: { email },
        data: { isPremium: true }
    });

    console.log('✅ Updated:');
    console.log('   Email:', updated.email);
    console.log('   isPremium:', updated.isPremium);
}

setPremium()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
