import { ArrowRight } from "@phosphor-icons/react";

export function ProcessStep({ number, title, description, isLast = false, ...props }) {
  return (
    <li {...props} className="process-step relative flex flex-col border-t border-ink/15 py-2">
      <span className="process-step__number font-display text-3xl text-olive" aria-hidden="true">{number}</span>
      <div>
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <p className="mt-2 max-w-lg text-xs leading-4 text-ink/65">{description}</p>
      </div>
      {!isLast && <ArrowRight aria-hidden="true" className="process-step__arrow text-clay" size={22} weight="regular" />}
    </li>
  );
}
