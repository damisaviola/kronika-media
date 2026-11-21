import Link from "next/link";
import { getHomepageData } from "@/lib/queries/articles";
import { AsymmetricHeroGrid } from "@/components/news/AsymmetricHeroGrid";
import { EditorialCard } from "@/components/news/EditorialCard";
import { ArrowRight, Compass } from "lucide-react";

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
    </div>
  );
}
