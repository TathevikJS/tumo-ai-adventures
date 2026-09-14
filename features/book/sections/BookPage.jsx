import { forwardRef } from "react";

const BookPage = forwardRef(function BookPage({ page, index }, ref) {
  const isCover = page.kind === "cover" || page.kind === "back";
  const isLeft = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`book-page book-page--${page.kind}`}
      data-density={isCover ? "hard" : "soft"}
    >
      {page.kind === "cover" ? (
        <div className="book-page__cover">
          <p className="book-page__eyebrow">An AI Adventure</p>
          <h2>{page.title}</h2>
          <p>{page.subtitle}</p>
          <span>{page.mood}</span>
        </div>
      ) : null}

      {page.kind === "title" ? (
        <div className="book-page__inner">
          <p className="book-page__eyebrow">Chapter One</p>
          <h3>{page.title}</h3>
          <p>
            Set in {page.world}, told in a {page.mood.toLowerCase()} voice.
          </p>
        </div>
      ) : null}

      {page.kind === "story" ? (
        <div className="book-page__inner">
          <p>{page.text}</p>
        </div>
      ) : null}

      {page.kind === "end" ? (
        <div className="book-page__inner">
          <p className="book-page__eyebrow">The first ending</p>
          <p>{page.text}</p>
        </div>
      ) : null}

      {page.kind === "back" ? (
        <div className="book-page__cover book-page__cover--back">
          <p>{page.title}</p>
        </div>
      ) : null}

      {isCover ? null : (
        <span
          className={`book-page__folio book-page__folio--${isLeft ? "left" : "right"}`}
        >
          {index}
        </span>
      )}
    </div>
  );
});

export default BookPage;
