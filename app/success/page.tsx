'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
    const { data: session, update } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Refresh the session to get updated isPremium status
        const refreshSession = async () => {
            await update();
            router.refresh();
        };

        // Wait a moment for webhook to process, then refresh
        const timer = setTimeout(refreshSession, 2000);
        return () => clearTimeout(timer);
    }, [update, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold">You&apos;re in!</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Thank you for your purchase. Your account has been upgraded to Premium status. You now have lifetime access to all niche data.
                </p>
                {session?.user?.isPremium && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                        ✓ Premium Status Active
                    </div>
                )}
                <div className="pt-4">
                    <Link href="/" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full inline-block hover:opacity-90 transition-opacity">
                        Start Exploring
                    </Link>
                </div>
            </div>
        </div>
    );
}
