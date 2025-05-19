import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import RenderList from "./others/RenderList";

export default function NavSection({
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
        <RenderList
          of={data}
          render={(item, index) => (
            <SidebarMenuItem key={index}>
              <Link to={item.url}>
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}
