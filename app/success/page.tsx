'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
    const { data: session, update } = useSession();
    const [attempts, setAttempts] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Stop polling if already premium or reached max attempts
        if (session?.user?.isPremium || attempts >= 5) return;

        const pollSession = async () => {
            console.log(`Polling session status... Attempt ${attempts + 1}`);
            await update();
            setAttempts((prev: number) => prev + 1);
        };

        const timer = setTimeout(pollSession, 2000);
        return () => clearTimeout(timer);
    }, [session?.user?.isPremium, attempts, update]);

    const isPending = !session?.user?.isPremium && attempts < 5;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto transition-all duration-500 scale-110 shadow-lg">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold">
                    {session?.user?.isPremium ? "Upgrade Complete!" : "Finalizing your Upgrade..."}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    {session?.user?.isPremium
                        ? "Thank you for your purchase! Your account is now active with Lifetime Premium access."
                        : "We're verifying your payment with Stripe. This usually takes just a few seconds..."}
                </p>

                {session?.user?.isPremium ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-bold animate-pulse">
                        ⭐ Premium Status Active
                    </div>
                ) : attempts >= 5 ? (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm">
                        <p className="font-bold">Syncing is taking longer than usual.</p>
                        <p className="mt-1">Don't worry, your payment was received. Please try refreshing the home page in a minute.</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Connecting to Stripe...
                    </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full inline-block hover:opacity-90 transition-opacity min-w-[200px]">
                        {session?.user?.isPremium ? "Start Exploring" : "Go to Homepage"}
                    </Link>
                    {attempts >= 5 && (
                        <button
                            onClick={() => window.location.reload()}
                            className="text-sm text-gray-500 hover:text-black dark:hover:text-white underline"
                        >
                            Try refreshing now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
