import { Send } from "lucide-react";
import TruncateCapt from "./TruncateCapt";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authentication";
import { Skeleton } from "./ui/skeleton";
import CommentButton from "./CommentButton";
import { LikeButton, ViewLikes } from "./LikeButton";
import { formatDate } from "@/utils/format";
import SettingPost from "./SettingPost";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import AvatarProfile from "./templates/AvatarProfile";

export function Posting({
  id,
  users,
  image,
  caption,
  tag,
  created_at,
}: {
  id: string;
  users: {
    id: string;
    username: string;
    avatar_url: string;
    fallback: string;
  };
  image: string;
  caption: string;
  tag: string[];
  created_at: Date | string;
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!id || users.id !== user?.id) return;
    const imageTarget = image.split("/").pop();

    try {
      await supabase.storage
        .from("publicImages")
        .remove([`posts/${imageTarget}`]);

      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (deleteError) throw new Error("Error deleting post: " + deleteError);

      toast({
        title: "Postingan anda berhasil dihapus",
        description: "Anda akan diarahkan ke halaman profile",
        duration: 7000,
      });
      setTimeout(() => {
        navigate("/account/me");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2 border border-b-0 border-zinc-200 px-2 py-1">
        <AvatarProfile
          avatar_url={users.avatar_url}
          fallback={users.fallback}
        />
        <div className="flex flex-col">
          <Link
            to={users.id === user?.id ? "/account/me" : `/account/${users.id}`}
            className="text-sm select-none hover:text-primary-800">
            {users.username}
          </Link>
          <span className="text-[10px] text-secondary-500">
            {formatDate(created_at)}
          </span>
        </div>
        <SettingPost
          postId={id}
          isOwner={users.id === user?.id}
          handleDelete={handleDelete}
        />
      </div>
      <div className="">
        <img
          src={image}
          alt={users.username}
          className="w-full aspect-square object-cover object-center select-none"
        />
      </div>
      <div className="p-2 pb-4 border border-y-0 border-secondary-200">
        <div className="flex gap-4 text-sm">
          <LikeButton postId={id} />
          <CommentButton postId={id} />
          <button>
            <Send />
          </button>
        </div>
        <ViewLikes postId={id} />
        <div className="text-sm pe-2">
          <TruncateCapt>
            <Link
              to={
                users.id === user?.id ? "/account/me" : `/account/${users.id}`
              }
              className="font-semibold select-none me-1 hover:text-primary-800">
              {users.username}
            </Link>
            {caption}
          </TruncateCapt>
          <div className="flex gap-2 mt-2">
            {tag?.map((t, i) => (
              <span key={i} className="text-sm text-primary-500 underline">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostingSkeleton() {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2 border border-secondary-200 px-2 py-1">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-28 h-4 rounded-sm" />
      </div>
      <div className="border-x border-secondary-200">
        <Skeleton className="w-full aspect-square rounded-none" />
      </div>
      <div className="p-2 pb-8 border border-b-0 border-secondary-200">
        <div className="flex gap-4 text-sm">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-7 h-7 rounded-full" />
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
        </div>
      </div>
    </div>
  );
}
