import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/queries/articles";
import { EditorialCard } from "@/components/news/EditorialCard";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getArticlesByCategory(slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan",
    };
  }

  return {
    title: `${category.name} | KRONIKA Pop Culture`,
    description: category.description || `Semua update terbaru tentang ${category.name}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, articles } = await getArticlesByCategory(slug);

  if (!category) {
    notFound();
  }

  const [leadArticle, ...restArticles] = articles;

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Category Header Modern */}
      <header className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600">
            <Sparkles className="w-3 h-3" />
            <span>Kanal Pop Culture</span>
          </span>
          <span className="text-zinc-300">·</span>
          <span className="text-xs font-medium text-zinc-400">
            {articles.length} Artikel
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight">
          {category.name}
        </h1>

        {category.description && (
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        )}
      </header>

      {/* Articles Feed */}
      {articles.length === 0 ? (
        <div className="py-16 text-center text-sm text-zinc-500 border border-zinc-200 bg-white rounded-2xl">
          Belum ada artikel dalam kategori ini.
        </div>
      ) : (
        <div className="space-y-8">
          {/* Lead Article (Horizontal Highlight) */}
          {leadArticle && (
            <EditorialCard article={leadArticle} layout="horizontal" priority={true} />
          )}

          {/* Rest of Articles (Grid) */}
          {restArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {restArticles.map((art) => (
                <EditorialCard key={art.id} article={art} layout="vertical" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
