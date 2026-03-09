import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
