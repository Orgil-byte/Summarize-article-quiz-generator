"use client";

import { X, CheckCircle2, XCircle, Trophy } from "lucide-react";
import type { QuizQuestion } from "../utils/generateQuiz";

export type AttemptRecord = {
  date: string;
  score: number;
  total: number;
  userAnswers: string[];
  questions: QuizQuestion[];
};

type QuizHistoryDialogProps = {
  open: boolean;
  onClose: () => void;
  attempts: AttemptRecord[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scoreColor(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) return "text-green-600";
  if (pct >= 0.6) return "text-amber-500";
  return "text-red-500";
}

export const QuizHistoryDialog = ({
  open,
  onClose,
  attempts,
}: QuizHistoryDialogProps) => {
  if (!open) return null;

  const sorted = [...attempts].reverse();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-145 max-h-[80vh] bg-white rounded-xl border-2 border-purple-400 shadow-xl flex flex-col">
        <div className="px-5 pt-5 pb-4 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-5 w-5 text-purple-500" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold">Quiz history</h2>
            </div>
            <p className="text-sm text-gray-400">
              {attempts.length} attempt{attempts.length !== 1 ? "s" : ""} on
              this article
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
        <div className="overflow-y-auto flex flex-col gap-5 p-5">
          {sorted.map((attempt, ai) => (
            <div
              key={ai}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <span className="text-xs text-gray-500">
                  {formatDate(attempt.date)}
                </span>
                <span
                  className={`text-sm font-bold ${scoreColor(attempt.score, attempt.total)}`}
                >
                  {attempt.score} / {attempt.total}
                </span>
              </div>
              <div className="flex flex-col divide-y divide-gray-100">
                {attempt.questions.map((q, qi) => {
                  const isCorrect = attempt.userAnswers[qi] === q.answer;
                  const userOption =
                    q.options[parseInt(attempt.userAnswers[qi] ?? "0")];
                  const correctOption = q.options[parseInt(q.answer)];

                  return (
                    <div key={qi} className="flex gap-3 items-start px-4 py-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-gray-800">
                          {qi + 1}. {q.question}
                        </p>
                        <p className="text-xs text-gray-500">
                          Your answer:{" "}
                          <span
                            className={
                              isCorrect ? "text-green-600" : "text-red-500"
                            }
                          >
                            {userOption}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-xs text-green-600">
                            Correct: {correctOption}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
