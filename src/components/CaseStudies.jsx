import { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    badge: 'Real Results · Active Clients',
    title1: 'Numbers that speak',
    title2: 'for themselves',
    subtitle: 'No promises. No demos. Real clients from Romania with measurable results from day one.',
    before: 'Before',
    cta: 'Want to be the next success story?',
    ctaBtn: 'Try Free 14 Days →'
  },
  ro: {
    badge: 'Rezultate Reale · Clienți Activi',
    title1: 'Numere care vorbesc',
    title2: 'de la sine',
    subtitle: 'Nu promisiuni. Nu demo-uri. Clienți reali din România, cu rezultate măsurabile din primele zile.',
    before: 'Înainte',
    cta: 'Vrei să fii următorul caz de succes?',
    ctaBtn: 'Încearcă Gratuit 14 Zile →'
  },
  es: {
    badge: 'Resultados Reales · Clientes Activos',
    title1: 'Números que hablan',
    title2: 'por sí solos',
    subtitle: 'Sin promesas. Sin demos. Clientes reales de Rumania con resultados medibles desde el primer día.',
    before: 'Antes',
    cta: '¿Quieres ser el próximo caso de éxito?',
    ctaBtn: 'Prueba Gratis 14 Días →'
  }
};

const cases = {
  en: [
    {
      id: 1, client: "Simple Smile", industry: "Dental Clinic", location: "Buzău, Romania",
      logo: "🦷", color: "#00D4FF", tag: "Healthcare",
      problem: "We were losing appointments at night and weekends. Nobody answered after 8 PM.",
      solution: "Caty on WhatsApp — responds 24/7, books automatically, confirms patients.",
      metric: "37", metricLabel: "new bookings", timeframe: "in 7 days"
    },
    {
      id: 2, client: "InoTools", industry: "Tools & Equipment", location: "Romania",
      logo: "🔧", color: "#FF6B35", tag: "E-Commerce",
      problem: "Customers asked about products and prices, team couldn't respond fast enough.",
      solution: "Caty on website — product recommendations, lead capture, guides to purchase.",
      metric: "€28.000", metricLabel: "extra sales", timeframe: "first month"
    },
    {
      id: 3, client: "AIU DANCE", industry: "Dance Academy", location: "Bucharest",
      logo: "💃", color: "#E91E63", tag: "Education",
      problem: "People messaged at night to sign up. No response meant they went to competitors.",
      solution: "Caty on website — course info, prices, automatic FREE DEMO scheduling.",
      metric: "30", metricLabel: "new students", timeframe: "first month"
    },
    {
      id: 4, client: "DSGaz", industry: "Gas Installation Services", location: "Romania",
      logo: "🔥", color: "#FFB800", tag: "Services",
      problem: "Customers called for quotes and couldn't find anyone available. Leads were lost.",
      solution: "Caty on WhatsApp — takes requests, qualifies clients, sends leads to team.",
      metric: "5", metricLabel: "new clients", timeframe: "in 8 days"
    }
  ],
  ro: [
    {
      id: 1, client: "Simple Smile", industry: "Clinică Stomatologică", location: "Buzău",
      logo: "🦷", color: "#00D4FF", tag: "Healthcare",
      problem: "Pierdeam programări noaptea și în weekend. Nimeni nu răspundea după ora 20:00.",
      solution: "Caty pe WhatsApp — răspunde 24/7, programează automat, confirmă pacienții.",
      metric: "37", metricLabel: "programări noi", timeframe: "în 7 zile"
    },
    {
      id: 2, client: "InoTools", industry: "Unelte & Echipamente", location: "România",
      logo: "🔧", color: "#FF6B35", tag: "E-Commerce",
      problem: "Clienții întrebau despre produse și prețuri, echipa nu putea răspunde rapid.",
      solution: "Caty pe site — recomandări produse, capturare lead-uri, ghidare spre comandă.",
      metric: "€28.000", metricLabel: "vânzări extra", timeframe: "prima lună"
    },
    {
      id: 3, client: "AIU DANCE", industry: "Academie de Dans", location: "București",
      logo: "💃", color: "#E91E63", tag: "Education",
      problem: "Oamenii scriau seara să se înscrie. Nu primeau răspuns și se duceau la competitori.",
      solution: "Caty pe site — informații cursuri, prețuri, programare DEMO GRATUIT automat.",
      metric: "30", metricLabel: "cursanți noi", timeframe: "prima lună"
    },
    {
      id: 4, client: "DSGaz", industry: "Servicii Instalații", location: "România",
      logo: "🔥", color: "#FFB800", tag: "Services",
      problem: "Clienții sunau pentru oferte și nu găseau pe nimeni disponibil. Lead-urile se pierdeau.",
      solution: "Caty pe WhatsApp — preia solicitările, califică clientul, trimite lead la echipă.",
      metric: "5", metricLabel: "clienți noi", timeframe: "în 8 zile"
    }
  ],
  es: [
    {
      id: 1, client: "Simple Smile", industry: "Clínica Dental", location: "Buzău, Rumania",
      logo: "🦷", color: "#00D4FF", tag: "Salud",
      problem: "Perdíamos citas por la noche y fines de semana. Nadie respondía después de las 20:00.",
      solution: "Caty en WhatsApp — responde 24/7, programa automáticamente, confirma pacientes.",
      metric: "37", metricLabel: "citas nuevas", timeframe: "en 7 días"
    },
    {
      id: 2, client: "InoTools", industry: "Herramientas y Equipos", location: "Rumania",
      logo: "🔧", color: "#FF6B35", tag: "E-Commerce",
      problem: "Los clientes preguntaban por productos y precios, el equipo no podía responder rápido.",
      solution: "Caty en web — recomendaciones, captura de leads, guía hacia la compra.",
      metric: "€28.000", metricLabel: "ventas extra", timeframe: "primer mes"
    },
    {
      id: 3, client: "AIU DANCE", industry: "Academia de Baile", location: "Bucarest",
      logo: "💃", color: "#E91E63", tag: "Educación",
      problem: "La gente escribía de noche para inscribirse. Sin respuesta, iban a la competencia.",
      solution: "Caty en web — info de cursos, precios, programación automática de DEMO GRATIS.",
      metric: "30", metricLabel: "estudiantes nuevos", timeframe: "primer mes"
    },
    {
      id: 4, client: "DSGaz", industry: "Servicios de Instalación", location: "Rumania",
      logo: "🔥", color: "#FFB800", tag: "Servicios",
      problem: "Los clientes llamaban por presupuestos y no encontraban a nadie. Se perdían leads.",
      solution: "Caty en WhatsApp — recibe solicitudes, califica clientes, envía leads al equipo.",
      metric: "5", metricLabel: "clientes nuevos", timeframe: "en 8 días"
    }
  ]
};

function CountUp({ target, isVisible }) {
  const [count, setCount] = useState(0);
  const isEuro = String(target).includes("€");
  const num = parseInt(String(target).replace(/[€.,]/g, ""));

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = num / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, num]);

  return isEuro ? `€${count.toLocaleString("ro-RO")}` : String(count);
}

function Card({ c, index, isVisible, beforeLabel }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? c.color : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20,
        padding: 36,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: isVisible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(40px)",
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${index * 120}ms`,
        boxShadow: hovered ? `0 20px 60px ${c.color}22` : "none",
      }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 12px", borderRadius: 100,
        background: `${c.color}18`, border: `1px solid ${c.color}33`,
        fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
        color: c.color, textTransform: "uppercase", marginBottom: 20,
      }}>
        {c.tag}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: `${c.color}15`, border: `1px solid ${c.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
        }}>
          {c.logo}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            {c.client}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
            {c.industry} · {c.location}
          </div>
        </div>
      </div>

      <div style={{
        padding: "20px 24px", borderRadius: 14,
        background: `${c.color}10`, border: `1px solid ${c.color}20`,
        marginBottom: 24, display: "flex", alignItems: "flex-end", gap: 8,
      }}>
        <span style={{ fontSize: 42, fontWeight: 800, color: c.color, lineHeight: 1, letterSpacing: "-0.02em" }}>
          <CountUp target={c.metric} isVisible={isVisible} />
        </span>
        <div style={{ paddingBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{c.metricLabel}</div>
          <div style={{ fontSize: 11, color: c.color, fontWeight: 500 }}>{c.timeframe}</div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: "rgba(255,100,100,0.8)",
            textTransform: "uppercase", letterSpacing: "0.06em",
            whiteSpace: "nowrap", paddingTop: 1,
          }}>{beforeLabel}</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
            {c.problem}
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: c.color,
            textTransform: "uppercase", letterSpacing: "0.06em",
            whiteSpace: "nowrap", paddingTop: 1,
          }}>Caty</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            {c.solution}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Detect language from localStorage and listen for changes
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const updateLang = () => {
      const stored = localStorage.getItem('caty-lang');
      if (stored && translations[stored]) {
        setLang(stored);
      } else {
        const browserLang = navigator.language?.slice(0, 2);
        if (translations[browserLang]) setLang(browserLang);
      }
    };
    updateLang();
    // Listen for language changes
    const interval = setInterval(updateLang, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const t = translations[lang] || translations.en;
  const caseData = cases[lang] || cases.en;

  return (
    <section ref={ref} id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#080C14" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{
          textAlign: "center", marginBottom: 72,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          opacity: isVisible ? 1 : 0,
          transition: "all 0.7s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 18px", borderRadius: 100,
            background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
            color: "#00D4FF", textTransform: "uppercase", marginBottom: 24,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#00D4FF", display: "inline-block",
              animation: "pulse-dot 2s infinite",
            }} />
            {t.badge}
          </div>

          <h2 style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800,
            color: "#fff", lineHeight: 1.1, margin: "0 0 16px",
          }}>
            {t.title1}<br />
            <span style={{ color: "#00D4FF" }}>{t.title2}</span>
          </h2>

          <p style={{
            fontSize: 16, color: "rgba(255,255,255,0.45)",
            maxWidth: 520, margin: "0 auto", lineHeight: 1.7,
          }}>
            {t.subtitle}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))",
          gap: 24,
        }}>
          {caseData.map((c, i) => (
            <Card key={c.id} c={c} index={i} isVisible={isVisible} beforeLabel={t.before} />
          ))}
        </div>

        <div style={{
          textAlign: "center", marginTop: 64,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.7s ease 0.6s",
        }}>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
            {t.cta}
          </p>
          <a
            href="https://app.catyai.io"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px", borderRadius: 100,
              background: "linear-gradient(135deg, #00D4FF, #0099BB)",
              color: "#000", fontWeight: 700, fontSize: 14,
              textDecoration: "none", letterSpacing: "0.02em",
            }}
          >
            {t.ctaBtn}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
