import { EllipsisVertical, Settings, SquarePen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
        <DropdownMenuLabel className="p-0 font-normal"></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isOwner ? (
            <Link to={`/post/${postId}/edit`}>
              <DropdownMenuItem className="cursor-pointer">
                <SquarePen />
                Edit Post
              </DropdownMenuItem>
            </Link>
          ) : null}

          <Link to="/setting">
            <DropdownMenuItem className="cursor-pointer">
              <Settings />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        {isOwner ? (
          <>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger className="w-full" asChild>
                <DropdownMenuItem
                  className="focus:bg-red-500 focus:text-white"
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
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
