"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 120; // 000 to 119

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
    
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      const indexStr = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${indexStr}_delay-0.066s.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      
      loadedImages.push(img);
    }
  }, []);

  // Sync scroll with frame
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const updateCanvas = useCallback((latest: number) => {
    if (!canvasRef.current || images.length !== FRAME_COUNT) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    
    const frame = Math.round(latest);
    const img = images[Math.min(frame, FRAME_COUNT - 1)];
    
    if (img && img.complete) {
      const canvas = canvasRef.current;
      const ctx = context;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;

      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);
      const cwFit = iw * ratio;
      const chFit = ih * ratio;

      const x = (cw - cwFit) / 2;
      const y = (ch - chFit) / 2;
      ctx.clearRect(0, 0, cw, ch);
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
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = window.innerWidth + "px";
        canvasRef.current.style.height = window.innerHeight + "px";
        
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
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
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover bg-[#121212]"
        />
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}
