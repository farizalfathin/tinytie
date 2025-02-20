import { ImagePost, ImagePostSkeleton } from "@/components/ImagePost";
import LoaderSpinner from "@/components/others/LoaderSpinner";
import RenderList from "@/components/others/RenderList";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
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
  const [orderBy, setOrderBy] = useState<{ column: string; condition: any }>(
    () => order[Math.floor(Math.random() * order.length)]
  );
  const hasFetched = useRef(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (isLoadMore = false) => {
    if (!isLoadMore) setStatus("loading");

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, image")
        .order(orderBy.column, orderBy.condition)
        .range(offset, offset + 11); // Ambil data 12 item

      if (error) throw new Error("error fetching data posts: " + error);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevData) => [...prevData, ...data]); // Tambahkan data baru
      }

      setOffset((prevOffset) => prevOffset + data.length); // Update offset berdasarkan data yang didapat
      if (!isLoadMore) setStatus("success");
    } catch (error) {
      console.error(error);
      if (!isLoadMore) setStatus("failed");
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    fetchPosts();
    hasFetched.current = true;
  }, []);

  return (
    <div className="flex justify-center shrink-0 ease-linear">
      <div className="w-full max-w-[548px] min-h-screen border border-secondary-200">
        {status === "loading" ? (
          <div className="grid grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <ImagePostSkeleton key={index} />
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
                <ImagePost key={index} {...item} />
              )}
            />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
