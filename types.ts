interface Quiz {
  id: number;
  question: string;
  options: string[];
  answer: string;
  articleId?: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface ArticleWithQuizzes {
  id: number;
  title: string;
  content: string;
  summary?: string | null;
  userId?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  quizzes: Quiz[];
}
