'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { forceUpgrade } from '@/app/actions';

export default function DebugPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [upgrading, setUpgrading] = useState(false);

    const refreshReport = () => {
        setLoading(true);
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
    };

    useEffect(() => {
        refreshReport();
    }, []);

    const handleForceUpgrade = async () => {
        if (!data?.currentSession?.email) return;

        setUpgrading(true);
        try {
            await forceUpgrade(data.currentSession.email);
            alert('Success! Your account has been upgraded manually.');
            refreshReport();
        } catch (err) {
            console.error(err);
            alert('Failed to upgrade: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setUpgrading(false);
        }
    };

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Loading diagnostics...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Diagnostics</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={refreshReport}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:opacity-80 transition-opacity"
                        >
                            Refresh
                        </button>
                        <Link href="/" className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg">
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Emergency Control */}
                {data?.currentSession && !data.currentSession.isPremium && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-2">Emergency Bypass</h2>
                        <p className="text-blue-700 dark:text-blue-300 mb-4 text-sm">
                            If you have paid but your account is still red, use this button to manually unlock your premium access while we debug the Stripe connection.
                        </p>
                        <button
                            onClick={handleForceUpgrade}
                            disabled={upgrading}
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {upgrading ? 'Upgrading...' : 'Force Upgrade My Account'}
                        </button>
                    </div>
                )}

                {/* Webhook Status */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Webhook Configuration</h2>
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${data?.diagnosis?.webhookConfigured && !data?.diagnosis?.isPlaceholder ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
                        <span className="text-2xl">{data?.diagnosis?.webhookConfigured && !data?.diagnosis?.isPlaceholder ? '✅' : '❌'}</span>
                        <p className="font-bold">{data?.diagnosis?.message}</p>
                    </div>
                </div>

                {/* Current Session */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Current Session</h2>
                    {data?.currentSession ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">User ID (Database)</p>
                                <p className="font-mono bg-gray-50 dark:bg-gray-800 p-1.5 rounded border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white truncate">
                                    {data.currentSession.id}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Email Address</p>
                                <p className="font-medium text-gray-900 dark:text-white">{data.currentSession.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Premium Status</p>
                                <div className="flex items-center gap-2">
                                    <span className={data.currentSession.isPremium ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                                        {data.currentSession.isPremium ? '✅ ACTIVE' : '❌ INACTIVE'}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Admin Status</p>
                                <p className="text-gray-900 dark:text-white">{data.currentSession.isAdmin ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No active session found. Please log in.</p>
                    )}
                </div>

                {/* Environment Check */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Environment Variable Check</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(data?.environment || {}).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-100 dark:border-gray-700">
                                <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{key}</span>
                                <span className={value ? 'text-green-600' : 'text-red-600 font-bold'}>
                                    {value ? '✅ OK' : '❌ MISSING'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm overflow-hidden">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Database Users ({data?.users?.length || 0})</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="p-3 font-bold">User</th>
                                    <th className="p-3 font-bold">Premium</th>
                                    <th className="p-3 font-bold">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {((data as any)?.users || []).map((user: any) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="p-3">
                                            <div className="font-medium text-gray-900 dark:text-white">{user.name || 'Anonymous'}</div>
                                            <div className="text-gray-500 text-xs">{user.email}</div>
                                            <div className="text-[10px] font-mono text-gray-400 truncate max-w-[100px]">{user.id}</div>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.isPremium ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-500'}`}>
                                                {user.isPremium ? 'PREMIUM' : 'FREE'}
                                            </span>
                                        </td>
                                        <td className="p-3 text-xs text-gray-500">
                                            {new Date(user.updatedAt || user.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </td>
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

