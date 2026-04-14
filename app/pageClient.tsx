"use client";

import { ArticleQuizGenerator } from "./_components/article-quiz-generator";
import { useState } from "react";

export default function PageClient() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="w-full pt-38 pb-20">
      <ArticleQuizGenerator
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />
    </div>
  );
}
