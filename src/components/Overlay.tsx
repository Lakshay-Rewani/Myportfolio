"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1: Center
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.18], [0, -100]);
  const scale1 = useTransform(scrollYProgress, [0, 0.18], [1, 0.9]);

  // Section 2: Left
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.28, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

  // Section 3: Right
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.68, 0.85, 0.92], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.92], [50, -50]);

  return (
    <div className="absolute inset-0 w-full h-full text-white">
      {/* Section 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-x-0 top-[40%] -translate-y-[40%] flex flex-col items-center text-center px-4"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
          Lakshay Rewani
        </h1>
        <p className="text-xl md:text-3xl text-gray-300 max-w-lg font-light tracking-wide">
          Aspiring DevOps Engineer.
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute left-8 md:left-24 top-1/3 flex flex-col"
      >
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-2xl">
          Building scalable <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">infrastructure.</span>
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute right-8 md:right-24 bottom-1/4 flex flex-col text-right"
      >
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-2xl ml-auto">
          Specializing in OpenShift & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">Cloud AI.</span>
        </h2>
      </motion.div>
    </div>
  );
}
