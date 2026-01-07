import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Niche Vault | Top Faceless YouTube Niches",
  description: "Discover profitable, low-competition faceless YouTube niches. Get data-driven strategy guides, revenue estimates, and viral video ideas.",
  keywords: ["faceless youtube channel", "youtube niche ideas", "best youtube niches 2026", "faceless channel ideas", "youtube automation niches", "high cpm youtube niches", "niche vault"],
  authors: [{ name: "Niche Vault Team" }],
  openGraph: {
    title: "Niche Vault | Top Faceless YouTube Niches",
    description: "Discover profitable, low-competition faceless YouTube niches. Get data-driven strategy guides, revenue estimates, and viral video ideas.",
    url: "https://nichevault.com",
    siteName: "Niche Vault",

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niche Vault | Top Faceless YouTube Niches",
    description: "Discover profitable, low-competition faceless YouTube niches.",

  },
  alternates: {
    canonical: "https://nichevault.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
