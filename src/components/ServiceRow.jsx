import { CaretDown } from "@phosphor-icons/react";
import { SiteButton } from "./SiteButton.jsx";

export function ServiceRow({ number, title, description, details, points = [], expanded, onToggle, onConsult, ...props }) {
  return (
    <li {...props}>
      <button className="service-row grid w-full grid-cols-[40px_minmax(0,1fr)_24px] items-center gap-4 border-b border-ink/15 py-4 text-left md:grid-cols-[44px_minmax(0,1fr)_28px]" type="button" aria-expanded={expanded} aria-controls={`service-details-${number}`} onClick={onToggle}>
        <span className="service-row__number font-display text-olive">{number}</span>
        <span className="service-row__body flex flex-col gap-1">
          <span className="service-row__title font-display text-ink">{title}</span>
          <span className="service-row__description text-ink/65">{description}</span>
        </span>
        <CaretDown aria-hidden="true" className={`service-row__arrow text-olive ${expanded ? "service-row__arrow--open" : ""}`} size={20} weight="regular" />
      </button>
      <div id={`service-details-${number}`} className={`service-details ${expanded ? "service-details--open" : ""}`} aria-hidden={!expanded} inert={!expanded}>
        <div className="service-details__inner">
          <p>{details}</p>
          {points.length > 0 && <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>}
          <SiteButton href="#contact-form" className="service-consult" onClick={onConsult}>Бесплатная консультация</SiteButton>
        </div>
      </div>
    </li>
  );
}
