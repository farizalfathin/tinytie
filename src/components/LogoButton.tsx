import { SidebarTrigger } from "@/components/ui/sidebar";
import { AudioWaveform } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function LogoButton() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <SidebarTrigger className="w-full">
      <div className="w-full flex gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground dark:bg-primary">
          <AudioWaveform className="size-4" />
        </div>
        <span className="truncate text-3xl font-medium font-logo">
          {isAdminPage ? "Admin" : "TinyTie"}
        </span>
      </div>
    </SidebarTrigger>
  );
}
