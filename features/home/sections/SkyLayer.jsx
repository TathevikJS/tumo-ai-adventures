import FlyingDragon from "./FlyingDragon";

export default function SkyLayer() {
  return (
    <div className="home__scene">
      <div className="home__scene-art">
        <img
          className="sky-island sky-island--left"
          src="/hero-island-left.png"
          alt=""
          draggable={false}
        />
        <img
          className="sky-island sky-island--right"
          src="/hero-island-right.png"
          alt=""
          draggable={false}
        />
        <FlyingDragon />
      </div>
    </div>
  );
}
