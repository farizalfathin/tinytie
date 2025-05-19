import FollowingsDetail from "@/components/FollowingsDetail";
import { ImagePost, ImagePostSkeleton } from "@/components/ImagePost";
import RenderList from "@/components/others/RenderList";
import AvatarProfile from "@/components/AvatarProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/authentication";
import { supabase } from "@/lib/supabase";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AccountMe() {
  const { user } = useAuth();
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [accountData, setAccountData] = useState<{
    followings: number;
    followers: number;
  }>({ followings: 0, followers: 0 });
  const [posts, setPosts] = useState<{ id: string; image: string }[]>([]);

  const fetchPosts = async () => {
    if (!user?.id) return;
    setStatus("loading");

    try {
      const [posts, followings, followers] = await Promise.all([
        supabase.from("posts").select("id, image").eq("user_id", user?.id),
        supabase
          .from("followings")
          .select("*")
          .eq("following_user_id", user?.id),
        supabase
          .from("followings")
          .select("*")
          .eq("followed_user_id", user?.id),
      ]);

      if (posts.error || followings.error || followers.error) {
        throw new Error(`
          error fetch posts: ${posts.error}\n
          error fetch following: ${followings.error}\n
          error fetch follower: ${followers.error}
        `);
      }

      setPosts(posts.data);
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
    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>{user?.full_name || "Profil Saya"} | TinyTie</title>
        <meta
          name="description"
          content={
            user?.bio
              ? user.bio
              : `${user?.username || "Pengguna"} belum memiliki bio.`
          }
        />
        <meta
          property="og:title"
          content={user?.full_name || "Profil Pengguna"}
        />
        <meta
          property="og:description"
          content={
            user?.bio
              ? user.bio
              : "Lihat profil pengguna, termasuk postingan, followers, dan informasi lainnya."
          }
        />
      </Helmet>
      <div className="flex-1 flex justify-center shrink-0 ease-linear">
        <section className="w-full min-h-full border border-b-0 border-border">
          <div className="flex items-center justify-center py-3 border-b border-border">
            {status === "success" && user ? (
              <h1 className="text-lg font-semibold">{user?.full_name}</h1>
            ) : (
              <Skeleton className="w-36 h-6" />
            )}
          </div>
          <div className="flex flex-col text-center items-center py-8">
            <AvatarProfile
              avatar_url={user?.avatar_url || ""}
              fallback={user?.fallback || ""}
              className="size-24 mb-1"
            />
            {status === "success" && user ? (
              <>
                <span>{user?.username}</span>
                <p className="text-sm text-secondary-foreground/50">
                  {user?.bio ? user?.bio : "no bio yet."}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Link
                    to="/account/me/edit"
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded text-sm font-medium hover:bg-secondary/75">
                    Edit Profile
                  </Link>
                  <Link
                    to="/account/me/setting"
                    className="bg-secondary text-secondary-foreground rounded font-medium p-2 hover:bg-secondary/75">
                    <Settings className="size-5" />
                  </Link>
                </div>
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
          <div className="flex py-3 border-y border-border">
            {status === "success" && user ? (
              <>
                <div className="w-1/3 flex justify-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold">{posts.length}</p>
                    <p className="text-sm text-secondary-foreground/50">
                      Posts
                    </p>
                  </div>
                </div>
                <div className="w-1/3 flex justify-center">
                  <FollowingsDetail userId={user.id} detail="followings">
                    <div className="text-center cursor-pointer">
                      <p className="text-lg font-semibold">
                        {accountData.followings}
                      </p>
                      <p className="text-sm text-secondary-foreground/50">
                        Followings
                      </p>
                    </div>
                  </FollowingsDetail>
                </div>
                <div className="w-1/3 flex justify-center">
                  <FollowingsDetail userId={user.id} detail="followers">
                    <div className="text-center cursor-pointer">
                      <p className="text-lg font-semibold">
                        {accountData.followers}
                      </p>
                      <p className="text-sm text-secondary-foreground/50">
                        Followers
                      </p>
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
          {status === "success" && posts.length > 0 ? (
            <div className="grid grid-cols-3 pb-6">
              <RenderList
                of={posts}
                render={(item: { id: string; image: string }, index) => (
                  <ImagePost key={index} className="h-48" {...item} />
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
                <ImagePostSkeleton key={index} className="h-48" />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
