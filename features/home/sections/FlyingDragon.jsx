"use client";

import Image from "next/image";

export default function FlyingDragon() {
  return (
    <button type="button" className="sky-dragon" aria-label="Flying dragon">
      <span className="sky-dragon__sprite">
        <Image
          src="/hero-dragon.png"
          alt=""
          width={990}
          height={683}
          sizes="14vw"
          priority
          loading="eager"
          draggable={false}
        />
      </span>
    </button>
  );
}
