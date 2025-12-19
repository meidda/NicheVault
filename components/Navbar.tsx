'use client';
import Link from 'next/link';
import { Lock, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import LogoutButton from './LogoutButton';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                            <span className="text-white dark:text-black font-bold text-lg">YN</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight">NicheVault</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                <Link href="/admin" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{session.user?.name || 'Account'}</span>
                                </Link>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                    Log in
                                </Link>
                                <Link href="/register" className="text-sm font-medium px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                    Register
                                </Link>
                            </>
                        )}

                        <Link
                            href="/premium"
                            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg"
                        >
                            <Lock className="w-4 h-4" />
                            <span>Unlock Premium</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
