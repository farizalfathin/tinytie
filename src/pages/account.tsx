import ConditionalFetch from "@/components/others/ConditionalFetch";
import RenderList from "@/components/others/RenderList";
import LayoutSidebar from "@/components/templates/LayoutSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/authentication";
import { supabase } from "@/lib/supabase";
import { MessageCircleMore } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Account() {
  const { user } = useAuth();
  const [select, setSelect] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [accountData, setAccountData] = useState<{
    followings: number;
    followers: number;
    likes: number;
  }>({ followings: 0, followers: 0, likes: 0 });
  const [posts, setPosts] = useState<{ image: string }[]>([]);

  const fetchPosts = useCallback(async (id: string) => {
    setStatus("loading");
    try {
      const [posts, followings, followers] = await Promise.all([
        supabase.from("posts").select("id, image").eq("user_id", id),
        supabase.from("followings").select("*").eq("following_user_id", id),
        supabase.from("followings").select("*").eq("followed_user_id", id),
      ]);

      if (posts.error || followings.error || followers.error) {
        console.log(`
          error fetch posts: ${posts.error}\n
          error fetch following: ${followings.error}\n
          error fetch follower: ${followers.error}
        `);
        return;
      }

      console.log(followings.data.length + " " + followers.data.length);

      setPosts(posts.data);
      setAccountData({
        ...accountData,
        followings: followings.data.length,
        followers: followers.data.length,
      });
      setStatus("success");
    } catch (error: any) {
      setStatus("failed");
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchPosts(user.id);
    }
  }, [user, fetchPosts]);

  return (
    <LayoutSidebar>
      <div className="flex justify-center shrink-0 ease-linear">
        <div className="w-[468px] min-h-screen border border-secondary-200">
          {/* Header */}
          <div className="flex items-center justify-center py-3 border-b border-secondary-200">
            <h1 className="text-lg font-semibold">{user?.full_name}</h1>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col text-center items-center py-8">
            <Avatar className="h-24 w-24 rounded-full border border-primary-300 mb-1">
              <AvatarImage
                src={user?.avatar_url || ""}
                alt={user?.username || ""}
              />
              <AvatarFallback className="rounded-full text-2xl">
                {user?.fallback}
              </AvatarFallback>
            </Avatar>
            <span>{user?.username}</span>
            <p className="text-sm text-gray-500">
              {user?.bio ? user.bio : "no bio yet."}
            </p>
            <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium">
              Follow
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex py-3 border-t border-b border-secondary-200">
            <div className="w-1/3 text-center">
              <p className="text-lg font-semibold">{accountData.followings}</p>
              <p className="text-sm text-gray-500">Followings</p>
            </div>
            <div className="w-1/3 text-center">
              <p className="text-lg font-semibold">{accountData.followers}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="w-1/3 text-center">
              <p className="text-lg font-semibold">{accountData.likes}</p>
              <p className="text-sm text-gray-500">Likes</p>
            </div>
          </div>
          <div className="flex border-b border-secondary-300">
            <div
              className={`flex-1 flex justify-center items-center py-2 ${
                select === 0 &&
                "border-b border-primary-200 bg-gradient-to-t from-primary-50 to-transparent"
              }`}
              onClick={() => setSelect(0)}>
              <MessageCircleMore />
            </div>
            <div
              className={`flex-1 flex justify-center items-center py-2 ${
                select === 1 &&
                "border-b border-primary-200 bg-gradient-to-t from-primary-50 to-transparent"
              }`}
              onClick={() => setSelect(1)}>
              <MessageCircleMore />
            </div>
            <div
              className={`flex-1 flex justify-center items-center py-2 ${
                select === 2 &&
                "border-b border-primary-200 bg-gradient-to-t from-primary-50 to-transparent"
              }`}
              onClick={() => setSelect(2)}>
              <MessageCircleMore />
            </div>
          </div>

          <ConditionalFetch
            status={status}
            componentLoading={
              <div className="grid grid-cols-3 pb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <ImagePostSkeleton key={index} />
                ))}
              </div>
            }>
            <RenderList
              of={posts}
              classNameContainer={[
                "grid grid-cols-3 pb-6",
                "text-center py-16",
              ]}
              componentNull={<span>Belum ada konten yang anda unggah</span>}
              render={(item: { id: string; image: string }, index) => (
                <ImagePost key={index} {...item} />
              )}
            />
          </ConditionalFetch>
        </div>
      </div>
    </LayoutSidebar>
  );
}

function ImagePost({ id, image }: { id: string; image: string }) {
  return (
    <Link
      to={`/post/${id}`}
      className="relative bg-secondary-200 overflow-hidden group">
      {/* Placeholder for video thumbnail */}
      <img
        src={image}
        alt={`post-${id}`}
        className="h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
      />
    </Link>
  );
}

function ImagePostSkeleton() {
  return <Skeleton className="h-48 rounded-none" />;
}
