import FollowButton from "@/components/FollowButton";
import FollowingsDetail from "@/components/FollowingsDetail";
import { ImagePost, ImagePostSkeleton } from "@/components/ImagePost";
import RenderList from "@/components/others/RenderList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { ImagePosting } from "@/types/post";
import { User } from "@/types/user";
import { MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OtherAccount() {
  const { id } = useParams();
  const [select, setSelect] = useState<number>(0);
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [accountData, setAccountData] = useState<{
    followings: number;
    followers: number;
  }>({ followings: 0, followers: 0 });
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<ImagePosting[]>([]);

  const fetchAccountData = async () => {
    if (!id) return;
    setStatus("loading");

    try {
      const [user, followings, followers] = await Promise.all([
        supabase
          .from("users")
          .select("*, posts (id, image)")
          .eq("id", id)
          .single(),
        supabase.from("followings").select("*").eq("following_user_id", id),
        supabase.from("followings").select("*").eq("followed_user_id", id),
      ]);

      if (user.error || followings.error || followers.error) {
        throw new Error(`
          error fetch posts: ${user.error}\n
          error fetch following: ${followings.error}\n
          error fetch follower: ${followers.error}
        `);
      }

      setUser(user.data);
      setPosts(user.data.posts);
      setAccountData({
        ...accountData,
        followings: followings.data.length,
        followers: followers.data.length,
      });
      setStatus("success");
    } catch (error) {
      setStatus("failed");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const setNewFollowed = (action: "increase" | "decrease") =>
    setAccountData((prev) => ({
      ...prev,
      followers:
        action === "increase" ? prev.followers + 1 : prev.followers - 1,
    }));

  return (
    <div className="flex justify-center shrink-0 ease-linear">
      <div className="w-[468px] min-h-screen border border-secondary-200">
        {/* Header */}
        <div className="flex items-center justify-center py-3 border-b border-secondary-200">
          {status === "success" && user ? (
            <h1 className="text-lg font-semibold">{user?.full_name}</h1>
          ) : (
            <Skeleton className="w-36 h-6" />
          )}
        </div>

        {/* Profile Section */}
        <div className="flex flex-col text-center items-center py-8">
          <Avatar className="h-24 w-24 rounded-full mb-1">
            <AvatarImage src={user?.avatar_url} alt={user?.username} />
            <AvatarFallback className="rounded-full text-2xl">
              {user?.fallback}
            </AvatarFallback>
          </Avatar>
          {id && user ? (
            <>
              <span>{user?.username}</span>
              <p className="text-sm text-gray-500">
                {user?.bio ? user?.bio : "no bio yet."}
              </p>
              <FollowButton
                userIdFollowed={id}
                setNewFollowed={setNewFollowed}
              />
            </>
          ) : (
            <>
              <Skeleton className="w-24 h-3 mt-2" />
              <Skeleton className="w-44 h-3 mt-2" />
              <div className="flex items-center gap-2 mt-4">
                <Skeleton className="w-24 h-9 rounded-md" />
                <Skeleton className="w-9 h-9 rounded-md" />
              </div>
            </>
          )}
        </div>

        {/* Stats Section */}
        <div className="flex py-3 border-t border-b border-secondary-200">
          {status === "success" && user ? (
            <>
              <div className="w-1/3 flex justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold">{posts.length}</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
              </div>
              <div className="w-1/3 flex justify-center">
                <FollowingsDetail userId={user?.id} detail="followings">
                  <div className="text-center cursor-pointer">
                    <p className="text-lg font-semibold">
                      {accountData.followings}
                    </p>
                    <p className="text-sm text-gray-500">Followings</p>
                  </div>
                </FollowingsDetail>
              </div>
              <div className="w-1/3 flex justify-center">
                <FollowingsDetail userId={user?.id} detail="followers">
                  <div className="text-center cursor-pointer">
                    <p className="text-lg font-semibold">
                      {accountData.followers}
                    </p>
                    <p className="text-sm text-gray-500">Followers</p>
                  </div>
                </FollowingsDetail>
              </div>
            </>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-1/3 flex flex-col items-center gap-2">
                  <Skeleton className="w-10 h-6" />
                  <Skeleton className="w-20 h-3" />
                </div>
              ))}
            </>
          )}
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

        {status === "success" && posts.length > 0 ? (
          <div className="grid grid-cols-3 pb-6">
            <RenderList
              of={posts}
              render={(item: { id: string; image: string }, index) => (
                <ImagePost key={index} {...item} />
              )}
            />
          </div>
        ) : status === "success" && !(posts.length > 1) ? (
          <div className="text-center py-16">
            <span>Belum ada konten yang anda unggah</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 pb-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <ImagePostSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
