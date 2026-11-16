import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/queries/articles";
import { formatTanggalIndo, formatJamWIB } from "@/lib/utils";
import { ReadingProgressBar } from "@/components/news/ReadingProgressBar";
import { ShareButtons } from "@/components/news/ShareButtons";
import { ViewCounter } from "@/components/news/ViewCounter";
import { EditorialCard } from "@/components/news/EditorialCard";
import { ArticleInteractiveBody } from "@/components/news/ArticleInteractiveBody";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);

  if (!data) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  const { article } = data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kronika.id";

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${baseUrl}/berita/${article.slug}`,
      siteName: "KRONIKA",
      images: [
        {
          url: article.coverImageUrl,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: new Date(article.publishedAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);

  if (!data) {
    notFound();
  }

  const { article, relatedArticles } = data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kronika.id";

  // Schema.org NewsArticle JSON-LD
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImageUrl],
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    author: [
      {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.role,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "KRONIKA",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/berita/${article.slug}`,
    },
  };

  return (
    <article className="space-y-8 select-text">
      {/* 1. Reading Progress Bar */}
      <ReadingProgressBar />

      {/* 2. Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />

      {/* 3. Article Header Section */}
      <header className="max-w-4xl mx-auto space-y-4 pt-2 border-b border-stone-300 pb-6">
        <div className="flex items-center justify-between font-mono text-xs">
          <Link
            href={`/kategori/${article.category.slug}`}
            className="text-red-600 font-bold tracking-widest uppercase hover:underline"
          >
            {article.category.name}
          </Link>
          <div className="flex items-center gap-3 text-stone-500">
            <span>{article.readingTime} Menit Baca</span>
            <span>·</span>
            <ViewCounter slug={article.slug} initialViews={article.viewsCount} />
          </div>
        </div>

        <h1 className="font-serif tracking-tight text-3xl sm:text-5xl lg:text-6xl font-black text-stone-950 leading-[1.08]">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="font-serif italic text-lg sm:text-2xl text-stone-700 leading-snug">
            {article.subtitle}
          </p>
        )}

        {/* Byline & Sharing Bar */}
        <div className="pt-4 border-t border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-stone-600">
          <div className="flex items-center gap-3">
            {article.author.avatarUrl && (
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-stone-300">
                <Image
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="text-stone-900 font-semibold uppercase">
                Oleh {article.author.name}
              </div>
              <div className="text-[11px] text-stone-500">
                {article.author.role} · {formatTanggalIndo(article.publishedAt)} ({formatJamWIB(article.publishedAt)})
              </div>
            </div>
          </div>

          <ShareButtons title={article.title} slug={article.slug} />
        </div>
      </header>

      {/* 4. Lead Cover Image */}
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover rounded-none"
          />
        </div>
        {article.coverImageCaption && (
          <figcaption className="font-mono text-xs text-stone-500 text-center md:text-left leading-normal">
            {article.coverImageCaption}
          </figcaption>
        )}
      </div>

      {/* 5. Interactive Editorial Reader Experience */}
      <div className="max-w-5xl mx-auto">
        <ArticleInteractiveBody
          article={article}
          relatedArticles={relatedArticles}
        />

        {/* Tags Footer */}
        {article.tags.length > 0 && (
          <div className="pt-6 mt-6 border-t border-stone-300">
            <div className="font-mono text-xs uppercase tracking-wider text-stone-500 mb-2">
              Kata Kunci & Indeks Liputan:
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/cari?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 border border-stone-300 bg-stone-100 font-mono text-xs text-stone-800 hover:border-stone-900 hover:bg-stone-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Share Buttons */}
        <div className="pt-4 mt-4 border-t border-stone-200">
          <ShareButtons title={article.title} slug={article.slug} />
        </div>
      </div>

      {/* 6. Baca Berita Lainnya (Horizontal Grid) */}
      {relatedArticles.length > 0 && (
        <section className="pt-12 border-t-2 border-stone-900">
          <div className="border-b border-stone-300 pb-2 mb-6 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-stone-950">
              Laporan Mendalam Lainnya
            </h3>
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-stone-600 hover:text-stone-950"
            >
              Kembali ke Beranda →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArticles.map((item) => (
              <EditorialCard key={item.id} article={item} layout="vertical" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

