import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";
import AppSidebar from "../app-sidebar";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { AudioWaveform, Component } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isMobile = useIsMobile();

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        {isMobile ? (
          <div className="w-full sticky top-0 bg-white shadow-sm dark:bg-sidebar z-10">
            <div className="w-full max-w-xl flex justify-between items-center mx-auto px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <AudioWaveform className="size-4" />
                </div>
                <span className="truncate text-3xl font-medium font-logo">
                  {isAdminPage ? "Admin" : "TinyTie"}
                </span>
              </div>
              <SidebarTrigger className="[&_svg]:size-6">
                <Component />
              </SidebarTrigger>
            </div>
          </div>
        ) : null}
        {children}
      </SidebarInset>
    </>
  );
}
