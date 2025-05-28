import { ImagePost, ImagePostSkeleton } from "@/components/ImagePost";
import LoaderSpinner from "@/components/LoaderSpinner";
import RenderList from "@/components/others/RenderList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/user";
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";

const order = [
  { column: "created_at", condition: { ascending: false } },
  { column: "created_at", condition: { ascending: true } },
  { column: "id", condition: { ascending: false } },
  { column: "id", condition: { ascending: true } },
  { column: "image", condition: { ascending: false } },
  { column: "image", condition: { ascending: true } },
  { column: "caption", condition: { ascending: false } },
  { column: "caption", condition: { ascending: true } },
];

export default function Explore() {
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [posts, setPosts] = useState<{ id: string; image: string }[]>([]);
  const [offset, setOffset] = useState(0);
  const [orderBy] = useState<{ column: string; condition: any }>(
    () => order[Math.floor(Math.random() * order.length)]
  );
  const hasFetched = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return searchTerm.length > 0
      ? allUsers.filter((user) =>
          user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");

      if (error) throw error;

      setAllUsers(
        data.map((user) => {
          return {
            ...user,
            fallback: user.full_name
              .split(" ")
              .map((word: any) => word[0])
              .join("")
              .toUpperCase(),
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async (isLoadMore = false) => {
    if (!isLoadMore) setStatus("loading");

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, image")
        .order(orderBy.column, orderBy.condition)
        .range(offset, offset + 11); // Ambil data 12 item

      if (error) throw new Error("error fetching data posts: " + error);

      setTimeout(() => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevData) => [...prevData, ...data]);
        }

        setOffset((prevOffset) => prevOffset + data.length);
        if (!isLoadMore) setStatus("success");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (!isLoadMore) setStatus("failed");
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    fetchUsers();
    fetchPosts();
    hasFetched.current = true;
  }, []);

  return (
    <>
      <Helmet>
        <title>Explore Posts | TinyTie</title>
        <meta
          name="description"
          content="Lihat dan jelajahi berbagai postingan gambar yang diunggah oleh pengguna dari seluruh platform."
        />
        <meta property="og:title" content="Jelajahi Postingan" />
        <meta
          property="og:description"
          content="Temukan beragam konten menarik yang dibagikan oleh pengguna di halaman Explore."
        />
      </Helmet>
      <div className="flex flex-col max-w-lg h-full mx-auto shrink-0 ease-linear">
        <div className="sticky top-0 z-30 px-2 py-3 backdrop-blur-md focus-within:backdrop-blur-0 transition-all focus-within:bg-white dark:focus-within:bg-zinc-950">
          <Input
            type="text"
            placeholder="Search users...."
            className="w-full bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm.trim().length > 0 && filteredUsers.length > 0 && (
            <div className="absolute mt-2 p-2 left-2 right-2 bg-white dark:bg-zinc-950 border border-border rounded shadow z-40">
              <ScrollArea
                className={`w-full ${
                  filteredUsers.length > 3 ? "h-48" : "h-auto"
                }`}>
                <RenderList
                  of={filteredUsers}
                  render={(user, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-muted">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-full">
                          <AvatarImage
                            src={user.avatar_url}
                            alt={user.username}
                          />
                          <AvatarFallback className="rounded-full text-xs">
                            {user.fallback}
                          </AvatarFallback>
                        </Avatar>
                        <span className="">{user.full_name}</span>
                      </div>
                    </div>
                  )}
                />
              </ScrollArea>
            </div>
          )}
        </div>
        <div className="w-full max-w-lg border border-border">
          {status === "loading" ? (
            <div className="grid grid-cols-3">
              {Array.from({ length: 12 }).map((_, index) => (
                <ImagePostSkeleton key={index} className="h-52 md:h-auto" />
              ))}
            </div>
          ) : (
            <InfiniteScroll
              className="relative pb-16 grid grid-cols-3"
              dataLength={posts.length}
              next={() => fetchPosts(true)}
              hasMore={hasMore}
              loader={
                <div className="absolute bottom-0 w-full h-16 flex justify-center items-center">
                  <LoaderSpinner />
                </div>
              }
              endMessage={
                <div className="absolute bottom-0 w-full h-16 flex justify-center items-center">
                  <b>Yay! You have seen it all</b>
                </div>
              }>
              <RenderList
                of={posts}
                render={(item: { id: string; image: string }, index) => (
                  <ImagePost key={index} {...item} className="h-52 md:h-auto" />
                )}
              />
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
}
