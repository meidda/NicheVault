'use client';

// Reuse form for create and edit to save time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NicheForm({ action, initialData }: { action: (formData: FormData) => void, initialData?: any }) {
    return (
        <form action={action} className="space-y-6 max-w-4xl bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Niche Name</label>
                    <input name="name" defaultValue={initialData?.name} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input name="category" defaultValue={initialData?.category} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <select name="difficulty" defaultValue={initialData?.difficulty} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Revenue Estimate</label>
                    <input name="revenueEstimate" defaultValue={initialData?.revenueEstimate} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" placeholder="$5k - $10k" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Description (Markdown supported)</label>
                <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Video Structure</label>
                    <textarea name="videoStructure" defaultValue={initialData?.videoStructure} rows={3} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Monetization</label>
                    <textarea name="monetization" defaultValue={initialData?.monetization} rows={3} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Equipment</label>
                    <textarea name="equipment" defaultValue={initialData?.equipment} rows={3} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Schedule</label>
                    <textarea name="schedule" defaultValue={initialData?.schedule} rows={3} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" />
                </div>
            </div>

            <div className="flex gap-6">
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="isTrending" defaultChecked={initialData?.isTrending} />
                    <span className="text-sm font-medium">Trending</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="premiumOnly" defaultChecked={initialData?.premiumOnly ?? true} />
                    <span className="text-sm font-medium">Premium Only</span>
                </label>
            </div>

            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition">
                Save Niche
            </button>
        </form>
    )
}
