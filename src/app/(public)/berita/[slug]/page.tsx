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
import { Clock, ArrowLeft } from "lucide-react";

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

      {/* Back to Home / Category */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* 3. Modern Article Header */}
      <header className="max-w-4xl mx-auto space-y-4 pt-1">
        <div className="flex items-center justify-between text-xs">
          <Link
            href={`/kategori/${article.category.slug}`}
            className="inline-flex items-center px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            {article.category.name}
          </Link>

          <div className="flex items-center gap-3 text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime} Menit Baca
            </span>
            <span>·</span>
            <ViewCounter slug={article.slug} initialViews={article.viewsCount} />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="text-base sm:text-xl text-zinc-600 font-medium leading-relaxed">
            {article.subtitle}
          </p>
        )}

        {/* Byline & Share Bar */}
        <div className="pt-4 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            {article.author.avatarUrl && (
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 flex-shrink-0">
                <Image
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="text-zinc-900 font-bold">
                {article.author.name}
              </div>
              <div className="text-[11px] text-zinc-400">
                {article.author.role} · {formatTanggalIndo(article.publishedAt)} ({formatJamWIB(article.publishedAt)})
              </div>
            </div>
          </div>

          <ShareButtons title={article.title} slug={article.slug} />
        </div>
      </header>

      {/* 4. Cover Image Modern */}
      <div className="max-w-5xl mx-auto space-y-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-xs">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
          />
        </div>
        {article.coverImageCaption && (
          <figcaption className="text-xs text-zinc-400 text-center md:text-left leading-normal font-sans">
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
          <div className="pt-6 mt-6 border-t border-zinc-200">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Topik & Kata Kunci:
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/cari?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:border-zinc-900 hover:text-zinc-950 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Share Buttons */}
        <div className="pt-4 mt-4 border-t border-zinc-100">
          <ShareButtons title={article.title} slug={article.slug} />
        </div>
      </div>

      {/* 6. Baca Berita Lainnya */}
      {relatedArticles.length > 0 && (
        <section className="pt-12 border-t border-zinc-200">
          <div className="pb-4 mb-6 flex items-center justify-between border-b border-zinc-200">
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
              Rekomendasi Pop Culture Lainnya
            </h3>
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Semua Berita →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedArticles.map((item) => (
              <EditorialCard key={item.id} article={item} layout="vertical" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
