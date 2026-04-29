import { useState, useRef } from 'react'

const METRICS_CONFIG = {
  ai_crawlability: { label: 'AI Crawlability', desc: 'Conținut fără JS', max: 25 },
  structured_data: { label: 'Structured Data', desc: 'JSON-LD / schema.org', max: 20 },
  nap_completeness: { label: 'NAP Completeness', desc: 'Nume, adresă, program', max: 20 },
  ai_directives: { label: 'AI Directives', desc: 'llms.txt / robots.txt AI', max: 15 },
  anti_hallucination: { label: 'Anti-Halucinare', desc: 'Date factuale clare', max: 20 },
}

const PHASES = [
  'fetch HTML brut (no JS)...',
  'detectare React/SPA shells...',
  'analiză structured data...',
  'verificare NAP protocol...',
  'calculare GEO score...',
]

function getScoreColor(score) {
  if (score >= 75) return { text: '#16C784', bg: 'rgba(22,199,132,0.08)', border: 'rgba(22,199,132,0.2)', label: 'Bine optimizat' }
  if (score >= 40) return { text: '#F5A623', bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.2)', label: 'Necesită îmbunătățiri' }
  return { text: '#EA3943', bg: 'rgba(234,57,67,0.08)', border: 'rgba(234,57,67,0.2)', label: 'Invizibil pentru AI' }
}

function getStatusColors(status) {
  if (status === 'good') return { text: '#16C784', bar: '#16C784' }
  if (status === 'warning') return { text: '#F5A623', bar: '#F5A623' }
  return { text: '#EA3943', bar: '#EA3943' }
}

export default function GeoAuditWidget() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const intervalRef = useRef(null)

  const runAnalysis = async () => {
    if (!url.trim()) return
    setLoading(true); setResult(null); setError(null)
    let pi = 0
    setPhase(PHASES[0])
    intervalRef.current = setInterval(() => {
      pi = (pi + 1) % PHASES.length
      setPhase(PHASES[pi])
    }, 1200)

    try {
      const res = await fetch('https://api.catyai.io/geo/v1/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      clearInterval(intervalRef.current)
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: '#F8F6F0', maxWidth: '660px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <input
          type="text" value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && runAnalysis()}
          placeholder="https://site-ul-tau.ro"
          style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', background: '#0A1628', border: '1px solid #3A4557', color: '#F8F6F0', fontSize: '14px', outline: 'none' }}
        />
        <button onClick={runAnalysis} disabled={loading}
          style={{ padding: '12px 22px', borderRadius: '10px', background: '#C48D32', color: '#010A1F', fontWeight: 700, fontSize: '14px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Se analizează...' : 'Analizează ↗'}
        </button>
      </div>

      {loading && (
        <div style={{ padding: '1.5rem', background: '#0A1628', borderRadius: '12px', border: '1px solid #3A4557', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'monospace', marginBottom: '8px', color: '#C48D32' }}>
            {url.replace(/^https?:\/\//, '').split('/')[0]}
          </div>
          <p style={{ fontSize: '13px', color: '#8892A4', margin: 0, fontFamily: 'monospace' }}>{phase}</p>
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem 1.25rem', background: 'rgba(234,57,67,0.08)', border: '1px solid rgba(234,57,67,0.2)', borderRadius: '12px' }}>
          <p style={{ fontSize: '13px', color: '#EA3943', margin: 0 }}>{error}</p>
        </div>
      )}

      {result && (() => {
        const sc = getScoreColor(result.overall_score)
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `1px solid ${sc.border}` }}>
                <div style={{ fontSize: '48px', fontWeight: 700, fontFamily: 'monospace', color: sc.text, lineHeight: 1 }}>{result.overall_score}</div>
                <div style={{ fontSize: '11px', color: '#8892A4', marginTop: '4px' }}>GEO Score / 100</div>
                <div style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '8px', marginTop: '8px', fontWeight: 600, background: sc.bg, color: sc.text }}>{sc.label}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', border: '1px solid #3A4557' }}>
                <div style={{ fontSize: '11px', color: '#8892A4', marginBottom: '6px', fontFamily: 'monospace', letterSpacing: '0.08em' }}>VERDICT AI</div>
                <p style={{ fontSize: '13px', color: '#F8F6F0', margin: 0, lineHeight: 1.6 }}>{result.ai_verdict}</p>
                <p style={{ fontSize: '11px', color: '#8892A4', margin: '8px 0 0', fontFamily: 'monospace' }}>{result.site_name} · {result.url}</p>
              </div>
            </div>

            <div style={{ background: '#050D20', border: '1px solid #3A4557', borderRadius: '12px', marginBottom: '1rem', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #3A4557' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#F8F6F0' }}>Breakdown metrici</span>
              </div>
              {Object.entries(result.metrics).map(([key, m], i, arr) => {
                const cfg = METRICS_CONFIG[key]
                const col = getStatusColors(m.status)
                const pct = Math.round((m.score / m.max) * 100)
                return (
                  <div key={key} style={{ padding: '10px 16px', borderBottom: i < arr.length - 1 ? '1px solid rgba(58,69,87,0.4)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#F8F6F0' }}>{cfg.label}</span>
                        <span style={{ fontSize: '12px', color: '#8892A4', marginLeft: '8px' }}>{cfg.desc}</span>
                      </div>
                      <span style={{ fontSize: '12px', fontFamily: 'monospace', color: col.text, fontWeight: 600 }}>{m.score}/{m.max}</span>
                    </div>
                    <div style={{ height: '4px', background: '#1a2744', borderRadius: '2px', marginBottom: '5px' }}>
                      <div style={{ height: '4px', width: `${pct}%`, background: col.bar, borderRadius: '2px', transition: 'width 0.6s ease' }} />
                    </div>
                    <p style={{ fontSize: '12px', color: '#8892A4', margin: 0 }}>{m.finding}</p>
                  </div>
                )
              })}
            </div>

            {result.top_issues?.length > 0 && (
              <div style={{ background: 'rgba(234,57,67,0.06)', border: '1px solid rgba(234,57,67,0.2)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '11px', color: '#EA3943', fontWeight: 600, marginBottom: '8px', fontFamily: 'monospace', letterSpacing: '0.08em' }}>PROBLEME CRITICE</div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#EA3943', lineHeight: 1.7 }}>
                  {result.top_issues.map((issue, i) => <li key={i}>{issue}</li>)}
                </ul>
              </div>
            )}

            <div style={{ background: 'rgba(196,141,50,0.06)', border: '1px solid rgba(196,141,50,0.2)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#D4A84B', marginBottom: '3px' }}>Rezolvă cu CatyAI NAP Protocol</div>
                <div style={{ fontSize: '12px', color: '#8892A4' }}>Knowledge Base indexat · Ed25519 · 0% halucinare</div>
              </div>
              <a href="https://app.catyai.io/register" style={{ padding: '9px 18px', fontSize: '13px', whiteSpace: 'nowrap', background: '#C48D32', color: '#010A1F', fontWeight: 700, borderRadius: '8px', textDecoration: 'none' }}>
                Start Free →
              </a>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
