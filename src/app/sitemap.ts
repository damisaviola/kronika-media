import { MetadataRoute } from "next";
import { getHomepageData } from "@/lib/queries/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kronika.id";
  const { latestDispatches, categories, mostRead, headline } = await getHomepageData();

  // Combine unique articles
  const allArticles = [
    ...(headline ? [headline] : []),
    ...latestDispatches,
    ...mostRead,
  ];

  const uniqueArticles = Array.from(
    new Map(allArticles.map((item) => [item.slug, item])).values()
  );

  const articleEntries: MetadataRoute.Sitemap = uniqueArticles.map((art) => ({
    url: `${baseUrl}/berita/${art.slug}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: "daily",
    priority: art.isHeadline ? 1.0 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/kategori/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cari`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...categoryEntries,
    ...articleEntries,
  ];
}

