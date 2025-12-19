import { Star } from 'lucide-react';

const reviews = [
    {
        name: "James T.",
        location: "United States",
        title: "Finally found a profitable niche",
        content: "I've been trying to start a channel for 2 years. This list gave me an idea for 'AI Tool Tutorials' and my first video got 10k views.",
        rating: 5,
        date: "2 days ago"
    },
    {
        name: "Sarah K.",
        location: "United Kingdom",
        title: "Worth the money just for the strategy",
        content: "The niche list is great, but the premium strategy guides are the real value. The 'Faceless' tips for the True Crime niche changed my editing flow completely.",
        rating: 5,
        date: "1 week ago"
    },
    {
        name: "Michael R.",
        location: "Canada",
        title: "Accurate revenue estimates",
        content: "I run a small finance channel and the CPM estimates on Niche Vault are spot on. Good to know what to expect before jumping into a new topic.",
        rating: 5,
        date: "3 weeks ago"
    },
    {
        name: "David L.",
        location: "Germany",
        title: "Great for beginners",
        content: "I didn't want to show my face. The 'Faceless-First' focus of this platform is exactly what I needed. Highly recommended.",
        rating: 5,
        date: "1 month ago"
    }
];

export default function Testimonials() {
    return (
        <section className="bg-white dark:bg-gray-900 py-12 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What our users say</h2>
                        <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                            <span className="text-xl font-bold">Excellent</span>
                            <div className="flex bg-[#00b67a] p-1 rounded-sm">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-5 h-5 text-white fill-white border-none" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">
                                4.9 out of 5 based on 300+ reviews
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <span className="text-xs text-gray-400">Rated Excellent on Trustpilot</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`p-1 rounded-sm ${i < review.rating ? 'bg-[#00b67a]' : 'bg-gray-300'}`}>
                                        <Star className="w-3 h-3 text-white fill-white" />
                                    </div>
                                ))}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 line-clamp-1">
                                {review.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-4">
                                &quot;{review.content}&quot;
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500">
                                <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                                <span>{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
