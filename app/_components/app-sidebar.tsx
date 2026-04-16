"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getArticles } from "../actions";
import { useRouter } from "next/navigation";

type Articles = {
  id: number;
  title: string;
  content: string;
  summary: string | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function AppSidebar() {
  const router = useRouter();

  const [sidebarActive, setSidebarActive] = useState(false);
  const [articlesData, setArticlesData] = useState<Articles[] | undefined>(
    undefined,
  );
  const [id, setId] = useState<number | undefined>();

  const setIdByClick = (id: number | undefined) => {
    setId(id);

    router.push(`/${id}`);

    console.log(id);
  };

  const handleSideBar = () => {
    if (sidebarActive === false) {
      setSidebarActive(true);
    } else {
      setSidebarActive(false);
    }
  };

  useEffect(() => {
    const fetchArticlesData = async () => {
      const response = await getArticles();

      if (response.data) {
        setArticlesData(response.data);
      }
    };

    fetchArticlesData();
  }, []);

  const sorted = articlesData?.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#E4E4E7] max-h-screen bg-white mt-16 p-2"
    >
      <SidebarHeader>
        <div className="flex justify-between items-center mx-auto w-full">
          {sidebarActive === true ? (
            <p className="font-semibold text-[20px]">History</p>
          ) : (
            ""
          )}
          <SidebarTrigger
            className={`cursor-pointer text-end ${sidebarActive === false ? "w-full" : ""}`}
            onClick={handleSideBar}
          />
        </div>
      </SidebarHeader>
      {sidebarActive === true ? (
        <SidebarContent className="w-full h-screen overflow-y-scroll flex flex-col gap-1 p-2">
          {sorted?.map((article) => {
            return (
              <div
                onClick={() => setIdByClick(article.id)}
                key={article.id}
                className="h-11 w-full font-medium text-base hover:bg-neutral-200 cursor-pointer transition-colors duration-200 ease-out pt-2.5 pl-3"
              >
                {article.title}
              </div>
            );
          })}
        </SidebarContent>
      ) : null}
      <SidebarFooter />
    </Sidebar>
  );
}
