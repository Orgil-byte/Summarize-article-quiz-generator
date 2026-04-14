"use server";

import prisma from "@/lib/prisma";

type ArticleData = {
  title: string;
  content: string;
  summary: string | undefined;
  userId: string | undefined;
};

export async function saveArticleAction(data: ArticleData) {
  try {
    const savedArticle = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        summary: data.summary,
        userId: data.userId,
      },
    });

    return { success: true, data: savedArticle };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save article" };
  }
}
