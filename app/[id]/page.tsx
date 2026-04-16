"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, FileText, ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { ArticleGeneratorSuccess } from "../_components/articleGeneratorSuccess";
import { useParams } from "next/navigation";

const ArticleQuizGeneratorId = () => {
  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState(false);
  const [dataById, setDataById] = useState<ArticleWithQuizzes | undefined>(
    undefined,
  );

  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      fetch(`http://localhost:3000/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Data:", data);
          setDataById(data);
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [params?.id]);

  const goBack = () => {
    setActive(false);
    setSuccess(false);
  };

  const seeSuccessOneMore = () => {
    setActive(true);
    setSuccess(true);
  };

  return (
    <div className="w-full p-80">
      <div className="w-fit max-w-300 mx-auto p-7 flex flex-col gap-5 h-fit rounded-lg border border-[#e7e7e7]">
        {success ? (
          <button
            onClick={goBack}
            className="rounded-md py-1 px-2 border border-neutral-600 w-fit"
          >
            <ChevronLeft
              strokeWidth={1.5}
              className="text-neutral-400 hover:text-black transition-colors duration-200 ease-out cursor-pointer"
            />
          </button>
        ) : null}
        <div className="border-b border-zinc-100 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
              <Sparkles className="h-4 w-4 text-violet-600" strokeWidth={2} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-800 underline decoration-violet-400 decoration-2 underline-offset-2">
              Article Quiz Generator
            </h1>
          </div>
          {success ? null : (
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Paste your article below to generate a summary and quiz question.
              Your articles will be saved in the sidebar for future reference.
            </p>
          )}
        </div>
        {!success ? (
          <div className="flex flex-col gap-5 px-6 py-5">
            <div className="flex flex-col gap-2">
              <Label>
                <FileText className="h-3.5 w-3.5" />
                Article Title
              </Label>
              <Input
                className="border border-zinc-200"
                readOnly
                placeholder="Enter a title for your article..."
                value={dataById?.title}
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
                value={dataById?.content}
                readOnly
                placeholder="Paste your article content here..."
              />
            </div>
            <div
              className={`flex ${success ? "justify-between" : "justify-end"}`}
            >
              {!active ? (
                <Button
                  onClick={seeSuccessOneMore}
                  className="border text-amber-900 border-[#e7e7e7] py-2 px-4 cursor-pointer hover:border-purple-500 transition-colors duration-200 ease-out"
                >
                  See already generated summary
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <ArticleGeneratorSuccess
            title={dataById?.title}
            summary={dataById?.summary}
            content={dataById?.content}
            articleId={dataById?.id}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleQuizGeneratorId;
