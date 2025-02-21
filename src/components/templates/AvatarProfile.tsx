import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AvatarProfile({
  className,
  rounded = "full",
  avatar_url,
  fallback,
}: {
  className?: string;
  rounded?: "none" | "half" | "full";
  avatar_url: string;
  fallback: string;
}) {
  return (
    <Avatar
      className={cn(
        className,
        rounded === "full" && "rounded-full",
        rounded === "half" && "rounded-lg",
        rounded === "none" && "rounded-none"
      )}>
      <AvatarImage src={avatar_url} alt={fallback} />
      <AvatarFallback
        className={
          rounded === "full"
            ? "rounded-full"
            : rounded === "half"
            ? "rounded-lg"
            : "rounded-none"
        }>
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}
