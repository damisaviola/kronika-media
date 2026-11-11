"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send, Eye, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { saveArticleAction, type ActionState } from "@/actions/article.actions";
import { type ArticleCategory, type ArticleAuthor, type ArticleWithRelations } from "@/lib/queries/articles";
import { calculateReadingTime, generateSlug, formatTanggalIndo } from "@/lib/utils";

interface ArticleFormProps {
  initialArticle?: ArticleWithRelations | null;
  categories: ArticleCategory[];
  authors: ArticleAuthor[];
}

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ArticleForm({
  initialArticle,
  categories,
  authors,
}: ArticleFormProps) {
  const [state, formAction, isPending] = useActionState(saveArticleAction, initialState);

  // Form local state for live preview
  const [title, setTitle] = useState(initialArticle?.title || "");
  const [subtitle, setSubtitle] = useState(initialArticle?.subtitle || "");
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || "");
  const [content, setContent] = useState(initialArticle?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialArticle?.coverImageUrl ||
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80"
  );
  const [coverImageCaption, setCoverImageCaption] = useState(
    initialArticle?.coverImageCaption || ""
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialArticle?.categoryId || categories[0]?.id || ""
  );
  const [selectedAuthorId, setSelectedAuthorId] = useState(
    initialArticle?.authorId || authors[0]?.id || ""
  );
  const [isHeadline, setIsHeadline] = useState(initialArticle?.isHeadline || false);
  const [isBreaking, setIsBreaking] = useState(initialArticle?.isBreaking || false);
  const [isOpinion, setIsOpinion] = useState(initialArticle?.isOpinion || false);
  const [tags, setTags] = useState(initialArticle?.tags.join(", ") || "Investigasi, Kebijakan Publik");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    initialArticle?.status || "PUBLISHED"
  );

  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  const previewSlug = generateSlug(title || "judul-artikel-berita");
  const readingTime = calculateReadingTime(content);
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const selectedAuthor = authors.find((a) => a.id === selectedAuthorId);

  // Split content into paragraphs for preview
  const paragraphs = content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-300 gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 border border-stone-300 hover:border-stone-900 bg-white transition-colors"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-4 h-4 text-stone-700" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-950">
              {initialArticle ? "Sunting Artikel Berita" : "Tulis Berita Baru"}
            </h1>
            <p className="font-mono text-xs text-stone-500 uppercase tracking-wider">
              {initialArticle ? `ID: ${initialArticle.id}` : "Format Editorial Standar KRONIKA"}
            </p>
          </div>
        </div>

        {/* View Switcher: Editor / Live Preview */}
        <div className="flex items-center gap-2">
          <div className="inline-flex border border-stone-300 bg-stone-100 p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-1.5 px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeTab === "editor"
                  ? "bg-white text-stone-950 font-bold shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeTab === "preview"
                  ? "bg-white text-stone-950 font-bold shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {state.message && (
        <div
          className={`p-4 border flex items-start gap-3 ${
            state.success
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-red-50 border-red-300 text-red-950"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-xs font-mono">
            <p className="font-bold uppercase tracking-wider">{state.message}</p>
            {state.errors && (
              <ul className="list-disc pl-4 mt-2 space-y-1">
                {Object.entries(state.errors).map(([field, errs]) => (
                  <li key={field}>
                    <span className="font-bold">{field}:</span> {errs.join(", ")}
                  </li>
                ))}
              </ul>
            )}
            {state.data?.slug && (
              <div className="mt-2">
                <Link
                  href={`/berita/${state.data.slug}`}
                  className="inline-flex items-center gap-1 underline font-semibold text-emerald-900 hover:text-emerald-700"
                >
                  Lihat Berita yang Dipublikasikan →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Layout: Editor & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form Column */}
        <div
          className={`${
            activeTab === "preview" ? "hidden lg:block lg:col-span-6" : "col-span-12 lg:col-span-6"
          }`}
        >
          <form action={formAction} className="space-y-5 bg-white border border-stone-300 p-6">
            {initialArticle && <input type="hidden" name="id" value={initialArticle.id} />}

            {/* Judul Berita */}
            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                Judul Berita (Headline) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Anatomi Krisis Mineral Kritis..."
                required
                className="w-full bg-[#FAF8F5] border border-stone-300 p-2.5 text-sm font-serif font-bold text-stone-950 focus:outline-none focus:border-stone-950"
              />
              <p className="font-mono text-[10px] text-stone-500">
                Slug otomatis: <code className="text-stone-800">/berita/{previewSlug}</code>
              </p>
            </div>

            {/* Subjudul / Deck */}
            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                Subjudul / Deck Eksplanatori
              </label>
              <input
                type="text"
                name="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Penjelasan ringkas konteks berita (1-2 kalimat)..."
                className="w-full bg-[#FAF8F5] border border-stone-300 p-2 text-sm font-serif italic text-stone-800 focus:outline-none focus:border-stone-950"
              />
            </div>

            {/* Kategori & Penulis Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                  Rubrik Kategori <span className="text-red-600">*</span>
                </label>
                <select
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  required
                  className="w-full bg-[#FAF8F5] border border-stone-300 p-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-950"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                  Jurnalis / Penulis <span className="text-red-600">*</span>
                </label>
                <select
                  name="authorId"
                  value={selectedAuthorId}
                  onChange={(e) => setSelectedAuthorId(e.target.value)}
                  required
                  className="w-full bg-[#FAF8F5] border border-stone-300 p-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-950"
                >
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gambar Sampul & Caption */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="space-y-1">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                  URL Gambar Sampul (16:10) <span className="text-red-600">*</span>
                </label>
                <input
                  type="url"
                  name="coverImageUrl"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  required
                  className="w-full bg-[#FAF8F5] border border-stone-300 p-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-stone-950"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                  Caption Jurnalistik & Kredit Foto
                </label>
                <input
                  type="text"
                  name="coverImageCaption"
                  value={coverImageCaption}
                  onChange={(e) => setCoverImageCaption(e.target.value)}
                  placeholder="Deskripsi foto jurnalistik. Foto: Kronika / Nama Fotografer."
                  className="w-full bg-[#FAF8F5] border border-stone-300 p-2 text-xs font-sans text-stone-800 focus:outline-none focus:border-stone-950"
                />
              </div>
            </div>

            {/* Excerpt Ringkasan */}
            <div className="space-y-1 pt-2 border-t border-stone-200">
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                Ringkasan / Lead In (Excerpt) <span className="text-red-600">*</span>
              </label>
              <textarea
                name="excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Ringkasan tajam untuk display berita dan indeks mesin pencari..."
                required
                className="w-full bg-[#FAF8F5] border border-stone-300 p-2 text-xs font-sans text-stone-900 focus:outline-none focus:border-stone-950"
              />
            </div>

            {/* Isi Artikel Penuh */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                  Naskah Berita Lengkap <span className="text-red-600">*</span>
                </label>
                <span className="font-mono text-[10px] text-stone-500">
                  {readingTime} Menit Baca Estimasi
                </span>
              </div>
              <textarea
                name="content"
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis naskah berita lengkap di sini. Pisahkan paragraf dengan baris kosong (double Enter)..."
                required
                className="w-full bg-[#FAF8F5] border border-stone-300 p-3 text-sm font-sans text-stone-900 leading-relaxed focus:outline-none focus:border-stone-950"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1">
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-stone-900">
                Label / Tags (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Investigasi, Energi Bersih, Regulasi"
                className="w-full bg-[#FAF8F5] border border-stone-300 p-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-stone-950"
              />
            </div>

            {/* Flagging Editorial */}
            <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 p-2 border border-stone-200 bg-[#FAF8F5] cursor-pointer">
                <input
                  type="checkbox"
                  name="isHeadline"
                  checked={isHeadline}
                  onChange={(e) => setIsHeadline(e.target.checked)}
                  className="rounded-none text-red-600 focus:ring-0"
                />
                <span className="font-mono text-xs uppercase text-stone-900">Laporan Utama</span>
              </label>

              <label className="flex items-center gap-2 p-2 border border-stone-200 bg-[#FAF8F5] cursor-pointer">
                <input
                  type="checkbox"
                  name="isBreaking"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="rounded-none text-red-600 focus:ring-0"
                />
                <span className="font-mono text-xs uppercase text-stone-900">Kilas Berita</span>
              </label>

              <label className="flex items-center gap-2 p-2 border border-stone-200 bg-[#FAF8F5] cursor-pointer">
                <input
                  type="checkbox"
                  name="isOpinion"
                  checked={isOpinion}
                  onChange={(e) => setIsOpinion(e.target.checked)}
                  className="rounded-none text-red-600 focus:ring-0"
                />
                <span className="font-mono text-xs uppercase text-stone-900">Kolom Opini</span>
              </label>
            </div>

            {/* Status Publikasi & Submit */}
            <div className="pt-4 border-t-2 border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="font-mono text-xs text-stone-700 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="PUBLISHED"
                    checked={status === "PUBLISHED"}
                    onChange={() => setStatus("PUBLISHED")}
                    className="text-stone-900"
                  />
                  <span>Terbitkan Langsung</span>
                </label>
                <label className="font-mono text-xs text-stone-700 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="DRAFT"
                    checked={status === "DRAFT"}
                    onChange={() => setStatus("DRAFT")}
                    className="text-stone-900"
                  />
                  <span>Simpan Draf</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isPending ? "Menyimpan Naskah..." : "Kirim ke Redaksi"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Editorial Typography Preview Column */}
        <div
          className={`${
            activeTab === "editor" ? "hidden lg:block lg:col-span-6" : "col-span-12 lg:col-span-6"
          }`}
        >
          <div className="sticky top-6 bg-[#FAF8F5] border border-stone-300 p-6 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-stone-900 pb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-red-600" />
                <span>Live Editorial Typography Preview</span>
              </span>
              <span className="font-mono text-[10px] text-stone-500 uppercase">
                {readingTime} MIN READ
              </span>
            </div>

            {/* Editorial Category & Status Badges */}
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
              <span className="bg-red-600 text-white px-2 py-0.5 font-bold">
                {selectedCategory?.name || "Rubrik Berita"}
              </span>
              {isHeadline && (
                <span className="border border-stone-900 text-stone-900 px-2 py-0.5">
                  ★ Laporan Utama
                </span>
              )}
              {isOpinion && (
                <span className="bg-stone-200 text-stone-800 px-2 py-0.5">
                  Kolom Opini
                </span>
              )}
            </div>

            {/* Headline Display */}
            <h1 className="font-serif tracking-tight text-3xl md:text-4xl font-black text-stone-950 leading-[1.08]">
              {title || "Judul Berita Editorial Akan Tampil dengan Tipografi Serif Kontras Tinggi"}
            </h1>

            {/* Subtitle / Deck */}
            {subtitle && (
              <p className="font-serif italic text-lg text-stone-700 leading-snug">
                {subtitle}
              </p>
            )}

            {/* Metadata Line */}
            <div className="pt-2 border-t border-b border-stone-200 py-2 flex items-center justify-between font-mono text-[11px] text-stone-600">
              <div>
                Oleh <strong className="text-stone-900 uppercase">{selectedAuthor?.name || "Redaksi"}</strong>
              </div>
              <div>{formatTanggalIndo(new Date())}</div>
            </div>

            {/* Cover Image Preview */}
            {coverImageUrl && (
              <div className="space-y-1.5">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
                  <Image
                    src={coverImageUrl}
                    alt={title || "Cover Preview"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-none"
                  />
                </div>
                {coverImageCaption && (
                  <p className="font-mono text-[10px] text-stone-500">
                    {coverImageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Body Content with Drop Cap */}
            <div className="prose prose-stone max-w-none text-stone-900 leading-relaxed font-sans text-sm space-y-4">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "editorial-drop-cap font-sans leading-relaxed text-stone-900"
                        : "leading-relaxed text-stone-800"
                    }
                  >
                    {p}
                  </p>
                ))
              ) : (
                <p className="editorial-drop-cap text-stone-600 italic">
                  Paragraf pertama naskah berita akan diformat secara otomatis dengan Drop Cap arsitektural khas koran cetak kelas dunia.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

