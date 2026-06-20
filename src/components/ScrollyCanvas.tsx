"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 120; // 000 to 119
const MOBILE_SAMPLE_COUNT = 30; // reduced frames for mobile to save memory/bandwidth

export default function ScrollyCanvas({
  children,
}: {
  children?: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);

  // Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Decide whether to load full frame set or a sampled subset on mobile
    const isTouch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
    const isNarrow = typeof window !== "undefined" && window.innerWidth < 768;
    const useSampling = isTouch || isNarrow;

    // Build an index list to load. On mobile we sample a smaller set evenly spaced.
    const indices: number[] = [];
    if (useSampling) {
      for (let i = 0; i < MOBILE_SAMPLE_COUNT; i++) {
        const mapped = Math.round((i * (FRAME_COUNT - 1)) / Math.max(1, MOBILE_SAMPLE_COUNT - 1));
        indices.push(mapped);
      }
    } else {
      for (let i = 0; i < FRAME_COUNT; i++) indices.push(i);
    }

    for (const idx of indices) {
      const img = new window.Image();
      const indexStr = idx.toString().padStart(3, "0");
      img.src = `/sequence/frame_${indexStr}_delay-0.066s.png`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === indices.length) {
          setImages(loadedImages);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  // Sync scroll with frame
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const updateCanvas = useCallback((latest: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const frame = Math.round(latest);

    // If we sampled frames for mobile, map the full-range frame index into the sampled images array.
    const sampledCount = images.length;
    const mappedIndex = Math.round((frame * (sampledCount - 1)) / Math.max(1, FRAME_COUNT - 1));
    const img = images[Math.min(Math.max(0, mappedIndex), sampledCount - 1)];
    
    if (img && img.complete) {
      const canvas = canvasRef.current;
      const ctx = context;
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.width / dpr;
      const cssHeight = canvas.height / dpr;
      const iw = img.width;
      const ih = img.height;

      const hRatio = cssWidth / iw;
      const vRatio = cssHeight / ih;
      const isMobile = window.innerWidth < 768;

      // On mobile, use contain-style scaling and top alignment so the face is never cropped.
      // On desktop, preserve the original cover behavior for a premium full-screen hero.
      const ratio = isMobile ? Math.min(hRatio, vRatio) : Math.max(hRatio, vRatio);
      const cwFit = iw * ratio;
      const chFit = ih * ratio;

      const x = (cssWidth - cwFit) / 2;
      const y = isMobile ? 0 : (cssHeight - chFit) * 0.35;

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, iw, ih, x, y, cwFit, chFit);
    }
  }, [images]);

  useEffect(() => {
    let lastFrame = -1;
    
    const animate = () => {
      const current = frameIndex.get();
      const frame = Math.round(current);
      
      if (frame !== lastFrame) {
        updateCanvas(frame);
        lastFrame = frame;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [frameIndex, updateCanvas]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const MAX_PIXELS = 2048 * dpr;
        canvasRef.current.width = Math.min(window.innerWidth * dpr, MAX_PIXELS);
        canvasRef.current.height = Math.min(window.innerHeight * dpr, MAX_PIXELS);
        canvasRef.current.style.width = window.innerWidth + "px";
        canvasRef.current.style.height = window.innerHeight + "px";
        
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        
        // Trigger a re-draw immediately after resize
        updateCanvas(Math.round(frameIndex.get()));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex, updateCanvas]);

  return (
    <div className="relative h-[800vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-visible md:overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full bg-[#121212] pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
