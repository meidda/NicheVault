import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        const userId = session?.user?.id || null;
        const userEmail = session?.user?.email || null;

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'NicheVault Premium Lifetime Access',
                            description: 'Unlock 50+ Faceless YouTube Niches',
                        },
                        unit_amount: 2900,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
            customer_email: userEmail || undefined,
            metadata: {
                userId: userId,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Error', error }, { status: 500 });
    }
}
