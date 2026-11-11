"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getArticleUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/berita/${slug}`;
    }
    return `https://kronika.id/berita/${slug}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getArticleUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const shareToTwitter = () => {
    const url = getArticleUrl();
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}&via=kronika_id`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

  const shareToWhatsApp = () => {
    const url = getArticleUrl();
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title}\n\n${url}`
    )}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2 py-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500 mr-2 flex items-center gap-1">
        <Share2 className="w-3 h-3" />
        <span>Bagikan:</span>
      </span>

      <button
        onClick={shareToTwitter}
        aria-label="Bagikan ke X Twitter"
        className="px-2.5 py-1 border border-stone-300 hover:border-stone-900 bg-white font-mono text-xs text-stone-700 hover:text-stone-950 transition-colors"
      >
        X (Twitter)
      </button>

      <button
        onClick={shareToWhatsApp}
        aria-label="Bagikan ke WhatsApp"
        className="px-2.5 py-1 border border-stone-300 hover:border-stone-900 bg-white font-mono text-xs text-stone-700 hover:text-stone-950 transition-colors"
      >
        WhatsApp
      </button>

      <button
        onClick={handleCopyLink}
        aria-label="Salin tautan berita"
        className="inline-flex items-center gap-1 px-2.5 py-1 border border-stone-300 hover:border-stone-900 bg-white font-mono text-xs text-stone-700 hover:text-stone-950 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Tersalin</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3 h-3" />
            <span>Salin Tautan</span>
          </>
        )}
      </button>
    </div>
  );
}
