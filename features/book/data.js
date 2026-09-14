export function toAdventure(params = {}) {
  return {
    characterName: String(params.characterName || ""),
    scene: String(params.scene || ""),
    world: String(params.world || ""),
    pageCount: Number(params.pageCount) || 8,
    mood: String(params.mood || ""),
  };
}

export function buildPages(adventure) {
  const pageCount = Math.max(3, Math.min(20, Number(adventure.pageCount) || 8));
  const name = adventure.characterName || "A young hero";
  const world = adventure.world || "an unknown land";
  const mood = adventure.mood || "Wonder";
  const scene = adventure.scene || "The journey begins at the edge of a glowing cliff.";

  const storyBeats = [
    scene,
    `${name} stepped into ${world}, where the air itself felt ${mood.toLowerCase()}.`,
    `A path opened ahead, as if the world had been waiting for ${name}.`,
    `Strange lights gathered around ${name}, whispering the first secret of the adventure.`,
    `The mood of ${world} grew more ${mood.toLowerCase()} with every step.`,
    `${name} found a sign carved into stone: the story would last ${pageCount} pages.`,
    `Wind carried a promise through ${world}: choices would shape what came next.`,
    `At the heart of the scene, ${name} understood this was only the beginning.`,
  ];

  const pages = [
    {
      kind: "cover",
      title: `The Tale of ${name}`,
      subtitle: world,
      mood,
    },
    {
      kind: "title",
      title: `The Tale of ${name}`,
      world,
      mood,
    },
  ];

  for (let index = 0; index < pageCount; index += 1) {
    pages.push({
      kind: "story",
      number: index + 1,
      text: storyBeats[index % storyBeats.length],
    });
  }

  pages.push({
    kind: "end",
    text: `And so the ${mood.toLowerCase()} days of ${name} in ${world} were only just unfolding.`,
  });

  pages.push({
    kind: "back",
    title: world,
  });

  if (pages.length % 2 !== 0) {
    pages.splice(-1, 0, { kind: "blank" });
  }

  return pages;
}
