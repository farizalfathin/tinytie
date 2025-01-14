import { SidebarTrigger } from "@/components/ui/sidebar";
import { AudioWaveform } from "lucide-react";

export function ButtonLogo() {
  return (
    <SidebarTrigger className="w-full">
      <div className="w-full flex gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <AudioWaveform className="size-4" />
        </div>
        <span className="truncate text-3xl font-medium font-logo">TinyTie</span>
      </div>
    </SidebarTrigger>
  );
}
