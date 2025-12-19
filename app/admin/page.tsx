import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Edit, Trash, Plus } from 'lucide-react';
import { deleteNiche } from '@/app/actions';

export default async function AdminDashboard() {
    const niches = await prisma.niche.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Niches ({niches.length})</h1>
                <Link href="/admin/niche/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700">
                    <Plus className="w-4 h-4" /> Add Niche
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Premium</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {niches.map((niche) => (
                            <tr key={niche.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{niche.name}</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{niche.category}</td>
                                <td className="px-6 py-4">
                                    {niche.isTrending && (
                                        <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs font-semibold">Trending</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {niche.premiumOnly ? (
                                        <span className="text-yellow-600 dark:text-yellow-400 text-xs font-semibold">Premium</span>
                                    ) : (
                                        <span className="text-gray-400 text-xs">Free</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/niche/${niche.id}`} className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <form action={deleteNiche.bind(null, niche.id)}>
                                            <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
