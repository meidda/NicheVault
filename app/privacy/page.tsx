import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg">Last updated: December 15, 2025</p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Niche Vault (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>Personal Data:</strong> Name, email address, and payment information (processed securely via Stripe).</li>
                            <li><strong>Usage Data:</strong> Information about how you use our website, including your IP address, browser type, and operating system.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p>We use personal information collected via our website for a variety of business purposes described below:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>To facilitate account creation and logon process.</li>
                            <li>To fulfill and manage your orders and payments.</li>
                            <li>To send you administrative information, such as product, service and new feature information and/or information about changes to our terms, conditions, and policies.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
                        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Security of Your Information</h2>
                        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may email us at help.nichevault@gmail.com.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
