import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Snippet Vault",
  description: "A service for storing useful snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
          <header className="border-b border-zinc-800 px-8 py-4">
            <Link href="/" className="text-xl font-bold tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
              SNIPPET VAULT
            </Link>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
