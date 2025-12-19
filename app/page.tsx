import { Niche } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import TrendingSection from '@/components/TrendingSection';
import NicheCard from '@/components/NicheCard';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isPremium = session?.user?.isPremium === true;

  console.log('🏠 Homepage - Session:', {
    email: session?.user?.email,
    isPremium: session?.user?.isPremium,
    calculatedIsPremium: isPremium
  });

  const topNiches = await prisma.niche.findMany({
    take: 50,
    orderBy: { trendScore: 'desc' }
  });

  const trendingNiches = await prisma.niche.findMany({
    where: { isTrending: true },
    take: 8,
    orderBy: { trendScore: 'desc' }
  });

  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navbar />
      <Hero />

      <TrendingSection niches={trendingNiches} isPremium={isPremium} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Top 50 Faceless Niches</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Curated, researched, and ranked by revenue potential.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topNiches.map((niche: Niche) => (
            <NicheCard key={niche.id} niche={niche} isPremium={isPremium} />
          ))}
        </div>
      </section>

      <Testimonials />
      <FAQ />

      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
        </div>
        <p>© 2025 Niche Vault. All rights reserved.</p>

        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400">Payments Secured by</p>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 select-none opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-bold text-gray-800 dark:text-white tracking-tight">stripe</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
