import Link from "next/link";
import { PenLine, FileText, Eye, CheckCircle2 } from "lucide-react";
import { getDashboardArticles } from "@/lib/queries/articles";
import { DashboardArticleActions } from "@/components/cms/DashboardArticleActions";
import { formatTanggalSingkat } from "@/lib/utils";

export default async function DashboardPage() {
  const articles = await getDashboardArticles();

  const totalArticles = articles.length;
  const publishedArticles = articles.filter((a) => a.status === "PUBLISHED").length;
  const draftArticles = articles.filter((a) => a.status === "DRAFT").length;
  const totalViews = articles.reduce((acc, curr) => acc + curr.viewsCount, 0);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            Studio Editorial KRONIKA · Timika
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Kelola publikasi pop culture, hip-hop Papua, ulasan game, film, anime, dan tren dunia.
          </p>
        </div>

        <Link
          href="/dashboard/tulis"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-rose-700 transition-colors shadow-xs self-start sm:self-auto"
        >
          <PenLine className="w-3.5 h-3.5" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {/* Metric Cards Modern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Total Artikel</span>
            <FileText className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-3xl font-black text-zinc-950">
            {totalArticles}
          </div>
          <div className="text-xs text-zinc-500 font-medium">
            {publishedArticles} Terbit · {draftArticles} Draf
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Total Pembaca</span>
            <Eye className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-3xl font-black text-zinc-950">
            {new Intl.NumberFormat("id-ID").format(totalViews)}
          </div>
          <div className="text-xs text-zinc-500 font-medium">
            Akumulasi seluruh rubrik
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Top Story Utama</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-base font-bold text-zinc-950 line-clamp-1">
            {articles.find((a) => a.isHeadline)?.title || "Belum dipilih"}
          </div>
          <div className="text-xs text-emerald-600 font-semibold">
            Aktif di Halaman Depan
          </div>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Status Sistem</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse" />
          </div>
          <div className="text-base font-bold text-zinc-950">
            Online & Aktif
          </div>
          <div className="text-xs text-zinc-500 font-medium">
            Next.js App Router
          </div>
        </div>
      </div>

      {/* Editorial Articles Table Modern */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
            Daftar Publikasi Artikel ({articles.length})
          </h2>
          <span className="text-[11px] text-zinc-400 font-medium">
            Urutan Berdasarkan Waktu Rilis
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Judul Artikel</th>
                <th className="py-3 px-4">Kanal</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Pembaca</th>
                <th className="py-3 px-4">Tanggal Rilis</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-900 max-w-xs sm:max-w-md">
                    <Link
                      href={`/berita/${art.slug}`}
                      target="_blank"
                      className="hover:text-rose-600 transition-colors line-clamp-1"
                    >
                      {art.title}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {art.isHeadline && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-100 text-amber-800">
                          Top Story
                        </span>
                      )}
                      {art.isBreaking && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-100 text-rose-800">
                          Hype
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-semibold text-[10px]">
                      {art.category.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-600 font-medium">
                    {art.author.name}
                  </td>
                  <td className="py-3 px-4">
                    {art.status === "PUBLISHED" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Terbit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Draf
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-500">
                    {art.viewsCount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-4 text-zinc-500">
                    {formatTanggalSingkat(art.publishedAt)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <DashboardArticleActions
                      id={art.id}
                      slug={art.slug}
                      status={art.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
