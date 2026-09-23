import { books } from "@/features/adventures/data";
import Bookcase from "@/features/adventures/sections/Bookcase";

export default function Page() {
  return (
    <section className="library">
      <h1 className="library__title">My Adventures</h1>
      <Bookcase books={books} />
    </section>
  );
}
