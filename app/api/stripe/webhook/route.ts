import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: 'Webhook Error', error: message }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const email = session.customer_details?.email || session.customer_email;

        if (userId) {
            // Logged in user purchase
            await prisma.user.update({
                where: { id: userId },
                data: { isPremium: true },
            });
        } else if (email) {
            // Guest purchase -> Create or Update by Email
            // We upsert just to be safe, but mostly we expect to update if they registered but were logout, or create new.
            // Problem: If they create new, how do they set password? 
            // We will set a placeholder or no password (if next-auth handles that).
            // Better: Upsert.
            await prisma.user.upsert({
                where: { email: email },
                update: { isPremium: true },
                create: {
                    email: email,
                    name: session.customer_details?.name || 'Premium User',
                    isPremium: true,
                    // Minimal user record. They will need to "Forgot Password" or login with Google to claim fully if they didn't set a password.
                }
            });
        }
    }

    return NextResponse.json({ received: true });
}
