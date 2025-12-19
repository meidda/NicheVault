import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        // Get all users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                isPremium: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        // Check environment variables
        const envCheck = {
            hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
            hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
            webhookSecretValid: !!process.env.STRIPE_WEBHOOK_SECRET && process.env.STRIPE_WEBHOOK_SECRET !== 'whsec_placeholder',
            webhookSecretIsPlaceholder: process.env.STRIPE_WEBHOOK_SECRET === 'whsec_placeholder',
            hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
            hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
            hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        };

        return NextResponse.json({
            currentSession: session ? {
                id: session.user?.id,
                email: session.user?.email,
                name: session.user?.name,
                isPremium: session.user?.isPremium,
                isAdmin: session.user?.isAdmin,
            } : null,
            users: users,
            environment: envCheck,
            diagnosis: {
                webhookConfigured: envCheck.webhookSecretValid,
                isPlaceholder: envCheck.webhookSecretIsPlaceholder,
                message: envCheck.webhookSecretIsPlaceholder
                    ? '🚨 CRITICAL: Your Webhook Secret is still set to the PLACEHOLDER value. You must replace it with the real key from Stripe.'
                    : !envCheck.webhookSecretValid
                        ? '⚠️ Webhook secret is missing. Check your Vercel Environment Variables.'
                        : '✅ Webhook secret is configured'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch debug info', details: error }, { status: 500 });
    }
}
