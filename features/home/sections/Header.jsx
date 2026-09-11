import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand__spark" aria-hidden="true">
          ✦
        </span>
        AI Adventure World
      </Link>

      <nav className="nav" aria-label="Main">
        <Link href="/" aria-current="page">
          Home
        </Link>
        <Link href="#adventures">My Adventures</Link>
        <Link href="#about">About</Link>
      </nav>
    </header>
  );
}
