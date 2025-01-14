import { useState } from "react";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <span onClick={toggleLike} className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "#ef4444" : "transparent"}
        viewBox="0 0 24 24"
        stroke={isLiked ? "#ef4444" : "currentColor"}
        strokeWidth={2}
        className={`w-6 h-6 transition-transform duration-300 ${
          isLiked ? "scale-[1.15]" : "scale-100"
        }`}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </span>
  );
}
