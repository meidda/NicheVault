import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    // Create a test user with premium access
    const hashedPassword = await bcrypt.hash('test123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'test@premium.com' },
        update: {
            isPremium: true,
            password: hashedPassword
        },
        create: {
            email: 'test@premium.com',
            name: 'Premium Test User',
            password: hashedPassword,
            isPremium: true,
            isAdmin: false,
        },
    });

    console.log('✅ Test user created:');
    console.log('   Email: test@premium.com');
    console.log('   Password: test123');
    console.log('   Premium: true');
    console.log('\nYou can now:');
    console.log('1. Go to http://localhost:3000/login');
    console.log('2. Login with test@premium.com / test123');
    console.log('3. Check if premium content is unlocked');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
