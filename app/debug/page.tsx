'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DebugPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/debug')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Loading diagnostics...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">System Diagnostics</h1>
                    <Link href="/" className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                        Back to Home
                    </Link>
                </div>

                {/* Webhook Status */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold mb-4">Webhook Configuration</h2>
                    <div className={`p-4 rounded-lg ${data?.diagnosis?.webhookConfigured ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
                        <p className="font-bold">{data?.diagnosis?.message}</p>
                    </div>

                    {!data?.diagnosis?.webhookConfigured && (
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <h3 className="font-bold mb-2">How to Fix:</h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm">
                                <li>Open a new terminal</li>
                                <li>Run: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">stripe listen --forward-to localhost:3000/api/stripe/webhook</code></li>
                                <li>Copy the webhook secret (starts with whsec_)</li>
                                <li>Update .env file: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">STRIPE_WEBHOOK_SECRET="whsec_..."</code></li>
                                <li>Restart the dev server</li>
                            </ol>
                        </div>
                    )}
                </div>

                {/* Current Session */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold mb-4">Current Session</h2>
                    {data?.currentSession ? (
                        <div className="space-y-2">
                            <p><strong>Email:</strong> {data.currentSession.email}</p>
                            <p><strong>Name:</strong> {data.currentSession.name}</p>
                            <p><strong>Premium Status:</strong> <span className={data.currentSession.isPremium ? 'text-green-600 font-bold' : 'text-red-600'}>{data.currentSession.isPremium ? '✅ Premium' : '❌ Not Premium'}</span></p>
                            <p><strong>Admin:</strong> {data.currentSession.isAdmin ? 'Yes' : 'No'}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">Not logged in</p>
                    )}
                </div>

                {/* Environment Check */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
                    <div className="space-y-2">
                        {Object.entries(data?.environment || {}).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                                <span className={value ? 'text-green-600' : 'text-red-600'}>
                                    {value ? '✅' : '❌'}
                                </span>
                                <span className="font-mono text-sm">{key}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold mb-4">All Users ({data?.users?.length || 0})</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                    <th className="text-left p-2">Email</th>
                                    <th className="text-left p-2">Name</th>
                                    <th className="text-left p-2">Premium</th>
                                    <th className="text-left p-2">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.users?.map((user: any) => (
                                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.name || '-'}</td>
                                        <td className="p-2">
                                            <span className={user.isPremium ? 'text-green-600 font-bold' : 'text-gray-500'}>
                                                {user.isPremium ? '✅' : '❌'}
                                            </span>
                                        </td>
                                        <td className="p-2">{new Date(user.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
