'use client';

import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function ResetContentButton() {
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!confirm('Are you sure? This will DELETE ALL EXISTING NICHES and re-seed them from the source code. This cannot be undone.')) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/admin/reset-niches', { method: 'POST' });
            if (!res.ok) throw new Error('Failed to reset');
            alert('Content successfully reset to latest version!');
            window.location.reload();
        } catch (error) {
            alert('Error resetting content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleReset}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
            <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Resetting...' : 'Reset Content'}
        </button>
    );
}
