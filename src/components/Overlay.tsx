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
      {/* Hero Text */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-x-0 bottom-8 md:top-[40%] md:bottom-auto md:-translate-y-[40%] flex flex-col items-center text-center px-4 md:px-8"
      >
        <div className="w-full max-w-3xl rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-xl p-6 md:p-0 md:bg-transparent md:border-transparent md:backdrop-blur-0">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter mb-4 md:mb-6 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
            Lakshay Rewani
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-gray-300 max-w-lg mx-auto font-light tracking-wide">
            Aspiring DevOps Engineer.
          </p>
        </div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="hidden md:absolute md:left-24 md:top-1/3 md:flex md:flex-col md:max-w-[52rem]"
      >
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-2xl">
          Building scalable <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">infrastructure.</span>
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="hidden md:absolute md:right-24 md:bottom-1/4 md:flex md:flex-col md:text-right md:max-w-[52rem]"
      >
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter leading-[1.1] max-w-2xl ml-auto">
          Specializing in OpenShift & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">Cloud AI.</span>
        </h2>
      </motion.div>
    </div>
  );
}
