import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-zinc-50">
      <div className="max-w-lg mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-zinc-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
          Artikel atau topik pop culture yang Anda cari mungkin telah dihapus, dipindahkan, atau tautannya keliru.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/cari"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 hover:border-zinc-900 bg-white text-xs font-bold uppercase tracking-wider text-zinc-800 rounded-full transition-colors"
          >
            <span>Cari Artikel</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
