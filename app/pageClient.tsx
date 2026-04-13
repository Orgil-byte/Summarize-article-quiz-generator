"use client";

import { ArticleQuizGenerator } from "./_components/article-quiz-generator";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export default function PageClient() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const generateSummary = async () => {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please provide a concise summary of the following article: ${content}`,
    });

    console.log(response.text);
  };

  return (
    <div className="w-full pt-38 pb-20">
      <ArticleQuizGenerator
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        generateSummary={generateSummary}
      />
    </div>
  );
}
