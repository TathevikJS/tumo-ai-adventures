"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { moods, worlds } from "@/features/create/data";

const initialValues = {
  characterName: "",
  scene: "",
  world: worlds[0],
  pageCount: 8,
  mood: moods[0],
};

export default function Form() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: name === "pageCount" ? Number(value) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams({
      characterName: values.characterName,
      scene: values.scene,
      world: values.world,
      pageCount: String(values.pageCount),
      mood: values.mood,
    });
    router.push(`/book?${params.toString()}`);
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <label className="create-field">
        <span>Character name</span>
        <input
          name="characterName"
          type="text"
          required
          placeholder="Luna the Wanderer"
          value={values.characterName}
          onChange={handleChange}
        />
      </label>

      <label className="create-field">
        <span>Description of the scene</span>
        <textarea
          name="scene"
          required
          rows={4}
          placeholder="A lantern-lit cliff overlooking a castle in the clouds…"
          value={values.scene}
          onChange={handleChange}
        />
      </label>

      <fieldset className="create-field">
        <legend>World</legend>
        <div className="world-chips" role="radiogroup" aria-label="World">
          {worlds.map((world) => {
            const selected = values.world === world;

            return (
              <button
                key={world}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`world-chip${selected ? " is-selected" : ""}`}
                onClick={() => {
                  setValues((current) => ({ ...current, world }));
                }}
              >
                {world}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="create-row">
        <label className="create-field">
          <span>Page count</span>
          <input
            name="pageCount"
            type="number"
            required
            min={3}
            max={20}
            value={values.pageCount}
            onChange={handleChange}
          />
        </label>

        <label className="create-field">
          <span>Mood</span>
          <select name="mood" value={values.mood} onChange={handleChange}>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button className="start-button" type="submit">
        Begin the Story
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
