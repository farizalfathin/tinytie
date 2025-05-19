import * as React from "react";
import {
  BookOpenText,
  Mail,
  ShieldAlert,
  House,
  CircleFadingPlus,
  MessageCircleCode,
  Compass,
  LayoutDashboard,
  ContactRound,
  Blinds,
} from "lucide-react";
import NavSection from "@/components/nav-section";
import NavUser from "@/components/nav-user";
import LogoButton from "@/components/LogoButton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import LoginButton from "./LoginButton";
import { useLocation } from "react-router-dom";

const data = {
  platform: [
    { name: "Home", url: "/", icon: House },
    { name: "Explore", url: "/explore", icon: Compass },
    { name: "New Post", url: "/new-post", icon: CircleFadingPlus },
    { name: "Chat", url: "/chat", icon: MessageCircleCode },
  ],
  information: [
    { name: "Contact us", url: "/contact", icon: Mail },
    { name: "Terms of Service", url: "/terms-of-service", icon: BookOpenText },
    { name: "Privacy Policy", url: "/privacy-policy", icon: ShieldAlert },
  ],
  admin: [
    { name: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manage Users", url: "/admin/manage-users", icon: ContactRound },
    { name: "Manage Posts", url: "/admin/manage-posts", icon: Blinds },
    { name: "Go home", url: "/", icon: House },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoButton />
      </SidebarHeader>
      <SidebarContent>
        {isAdminPage ? (
          <NavSection label="Admin Panel" data={data.admin} />
        ) : (
          <>
            <LoginButton />
            <NavSection label="Platform" data={data.platform} />
            <Separator orientation="horizontal" className="w-full h-[1px]" />
            <NavSection label="Information" data={data.information} />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
