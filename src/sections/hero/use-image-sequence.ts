"use client";

import { useEffect, useRef, useState } from "react";

import { HERO_FRAME_COUNT, heroFramePath } from "./hero-frames";

/**
 * useImageSequence — preloads every Hero film frame before scrubbing begins.
 *
 * All 289 frames load before the pin/scrub engages (see use-hero-scroll.ts) —
 * simpler and more robust than progressive/partial loading, and at ~10MB
 * total for the whole sequence, fast enough on typical broadband that a
 * loading state is brief rather than a real wait.
 */
export function useImageSequence() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(HERO_FRAME_COUNT);

    for (let i = 0; i < HERO_FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = heroFramePath(i + 1);

      const onDone = () => {
        loaded += 1;
        if (cancelled) return;
        setLoadedCount(loaded);
        if (loaded === HERO_FRAME_COUNT) setReady(true);
      };

      img.onload = onDone;
      img.onerror = onDone;
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  return { imagesRef, loadedCount, total: HERO_FRAME_COUNT, ready };
}
