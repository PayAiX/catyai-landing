import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const translations = {
  ro: {
    badge: 'Veriga 04 · Trust Gateway',
    h1: 'AI-ul nu poate inventa',
    h1Accent: 'prețul tău.',
    sub: 'Fiecare răspuns comercial e semnat criptografic cu cheia ta și verificabil de oricine, gratuit, chiar acum. Dacă cineva modifică datele, sistemul blochează automat răspunsul. Matematică, nu promisiune.',
    ctaPrimary: 'Verifică o semnătură live',
    ctaSecondary: 'Briefing tehnic (EN)',
    // problem
    problemTag: 'Problema',
    problemH2: 'Când AI-ul greșește prețul tău, cine răspunde?',
    problemLead: 'ChatGPT, Perplexity și Gemini inventă prețuri, reduceri și stocuri cu încredere deplină. Clientul crede răspunsul — și te ții tu de el. Trust Gateway face greșeala imposibilă matematic.',
    stat1N: '0', stat1L: 'răspunsuri nesemnate permise. AI-ul poate spune doar ce ai autorizat tu.',
    stat2N: '100%', stat2L: 'din răspunsuri verificabile public, de oricine, fără cont.',
    stat3N: 'ms', stat3L: 'timpul de revocare a unei chei compromise (JWKS).',
    // how
    howTag: 'Cum funcționează',
    howH2: 'Semnat de tine. Verificat de oricine.',
    how1T: 'Semnezi datele comerciale',
    how1P: 'Prețuri, stoc, politici — toate poartă semnătura ta digitală Ed25519. Tu ești singura sursă de adevăr.',
    how2T: 'AI-ul citează doar ce e semnat',
    how2P: 'Orice răspuns comercial trebuie să poarte semnătura validă. Datele modificate sau inventate sunt blocate automat.',
    how3T: 'Oricine poate verifica',
    how3P: 'Cheia publică e deschisă (JWKS). Un client, un auditor sau un regulator verifică gratuit, fără să ne creadă pe cuvânt.',
    // features
    featTag: 'Capabilități',
    featH2: 'Infrastructură Zero-Trust, fără jargon.',
    f1T: 'Semnătură Ed25519', f1P: 'Standard criptografic modern. Fiecare răspuns comercial e legat criptografic de datele tale.',
    f2T: 'JWKS public', f2P: 'Cheile publice expuse la /.well-known/jwks.json. Verificare independentă, fără autentificare.',
    f3T: 'Revocare în milisecunde', f3P: 'Cheie compromisă? O revoci instant, iar răspunsurile semnate cu ea devin invalide pe loc.',
    f4T: 'Blocare la manipulare', f4P: 'Prompt injection, date modificate, impersonare — sistemul refuză automat orice nu e semnat corect.',
    f5T: 'EU AI Act ready', f5P: 'Trasabilitate și origine verificabilă a datelor — exact ce cer reglementările europene pentru AI comercial.',
    f6T: 'Audit trail complet', f6P: 'Fiecare citare, semnătură și verificare e înregistrată și auditabilă. Nu e nevoie să ne crezi — poți demonstra.',
    // terminal
    termTag: 'Dovada, nu promisiunea',
    termH2: 'Verifici singur, acum.',
    termLead: 'Endpoint-ul JWKS e public și live. Orice dezvoltator, auditor sau client poate confirma independent că un răspuns e autentic.',
    // chain
    chainTag: 'Unde se leagă în lanț',
    chainH2: 'Trust Gateway protejează fiecare verigă.',
    chainLead: 'Widget-ul răspunde cu date semnate, GEO Gateway publică catalog semnat, Marketplace-ul atribuie tranzacții dovedite. Trust e liantul criptografic al întregului lanț.',
    // faq
    faqTag: 'Întrebări frecvente',
    faq1Q: 'Ce înseamnă „semnat criptografic"?',
    faq1A: 'Fiecare răspuns comercial (preț, stoc, politică) primește o semnătură digitală Ed25519 generată cu cheia ta privată. Oricine are cheia ta publică poate confirma matematic că răspunsul vine de la tine și nu a fost modificat.',
    faq2Q: 'De ce e mai bun decât „încredere în platformă"?',
    faq2A: 'Pentru că nu trebuie să ne crezi. Verificarea e independentă și gratuită — un terț poate confirma autenticitatea fără acces la sistemele noastre. E diferența dintre „ți-am promis" și „iate dovada matematică".',
    faq3Q: 'Ce se întâmplă dacă cineva modifică datele?',
    faq3A: 'Semnătura nu se mai potrivește, iar sistemul blochează automat răspunsul. AI-ul nu poate cita date nesemnate sau alterate — le refuză înainte să ajungă la client.',
    faq4Q: 'Am nevoie de cunoștințe tehnice?',
    faq4A: 'Nu. Semnarea și verificarea sunt automate, parte din infrastructura CatyAI. Tu îți administrezi catalogul ca de obicei — noi ne ocupăm de criptografie.',
    faq5Q: 'Cum mă ajută cu EU AI Act?',
    faq5A: 'Reglementarea europeană cere trasabilitate și transparență pentru sistemele AI comerciale. Trust Gateway oferă exact asta: origine verificabilă a datelor, audit trail și dovada că AI-ul nu halucinează.',
    // final cta
    finalH2: 'Vezi dovada, nu promisiunea.',
    finalSub: 'Verifică o semnătură live sau citește briefingul tehnic Zero-Trust.',
    finalCta: 'Verifică o semnătură live',
    // prev/next
    prevLabel: 'Veriga anterioară',
    prevTitle: 'GEO Gateway — devii răspunsul AI-ului',
    nextLabel: 'Capătul lanțului',
    nextTitle: 'Agentic Marketplace — totul se termină în bani',
  },
  en: {
    badge: 'Link 04 · Trust Gateway',
    h1: 'AI cannot invent',
    h1Accent: 'your price.',
    sub: 'Every commercial answer is cryptographically signed with your key and publicly verifiable by anyone, for free, right now. If anyone tampers with the data, the system automatically blocks the answer. Math, not promises.',
    ctaPrimary: 'Verify a live signature',
    ctaSecondary: 'Technical briefing (EN)',
    problemTag: 'The problem',
    problemH2: 'When AI gets your price wrong, who is liable?',
    problemLead: 'ChatGPT, Perplexity and Gemini invent prices, discounts and stock with full confidence. The customer believes the answer — and holds you to it. Trust Gateway makes the error mathematically impossible.',
    stat1N: '0', stat1L: 'unsigned answers allowed. AI can only state what you have authorized.',
    stat2N: '100%', stat2L: 'of answers publicly verifiable, by anyone, no account needed.',
    stat3N: 'ms', stat3L: 'time to revoke a compromised key (JWKS).',
    howTag: 'How it works',
    howH2: 'Signed by you. Verified by anyone.',
    how1T: 'You sign the commercial data',
    how1P: 'Prices, stock, policies — all carry your Ed25519 digital signature. You are the single source of truth.',
    how2T: 'AI cites only what is signed',
    how2P: 'Every commercial answer must carry a valid signature. Tampered or invented data is blocked automatically.',
    how3T: 'Anyone can verify',
    how3P: 'The public key is open (JWKS). A customer, auditor or regulator verifies for free — no need to take our word for it.',
    featTag: 'Capabilities',
    featH2: 'Zero-Trust infrastructure, without the jargon.',
    f1T: 'Ed25519 signature', f1P: 'Modern cryptographic standard. Every commercial answer is cryptographically bound to your data.',
    f2T: 'Public JWKS', f2P: 'Public keys exposed at /.well-known/jwks.json. Independent verification, no authentication needed.',
    f3T: 'Millisecond revocation', f3P: 'Compromised key? Revoke it instantly and every answer signed with it becomes invalid on the spot.',
    f4T: 'Tamper blocking', f4P: 'Prompt injection, altered data, impersonation — the system automatically rejects anything not correctly signed.',
    f5T: 'EU AI Act ready', f5P: 'Traceability and verifiable data provenance — exactly what European AI commerce regulation demands.',
    f6T: 'Full audit trail', f6P: 'Every citation, signature and verification is logged and auditable. No need to trust us — you can prove it.',
    termTag: 'Proof, not promises',
    termH2: 'Verify it yourself, now.',
    termLead: 'The JWKS endpoint is public and live. Any developer, auditor or customer can independently confirm an answer is authentic.',
    chainTag: 'Where it fits in the chain',
    chainH2: 'Trust Gateway protects every link.',
    chainLead: 'The Widget answers with signed data, GEO Gateway publishes a signed catalog, the Marketplace attributes proven transactions. Trust is the cryptographic glue of the entire chain.',
    faqTag: 'Frequently asked questions',
    faq1Q: 'What does "cryptographically signed" mean?',
    faq1A: 'Every commercial answer (price, stock, policy) gets an Ed25519 digital signature generated with your private key. Anyone holding your public key can mathematically confirm the answer comes from you and was not altered.',
    faq2Q: 'Why is this better than "trusting the platform"?',
    faq2A: 'Because you do not have to trust us. Verification is independent and free — a third party can confirm authenticity without any access to our systems. It is the difference between "we promised" and "here is the mathematical proof".',
    faq3Q: 'What happens if someone tampers with the data?',
    faq3A: 'The signature no longer matches, and the system automatically blocks the answer. AI cannot cite unsigned or altered data — it rejects it before it ever reaches the customer.',
    faq4Q: 'Do I need technical skills?',
    faq4A: 'No. Signing and verification are automatic, built into the CatyAI infrastructure. You manage your catalog as usual — we handle the cryptography.',
    faq5Q: 'How does this help with the EU AI Act?',
    faq5A: 'European regulation requires traceability and transparency for commercial AI systems. Trust Gateway provides exactly that: verifiable data provenance, audit trail, and proof that AI does not hallucinate.',
    finalH2: 'See the proof, not the promise.',
    finalSub: 'Verify a live signature or read the Zero-Trust technical briefing.',
    finalCta: 'Verify a live signature',
    prevLabel: 'Previous link',
    prevTitle: 'GEO Gateway — become the AI answer',
    nextLabel: 'End of the chain',
    nextTitle: 'Agentic Marketplace — it all ends in money',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CatyAI Trust Gateway',
  serviceType: 'Cryptographic verification infrastructure',
  description: 'Every commercial answer is cryptographically signed (Ed25519) and publicly verifiable via JWKS. AI cannot invent a price.',
  provider: { '@type': 'Organization', name: 'CatyAI', url: 'https://catyai.io' },
}

export default function TrustGateway() {
  const [lang, setLang] = useState('ro')

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && translations[saved]) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  const t = translations[lang] || translations.ro

  return (
    <>
      <SEO
        title="Trust Gateway — AI nu poate inventa prețul tău | CatyAI"
        description="Fiecare răspuns comercial e semnat criptografic (Ed25519) și verificabil public prin JWKS. Dacă datele sunt modificate, sistemul blochează automat. Matematică, nu promisiune."
        canonical="https://catyai.io/trust-gateway"
        jsonLd={jsonLd}
      />
      <GlobalHeader />
      <style>{`
        .tg-page { background: #010A1F; min-height: 100vh; color: #f1f5f9; font-family: 'Inter', sans-serif; }
        .tg-page * { box-sizing: border-box; }
        .tg-wrap { max-width: 1160px; margin: 0 auto; padding: 0 1.5rem; }

        /* Language switcher */
        .tg-lang { position: fixed; top: 88px; right: 1.25rem; z-index: 30; display: flex; gap: 0.25rem; padding: 0.25rem; background: rgba(1,10,31,0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; backdrop-filter: blur(8px); }
        .tg-lang button { background: transparent; border: none; color: #94a3b8; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.35rem 0.7rem; border-radius: 100px; cursor: pointer; transition: all 0.18s; }
        .tg-lang button.active { background: rgba(200,161,101,0.15); color: #C8A165; }
        .tg-lang button:hover:not(.active) { color: #f1f5f9; }

        /* Hero */
        .tg-hero { padding: 9rem 1.5rem 5rem; text-align: center; background: linear-gradient(180deg, #030D26 0%, #010A1F 100%); position: relative; overflow: hidden; }
        .tg-hero::before { content: ''; position: absolute; top: -300px; left: 50%; transform: translateX(-50%); width: 900px; height: 600px; background: radial-gradient(ellipse, rgba(200,161,101,0.10), transparent 65%); pointer-events: none; }
        .tg-hero-inner { position: relative; max-width: 860px; margin: 0 auto; }
        .tg-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #C8A165; border: 1px solid rgba(200,161,101,0.3); border-radius: 100px; padding: 7px 16px; background: rgba(200,161,101,0.06); }
        .tg-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399; }
        .tg-h1 { font-size: clamp(2.4rem, 5.4vw, 4rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.08; margin-top: 1.75rem; }
        .tg-h1 .gold { color: #C8A165; }
        .tg-sub { color: #94a3b8; font-size: 1.14rem; line-height: 1.65; max-width: 640px; margin: 1.5rem auto 0; }
        .tg-btns { display: flex; gap: 0.9rem; justify-content: center; flex-wrap: wrap; margin-top: 2.25rem; }
        .tg-btn { display: inline-flex; align-items: center; gap: 8px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; padding: 0.95rem 1.75rem; text-decoration: none; transition: transform 0.15s; }
        .tg-btn:hover { transform: translateY(-1px); }
        .tg-btn-primary { background: linear-gradient(135deg, #D4B57A, #C8A165); color: #010A1F; box-shadow: 0 4px 22px rgba(200,161,101,0.28); }
        .tg-btn-ghost { background: transparent; color: #f1f5f9; border: 1px solid rgba(255,255,255,0.14); }

        /* Sections */
        .tg-section { padding: 5.5rem 1.5rem; }
        .tg-section.alt { background: #0A1220; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .tg-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: #C8A165; border: 1px solid rgba(200,161,101,0.25); border-radius: 100px; padding: 6px 15px; margin-bottom: 1.5rem; background: rgba(200,161,101,0.05); }
        .tg-h2 { font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.12; }
        .tg-lead { color: #94a3b8; font-size: 1.05rem; line-height: 1.65; max-width: 640px; margin-top: 1.1rem; }
        .tg-center { text-align: center; }
        .tg-center .tg-lead { margin-left: auto; margin-right: auto; }

        /* Stats */
        .tg-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; margin-top: 3rem; }
        .tg-stat { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.75rem 1.5rem; }
        .tg-stat .n { font-size: 2.1rem; font-weight: 800; letter-spacing: -0.02em; color: #C8A165; }
        .tg-stat .l { color: #94a3b8; font-size: 0.9rem; margin-top: 0.5rem; line-height: 1.5; }

        /* How steps */
        .tg-how { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 3rem; }
        .tg-step { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 2rem 1.75rem; position: relative; }
        .tg-step .sn { position: absolute; top: 1.4rem; right: 1.6rem; font-family: 'JetBrains Mono', monospace; font-size: 2.1rem; font-weight: 700; color: rgba(200,161,101,0.15); }
        .tg-step h3 { font-size: 1.18rem; font-weight: 700; margin-bottom: 0.7rem; }
        .tg-step p { color: #94a3b8; font-size: 0.93rem; line-height: 1.6; }

        /* Feature grid */
        .tg-feats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; margin-top: 3rem; }
        .tg-feat { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.75rem 1.6rem; transition: border-color 0.2s, transform 0.2s; }
        .tg-feat:hover { border-color: rgba(200,161,101,0.3); transform: translateY(-3px); }
        .tg-feat .ic { width: 42px; height: 42px; border-radius: 11px; background: rgba(200,161,101,0.1); border: 1px solid rgba(200,161,101,0.25); display: grid; place-items: center; font-size: 1.2rem; margin-bottom: 1rem; }
        .tg-feat h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
        .tg-feat p { color: #94a3b8; font-size: 0.88rem; line-height: 1.55; }

        /* Terminal */
        .tg-term { background: #05090F; border: 1px solid rgba(200,161,101,0.22); border-radius: 16px; padding: 1.75rem 1.9rem; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; line-height: 1.9; color: #94a3b8; overflow-x: auto; }
        .tg-term .k { color: #C8A165; }
        .tg-term .ok { color: #34d399; }
        .tg-term .cm { color: #5f6c85; }
        .tg-split { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 3rem; align-items: center; }

        /* FAQ */
        .tg-faq { max-width: 780px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .tg-faq details { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 1.4rem 1.6rem; }
        .tg-faq summary { cursor: pointer; font-weight: 700; font-size: 0.98rem; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #e2e8f0; }
        .tg-faq summary::after { content: '+'; color: #C8A165; font-size: 1.4rem; font-weight: 400; }
        .tg-faq details[open] summary::after { content: '–'; }
        .tg-faq details p { color: #94a3b8; font-size: 0.92rem; line-height: 1.6; margin-top: 0.9rem; }

        /* Chain prev/next */
        .tg-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; margin-top: 3rem; }
        .tg-navcard { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.75rem 1.75rem; text-decoration: none; transition: border-color 0.2s, transform 0.2s; display: block; }
        .tg-navcard:hover { border-color: rgba(200,161,101,0.35); transform: translateY(-2px); }
        .tg-navcard .lbl { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: #C8A165; margin-bottom: 0.5rem; }
        .tg-navcard .t { font-size: 1.12rem; font-weight: 700; color: #f1f5f9; }
        .tg-navcard.next { border-color: rgba(200,161,101,0.28); background: linear-gradient(135deg, rgba(200,161,101,0.10), rgba(200,161,101,0.02)); }

        /* Final CTA */
        .tg-final { background: linear-gradient(135deg, rgba(200,161,101,0.10), rgba(200,161,101,0.02)); border: 1px solid rgba(200,161,101,0.25); border-radius: 24px; padding: 4rem 2.5rem; text-align: center; }
        .tg-final h2 { font-size: clamp(1.8rem, 3.6vw, 2.5rem); font-weight: 800; }
        .tg-final p { color: #94a3b8; margin: 1rem auto 2rem; max-width: 480px; }

        @media (max-width: 980px) {
          .tg-stats, .tg-how, .tg-feats { grid-template-columns: 1fr; }
          .tg-split, .tg-nav { grid-template-columns: 1fr; }
          .tg-section { padding: 4rem 1.5rem; }
        }
      `}</style>

      <div className="tg-page">
        {/* Language switcher */}
        <div className="tg-lang">
          {['ro', 'en'].map((l) => (
            <button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* HERO */}
        <section className="tg-hero">
          <div className="tg-hero-inner">
            <div className="tg-eyebrow"><span className="dot"></span>{t.badge}</div>
            <h1 className="tg-h1">{t.h1} <span className="gold">{t.h1Accent}</span></h1>
            <p className="tg-sub">{t.sub}</p>
            <div className="tg-btns">
              <a href="https://api.catyai.io/.well-known/jwks.json" target="_blank" rel="noopener noreferrer" className="tg-btn tg-btn-primary">{t.ctaPrimary} ↗</a>
              <Link to="/research/zero-trust-ai-ads-en" className="tg-btn tg-btn-ghost">{t.ctaSecondary}</Link>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="tg-section">
          <div className="tg-wrap">
            <span className="tg-tag">{t.problemTag}</span>
            <h2 className="tg-h2">{t.problemH2}</h2>
            <p className="tg-lead">{t.problemLead}</p>
            <div className="tg-stats">
              <div className="tg-stat"><div className="n">{t.stat1N}</div><div className="l">{t.stat1L}</div></div>
              <div className="tg-stat"><div className="n">{t.stat2N}</div><div className="l">{t.stat2L}</div></div>
              <div className="tg-stat"><div className="n">{t.stat3N}</div><div className="l">{t.stat3L}</div></div>
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className="tg-section alt">
          <div className="tg-wrap tg-center">
            <span className="tg-tag">{t.howTag}</span>
            <h2 className="tg-h2">{t.howH2}</h2>
            <div className="tg-how" style={{ textAlign: 'left' }}>
              <div className="tg-step"><div className="sn">01</div><h3>{t.how1T}</h3><p>{t.how1P}</p></div>
              <div className="tg-step"><div className="sn">02</div><h3>{t.how2T}</h3><p>{t.how2P}</p></div>
              <div className="tg-step"><div className="sn">03</div><h3>{t.how3T}</h3><p>{t.how3P}</p></div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="tg-section">
          <div className="tg-wrap tg-center">
            <span className="tg-tag">{t.featTag}</span>
            <h2 className="tg-h2">{t.featH2}</h2>
            <div className="tg-feats" style={{ textAlign: 'left' }}>
              <div className="tg-feat"><div className="ic">🔏</div><h3>{t.f1T}</h3><p>{t.f1P}</p></div>
              <div className="tg-feat"><div className="ic">🔑</div><h3>{t.f2T}</h3><p>{t.f2P}</p></div>
              <div className="tg-feat"><div className="ic">⚡</div><h3>{t.f3T}</h3><p>{t.f3P}</p></div>
              <div className="tg-feat"><div className="ic">🛡️</div><h3>{t.f4T}</h3><p>{t.f4P}</p></div>
              <div className="tg-feat"><div className="ic">⚖️</div><h3>{t.f5T}</h3><p>{t.f5P}</p></div>
              <div className="tg-feat"><div className="ic">📋</div><h3>{t.f6T}</h3><p>{t.f6P}</p></div>
            </div>
          </div>
        </section>

        {/* TERMINAL / PROOF */}
        <section className="tg-section alt">
          <div className="tg-wrap">
            <div className="tg-split">
              <div>
                <span className="tg-tag">{t.termTag}</span>
                <h2 className="tg-h2">{t.termH2}</h2>
                <p className="tg-lead">{t.termLead}</p>
              </div>
              <div className="tg-term">
<span className="cm"># GET /.well-known/jwks.json — public, no auth</span><br />
{'{'}<br />
&nbsp;&nbsp;<span className="k">"keys"</span>: [{'{'}<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="k">"kty"</span>: <span className="ok">"OKP"</span>, <span className="k">"crv"</span>: <span className="ok">"Ed25519"</span>,<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="k">"kid"</span>: <span className="ok">"catyai-akl-v2-2026"</span>,<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="k">"use"</span>: <span className="ok">"sig"</span><br />
&nbsp;&nbsp;{'}'}]{'}'}<br /><br />
<span className="cm"># Any commercial answer:</span><br />
<span className="k">signature</span> ......... <span className="ok">valid ✓</span><br />
<span className="k">record_exists</span> ..... <span className="ok">yes ✓</span><br />
<span className="k">temporal_valid</span> .... <span className="ok">yes ✓</span><br />
<span className="k">jurisdiction</span> ...... <span className="ok">EU · GDPR ✓</span>
              </div>
            </div>
          </div>
        </section>

        {/* CHAIN FIT */}
        <section className="tg-section">
          <div className="tg-wrap tg-center">
            <span className="tg-tag">{t.chainTag}</span>
            <h2 className="tg-h2">{t.chainH2}</h2>
            <p className="tg-lead">{t.chainLead}</p>
            <div className="tg-nav" style={{ textAlign: 'left' }}>
              <Link to="/geo-gateway" className="tg-navcard">
                <div className="lbl">{t.prevLabel}</div>
                <div className="t">{t.prevTitle} →</div>
              </Link>
              <Link to="/marketplace" className="tg-navcard next">
                <div className="lbl">{t.nextLabel}</div>
                <div className="t">{t.nextTitle} →</div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="tg-section alt">
          <div className="tg-wrap tg-center">
            <span className="tg-tag">{t.faqTag}</span>
            <div className="tg-faq" style={{ textAlign: 'left' }}>
              <details><summary>{t.faq1Q}</summary><p>{t.faq1A}</p></details>
              <details><summary>{t.faq2Q}</summary><p>{t.faq2A}</p></details>
              <details><summary>{t.faq3Q}</summary><p>{t.faq3A}</p></details>
              <details><summary>{t.faq4Q}</summary><p>{t.faq4A}</p></details>
              <details><summary>{t.faq5Q}</summary><p>{t.faq5A}</p></details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="tg-section">
          <div className="tg-wrap">
            <div className="tg-final">
              <h2>{t.finalH2}</h2>
              <p>{t.finalSub}</p>
              <a href="https://api.catyai.io/.well-known/jwks.json" target="_blank" rel="noopener noreferrer" className="tg-btn tg-btn-primary">{t.finalCta} ↗</a>
            </div>
          </div>
        </section>
      </div>
      <FooterV9 />
    </>
  )
}
