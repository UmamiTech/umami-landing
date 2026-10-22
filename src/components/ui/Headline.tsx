"use client";

import { motion } from "framer-motion";

/**
 * A heading whose lines rise out of their own baselines, one after another.
 * Each line is real text in the markup, so the words are there for search
 * engines, screen readers and a visitor without script from the first paint.
 *
 * `onLoad` (the hero) runs in pure CSS, so it starts on the first frame without
 * waiting for the page's script to load. Otherwise it plays once when scrolled to.
 */
export default function Headline({
  lines,
  as = "h2",
  className,
  onLoad = false,
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
  onLoad?: boolean;
  delay?: number;
}) {
  const Tag = as;

  if (onLoad) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="line-mask">
            <span className="rise-line block" style={{ animationDelay: `${delay + i * 0.1}s` }}>
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        aria-hidden="true"
      >
        {lines.map((line, i) => (
          <span key={i} className="line-mask">
            <motion.span
              data-reveal
              className="block"
              variants={{
                hidden: { y: "105%" },
                shown: {
                  y: "0%",
                  transition: { duration: 0.9, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
