import { prisma } from '@/lib/prisma';

async function testPremiumUnlock() {
    console.log('🧪 Testing Premium Unlock Logic\n');

    // Check users in database
    const users = await prisma.user.findMany({
        select: { email: true, name: true, isPremium: true }
    });

    console.log('📊 Users in database:');
    users.forEach(user => {
        console.log(`  - ${user.email}: isPremium = ${user.isPremium}`);
    });

    if (users.length === 0) {
        console.log('⚠️  No users found in database!');
    }

    console.log('\n✅ Test complete');
}

testPremiumUnlock()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
