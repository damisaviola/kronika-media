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
    <div className="flex items-center gap-2 py-1 flex-wrap">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      <button
        onClick={shareToTwitter}
        aria-label="Bagikan ke X Twitter"
        className="px-3 py-1 rounded-full border border-zinc-200 hover:border-zinc-900 bg-white text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors shadow-2xs"
      >
        X / Twitter
      </button>

      <button
        onClick={shareToWhatsApp}
        aria-label="Bagikan ke WhatsApp"
        className="px-3 py-1 rounded-full border border-zinc-200 hover:border-zinc-900 bg-white text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors shadow-2xs"
      >
        WhatsApp
      </button>

      <button
        onClick={handleCopyLink}
        aria-label="Salin tautan berita"
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-zinc-200 hover:border-zinc-900 bg-white text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors shadow-2xs"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-700">Tersalin</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3 h-3" />
            <span>Salin Link</span>
          </>
        )}
      </button>
    </div>
  );
}
