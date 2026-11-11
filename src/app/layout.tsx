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
    default: "KRONIKA — Jurnalisme Investigasi & Ruang Refleksi",
    template: "%s | KRONIKA",
  },
  description:
    "Portal jurnalisme independen dengan pendekatan arsitektur pers modern: investigasi mendalam, telaah ekonomi riil, geopolitik kepulauan, dan esai budaya kontemporer.",
  keywords: [
    "jurnalisme investigasi",
    "berita terkini",
    "ekonomi pasar",
    "geopolitik pasifik",
    "kebudayaan",
    "esai editorial",
  ],
  authors: [{ name: "Redaksi Kronika Indonesia" }],
  openGraph: {
    title: "KRONIKA — Jurnalisme Investigasi & Ruang Refleksi",
    description:
      "Portal jurnalisme independen dengan pendekatan arsitektur pers modern.",
    url: "https://kronika.id",
    siteName: "KRONIKA",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KRONIKA — Jurnalisme Investigasi & Ruang Refleksi",
    description: "Portal jurnalisme independen dengan pendekatan arsitektur pers modern.",
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
      className={`${newsreader.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#FAF8F5] text-stone-950 font-sans antialiased selection:bg-red-600 selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

