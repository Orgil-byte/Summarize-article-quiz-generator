"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";

export function AppSidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleSideBar = () => {
    if (sidebarActive === false) {
      setSidebarActive(true);
    } else {
      setSidebarActive(false);
    }
  };

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
        <SidebarContent className="w-full h-fit flex flex-col gap-1 p-2">
          <div className="h-11 w-full font-medium text-base">Genghis khan</div>
          <div className="h-11 w-full font-medium text-base">Genghis khan</div>
          <div className="h-11 w-full font-medium text-base">Genghis khan</div>
          <div className="h-11 w-full font-medium text-base">Genghis khan</div>
        </SidebarContent>
      ) : null}
      <SidebarFooter />
    </Sidebar>
  );
}
