import Header from "@/features/navigation/sections/Header";
import Main from "@/features/navigation/sections/Main";

export default function Layout({ children }) {
  return (
    <Main>
      <Header />
      {children}
    </Main>
  );
}
