import { Posting, PostingSkeleton } from "@/components/Posting";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export default function DetailPost() {
  const { id } = useParams();
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [post, setPost] = useState<Post>();

  const fetchPosts = async () => {
    if (!id) return;
    setStatus("loading");

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*,users (id, username, full_name, avatar_url)")
        .eq("id", id)
        .single();

      if (error)
        throw new Error("error fetching detail post: " + error.message);

      setPost({
        ...data,
        users: {
          ...data.users,
          fallback: data.users.full_name
            .split(" ")
            .map((word: any) => word[0])
            .join(""),
        },
      });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  return (
    <>
      {status === "success" && post && (
        <Helmet>
          <title>
            {post.users.username} di TinyTie: "{post.caption?.slice(0, 40)}"
          </title>
          <meta
            name="description"
            content={
              post.caption?.length > 100
                ? post.caption.slice(0, 100) + "..."
                : post.caption || "Lihat detail postingan pengguna."
            }
          />
          <meta
            property="og:title"
            content={`${post.users.username} membagikan postingan`}
          />
          <meta
            property="og:description"
            content={post.caption || "Lihat detail postingan pengguna."}
          />
          {post.image && <meta property="og:image" content={post.image} />}
        </Helmet>
      )}
      <div className="flex-1 flex justify-center shrink-0 ease-linear">
        <section className="w-full min-h-full">
          {status === "success" && post ? (
            <Posting {...post} />
          ) : (
            <PostingSkeleton />
          )}
        </section>
      </div>
    </>
  );
}
