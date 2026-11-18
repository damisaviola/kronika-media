import type { Metadata } from "next";
import { Search, Sparkles } from "lucide-react";
import { searchArticles } from "@/lib/queries/articles";
import { EditorialCard } from "@/components/news/EditorialCard";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Pencarian: "${q}" | KRONIKA` : "Cari Pop Culture | KRONIKA",
    description: "Cari artikel tentang film, serial, game, musik, anime, dan tren internet.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? await searchArticles(query) : [];

  const popularTags = ["Timika", "Hip-Hop", "GTA 6", "Anime", "Gaming", "Film", "Streetwear", "Nintendo"];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Search Header Modern */}
      <header className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Eksplorasi Pop Culture</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Cari Artikel, Game & Film
        </h1>

        <form method="GET" action="/cari" className="flex items-center gap-2 max-w-2xl">
          <div className="relative flex-grow">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Ketik judul, nama game, film, artis, atau tag..."
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white transition-colors"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Cari</span>
          </button>
        </form>

        {/* Popular Tags */}
        <div className="pt-2 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-zinc-400 font-medium">Topik Populer:</span>
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/cari?q=${encodeURIComponent(tag)}`}
              className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-medium text-zinc-700 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Results Feedback */}
      {query && (
        <div className="text-xs text-zinc-500 flex items-center justify-between px-1">
          <div>
            Menampilkan hasil untuk:{" "}
            <strong className="text-zinc-900">&ldquo;{query}&rdquo;</strong>
          </div>
          <div className="font-mono">{results.length} artikel ditemukan</div>
        </div>
      )}

      {/* Results List */}
      {query ? (
        results.length === 0 ? (
          <div className="py-16 text-center text-sm text-zinc-500 bg-white border border-zinc-200/80 rounded-2xl">
            Tidak ditemukan artikel untuk kata kunci &ldquo;{query}&rdquo;. Coba kata kunci lain atau pilih topik populer di atas.
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((art) => (
              <EditorialCard key={art.id} article={art} layout="horizontal" />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
