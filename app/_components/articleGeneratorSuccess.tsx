"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
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
import { generateQuiz, type QuizQuestion } from "../utils/generateQuiz";
import { saveQuizzesAction } from "../actions";

type ArticleGeneratorSuccessProps = {
  title: string | undefined;
  summary: string | undefined | null;
  content?: string | undefined | null;
  articleId?: number | undefined;
};

export const ArticleGeneratorSuccess = ({
  title,
  summary,
  content,
  articleId,
}: ArticleGeneratorSuccessProps) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const handleTakeQuiz = async () => {
    if (!content) return;

    setQuizOpen(true);
    setQuizLoading(true);

    try {
      const questions = await generateQuiz({ content });
      setQuizQuestions(questions);

      // Persist quiz questions if we have an articleId
      if (articleId) {
        await saveQuizzesAction({ questions, articleId });
      }
    } catch (err) {
      console.error("Failed to generate quiz:", err);
    } finally {
      setQuizLoading(false);
    }
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

          <button
            onClick={handleTakeQuiz}
            disabled={!content}
            className="py-2 px-4 rounded-md text-white bg-black transition-colors duration-200 ease-out cursor-pointer hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Take a quiz
          </button>
        </div>
      </div>

      <QuizDialog
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={quizQuestions}
        isLoading={quizLoading}
      />
    </>
  );
};
