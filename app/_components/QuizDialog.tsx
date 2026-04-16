"use client";

import { useState } from "react";
import {
  Sparkles,
  X,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Bookmark,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "../utils/generateQuiz";

type QuizDialogProps = {
  open: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  isLoading: boolean;
  onComplete?: (userAnswers: string[], questions: QuizQuestion[]) => void;
};

export const QuizDialog = ({
  open,
  onClose,
  questions,
  isLoading,
  onComplete,
}: QuizDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!open) return null;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers, String(optionIndex)];
    setUserAnswers(newAnswers);

    if (currentIndex + 1 >= questions.length) {
      setIsCompleted(true);
      onComplete?.(newAnswers, questions);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setIsCompleted(false);
  };

  const score = userAnswers.filter(
    (ans, i) => ans === questions[i]?.answer,
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-139.5 bg-white rounded-xl border-2 border-blue-400 shadow-xl">
        <div className="px-5 pt-5 pb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold">
                {isCompleted ? "Quiz completed" : "Quick test"}
              </h2>
            </div>
            <p className="text-sm text-gray-400">
              {isCompleted
                ? "Let's see what you did"
                : "Take a quick test about your knowledge from your content"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md border border-gray-200 hover:border-gray-400 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="border-t border-gray-100" />

        {isLoading ? (
          <div className="p-10 flex flex-col items-center justify-center gap-3 text-gray-400">
            <LoaderCircle className="h-6 w-6 animate-spin text-blue-400" />
            <p className="text-sm">Generating your quiz questions…</p>
          </div>
        ) : isCompleted ? (
          <div className="p-5">
            <p className="text-[22px] font-bold mb-4">
              Your score: <span className="text-black">{score}</span>{" "}
              <span className="text-gray-400 font-normal text-lg">
                / {questions.length}
              </span>
            </p>

            <div className="flex flex-col gap-4">
              {questions.map((q, i) => {
                const isCorrect = userAnswers[i] === q.answer;
                const userOption = q.options[parseInt(userAnswers[i] ?? "0")];
                const correctOption = q.options[parseInt(q.answer)];
                return (
                  <div key={i} className="flex gap-3 items-start">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium">
                        {i + 1}. {q.question}
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Your answer:{" "}
                        <span className="font-normal">{userOption}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-500">
                          Correct: {correctOption}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleRestart}
                className="flex-1 py-5 cursor-pointer gap-2 border-zinc-200 hover:border-purple-500 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Restart quiz
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 py-5 bg-black text-white hover:bg-neutral-700 cursor-pointer gap-2 transition-colors"
              >
                <Bookmark className="h-4 w-4" />
                Save and leave
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="flex items-start justify-between mb-5 gap-4">
              <p className="font-semibold text-base leading-snug">
                {questions[currentIndex]?.question}
              </p>
              <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">
                <span className="text-black font-bold text-base">
                  {currentIndex + 1}
                </span>{" "}
                / {questions.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {questions[currentIndex]?.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="py-3 px-4 rounded-lg border border-gray-200 text-sm text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer font-medium"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
