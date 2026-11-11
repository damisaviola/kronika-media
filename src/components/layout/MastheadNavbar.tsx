"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, PenSquare } from "lucide-react";
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
    <header className="w-full bg-[#FAF8F5] select-text">
      {/* 1. Baris Atas Tipis: Tanggal Edisi, Pasar, dan Akses Redaksi */}
      <div className="border-b border-stone-300 py-1.5 px-4 text-[11px] font-mono tracking-wider text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-900 uppercase">EDISI NASIONAL</span>
            <span className="text-stone-300">|</span>
            <span>{todayFormatted}</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-stone-500">
            <span>
              IHSG <strong className="text-stone-800">7.428,10</strong>{" "}
              <span className="text-emerald-700 font-semibold">+0,42%</span>
            </span>
            <span className="text-stone-300">·</span>
            <span>
              USD/IDR <strong className="text-stone-800">15.620</strong>{" "}
              <span className="text-red-700 font-semibold">-0,15%</span>
            </span>
            <span className="text-stone-300">·</span>
            <span>
              BRENT <strong className="text-stone-800">$74,80</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-stone-800 hover:text-red-600 font-mono font-medium transition-colors"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Ruang Redaksi (CMS) →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Baris Tengah: Nama Publikasi Masthead & Slogan Jurnalisme */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="h-[1px] w-12 md:w-24 bg-stone-300 hidden sm:block" />
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-stone-500 uppercase">
            Jurnal Independen Tata Kelola, Kebijakan & Kebudayaan
          </span>
          <span className="h-[1px] w-12 md:w-24 bg-stone-300 hidden sm:block" />
        </div>

        <Link href="/" className="inline-block group">
          <h1 className="font-serif tracking-tighter text-5xl md:text-7xl lg:text-8xl font-black text-stone-950 hover:text-stone-800 transition-colors">
            KRONIKA
          </h1>
        </Link>

        <div className="mt-2 text-stone-600 text-xs md:text-sm font-serif italic">
          Menjaga Akuntabilitas Kuasa, Menelusuri Arus Modal, Membaca Tanda-Tanda Zaman
        </div>
      </div>

      {/* 3. Baris Bawah: Navigasi Kategori dengan Border Ganda & Pencarian */}
      <nav className="border-t-2 border-stone-950 border-b border-stone-300 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Menu Kategori */}
          <div className="flex items-center overflow-x-auto scrollbar-none py-2 gap-1 md:gap-2">
            <Link
              href="/"
              className={`px-3 py-1 font-mono text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                pathname === "/"
                  ? "bg-stone-950 text-white font-semibold"
                  : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/50"
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
                  className={`px-3 py-1 font-mono text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-stone-950 text-white font-semibold"
                      : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/50"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Form Pencarian Minimalis */}
          <div className="flex items-center pl-2">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="Cari arsip berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-white border border-stone-400 px-2.5 py-1 text-xs text-stone-900 font-sans focus:outline-none focus:border-stone-900 w-36 md:w-56"
                />
                <button
                  type="submit"
                  aria-label="Cari Berita"
                  className="p-1 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-stone-500 hover:text-stone-900 text-xs px-1 font-mono"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1.5 text-stone-600 hover:text-stone-950 font-mono text-xs tracking-wider py-1 px-2 transition-colors"
                aria-label="Buka Pencarian Berita"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline uppercase">Cari</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

