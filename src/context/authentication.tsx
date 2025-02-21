import { useToast } from "@/hooks/use-toast";
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
  verifyUserId: (id: string) => Promise<void>;
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

  const { toast } = useToast();

  const verifyUserId = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

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

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user?.id) {
        verifyUserId(data?.session.user.id);
        setIsAuth(true);
      }
    };

    fetchUser();
  }, []);

  const verifyAuthStatus = useCallback(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          if (!sessionStorage.getItem("userVerified")) {
            verifyUserId(session.user.id);
            sessionStorage.setItem("userVerified", "true");
          }
          setIsAuth(true);
        }

        if (event === "SIGNED_OUT") {
          setIsAuth(false);
          setUser(null);
          sessionStorage.removeItem("userVerified");
        }
      }
    );

    return authListener;
  }, []);

  useEffect(() => {
    const authListener = verifyAuthStatus();

    return () => authListener.subscription.unsubscribe();
  }, [verifyAuthStatus]);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      toast({
        title: "Login berhasil!",
        description: "Akun anda berhasil terhubung. Selamat bersenang-senang!",
        duration: 7000,
      });
    }

    localStorage.removeItem("isLoggedIn");
  }, []);

  const onLoginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;

      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      console.log("Error saat login dengan Google:", error);
      toast({
        title: "Login gagal!",
        description: "Anda gagal terhubung ke akun anda. Coba lagi nanti.",
        duration: 7000,
      });
    }
  };

  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      toast({
        title: "Logout berhasil!",
        description: "Anda berhasil keluar dari akun anda!",
        duration: 7000,
      });
    } catch (error: any) {
      console.log("Error saat logout:", error);
      toast({
        title: "Logout gagal!",
        description: "Anda gagal keluar dari akun anda. Coba lagi nanti.",
        duration: 7000,
      });
    }
  };

  return (
    <authContext.Provider
      value={{ user, isAuth, onLoginWithGoogle, onLogout, verifyUserId }}>
      {children}
    </authContext.Provider>
  );
}
