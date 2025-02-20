import * as React from "react";
import {
  BookOpenText,
  Mail,
  ShieldAlert,
  House,
  CircleFadingPlus,
  Bell,
  MessageCircleCode,
  Compass,
} from "lucide-react";
import { NavSection } from "@/components/nav-section";
import { NavUser } from "@/components/nav-user";
import { ButtonLogo } from "@/components/ButtonLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import LoginButton from "./LoginButton";

// This is sample data.
const data = {
  platform: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "Explore",
      url: "/explore",
      icon: Compass,
    },
    {
      name: "New Post",
      url: "#",
      icon: CircleFadingPlus,
    },
    {
      name: "Notification",
      url: "#",
      icon: Bell,
    },
    {
      name: "Chat",
      url: "/chat",
      icon: MessageCircleCode,
    },
  ],
  information: [
    {
      name: "Contact us",
      url: "/contact",
      icon: Mail,
    },
    {
      name: "Terms of Service",
      url: "/terms-of-service",
      icon: BookOpenText,
    },
    {
      name: "Privacy Policy",
      url: "/privacy-policy",
      icon: ShieldAlert,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ButtonLogo />
      </SidebarHeader>
      <SidebarContent>
        <LoginButton />
        <NavSection label="Platform" data={data.platform} />
        <Separator orientation="horizontal" className="w-full h-[1px]" />
        <NavSection label="Information" data={data.information} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
