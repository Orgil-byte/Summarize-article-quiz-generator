import { Label } from "@/components/ui/label";
import { BookOpen, ChevronLeft } from "lucide-react";
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

type ArticleGeneratorSuccessProps = {
  title: string;
  summary: string | undefined;
};

export const ArticleGeneratorSuccess = ({
  title,
  summary,
}: ArticleGeneratorSuccessProps) => {
  return (
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
        <button className="py-2 px-4 rounded-md text-white bg-black transition-colors duration-200 ease-out cursor-pointer hover:bg-neutral-700">
          Take a quiz
        </button>
      </div>
    </div>
  );
};
