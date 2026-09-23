import Link from "next/link";

function bookLink(book) {
  const params = new URLSearchParams({
    characterName: book.characterName,
    scene: book.scene,
    world: book.world,
    pageCount: String(book.pageCount),
    mood: book.mood,
  });

  return `/book?${params.toString()}`;
}

export default function Shelf({ books }) {
  return (
    <section className="shelf">
      <div className="shelf__books">
        {books.map((book) => (
          <Link
            key={book.title}
            href={bookLink(book)}
            className="shelf-book"
            style={{ background: book.color }}
          >
            <span className="shelf-book__title">{book.title}</span>
          </Link>
        ))}
      </div>
      <div className="shelf__board" />
    </section>
  );
}
