export function SectionLabel({ children, light = false }) {
  return (
    <p className={`section-label flex items-center gap-4 font-display text-clay ${light ? "section-label--light" : ""}`}>
      <span>{children}</span>
    </p>
  );
}
