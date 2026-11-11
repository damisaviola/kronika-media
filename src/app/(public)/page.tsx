import Link from "next/link";
import { getHomepageData } from "@/lib/queries/articles";
import { AsymmetricHeroGrid } from "@/components/news/AsymmetricHeroGrid";
import { EditorialCard } from "@/components/news/EditorialCard";

export default async function HomePage() {
  const {
    headline,
    latestDispatches,
    mostRead,
    opinions,
    categories,
    categoryArticles,
  } = await getHomepageData();

  if (!headline) {
    return (
      <div className="py-20 text-center font-mono text-sm text-stone-500">
        Belum ada berita yang diterbitkan.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* 1. Swiss 12-Col Asymmetric Hero Grid */}
      <AsymmetricHeroGrid
        headline={headline}
        latestDispatches={latestDispatches}
        mostRead={mostRead}
        opinions={opinions}
      />

      {/* 2. Editorial Section: Laporan Rubrik Berkelanjutan */}
      <section className="space-y-8">
        <div className="border-b-2 border-stone-950 pb-2 flex items-center justify-between">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-950 tracking-tight">
            Liputan Khusus & Rubrik Redaksi
          </h2>
          <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
            Investigasi Mendalam
          </span>
        </div>

        {/* Dynamic Category Blocks */}
        <div className="space-y-10">
          {categories.map((cat) => {
            const articles = categoryArticles[cat.slug] || [];
            if (articles.length === 0) return null;

            return (
              <div key={cat.id} className="border-b border-stone-300 pb-8 last:border-b-0">
                <div className="flex items-center justify-between mb-4 border-b border-stone-200 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-stone-950" />
                    <Link
                      href={`/kategori/${cat.slug}`}
                      className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950 hover:text-red-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </div>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="font-mono text-[11px] text-stone-500 hover:text-stone-900 transition-colors uppercase"
                  >
                    Arsip Lengkap →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {articles.map((art) => (
                    <EditorialCard key={art.id} article={art} layout="vertical" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Kolom Jurnalisme Warga & Surat Pembaca */}
      <section className="bg-stone-200/50 border border-stone-300 p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="font-mono text-[11px] text-red-600 font-bold uppercase tracking-widest">
            Kanal Whistleblower & Kolaborasi Publik
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-950">
            Punya Informasi Awal Dugaan Penyimpangan Publik?
          </h3>
          <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-sans">
            Redaksi investigasi Kronika menjamin kerahasiaan identitas narasumber sesuai amanat Undang-Undang Pokok Pers. Kirimkan dokumen pendukung melalui saluran komunikasi terenkripsi kami.
          </p>
          <div className="pt-2">
            <span className="inline-block border border-stone-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition-colors cursor-pointer">
              Protokol Kontak Terenkripsi PGP →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

