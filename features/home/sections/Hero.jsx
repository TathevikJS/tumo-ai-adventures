import { WandIcon } from "@/assets/icons";
import StartButton from "./StartButton";

export default function Hero() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">Create · Explore · Imagine</p>
      <h1 className="hero__title">
        Your Next
        <br />
        <span>Adventure</span>
        <br />
        Awaits
        <WandIcon className="hero__wand" />
      </h1>
      <p className="hero__lead">
        Step into a world where your imagination meets the power of AI.
        Create your character, make choices, and see your own story come
        to life!
      </p>
      <StartButton />
    </section>
  );
}
