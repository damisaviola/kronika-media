import Image from "next/image";
import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";
import { formatTanggalSingkat, formatJamWIB } from "@/lib/utils";

interface EditorialCardProps {
  article: ArticleWithRelations;
  layout?: "vertical" | "horizontal" | "compact";
  showImage?: boolean;
  priority?: boolean;
}

export function EditorialCard({
  article,
  layout = "vertical",
  showImage = true,
  priority = false,
}: EditorialCardProps) {
  if (layout === "horizontal") {
    return (
      <article className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-stone-200 last:border-b-0 items-start">
        {showImage && (
          <div className="md:col-span-4 relative aspect-[16/10] overflow-hidden bg-stone-200">
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out rounded-none"
            />
          </div>
        )}

        <div className={showImage ? "md:col-span-8 space-y-1.5" : "md:col-span-12 space-y-1.5"}>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-stone-500">
            <Link
              href={`/kategori/${article.category.slug}`}
              className="text-red-700 font-bold hover:underline"
            >
              {article.category.name}
            </Link>
            <span>·</span>
            <span>{article.readingTime} mnt baca</span>
            <span>·</span>
            <span>{formatTanggalSingkat(article.publishedAt)}</span>
          </div>

          <Link href={`/berita/${article.slug}`}>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-950 leading-snug group-hover:underline decoration-stone-900 underline-offset-4">
              {article.title}
            </h3>
          </Link>

          {article.subtitle && (
            <p className="font-serif italic text-sm text-stone-600 line-clamp-1">
              {article.subtitle}
            </p>
          )}

          <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed font-sans">
            {article.excerpt}
          </p>

          <div className="pt-1 font-mono text-[10px] text-stone-500 uppercase tracking-wider">
            Oleh <strong className="text-stone-800">{article.author.name}</strong>
          </div>
        </div>
      </article>
    );
  }

  if (layout === "compact") {
    return (
      <article className="group py-2.5 border-b border-stone-200 last:border-b-0">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-stone-500 mb-1">
          <span className="text-red-700 font-bold">{formatJamWIB(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.category.name}</span>
        </div>

        <Link href={`/berita/${article.slug}`}>
          <h4 className="font-serif text-sm md:text-base font-semibold text-stone-900 leading-snug group-hover:underline decoration-stone-900 underline-offset-4">
            {article.title}
          </h4>
        </Link>
      </article>
    );
  }

  // Default: Vertical
  return (
    <article className="group flex flex-col h-full space-y-2">
      {showImage && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out rounded-none"
          />
        </div>
      )}

      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-stone-500 pt-1">
        <Link
          href={`/kategori/${article.category.slug}`}
          className="text-red-700 font-bold hover:underline"
        >
          {article.category.name}
        </Link>
        <span>·</span>
        <span>{article.readingTime} mnt baca</span>
      </div>

      <Link href={`/berita/${article.slug}`} className="block">
        <h3 className="font-serif text-lg md:text-xl font-bold text-stone-950 leading-snug group-hover:underline decoration-stone-900 underline-offset-4">
          {article.title}
        </h3>
      </Link>

      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-sans flex-grow">
        {article.excerpt}
      </p>

      <div className="pt-2 border-t border-stone-200 font-mono text-[10px] text-stone-500 uppercase tracking-wider flex items-center justify-between">
        <span>{article.author.name}</span>
        <span>{formatTanggalSingkat(article.publishedAt)}</span>
      </div>
    </article>
  );
}
