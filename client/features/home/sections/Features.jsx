import { features } from "@/features/home/data";

export default function Features() {
  return (
    <section className="features" id="about">
      {features.map((feature) => (
        <article className="feature" key={feature.title}>
          <div className="feature__icon">
            <feature.Icon />
          </div>
          <h2>{feature.title}</h2>
          <p>{feature.text}</p>
        </article>
      ))}
    </section>
  );
}
