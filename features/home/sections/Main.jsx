import SkyLayer from "@/features/home/sections/SkyLayer";

export default function Main({ children }) {
  return (
    <main className="home">
      <SkyLayer />
      {children}
    </main>
  );
}
