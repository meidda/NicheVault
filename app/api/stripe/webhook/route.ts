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

        const email = session.customer_details?.email || session.customer_email;
        const userId = session.metadata?.userId;

        console.log('✅ Checkout completed');
        console.log('Email:', email);
        console.log('User ID:', userId);

        if (userId) {
            await prisma.user.update({
                where: { id: userId },
                data: { isPremium: true }
            });
            console.log(`✅ Success: Updated user ${userId} to premium`);
        } else if (email) {
            await prisma.user.upsert({
                where: { email },
                update: { isPremium: true },
                create: {
                    email,
                    name: 'Premium User',
                    isPremium: true
                }
            });
            console.log(`✅ Success: Upserted user with email ${email} to premium`);
        } else {
            console.error('❌ Error: No userId or email found in session');
        }
    }

    return NextResponse.json({ received: true });
}
