import { Home } from "@/features/home";

export default function Page() {
  return (
    <Home.Main>
      <Home.Header />
      <Home.Hero />
      <Home.Features />
      <Home.Tagline />
    </Home.Main>
  );
}
