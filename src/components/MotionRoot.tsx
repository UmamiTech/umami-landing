"use client";

import { MotionConfig } from "framer-motion";

/**
 * Every animation on the site respects the visitor's reduced-motion setting:
 * with it on, things arrive in their finished place instead of travelling there.
 */
export default function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
