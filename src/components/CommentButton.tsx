import { useAuth } from "@/context/authentication";
import { supabase } from "@/lib/supabase";
import { Comment } from "@/types/post";
import { MessageCircleMore, Send } from "lucide-react";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import RenderList from "./others/RenderList";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import EmojiPicker from "./others/EmojiPicker";
import InputText from "./others/InputText";

export default function CommentButton({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const fetchComments = async () => {
    setStatus("loading");

    const { data, error } = await supabase
      .from("comments")
      .select(
        "id, created_at, message, users (id, username, full_name, avatar_url)"
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setStatus("failed");
      return;
    }

    setComments(
      data.map((comment: any) => ({
        ...comment,
        users: {
          ...comment.users,
          fallback: comment.users.full_name
            .split(" ")
            .map((word: any) => word[0])
            .join(""),
        },
      }))
    );

    setStatus("success");
  };

  const addComment = async () => {
    if (!user || newComment.length === 0) return;

    const newCommentOps = {
      id: `optimistic-${Date.now()}`,
      created_at: "baru saja",
      message: newComment,
      users: {
        ...user,
        fallback: user.full_name
          .split(" ")
          .map((word: string) => word[0])
          .join(""),
      },
    };
    setComments((prev) => [newCommentOps, ...prev]);

    const { error } = await supabase.from("comments").insert({
      user_id: user.id,
      message: newComment,
      post_id: postId,
    });

    if (error) {
      console.error("Error posting comment:", error);
      setComments((prev) => prev.filter((c) => c.id !== newCommentOps.id));
      return;
    }

    setNewComment("");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <span onClick={fetchComments} className="cursor-pointer">
          <MessageCircleMore />
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl">
              Post's Comments
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Commented by {comments.length} people
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-72 flex flex-col gap-2 overflow-y-auto scroll-comment">
            {status === "success" && comments.length > 0 ? (
              <RenderList
                of={comments}
                render={(item: Comment, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Avatar className="h-9 w-9 rounded-full mt-1">
                      <AvatarImage
                        src={item.users.avatar_url}
                        alt={item.users.username}
                      />
                      <AvatarFallback className="rounded-full">
                        {item.users.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Link
                        to={`/account/${item.users.id}`}
                        className="text-sm hover:underline">
                        {item.users.username}
                      </Link>
                      <p className="leading-tight whitespace-pre-line">
                        {item.message}
                      </p>
                    </div>
                  </div>
                )}
              />
            ) : status === "success" && !(comments.length > 0) ? (
              <span className="text-center">
                Belum ada yang mengomentari postingan ini
              </span>
            ) : (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="w-10 h-9 rounded-full" />
                    <div className="w-full flex flex-col gap-1">
                      <Skeleton className="w-32 h-3 rounded-sm" />
                      <Skeleton className="w-full h-4 rounded-sm" />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <DrawerFooter>
            {user ? (
              <div className="relative flex items-center gap-3 px-2 pt-2 border-t border-border">
                <EmojiPicker onChange={setNewComment} />
                <InputText
                  value={newComment}
                  onChange={setNewComment}
                  placeholder="Ketik pesan..."
                />
                <Button
                  type="button"
                  className="size-10 bg-primary rounded-full dark:bg-primary dark:hover:bg-primary/90"
                  onClick={addComment}>
                  <Send className="size-5 text-primary-foreground" />
                </Button>
              </div>
            ) : null}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
