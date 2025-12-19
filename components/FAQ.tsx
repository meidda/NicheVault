"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What exactly is a 'Faceless' YouTube channel?",
        answer: "A faceless channel is a YouTube channel where the creator does not show their face. Content typically consists of voiceovers paired with stock footage, animations, screen recordings, or gameplay. This allows you to build a profitable media asset based on value and information rather than personality."
    },
    {
        question: "How do I get access to the detailed niche data?",
        answer: "By purchasing our premium package, you get instant access to the full breakdown of all 50 niches. This includes deep-dive strategies, specific equipment lists, monetization blueprints, and 10+ viral video ideas for each niche."
    },
    {
        question: "Is this a one-time payment or a subscription?",
        answer: "This is a one-time payment. Once you purchase the premium guide, you have lifetime access to the current database of niches. There are no recurring monthly fees."
    },
    {
        question: "How accurate are the revenue estimates?",
        answer: "Our revenue estimates are based on industry standards for RPM (Revenue Per Mille) in 2024-2025. We analyze data from real channels in these niches. However, actual earnings depend on your specific video performance, retention, and audience geography."
    },
    {
        question: "Do I need expensive equipment to start?",
        answer: "No. You don't even need a microphone anymore. Most successful faceless channels now use high-quality AI voiceovers (like ElevenLabs or Google AI Studio). This allows you to scale content production without recording a single word yourself."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 dark:text-gray-400">Everything you need to know about starting your faceless journey.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                            >
                                <span className="font-semibold text-gray-900 dark:text-gray-100">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6 pt-0">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
