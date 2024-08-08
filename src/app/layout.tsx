import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TeXpert- AI Document Maker",
  description: "AI PDF maker for LaTeX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en "className="bg-[#121213]">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
