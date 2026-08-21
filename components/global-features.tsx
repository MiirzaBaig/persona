"use client";

import ScrollProgressBar from "./scroll-progress-bar";
import BackToTop from "./back-to-top";
import CommandPalette from "./command-palette";

export default function GlobalFeatures() {
  return (
    <>
      <ScrollProgressBar />
      <BackToTop />
      <CommandPalette />
    </>
  );
}
