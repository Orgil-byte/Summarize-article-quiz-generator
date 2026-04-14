import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";

type ArticleGeneratorSuccessProps = {
  title: string;
  summary: string | undefined;
};

export const ArticleGeneratorSuccess = ({
  title,
  summary,
}: ArticleGeneratorSuccessProps) => {
  return (
    <div>
      <div className="w-200 h-fit flex flex-col gap-2">
        <Label>
          <BookOpen className="h-3.5 w-3.5" />
          Summarized content
        </Label>
        <p className="text-[24px] font-medium">{title}</p>
        <p className="leading-5"></p>
      </div>
    </div>
  );
};
