"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/**
 * A section part arriving once, as it scrolls into view: it rises a little and
 * settles. Fires when its top is about 88% of the way down the screen.
 * `from="scale"` is for pictures, which settle from a slight enlargement instead.
 */
type Props = HTMLMotionProps<"div"> & { delay?: number; from?: "rise" | "scale" | "fade" };

const START = {
  rise: { opacity: 0, y: 20 },
  scale: { opacity: 0, scale: 1.06 },
  fade: { opacity: 0 },
};

export default function Reveal({ children, delay = 0, from = "rise", ...rest }: Props) {
  return (
    <motion.div
      data-reveal
      initial={START[from]}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: from === "scale" ? 0.8 : 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
