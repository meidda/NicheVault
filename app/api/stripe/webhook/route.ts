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
        const email = session.customer_details?.email || session.customer_email || session.metadata?.email;

        console.log(`🔔 Webhook: Processing ${event.type} for User:${userId} Email:${email}`);

        try {
            if (userId) {
                // Primary: update by ID
                await prisma.user.update({
                    where: { id: userId },
                    data: { isPremium: true },
                });
                console.log(`✅ Webhook: Updated user by ID: ${userId}`);
            } else if (email) {
                // Secondary fallback: update by Email
                await prisma.user.update({
                    where: { email: email },
                    data: { isPremium: true },
                });
                console.log(`✅ Webhook: Updated user by Email fallback: ${email}`);
            } else {
                console.error('❌ Webhook: Missing both userId and email in session data');
            }
        } catch (dbError) {
            console.error('❌ Webhook: Database update failed', dbError);

            // Final fallback if ID update failed but we have an email
            if (userId && email) {
                try {
                    await prisma.user.update({
                        where: { email: email },
                        data: { isPremium: true },
                    });
                    console.log(`✅ Webhook: Final fallback update by Email worked for: ${email}`);
                } catch (retryError) {
                    console.error('❌ Webhook: All update attempts failed');
                }
            }
        }
    }

    return NextResponse.json({ received: true });
}
