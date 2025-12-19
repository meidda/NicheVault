import Link from 'next/link';
import { Lock, TrendingUp, DollarSign } from 'lucide-react';
import { Niche } from '@prisma/client';

export default function NicheCard({ niche, isPremium = false }: { niche: Niche; isPremium?: boolean }) {
    // Logic to determine badge color based on difficulty
    const difficultyColor =
        niche.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            niche.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';

    return (
        <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{niche.category}</span>
                        <h3 className={`text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors ${!isPremium && niche.premiumOnly ? 'blur-md select-none' : ''}`}>
                            {(!isPremium && niche.premiumOnly) ? "Hidden Niche Title" : niche.name}
                        </h3>
                    </div>
                    {niche.isTrending && (
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trend
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${difficultyColor}`}>
                        {niche.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                        <DollarSign className="w-3 h-3" />
                        {niche.revenueEstimate}
                    </span>
                </div>

                {/* Description Section with Blur/Lock */}
                <div className="relative mt-4">
                    <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed ${!isPremium ? 'blur-sm select-none' : ''}`}>
                        {isPremium ? niche.description : "This is a premium niche description that reveals the exact strategy, content ideas, and monetization methods. Unlock to read more."}
                    </p>

                    {!isPremium && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
                                <Lock className="w-4 h-4 text-gray-900 dark:text-white" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {!isPremium && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/10 dark:bg-gray-900/10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 dark:bg-white/5 backdrop-blur-[1px]">
                    <Link href={`/niche/${niche.slug}`} className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        View Details
                    </Link>
                </div>
            )}

            {isPremium && (
                <Link href={`/niche/${niche.slug}`} className="absolute inset-0 z-10" />
            )}
        </div>
    );
}
