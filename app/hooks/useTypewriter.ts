// hooks/useTypewriter.ts
"use client";

import { useState, useEffect } from "react";

export function useTypewriter(
  text: string,
  speed = 100,
  pause = 1500
) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Если дошли до конца — ждём и удаляем
    if (!isDeleting && displayText === text) {
      const timer = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timer);
    }

    // Если всё стерли — ждём и печатаем заново
    if (isDeleting && displayText === "") {
      const timer = setTimeout(() => setIsDeleting(false), pause);
      return () => clearTimeout(timer);
    }

    // Основной таймер
    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? text.slice(0, prev.length - 1)
          : text.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text, speed, pause]);

  return { displayText, isDeleting };
}