import { Image, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { BottomDrawer } from "./templates/BottomDrawer";
import { DrawerHeader, DrawerTitle } from "./ui/drawer";

export function NavSection({
  label,
  data,
}: {
  label: string;
  data: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="h-6">{label}</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((item, index) => {
          if (item.name === "New Post") {
            return (
              <BottomDrawer
                key={index}
                componentTrigger={
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                }>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader className="flex flex-col items-center">
                    <DrawerTitle className="font-logo text-4xl">
                      New Post!
                    </DrawerTitle>
                    <Link
                      to="/new"
                      className="w-full flex items-center gap-1 py-1 px-2 rounded hover:bg-gradient-to-r hover:from-primary-100 hover:to-primary-200">
                      <Image />
                      <span className="font-mono">New Post</span>
                    </Link>
                  </DrawerHeader>
                </div>
              </BottomDrawer>
            );
          }
          return (
            <SidebarMenuItem key={index}>
              <Link to={item.url}>
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
