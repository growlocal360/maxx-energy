import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAXX Energy Services | Chemical & Containment Solutions",
  description:
    "MAXX Energy Services provides premier specialty chemical solutions and containment products for oil & energy, agriculture, and municipalities. Reliable chemical supply, distribution & containment nationwide.",
  keywords: [
    "chemical solutions",
    "containment solutions",
    "oilfield chemicals",
    "spill containment",
    "frac chemicals",
    "energy services",
    "MAXX Energy",
    "chemical supply",
  ],
  openGraph: {
    title: "MAXX Energy Services | Chemical & Containment Solutions",
    description:
      "Premier specialty chemical solutions and containment products for oil & energy, agriculture, and municipalities.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-maxx-900`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
