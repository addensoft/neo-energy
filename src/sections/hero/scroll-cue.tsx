"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { DURATION, EASE_ENGINEERED } from "@/lib/motion-tokens";

/**
 * ScrollCue — the bottom chevron that invites the user onward once the film
 * has settled (Creative Direction §9, 18s+). Fades in alongside the nav.
 */
export function ScrollCue({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: DURATION.slow, ease: EASE_ENGINEERED }}
      className="text-muted pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
      aria-hidden="true"
    >
      <motion.div
        animate={visible ? { y: [0, 8, 0] } : { y: 0 }}
        transition={{ duration: 2.4, repeat: visible ? Infinity : 0, ease: "easeInOut" }}
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}
