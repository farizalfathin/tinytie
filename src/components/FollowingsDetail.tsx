import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { X } from "lucide-react";
import { Separator } from "./ui/separator";
import { supabase } from "@/lib/supabase";
import RenderList from "./others/RenderList";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { UserRelation } from "@/types/user";
import { Skeleton } from "./ui/skeleton";

export default function FollowingsDetail({
  userId,
  detail,
  children,
}: {
  userId: string;
  detail: "followings" | "followers";
  children: ReactNode;
}) {
  const [status, setStatus] = useState<"loading" | "failed" | "success">(
    "loading"
  );
  const [data, setData] = useState<UserRelation[]>([]);

  const fetchData = async () => {
    if (!userId) return;
    setStatus("loading");
    const filterColumn =
      detail === "followings" ? "following_user_id" : "followed_user_id";
    const relatedColumn =
      detail === "followings" ? "followed_user_id" : "following_user_id";

    try {
      const { data: followData, error } = await supabase
        .from("followings")
        .select(
          `
            users: ${relatedColumn} (
              id,
              username,
              full_name,
              avatar_url
            )
          `
        )
        .eq(filterColumn, userId);

      if (error)
        throw new Error("error fetching followings or followers: " + error);

      setData(
        followData.map((item: any) => ({
          ...item.users,
          fallback: item.users.full_name
            .split(" ")
            .map((word: any) => word[0])
            .join("")
            .toUpperCase(),
        }))
      );
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={fetchData} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-sm p-0">
        <AlertDialogHeader>
          <div className="relative flex justify-between items-center px-3 py-3">
            <AlertDialogCancel className="w-8 h-8 rounded-full">
              <X className="size-5" />
            </AlertDialogCancel>
            <AlertDialogTitle className="absolute left-1/2 transform -translate-x-1/2">
              {detail === "followings" ? "Followings" : "Followers"}
            </AlertDialogTitle>
          </div>
          <Separator orientation="horizontal" className="w-full h-[1px]" />
        </AlertDialogHeader>
        <AlertDialogFooter className="block">
          <AlertDialogDescription className="text-center mb-1">
            {detail === "followings"
              ? `following ${data.length} people`
              : `followed by ${data.length} people`}
          </AlertDialogDescription>
          <div className="w-full h-64 flex flex-col gap-2 px-3 overflow-y-auto scroll-following">
            {status === "success" && data.length > 0 ? (
              <RenderList
                of={data}
                render={(item: UserRelation, index) => (
                  <div key={index} className="w-full flex items-center gap-2">
                    <Avatar className="h-9 w-9 rounded-full border border-primary-300">
                      <AvatarImage src={item.avatar_url} alt={item.username} />
                      <AvatarFallback className="rounded-full">
                        {item.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <Link
                      to={`/account/${item.id}`}
                      className="text-sm underline hover:text-primary-500">
                      {item.username}
                    </Link>
                  </div>
                )}
              />
            ) : status === "success" && !(data.length > 0) ? (
              <span className="text-center mt-2">
                {detail === "followings"
                  ? "Belum ada yang anda ikuti"
                  : "Belum ada yang mengikuti anda"}
              </span>
            ) : (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="w-9 h-9 rounded-full" />
                    <Skeleton className="w-48 h-4 rounded-sm" />
                  </div>
                ))}
              </>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
