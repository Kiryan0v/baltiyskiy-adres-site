import { useEffect, useRef, useState } from "react";
import { ArrowRight, CaretLeft, CaretRight, List, Pause, Play, X } from "@phosphor-icons/react";
import { ProcessStep } from "./components/ProcessStep.jsx";
import { SectionLabel } from "./components/SectionLabel.jsx";
import { ServiceRow } from "./components/ServiceRow.jsx";
import { SiteButton } from "./components/SiteButton.jsx";
import { siteConfig } from "./siteConfig.js";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const privacyHref = `${import.meta.env.BASE_URL}privacy/`;

const services = [
  {
    title: "Покупка и продажа жилья",
    description: "От оценки и подбора до оформления и передачи ключей.",
    details: "Разберу вашу задачу, помогу определить рыночную цену или подобрать объект. Проверю историю недвижимости, документы и известные ограничения, объясню обнаруженные риски и организую дальнейшие шаги.",
    points: ["Анализ цены по сопоставимым предложениям", "Подготовка и размещение рекламы для поиска покупателей", "Показы, переговоры и сопровождение сделки", "Подбор вариантов под ваши цели и бюджет"],
  },
  {
    title: "Сложные и дистанционные сделки",
    description: "Обмен, альтернативные цепочки, доли и удалённое оформление.",
    details: "Сопровождаю обмен квартир, покупку долей и комнат, альтернативные продажи и сделки с участием несовершеннолетних собственников. Для клиентов из других регионов организую видео-показы и дистанционный порядок действий, если формат подходит конкретной сделке.",
    points: ["Сопровождение перевода прав и дистанционных сделок", "Проверка состава документов и необходимых согласований", "Координация участников альтернативной сделки", "Планирование просмотров и шагов для иногородних клиентов"],
  },
  {
    title: "Новостройки и приёмка квартиры",
    description: "Подбор, разбор документов и сопровождение до акта приёма-передачи.",
    details: "Подберу новостройки и другие варианты в Калининграде и области по вашим предпочтениям. Помогу разобраться в проектной и технической документации, организую экскурсии и видео-показы. Перед обсуждением уточню действующие скидки и акции у застройщиков.",
    points: ["Сравнение планировок, локаций и условий покупки", "Сопровождение от консультации и просмотра до приёмки", "Проверка замечаний перед подписанием акта приёма-передачи", "Инвестиционные варианты — с разбором рисков и без обещаний доходности"],
  },
  {
    title: "Ипотека и материнский капитал",
    description: "Помощь с документами и разбором подходящих ипотечных программ.",
    details: "Помогу сориентироваться в семейной, IT-, сельской и военной ипотеке, а также в использовании материнского капитала. Проверю доступные на момент обращения варианты рассрочки и ипотечных программ с небольшим первоначальным взносом. Итоговые условия и одобрение определяет банк.",
    points: ["Подготовка документов для обращения в банк", "Сопровождение ипотечной сделки на этапах оформления", "Разбор доступных условий и платежей до подачи заявки"],
  },
  {
    title: "Бесплатная оценка и продажа",
    description: "Оценю объект на выезде и предложу план выхода на рынок.",
    details: "Бесплатно оценю рыночную стоимость недвижимости с выездом на объект. Сопоставлю её с похожими предложениями и объясню факторы, которые влияют на цену и срок продажи. Затем помогу подготовить объект, рекламу и показы для потенциальных покупателей, в том числе тех, кто переезжает в Калининград.",
    points: ["Предварительная проверка документов, истории и известных обременений", "Понятный анализ цены без обещаний точного срока продажи", "Реклама на площадках, где ищут жильё в регионе", "Сопровождение до завершения сделки и передачи ключей"],
  },
];

const properties = [
  { type: "Квартира", title: "Светлая квартира рядом с парком", area: "62 м²", rooms: "2 комнаты", price: "12,4 млн ₽", image: publicAsset("assets/interior.webp"), imageAlt: "Демонстрационное фото светлой гостиной с видом на город", location: "Калининград", url: "" },
  { type: "Дом", title: "Дом с террасой у побережья", area: "128 м²", rooms: "4 комнаты", price: "18,9 млн ₽", image: publicAsset("assets/coastal-home.webp"), imageAlt: "Демонстрационное фото современного дома у моря на закате", location: "Калининградская область", url: "" },
  { type: "Квартира", title: "Квартира с видом на старый город", area: "48 м²", rooms: "1 комната", price: "9,7 млн ₽", image: publicAsset("assets/interior.webp"), imageAlt: "Демонстрационное фото светлой гостиной с видом на город", location: "Калининград", url: "" },
];

const testimonials = [
  { name: "Анна и Михаил", context: "Покупка квартиры", quote: "Юлия помогла спокойно разобраться в районах и сравнить варианты. На каждом этапе мы понимали, что происходит и какие решения нужно принять.", image: publicAsset("assets/interior.webp") },
  { name: "Елена", context: "Покупка дома", quote: "Понравилось внимательное отношение и помощь с документами. Сделка прошла понятно, а после получения ключей мы не остались один на один с вопросами.", image: publicAsset("assets/coastal-home.webp") },
  { name: "Семья К.", context: "Подбор недвижимости", quote: "Сначала было сложно сформулировать запрос. Вместе определили приоритеты и нашли вариант, который подошёл семье и по расположению, и по планировке.", image: publicAsset("assets/coastal-home.webp") },
  { name: "Ирина", context: "Продажа квартиры", quote: "Обсудили план продажи и подготовили квартиру к показам. Я понимала, как идут дела и какие шаги будут дальше.", image: publicAsset("assets/interior.webp") },
  { name: "Александр", context: "Сопровождение сделки", quote: "Получил ответы на вопросы по документам и условиям покупки. Все этапы были объяснены заранее и понятным языком.", image: publicAsset("assets/coastal-home.webp") },
  { name: "Семья М.", context: "Переезд в Калининград", quote: "Помогли сориентироваться в районах и выбрать дом для переезда. Было удобно обсуждать варианты и двигаться по плану.", image: publicAsset("assets/interior.webp") },
];

const process = [
  ["01", "Обсуждаем задачу", "Вы рассказываете о пожеланиях, я уточняю детали и задаю важные вопросы."],
  ["02", "Подбираем варианты", "Анализирую рынок и предлагаю подходящие объекты."],
  ["03", "Проверяем и оформляем", "Проверяем документы, согласовываем условия и готовим сделку."],
  ["04", "Получаем ключи", "Завершаем сделку и передаём вам ключи от новой недвижимости."],
];

const navigation = [
  ["Обо мне", "#about"],
  ["Услуги", "#services"],
  ["Как купить", "#approach"],
  ["Объекты", "#properties"],
  ["Отзывы", "#reviews"],
  ["Контакты", "#contact"],
];

const serviceOptions = services.map(({ title }) => title);

function Brand() {
  return (
    <a className="brand text-paper" href="#top" aria-label={`${siteConfig.name}, наверх`}>
      <span className="brand__name font-display">{siteConfig.brand}</span>
      <span className="brand__caption">Недвижимость в Калининграде</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header flex items-center justify-between px-6 py-4 md:px-[5.2vw] md:py-5">
        <Brand />
        <div className="header-actions flex items-center gap-5">
          <nav className="desktop-nav hidden items-center justify-end gap-3 lg:flex xl:gap-6" aria-label="Основная навигация">
            {navigation.map(([label, href]) => <a className="nav-link" href={href} key={href}>{label}</a>)}
          </nav>
          <button
            ref={menuButton}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="menu-toggle inline-flex rounded-full border border-paper/70 p-3 text-paper transition-colors duration-200 hover:bg-paper hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={20} /> : <List aria-hidden="true" size={20} />}
          </button>
        </div>
      </header>
      <nav
        id="mobile-navigation"
        aria-label="Мобильная навигация"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`mobile-navigation ${menuOpen ? "mobile-navigation--open" : ""}`}
      >
        <div className="mobile-navigation__inner">
          <Brand />
          <button className="mobile-navigation__close" type="button" onClick={closeMenu} aria-label="Закрыть меню">
            <X aria-hidden="true" size={24} />
          </button>
          <div className="mobile-navigation__links">
            {navigation.map(([label, href], index) => (
              <a href={href} key={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                <span className="font-display text-clay">0{index + 1}</span>{label}
              </a>
            ))}
          </div>
          <p className="mobile-navigation__location">{siteConfig.region}</p>
        </div>
      </nav>
    </>
  );
}

function DemoPhotoLabel({ children = "Демонстрационное фото" }) {
  return <span className="demo-photo-label">{children}</span>;
}

function Hero() {
  const updatePointerGlow = (event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    event.currentTarget.classList.add("has-pointer-glow");
  };

  return (
    <section className="hero grid bg-forest text-paper md:grid-cols-2" aria-labelledby="hero-title" onPointerMove={updatePointerGlow} onPointerLeave={(event) => event.currentTarget.classList.remove("has-pointer-glow")}>
      <Header />
      <div className="hero-copy flex flex-col justify-center px-6 pb-12 pt-36 md:px-[4.8vw] md:pb-8 md:pt-24">
        <div className="hero-copy__intro" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-paper/75">
            <span className="eyebrow__dot" aria-hidden="true" />{siteConfig.region}
          </p>
          <p className="hero-name mt-8 text-sm text-paper/90">{siteConfig.name}</p>
          <p className="mt-1 text-xs text-paper/65">{siteConfig.role}</p>
        </div>
        <h1 className="hero-title mt-7 font-display text-[clamp(3.5rem,6.2vw,5.5rem)] leading-[0.98] tracking-[-0.035em]" id="hero-title" data-reveal>
          <span className="whitespace-nowrap">Ваш риелтор</span><br /><span className="whitespace-nowrap">в <em>Калининграде</em></span>
        </h1>
        <div className="hero-copy__bottom mt-8 flex flex-col items-start gap-6" data-reveal>
          <p className="max-w-sm text-sm leading-7 text-paper/80">
            Помогаю купить или продать недвижимость в Калининграде — с понятным планом и сопровождением сделки.
          </p>
          <div className="hero-actions flex flex-wrap items-center gap-3">
            <SiteButton href="#about" variant="secondary">Обо мне</SiteButton>
            <SiteButton href="#contact">Обсудить проект</SiteButton>
          </div>
        </div>
      </div>
      <figure className="hero-image relative min-h-[20rem] overflow-hidden lg:min-h-0">
        <img
          alt="Современный дом у моря в вечернем свете"
          className="hero-image__base h-full w-full object-cover"
          fetchPriority="high"
          src={publicAsset("assets/coastal-home.webp")}
        />
        <span aria-hidden="true" className="hero-wind-layer hero-wind-layer--branches" />
        <span aria-hidden="true" className="hero-wind-layer hero-wind-layer--grass" />
        <figcaption className="hero-image__caption flex justify-between text-paper">
          <span>Дом и побережье</span><DemoPhotoLabel />
        </figcaption>
      </figure>
    </section>
  );
}

function About() {
  return (
    <section className="about-section grid items-center gap-10 bg-paper px-6 py-20 text-ink lg:grid-cols-[1.06fr_1fr] lg:gap-16 lg:pl-[5vw] lg:pr-[5vw] lg:py-28" id="about">
      <figure className="about-image relative overflow-hidden rounded-[2px]" data-reveal>
        <img alt="Светлая гостиная с видом на городские крыши" className="h-full w-full object-cover" loading="lazy" src={publicAsset("assets/interior.webp")} />
        <figcaption className="image-caption"><DemoPhotoLabel /></figcaption>
      </figure>
      <div className="about-copy" data-reveal>
        <SectionLabel>Обо мне</SectionLabel>
        <h2 className="site-heading section-title mt-4 font-display">
          <span className="heading-line"><em>Я рядом</em> на каждом</span><span className="heading-line">этапе сделки</span>
        </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/80">
          Я частный риелтор и веду сделки от первого запроса до получения ключей. Хорошо знаю Калининград и область, работаю с клиентами дистанционно из разных регионов России и помогаю подобрать вариант под ваши задачи и образ жизни.
        </p>
        <ul className="about-highlights mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3 sm:gap-5" aria-label="Как я помогаю">
          <li><span>01</span><strong>Калининград и область</strong></li>
          <li><span>02</span><strong>Подбор под ваш бюджет</strong></li>
          <li><span>03</span><strong>От запроса до ключей</strong></li>
        </ul>
      </div>
    </section>
  );
}

function Services({ onConsult }) {
  const [openService, setOpenService] = useState("01");
  return (
    <section className="services-section bg-paper px-6 py-20 text-ink md:px-[5vw] md:py-28" id="services">
      <div className="services-heading grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
        <div data-reveal>
        <SectionLabel>Услуги</SectionLabel>
          <h2 className="site-heading section-title mt-6 font-display"><span className="heading-line">Чем я могу быть</span><span className="heading-line"><em>полезна</em></span></h2>
        </div>
        <ul className="service-list m-0 list-none border-t border-ink/15 p-0 md:mt-4" aria-label="Услуги">
          {services.map((service, index) => {
            const number = `0${index + 1}`;
            return <ServiceRow data-reveal key={service.title} style={{ "--reveal-delay": `${Math.min(index, 4) * 50}ms` }} number={number} expanded={openService === number} onToggle={() => setOpenService(openService === number ? "" : number)} onConsult={() => onConsult(service.title)} {...service} />;
          })}
        </ul>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach-section bg-sand/45 px-6 py-20 text-ink md:px-[5vw] md:py-28" id="approach">
      <div className="approach-heading">
        <div data-reveal>
          <SectionLabel>Как проходит покупка</SectionLabel>
          <h2 className="site-heading section-title mt-4 font-display"><span className="heading-line">Простой и понятный</span><span className="heading-line"><em>процесс</em></span></h2>
        </div>
      </div>
      <ol className="process-list mt-5 grid list-none grid-cols-1 gap-x-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {process.map(([number, title, description], index) => (
          <ProcessStep data-reveal key={number} style={{ "--reveal-delay": `${index * 50}ms` }} number={number} title={title} description={description} isLast={index === process.length - 1} />
        ))}
      </ol>
    </section>
  );
}

function PropertyCatalog() {
  return (
    <section className="property-section bg-paper px-6 py-20 text-ink md:px-[5vw] md:py-28" id="properties">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
        <div>
          <SectionLabel>Подборка объектов</SectionLabel>
          <h2 className="site-heading section-title mt-4 font-display"><span className="heading-line">Дома и квартиры</span><span className="heading-line"><em>в Калининграде</em></span></h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-ink/70">Демонстрационные карточки. Актуальные объекты и ссылки на подробное описание добавим после получения данных.</p>
      </div>
      <div className="property-grid mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property, index) => {
          const url = siteConfig.propertyLinks?.[index] || property.url;
          return (
            <article className="property-card" key={property.title} data-reveal style={{ "--reveal-delay": `${index * 60}ms` }}>
              <figure className="property-card__image relative overflow-hidden">
                <img src={property.image} alt={property.imageAlt} loading="lazy" />
                <span className="property-card__demo">Демо-объект</span>
                <span className="property-card__type">{property.type}</span>
              </figure>
              <div className="property-card__content">
                <p className="property-card__location">{property.location}</p>
                <h3 className="font-display">{property.title}</h3>
                <p className="property-card__facts">{property.rooms}<span aria-hidden="true">·</span>{property.area}</p>
                <div className="property-card__bottom">
                  <strong>{property.price}</strong>
              <a className="button button--primary property-card__link" href={url || "#contact-form"} {...(url ? { target: "_blank", rel: "noreferrer" } : {})}>Подробнее <ArrowRight aria-hidden="true" size={16} /></a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SellingCTA() {
  return (
    <section className="selling-section grid bg-forest text-paper lg:grid-cols-[1fr_1fr]" id="selling-cta">
      <div className="selling-copy flex flex-col justify-center px-6 py-16 lg:px-[7vw] lg:py-24" data-reveal>
        <SectionLabel light>Бесплатная консультация</SectionLabel>
        <h2 className="site-heading selling-title mt-4 max-w-xl font-display"><span className="heading-line">Планируете <em>продать</em></span><span className="heading-line">квартиру?</span></h2>
        <p className="mt-5 max-w-lg text-sm leading-7 text-paper/80">Обсудим вашу ситуацию, оценим задачу и наметим понятный план продажи — без обязательств.</p>
        <SiteButton href="#contact-form" className="selling-button mt-8 self-start">Записаться на консультацию</SiteButton>
      </div>
      <figure className="selling-image relative min-h-[20rem] overflow-hidden lg:min-h-[32rem]">
        <img src={publicAsset("assets/interior.webp")} alt="Светлая квартира перед продажей" loading="lazy" />
        <figcaption className="hero-image__caption flex justify-end text-paper"><DemoPhotoLabel /></figcaption>
      </figure>
    </section>
  );
}

function Reviews() {
  const carouselRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPaused = pausedByUser || isHovered || isFocused;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(prefersReduced);
    if (prefersReduced) setPausedByUser(true);
  }, []);

  const moveCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.querySelector(".review-card");
    if (!firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const atStart = carousel.scrollLeft <= 4;
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
    const nextLeft = direction < 0 && atStart
      ? carousel.scrollWidth
      : direction > 0 && atEnd
        ? 0
        : carousel.scrollLeft + step * direction;
    if (prefersReducedMotion) carousel.scrollLeft = nextLeft;
    else carousel.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => moveCarousel(1), 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="reviews-section bg-sand/40 px-6 py-20 text-ink md:px-[5vw] md:py-28" id="reviews">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal>
        <div>
          <SectionLabel>Истории клиентов</SectionLabel>
          <h2 className="site-heading section-title mt-4 font-display"><span className="heading-line">Переезд начинается</span><span className="heading-line">с <em>доверия</em></span></h2>
        </div>
        <div className="review-controls" role="group" aria-label="Управление каруселью отзывов">
          <p className="text-xs text-ink/60">Демонстрационные отзывы и фотографии</p>
          <div className="review-controls__buttons">
            <button className="review-control" type="button" aria-label="Предыдущие отзывы" onClick={() => moveCarousel(-1)}><CaretLeft aria-hidden="true" size={20} /></button>
            <button className="review-control review-control--pause" type="button" aria-label={pausedByUser ? "Включить автопрокрутку" : "Остановить автопрокрутку"} aria-pressed={pausedByUser} onClick={() => setPausedByUser((paused) => !paused)}>
              {pausedByUser ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
            </button>
            <button className="review-control" type="button" aria-label="Следующие отзывы" onClick={() => moveCarousel(1)}><CaretRight aria-hidden="true" size={20} /></button>
          </div>
        </div>
      </div>
      <div
        className="review-grid mt-10"
        ref={carouselRef}
        role="region"
        aria-label="Отзывы клиентов, автоматическая карусель"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false); }}
      >
        {testimonials.map((review, index) => (
          <article className="review-card" key={`${review.name}-${index}`} data-reveal style={{ "--reveal-delay": `${index * 60}ms` }} aria-roledescription="слайд" aria-label={`Отзыв ${index + 1} из ${testimonials.length}`}>
            <figure className="review-card__image"><img src={review.image} alt={`Демонстрационное фото жилья: ${review.context.toLowerCase()}`} loading="lazy" /><span>Демо-фото жилья</span></figure>
            <div className="review-card__body">
              <p className="review-card__context">{review.context}</p>
              <blockquote>«{review.quote}»</blockquote>
              <p className="review-card__name">{review.name}</p>
              <span className="review-card__demo">Демонстрационный отзыв</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ selectedService, onServiceChange }) {
  const [formMessage, setFormMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!siteConfig.email) {
      setFormMessage("Добавьте email получателя в настройках сайта, чтобы включить отправку заявок.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Заявка с сайта — консультация риелтора");
    const body = encodeURIComponent(`Имя: ${data.get("name")}\nТелефон: ${data.get("phone")}\nУслуга: ${data.get("service")}\nСогласие на обработку данных отмечено: ${new Date().toLocaleString("ru-RU")}\n\nПрошу связаться со мной.`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setFormMessage("Открылось почтовое приложение с готовой заявкой. Нажмите «Отправить» в нём.");
  };
  return (
    <section className="contact-section bg-forest px-6 py-20 text-paper md:px-[5vw] md:py-28" id="contact">
      <div className="contact-layout mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="contact-copy" data-reveal>
          <SectionLabel light>Контакты</SectionLabel>
          <h2 className="site-heading contact-title mt-4 font-display"><span className="heading-line">Давайте обсудим</span><span className="heading-line"><em>ваш план</em></span></h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-paper/80">Оставьте имя и телефон — я свяжусь с вами, чтобы обсудить следующий шаг.</p>
          {siteConfig.phone ? <SiteButton href={`tel:${siteConfig.phone}`} className="contact-call mt-8">Позвонить мне</SiteButton> : <p className="contact-call mt-8 text-sm text-paper/65">Добавьте телефон в настройки сайта для кнопки звонка.</p>}
        </div>
        <form className="contact-form" id="contact-form" onSubmit={handleSubmit} data-reveal>
          <label htmlFor="contact-name">Ваше имя</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Как к вам обращаться" required />
          <label htmlFor="contact-phone">Телефон</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" required />
          <label htmlFor="contact-service">Какая услуга вас интересует</label>
          <select id="contact-service" name="service" value={selectedService} onChange={(event) => onServiceChange(event.target.value)} required>
            <option value="" disabled>Выберите услугу</option>
            {serviceOptions.map((service) => <option value={service} key={service}>{service}</option>)}
          </select>
          <label className="contact-consent" htmlFor="contact-consent">
            <input id="contact-consent" name="consent" type="checkbox" required />
            <span>Я даю отдельное согласие на обработку имени, телефона и выбранной услуги для ответа на обращение и связи со мной. Ознакомлен(а) с <a href={privacyHref}>Политикой конфиденциальности</a></span>
          </label>
          <button className="button button--primary contact-submit" type="submit">Отправить заявку <ArrowRight aria-hidden="true" size={18} /></button>
          <p className="contact-form__note" aria-live="polite">{formMessage || "После нажатия откроется почтовое приложение с черновиком. Для отправки нажмите «Отправить» в нём."}</p>
        </form>
      </div>
    </section>
  );
}

export function App() {
  const [selectedService, setSelectedService] = useState("");
  useEffect(() => {
    const imageUrl = new URL(publicAsset("assets/coastal-home.webp"), window.location.origin).href;
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", imageUrl);
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.append(ogUrl);
    }
    ogUrl.setAttribute("content", window.location.origin + window.location.pathname);

    if (/^https?:\/\//.test(siteConfig.siteDomain)) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = new URL(window.location.pathname, siteConfig.siteDomain).href;
    }
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -28px 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <main id="top">
        <Hero />
        <About />
        <Services onConsult={setSelectedService} />
        <Approach />
        <PropertyCatalog />
        <SellingCTA />
        <Reviews />
        <Contact selectedService={selectedService} onServiceChange={setSelectedService} />
      </main>
      <footer className="site-footer bg-forest px-6 py-8 text-paper md:px-[5vw]">
        <div className="site-footer__inner mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1"><span className="font-display text-lg">{siteConfig.brand}</span><span className="text-xs text-paper/65">{siteConfig.legalName} · {siteConfig.region}</span></div>
          <nav className="site-footer__links flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Ссылки в подвале">
            <a href={privacyHref}>Политика конфиденциальности</a>
            {siteConfig.phone && <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>}
            {siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
          </nav>
          <span className="text-xs text-paper/55">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
