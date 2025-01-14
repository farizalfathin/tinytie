import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function LayoutSidebar({ children }: { children: ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}
