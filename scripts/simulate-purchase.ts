import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function simulatePurchase() {
    const testEmail = 'buyer@test.com';

    console.log('🧪 Simulating Stripe Purchase...\n');

    // Simulate what the webhook does
    console.log('Step 1: Creating/updating user with premium status...');
    const user = await prisma.user.upsert({
        where: { email: testEmail },
        update: {
            isPremium: true
        },
        create: {
            email: testEmail,
            name: 'Test Buyer',
            isPremium: true,
            password: await bcrypt.hash('test123', 10),
        },
    });

    console.log('✅ User created/updated:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Premium: ${user.isPremium}`);
    console.log(`   ID: ${user.id}\n`);

    console.log('🎉 Purchase simulation complete!\n');
    console.log('Now you can:');
    console.log('1. Go to http://localhost:3000/login');
    console.log(`2. Login with: ${testEmail} / test123`);
    console.log('3. Check if premium content is unlocked on homepage\n');
}

simulatePurchase()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
