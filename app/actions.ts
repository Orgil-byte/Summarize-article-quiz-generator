"use server";

import prisma from "@/lib/prisma";

type ArticleData = {
  title: string;
  content: string;
  summary: string | undefined;
  userId: string | undefined;
};

export async function saveArticleAction(data: ArticleData) {
  if (data.title === "" || data.content === "") {
    console.log("Title and content cannot be blank");
    return { succes: false, error: "Cannot be blank" };
  }
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

export async function getArticles() {
  try {
    const articles = await prisma.article.findMany();

    return { data: articles };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save article" };
  }
}

export async function getArticleById(id: number | undefined) {
  try {
    const articles = await prisma.article.findUnique({
      where: { id: id },
    });

    return { data: articles };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save article" };
  }
}
