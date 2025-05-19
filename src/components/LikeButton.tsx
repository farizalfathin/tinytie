import { useAuth } from "@/context/authentication";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { UserRelation } from "@/types/user";
import RenderList from "./others/RenderList";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export function LikeButton({ postId }: { postId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const fetchIsLiked = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("likes")
      .select("user_id")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      // Error selain "No rows found" (kode: PGRST116)
      console.error("Error fetching likes:", error);
      return;
    }

    setIsLiked(!!data);
  };

  useEffect(() => {
    fetchIsLiked();
  }, [postId, user]);

  const toggleLike = async () => {
    if (!user) {
      toast({
        title: "Gagal menyukai postingan ini",
        description:
          "Anda harus login terlebih dahulu untuk menyukai postingan!",
        duration: 5000,
      });
      return;
    }

    if (isLiked) {
      setIsLiked(false);

      // Jika sudah di-like, hapus "like"
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error unliking post:", error);
        setIsLiked(true);
      }
    } else {
      setIsLiked(true);
      // Jika belum di-like, tambahkan "like"
      const { error } = await supabase
        .from("likes")
        .insert({ post_id: postId, user_id: user.id });

      if (error) {
        console.error("Error liking post:", error);
        setIsLiked(false);
      }
    }
  };

  return (
    <span
      onClick={toggleLike}
      className="flex items-center justify-center cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "#ef4444" : "transparent"}
        viewBox="0 0 24 24"
        stroke={isLiked ? "#ef4444" : "currentColor"}
        strokeWidth={2}
        className={`w-6 h-6 transition-transform duration-300 ${
          isLiked ? "scale-[1.15]" : "scale-100"
        }`}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </span>
  );
}

export function ViewLikes({ postId }: { postId: string }) {
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [likes, setLikes] = useState<UserRelation[]>([]);

  const fetchLikes = async () => {
    setStatus("loading");

    const { data, error } = await supabase
      .from("likes")
      .select("users (id, username, full_name, avatar_url)")
      .eq("post_id", postId);

    if (error) {
      console.error(error);
      setStatus("failed");
      return;
    }

    setLikes(
      data.map((user: any) => ({
        ...user.users, // Informasi user yang menyukai
        fallback: user.users.full_name
          .split(" ")
          .map((word: any) => word[0])
          .join(""),
      }))
    );
    setStatus("success");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <span
          onClick={fetchLikes}
          className="text-xs underline hover:text-primary cursor-pointer select-none">
          view who likes
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-72 mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl">
              Post's Likes
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Liked by {likes.length} people
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-2">
            {status === "success" && likes.length > 0 ? (
              <RenderList
                of={likes}
                render={(item: UserRelation, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar className="h-9 w-9 rounded-full border border-primary-300">
                      <AvatarImage src={item.avatar_url} alt={item.username} />
                      <AvatarFallback className="rounded-full">
                        {item.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <Link
                      to={`/account/${item.id}`}
                      className="text-sm underline hover:text-primary-500">
                      {item.username}
                    </Link>
                  </div>
                )}
              />
            ) : status === "success" && !(likes.length > 0) ? (
              <span className="text-center">
                Belum ada yang menyukai postingan ini
              </span>
            ) : (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="w-9 h-9 rounded-full" />
                    <Skeleton className="w-48 h-4 rounded-sm" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
