import Image from "next/image";
import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";
import { TrendingIndex } from "./TrendingIndex";
import { formatJamWIB, formatTanggalSingkat } from "@/lib/utils";
import { Clock, Sparkles } from "lucide-react";

interface AsymmetricHeroGridProps {
  headline: ArticleWithRelations;
  latestDispatches: ArticleWithRelations[];
  mostRead: ArticleWithRelations[];
  opinions: ArticleWithRelations[];
}

export function AsymmetricHeroGrid({
  headline,
  latestDispatches,
  mostRead,
  opinions,
}: AsymmetricHeroGridProps) {
  return (
    <section className="w-full pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================
            KOLOM KIRI (7 Kolom): Main Feature Hero
           ======================================================== */}
        <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          {/* Badge & Meta */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600">
                <Sparkles className="w-3 h-3" />
                <span>Top Story</span>
              </span>
              <Link
                href={`/kategori/${headline.category.slug}`}
                className="text-zinc-500 hover:text-zinc-950 font-semibold uppercase text-xs"
              >
                {headline.category.name}
              </Link>
            </div>
            <div className="flex items-center gap-1 text-zinc-400 font-medium text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{headline.readingTime} Menit Baca</span>
            </div>
          </div>

          {/* Hero Image dengan Rounded Corners */}
          <Link href={`/berita/${headline.slug}`} className="block group">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={headline.coverImageUrl}
                alt={headline.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Link>

          {/* Headline Title & Text */}
          <div className="space-y-2 pt-1">
            <Link href={`/berita/${headline.slug}`}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight leading-tight hover:text-rose-600 transition-colors">
                {headline.title}
              </h1>
            </Link>

            {headline.subtitle && (
              <p className="text-sm sm:text-base text-zinc-500 font-medium leading-relaxed">
                {headline.subtitle}
              </p>
            )}

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3">
              {headline.excerpt}
            </p>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
              <div>
                Oleh <strong className="text-zinc-800">{headline.author.name}</strong> · {headline.author.role}
              </div>
              <div>{formatTanggalSingkat(headline.publishedAt)}</div>
            </div>
          </div>
        </div>

        {/* ========================================================
            KOLOM KANAN (5 Kolom): Trending Top Stories & Quick Feed
           ======================================================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Trending Index */}
          <TrendingIndex articles={mostRead} opinions={opinions} />

          {/* Kabar Baru Singkat */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Kabar Baru
              </h3>
              <span className="text-[10px] text-zinc-400 font-mono">REAL-TIME</span>
            </div>

            <div className="divide-y divide-zinc-100">
              {latestDispatches.slice(0, 3).map((art) => (
                <article key={art.id} className="py-2.5 first:pt-0 last:pb-0 group">
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 mb-0.5">
                    <span className="text-rose-600 font-semibold">{formatJamWIB(art.publishedAt)}</span>
                    <span>·</span>
                    <span>{art.category.name}</span>
                  </div>
                  <Link href={`/berita/${art.slug}`}>
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover:text-rose-600 transition-colors leading-snug">
                      {art.title}
                    </h4>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
