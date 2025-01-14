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
      const maxHeight = lineHeight * 4; // Maksimal tinggi untuk 5 baris
      if (textRef.current.offsetHeight > maxHeight) {
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
          className="text-secondary-500 hover:text-primary-500">
          {isVisibleFullText ? "...less" : "more..."}
        </button>
      )}
    </>
  );
}
