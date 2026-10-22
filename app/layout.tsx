import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweetmemos — Make a memory they can keep",
  description:
    "Turn birthdays, anniversaries and just-because feelings into a beautiful page made for one person.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="my" data-lang="my" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Myanmar:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col lang-my">
        <LanguageProvider>
          <AuthProvider>
            <SmoothScroll>
              <Suspense fallback={<div className="h-18 w-full bg-white/90 border-b border-[#f4e6e9]" />}>
                <Navbar />
              </Suspense>
              {children}
            </SmoothScroll>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
