import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FAF8F5]">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold">
          Kesalahan 404 · Halaman Tidak Ditemukan
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-stone-950 tracking-tight">
          Arsip Tidak Ditemukan
        </h1>
        <p className="font-serif italic text-stone-600 text-lg leading-relaxed">
          Naskah atau tautan berita yang Anda tuju mungkin telah dipindahkan, direvisi, atau tidak lagi tersedia di arsip digital KRONIKA.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/cari"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 hover:border-stone-900 bg-white font-mono text-xs uppercase tracking-wider text-stone-900 transition-colors"
          >
            <span>Cari Berita</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

