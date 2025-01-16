import Posting from "@/components/Posting";
import LayoutSidebar from "@/components/templates/LayoutSidebar";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users (id, username, full_name, avatar_url)")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

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
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <LayoutSidebar>
      <div className="flex justify-center shrink-0 ease-linear">
        <div className="w-[468px] min-h-screen">
          <Posting
            users={
              post?.users || {
                id: "",
                avatar_url: "",
                fallback: "",
                username: "",
              }
            }
            image={post?.image || ""}
            caption={post?.caption || ""}
          />
        </div>
      </div>
    </LayoutSidebar>
  );
}
