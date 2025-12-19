'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-2"
            title="Logout"
        >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
        </button>
    );
}
