import Image from "next/image";
import FlyingDragon from "@/features/home/sections/FlyingDragon";

export default function SkyLayer() {
  return (
    <div className="home__scene">
      <div className="home__scene-art">
        <Image
          className="sky-island sky-island--left"
          src="/hero-island-left.png"
          alt=""
          width={632}
          height={972}
          sizes="12vw"
          draggable={false}
        />
        <Image
          className="sky-island sky-island--right"
          src="/hero-island-right.png"
          alt=""
          width={636}
          height={1003}
          sizes="12vw"
          draggable={false}
        />
        <FlyingDragon />
      </div>
    </div>
  );
}
