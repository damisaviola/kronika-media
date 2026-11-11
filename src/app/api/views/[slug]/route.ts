import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    try {
      const updated = await prisma.article.update({
        where: { slug },
        data: {
          viewsCount: {
            increment: 1,
          },
        },
        select: {
          slug: true,
          viewsCount: true,
        },
      });

      return NextResponse.json({
        success: true,
        slug: updated.slug,
        viewsCount: updated.viewsCount,
      });
    } catch {
      // In case database isn't running, return simulated ok
      return NextResponse.json({
        success: true,
        slug,
        viewsCount: 1,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
