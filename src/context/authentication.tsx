import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContext {
  user: User | null;
  isAuth: boolean;
  onLoginWithGoogle: () => Promise<void>;
  onLogout: () => Promise<void>;
}

const authContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthenticationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const verifyUserId = async (id: string) => {
    try {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      setUser({
        ...data,
        fallback: data.full_name
          .split(" ")
          .map((word: any) => word[0])
          .join(""),
      });
    } catch (error) {
      console.error("Error memverifikasi ID pengguna:", error);
    }
  };

  const verifyAuthStatus = useCallback(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setIsAuth(true);
          verifyUserId(session.user.id);
        }

        if (event === "SIGNED_OUT") {
          setIsAuth(false);
          setUser(null);
        }
      }
    );

    return authListener;
  }, []);

  useEffect(() => {
    const authListener = verifyAuthStatus();

    return () => authListener.subscription.unsubscribe();
  }, [verifyAuthStatus]);

  const onLoginWithGoogle = async () => {
    try {
      const { data }: any = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      verifyUserId(data?.user.id);
    } catch (error) {
      console.log("Error saat login dengan Google:", error);
    }
  };

  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error during logout:", error.message);
        return;
      }
      console.log("User logged out successfully");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <authContext.Provider value={{ user, isAuth, onLoginWithGoogle, onLogout }}>
      {children}
    </authContext.Provider>
  );
}
