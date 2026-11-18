import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://kronika.id"),
  title: {
    default: "KRONIKA — Pop Culture dari Timika untuk Dunia",
    template: "%s | KRONIKA",
  },
  description:
    "Media pop culture modern berbasis di Timika, Papua Tengah. Menghubungkan denyut kreativitas lokal dengan film, serial, gaming, musik, anime, dan tren dunia.",
  keywords: [
    "pop culture timika",
    "media pop culture papua",
    "hip hop papua",
    "esports timika",
    "film dan serial",
    "gaming dunia",
    "musik global",
    "anime manga",
    "streetwear papua",
    "tren internet",
  ],
  authors: [{ name: "Redaksi KRONIKA Timika" }],
  openGraph: {
    title: "KRONIKA — Pop Culture dari Timika untuk Dunia",
    description:
      "Media pop culture modern berbasis di Timika, Papua Tengah. Mengulas musik, gaming, film, anime, dan tren dunia paling fresh.",
    url: "https://kronika.id",
    siteName: "KRONIKA",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KRONIKA — Pop Culture dari Timika untuk Dunia",
    description:
      "Media pop culture modern berbasis di Timika, Papua Tengah. Mengulas musik, gaming, film, anime, dan tren dunia paling fresh.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
