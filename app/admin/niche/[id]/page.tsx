
import { updateNiche } from '@/app/actions';
import NicheForm from '@/components/admin/NicheForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditNichePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const niche = await prisma.niche.findUnique({ where: { id } });

    if (!niche) notFound();

    const updateAction = updateNiche.bind(null, niche.id);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Niche: {niche.name}</h1>
            <NicheForm action={updateAction} initialData={niche} />
        </div>
    );
}
