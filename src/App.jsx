import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarBlank,
  Check,
  Coins,
  Handshake,
  List,
  MagnifyingGlass,
  Phone,
  TelegramLogo,
  WhatsappLogo,
  ShieldCheck,
  X,
} from "@phosphor-icons/react";
import { siteConfig } from "./siteConfig.js";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const privacyHref = `${import.meta.env.BASE_URL}privacy/`;
const phoneHref = `tel:${siteConfig.phone}`;
const displayPhone = "+7 (4012) 90-55-77";

const advantages = [
  { title: "Глубокое знание", text: "рынка региона" },
  { title: "Персональный", text: "подход к задаче" },
  { title: "Надёжное", text: "сопровождение сделки" },
];

const metrics = [
  { value: 10, suffix: "+ лет", label: "на рынке недвижимости", note: "Калининграда" },
  { value: 200, suffix: "+", label: "успешных сделок", note: "" },
];

const serviceItems = [
  {
    title: "Подбор недвижимости",
    description: "Дома, виллы и квартиры по вашим критериям",
    details: "Подберу объект для жизни, отдыха или инвестиций в Калининграде и на побережье. Сопоставлю локацию, планировку и бюджет, организую просмотры и помогу сравнить варианты.",
    Icon: MagnifyingGlass,
  },
  {
    title: "Продажа объектов",
    description: "Эффективный маркетинг и работа с платежеспособной аудиторией",
    details: "Оценю объект, подготовлю его к показам и размещу предложение на подходящих площадках. Возьму на себя переговоры, сбор документов и сопровождение до завершения сделки.",
    Icon: Handshake,
  },
  {
    title: "Инвестиционные решения",
    description: "Подбор ликвидных объектов с высоким потенциалом",
    details: "Помогу сравнить предложения и разобраться в характеристиках объекта и локации. Учитываю ваши цели и объясняю возможные риски без обещаний доходности.",
    Icon: Coins,
  },
  {
    title: "Полное сопровождение",
    description: "Проверка, сделка, регистрация права собственности",
    details: "Сопровождаю покупку и продажу на всех этапах: от первого обсуждения и просмотра до подписания документов и получения ключей.",
    Icon: ShieldCheck,
  },
];

const listings = [
  {
    type: "Загородная недвижимость",
    title: "Вилла в Светлогорске",
    facts: "Дом 320 м² · участок 12 соток · до моря 500 м",
    price: "₽ 89 000 000",
    image: "property-villa-svetlogorsk.jpg",
    alt: "Современная вилла среди сосен в тёплом вечернем свете",
  },
  {
    type: "Квартира у моря",
    title: "Квартира с видом на море",
    facts: "Калининградский берег · 145 м² · 4 комнаты",
    price: "₽ 36 000 000",
    image: "property-apartment-sea.jpg",
    alt: "Светлая гостиная с панорамным видом на Балтийское море",
  },
  {
    type: "Дом у побережья",
    title: "Дом у Балтийского моря",
    facts: "Янтарный · 240 м² · участок 10 соток · 300 м до пляжа",
    price: "₽ 72 000 000",
    image: "property-baltic-home.jpg",
    alt: "Современный дом на побережье среди сосен и высокой травы",
  },
];

const navigation = [
  ["Обо мне", "#about"],
  ["Услуги", "#services"],
  ["Объекты", "#objects"],
  ["Преимущества", "#benefits"],
  ["Контакты", "#contact"],
];

function AnimatedMetric({ value, suffix }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setCount(value);
      return undefined;
    }
    let frame = 0;
    let observer;
    const start = () => {
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / 1400, 1);
        setCount(Math.round(value * (1 - (1 - progress) ** 4)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer?.disconnect();
    };
    observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) start(); }, { threshold: 0.6 });
    observer.observe(element);
    return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, [value]);

  return <strong ref={elementRef} className="hero__metric" aria-label={`${value}${suffix}`}>{count}{suffix}</strong>;
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label={`${siteConfig.name}, наверх`}>
      <span className="brand__monogram" aria-hidden="true">ЮС</span>
      <span className="brand__copy">
        <span className="brand__name">{siteConfig.name}</span>
        <span className="brand__caption">Риелтор в Калининграде</span>
      </span>
    </a>
  );
}

function GoldButton({ children, href, className = "", type = "button", onClick }) {
  const content = <><span>{children}</span><ArrowRight aria-hidden="true" size={18} weight="regular" /></>;
  const classes = `gold-button ${className}`.trim();
  return href
    ? <a className={classes} href={href} onClick={onClick}>{content}</a>
    : <button className={classes} type={type} onClick={onClick}>{content}</button>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const navigateFromMobileMenu = (event, href) => {
    event.preventDefault();
    closeMenu();
    window.setTimeout(() => {
      const target = document.querySelector(href);
      if (!target) return;
      window.history.pushState(null, "", href);
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }, 280);
  };

  return (
    <>
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="header-contact">
          <a className="header-phone" href={phoneHref}><Phone aria-hidden="true" size={16} />{displayPhone}</a>
          <GoldButton href="#contact">Получить консультацию</GoldButton>
        </div>
        <button
          ref={menuButton}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" size={21} /> : <List aria-hidden="true" size={21} />}
        </button>
      </header>
      <nav
        id="mobile-navigation"
        aria-label="Мобильная навигация"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`mobile-navigation ${menuOpen ? "mobile-navigation--open" : ""}`}
      >
        <div className="mobile-navigation__top"><Brand /><button type="button" onClick={closeMenu} aria-label="Закрыть меню"><X size={24} /></button></div>
        <div className="mobile-navigation__links">
          {navigation.map(([label, href], index) => (
            <a href={href} key={href} onClick={(event) => navigateFromMobileMenu(event, href)} tabIndex={menuOpen ? 0 : -1}>
              <span>0{index + 1}</span>{label}<ArrowRight aria-hidden="true" size={20} />
            </a>
          ))}
        </div>
        <a className="mobile-navigation__phone" href={phoneHref}><Phone aria-hidden="true" size={17} />{displayPhone}</a>
      </nav>
    </>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const lightRef = useRef({ frame: 0, x: 0, y: 0, targetX: 0, targetY: 0, initialized: false });

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = section.getBoundingClientRect().top;
      const offset = Math.max(-46, Math.min(46, -top * 0.12));
      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => {
    if (lightRef.current.frame) cancelAnimationFrame(lightRef.current.frame);
  }, []);

  const setPointerLight = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const hero = event.currentTarget;
    const bounds = hero.getBoundingClientRect();
    const light = lightRef.current;
    light.targetX = event.clientX - bounds.left;
    light.targetY = event.clientY - bounds.top;
    if (!light.initialized) {
      light.x = light.targetX;
      light.y = light.targetY;
      light.initialized = true;
    }
    if (light.frame) return;

    const animateLight = () => {
      light.x += (light.targetX - light.x) * .14;
      light.y += (light.targetY - light.y) * .14;
      hero.style.setProperty("--light-x", `${light.x}px`);
      hero.style.setProperty("--light-y", `${light.y}px`);
      if (Math.abs(light.targetX - light.x) > .5 || Math.abs(light.targetY - light.y) > .5) {
        light.frame = requestAnimationFrame(animateLight);
      } else {
        light.frame = 0;
      }
    };
    light.frame = requestAnimationFrame(animateLight);
  };

  return (
    <section ref={sectionRef} className="hero" id="top" onPointerMove={setPointerLight}>
      <figure className="hero__photo" aria-label="Вилла на Балтийском побережье">
        <img ref={imageRef} src={asset("premium-hero.jpg")} alt="Современная вилла на Балтийском побережье среди сосен на закате" fetchPriority="high" />
      </figure>
      <Header />
      <div className="hero__content page-shell">
        <p className="hero__eyebrow" data-reveal>Премиальная недвижимость<br />в Калининграде и области</p>
        <h1 className="hero__title" data-reveal><span>Недвижимость</span><span>на берегу Балтики</span></h1>
        <p className="hero__description" data-reveal>Подбор, покупка и продажа домов, вилл и квартир<br className="desktop-break" /> для жизни, инвестиций и отдыха</p>
        <GoldButton href="#contact" className="hero__button" >Записаться на консультацию</GoldButton>
      </div>
      <ul className="hero__highlights page-shell" id="benefits" aria-label="Опыта и преимущества">
        {metrics.map((metric) => <li data-reveal key={metric.label}>
          <AnimatedMetric value={metric.value} suffix={metric.suffix} />
          <span>{metric.label}</span>{metric.note && <span>{metric.note}</span>}
        </li>)}
        <li data-reveal><strong>Премиальные объекты</strong><span>города и курортных локаций области</span></li>
        <li data-reveal><strong>Полное сопровождение</strong><span>от подбора до регистрации</span></li>
      </ul>
      <span className="hero__photo-caption">Демонстрационное фото</span>
    </section>
  );
}

function SectionEyebrow({ children }) {
  return <p className="section-eyebrow"><span aria-hidden="true" />{children}</p>;
}

function About() {
  return (
    <section className="about section-shell" id="about">
      <figure className="about__photo" data-reveal>
        <img src={asset("realtor-demo-portrait-wide.jpg")} alt="Демонстрационный портрет Юлии Семиной в спокойном домашнем интерьере" loading="lazy" />
        <figcaption>Демонстрационное фото</figcaption>
      </figure>
      <div className="about__copy" data-reveal>
        <SectionEyebrow>Обо мне</SectionEyebrow>
        <h2 className="about__title">{siteConfig.name}</h2>
        <p className="about__role">Риелтор · Калининград</p>
        <p className="about__text">Помогаю покупать и продавать недвижимость<br className="desktop-break" /> в Калининграде и на побережье, создавая для клиентов<br className="desktop-break" /> комфортные и выгодные условия сделки.</p>
        <ul className="about__advantages">
          {advantages.map((item) => <li key={item.title}><Check aria-hidden="true" size={18} /><span><strong>{item.title}</strong><small>{item.text}</small></span></li>)}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ item, index }) {
  const { Icon } = item;
  return (
    <article className="service-card" data-reveal style={{ "--reveal-delay": `${index * 70}ms` }}>
      <Icon className="service-card__icon" aria-hidden="true" size={34} weight="light" />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}

function Services() {
  return (
    <section className="services section-shell" id="services">
      <div className="services__heading" data-reveal>
        <SectionEyebrow>Мои услуги</SectionEyebrow>
        <h2><span>Комплексные</span><span>решения</span><span><em>с недвижимостью</em></span></h2>
      </div>
      <div className="services__grid">
        {serviceItems.map((item, index) => <ServiceCard item={item} index={index} key={item.title} />)}
      </div>
    </section>
  );
}

function PropertyCard({ item, index }) {
  const externalHref = siteConfig.propertyLinks?.[index];
  const href = externalHref || "#contact";
  return (
    <article className="property-card" data-reveal style={{ "--reveal-delay": `${index * 90}ms` }}>
      <a className="property-card__image" href={href} {...(externalHref ? { target: "_blank", rel: "noreferrer" } : {})} aria-label={`Подробнее: ${item.title}`}>
        <img src={asset(item.image)} alt={item.alt} loading="lazy" />
      </a>
      <div className="property-card__body">
        <h3>{item.title}</h3>
        <p className="property-card__facts">{item.facts}</p>
        <div className="property-card__footer">
          <strong>{item.price}</strong>
          <a className="property-card__more" href={href} {...(externalHref ? { target: "_blank", rel: "noreferrer" } : {})} aria-label={`Подробнее: ${item.title}`}><ArrowRight aria-hidden="true" size={16} /></a>
        </div>
      </div>
    </article>
  );
}

function PropertyGallery() {
  return (
    <section className="properties section-shell" id="objects">
      <div className="properties__heading" data-reveal>
        <SectionEyebrow>Подборка объектов</SectionEyebrow>
      </div>
      <div className="properties__grid">{listings.map((item, index) => <PropertyCard item={item} index={index} key={item.title} />)}</div>
    </section>
  );
}

function Consultation({ onOpenForm }) {
  return (
    <section className="consultation" id="contact">
      <div className="consultation__background" aria-hidden="true"><img src={asset("coast.webp")} alt="" loading="lazy" /></div>
      <div className="consultation__inner page-shell">
        <div className="consultation__copy" data-reveal>
          <h2>Обсудим ваши<br /><em>цели и возможности?</em></h2>
          <p>Запишитесь на личную консультацию — подберём оптимальное решение по покупке, продаже или инвестициям в недвижимость Калининграда и области.</p>
        </div>
        <div className="consultation-action" data-reveal>
          <button className="gold-button consultation-action__button" type="button" onClick={onOpenForm}>
            <CalendarBlank aria-hidden="true" size={18} />
            <span>Записаться на консультацию</span>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
          <div className="consultation-action__links">
            <a href={phoneHref}><Phone aria-hidden="true" size={17} />{displayPhone}</a>
            <a href={`https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label="Написать в WhatsApp"><WhatsappLogo aria-hidden="true" size={18} /></a>
            <a href={siteConfig.telegram || "https://t.me/"} target="_blank" rel="noreferrer" aria-label="Открыть Telegram"><TelegramLogo aria-hidden="true" size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsultationForm({ selectedService, onServiceChange, onClose }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const dialog = document.querySelector('[role="dialog"]');
    document.body.style.overflow = "hidden";
    dialog?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!siteConfig.email) {
      setMessage("Почта для заявок ещё не добавлена. Пока можно позвонить мне напрямую.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Консультация по недвижимости — Балтийский адрес");
    const body = encodeURIComponent(`Имя: ${form.get("name")}\nТелефон: ${form.get("phone")}\nИнтересует: ${form.get("service")}\n\nСогласие на связь отмечено.`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setMessage("Открылось письмо с вашей заявкой. Нажмите «Отправить» в почтовом приложении.");
  };

  return (
    <div className="consultation-dialog" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="consultation-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="consultation-dialog-title" tabIndex={-1}>
        <button className="consultation-dialog__close" type="button" onClick={onClose} aria-label="Закрыть форму"><X aria-hidden="true" size={22} /></button>
        <SectionEyebrow>Бесплатная консультация</SectionEyebrow>
        <h2 className="consultation-dialog__title" id="consultation-dialog-title">Расскажите о вашей задаче</h2>
        <form className="consultation-form" onSubmit={handleSubmit}>
          <label htmlFor="consult-name">Ваше имя</label>
          <input id="consult-name" name="name" autoComplete="name" placeholder="Как к вам обращаться" required />
          <label htmlFor="consult-phone">Ваш телефон</label>
          <input id="consult-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" required />
          <label htmlFor="consult-service">Что вас интересует</label>
          <select id="consult-service" name="service" value={selectedService} onChange={(event) => onServiceChange(event.target.value)} required>
            <option value="" disabled>Выберите услугу</option>
            {serviceItems.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
          </select>
          <label className="consultation-form__consent" htmlFor="consult-consent">
            <input id="consult-consent" name="consent" type="checkbox" required />
            <span>Соглашаюсь на связь по указанным данным и ознакомлен(а) с <a href={privacyHref}>политикой конфиденциальности</a></span>
          </label>
          <button className="gold-button consultation-form__submit" type="submit"><span>Записаться на консультацию</span><ArrowRight aria-hidden="true" size={18} /></button>
          <p className="consultation-form__message" aria-live="polite">{message}</p>
        </form>
      </section>
    </div>
  );
}

export function App() {
  const [selectedService, setSelectedService] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const closeForm = useCallback(() => setFormOpen(false), []);

  useEffect(() => {
    document.title = "Премиальная недвижимость в Калининграде — Юлия Семина";
    const imageUrl = new URL(asset("premium-hero.jpg"), window.location.origin).href;
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", imageUrl);
    const revealItems = [...document.querySelectorAll("[data-reveal]")];
    const revealAll = () => revealItems.forEach((element) => {
      element.classList.remove("reveal-pending");
      element.classList.add("is-visible");
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return undefined;
    }
    if (typeof window.IntersectionObserver !== "function") {
      revealAll();
      return undefined;
    }
    revealItems.forEach((element) => element.classList.add("reveal-pending"));
    const reveal = (element) => {
      element.classList.remove("reveal-pending");
      element.classList.add("is-visible");
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    revealItems.forEach((element) => observer.observe(element));
    const revealVisibleFallback = () => {
      revealItems.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) reveal(element);
      });
    };
    window.requestAnimationFrame(revealVisibleFallback);
    window.addEventListener("scroll", revealVisibleFallback, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealVisibleFallback);
    };
  }, []);

  return (
    <div className="premium-site min-h-screen text-paper font-sans" style={{ "--site-background-image": `url("${asset("property-baltic-home.jpg")}")` }}>
      <main>
        <Hero />
        <About />
        <Services />
        <PropertyGallery />
      <Consultation onOpenForm={() => setFormOpen(true)} />
      {formOpen && <ConsultationForm selectedService={selectedService} onServiceChange={setSelectedService} onClose={closeForm} />}
      </main>
    </div>
  );
}
