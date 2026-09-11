import SkyLayer from "./SkyLayer";

export default function Main({ children }) {
  return (
    <main className="home">
      <SkyLayer />
      {children}
    </main>
  );
}
