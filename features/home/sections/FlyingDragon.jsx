"use client";

export default function FlyingDragon() {
  return (
    <button type="button" className="sky-dragon" aria-label="Flying dragon">
      <span className="sky-dragon__sprite">
        <img src="/hero-dragon.png" alt="" draggable={false} />
      </span>
    </button>
  );
}
