'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Lock } from 'lucide-react';

function PremiumContent() {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const isPremium = session?.user?.isPremium === true;

    const handleCheckout = async () => {
        if (!session) {
            // User not logged in - redirect to login with return URL
            router.push('/login?callbackUrl=/premium?checkout=true');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // Auto-redirect to checkout after login
    useEffect(() => {
        if (session && searchParams.get('checkout') === 'true') {
            handleCheckout();
        }
    }, [session, searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black mb-4">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                        Unlock Premium Access
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Get lifetime access to all 50+ faceless YouTube niches with detailed insights, revenue potential, and growth strategies.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                                $29
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">One-time payment • Lifetime access</div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {[
                                'Access to all 50+ premium niches',
                                'Detailed revenue potential analysis',
                                'Growth strategies and tips',
                                'Trending niche insights',
                                'Regular updates with new niches',
                                'No subscription, pay once forever'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {isPremium ? (
                            <div className="w-full max-w-sm mx-auto py-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full font-bold text-lg border border-green-200 dark:border-green-800 text-center">
                                You are already a Premium Member
                            </div>
                        ) : (
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full max-w-sm mx-auto block py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                            >
                                {loading ? 'Processing...' : 'Unlock Premium Content'}
                            </button>
                        )}

                        {!isPremium && (
                            <p className="mt-4 text-xs text-gray-500 text-center">
                                Secure payment via Stripe. Login required.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PremiumPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PremiumContent />
        </Suspense>
    );
}
