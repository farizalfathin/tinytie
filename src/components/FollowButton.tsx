import { useAuth } from "@/context/authentication";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { UserRoundX } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FollowButton({
  userIdFollowed,
  setNewFollowed,
}: {
  userIdFollowed: string;
  setNewFollowed: (action: "increase" | "decrease") => void;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const fetchIsFollowing = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("followings")
      .select("followed_user_id")
      .eq("following_user_id", user.id)
      .eq("followed_user_id", userIdFollowed)
      .single();

    if (error && error.code !== "PGRST116") {
      // Error selain "No rows found" (kode: PGRST116)
      console.error("Error fetching following:", error);
      return;
    }

    setIsFollowing(!!data);
  };

  useEffect(() => {
    fetchIsFollowing();
  }, [userIdFollowed, user]);

  const toggleFollow = async () => {
    if (!user) {
      toast({
        title: "Gagal mengikuti akun ini",
        description:
          "Anda harus login terlebih dahulu untuk mengikuti akun lain!",
        duration: 5000,
      });
      return;
    }

    if (isFollowing) {
      setIsFollowing(false);
      setNewFollowed("decrease");

      const { error } = await supabase
        .from("followings")
        .delete()
        .eq("following_user_id", user.id)
        .eq("followed_user_id", userIdFollowed);

      if (error) {
        console.error("Error unfollowing post:", error);
        setIsFollowing(true);
        setNewFollowed("increase");
      }
    } else {
      setIsFollowing(true);
      setNewFollowed("increase");

      const { error } = await supabase.from("followings").insert({
        following_user_id: user.id,
        followed_user_id: userIdFollowed,
      });

      if (error) {
        console.error("Error following post:", error);
        setIsFollowing(false);
        setNewFollowed("decrease");
      }
    }
  };

  return !isFollowing ? (
    <button
      onClick={toggleFollow}
      className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
      Follow
    </button>
  ) : (
    <div className="flex items-center gap-2 mt-4">
      <Link
        to={`/chat?id=${userIdFollowed}`}
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded text-sm font-medium hover:bg-secondary/75">
        Kirim Pesan
      </Link>
      <button
        onClick={toggleFollow}
        className="bg-secondary text-secondary-foreground rounded font-medium p-2 hover:bg-secondary/75">
        <UserRoundX className="size-5" />
      </button>
    </div>
  );
}
