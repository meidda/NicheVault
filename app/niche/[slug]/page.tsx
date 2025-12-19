import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { Lock, CheckCircle, Video, Monitor, Clock, ArrowRight, DollarSign, Lightbulb, TrendingUp, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function NichePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    const niche = await prisma.niche.findUnique({
        where: { slug: slug }
    });

    if (!niche) {
        notFound();
    }

    const isPremiumUser = session?.user?.isPremium === true;
    const isLocked = niche.premiumOnly && !isPremiumUser;

    return (
        <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pb-20">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide mb-4">
                        {niche.category}
                    </span>
                    <h1 className={`text-4xl md:text-5xl font-extrabold ${isLocked ? 'blur-lg select-none' : ''}`}>
                        {isLocked ? "Hidden Niche Title" : niche.name}
                    </h1>
                    <div className="flex items-center justify-center gap-6 mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 flex-wrap">
                        <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Difficulty: {niche.difficulty}</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-green-600 dark:text-green-400">Est. Revenue: {niche.revenueEstimate}</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">Trend Score: {niche.trendScore}/100</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-12 grid gap-12">
                {/* Overview */}
                <section className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <div className="relative">
                        <p className={`text-lg leading-relaxed ${isLocked ? 'blur-md select-none' : ''}`}>
                            {isLocked
                                ? "This is a comprehensive breakdown of the niche, dealing with high-retention editing techniques, target audience analysis, and competitor gaps. Unlock premium to view the full detailed description tailored for 2025 growth."
                                : niche.description}
                        </p>
                        {isLocked && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <Link href="/premium" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
                                    <Lock className="w-5 h-5" />
                                    Unlock Premium Content
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Premium Content Sections - Only visible to premium users */}
                {isPremiumUser && (
                    <>
                        {/* Detailed Explanation */}
                        {niche.detailedExplanation && (
                            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-900">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Lightbulb className="w-6 h-6 text-blue-600" />
                                    Detailed Niche Explanation
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{niche.detailedExplanation}</p>
                            </section>
                        )}

                        {/* Why It Works */}
                        {niche.whyItWorks && (
                            <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-8 rounded-2xl border border-green-200 dark:border-green-900">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    Why This Niche Works
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{niche.whyItWorks}</p>
                            </section>
                        )}

                        {/* Content Style & Monetization */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {niche.contentStyle && (
                                <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-900">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <Video className="w-5 h-5 text-purple-600" />
                                        Recommended Content Style
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{niche.contentStyle}</p>
                                </div>
                            )}

                            {niche.monetizationStrategy && (
                                <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl border border-yellow-200 dark:border-yellow-900">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-yellow-600" />
                                        Monetization Strategy
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{niche.monetizationStrategy}</p>
                                </div>
                            )}
                        </div>

                        {/* Revenue & Equipment */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {niche.estimatedRevenue && (
                                <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-900">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                        Estimated Revenue Range
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{niche.estimatedRevenue}</p>
                                </div>
                            )}

                            {niche.equipmentNeeded && (
                                <div className="p-6 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <Monitor className="w-5 h-5 text-orange-600" />
                                        Equipment Needed
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">{niche.equipmentNeeded}</p>
                                </div>
                            )}
                        </div>

                        {/* Video Ideas */}
                        {niche.videoIdeas && (
                            <section className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 p-8 rounded-2xl border border-pink-200 dark:border-pink-900">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-pink-600" />
                                    Example Video Ideas
                                </h2>
                                <div className="space-y-2">
                                    {JSON.parse(niche.videoIdeas).map((idea: string | { title: string, type: string }, index: number) => {
                                        const isObject = typeof idea === 'object' && idea !== null;
                                        const title = isObject ? (idea as { title: string }).title : idea as string;
                                        const type = isObject ? (idea as { type: string }).type : null;

                                        return (
                                            <div key={index} className="flex items-start gap-3">
                                                <span className="inline-block w-6 h-6 rounded-full bg-pink-200 dark:bg-pink-900 text-pink-700 dark:text-pink-300 text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-gray-700 dark:text-gray-300 font-medium">{title}</p>
                                                    {type && (
                                                        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded border border-gray-200 dark:border-gray-700">
                                                            {type}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Growth Tips */}
                        {niche.growthTips && (
                            <section className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 p-8 rounded-2xl border border-cyan-200 dark:border-cyan-900">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Target className="w-6 h-6 text-cyan-600" />
                                    How to Grow Your Channel
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{niche.growthTips}</p>
                            </section>
                        )}

                        {/* SEO Keywords Section */}
                        {niche.tags && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                        KW
                                    </span>
                                    Best Keywords
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {JSON.parse(niche.tags).map((tag: string, i: number) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer select-all border border-gray-200 dark:border-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                                    Tip: Mix broad niche keywords with specific video topic keywords for best SEO results.
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Locked Premium Content Teaser */}
                {!isPremiumUser && (
                    <section className="relative p-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
                        <div className="blur-sm select-none space-y-4 mb-8">
                            <h3 className="text-xl font-bold">Premium Content Includes:</h3>
                            <ul className="space-y-2 text-left max-w-md mx-auto">
                                <li>✓ Detailed niche explanation & strategy</li>
                                <li>✓ Recommended content style & format</li>
                                <li>✓ Complete monetization strategy</li>
                                <li>✓ Estimated revenue ranges</li>
                                <li>✓ Required equipment & tools</li>
                                <li>✓ 10+ example video ideas</li>
                                <li>✓ Channel growth tactics</li>
                                <li>✓ Why this niche works in 2025</li>
                            </ul>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Link href="/premium" className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg rounded-full flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
                                <Lock className="w-6 h-6" />
                                Unlock All Premium Content
                            </Link>
                        </div>
                    </section>
                )}

                {/* Back to Home */}
                <div className="text-center pt-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        Back to All Niches
                    </Link>
                </div>
            </div>
        </main>
    );
}
