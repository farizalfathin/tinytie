import { useAuth } from "@/context/authentication";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { AudioWaveform } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription } from "./ui/card";

export default function LoginButton() {
  const { onLoginWithGoogle, isAuth } = useAuth();

  if (isAuth) return null;

  return (
    <Drawer>
      <Card className="mx-2 group-data-[collapsible=icon]:hidden">
        <CardContent className="p-2 text-center flex flex-col gap-3 items-center">
          <CardDescription>
            Wanna feels better experience? <br />
            Login with Google
          </CardDescription>
          <DrawerTrigger asChild>
            <Button>Login</Button>
          </DrawerTrigger>
        </CardContent>
      </Card>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col items-center">
            <div className="flex aspect-square size-16 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <AudioWaveform className="size-8" />
            </div>
            <DrawerTitle className="font-logo text-6xl">TinyTie!</DrawerTitle>
            <DrawerDescription>
              Make your life more colorful & share your experience.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={onLoginWithGoogle} className="hover:bg-primary/85">
              <img
                className="size-6 rounded-full bg-white"
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="google logo"
              />
              <span>Sign in with Google</span>
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
