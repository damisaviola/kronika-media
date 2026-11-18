import Link from "next/link";
import { getHomepageData } from "@/lib/queries/articles";
import { AsymmetricHeroGrid } from "@/components/news/AsymmetricHeroGrid";
import { EditorialCard } from "@/components/news/EditorialCard";
import { ArrowRight, Compass, Sparkles, MapPin, Globe } from "lucide-react";

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
      <div className="py-20 text-center font-mono text-sm text-zinc-500">
        Belum ada artikel yang diterbitkan.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* 1. Hero Grid Modern Pop Culture */}
      <AsymmetricHeroGrid
        headline={headline}
        latestDispatches={latestDispatches}
        mostRead={mostRead}
        opinions={opinions}
      />

      {/* 2. Kanal Kategori Pop Culture */}
      <section className="space-y-10">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-rose-600" />
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
              Eksplorasi Pop Culture
            </h2>
          </div>
          <span className="text-xs font-medium text-zinc-500 hidden sm:inline">
            Dari Timika hingga Fenomena Global
          </span>
        </div>

        {/* Dynamic Category Blocks */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const articles = categoryArticles[cat.slug] || [];
            if (articles.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <Link
                      href={`/kategori/${cat.slug}`}
                      className="text-base sm:text-lg font-bold text-zinc-900 hover:text-rose-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </div>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {articles.map((art) => (
                    <EditorialCard key={art.id} article={art} layout="vertical" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Banner Komunitas Pop Culture: Timika & Dunia */}
      <section className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Markas Kreatif Timika</span>
            <span className="text-rose-400/50">·</span>
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>Panggung Global</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
            Dari Timika ke Seluruh Dunia: Tempat Bertemunya Musik, Game, Film & Street Culture
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            KRONIKA hadir langsung dari jantung Papua Tengah untuk menyuarakan geliat kreatif talenta lokal sekaligus mengupas habis segala hal yang sedang hangat di dunia hiburan internasional.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/kategori/musik"
              className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-full hover:bg-rose-700 transition-colors shadow-xs"
            >
              Jelajahi Musik & Skena
            </Link>
            <Link
              href="/kategori/gaming"
              className="px-4 py-2 bg-zinc-800 text-zinc-200 font-bold text-xs rounded-full hover:bg-zinc-700 transition-colors"
            >
              Kanal Gaming & Esports
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
