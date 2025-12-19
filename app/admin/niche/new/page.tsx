import { createNiche } from '@/app/actions';
import NicheForm from '@/components/admin/NicheForm';

export default function NewNichePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Niche</h1>
            <NicheForm action={createNiche} />
        </div>
    );
}
