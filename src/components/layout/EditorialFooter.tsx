import Link from "next/link";
import { type ArticleCategory } from "@/lib/queries/articles";

interface EditorialFooterProps {
  categories: ArticleCategory[];
}

export function EditorialFooter({ categories }: EditorialFooterProps) {
  return (
    <footer className="mt-auto bg-[#F4F1EC] border-t-2 border-stone-900 text-stone-900 text-sm">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-stone-300 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Col 1: About */}
        <div className="md:col-span-4 space-y-3">
          <div className="font-serif text-3xl font-black tracking-tight text-stone-950">
            KRONIKA
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Publikasi jurnalisme investigatif independen. Berkomitmen menegakkan etika pers yang ketat, menguji setiap klaim kekuasaan dengan data terverifikasi, dan menyuarakan kepentingan publik di seluruh kepulauan nusantara.
          </p>
          <div className="pt-2 font-mono text-[11px] text-stone-500 uppercase tracking-widest">
            Terverifikasi Dewan Pers No. 892/DP/K/XI/2026
          </div>
        </div>

        {/* Col 2: Rubrik */}
        <div className="md:col-span-3 space-y-2">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
            Rubrik Publikasi
          </div>
          <ul className="space-y-1.5 text-xs font-sans">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/kategori/${cat.slug}`}
                  className="text-stone-700 hover:text-stone-950 hover:underline decoration-stone-400 underline-offset-2"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Tata Kelola */}
        <div className="md:col-span-2 space-y-2">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
            Etika & Tata Kelola
          </div>
          <ul className="space-y-1.5 text-xs text-stone-700 font-sans">
            <li>
              <span className="hover:text-stone-950 cursor-pointer">Pedoman Siber</span>
            </li>
            <li>
              <span className="hover:text-stone-950 cursor-pointer">Ombudsman Redaksi</span>
            </li>
            <li>
              <span className="hover:text-stone-950 cursor-pointer">Standar Koreksi</span>
            </li>
            <li>
              <span className="hover:text-stone-950 cursor-pointer">Laporan Keuangan</span>
            </li>
            <li>
              <Link href="/dashboard" className="text-red-700 font-medium hover:underline">
                Login Redaksi
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Berlangganan Warta Cetak & Digital */}
        <div className="md:col-span-3 space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
            Warta Pagi Redaksi
          </div>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Dapatkan ringkasan investigasi pilihan dan catatan dewan redaksi langsung ke surel Anda setiap Senin pagi.
          </p>
          <div className="flex items-center gap-1">
            <input
              type="email"
              placeholder="Alamat surel Anda"
              aria-label="Alamat surel untuk newsletter"
              className="bg-white border border-stone-400 px-3 py-1.5 text-xs text-stone-900 font-sans focus:outline-none focus:border-stone-900 w-full"
            />
            <button
              type="button"
              className="bg-stone-950 text-white font-mono text-xs px-3 py-1.5 uppercase hover:bg-stone-800 transition-colors whitespace-nowrap"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-500 gap-2">
        <div>
          © 2026 PT KRONIKA MEDIA NUSANTARA. Hak cipta dilindungi undang-undang.
        </div>
        <div className="flex items-center gap-4">
          <span>JAKARTA · SURABAYA · MAKASSAR · BALIKPAPAN</span>
        </div>
      </div>
    </footer>
  );
}

