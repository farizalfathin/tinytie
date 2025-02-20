import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export const ImagePost = ({
  id,
  image,
  className,
}: {
  id: string;
  image: string;
  className?: string;
}) => {
  return (
    <Link
      to={`/post/${id}`}
      className="relative bg-secondary-200 overflow-hidden select-none group">
      <img
        src={image}
        alt={`post-${id}`}
        className={cn(
          "w-full aspect-square object-cover object-center transform transition-transform duration-300 group-hover:scale-105",
          className
        )}
      />
    </Link>
  );
};

export function ImagePostSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("w-full aspect-square rounded-none", className)} />
  );
}
