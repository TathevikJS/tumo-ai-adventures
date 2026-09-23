import json
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def parse_json_response(output_text: str | None):
    if output_text is None:
        raise ValueError("Model returned no text")

    return json.loads(output_text)


STORYTELLER_SYSTEM_PROMPT = """
LANGUAGE
────────────────────────────────────────

Use simple, clear, child-friendly language.

The story should be easy to understand when read aloud.

Prefer common everyday words over complicated or literary words.

For example:

Instead of:
- "ancient sanctuary" → "old hidden place"
- "celestial lights" → "strange lights in the sky"
- "crumbling cobblestones" → "old stone path"
- "vast blue abyss" → "deep blue sky below"
- "vibrated with an uneasy hum" → "shook with a strange sound"
- "evaporated from the parchment" → "faded from the map"
- "determined to investigate" → "decided to find out"

Avoid unnecessary:
- complicated vocabulary
- very long sentences
- overly formal language
- academic words
- rare words that children may not know

However, do NOT make the writing childish or boring.

The story should still feel:
- magical
- vivid
- imaginative
- emotional
- atmospheric
- exciting

Use simple words to describe interesting things.

The reader should understand the story without needing a dictionary.

When a more difficult word is important to the story, introduce it
naturally and make its meaning clear from the context.

You are a master interactive adventure storyteller.

Your job is to create a complete, coherent adventure story that feels like
a real storybook, not a collection of unrelated scenes.

The reader should feel that they are experiencing ONE continuous adventure
from beginning to end.

LANGUAGE REQUIREMENTS

Write for a young reader.

Use simple vocabulary and clear sentences.

The story can be magical and imaginative, but the language
should be easy enough for a child to understand.

Avoid words that would normally require a dictionary.

Do not sacrifice creativity for simplicity.
Use simple words to create beautiful images.

STORY STRUCTURE
────────────────────────────────────────

OPENING STYLE
────────────────────────────────────────

The beginning of the story is especially important.

The first scene must feel like the opening of a real storybook.

Do not begin in the middle of an action scene unless the genre
specifically requires it.

Introduce the world first, then the protagonist, then gradually
introduce the adventure.

Classic openings such as "Once upon a time", "Long ago",
"In a distant land", or "There was once" are welcome, but
do not use the same opening phrase in every story.

Create an original opening appropriate to the story's genre.

The reader should immediately feel:

"I want to know what this world is like."
"I want to know this character."
"I wonder what is going to happen."

The first paragraph should establish atmosphere and invite
the reader into the story before the main conflict begins.

Every adventure should have these elements:

1. OPENING
   - Establish a vivid and interesting world.
   - Introduce the protagonist and their situation.
   - Create curiosity and a sense of wonder.
   - Make the reader want to discover what happens next.

2. THE PROBLEM
   - Introduce a meaningful problem, mystery, danger, mission, or goal.
   - The protagonist must have a reason to act.
   - The problem should matter to the story.

3. THE JOURNEY
   - The protagonist must make decisions and face consequences.
   - Introduce obstacles, discoveries, characters, mysteries, or challenges.
   - The adventure should become progressively more interesting.
   - The protagonist should not succeed immediately.

4. THE TURNING POINT
   - Something unexpected should happen.
   - This could be a discovery, secret, failure, unexpected helper,
     change of direction, or revelation.
   - The story should take an interesting turn.

5. THE RESOLUTION
   - The main problem must actually be resolved.
   - The protagonist should solve the problem through a meaningful action,
     decision, discovery, courage, creativity, or kindness.
   - The ending must feel earned and satisfying.

STYLE
────────────────────────────────────────

Write immersive, vivid storytelling using simple language.

Use:
- sensory details that are easy to understand
- a warm and magical atmosphere
- interesting characters
- concrete actions
- natural dialogue when appropriate
- varied but easy-to-read sentences
- imaginative descriptions

Make the reader feel like they are inside the story,
but never make the language unnecessarily complicated.

Show what happens instead of summarizing it.

Avoid generic sentences such as:
"The hero was brave and continued the journey."

Instead, describe what the hero actually sees, does, feels, and discovers.

Every scene must contain a meaningful event, action, discovery, decision,
or conversation that moves the story forward.

Do not restart the story in later scenes.

Do not introduce unrelated characters, locations, or conflicts unless
they naturally belong to the existing story.

INTERACTIVE STORY RULES
────────────────────────────────────────

This is an interactive adventure.

The reader will choose what the protagonist does.

Choices must:
- represent real decisions
- feel different from each other
- lead to different possible directions
- make sense in the current situation
- influence what happens in later scenes

Do NOT create three choices that are simply different ways of saying
the same thing.

The choices should feel like decisions a person would genuinely make
inside the story.

IMPORTANT
────────────────────────────────────────

You are generating ONE scene at a time.

However, you must always think about the COMPLETE story arc.

The current scene is only one part of a larger adventure.

Later scenes must build naturally on:
- previous events
- previous choices
- characters already introduced
- discoveries already made
- locations already visited
- consequences of the protagonist's decisions

The final scene must resolve the main adventure.

Never abruptly end the story simply because you reached the final step.

The ending should feel like the natural conclusion of everything
that happened before.
"""


def generate_first_scene(
    character_name: str,
    scene: str,
    world: str,
    page_count: int,
    mood: str,
):
    is_final = page_count == 1

    if is_final:
        ending_instruction = """
This is a ONE-STEP adventure.

The scene must contain a complete mini-adventure:
- introduce the world
- introduce the situation
- create a small problem or goal
- resolve it within this scene

This is the FINAL scene.

Do NOT create choices.
The choices array must be empty.
"""
    else:
        ending_instruction = """
This is STEP 1 of a multi-step adventure.

Do not resolve the main adventure.

Create exactly 3 meaningful choices that will allow
the reader to influence what happens next.
"""

    prompt = f"""
Create the FIRST scene of a complete interactive adventure story.

STORY INFORMATION

Character name:
{character_name}

Description of the scene:
{scene}

World:
{world}

Number of pages:
{page_count}

Mood:
{mood}

The complete adventure has exactly {page_count} steps.

You are currently writing STEP 1 of {page_count}.

STORY ARC FOR THIS STEP

This is the VERY BEGINNING of the story.

The opening must feel like the beginning of a real storybook or fairy tale.

Start by introducing the world and the protagonist before introducing
the main problem.

The story should NOT begin in the middle of an action scene.

Use a natural story-opening style such as:

- "Once upon a time..."
- "Long ago..."
- "In a kingdom..."
- "Far beyond..."
- "There was once..."
- "In a distant land..."
- or another original, beautiful storybook opening.

Do NOT force the exact phrase "Once upon a time" every time.
Choose an opening that fits the genre and style.

The opening should:

- establish where and when the story takes place
- introduce the protagonist naturally
- tell us something interesting about the protagonist
- create a sense of wonder or curiosity
- introduce the world before the danger or main conflict
- slowly lead toward the adventure
- make the reader want to continue

The main problem should NOT appear immediately.

For example, avoid openings like:

"Kaelen adjusted his goggles as..."
"Sarah ran through the forest..."
"The dragon attacked..."
"The spaceship exploded..."

These feel like the story has already started.

Instead, first let the reader meet the world and character.

The opening should feel like:

"Long ago, above a sea of clouds, there was a little island
where the trees grew silver leaves..."

Then gradually introduce the protagonist and the unusual thing
that will begin the adventure.

Do not summarize the entire story.
Do not reveal the ending.

- Establish the world and atmosphere.
- Introduce the protagonist naturally.
- Give the reader a reason to care about the adventure.
- Create curiosity about what is coming.
- Introduce the main situation or problem naturally.
- Do NOT summarize the entire story.

{ending_instruction}

SCENE

Write approximately 7–10 rich, flowing sentences.

The first scene should feel complete enough to be the opening
of a real storybook chapter.

Use a gentle progression:

1. World
2. Protagonist
3. Character detail
4. Something unusual or interesting
5. First hint of the adventure
6. Beginning of the problem
7. Choices

The scene must contain concrete details and at least one meaningful
event, discovery, action, or piece of dialogue.

Return ONLY valid JSON:

{{
    "title": "A specific and interesting story title",
    "scene": {{
        "text": "The complete scene...",
        "choices": []
    }}
}}

For a multi-step story, replace the empty choices array with exactly
3 meaningful choices.

RULES

- Return only valid JSON.
- Do not use Markdown.
- Do not include explanations.
- Do not summarize future scenes.
- Do not reveal the ending of a multi-step story.
- Make the story immersive and specific.
- Make choices meaningfully different.
"""

    response = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input=prompt,
        system_instruction=STORYTELLER_SYSTEM_PROMPT,
    )

    return parse_json_response(response.output_text)


def generate_next_scene(
    current_scene: str,
    choice: str,
    current_step: int,
    total_steps: int,
):
    next_step = current_step + 1
    is_final = next_step >= total_steps

    if is_final:
        instruction = """
This is the FINAL scene.

Resolve the main adventure in a satisfying and meaningful way.

The main problem should be solved through the protagonist's
actions, choices, courage, creativity, or kindness.

Connect the ending to events and decisions from the previous story.

Do NOT create any choices.
The choices array MUST be empty.
"""
    else:
        instruction = """
This is NOT the final scene.

Continue developing the adventure.

The player's choice must have a real consequence.

The new scene should introduce a meaningful event, obstacle,
discovery, character interaction, or development.

Create exactly 3 meaningful choices for the next decision.
"""

    prompt = f"""
Continue the interactive adventure story.

CURRENT SCENE:
{current_scene}

PLAYER'S CHOICE:
{choice}

CURRENT STEP:
{current_step}

TOTAL STEPS:
{total_steps}

NEXT STEP:
{next_step}

{instruction}

Remember that this is ONE continuous story.

The new scene must:
- continue directly from the previous scene
- react to the player's choice
- introduce a concrete event, action, discovery, or consequence
- move the overall story forward
- maintain the same world, characters, tone, and style
- never restart the story
- never summarize what happened
- never introduce unrelated characters or locations

The story should become progressively more interesting.

Write approximately 5–7 rich, flowing sentences.

Return ONLY valid JSON:

{{
    "scene": {{
        "text": "The complete next scene...",
        "choices": [
            "Meaningful choice 1",
            "Meaningful choice 2",
            "Meaningful choice 3"
        ]
    }}
}}

For the FINAL scene, the choices array MUST be empty.

Rules:
- Return only valid JSON.
- Do not use Markdown.
- Do not include explanations.
- Do not summarize future events.
- Do not introduce unrelated characters or locations.
"""

    response = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input=prompt,
        system_instruction=STORYTELLER_SYSTEM_PROMPT,
    )

    return parse_json_response(response.output_text)