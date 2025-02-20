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

export default function LoginButton() {
  const { onLoginWithGoogle, isAuth } = useAuth();

  if (isAuth) return null;

  return (
    <Drawer>
      <div className="bg-secondary-200 flex flex-col items-center text-center py-2 mx-2 rounded-lg group-data-[collapsible=icon]:hidden">
        <span className="text-xs font-medium mb-2">
          Wanna feels better experience?
          <br />
          Login with Google
        </span>
        <DrawerTrigger asChild>
          <button className="bg-primary-500 text-white font-medium px-3 py-1 rounded-full cursor-pointer">
            Login
          </button>
        </DrawerTrigger>
      </div>
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
      </DrawerContent>
    </Drawer>
  );
}
