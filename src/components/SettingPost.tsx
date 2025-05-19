import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function SettingPost({
  postId,
  isOwner,
  handleDelete,
}: {
  postId: string;
  isOwner: boolean;
  handleDelete: () => Promise<void>;
}) {
  if (!isOwner) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild>
        <div className="ml-auto cursor-pointer">
          <EllipsisVertical className="size-5 text-secondary-600" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="right"
        align="start"
        sideOffset={4}>
        <DropdownMenuGroup>
          <Link to={`/post/${postId}/edit`}>
            <DropdownMenuItem className="cursor-pointer">
              <SquarePen />
              Edit Post
            </DropdownMenuItem>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger className="w-full" asChild>
              <DropdownMenuItem
                className="focus:bg-destructive focus:text-white"
                onSelect={(e) => e.preventDefault()}>
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your post and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive hover:bg-destructive/90">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
