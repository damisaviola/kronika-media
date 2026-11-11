import type { Metadata } from "next";
import { Search } from "lucide-react";
import { searchArticles } from "@/lib/queries/articles";
import { EditorialCard } from "@/components/news/EditorialCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Hasil Pencarian: "${q}" | KRONIKA` : "Pencarian Arsip Berita | KRONIKA",
    description: "Cari arsip laporan investigasi, analisis ekonomi, dan esai budaya Kronika.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? await searchArticles(query) : [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Search Header */}
      <header className="border-b-2 border-stone-950 pb-6 space-y-4">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500">
          Indeks & Pencarian Arsip
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
          Pencarian Laporan Editorial
        </h1>

        <form method="GET" action="/cari" className="flex items-center gap-2 max-w-2xl">
          <div className="relative flex-grow">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Ketik kata kunci, nama tokoh, topik investigasi, atau tag..."
              className="w-full bg-white border border-stone-400 p-3 text-sm font-sans text-stone-900 focus:outline-none focus:border-stone-950"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-stone-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Cari</span>
          </button>
        </form>
      </header>

      {/* Results Feedback */}
      {query && (
        <div className="font-mono text-xs text-stone-600 flex items-center justify-between border-b border-stone-200 pb-2">
          <div>
            Menampilkan hasil untuk: <strong className="text-stone-900 font-serif text-sm">"{query}"</strong>
          </div>
          <div>{results.length} laporan ditemukan</div>
        </div>
      )}

      {/* Results Feed */}
      {query ? (
        results.length > 0 ? (
          <div className="divide-y divide-stone-200">
            {results.map((art) => (
              <EditorialCard key={art.id} article={art} layout="horizontal" />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center border border-stone-300 bg-white space-y-2">
            <p className="font-serif text-lg text-stone-800">
              Tidak ada artikel yang cocok dengan kata kunci "{query}".
            </p>
            <p className="font-mono text-xs text-stone-500">
              Coba gunakan istilah yang lebih umum seperti "nikel", "bunga", "moneter", atau "geopolitik".
            </p>
          </div>
        )
      ) : (
        <div className="py-12 text-center border border-stone-200 bg-stone-100/50 text-stone-600 font-sans text-xs">
          Masukkan kata kunci di atas untuk mencari seluruh arsip liputan jurnalistik Kronika.
        </div>
      )}
    </div>
  );
}
