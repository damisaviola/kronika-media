import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";
import { Flame, Radio } from "lucide-react";

interface BreakingTickerProps {
  articles: ArticleWithRelations[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm text-zinc-900 text-xs py-2 px-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 flex-shrink-0 bg-rose-600 text-white font-mono text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-xs">
            <Flame className="w-3 h-3 text-amber-300 animate-pulse fill-amber-300" />
            <span>HYPE NOW</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 text-xs">
            {articles.map((art, idx) => (
              <Link
                key={art.id}
                href={`/berita/${art.slug}`}
                className="inline-flex items-center gap-2 group text-zinc-700 hover:text-zinc-950 transition-colors"
              >
                <span className="font-mono text-[11px] font-semibold text-rose-500">
                  0{idx + 1}
                </span>
                <span className="font-medium text-zinc-800 group-hover:text-rose-600 transition-colors">
                  {art.title}
                </span>
                {idx < articles.length - 1 && (
                  <span className="text-zinc-300 select-none">·</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-zinc-500 flex-shrink-0">
          <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span className="text-zinc-700 font-semibold">LIVE TIMIKA & GLOBAL</span>
        </div>
      </div>
    </div>
  );
}
