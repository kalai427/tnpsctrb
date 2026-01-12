import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TNPSCTRB - Tamil Nadu Education Portal",
  description: "Everything Tamil Nadu Students Need to Succeed. Access Textbooks, Notes, MCQs, and Exam Updates for 10th, 11th, 12th, TNPSC & TET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1, position: 'relative' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
