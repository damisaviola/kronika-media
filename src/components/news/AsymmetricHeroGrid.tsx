import Image from "next/image";
import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";
import { TrendingIndex } from "./TrendingIndex";
import { formatJamWIB, formatTanggalSingkat } from "@/lib/utils";

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
    <section className="w-full border-b border-stone-900 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x divide-stone-300 gap-y-8 lg:gap-y-0">
        {/* ========================================================
            KOLOM KIRI (3 Kolom): Kilas Berita Terbaru Kronologis
           ======================================================== */}
        <div className="lg:col-span-3 lg:pr-6 space-y-4">
          <div className="border-b-2 border-stone-950 pb-1.5 flex items-center justify-between">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-950 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full" />
              <span>Kilas Terkini</span>
            </h2>
            <span className="font-mono text-[10px] text-stone-500 uppercase">WIB</span>
          </div>

          <div className="divide-y divide-stone-200">
            {latestDispatches.map((dispatch) => (
              <article key={dispatch.id} className="py-3 group first:pt-0">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider mb-1">
                  <span className="text-red-600 font-bold">
                    {formatJamWIB(dispatch.publishedAt)}
                  </span>
                  <span className="text-stone-300">/</span>
                  <Link
                    href={`/kategori/${dispatch.category.slug}`}
                    className="text-stone-600 hover:text-stone-950 font-medium"
                  >
                    {dispatch.category.name}
                  </Link>
                </div>

                <Link href={`/berita/${dispatch.slug}`} className="block">
                  <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug group-hover:underline decoration-stone-900 underline-offset-4">
                    {dispatch.title}
                  </h3>
                </Link>

                <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed font-sans">
                  {dispatch.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ========================================================
            KOLOM TENGAH (6 Kolom): Main Cover Story (Laporan Utama)
           ======================================================== */}
        <div className="lg:col-span-6 lg:px-8 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-300 pb-1.5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-600 flex items-center gap-2">
              <span>★ Laporan Utama</span>
              <span className="text-stone-400 font-normal">|</span>
              <span className="text-stone-800">{headline.category.name}</span>
            </span>
            <span className="font-mono text-[11px] text-stone-500">
              {headline.readingTime} Menit Baca
            </span>
          </div>

          {/* Headline Image (16:10) */}
          <div className="space-y-1.5">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
              <Image
                src={headline.coverImageUrl}
                alt={headline.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-none group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
            {headline.coverImageCaption && (
              <p className="font-mono text-[11px] text-stone-500 leading-tight">
                {headline.coverImageCaption}
              </p>
            )}
          </div>

          {/* Title & Deck */}
          <div className="space-y-3">
            <Link href={`/berita/${headline.slug}`} className="group block">
              <h1 className="font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl font-black text-stone-950 leading-[1.08] group-hover:underline decoration-stone-900 underline-offset-4">
                {headline.title}
              </h1>
            </Link>

            {headline.subtitle && (
              <p className="font-serif italic text-lg sm:text-xl text-stone-700 leading-snug">
                {headline.subtitle}
              </p>
            )}

            <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans">
              {headline.excerpt}
            </p>
          </div>

          {/* Author Byline & Date */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between font-mono text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <span>Investigasi oleh:</span>
              <strong className="text-stone-900 uppercase font-semibold">
                {headline.author.name}
              </strong>
            </div>
            <span>{formatTanggalSingkat(headline.publishedAt)}</span>
          </div>
        </div>

        {/* ========================================================
            KOLOM KANAN (3 Kolom): Terpopuler & Opini Redaksi
           ======================================================== */}
        <div className="lg:col-span-3 lg:pl-6">
          <TrendingIndex articles={mostRead} opinions={opinions} />
        </div>
      </div>
    </section>
  );
}

