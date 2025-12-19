import Link from 'next/link';
import { Home, List, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black">
            <Navbar />
            <div className="pt-20 flex">
                <aside className="w-64 fixed h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:block">
                    <div className="p-6">
                        <h2 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Admin Panel</h2>
                        <nav className="space-y-2">
                            <Link href="/admin" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium">
                                <List className="w-5 h-5" />
                                All Niches
                            </Link>
                            <Link href="/admin/niche/new" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors">
                                <Plus className="w-5 h-5" />
                                Add New Niche
                            </Link>
                            <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors">
                                <Home className="w-5 h-5" />
                                View Site
                            </Link>
                        </nav>
                    </div>
                </aside>
                <main className="flex-1 md:ml-64 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
