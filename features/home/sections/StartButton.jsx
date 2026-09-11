"use client";

import { useState } from "react";

export default function StartButton() {
  const [started, setStarted] = useState(false);

  function handleStart() {
    setStarted(true);
  }

  return (
    <button
      type="button"
      className={`start-button${started ? " is-started" : ""}`}
      onClick={handleStart}
    >
      {started ? "Here we go!" : "Start Your Adventure"}
      <span aria-hidden="true">→</span>
    </button>
  );
}
