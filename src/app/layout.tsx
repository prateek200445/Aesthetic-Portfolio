import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import IntroVideoPreloader from "@/components/IntroVideoPreloader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Prateek Lachwani — AI & DevOps Engineer",
  description: "Portfolio of Prateek Lachwani, AI & DevOps Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <IntroVideoPreloader />
      </body>
    </html>
  );
}
