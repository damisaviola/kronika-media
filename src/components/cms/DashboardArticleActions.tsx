"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ExternalLink, Trash2, RefreshCw, Edit } from "lucide-react";
import { deleteArticleAction, togglePublishAction } from "@/actions/article.actions";

interface DashboardArticleActionsProps {
  id: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
}

export function DashboardArticleActions({
  id,
  slug,
  status,
}: DashboardArticleActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await togglePublishAction(id, status);
    });
  };

  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel berita ini dari arsip redaksi?")) {
      startTransition(async () => {
        await deleteArticleAction(id);
      });
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <Link
        href={`/berita/${slug}`}
        target="_blank"
        title="Lihat Halaman Publik"
        className="p-1 text-stone-600 hover:text-stone-950 hover:bg-stone-200 transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>

      <button
        onClick={handleToggle}
        disabled={isPending}
        title={status === "PUBLISHED" ? "Ubah ke Draf" : "Terbitkan ke Publik"}
        className="p-1 text-stone-600 hover:text-amber-700 hover:bg-stone-200 disabled:opacity-40 transition-colors"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
      </button>

      <button
        onClick={handleDelete}
        disabled={isPending}
        title="Hapus Artikel"
        className="p-1 text-stone-600 hover:text-red-700 hover:bg-stone-200 disabled:opacity-40 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

