"use client";

import { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  Printer,
  Minus,
  Plus,
  BookOpen,
  Share2,
  Check,
  Link as LinkIcon,
} from "lucide-react";

interface ArticleReaderToolbarProps {
  title: string;
  slug: string;
  content: string;
  fontSize: "sm" | "base" | "lg" | "xl";
  setFontSize: (size: "sm" | "base" | "lg" | "xl") => void;
  fontFamily: "serif" | "sans";
  setFontFamily: (font: "serif" | "sans") => void;
}

export function ArticleReaderToolbar({
  title,
  slug,
  content,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
}: ArticleReaderToolbarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Check bookmark status from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = JSON.parse(localStorage.getItem("kronika_bookmarks") || "[]");
        setIsBookmarked(saved.includes(slug));
      } catch {
        // ignore
      }
      if ("speechSynthesis" in window) {
        setSpeechSupported(true);
      }
    }
  }, [slug]);

  // Handle Bookmark toggle
  const toggleBookmark = () => {
    try {
      const saved: string[] = JSON.parse(
        localStorage.getItem("kronika_bookmarks") || "[]"
      );
      let updated: string[];
      if (saved.includes(slug)) {
        updated = saved.filter((s) => s !== slug);
        setIsBookmarked(false);
      } else {
        updated = [...saved, slug];
        setIsBookmarked(true);
      }
      localStorage.setItem("kronika_bookmarks", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Handle Text-To-Speech (Dengarkan Berita)
  const toggleSpeech = () => {
    if (!speechSupported || typeof window === "undefined") return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown headings/symbols for clean reading
    const cleanText = `${title}. ${content.replace(/[#*`_>-]/g, " ")}`;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "id-ID";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Print Article
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Copy link
  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // fallback
      }
    }
  };

  const fontSizes: ("sm" | "base" | "lg" | "xl")[] = ["sm", "base", "lg", "xl"];

  const handleDecreaseFont = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx > 0) setFontSize(fontSizes[idx - 1]);
  };

  const handleIncreaseFont = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx < fontSizes.length - 1) setFontSize(fontSizes[idx + 1]);
  };

  return (
    <div className="bg-[#FAF8F5] border-y border-stone-300 py-3 my-4 flex flex-wrap items-center justify-between gap-3 text-stone-700">
      {/* Kiri: Preferensi Tipografi Membaca */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mr-1 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Format Baca:</span>
        </span>

        {/* Font size control */}
        <div className="inline-flex items-center border border-stone-300 bg-white">
          <button
            onClick={handleDecreaseFont}
            disabled={fontSize === "sm"}
            title="Perkecil Ukuran Teks"
            aria-label="Perkecil Ukuran Teks"
            className="p-1.5 hover:bg-stone-100 disabled:opacity-40 transition-colors"
          >
            <Minus className="w-3 h-3 text-stone-800" />
          </button>
          <span className="px-2 font-mono text-xs font-semibold text-stone-900 border-x border-stone-200 uppercase min-w-[2.5rem] text-center">
            {fontSize === "sm" ? "16px" : fontSize === "base" ? "18px" : fontSize === "lg" ? "20px" : "22px"}
          </span>
          <button
            onClick={handleIncreaseFont}
            disabled={fontSize === "xl"}
            title="Perbesar Ukuran Teks"
            aria-label="Perbesar Ukuran Teks"
            className="p-1.5 hover:bg-stone-100 disabled:opacity-40 transition-colors"
          >
            <Plus className="w-3 h-3 text-stone-800" />
          </button>
        </div>

        {/* Serif / Sans Font Toggle */}
        <div className="inline-flex items-center border border-stone-300 bg-white font-mono text-xs">
          <button
            onClick={() => setFontFamily("serif")}
            className={`px-2.5 py-1 transition-colors ${
              fontFamily === "serif"
                ? "bg-stone-900 text-white font-bold"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => setFontFamily("sans")}
            className={`px-2.5 py-1 border-l border-stone-300 transition-colors ${
              fontFamily === "sans"
                ? "bg-stone-900 text-white font-bold"
                : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            Sans
          </button>
        </div>
      </div>

      {/* Kanan: Alat Interaktif (Audio, Simpan, Cetak, Salin) */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Dengarkan Berita */}
        {speechSupported && (
          <button
            onClick={toggleSpeech}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors ${
              isSpeaking
                ? "bg-red-600 text-white border-red-700 animate-pulse"
                : "bg-white border-stone-300 hover:border-stone-900 text-stone-800"
            }`}
            title="Dengarkan pembacaan naskah berita"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Hentikan Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengarkan</span>
              </>
            )}
          </button>
        )}

        {/* Simpan / Bookmark */}
        <button
          onClick={toggleBookmark}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors ${
            isBookmarked
              ? "bg-stone-900 text-white border-stone-950"
              : "bg-white border-stone-300 hover:border-stone-900 text-stone-800"
          }`}
          title={isBookmarked ? "Tersimpan di daftar baca" : "Simpan untuk dibaca nanti"}
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Tersimpan</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </>
          )}
        </button>

        {/* Cetak Halaman */}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-stone-300 hover:border-stone-900 bg-white text-xs font-mono text-stone-800 uppercase tracking-wider transition-colors"
          title="Cetak artikel dalam format kertas"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cetak</span>
        </button>

        {/* Salin Tautan */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-stone-300 hover:border-stone-900 bg-white text-xs font-mono text-stone-800 uppercase tracking-wider transition-colors"
          title="Salin tautan berita"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Tersalin</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salin</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

