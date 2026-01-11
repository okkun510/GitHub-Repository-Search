import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Repository Search",
  description: "Search GitHub repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
          <header className="bg-zinc-900 py-6">
            <h1 className="text-2xl font-bold text-center text-white">
              <Link href="/">GitHub Repository Search</Link>
            </h1>
          </header>
          <main className="mx-auto max-w-3xl px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
