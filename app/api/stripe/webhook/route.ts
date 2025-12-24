import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
        return new NextResponse('Missing Stripe signature', { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error('❌ Stripe webhook signature verification failed', err);
        return new NextResponse('Invalid signature', { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const rawEmail = session.customer_details?.email || session.customer_email || session.metadata?.email;
        const normalizedEmail = rawEmail?.toLowerCase();
        const userId = session.metadata?.userId;

        console.log('🔔 STRIPE WEBHOOK: Received checkout.session.completed');
        console.log('📝 Raw Data:', {
            userId,
            rawEmail,
            normalizedEmail,
            sessionId: session.id
        });

        try {
            if (userId && userId !== 'null' && userId !== '') {
                console.log(`🔍 Searching for user by ID: ${userId}`);
                const userById = await prisma.user.findUnique({ where: { id: userId } });

                if (userById) {
                    await prisma.user.update({
                        where: { id: userId },
                        data: { isPremium: true }
                    });
                    console.log(`✅ SUCCESS: Updated user by ID: ${userId}`);
                    return NextResponse.json({ received: true, updated: 'id' });
                }
                console.log(`⚠️ User not found by ID: ${userId}, falling back to email...`);
            }

            if (normalizedEmail) {
                console.log(`🔍 Searching for user by Email: ${normalizedEmail}`);
                const userByEmail = await prisma.user.findUnique({
                    where: { email: normalizedEmail }
                });

                if (userByEmail) {
                    await prisma.user.update({
                        where: { id: userByEmail.id },
                        data: { isPremium: true }
                    });
                    console.log(`✅ SUCCESS: Updated user by Email: ${normalizedEmail}`);
                    return NextResponse.json({ received: true, updated: 'email' });
                }

                // Final creation step if user doesn't exist yet
                console.log(`🆕 User not found. Creating new premium user for: ${normalizedEmail}`);
                await prisma.user.upsert({
                    where: { email: normalizedEmail },
                    update: { isPremium: true },
                    create: {
                        email: normalizedEmail,
                        name: 'Premium User',
                        isPremium: true
                    }
                });
                console.log(`✅ SUCCESS: Upserted user with email ${normalizedEmail} to premium`);
            } else {
                console.error('❌ ERROR: No userId or email found in Stripe session metadata');
            }
        } catch (dbError) {
            console.error('❌ DATABASE ERROR in webhook:', dbError);
            return new NextResponse('Database error', { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
