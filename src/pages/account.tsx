import LayoutSidebar from "@/components/templates/LayoutSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/authentication";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";

export default function Account() {
  const { user } = useAuth();
  const [select, setSelect] = useState<number>(0);

  return (
    <LayoutSidebar>
      <div className="flex justify-center shrink-0 ease-linear">
        <div className="w-[468px] min-h-screen border border-secondary-200">
          {/* Header */}
          <div className="flex items-center justify-center py-3 border-b border-secondary-200">
            <h1 className="text-lg font-semibold">{user?.full_name}</h1>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col text-center items-center py-8">
            <Avatar className="h-24 w-24 rounded-full border border-primary-300 mb-1">
              <AvatarImage
                src={user?.avatar_url || ""}
                alt={user?.username || ""}
              />
              <AvatarFallback className="rounded-full text-2xl">
                {user?.fallback}
              </AvatarFallback>
            </Avatar>
            <span>{user?.username}</span>
            <p className="text-sm text-gray-500">
              {user?.bio ? user.bio : "no bio yet."}
            </p>
            <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium">
              Follow
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex py-3 border-t border-b border-secondary-200">
            <div className="w-1/3 text-center">
              <p className="text-lg font-semibold">123</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="w-1/3 text-center">
              <p className="text-lg font-semibold">456</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="w-1/3 text-center">
              <p className="text-lg font-semibold">789</p>
              <p className="text-sm text-gray-500">Likes</p>
            </div>
          </div>
          <div className="flex border-b border-secondary-300">
            <div
              className={`flex-1 flex justify-center items-center py-2 ${
                select === 0 &&
                "border-b border-primary-300 bg-gradient-to-t from-primary-100 to-transparent"
              }`}
              onClick={() => setSelect(0)}>
              <MessageCircleMore />
            </div>
            <div
              className={`flex-1 flex justify-center items-center py-2 ${
                select === 1 &&
                "border-b border-primary-300 bg-gradient-to-t from-primary-100 to-transparent"
              }`}
              onClick={() => setSelect(1)}>
              <MessageCircleMore />
            </div>
            <div
              className={`flex-1 flex justify-center items-center py-2 ${
                select === 2 &&
                "border-b border-primary-300 bg-gradient-to-t from-primary-100 to-transparent"
              }`}
              onClick={() => setSelect(2)}>
              <MessageCircleMore />
            </div>
          </div>

          <div className="grid grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative w-full pt-[100%] bg-secondary-300 overflow-hidden">
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Image
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}
