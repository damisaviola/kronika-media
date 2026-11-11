import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(5, "Judul berita minimal 5 karakter")
    .max(255, "Judul berita maksimal 255 karakter"),
  subtitle: z
    .string()
    .max(350, "Subjudul maksimal 350 karakter")
    .optional()
    .or(z.literal("")),
  slug: z.string().optional().or(z.literal("")),
  excerpt: z
    .string()
    .min(10, "Ringkasan berita minimal 10 karakter")
    .max(500, "Ringkasan berita maksimal 500 karakter"),
  content: z.string().min(20, "Isi berita minimal 20 karakter"),
  coverImageUrl: z.string().url("URL gambar sampul harus berupa link URL yang valid"),
  coverImageCaption: z.string().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  isHeadline: z.boolean().default(false),
  isBreaking: z.boolean().default(false),
  isOpinion: z.boolean().default(false),
  categoryId: z.string().min(1, "Kategori berita wajib dipilih"),
  authorId: z.string().min(1, "Penulis berita wajib dipilih"),
  tags: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val;
      return val
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    })
    .default([]),
});

export type ArticleFormValues = z.infer<typeof ArticleSchema>;
