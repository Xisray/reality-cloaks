/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  useRef,
  type RefObject,
  type ReactNode,
} from "react";

type Language = 'en' | 'ru';

// ─── i18n ───────────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: {
      features: "Features",
      speed: "Speed",
      reviews: "Reviews",
      access: "Get Access",
    },
    hero: {
      badge: "Cloud · Mods · Platform",
      title: ["Run any mod.", "From anywhere."],
      sub: "Cloud Mods streams your modded games directly to your device — no local installs, no hardware limits, just pure play.",
      cta: "Request Access",
      note: "Invite-only beta",
    },
    features: {
      heading: "Why Cloud Mods",
      list: [
        {
          icon: "◈",
          title: "Universal mod support",
          body: "Skyrim, Minecraft, GTA V, Cyberpunk 2077 — 900+ game titles with verified mod libraries updated daily.",
        },
        {
          icon: "⬡",
          title: "Zero local footprint",
          body: "Mods live on our servers. Your device only renders pixels. 4 GB RAM is enough to run 100 GB mod packs.",
        },
        {
          icon: "◉",
          title: "Instant switching",
          body: "Swap mod presets in under 3 seconds. Save unlimited loadouts and share them with a single link.",
        },
        {
          icon: "⬟",
          title: "Private sandboxes",
          body: "Every session runs in an isolated container. Your saves, configs, and mods are yours alone.",
        },
      ],
    },
    speed: {
      heading: "Engineered for latency",
      sub: "We built our own streaming protocol on top of WebRTC — not adapted, built from scratch for interactive workloads.",
      stats: [
        { value: "< 12 ms", label: "Median input lag" },
        { value: "99.97%", label: "Uptime SLA" },
        { value: "4K / 120", label: "Max resolution & fps" },
        { value: "32 Gbps", label: "Edge bandwidth per PoP" },
      ],
      detail:
        "Our 47 edge nodes cover Europe, North America, and Asia-Pacific. Adaptive bitrate streaming adjusts in real time — a dip in your Wi-Fi never drops you from the session.",
    },
    ui: {
      heading: "The interface",
      sub: "Clean enough to disappear when you're playing. Powerful enough to manage 500-mod loadouts.",
      labels: {
        sidebar: "Mod Library",
        main: "Active Session",
        status: "● LIVE · 11 ms",
        fps: "118 fps",
        cpu: "CPU 34%",
        gpu: "GPU 61%",
        search: "Search mods…",
        presets: "My Presets",
        p1: "Survival Overhaul",
        p2: "Graphics Ultra",
        p3: "Roleplay Pack",
        active: "ACTIVE",
      },
    },
    reviews: {
      heading: "What players say",
      list: [
        {
          name: "Marcus T.",
          role: "Modder · 8 years",
          text: "I maintain three Skyrim modlists. Testing them used to take a full day of setup. Now I spin up a clean environment in thirty seconds.",
          stars: 5,
        },
        {
          name: "Priya S.",
          role: "Streamer · Twitch Partner",
          text: "My laptop can barely run vanilla Cyberpunk. Through Cloud Mods I stream a 200-mod playthrough at 4K. My viewers thought I bought a new rig.",
          stars: 5,
        },
        {
          name: "Dmitri V.",
          role: "Casual gamer",
          text: "The latency honestly surprised me. I was ready to feel a delay — there isn't one. It feels local. That's all I needed.",
          stars: 5,
        },
        {
          name: "Yuki N.",
          role: "Speedrunner",
          text: "Frame-perfect inputs matter. 11 ms is real — I checked it with a high-speed camera. Cloud Mods is the only cloud service I trust for runs.",
          stars: 5,
        },
      ],
    },
    modal: {
      title: "Request Access",
      sub: "Enter your invite code to join the beta.",
      email: "Your email",
      code: "Invite code",
      submit: "Verify & Join",
      error:
        "This invite code is not valid. Codes are case-sensitive and single-use.",
      emailError: "Please enter a valid email address.",
      close: "Close",
    },
    footer: {
      tagline: "Cloud Mods — play without limits.",
      links: ["Privacy", "Terms", "Status", "Discord"],
    },
  },
  ru: {
    nav: {
      features: "Возможности",
      speed: "Скорость",
      reviews: "Отзывы",
      access: "Получить доступ",
    },
    hero: {
      badge: "Облачная · Мод · Платформа",
      title: ["Любые моды.", "Отовсюду."],
      sub: "Cloud Mods транслирует ваши игры с модами прямо на устройство — без локальных установок, без ограничений железа, только игра.",
      cta: "Запросить доступ",
      note: "Только по инвайтам",
    },
    features: {
      heading: "Почему Cloud Mods",
      list: [
        {
          icon: "◈",
          title: "Поддержка любых модов",
          body: "Skyrim, Minecraft, GTA V, Cyberpunk 2077 — более 900 игр с проверенными библиотеками модов, обновляемыми ежедневно.",
        },
        {
          icon: "⬡",
          title: "Ноль на вашем диске",
          body: "Моды живут на наших серверах. Ваше устройство только рендерит картинку. 4 ГБ ОЗУ хватит для 100 ГБ мод-паков.",
        },
        {
          icon: "◉",
          title: "Мгновенное переключение",
          body: "Смена мод-пресетов за 3 секунды. Сохраняйте неограниченное число сборок и делитесь ими одной ссылкой.",
        },
        {
          icon: "⬟",
          title: "Приватные песочницы",
          body: "Каждая сессия работает в изолированном контейнере. Ваши сохранения, настройки и моды принадлежат только вам.",
        },
      ],
    },
    speed: {
      heading: "Спроектировано для скорости",
      sub: "Мы разработали собственный стриминговый протокол поверх WebRTC — не адаптировали, а создали с нуля для интерактивных нагрузок.",
      stats: [
        { value: "< 12 мс", label: "Медианная задержка ввода" },
        { value: "99.97%", label: "SLA по доступности" },
        { value: "4K / 120", label: "Макс. разрешение и fps" },
        { value: "32 Гбит/с", label: "Пропускная способность узла" },
      ],
      detail:
        "47 граничных узлов покрывают Европу, Северную Америку и Азиатско-Тихоокеанский регион. Адаптивный битрейт подстраивается в реальном времени — просадка Wi-Fi не прервёт сессию.",
    },
    ui: {
      heading: "Интерфейс",
      sub: "Достаточно чист, чтобы исчезать во время игры. Достаточно мощен, чтобы управлять 500-модовыми сборками.",
      labels: {
        sidebar: "Библиотека модов",
        main: "Активная сессия",
        status: "● В ЭФИРЕ · 11 мс",
        fps: "118 fps",
        cpu: "CPU 34%",
        gpu: "GPU 61%",
        search: "Поиск модов…",
        presets: "Мои пресеты",
        p1: "Survival Overhaul",
        p2: "Graphics Ultra",
        p3: "Roleplay Pack",
        active: "АКТИВЕН",
      },
    },
    reviews: {
      heading: "Что говорят игроки",
      list: [
        {
          name: "Маркус Т.",
          role: "Моддер · 8 лет",
          text: "Я поддерживаю три мод-листа для Skyrim. Раньше тестирование занимало целый день настройки. Теперь я запускаю чистую среду за тридцать секунд.",
          stars: 5,
        },
        {
          name: "Прия С.",
          role: "Стример · Twitch Partner",
          text: "Мой ноутбук едва тянет ваниллу Cyberpunk. Через Cloud Mods я стримлю 200-модовое прохождение в 4K. Зрители думали, что я купила новый ПК.",
          stars: 5,
        },
        {
          name: "Дмитрий В.",
          role: "Обычный геймер",
          text: "Задержка меня честно удивила. Я ожидал почувствовать её — не почувствовал. Ощущение как локальная игра. Этого мне и было достаточно.",
          stars: 5,
        },
        {
          name: "Юки Н.",
          role: "Спидраннер",
          text: "Покадровый ввод важен. 11 мс — это реально, я проверил высокоскоростной камерой. Cloud Mods — единственный облачный сервис, которому я доверяю для ранов.",
          stars: 5,
        },
      ],
    },
    modal: {
      title: "Запросить доступ",
      sub: "Введите инвайт-код для участия в бете.",
      email: "Ваш email",
      code: "Инвайт-код",
      submit: "Проверить и войти",
      error:
        "Этот инвайт-код недействителен. Коды чувствительны к регистру и одноразовые.",
      emailError: "Введите корректный email-адрес.",
      close: "Закрыть",
    },
    footer: {
      tagline: "Cloud Mods — играй без ограничений.",
      links: ["Конфиденциальность", "Условия", "Статус", "Discord"],
    },
  },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625L4.5 7.07 2 4.635l3.455-.505L7 1z"
            fill="#A78BFA"
          />
        </svg>
      ))}
    </span>
  );
}

function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

type Hz = {
  emailError: string;
  error: string;
  title: string;
  sub: string;
  email: string;
  code: string;
  submit: string;
};
// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ t, onClose }: { t: Hz; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const [loading, setLoading] = useState(false);

  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function submit() {
    setEmailErr("");
    setCodeErr("");
    if (!validEmail(email)) {
      setEmailErr(t.emailError);
      return;
    }
    if (!code.trim()) {
      setCodeErr(t.error);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCodeErr(t.error);
    }, 1200);
  }

  useEffect(() => {
    const onKey = (e: any) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{
          background: "linear-gradient(145deg,#16103a,#0d0a24)",
          border: "1px solid rgba(167,139,250,0.25)",
          boxShadow: "0 0 60px rgba(139,92,246,0.25)",
        }}
      >
        {/* glow ring */}
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 rounded-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,#8b5cf6,transparent)",
          }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors text-xl leading-none"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-white mb-1 tracking-tight">
          {t.title}
        </h2>
        <p className="text-white/40 text-sm mb-6">{t.sub}</p>

        <div className="space-y-3">
          {/* email */}
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest block mb-1.5">
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: emailErr
                  ? "1px solid rgba(248,113,113,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
              }}
            />
            {emailErr && (
              <p className="mt-1.5 text-xs text-red-400">{emailErr}</p>
            )}
          </div>

          {/* code */}
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest block mb-1.5">
              {t.code}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="XXXX-XXXX-XXXX"
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition font-mono"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: codeErr
                  ? "1px solid rgba(248,113,113,0.6)"
                  : "1px solid rgba(255,255,255,0.1)",
              }}
            />
            {codeErr && (
              <p className="mt-1.5 text-xs text-red-400 flex items-start gap-1.5">
                <span className="mt-0.5">⚠</span> {codeErr}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-5 w-full rounded-lg py-3 text-sm font-semibold tracking-wide transition-all"
          style={{
            background: loading
              ? "rgba(139,92,246,0.4)"
              : "linear-gradient(135deg,#7c3aed,#a855f7)",
            color: "white",
            boxShadow: loading ? "none" : "0 0 24px rgba(139,92,246,0.4)",
          }}
        >
          {loading ? "···" : t.submit}
        </button>
      </div>
    </div>
  );
}

// ─── App UI mockup ─────────────────────────────────────────────────────────
function AppMockup({ t }: { t: any }) {
  const L = t.ui.labels;
  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(167,139,250,0.2)",
        boxShadow: "0 0 80px rgba(139,92,246,0.2)",
        background: "#0d0b1e",
        fontFamily: "monospace",
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center px-4 py-2.5 gap-2"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#100d26",
        }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#ff5f56" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#ffbd2e" }}
        />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: "#27c93f" }}
        />
        <span className="text-white/20 text-xs ml-2">
          Cloud Mods · Dashboard
        </span>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded-full font-mono"
          style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa" }}
        >
          {L.status}
        </span>
      </div>

      <div className="flex" style={{ minHeight: 320 }}>
        {/* sidebar */}
        <div
          className="shrink-0 w-48 p-3 flex flex-col gap-2"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.06)",
            background: "#0b0920",
          }}
        >
          <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
            {L.sidebar}
          </p>
          <div
            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <span>⌕</span>
            <span>{L.search}</span>
          </div>
          <p className="text-white/20 text-xs mt-2">{L.presets}</p>
          {[L.p1, L.p2, L.p3].map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-2 py-1.5 rounded-md text-xs"
              style={{
                background:
                  i === 0 ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                color: i === 0 ? "#c4b5fd" : "rgba(255,255,255,0.35)",
                border:
                  i === 0
                    ? "1px solid rgba(139,92,246,0.3)"
                    : "1px solid transparent",
              }}
            >
              {name}
              {i === 0 && (
                <span
                  className="text-[9px] px-1 rounded"
                  style={{
                    background: "rgba(139,92,246,0.4)",
                    color: "#e9d5ff",
                  }}
                >
                  {L.active}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* main area */}
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-white/50 text-xs uppercase tracking-widest">
              {L.main}
            </p>
            <div
              className="flex gap-3 text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <span style={{ color: "#86efac" }}>{L.fps}</span>
              <span>{L.cpu}</span>
              <span style={{ color: "#fca5a5" }}>{L.gpu}</span>
            </div>
          </div>

          {/* fake game viewport */}
          <div
            className="flex-1 rounded-xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#1a1035 0%,#0f1a2e 50%,#0a1520 100%)",
              border: "1px solid rgba(255,255,255,0.05)",
              minHeight: 200,
            }}
          >
            {/* fake scene elements */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{
                background: "linear-gradient(0deg,#0d1a0d,transparent)",
              }}
            />
            <div
              className="absolute top-6 left-8 w-24 h-32 rounded-sm opacity-20"
              style={{ background: "linear-gradient(180deg,#4a7c4e,#2d5a31)" }}
            />
            <div
              className="absolute top-10 left-20 w-16 h-28 rounded-sm opacity-15"
              style={{ background: "linear-gradient(180deg,#5a8c5e,#3d6a41)" }}
            />
            <div
              className="absolute bottom-6 right-6 text-xs font-mono"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Survival Overhaul v3.2 · 247 mods active
            </div>
            <div
              className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#4ade80" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const [featRef, featVis] = useInView();
  const [speedRef, speedVis] = useInView();
  const [uiRef, uiVis] = useInView();
  const [revRef, revVis] = useInView();

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "#07051a",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      {/* ── global noise overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* ── nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(7,5,26,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-8">
          <div className="flex items-center gap-2 mr-auto">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              ◈
            </div>
            <span className="font-semibold tracking-tight text-sm">
              Cloud Mods
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
            {Object.values(t.nav)
              .slice(0, 3)
              .map((label, i) => (
                <a
                  key={i}
                  href={`#${["features", "speed", "reviews"][i]}`}
                  className="hover:text-white transition-colors"
                >
                  {label as string}
                </a>
              ))}
          </div>

          <div className="flex items-center gap-3 ml-4">
            {/* lang toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "ru" : "en")}
              className="text-xs text-white/40 hover:text-white/80 transition-colors font-mono tracking-widest"
            >
              {lang === "en" ? "RU" : "EN"}
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="text-xs px-4 py-2 rounded-full font-semibold transition-all hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                boxShadow: "0 0 16px rgba(139,92,246,0.3)",
              }}
            >
              {t.nav.access}
            </button>
          </div>
        </div>
      </nav>

      {/* ── hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* background glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-8 tracking-widest"
            style={{
              border: "1px solid rgba(167,139,250,0.3)",
              background: "rgba(139,92,246,0.08)",
              color: "#a78bfa",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#a78bfa" }}
            />
            {t.hero.badge}
          </div>

          <h1
            className="font-semibold leading-tight mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {t.hero.title.map((line: string, i: number) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg,#c4b5fd,#7c3aed,#a855f7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {line}
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {t.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                boxShadow: "0 0 40px rgba(139,92,246,0.4)",
              }}
            >
              {t.hero.cta}
            </button>
            <span className="text-white/25 text-sm">{t.hero.note}</span>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div
            className="w-px h-12"
            style={{
              background:
                "linear-gradient(180deg,rgba(167,139,250,0.8),transparent)",
            }}
          />
        </div>
      </section>

      {/* ── features ── */}
      <section id="features" className="py-32 px-6" ref={featRef}>
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: "#7c3aed" }}
          >
            {t.features.heading}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {t.features.list.map(
              (
                f: { icon: ReactNode; title: ReactNode; body: ReactNode },
                i: number,
              ) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 transition-all duration-700"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    opacity: featVis ? 1 : 0,
                    transform: featVis ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span
                    className="text-2xl mb-4 block"
                    style={{ color: "#8b5cf6" }}
                  >
                    {f.icon}
                  </span>
                  <h3 className="font-semibold text-sm mb-2 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {f.body}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── speed ── */}
      <section
        id="speed"
        className="py-32 px-6 relative overflow-hidden"
        ref={speedRef}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.07), transparent)",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <p
            className="text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: "#7c3aed" }}
          >
            {t.speed.heading}
          </p>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-16">
            {t.speed.sub}
          </p>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {t.speed.stats.map(
              (s: { value: ReactNode; label: ReactNode }, i: number) => (
                <div
                  key={i}
                  className="p-8 transition-all duration-700"
                  style={{
                    background: "#07051a",
                    opacity: speedVis ? 1 : 0,
                    transform: speedVis ? "none" : "scale(0.96)",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <p
                    className="font-semibold mb-1"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2rem)",
                      background: "linear-gradient(135deg,#fff,#a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-white/35 text-xs leading-relaxed">
                    {s.label}
                  </p>
                </div>
              ),
            )}
          </div>

          <p className="text-white/35 text-sm leading-relaxed mt-10 max-w-2xl">
            {t.speed.detail}
          </p>
        </div>
      </section>

      {/* ── ui mockup ── */}
      <section className="py-32 px-6" ref={uiRef}>
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: "#7c3aed" }}
          >
            {t.ui.heading}
          </p>
          <p className="text-center text-white/40 text-base mb-14 max-w-lg mx-auto">
            {t.ui.sub}
          </p>

          <div
            className="transition-all duration-700"
            style={{
              opacity: uiVis ? 1 : 0,
              transform: uiVis ? "none" : "translateY(40px)",
            }}
          >
            <AppMockup t={t} />
          </div>
        </div>
      </section>

      {/* ── reviews ── */}
      <section id="reviews" className="py-32 px-6" ref={revRef}>
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-xs font-mono uppercase tracking-widest mb-14"
            style={{ color: "#7c3aed" }}
          >
            {t.reviews.heading}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.reviews.list.map(
              (
                r: { stars: number; text: string; name: string; role: string },
                i: number,
              ) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-700"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    opacity: revVis ? 1 : 0,
                    transform: revVis ? "none" : "translateY(20px)",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  <Stars n={r.stars} />
                  <p className="text-white/60 text-sm leading-relaxed flex-1">
                    "{r.text}"
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-white/90">
                      {r.name}
                    </p>
                    <p className="text-xs text-white/30">{r.role}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-24 px-6">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,#1a0e3a,#0f0928)",
            border: "1px solid rgba(139,92,246,0.3)",
            boxShadow: "0 0 80px rgba(139,92,246,0.15)",
          }}
        >
          <div
            className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-1/2"
            style={{
              background:
                "linear-gradient(90deg,transparent,#8b5cf6,transparent)",
            }}
          />
          <h2
            className="font-semibold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {t.hero.title.join(" ")}
          </h2>
          <p className="text-white/40 mb-8">{t.hero.sub}</p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              boxShadow: "0 0 32px rgba(139,92,246,0.4)",
            }}
          >
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* ── footer ── */}
      <footer
        className="py-10 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              ◈
            </div>
            <span className="text-white/30 text-xs">{t.footer.tagline}</span>
          </div>
          <div className="flex items-center gap-6">
            {t.footer.links.map((l: ReactNode, i: number) => (
              <a
                key={i}
                href="#"
                className="text-white/25 text-xs hover:text-white/60 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── modal ── */}
      {modalOpen && <Modal t={t.modal} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
