'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createNiche(formData: FormData) {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const difficulty = formData.get('difficulty') as string;
    const revenueEstimate = formData.get('revenueEstimate') as string;
    const isTrending = formData.get('isTrending') === 'on';
    const premiumOnly = formData.get('premiumOnly') === 'on';

    const videoStructure = formData.get('videoStructure') as string;
    const monetization = formData.get('monetization') as string;
    const equipment = formData.get('equipment') as string;
    const schedule = formData.get('schedule') as string;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    await prisma.niche.create({
        data: {
            name,
            slug,
            category,
            description,
            difficulty,
            revenueEstimate,
            isTrending,
            premiumOnly,
            videoStructure,
            monetization,
            equipment,
            schedule
        }
    });

    revalidatePath('/');
    revalidatePath('/admin');
    redirect('/admin');
}

export async function updateNiche(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const difficulty = formData.get('difficulty') as string;
    const revenueEstimate = formData.get('revenueEstimate') as string;
    const isTrending = formData.get('isTrending') === 'on';
    const premiumOnly = formData.get('premiumOnly') === 'on';

    const videoStructure = formData.get('videoStructure') as string;
    const monetization = formData.get('monetization') as string;
    const equipment = formData.get('equipment') as string;
    const schedule = formData.get('schedule') as string;

    await prisma.niche.update({
        where: { id },
        data: {
            name,
            category,
            description,
            difficulty,
            revenueEstimate,
            isTrending,
            premiumOnly,
            videoStructure,
            monetization,
            equipment,
            schedule
        }
    });

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/niche/${id}`); // Assuming slug didn't change, or need to handle slug
    redirect('/admin');
}

export async function deleteNiche(id: string) {
    await prisma.niche.delete({ where: { id } });
    revalidatePath('/admin');
}

export async function forceUpgrade(email: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin && session?.user?.email !== email) {
        throw new Error('Unauthorized');
    }

    await prisma.user.update({
        where: { email },
        data: { isPremium: true }
    });

    revalidatePath('/');
    revalidatePath('/debug');
    revalidatePath('/premium');
}

