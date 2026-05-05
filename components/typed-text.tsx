"use client";

import { useState, useEffect } from "react";

interface TypedTextProps {
  strings: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export function TypedText({
  strings,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetween = 2000,
}: TypedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[stringIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentString.length) {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBetween);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentString.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}