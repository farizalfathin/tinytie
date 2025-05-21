import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { Textarea } from "../ui/textarea";

export default function InputText({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: any;
  onChange: any;
  placeholder?: string;
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // reset dulu
      const newHeight = Math.min(el.scrollHeight, 60); // max height: 60px
      el.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={1}
      className={cn(
        "resize-none overflow-hidden max-h-[60px] leading-tight",
        className
      )}
    />
  );
}
