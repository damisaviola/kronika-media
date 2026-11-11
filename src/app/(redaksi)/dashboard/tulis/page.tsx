import { getCategories, getAuthors, getDashboardArticles } from "@/lib/queries/articles";
import { ArticleForm } from "@/components/cms/ArticleForm";

interface TulisPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function TulisPage({ searchParams }: TulisPageProps) {
  const { id } = await searchParams;
  const [categories, authors, allArticles] = await Promise.all([
    getCategories(),
    getAuthors(),
    getDashboardArticles(),
  ]);

  const articleToEdit = id ? allArticles.find((a) => a.id === id) || null : null;

  return (
    <div>
      <ArticleForm
        initialArticle={articleToEdit}
        categories={categories}
        authors={authors}
      />
    </div>
  );
}

