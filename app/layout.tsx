import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antoinette Belebele — Développeuse web",
  description: "Portfolio d’Antoinette Belebele, développeuse full-stack et web designer. Découvrez ses projets web et ses expériences numériques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
  <html lang="fr">
    <body
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <LanguageProvider>
        <Header />
        <div className="pt-[76px]">{children}</div>
      </LanguageProvider>
    </body>
  </html>
);
}
