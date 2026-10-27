"use client";

import { useEffect } from "react";

/**
 * The page is a run of flat colour chapters. The fixed header has no colour of
 * its own: it takes the ground and ink of whichever chapter is under it, so the
 * bar never reads as a white band across an orange or black field.
 *
 * Each chapter is a section with data-chapter="orange|black|white|paper". The
 * one crossing the header's bottom edge wins; the result goes on <html> as
 * data-ink, and the header's CSS reads it (globals.css).
 */
export default function ChapterInk() {
  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!chapters.length) return;
    const root = document.documentElement;
    const HEADER = 72;
    const pick = () => {
      let current = chapters[0];
      for (const el of chapters) {
        if (el.getBoundingClientRect().top <= HEADER) current = el;
      }
      const chapter = current.dataset.chapter || "white";
      if (root.dataset.ink !== chapter) root.dataset.ink = chapter;
    };
    // At most once a frame: scroll fires faster than the screen can show.
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; pick(); });
    };
    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      delete root.dataset.ink;
    };
  }, []);
  return null;
}
