import Link from "next/link";
import { type ArticleCategory } from "@/lib/queries/articles";
import { MapPin, Globe } from "lucide-react";

interface EditorialFooterProps {
  categories: ArticleCategory[];
}

export function EditorialFooter({ categories }: EditorialFooterProps) {
  return (
    <footer className="mt-auto bg-zinc-950 text-zinc-400 text-sm border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-800">
          {/* Kolom 1: Brand & Misi dari Timika */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-flex items-baseline gap-1 text-white font-black text-2xl tracking-tight uppercase">
              <span>KRONIKA</span>
              <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-sm">
              Berangkat dari Timika, Papua Tengah, KRONIKA adalah media pop culture yang merayakan energi kreatif generasi muda: mulai dari skena hip-hop dan seni jalanan Papua hingga fenomena film, gaming, anime, dan tren internet global.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Markas Redaksi: Timika, Papua Tengah, Indonesia</span>
            </div>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-zinc-500">
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">TikTok</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">X (Twitter)</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">YouTube</span>
            </div>
          </div>

          {/* Kolom 2: Rubrik Pop Culture */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Kanal Pop Culture
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Info & Kerjasama */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Kemitraan & Redaksi
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Tentang Kronika Timika
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Kirim Karya & Siaran Pers
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Pasang Iklan & Media Kit
                </span>
              </li>
              <li>
                <Link href="/dashboard" className="text-rose-400 hover:text-rose-300 font-medium transition-colors">
                  Login Editor Studio →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Bawah */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>© 2026 KRONIKA MEDIA NUSANTARA. Dari Timika untuk Dunia Pop Culture.</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-zinc-300 cursor-pointer">Kebijakan Privasi</span>
            <span>·</span>
            <span className="hover:text-zinc-300 cursor-pointer">Ketentuan Layanan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
