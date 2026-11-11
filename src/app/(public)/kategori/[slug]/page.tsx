import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/queries/articles";
import { EditorialCard } from "@/components/news/EditorialCard";

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
    title: `Rubrik ${category.name} | KRONIKA`,
    description: category.description || `Arsip liputan rubrik ${category.name}`,
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
      {/* Category Editorial Masthead */}
      <header className="border-b-2 border-stone-950 pb-6 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-red-600">
          <span>Rubrik Publikasi</span>
          <span>·</span>
          <span>{articles.length} Liputan Terverifikasi</span>
        </div>

        <h1 className="font-serif tracking-tight text-4xl sm:text-5xl md:text-6xl font-black text-stone-950">
          {category.name}
        </h1>

        {category.description && (
          <p className="font-serif italic text-base sm:text-xl text-stone-700 max-w-3xl leading-relaxed">
            {category.description}
          </p>
        )}
      </header>

      {/* Articles Feed */}
      {articles.length === 0 ? (
        <div className="py-16 text-center font-mono text-sm text-stone-500 border border-stone-300 bg-white">
          Belum ada artikel yang diterbitkan dalam rubrik ini.
        </div>
      ) : (
        <div className="space-y-8">
          {/* Lead Article (Horizontal Highlight) */}
          {leadArticle && (
            <div className="border-b border-stone-300 pb-8">
              <EditorialCard article={leadArticle} layout="horizontal" priority={true} />
            </div>
          )}

          {/* Rest of Articles (Grid) */}
          {restArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

