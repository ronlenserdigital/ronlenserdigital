import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import GlobalBackground from "@/components/global-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ronlenserdigital.com'),
  title: {
    default: "Ron Lenser Digital",
    template: "%s | Ron Lenser Digital"
  },
  description: "Elite design, premium execution, growth, trust, precision, and modernity.",
  openGraph: {
    title: "Ron Lenser Digital",
    description: "Custom websites that actually book clients.",
    url: "https://ronlenserdigital.com",
    siteName: "Ron Lenser Digital",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ron Lenser Digital",
    description: "Custom websites that actually book clients.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-transparent text-white selection:bg-white/20 overflow-x-hidden relative">
        <GlobalBackground />
        <PageTransition>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
