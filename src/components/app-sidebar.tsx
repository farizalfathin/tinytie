import * as React from "react";
import {
  BookOpenText,
  Mail,
  ShieldAlert,
  House,
  Search,
  CircleFadingPlus,
  Bell,
  MessageCircleCode,
  AudioWaveform,
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
import { BottomDrawer } from "./templates/BottomDrawer";
import {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authentication";
import AuthProtected from "./others/AuthProtected";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  platform: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "Search",
      url: "#",
      icon: Search,
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
      url: "#",
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
  const { onLoginWithGoogle } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ButtonLogo />
      </SidebarHeader>
      <SidebarContent>
        <AuthProtected
          componentAuth={false}
          componentUnAuth={
            <div className="bg-secondary-200 flex flex-col items-center text-center py-2 mx-2 rounded-lg group-data-[collapsible=icon]:hidden">
              <span className="text-xs font-medium mb-2">
                Wanna feels better experience?
                <br />
                Login with Google
              </span>
              <BottomDrawer
                componentTrigger={
                  <span className="bg-primary-500 text-white font-medium px-3 py-1 rounded-full cursor-pointer">
                    Login
                  </span>
                }>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader className="flex flex-col items-center">
                    <div className="flex aspect-square size-16 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <AudioWaveform className="size-8" />
                    </div>
                    <DrawerTitle className="font-logo text-6xl">
                      TinyTie!
                    </DrawerTitle>
                    <DrawerDescription>
                      Make your life more colorful & share your experience.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button
                      onClick={onLoginWithGoogle}
                      className="bg-primary-500 hover:bg-primary-700">
                      <img
                        className="size-6 rounded-full bg-white"
                        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                        alt="google logo"
                      />
                      <span>Sign in with Google</span>
                    </Button>
                  </DrawerFooter>
                </div>
              </BottomDrawer>
            </div>
          }
        />
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
