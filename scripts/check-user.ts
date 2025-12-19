import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkPremiumStatus() {
    const email = 'legotaitemeida@gmail.com';

    console.log('🔍 Checking premium status for:', email);

    const user = await prisma.user.findUnique({
        where: { email },
        select: { email: true, name: true, isPremium: true, isAdmin: true }
    });

    if (user) {
        console.log('✅ User found:');
        console.log('   Email:', user.email);
        console.log('   Name:', user.name);
        console.log('   isPremium:', user.isPremium);
        console.log('   isAdmin:', user.isAdmin);
    } else {
        console.log('❌ User not found');
    }
}

checkPremiumStatus()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
