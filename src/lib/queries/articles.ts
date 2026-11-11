import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  SEED_ARTICLES,
  SEED_CATEGORIES,
  SEED_USERS,
  type SeedArticle,
  type SeedCategory,
  type SeedUser,
} from "@/lib/data/seed-data";

export interface ArticleAuthor {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string | null;
  avatarUrl: string | null;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface ArticleWithRelations {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageCaption: string | null;
  status: "DRAFT" | "PUBLISHED";
  isHeadline: boolean;
  isBreaking: boolean;
  isOpinion: boolean;
  viewsCount: number;
  readingTime: number;
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  categoryId: string;
  author: ArticleAuthor;
  category: ArticleCategory;
}

// Transform seed article into typed ArticleWithRelations
function hydrateSeedArticle(art: SeedArticle): ArticleWithRelations {
  const author = SEED_USERS.find((u) => u.id === art.authorId) || SEED_USERS[0];
  const category = SEED_CATEGORIES.find((c) => c.id === art.categoryId) || SEED_CATEGORIES[0];

  return {
    ...art,
    publishedAt: new Date(art.publishedAt),
    createdAt: new Date(art.publishedAt),
    updatedAt: new Date(art.publishedAt),
    author: {
      id: author.id,
      name: author.name,
      email: author.email,
      role: author.role,
      bio: author.bio,
      avatarUrl: author.avatarUrl,
    },
    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
    },
  };
}

export interface HomepageData {
  headline: ArticleWithRelations | null;
  latestDispatches: ArticleWithRelations[];
  mostRead: ArticleWithRelations[];
  opinions: ArticleWithRelations[];
  categories: ArticleCategory[];
  categoryArticles: Record<string, ArticleWithRelations[]>;
  breakingTickers: ArticleWithRelations[];
}

/**
 * Fetch Homepage data with cache & fallback
 */
export const getHomepageData = unstable_cache(
  async (): Promise<HomepageData> => {
    try {
      const [dbArticles, dbCategories] = await Promise.all([
        prisma.article.findMany({
          where: { status: "PUBLISHED" },
          include: {
            author: true,
            category: true,
          },
          orderBy: { publishedAt: "desc" },
        }),
        prisma.category.findMany({
          orderBy: { name: "asc" },
        }),
      ]);

      if (dbArticles.length > 0) {
        const headline =
          dbArticles.find((a) => a.isHeadline) || dbArticles[0] || null;
        const latestDispatches = dbArticles.slice(0, 6);
        const mostRead = [...dbArticles]
          .sort((a, b) => b.viewsCount - a.viewsCount)
          .slice(0, 5);
        const opinions = dbArticles.filter((a) => a.isOpinion).slice(0, 3);
        const breakingTickers = dbArticles.filter((a) => a.isBreaking);

        const categoryArticles: Record<string, ArticleWithRelations[]> = {};
        for (const cat of dbCategories) {
          categoryArticles[cat.slug] = dbArticles
            .filter((a) => a.categoryId === cat.id)
            .slice(0, 4);
        }

        return {
          headline,
          latestDispatches,
          mostRead,
          opinions,
          categories: dbCategories,
          categoryArticles,
          breakingTickers: breakingTickers.length > 0 ? breakingTickers : dbArticles.slice(0, 3),
        };
      }
    } catch {
      // Graceful fallback to rich journalistic seed dataset
    }

    // Fallback using seed data
    const hydrated = SEED_ARTICLES.filter((a) => a.status === "PUBLISHED").map(hydrateSeedArticle);
    const headline = hydrated.find((a) => a.isHeadline) || hydrated[0] || null;
    const latestDispatches = hydrated.slice(0, 6);
    const mostRead = [...hydrated]
      .sort((a, b) => b.viewsCount - a.viewsCount)
      .slice(0, 5);
    const opinions = hydrated.filter((a) => a.isOpinion).slice(0, 3);
    const breakingTickers = hydrated.filter((a) => a.isBreaking);

    const categoryArticles: Record<string, ArticleWithRelations[]> = {};
    for (const cat of SEED_CATEGORIES) {
      categoryArticles[cat.slug] = hydrated
        .filter((a) => a.categoryId === cat.id)
        .slice(0, 4);
    }

    return {
      headline,
      latestDispatches,
      mostRead,
      opinions,
      categories: SEED_CATEGORIES,
      categoryArticles,
      breakingTickers: breakingTickers.length > 0 ? breakingTickers : hydrated.slice(0, 3),
    };
  },
  ["homepage-data"],
  { tags: ["articles"], revalidate: 60 }
);

export interface ArticleDetailData {
  article: ArticleWithRelations;
  relatedArticles: ArticleWithRelations[];
}

/**
 * Fetch Single Article by slug with related stories
 */
export const getArticleBySlug = unstable_cache(
  async (slug: string): Promise<ArticleDetailData | null> => {
    try {
      const article = await prisma.article.findUnique({
        where: { slug },
        include: {
          author: true,
          category: true,
        },
      });

      if (article) {
        const related = await prisma.article.findMany({
          where: {
            categoryId: article.categoryId,
            id: { not: article.id },
            status: "PUBLISHED",
          },
          include: {
            author: true,
            category: true,
          },
          take: 4,
          orderBy: { publishedAt: "desc" },
        });

        return {
          article,
          relatedArticles: related,
        };
      }
    } catch {
      // Fallback
    }

    const matched = SEED_ARTICLES.find((a) => a.slug === slug);
    if (!matched) return null;

    const hydratedArticle = hydrateSeedArticle(matched);
    const related = SEED_ARTICLES.filter(
      (a) => a.categoryId === matched.categoryId && a.id !== matched.id
    )
      .slice(0, 4)
      .map(hydrateSeedArticle);

    return {
      article: hydratedArticle,
      relatedArticles: related,
    };
  },
  ["article-by-slug"],
  { tags: ["articles"], revalidate: 60 }
);

/**
 * Fetch Articles by Category slug
 */
export const getArticlesByCategory = unstable_cache(
  async (categorySlug: string): Promise<{ category: ArticleCategory | null; articles: ArticleWithRelations[] }> => {
    try {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });

      if (category) {
        const articles = await prisma.article.findMany({
          where: {
            categoryId: category.id,
            status: "PUBLISHED",
          },
          include: {
            author: true,
            category: true,
          },
          orderBy: { publishedAt: "desc" },
        });

        return {
          category,
          articles,
        };
      }
    } catch {
      // Fallback
    }

    const cat = SEED_CATEGORIES.find((c) => c.slug === categorySlug) || null;
    if (!cat) return { category: null, articles: [] };

    const articles = SEED_ARTICLES.filter(
      (a) => a.categoryId === cat.id && a.status === "PUBLISHED"
    ).map(hydrateSeedArticle);

    return {
      category: cat,
      articles,
    };
  },
  ["articles-by-category"],
  { tags: ["articles"], revalidate: 60 }
);

/**
 * Search Articles by keyword
 */
export const searchArticles = unstable_cache(
  async (query: string): Promise<ArticleWithRelations[]> => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    try {
      const articles = await prisma.article.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: trimmed, mode: "insensitive" } },
            { excerpt: { contains: trimmed, mode: "insensitive" } },
            { content: { contains: trimmed, mode: "insensitive" } },
            { tags: { has: trimmed } },
          ],
        },
        include: {
          author: true,
          category: true,
        },
        orderBy: { publishedAt: "desc" },
      });

      if (articles.length > 0) return articles;
    } catch {
      // Fallback
    }

    return SEED_ARTICLES.filter(
      (a) =>
        a.status === "PUBLISHED" &&
        (a.title.toLowerCase().includes(trimmed) ||
          a.excerpt.toLowerCase().includes(trimmed) ||
          a.content.toLowerCase().includes(trimmed) ||
          a.tags.some((t) => t.toLowerCase().includes(trimmed)))
    ).map(hydrateSeedArticle);
  },
  ["search-articles"],
  { tags: ["articles"], revalidate: 30 }
);

/**
 * Get all articles for Redaksi Dashboard
 */
export async function getDashboardArticles(): Promise<ArticleWithRelations[]> {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
    if (articles.length > 0) return articles;
  } catch {
    // Fallback
  }

  return SEED_ARTICLES.map(hydrateSeedArticle);
}

/**
 * Get categories list
 */
export async function getCategories(): Promise<ArticleCategory[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    if (categories.length > 0) return categories;
  } catch {
    // Fallback
  }
  return SEED_CATEGORIES;
}

/**
 * Get authors list
 */
export async function getAuthors(): Promise<ArticleAuthor[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
    });
    if (users.length > 0) return users;
  } catch {
    // Fallback
  }
  return SEED_USERS;
}

