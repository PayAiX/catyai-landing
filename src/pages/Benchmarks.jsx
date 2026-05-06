import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const METRICS = [
  { label: 'AI Session Response Time', value: '< 300ms', desc: 'p95 latency across all AI integrations', icon: '⚡' },
  { label: 'FraudAI Detection Accuracy', value: '99.2%', desc: 'Across 8 detection modules, live traffic', icon: '🛡️' },
  { label: 'GEO Audit Completion', value: '< 4s', desc: 'Full 9-crawler GEO score in under 4 seconds', icon: '🔍' },
  { label: 'llms.txt Serve Time', value: '< 50ms', desc: 'CDN-edge served, globally distributed', icon: '📄' },
  { label: 'Schema.org Injection', value: '< 10ms', desc: 'Dynamic injection at request time', icon: '🏗️' },
  { label: 'Uptime (30-day rolling)', value: '99.97%', desc: 'Across all API endpoints', icon: '📡' },
]

const CRAWLERS = [
  { name: 'GPTBot', company: 'OpenAI', supported: true },
  { name: 'GoogleBot AI', company: 'Google', supported: true },
  { name: 'ClaudeBot', company: 'Anthropic', supported: true },
  { name: 'PerplexityBot', company: 'Perplexity AI', supported: true },
  { name: 'Applebot', company: 'Apple', supported: true },
  { name: 'YouBot', company: 'You.com', supported: true },
  { name: 'BingBot AI', company: 'Microsoft', supported: true },
  { name: 'Cohere AI', company: 'Cohere', supported: true },
  { name: 'Meta AI', company: 'Meta', supported: true },
]

export default function Benchmarks() {
  return (
    <>
      <SEO
        title="Benchmarks — CatyAI Performance Metrics"
        description="CatyAI performance benchmarks: response times, detection accuracy, uptime, and AI crawler coverage across the full infrastructure stack."
        canonical="https://catyai.io/benchmarks"
      />
      <style>{`
        .bench-page { background: #010A1F; min-height: 100vh; }
        .bench-hero {
          padding: 8rem 1.5rem 5rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .bench-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .bench-badge {
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
        .bench-hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          color: #f1f5f9;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          position: relative;
        }
        .bench-hero-title span { color: #C8A165; }
        .bench-hero-sub {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
          position: relative;
        }
        .bench-section {
          max-width: 920px;
          margin: 0 auto;
          padding: 4rem 1.5rem 2rem;
        }
        .bench-section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .bench-section-sub { color: #64748b; font-size: 0.9rem; margin-bottom: 2rem; }
        .bench-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 5rem;
        }
        @media (max-width: 700px) { .bench-metrics { grid-template-columns: 1fr; } }
        @media (min-width: 701px) and (max-width: 950px) { .bench-metrics { grid-template-columns: repeat(2, 1fr); } }
        .bench-metric {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .bench-metric-icon { font-size: 1.5rem; margin-bottom: 1rem; }
        .bench-metric-value {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          color: #C8A165;
          line-height: 1;
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }
        .bench-metric-label { font-weight: 600; color: #f1f5f9; font-size: 0.9rem; margin-bottom: 0.3rem; }
        .bench-metric-desc { color: #64748b; font-size: 0.8rem; line-height: 1.4; }
        .bench-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 5rem;
        }
        .bench-table th {
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .bench-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: #94a3b8;
          font-size: 0.9rem;
        }
        .bench-table td:first-child { color: #f1f5f9; font-weight: 500; }
        .bench-check { color: #86efac; font-size: 1rem; }
        .bench-note {
          padding: 0 1.5rem 5rem;
          text-align: center;
          color: #64748b;
          font-size: 0.82rem;
          max-width: 520px;
          margin: 0 auto;
        }
      `}</style>
      <div className="bench-page">
        <GlobalHeader />
        <section className="bench-hero">
          <div className="bench-badge">Performance Data</div>
          <h1 className="bench-hero-title">Infrastructure <span>Benchmarks</span></h1>
          <p className="bench-hero-sub">
            Real performance numbers across CatyAI's full stack — measured on live production traffic.
          </p>
        </section>

        <div className="bench-section">
          <h2 className="bench-section-title">Performance Metrics</h2>
          <p className="bench-section-sub">30-day rolling averages, updated weekly.</p>
          <div className="bench-metrics">
            {METRICS.map((m) => (
              <div key={m.label} className="bench-metric">
                <div className="bench-metric-icon">{m.icon}</div>
                <div className="bench-metric-value">{m.value}</div>
                <div className="bench-metric-label">{m.label}</div>
                <div className="bench-metric-desc">{m.desc}</div>
              </div>
            ))}
          </div>

          <h2 className="bench-section-title">AI Crawler Coverage</h2>
          <p className="bench-section-sub">GEO Gateway supports all 9 major AI crawlers.</p>
          <table className="bench-table">
            <thead>
              <tr>
                <th>Crawler</th>
                <th>Company</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {CRAWLERS.map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.company}</td>
                  <td><span className="bench-check">✓ Supported</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="bench-note">
          Benchmarks are measured on production infrastructure. Individual results may vary by plan, region, and integration complexity.
        </p>

        <FooterV9 />
      </div>
    </>
  )
}
