import Link from "next/link";
import { PenLine, FileText, Eye, CheckCircle2, AlertTriangle } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-stone-900 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-stone-950">
            Dasbor Meja Redaksi
          </h1>
          <p className="font-mono text-xs text-stone-500 uppercase tracking-wider mt-1">
            Arsip Manajemen Konten Jurnalistik & Metrik Pembaca
          </p>
        </div>

        <Link
          href="/dashboard/tulis"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-red-700 transition-colors shadow-sm self-start sm:self-auto"
        >
          <PenLine className="w-3.5 h-3.5" />
          <span>Tulis Berita Baru</span>
        </Link>
      </div>

      {/* Metric Cards (Anti-AI Slop: Sharp corners, hairline borders, muted tones) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-300 p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-500 font-mono text-[11px] uppercase">
            <span>Total Berita</span>
            <FileText className="w-4 h-4 text-stone-400" />
          </div>
          <div className="font-serif text-3xl font-black text-stone-950">
            {totalArticles}
          </div>
          <div className="font-mono text-[10px] text-stone-500">
            {publishedArticles} Terbit · {draftArticles} Draf
          </div>
        </div>

        <div className="bg-white border border-stone-300 p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-500 font-mono text-[11px] uppercase">
            <span>Total Pembaca</span>
            <Eye className="w-4 h-4 text-stone-400" />
          </div>
          <div className="font-serif text-3xl font-black text-stone-950">
            {new Intl.NumberFormat("id-ID").format(totalViews)}
          </div>
          <div className="font-mono text-[10px] text-stone-500">
            Akumulasi seluruh rubrik
          </div>
        </div>

        <div className="bg-white border border-stone-300 p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-500 font-mono text-[11px] uppercase">
            <span>Laporan Utama</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-lg font-bold text-stone-950 line-clamp-1">
            {articles.find((a) => a.isHeadline)?.title || "Belum dipilih"}
          </div>
          <div className="font-mono text-[10px] text-emerald-700 font-semibold">
            Aktif di Halaman Depan
          </div>
        </div>

        <div className="bg-white border border-stone-300 p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-500 font-mono text-[11px] uppercase">
            <span>Status Server</span>
            <span className="w-2 h-2 bg-emerald-600 rounded-full inline-block" />
          </div>
          <div className="font-mono text-sm font-bold text-stone-950">
            Node v24.22
          </div>
          <div className="font-mono text-[10px] text-stone-500">
            App Router & Server Actions
          </div>
        </div>
      </div>

      {/* Editorial Articles Table */}
      <div className="bg-white border border-stone-300">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950">
            Daftar Publikasi Berita ({articles.length})
          </h2>
          <span className="font-mono text-[10px] text-stone-500 uppercase">
            Urutan Berdasarkan Waktu Rilis
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF8F5] border-b border-stone-300 font-mono text-[11px] uppercase tracking-wider text-stone-600">
              <tr>
                <th className="py-3 px-4">Judul & Rubrik</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Pembaca</th>
                <th className="py-3 px-4">Waktu Terbit</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4 max-w-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase font-bold text-red-700 bg-red-50 px-1.5 py-0.5 border border-red-200">
                        {art.category.name}
                      </span>
                      {art.isHeadline && (
                        <span className="font-mono text-[10px] uppercase font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 border border-stone-300">
                          ★ Headline
                        </span>
                      )}
                      {art.isBreaking && (
                        <span className="font-mono text-[10px] uppercase font-bold text-white bg-red-600 px-1.5 py-0.5">
                          Kilas
                        </span>
                      )}
                      {art.isOpinion && (
                        <span className="font-mono text-[10px] uppercase font-bold text-stone-700 bg-stone-200 px-1.5 py-0.5">
                          Opini
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/berita/${art.slug}`}
                      className="font-serif font-bold text-sm text-stone-950 hover:underline decoration-stone-900 line-clamp-1"
                    >
                      {art.title}
                    </Link>
                    <div className="font-mono text-[10px] text-stone-500 mt-0.5">
                      /{art.slug}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-stone-700 whitespace-nowrap">
                    {art.author.name}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {art.status === "PUBLISHED" ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 uppercase">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                        Terbit
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 uppercase">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Draf
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono text-stone-800 whitespace-nowrap">
                    {new Intl.NumberFormat("id-ID").format(art.viewsCount)}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-stone-500 whitespace-nowrap">
                    {formatTanggalSingkat(art.publishedAt)}
                  </td>

                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
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

