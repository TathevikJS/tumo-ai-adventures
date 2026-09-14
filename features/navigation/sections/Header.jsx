"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand__spark" aria-hidden="true">
          ✦
        </span>
        AI Adventure World
      </Link>

      <nav className="nav" aria-label="Main">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Home
        </Link>
        <Link
          href="/create"
          aria-current={pathname === "/create" ? "page" : undefined}
        >
          Create
        </Link>
        <Link
          href="/adventures"
          aria-current={pathname === "/adventures" ? "page" : undefined}
        >
          My Adventures
        </Link>
      </nav>
    </header>
  );
}
