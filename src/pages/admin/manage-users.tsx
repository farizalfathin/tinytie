import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import RenderList from "@/components/others/RenderList";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { User } from "@/types/user";
import AvatarProfile from "@/components/AvatarProfile";
import { formatDate } from "@/utils/format";

type ManageUser = User & {
  followers: { following_user_id: string }[];
  followings: { followed_user_id: string }[];
};

export default function UsersTable() {
  const [users, setUsers] = useState<ManageUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ManageUser | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select(
          `*,
            followers:followings!followings_followed_user_id_fkey(following_user_id), 
            followings:followings!followings_following_user_id_fkey(followed_user_id)`
        );

        if (error) throw error;
        console.log(data);
        setUsers(
          data.map((item) => {
            return {
              ...item,
              fallback: item.full_name
                .split(" ")
                .map((word: any) => word[0])
                .join("")
                .toUpperCase(),
            };
          })
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="border rounded-lg overflow-hidden shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead colSpan={3}>Username</TableHead>
              <TableHead colSpan={2}>Email</TableHead>
              <TableHead className="text-center">Followers</TableHead>
              <TableHead className="text-center">Following</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, index) => (
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
                  <TableCell>
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <RenderList
                of={users}
                render={(item: ManageUser, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell colSpan={3}>{item.username}</TableCell>
                    <TableCell colSpan={2}>{item.email}</TableCell>
                    <TableCell className="text-center">
                      {item.followers.length}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.followings.length}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedUser(item);
                          setIsDetailOpen(true);
                        }}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
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
      <AlertDialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <AlertDialogContent className="w-full max-w-md p-0">
          <AlertDialogHeader>
            <div className="flex justify-between p-4">
              <AlertDialogTitle>User Detail</AlertDialogTitle>
              <AlertDialogCancel className="w-8 h-8 rounded-full">
                <X className="size-5" />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {selectedUser && (
              <div className="w-full p-4 pt-0">
                <AvatarProfile
                  className="size-32 mx-auto"
                  avatar_url={selectedUser.avatar_url}
                  fallback={selectedUser.fallback}
                />
                <div className="w-full flex flex-col items-start mt-6 text-sm">
                  <div className="flex gap-2">
                    <p className="w-28">ID User</p> :{" "}
                    <span>{selectedUser.id}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="w-28">Fullname</p> :{" "}
                    <span>{selectedUser.full_name}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="w-28">Username</p> :{" "}
                    <span>{selectedUser.username}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="w-28">Email</p> :{" "}
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="w-28">Bio</p> :{" "}
                    <span>
                      {selectedUser.bio ? selectedUser.bio : "No bio yet"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <p className="w-28">Total Followers</p> :{" "}
                    <span>{selectedUser.followers.length}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="w-28">Total Followings</p> :{" "}
                    <span>{selectedUser.followings.length}</span>
                  </div>
                  <div className="flex gap-2">
                    <p className="w-28">Last updated</p> :{" "}
                    <span>
                      {selectedUser.updated_at
                        ? formatDate(selectedUser.updated_at)
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
