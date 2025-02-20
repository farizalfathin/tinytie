import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-br from-zinc-900/15 to-zinc-900/5 dark:bg-zinc-50/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
