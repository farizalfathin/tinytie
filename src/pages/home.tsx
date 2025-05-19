import LoaderSpinner from "@/components/LoaderSpinner";
import RenderList from "@/components/others/RenderList";
import { Posting, PostingSkeleton } from "@/components/Posting";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/authentication";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { CloudAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [userIds, setUserIds] = useState<string[]>([]);
  const hasFetched = useRef(false);

  const fetchUserIds = async () => {
    try {
      const { data: followingData, error: followingError } = await supabase
        .from("followings")
        .select("followed_user_id")
        .eq("following_user_id", user?.id);

      if (followingError) throw followingError;

      const updatedUserIds = [
        ...followingData.map((item) => item.followed_user_id),
        user?.id, // Tambahkan user sendiri
      ];

      setUserIds(updatedUserIds);
    } catch (error) {
      console.error("Error fetching userIds:", error);
    }
  };

  const fetchPosts = async (isLoadMore = false) => {
    if (!isLoadMore) setStatus("loading");

    try {
      const { data: newPostsData, error: postsError } = await supabase
        .from("posts")
        .select("*, users(id, username, full_name, avatar_url)")
        .in("user_id", userIds)
        .order("created_at", { ascending: false })
        .range(offset, offset + 2);

      if (postsError) throw postsError;

      setTimeout(() => {
        if (newPostsData.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) => [
            ...prevPosts,
            ...newPostsData.map((item) => {
              return {
                ...item,
                users: {
                  ...item.users,
                  fallback: item.users.full_name
                    .split(" ")
                    .map((word: any) => word[0])
                    .join("")
                    .toUpperCase(),
                },
              };
            }),
          ]);
        }
      }, 1500);

      setOffset((prevData) => prevData + newPostsData.length);
      if (!isLoadMore) setStatus("success");
    } catch (error) {
      console.error(error);
      if (!isLoadMore) setStatus("failed");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserIds();
    }
  }, [user]);

  useEffect(() => {
    if (userIds.length > 0 && !hasFetched.current) {
      fetchPosts();
      hasFetched.current = true;
    }
  }, [userIds]);

  if (status === "loading" && posts.length === 0) {
    return (
      <div className="flex justify-center shrink-0 ease-linear">
        <section className="w-full">
          <main className="w-full flex flex-col">
            {Array.from({ length: 2 }).map((_, index) => (
              <PostingSkeleton key={index} />
            ))}
          </main>
        </section>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Beranda | TinyTie</title>
        <meta
          name="description"
          content="Beranda aplikasi sosial media yang menampilkan postingan dari pengguna yang Anda ikuti."
        />
      </Helmet>
      <div className="flex justify-center shrink-0 ease-linear">
        <section className="w-full">
          {status === "success" && posts.length > 0 ? (
            <InfiniteScroll
              className="w-full flex flex-col"
              dataLength={posts.length}
              next={() => fetchPosts(true)}
              hasMore={hasMore}
              loader={
                <div className="w-full h-16 flex justify-center items-center">
                  <LoaderSpinner />
                </div>
              }
              endMessage={
                <div className="w-full h-16 flex justify-center items-center">
                  <b>Yay! You have seen it all</b>
                </div>
              }>
              <RenderList
                of={posts}
                render={(item: Post, index) => (
                  <Posting key={index} {...item} />
                )}
              />
            </InfiniteScroll>
          ) : (
            <Card className="max-w-lg m-4">
              <CardContent className="flex items-start gap-2 p-4">
                <CloudAlert className="w-20 aspect-square" />
                <div>
                  <h5 className="mb-1 font-medium leading-none tracking-tight">
                    Heads Up!
                  </h5>
                  <div className="text-sm text-justify [&_p]:leading-relaxed">
                    Anda tidak memiliki postingan apapun atau belum mengikuti
                    siapapun sehingga tidak ada postingan untuk ditampilkan di
                    halaman ini. upload postingan anda atau ikutin siapapun yang
                    anda inginkan. Explorasi lebih banyak dengan{" "}
                    <Link to="/explore" className="text-primary">
                      klik disini
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </>
  );
}
