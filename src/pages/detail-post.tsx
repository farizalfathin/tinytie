import { Posting, PostingSkeleton } from "@/components/Posting";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
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
    <div className="flex justify-center shrink-0 ease-linear">
      <div className="w-[468px] min-h-screen">
        {status === "success" && post ? (
          <Posting {...post} />
        ) : (
          <PostingSkeleton />
        )}
      </div>
    </div>
  );
}
