import RenderList from "@/components/others/RenderList";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";
import { formatDate, slicingText } from "@/utils/format";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ManagePosts() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const MAX_POSTS_PER_PAGE = 10;

  const fetchPosts = async () => {
    const from = (page - 1) * MAX_POSTS_PER_PAGE;
    const to = page * MAX_POSTS_PER_PAGE - 1;
    setLoading(true);

    try {
      const { data, error, count } = await supabase
        .from("posts")
        .select("*, users(id, username, full_name, avatar_url)", {
          count: "exact",
        })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw new Error("error fetching posts: " + error.message);

      setPosts(
        data.map((item) => {
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
        })
      );
      setTotalPages(Math.ceil((count ?? 0) / MAX_POSTS_PER_PAGE));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleDelete = async (item: Post) => {
    if (!item.id) {
      toast({
        title: "Postingan anda gagal dihapus",
        description: "Anda tidak memiliki akses untuk menghapus postingan ini!",
        duration: 5000,
      });
      return;
    }
    const imageTarget = item.image.split("/").pop();

    try {
      await supabase.storage
        .from("publicImages")
        .remove([`posts/${imageTarget}`]);

      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", item.id);

      if (deleteError) throw new Error("Error deleting post: " + deleteError);

      setPosts((prev) => prev.filter((p) => p.id !== item.id));
      toast({
        title: "Postingan ini berhasil dihapus",
        description: "Anda berhasil menghapus postingan ini di database",
        duration: 7000,
      });
      setTimeout(() => {
        setIsDetailOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Postingan ini gagal dihapus",
        description: "Anda akan gagal menghapus postingan ini. Coba lagi nanti",
        duration: 5000,
      });
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post List</h1>
      <div className="border rounded-lg overflow-hidden shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead colSpan={3}>Image URL</TableHead>
              <TableHead colSpan={2}>Owned by</TableHead>
              <TableHead colSpan={2}>Caption</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Skeleton className="h-6 w-36" />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-6 w-28" />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Skeleton className="h-6 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <RenderList
                of={posts}
                render={(item: Post, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell colSpan={3}>
                      {slicingText(item.image, 50)}
                    </TableCell>
                    <TableCell colSpan={2}>{item.users.username}</TableCell>
                    <TableCell colSpan={2}>
                      {slicingText(item.caption, 30)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                        onClick={() => {
                          setSelectedPost(item);
                          setIsDetailOpen(true);
                        }}>
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              />
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}>
          <ArrowLeft />
        </Button>
        <span className="text-lg font-medium">Page {page}</span>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}>
          <ArrowRight />
        </Button>
      </div>
      <AlertDialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <AlertDialogContent className="w-full max-w-md p-0">
          <ScrollArea className="max-h-[70vh]">
            <AlertDialogHeader>
              <div className="flex justify-between p-4">
                <AlertDialogTitle>Post Detail</AlertDialogTitle>
                <AlertDialogCancel className="w-8 h-8 rounded-full">
                  <X className="size-5" />
                </AlertDialogCancel>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {selectedPost && (
                <div className="w-full p-4 pt-0">
                  <img
                    src={selectedPost.image}
                    alt={slicingText(selectedPost.caption, 100)}
                    className="size-32 aspect-square object-cover object-center rounded mx-auto"
                  />
                  <div className="w-full flex flex-col items-start gap-1 mt-6 text-sm">
                    <div className="flex gap-2">
                      <p className="w-28">ID Post</p> :{" "}
                      <span>{selectedPost.id}</span>
                    </div>
                    <div className="flex gap-2">
                      <p className="w-28">Created at</p> :{" "}
                      <span>{formatDate(selectedPost.created_at)}</span>
                    </div>
                    <div className="flex gap-2">
                      <p className="w-28">Tag</p> :{" "}
                      <span>
                        {selectedPost.tag
                          ? selectedPost.tag.map((t) => `#${t} `)
                          : "-"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <p className="w-28">Owned by</p> :{" "}
                      <span>{selectedPost.users.username}</span>
                    </div>
                    <div className="flex gap-2">
                      <p className="w-28">Caption</p> :{" "}
                      <span className="text-justify">
                        {selectedPost.caption}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="mt-4"
                    onClick={() => handleDelete(selectedPost)}>
                    Delete
                  </Button>
                  <p className="text-xs italic font-medium mt-1">
                    this action has no alert & can't be undone
                  </p>
                </div>
              )}
            </AlertDialogFooter>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
