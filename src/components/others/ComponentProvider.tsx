import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { TooltipProvider } from "../ui/tooltip";

export default function ComponentProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SidebarProvider>
  );
}
