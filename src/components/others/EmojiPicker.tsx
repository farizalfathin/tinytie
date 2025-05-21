import { useState } from "react";
import { Button } from "../ui/button";
import EmojiPickerReact from "emoji-picker-react";
import { SmilePlus } from "lucide-react";

export default function EmojiPicker({ onChange }: { onChange: any }) {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  return (
    <>
      {showEmoji && (
        <div className="absolute left-4 bottom-20">
          <EmojiPickerReact
            onEmojiClick={(e: any) => onChange((prev: any) => prev + e.emoji)}
          />
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowEmoji((prev) => !prev)}>
        <SmilePlus />
      </Button>
    </>
  );
}
