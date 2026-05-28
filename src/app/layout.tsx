import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FloatingHotline from "@/components/FloatingHotline";
import ReadingProgress from "@/components/ReadingProgress";
import SkipToContent from "@/components/SkipToContent";
import LenisProvider from "@/components/LenisProvider";
import content from "@/data/content.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const g = content.global;
export const metadata: Metadata = {
  title: {
    default: `${g.siteTitle} - ${g.siteTagline}`,
    template: `%s | ${g.siteTitle}`,
  },
  description: g.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SkipToContent />
        <ReadingProgress />
        <Navbar />
        <LenisProvider>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </LenisProvider>
        <Footer />
        <FloatingHotline />
        <BackToTop />
      </body>
    </html>
  );
}
