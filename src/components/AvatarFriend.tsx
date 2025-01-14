import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AvatarFriend({
  name,
  avatar,
  fallback,
}: {
  name: string;
  avatar: string;
  fallback: string;
}) {
  return (
    <div className="flex flex-col flex-shrink-0 items-center">
      <Avatar className="h-8 w-8 rounded-full border-2 border-white outline-dashed outline-primary-500 mb-1">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="rounded-full">{fallback}</AvatarFallback>
      </Avatar>
      <span className="text-[10px]">{name}</span>
    </div>
  );
}
