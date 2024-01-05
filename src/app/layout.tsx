import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NUS GPA Calculator: Calculate Your Grade Point Average Easily",
  description:
    "Effortlessly calculate your National University of Singapore (NUS) GPA with this user-friendly GPA Calculator. Accurately determine your academic performance and plan your future success.",
  keywords: [
    "NUS GPA Calculator",
    "GPA Calculator",
    "Calculate GPA",
    "NUS GPA",
    "Academic Performance"
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${inter.className} flex h-full bg-zinc-50 dark:bg-black`}
      >
        <ThemeProvider>
          <div className="flex w-full">
            <div className="fixed inset-0 flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
              </div>
            </div>
            <div className="relative flex w-full flex-col">
              <Header title="GPA Calculator" />
              <main className="flex-auto">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
