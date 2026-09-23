"use client";

import { useEffect, useRef, useState } from "react";
import Shelf from "@/features/adventures/sections/Shelf";

const MIN_SHELVES = 3;

function fillShelves(books, perShelf) {
  const needed = Math.ceil(books.length / perShelf) || 1;
  const shelfCount = Math.max(MIN_SHELVES, needed);

  return Array.from({ length: shelfCount }, (_, index) =>
    books.slice(index * perShelf, index * perShelf + perShelf),
  );
}

export default function Bookcase({ books }) {
  const caseRef = useRef(null);
  const [perShelf, setPerShelf] = useState(books.length);

  useEffect(() => {
    const node = caseRef.current;
    if (!node) return;

    function update() {
      const styles = getComputedStyle(node);
      const bookWidth = parseFloat(styles.getPropertyValue("--book-min-width"));
      const gap = parseFloat(styles.getPropertyValue("--shelf-gap"));
      const shelfPad = parseFloat(styles.getPropertyValue("--shelf-pad"));
      const innerWidth =
        node.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight) -
        shelfPad * 2;

      setPerShelf(Math.max(1, Math.floor((innerWidth + gap) / (bookWidth + gap))));
    }

    const observer = new ResizeObserver(update);
    observer.observe(node);
    update();

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={caseRef} className="library__case">
      {fillShelves(books, perShelf).map((shelfBooks, index) => (
        <Shelf key={index} books={shelfBooks} />
      ))}
    </div>
  );
}
