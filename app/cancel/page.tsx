import Link from 'next/link';

export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">Payment Cancelled</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    No worries. You haven&apos;t been charged.
                </p>
                <Link href="/premium" className="text-blue-600 hover:underline">
                    Return to Premium Page
                </Link>
            </div>
        </div>
    );
}
