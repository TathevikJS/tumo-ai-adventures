import Link from "next/link";

export default function StartButton() {
  return (
    <Link href="/create" className="start-button">
      Start Your Adventure
      <span aria-hidden="true">→</span>
    </Link>
  );
}
