"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, PenSquare, X } from "lucide-react";
import { formatTanggalIndo } from "@/lib/utils";

interface CategoryNav {
  id: string;
  name: string;
  slug: string;
}

interface MastheadNavbarProps {
  categories: CategoryNav[];
}

export function MastheadNavbar({ categories }: MastheadNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const todayFormatted = formatTanggalIndo(new Date());

  return (
    <header className="w-full bg-white border-b border-zinc-200/80 shadow-xs">
      {/* 1. Baris Atas: Identitas Timika & Dunia */}
      <div className="border-b border-zinc-100 py-1.5 px-4 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-zinc-800 tracking-wide uppercase text-[11px]">
              KRONIKA
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-[11px] text-zinc-500">
              {todayFormatted}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-zinc-400 hidden lg:inline">
              Musik, Film, Game, Anime & Kultur Jalanan
            </span>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
            >
              <PenSquare className="w-3 h-3" />
              <span>Dashboard Redaksi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Brand Masthead Utama */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 group-hover:text-zinc-800 transition-colors uppercase">
              KRONIKA
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block mb-1 group-hover:scale-125 transition-transform" />
          </Link>
          <div className="hidden sm:block border-l border-zinc-200 pl-3">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full mb-0.5">
              Pop Culture Timika & Dunia
            </span>
            <p className="text-xs text-zinc-500 font-medium leading-tight max-w-[210px]">
              Kabar pop culture, skena kreatif lokal, dan tren global terkini.
            </p>
          </div>
        </div>

        {/* Search Bar Modern */}
        <div className="w-full md:w-auto flex items-center justify-end">
          {isSearchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 w-full md:w-72 bg-zinc-100 rounded-full px-3 py-1.5 border border-zinc-300 focus-within:border-zinc-900 transition-colors"
            >
              <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari hip-hop, film, game, anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-transparent text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-zinc-400 hover:text-zinc-800"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200/80 text-zinc-600 hover:text-zinc-950 rounded-full text-xs font-medium transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cari Berita...</span>
              <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-zinc-200 text-zinc-400">
                /
              </kbd>
            </button>
          )}
        </div>
      </div>

      {/* 3. Baris Navigasi Kategori (Pills) */}
      <nav className="border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2.5">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                pathname === "/"
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
              }`}
            >
              Beranda
            </Link>

            {categories.map((cat) => {
              const isActive = pathname === `/kategori/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/kategori/${cat.slug}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
