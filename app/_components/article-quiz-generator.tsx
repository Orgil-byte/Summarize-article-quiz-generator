"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";

type ArticleQuizGeneratorProps = {
  content: string;
  title: string;
  setContent: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  generateSummary: () => Promise<void>;
};

export const ArticleQuizGenerator = ({
  content,
  setContent,
  setTitle,
  title,
  generateSummary,
}: ArticleQuizGeneratorProps) => {
  return (
    <div className="w-full">
      <div className="w-fit max-w-300 mx-auto p-7 flex flex-col gap-5 h-fit rounded-lg border border-[#e7e7e7]">
        <div className="border-b border-zinc-100 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
              <Sparkles className="h-4 w-4 text-violet-600" strokeWidth={2} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-800 underline decoration-violet-400 decoration-2 underline-offset-2">
              Article Quiz Generator
            </h1>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Paste your article below to generate a summary and quiz question.
            Your articles will be saved in the sidebar for future reference.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-6 py-5">
          <div className="flex flex-col gap-2">
            <Label>
              <FileText className="h-3.5 w-3.5" />
              Article Title
            </Label>
            <Input
              className="border border-zinc-200"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your article..."
              value={title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>
              <FileText className="h-3.5 w-3.5" />
              Article Content
            </Label>
            <Textarea
              className="border border-zinc-200"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article content here..."
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={generateSummary}
              className="hover:bg-purple-300 p-3 rounded-xl cursor-pointer hover:text-white"
            >
              <Sparkles className="h-4 w-4" />
              Generate summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
