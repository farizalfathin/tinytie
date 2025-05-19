import { useState, useRef, useEffect, ReactNode } from "react";

export default function TruncateCapt({ children }: { children: ReactNode }) {
  const [isVisibleFullText, setIsVisibleFullText] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight
      );
      const maxHeight = lineHeight * 5;
      const actualHeight = textRef.current.scrollHeight;
      if (actualHeight > maxHeight) {
        setIsTruncated(true);
      }
    }
  }, []);

  return (
    <>
      <p
        ref={textRef}
        className={`${!isVisibleFullText && "line-clamp-5 text-ellipsis"}`}>
        {children}
      </p>
      {isTruncated && (
        <button
          onClick={() => setIsVisibleFullText(!isVisibleFullText)}
          className="text-muted-foreground select-none hover:text-primary">
          {isVisibleFullText ? "...less" : "more..."}
        </button>
      )}
    </>
  );
}
