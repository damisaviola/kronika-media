import { PrismaClient } from "@prisma/client";
import { SEED_USERS, SEED_CATEGORIES, SEED_ARTICLES } from "../src/lib/data/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Prisma seed for Kronika News Portal...");

  // Seed Users
  for (const user of SEED_USERS) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      },
    });
  }
  console.log(`✅ Seeded ${SEED_USERS.length} authors.`);

  // Seed Categories
  for (const category of SEED_CATEGORIES) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
    });
  }
  console.log(`✅ Seeded ${SEED_CATEGORIES.length} editorial categories.`);

  // Seed Articles
  for (const article of SEED_ARTICLES) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: {
        title: article.title,
        subtitle: article.subtitle,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        coverImageUrl: article.coverImageUrl,
        coverImageCaption: article.coverImageCaption,
        status: article.status,
        isHeadline: article.isHeadline,
        isBreaking: article.isBreaking,
        isOpinion: article.isOpinion,
        viewsCount: article.viewsCount,
        readingTime: article.readingTime,
        tags: article.tags,
        publishedAt: new Date(article.publishedAt),
        authorId: article.authorId,
        categoryId: article.categoryId,
      },
      create: {
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        coverImageUrl: article.coverImageUrl,
        coverImageCaption: article.coverImageCaption,
        status: article.status,
        isHeadline: article.isHeadline,
        isBreaking: article.isBreaking,
        isOpinion: article.isOpinion,
        viewsCount: article.viewsCount,
        readingTime: article.readingTime,
        tags: article.tags,
        publishedAt: new Date(article.publishedAt),
        authorId: article.authorId,
        categoryId: article.categoryId,
      },
    });
  }
  console.log(`✅ Seeded ${SEED_ARTICLES.length} investigative articles.`);
  console.log("✨ Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
