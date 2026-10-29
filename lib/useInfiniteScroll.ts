"use client";

import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
  onIntersect: () => void;
};

export function useInfiniteScroll({ enabled = true, onIntersect }: Options) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onIntersect();
        });
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, onIntersect]);

  return ref;
}
