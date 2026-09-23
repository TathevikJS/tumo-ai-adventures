"use client";

import dynamic from "next/dynamic";

const FlipBook = dynamic(
  () => import("@/features/book/sections/FlipBook"),
  { ssr: false },
);

export default function Page({ adventure }) {
  return <FlipBook adventure={adventure} />;
}
