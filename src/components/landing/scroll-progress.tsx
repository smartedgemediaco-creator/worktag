"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#C9D7FF] via-[#0A3D91] to-[#C9D7FF] z-[100] origin-left"
      style={{ scaleX: scrollYProgress, opacity: scrollYProgress }}
    />
  );
}
