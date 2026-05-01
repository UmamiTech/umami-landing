"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";

export default function BrandMark() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div
        className="blob"
        style={{
          width: 700,
          height: 700,
          background: "var(--brand)",
          opacity: 0.1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/umami-lockup.svg"
            alt="Umami"
            className="w-full max-w-3xl h-auto"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-sm md:text-base text-muted font-mono uppercase tracking-[0.3em]"
          >
            The operating system for restaurants
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
