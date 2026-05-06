import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const PRINCIPLES = [
  {
    n: '01',
    title: 'AI already has your customers\' attention.',
    body: 'ChatGPT, Gemini, and Perplexity answer millions of questions every minute. Businesses that are invisible to these systems are invisible to their customers. We exist to fix that.',
  },
  {
    n: '02',
    title: 'Structure beats content.',
    body: "AI engines don't rank — they cite. The businesses that get cited are the ones that gave AI what it needs to represent them accurately: structured data, verified facts, machine-readable truth.",
  },
  {
    n: '03',
    title: 'The web was built for humans. The AI layer is built for machines.',
    body: 'A website speaks to a visitor. llms.txt, /answer, and JSON-LD speak to AI. Both are necessary. Only one of them is being built right now.',
  },
  {
    n: '04',
    title: 'Visibility is infrastructure.',
    body: 'DNS makes you reachable. HTTPS makes you trusted. GEO Gateway makes you visible to AI. It belongs in the infrastructure stack — not as a plugin, but as a foundational layer.',
  },
  {
    n: '05',
    title: 'Protection is not optional.',
    body: 'Scams, injection attacks, hallucinations — the AI era introduced new threat vectors. FraudAI Shield and SENTINEL are not features. They are the minimum viable defense for any AI-connected business.',
  },
  {
    n: '06',
    title: 'Every business deserves to be heard.',
    body: 'The local clinic, the independent mechanic, the freelance designer — they deserve to be recommended by AI just as much as any Fortune 500. We build for them first.',
  },
]

export default function Manifesto() {
  return (
    <>
      <SEO
        title="Manifesto — CatyAI's Principles for the AI Visibility Era"
        description="CatyAI's founding principles: why AI visibility is infrastructure, why structure beats content, and why every business deserves to be heard by AI engines."
        canonical="https://catyai.io/manifesto"
      />
      <style>{`
        .man-page { background: #010A1F; min-height: 100vh; }
        .man-hero {
          padding: 8rem 1.5rem 5rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .man-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .man-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.25);
          color: #C8A165;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
          position: relative;
        }
        .man-hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          color: #f1f5f9;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .man-hero-title span { color: #C8A165; }
        .man-hero-sub {
          font-size: 1.2rem;
          color: #94a3b8;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.7;
          position: relative;
        }
        .man-body {
          max-width: 720px;
          margin: 0 auto;
          padding: 5rem 1.5rem 7rem;
        }
        .man-principle {
          padding: 3rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .man-principle:last-child { border-bottom: none; }
        .man-n {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: #C8A165;
          margin-bottom: 1rem;
        }
        .man-p-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          color: #f1f5f9;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .man-p-body {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.75;
        }
        .man-sign {
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          text-align: center;
        }
        .man-sign-text {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          color: #64748b;
          letter-spacing: 0.05em;
        }
        .man-sign-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          color: #C8A165;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
      `}</style>
      <div className="man-page">
        <GlobalHeader />
        <section className="man-hero">
          <div className="man-badge">Our Principles</div>
          <h1 className="man-hero-title">The <span>CatyAI</span><br />Manifesto</h1>
          <p className="man-hero-sub">
            Six beliefs about what AI visibility means for every business — and why we're building the infrastructure to make it real.
          </p>
        </section>

        <div className="man-body">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="man-principle">
              <div className="man-n">{p.n}</div>
              <h2 className="man-p-title">{p.title}</h2>
              <p className="man-p-body">{p.body}</p>
            </div>
          ))}

          <div className="man-sign">
            <div className="man-sign-text">Written and maintained by</div>
            <div className="man-sign-name">The CatyAI Team — PayAi-X FZE, Dubai, UAE</div>
          </div>
        </div>

        <FooterV9 />
      </div>
    </>
  )
}
