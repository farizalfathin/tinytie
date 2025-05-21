import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/authentication";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useSearchParams } from "react-router-dom";
import { formatTime } from "@/utils/format";
import { useIsMobile } from "@/hooks/use-mobile";
import InputText from "@/components/others/InputText";
import EmojiPicker from "@/components/others/EmojiPicker";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

interface ChatUser {
  id: string;
  fallback: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

export default function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [params, setParams] = useSearchParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    const getChatUsers = async () => {
      try {
        if (!user) return;

        const { data, error } = await supabase
          .from("followings")
          .select("following_user_id, followed_user_id")
          .or(`following_user_id.eq.${user.id},followed_user_id.eq.${user.id}`);

        if (error) throw error;

        const uniqueUserIds = [
          ...new Set(
            data.flatMap((msg) => [msg.following_user_id, msg.followed_user_id])
          ),
        ].filter((id) => id !== user.id);

        if (uniqueUserIds.length === 0) return;

        const { data: users, error: usersError } = await supabase
          .from("users")
          .select("id, full_name, username, avatar_url")
          .in("id", uniqueUserIds);

        if (usersError) throw usersError;

        setChatUsers(
          users.map((u) => ({
            ...u,
            fallback: u.full_name
              .split(" ")
              .map((w: string) => w[0])
              .join(""),
          }))
        );
      } catch (error) {
        console.error("Error fetching chat users:", error);
      }
    };

    getChatUsers();
  }, [user]);

  useEffect(() => {
    if (!selectedChat || !user) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .or(
            `and(sender_id.eq.${user?.id},receiver_id.eq.${selectedChat?.id}),and(sender_id.eq.${selectedChat?.id},receiver_id.eq.${user?.id})`
          )
          .order("created_at", { ascending: true });

        if (error) throw new Error("Error fetching messages: " + error.message);

        setChats(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel("chat-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new as Message;
          if (
            (newMsg.sender_id === user.id &&
              newMsg.receiver_id === selectedChat.id) ||
            (newMsg.sender_id === selectedChat.id &&
              newMsg.receiver_id === user.id)
          ) {
            setChats((prev) => [...prev, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [selectedChat, user]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !user) return;

    try {
      const { error } = await supabase.from("messages").insert([
        {
          sender_id: user.id,
          receiver_id: selectedChat.id,
          content: newMessage.trim(),
        },
      ]);

      if (error) throw new Error("Error sending message: " + error);

      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const filterUsers = useMemo(() => {
    if (searchUser.length > 0)
      return chatUsers.filter((user) => {
        return user.full_name
          .toLowerCase()
          .startsWith(searchUser.toLowerCase());
      });

    return chatUsers;
  }, [searchUser, chatUsers]);

  useEffect(() => {
    if (params.get("id"))
      setSelectedChat(chatUsers.find((u) => u.id === params.get("id")) || null);
  }, [params, chatUsers]);

  return (
    <div className={cn("flex h-full", !isMobile && "h-screen")}>
      {(isMobile && !selectedChat) || !isMobile ? (
        <aside
          className={cn(
            "border-r border-sidebar-border pt-4",
            isMobile ? "w-full" : "w-1/3"
          )}>
          <h2 className="text-xl font-semibold mb-4 ms-4">Chats</h2>
          <Input
            type="text"
            placeholder="Search..."
            className="max-w-[90%] mx-auto"
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <ScrollArea className="mt-4 h-[calc(100vh-112px)]">
            {filterUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => setParams({ id: user.id })}
                className={`px-4 py-2 cursor-pointer ${
                  selectedChat?.id === user.id ? "bg-secondary" : ""
                }`}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={user.avatar_url} alt={user.username} />
                    <AvatarFallback className="rounded-full text-xs">
                      {user.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <span className="">{user.full_name}</span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </aside>
      ) : null}

      {(isMobile && selectedChat) || !isMobile ? (
        <main className={cn("flex flex-col", isMobile ? "w-full" : "w-2/3")}>
          {selectedChat ? (
            <>
              <header className="p-4 border-b border-sidebar-border font-semibold flex items-center gap-2">
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedChat(null)}>
                    <ArrowLeft size={20} />
                  </Button>
                )}
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    src={selectedChat.avatar_url}
                    alt={selectedChat.username}
                  />
                  <AvatarFallback className="rounded-full text-xs">
                    {selectedChat.fallback}
                  </AvatarFallback>
                </Avatar>
                <Link
                  to={"/account/" + selectedChat.id}
                  className="hover:text-primary">
                  {selectedChat.full_name}
                </Link>
              </header>

              <ScrollArea className="flex-1 p-4 space-y-2">
                {chats.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "w-full flex justify-start mb-1",
                      msg.sender_id === user?.id && "justify-end"
                    )}>
                    <div
                      className={cn(
                        "max-w-[60%] flex flex-col items-start py-2 px-3 rounded-lg bg-secondary text-secondary-foreground",
                        msg.sender_id === user?.id &&
                          "bg-primary text-primary-foreground items-end"
                      )}>
                      <p className="whitespace-pre-line">{msg.content}</p>
                      <span
                        className={cn(
                          "text-xs text-secondary-500",
                          msg.sender_id === user?.id &&
                            "text-secondary-200 text-end"
                        )}>
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <footer className="relative p-4 border-t border-sidebar-border flex gap-2">
                <EmojiPicker onChange={setNewMessage} />
                <InputText
                  value={newMessage}
                  onChange={setNewMessage}
                  placeholder="Ketik pesan..."
                  className="flex-1"
                />
                <Button onClick={sendMessage}>
                  <Send size={20} />
                </Button>
              </footer>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-500">
              Pilih chat untuk memulai percakapan
            </div>
          )}
        </main>
      ) : null}
    </div>
  );
}
