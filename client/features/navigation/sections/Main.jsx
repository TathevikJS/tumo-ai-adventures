import SkyLayer from "@/features/navigation/sections/SkyLayer";

export default function Main({ children }) {
  return (
    <main className="home">
      <SkyLayer />
      {children}
    </main>
  );
}
