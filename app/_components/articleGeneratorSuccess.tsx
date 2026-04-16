"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { BookOpen, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuizDialog } from "./QuizDialog";
import { QuizHistoryDialog, type AttemptRecord } from "./QuizHistoryDialog";
import { generateQuiz, type QuizQuestion } from "../utils/generateQuiz";
import { saveQuizzesAction } from "../actions";

type ArticleGeneratorSuccessProps = {
  title: string | undefined;
  summary: string | undefined | null;
  content?: string | undefined | null;
  articleId?: number | undefined;
};

function storageKey(articleId: number) {
  return `quiz-history-${articleId}`;
}

function loadHistory(articleId: number): AttemptRecord[] {
  try {
    const raw = localStorage.getItem(storageKey(articleId));
    return raw ? (JSON.parse(raw) as AttemptRecord[]) : [];
  } catch {
    return [];
  }
}

function saveAttempt(
  articleId: number,
  attempt: AttemptRecord,
): AttemptRecord[] {
  const prev = loadHistory(articleId);
  const next = [...prev, attempt];
  localStorage.setItem(storageKey(articleId), JSON.stringify(next));
  return next;
}

export const ArticleGeneratorSuccess = ({
  title,
  summary,
  content,
  articleId,
}: ArticleGeneratorSuccessProps) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  // ✅ history state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);

  // ✅ load history from localStorage when articleId is available
  useEffect(() => {
    if (articleId !== undefined) {
      setAttempts(loadHistory(articleId));
    }
  }, [articleId]);

  const handleTakeQuiz = async () => {
    if (!content) return;

    setQuizOpen(true);
    setQuizLoading(true);

    try {
      const questions = await generateQuiz({ content });
      setQuizQuestions(questions);

      if (articleId) {
        await saveQuizzesAction({ questions, articleId });
      }
    } catch (err) {
      console.error("Failed to generate quiz:", err);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuizComplete = (
    userAnswers: string[],
    questions: QuizQuestion[],
  ) => {
    if (articleId === undefined) return;

    const score = userAnswers.filter(
      (ans, i) => ans === questions[i]?.answer,
    ).length;

    const attempt: AttemptRecord = {
      date: new Date().toISOString(),
      score,
      total: questions.length,
      userAnswers,
      questions,
    };

    const updated = saveAttempt(articleId, attempt);
    setAttempts(updated);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="w-200 h-fit flex flex-col gap-2">
          <Label>
            <BookOpen className="h-3.5 w-3.5" />
            Summarized content
          </Label>
          <p className="text-[24px] font-medium">{title}</p>
          <p className="leading-5">{summary}</p>
        </div>

        <div className="flex items-center justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="py-5 px-4 rounded-md border border-zinc-200 hover:border-purple-500 transition-colors duration-200 ease-out cursor-pointer text-base"
              >
                See content
              </Button>
            </DialogTrigger>
            <DialogContent
              aria-describedby={undefined}
              className="w-157 h-123 bg-white border-none"
            >
              <DialogHeader>
                <DialogTitle className="text-[24px] font-medium border-b">
                  {title}
                </DialogTitle>
              </DialogHeader>
              <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                <p className="leading-5">{summary}</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="hover:border-purple-500 transition-colors duration-200 ease-out cursor-pointer"
                    variant="outline"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            {attempts.length > 0 && (
              <button
                onClick={() => setHistoryOpen(true)}
                className="flex items-center gap-1.5 py-2 px-4 rounded-md border border-zinc-200 text-sm font-medium hover:border-purple-500 transition-colors duration-200 ease-out cursor-pointer"
              >
                <History className="h-4 w-4" />
                See your history
              </button>
            )}

            <button
              onClick={handleTakeQuiz}
              disabled={!content}
              className="py-2 px-4 rounded-md text-white bg-black transition-colors duration-200 ease-out cursor-pointer hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Take a quiz
            </button>
          </div>
        </div>
      </div>

      <QuizDialog
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={quizQuestions}
        isLoading={quizLoading}
        onComplete={handleQuizComplete}
      />

      <QuizHistoryDialog
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        attempts={attempts}
      />
    </>
  );
};
