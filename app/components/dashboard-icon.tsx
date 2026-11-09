export default function Icon({ type = 0 }: { type?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      {type % 3 === 0 ? (
        <path d="M8 15v-3m4 3V8m4 7v-5" />
      ) : type % 3 === 1 ? (
        <path d="m7 14 4-4 3 3 4-6" />
      ) : (
        <path d="M12 7v6m0 3v1" />
      )}
    </svg>
  );
}
