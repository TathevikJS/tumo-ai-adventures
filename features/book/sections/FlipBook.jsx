"use client";

import { useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import { buildPages } from "@/features/book/data";
import BookPage from "@/features/book/sections/BookPage";

export default function FlipBook({ adventure }) {
  const pages = useMemo(() => buildPages(adventure), [adventure]);

  return (
    <section className="book">
      <p className="book__hint">Drag a corner or click the page to turn it.</p>
      <div className="book__stage">
        <HTMLFlipBook
          width={420}
          height={560}
          size="stretch"
          minWidth={280}
          maxWidth={520}
          minHeight={380}
          maxHeight={700}
          showCover
          drawShadow
          flippingTime={900}
          usePortrait
          maxShadowOpacity={0.55}
          mobileScrollSupport
          className="book__flip"
          startZIndex={4}
        >
          {pages.map((page, index) => (
            <BookPage
              key={`${page.kind}-${index}`}
              page={page}
              index={index}
            />
          ))}
        </HTMLFlipBook>
      </div>
    </section>
  );
}
