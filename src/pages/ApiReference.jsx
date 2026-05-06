import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/answer',
    desc: 'AI-to-AI machine-readable endpoint. Returns structured JSON-LD with business data for AI engines.',
    tag: 'GEO Gateway',
  },
  {
    method: 'GET',
    path: '/llms.txt',
    desc: 'AI truth document served at domain root. Indexed by GPTBot, ClaudeBot, PerplexityBot.',
    tag: 'GEO Gateway',
  },
  {
    method: 'POST',
    path: '/v1/conversation',
    desc: 'Send a message to the AI assistant and receive a response. Supports text, media, and structured payloads.',
    tag: 'Core',
  },
  {
    method: 'GET',
    path: '/v1/conversations',
    desc: 'List all conversations with optional filters: date range, status, channel.',
    tag: 'Core',
  },
  {
    method: 'POST',
    path: '/v1/knowledge',
    desc: 'Upload documents to the AI knowledge base. Accepts PDF, DOCX, TXT, CSV.',
    tag: 'Knowledge',
  },
  {
    method: 'GET',
    path: '/v1/analytics',
    desc: 'Retrieve conversation analytics: volume, resolution rate, peak hours, top intents.',
    tag: 'Analytics',
  },
  {
    method: 'GET',
    path: '/v1/fraud/log',
    desc: 'Retrieve the FraudAI quarantine log. Shows blocked messages with threat classification.',
    tag: 'FraudAI',
  },
  {
    method: 'POST',
    path: '/v1/geo/audit',
    desc: 'Run a GEO score audit on a domain. Returns visibility score across 9 AI crawlers.',
    tag: 'GEO Gateway',
  },
]

const METHOD_COLOR = {
  GET: 'rgba(56,189,248,0.15)',
  POST: 'rgba(134,239,172,0.15)',
  PUT: 'rgba(251,191,36,0.15)',
  DELETE: 'rgba(248,113,113,0.15)',
}
const METHOD_TEXT = { GET: '#7dd3fc', POST: '#86efac', PUT: '#fbbf24', DELETE: '#f87171' }

export default function ApiReference() {
  return (
    <>
      <SEO
        title="API Reference — CatyAI Developer Documentation"
        description="Full API reference for CatyAI. REST endpoints for conversations, knowledge base, GEO Gateway, FraudAI Shield, and analytics."
        canonical="https://catyai.io/api-reference"
      />
      <style>{`
        .api-page { background: #010A1F; min-height: 100vh; }
        .api-hero {
          padding: 8rem 1.5rem 4rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .api-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .api-badge {
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
        .api-hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          color: #f1f5f9;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          position: relative;
        }
        .api-hero-title span { color: #C8A165; }
        .api-hero-sub {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 520px;
          margin: 0 auto 2rem;
          line-height: 1.7;
          position: relative;
        }
        .api-coming {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #64748b;
          font-size: 0.8rem;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          position: relative;
        }
        .api-section {
          max-width: 860px;
          margin: 0 auto;
          padding: 4rem 1.5rem 6rem;
        }
        .api-section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .api-section-sub { color: #64748b; font-size: 0.9rem; margin-bottom: 2rem; }
        .api-endpoints { display: flex; flex-direction: column; gap: 0.75rem; }
        .api-endpoint {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .api-method {
          flex-shrink: 0;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
          margin-top: 0.15rem;
        }
        .api-endpoint-path {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.9rem;
          color: #e2e8f0;
          margin-bottom: 0.25rem;
        }
        .api-endpoint-desc { color: #94a3b8; font-size: 0.85rem; line-height: 1.5; }
        .api-tag {
          margin-left: auto;
          flex-shrink: 0;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C8A165;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          white-space: nowrap;
        }
        .api-auth-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 3rem;
        }
        .api-auth-title { font-weight: 700; color: #f1f5f9; margin-bottom: 0.5rem; font-size: 0.95rem; }
        .api-auth-code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.82rem;
          color: #86efac;
          background: rgba(0,0,0,0.3);
          border-radius: 6px;
          padding: 0.75rem 1rem;
          margin-top: 0.75rem;
          overflow-x: auto;
        }
        .api-note {
          color: #64748b;
          font-size: 0.82rem;
          margin-top: 0.5rem;
        }
      `}</style>
      <div className="api-page">
        <GlobalHeader />
        <section className="api-hero">
          <div className="api-badge">Developer Docs</div>
          <h1 className="api-hero-title">API <span>Reference</span></h1>
          <p className="api-hero-sub">
            REST API for CatyAI's full infrastructure stack — conversations, knowledge base, GEO Gateway, FraudAI Shield, and analytics.
          </p>
          <div className="api-coming">Full interactive docs coming soon · v1.0</div>
        </section>

        <div className="api-section">
          <div className="api-auth-box">
            <div className="api-auth-title">Authentication</div>
            <p className="api-note">All API requests require a Bearer token from your dashboard.</p>
            <div className="api-auth-code">Authorization: Bearer YOUR_API_KEY</div>
            <p className="api-note" style={{ marginTop: '0.5rem' }}>Base URL: <span style={{ color: '#7dd3fc' }}>https://api.catyai.io</span></p>
          </div>

          <h2 className="api-section-title">Endpoints</h2>
          <p className="api-section-sub">Preview of available endpoints. Full SDK documentation with request/response schemas, rate limits, and code examples is in progress.</p>

          <div className="api-endpoints">
            {ENDPOINTS.map((ep) => (
              <div key={ep.path} className="api-endpoint">
                <div
                  className="api-method"
                  style={{ background: METHOD_COLOR[ep.method], color: METHOD_TEXT[ep.method] }}
                >
                  {ep.method}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="api-endpoint-path">{ep.path}</div>
                  <div className="api-endpoint-desc">{ep.desc}</div>
                </div>
                <div className="api-tag">{ep.tag}</div>
              </div>
            ))}
          </div>
        </div>

        <FooterV9 />
      </div>
    </>
  )
}
