import { ArrowRight } from "@phosphor-icons/react";

const styles = {
  primary: "button button--primary rounded-[8px] bg-clay text-paper shadow-[0_5px_14px_rgba(24,31,25,0.14)]",
  secondary: "button button--secondary rounded-[8px] bg-paper text-ink shadow-[0_5px_14px_rgba(24,31,25,0.11)]",
  outline: "button button--outline rounded-[8px] border border-paper/60 text-paper",
};

export function SiteButton({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}) {
  const classNames = `${styles[variant] ?? styles.primary} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} weight="regular" />
    </>
  );

  if (href) {
    return <a className={classNames} href={href} onClick={onClick}>{content}</a>;
  }

  return <button className={classNames} type={type} onClick={onClick}>{content}</button>;
}
