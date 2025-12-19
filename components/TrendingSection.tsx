import { Niche } from '@prisma/client';
import { TrendingUp, BarChart2, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function TrendingSection({ niches, isPremium = false }: { niches: Niche[], isPremium?: boolean }) {
    return (
        <section id="trends" className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Niches 🔥</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Niches with the highest viral potential right now.</p>
                    </div>
                    <Link href="/premium" className="text-blue-600 hover:underline font-medium">View all analytics &rarr;</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {niches.map((niche) => (
                        <Link key={niche.id} href={`/niche/${niche.slug}`} className="block group">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors shadow-sm hover:shadow-md">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
                                        {niche.category}
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                </div>

                                <h3 className={`font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1 ${!isPremium && niche.premiumOnly ? 'blur-md select-none' : ''}`}>
                                    {(!isPremium && niche.premiumOnly) ? "Hidden Title" : niche.name}
                                </h3>


                                <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-1"><BarChart2 className="w-3 h-3" /> CPM</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{niche.cpmEstimate}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Est. Rev</span>
                                        <span className="font-medium text-green-600 dark:text-green-400">{niche.revenueEstimate}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
