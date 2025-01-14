"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ReactNode } from "react";

export function BottomDrawer({
  componentTrigger,
  children,
}: {
  componentTrigger: ReactNode;
  children: ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{componentTrigger}</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
