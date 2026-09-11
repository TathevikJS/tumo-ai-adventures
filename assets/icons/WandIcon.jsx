export default function WandIcon(props) {
  return (
    <svg viewBox="0 0 72 28" aria-hidden="true" {...props}>
      <path d="M6 18 C28 6, 46 8, 62 14" fill="none" stroke="url(#wand)" strokeWidth="2.4" />
      <path d="M62 8l2.4 5.2 5.6.8-4.2 3.8 1 5.6L62 21l-5 2.4 1-5.6-4.2-3.8 5.6-.8z" fill="#d7c8ff" />
      <defs>
        <linearGradient id="wand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9a6ff" />
          <stop offset="1" stopColor="#f3eeff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
