import Image from "next/image";
import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";
import { formatTanggalSingkat, formatJamWIB } from "@/lib/utils";
import { Clock } from "lucide-react";

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
      <article className="group bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 hover:border-zinc-300 hover:shadow-xs transition-all grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {showImage && (
          <div className="md:col-span-4 relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            />
          </div>
        )}

        <div className={showImage ? "md:col-span-8 space-y-2" : "md:col-span-12 space-y-2"}>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <Link
              href={`/kategori/${article.category.slug}`}
              className="text-rose-600 font-bold uppercase tracking-wider hover:underline"
            >
              {article.category.name}
            </Link>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              {article.readingTime} mnt baca
            </span>
            <span>·</span>
            <span>{formatTanggalSingkat(article.publishedAt)}</span>
          </div>

          <Link href={`/berita/${article.slug}`}>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-rose-600 transition-colors leading-snug">
              {article.title}
            </h3>
          </Link>

          {article.subtitle && (
            <p className="text-xs sm:text-sm text-zinc-500 line-clamp-1">
              {article.subtitle}
            </p>
          )}

          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-1 text-[11px] text-zinc-400 font-medium">
            Oleh <strong className="text-zinc-700">{article.author.name}</strong>
          </div>
        </div>
      </article>
    );
  }

  if (layout === "compact") {
    return (
      <article className="group py-3 border-b border-zinc-100 last:border-b-0 space-y-1">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
          <span className="text-rose-600 font-bold">{formatJamWIB(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.category.name}</span>
        </div>

        <Link href={`/berita/${article.slug}`}>
          <h4 className="text-sm font-semibold text-zinc-900 leading-snug group-hover:text-rose-600 transition-colors">
            {article.title}
          </h4>
        </Link>
      </article>
    );
  }

  // Default: Vertical Card
  return (
    <article className="group bg-white border border-zinc-200/80 rounded-2xl p-3.5 sm:p-4 hover:border-zinc-300 hover:shadow-xs transition-all flex flex-col h-full space-y-3">
      {showImage && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
          <div className="absolute top-2.5 left-2.5">
            <Link
              href={`/kategori/${article.category.slug}`}
              className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-950/80 backdrop-blur-md text-white hover:bg-zinc-900 transition-colors shadow-xs"
            >
              {article.category.name}
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-grow justify-between space-y-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
            <span>{article.readingTime} mnt baca</span>
            <span>·</span>
            <span>{formatTanggalSingkat(article.publishedAt)}</span>
          </div>

          <Link href={`/berita/${article.slug}`}>
            <h3 className="text-base font-bold text-zinc-900 leading-snug group-hover:text-rose-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-2 border-t border-zinc-100 text-[11px] text-zinc-400 font-medium">
          Oleh <strong className="text-zinc-700">{article.author.name}</strong>
        </div>
      </div>
    </article>
  );
}
