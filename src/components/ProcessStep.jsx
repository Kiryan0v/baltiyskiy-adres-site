import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

function AnimatedStepNumber({ value }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const numericValue = Number(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setCount(numericValue);
      return undefined;
    }

    let frame = 0;
    let startTime;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const tick = (time) => {
        if (startTime === undefined) startTime = time;
        const progress = Math.min((time - startTime) / 680, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(numericValue * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, { threshold: 0.65 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [numericValue]);

  return <span ref={ref} className="process-step__number font-display text-3xl text-olive" aria-hidden="true">{String(count).padStart(2, "0")}</span>;
}

export function ProcessStep({ number, title, description, isLast = false, ...props }) {
  return (
    <li {...props} className="process-step relative flex flex-col border-t border-ink/15 py-2">
      <AnimatedStepNumber value={number} />
      <div>
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <p className="mt-2 max-w-lg text-xs leading-4 text-ink/65">{description}</p>
      </div>
      {!isLast && <ArrowRight aria-hidden="true" className="process-step__arrow text-clay" size={22} weight="regular" />}
    </li>
  );
}
