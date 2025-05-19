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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const addCommentFormSchema = z.object({
  message: z.string().min(5, "pesan komentar minimal 5 karakter"),
});

type AddCommentFormSchema = z.infer<typeof addCommentFormSchema>;

export default function CommentButton({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const form = useForm<AddCommentFormSchema>({
    resolver: zodResolver(addCommentFormSchema),
    defaultValues: {
      message: "",
    },
  });

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

  const addComment = async (data: AddCommentFormSchema) => {
    if (!user) return;

    const newComment = {
      id: `optimistic-${Date.now()}`,
      created_at: "baru saja",
      message: data.message,
      users: {
        ...user,
        fallback: user.full_name
          .split(" ")
          .map((word: string) => word[0])
          .join(""),
      },
    };
    setComments((prev) => [newComment, ...prev]);

    const { error } = await supabase.from("comments").insert({
      user_id: user.id,
      message: data.message,
      post_id: postId,
    });

    if (error) {
      console.error("Error posting comment:", error);
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
      return;
    }

    form.reset();
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
                        className="text-sm underline hover:text-primary-500">
                        {item.users.username}
                      </Link>
                      <p className="text-secondary-700 leading-tight">
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(addComment)}>
                  <div className="flex items-center gap-3 px-2 pt-2 border-t border-border">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormMessage />
                          <FormControl>
                            <Textarea
                              {...field}
                              className="w-full min-h-10 max-h-36 border p-1 ps-2 rounded-sm resize-y"
                              placeholder="Send new comment...."
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="size-10 bg-primary rounded-full dark:bg-primary dark:hover:bg-primary/90">
                      <Send className="size-5 text-primary-foreground" />
                    </Button>
                  </div>
                </form>
              </Form>
            ) : null}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
