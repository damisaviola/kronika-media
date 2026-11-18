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

  const toggleSpeech = () => {
    if (!speechSupported || typeof window === "undefined") return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = `${title}. ${content.replace(/[#*`_>-]/g, " ")}`;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "id-ID";
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

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
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-3 my-4 flex flex-wrap items-center justify-between gap-3 text-zinc-700 shadow-2xs">
      {/* Kiri: Preferensi Tipografi */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Teks:</span>
        </span>

        {/* Font size control */}
        <div className="inline-flex items-center border border-zinc-200 rounded-full bg-zinc-50 overflow-hidden">
          <button
            onClick={handleDecreaseFont}
            disabled={fontSize === "sm"}
            title="Perkecil Teks"
            aria-label="Perkecil Teks"
            className="p-1.5 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
          >
            <Minus className="w-3 h-3 text-zinc-700" />
          </button>
          <span className="px-2 font-mono text-xs font-bold text-zinc-800 min-w-[2.2rem] text-center">
            {fontSize === "sm" ? "16" : fontSize === "base" ? "18" : fontSize === "lg" ? "20" : "22"}
          </span>
          <button
            onClick={handleIncreaseFont}
            disabled={fontSize === "xl"}
            title="Perbesar Teks"
            aria-label="Perbesar Teks"
            className="p-1.5 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
          >
            <Plus className="w-3 h-3 text-zinc-700" />
          </button>
        </div>

        {/* Serif / Sans Font Toggle */}
        <div className="inline-flex items-center border border-zinc-200 rounded-full bg-zinc-50 p-0.5 text-xs font-medium">
          <button
            onClick={() => setFontFamily("sans")}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              fontFamily === "sans"
                ? "bg-zinc-950 text-white font-bold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Sans
          </button>
          <button
            onClick={() => setFontFamily("serif")}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              fontFamily === "serif"
                ? "bg-zinc-950 text-white font-bold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Serif
          </button>
        </div>
      </div>

      {/* Kanan: Alat Interaktif */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {speechSupported && (
          <button
            onClick={toggleSpeech}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              isSpeaking
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
            }`}
            title="Dengarkan artikel"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengar</span>
              </>
            )}
          </button>
        )}

        {/* Simpan */}
        <button
          onClick={toggleBookmark}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            isBookmarked
              ? "bg-zinc-950 text-white"
              : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
          }`}
          title={isBookmarked ? "Tersimpan" : "Simpan artikel"}
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Disimpan</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </>
          )}
        </button>

        {/* Salin Tautan */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-700 transition-colors"
          title="Salin tautan artikel"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Tersalin</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Salin</span>
            </>
          )}
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1 p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
          title="Cetak artikel"
        >
          <Printer className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
