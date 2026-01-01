'use client';

import { useState } from 'react';

export default function SetupPage() {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const runReset = async () => {
        if (!confirm('RESET ALL CONTENT? This will delete existing niches and seed fresh 2026 data.')) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/admin/reset-niches', { method: 'POST' });
            if (!res.ok) throw new Error('Reset failed');
            const data = await res.json();
            setStatus('success');
            setMessage(`Success! Created ${data.count} niches.`);
        } catch (e) {
            setStatus('error');
            setMessage('Error: ' + (e as Error).message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">Setup / Reset Content</h1>
                <p className="text-gray-600 mb-8">
                    Use this button to seed the database with the latest 2026 content.
                    <br />
                    <span className="text-sm text-red-500 font-bold">Warning: Wipes existing niches.</span>
                </p>

                {status === 'loading' && (
                    <div className="animate-pulse bg-blue-100 text-blue-700 p-4 rounded mb-4">
                        Resetting database... please wait...
                    </div>
                )}

                {status === 'success' && (
                    <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                        ✅ {message}
                        <br />
                        <a href="/" className="underline font-bold mt-2 block">Go to Homepage</a>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                        ❌ {message}
                    </div>
                )}

                <button
                    onClick={runReset}
                    disabled={status === 'loading'}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md disabled:opacity-50"
                >
                    {status === 'loading' ? 'Processing...' : 'RESET CONTENT NOW'}
                </button>
            </div>
        </div>
    );
}
