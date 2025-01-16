import { MessageCircleMore, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LikeButton from "./LikeButton";
import TruncateCapt from "./TruncateCapt";
import HoverTooltip from "./templates/HoverTooltip";
import { BottomDrawer } from "./templates/BottomDrawer";
import RenderList from "./others/RenderList";
import { DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/authentication";

type DataFriend = {
  name: string;
  avatar: string;
  fallback: string;
};

const dataFriend: DataFriend[] = [
  {
    name: "friend 1",
    avatar:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
    fallback: "F1",
  },
  {
    name: "friend 2",
    avatar: "",
    fallback: "F2",
  },
  {
    name: "friend 3",
    avatar: "",
    fallback: "F3",
  },
  {
    name: "friend 4",
    avatar: "",
    fallback: "F4",
  },
  {
    name: "friend 5",
    avatar: "",
    fallback: "F5",
  },
  {
    name: "friend 1",
    avatar:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/112fdda4-3732-4250-8e6d-af983aea1528/dffxj6r-3432fc5d-15fe-4b2c-8cf8-107bee34638a.jpg/v1/fill/w_894,h_894,q_70,strp/nagumo_from_sakamoto_days__by_nivet2006_dffxj6r-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzExMmZkZGE0LTM3MzItNDI1MC04ZTZkLWFmOTgzYWVhMTUyOFwvZGZmeGo2ci0zNDMyZmM1ZC0xNWZlLTRiMmMtOGNmOC0xMDdiZWUzNDYzOGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HD4Kqgp9Nu6Wg-rvnV1F774i0pw5cBJ1c3HA0EEJE8w",
    fallback: "F1",
  },
  {
    name: "friend 2",
    avatar: "",
    fallback: "F2",
  },
];

export default function Posting({
  users,
  image,
  like = 0,
  comment = 0,
  caption,
}: {
  users: {
    id: string;
    username: string;
    avatar_url: string;
    fallback: string;
  };
  image: string;
  like?: number;
  comment?: number;
  caption: string;
}) {
  const { user } = useAuth();

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2 border border-secondary-200 px-2 py-1">
        <Avatar className="h-8 w-8 rounded-full border border-primary-300">
          <AvatarImage src={users.avatar_url} alt={users.username} />
          <AvatarFallback className="rounded-full">
            {users.fallback}
          </AvatarFallback>
        </Avatar>
        <Link
          to={users.id === user?.id ? "/account/me" : `/account/${users.id}`}
          className="text-sm underline">
          {users.username}
        </Link>
      </div>
      <div className="border-x border-secondary-200">
        <img
          src={image}
          alt={users.username}
          className="w-full aspect-square object-cover object-center"
        />
      </div>
      <div className="p-2 pb-4 border border-b-0 border-secondary-200">
        <div className="flex gap-4 text-sm -mb-1">
          <HoverTooltip text={like}>
            <LikeButton />
          </HoverTooltip>
          <HoverTooltip text={comment}>
            <MessageCircleMore />
          </HoverTooltip>
          <button>
            <Share2 />
          </button>
        </div>
        <BottomDrawer
          componentTrigger={
            <button className="text-xs underline hover:text-primary-500 cursor-pointer">
              view who likes
            </button>
          }>
          <div className="h-72 mx-auto w-full max-w-screen-sm">
            <DrawerHeader>
              <DrawerTitle className="text-xl mx-auto">
                Liked by {like} people
              </DrawerTitle>
            </DrawerHeader>
            <div className="grid grid-cols-3 justify-center gap-2">
              <RenderList
                of={dataFriend}
                render={(item: DataFriend, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar className="h-9 w-9 rounded-full border border-primary-300">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback className="rounded-full">
                        {item.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <span>{users.username}</span>
                  </div>
                )}
              />
            </div>
          </div>
        </BottomDrawer>
        <div className="text-sm pe-2">
          <TruncateCapt>
            <span className="font-semibold me-1">{users.username}</span>{" "}
            {caption}
          </TruncateCapt>
        </div>
      </div>
    </div>
  );
}
