import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

const CHECK_LABELS = {
  robots_txt:        { label: 'robots.txt',          desc: 'Indexable by AI crawlers' },
  llms_txt:          { label: 'llms.txt',            desc: 'Standardized AI directive file' },
  sitemap_xml:       { label: 'sitemap.xml',         desc: 'Discovery feed for crawlers' },
  ai_crawler_access: { label: 'AI crawler access',   desc: 'GPTBot, ClaudeBot, PerplexityBot can read your pages' },
  spa_shell:         { label: 'No SPA shell',        desc: 'Content visible without JavaScript' },
  structured_data:   { label: 'Structured data',     desc: 'JSON-LD / schema.org' },
  canonical:         { label: 'Canonical URL',       desc: 'Authoritative URL declared' },
}

const STATUS_COLOR = {
  pass: { text: '#16C784', dot: '#16C784', bg: 'rgba(22,199,132,0.08)', border: 'rgba(22,199,132,0.25)' },
  warn: { text: '#F5A623', dot: '#F5A623', bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.25)' },
  fail: { text: '#EA3943', dot: '#EA3943', bg: 'rgba(234,57,67,0.08)', border: 'rgba(234,57,67,0.25)' },
}

const SEVERITY_COLOR = {
  high:   '#EA3943',
  medium: '#F5A623',
  low:    '#16C784',
}

function getGradeColor(grade) {
  if (grade === 'A') return '#16C784'
  if (grade === 'B') return '#7BC97A'
  if (grade === 'C') return '#F5A623'
  if (grade === 'D') return '#F08A3E'
  return '#EA3943'
}

function getScoreColor(score) {
  if (score >= 85) return '#16C784'
  if (score >= 70) return '#7BC97A'
  if (score >= 50) return '#F5A623'
  if (score >= 30) return '#F08A3E'
  return '#EA3943'
}

function normalizeUrl(input) {
  let v = input.trim()
  if (!v) return ''
  if (!/^https?:\/\//i.test(v)) v = 'https://' + v
  return v
}

export default function AiVisibilityCheck() {
  const [searchParams] = useSearchParams()
  const initialUrl = searchParams.get('url') || ''
  const [url, setUrl]         = useState(initialUrl)
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)
  const inputRef = useRef(null)

  const runAudit = async () => {
    const normalized = normalizeUrl(url)
    if (!normalized) {
      setError('Please enter a website URL')
      inputRef.current?.focus()
      return
    }

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('https://api.catyai.io/api/public/ai-visibility', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ url: normalized }),
      })
      const data = await res.json()
      if (res.status === 429) {
        throw new Error('Rate limit reached. Try again in a few minutes.')
      }
      if (res.status === 400) {
        throw new Error(data.error || 'Invalid URL')
      }
      if (!res.ok || !data.success) {
        throw new Error(data.error || `Audit failed (HTTP ${res.status})`)
      }
      setResult(data)
    } catch (e) {
      setError(e.message || 'Audit failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !loading) runAudit()
  }

  useEffect(() => {
    if (initialUrl) runAudit()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: '#F8F6F0', maxWidth: '780px', margin: '0 auto' }}>
      {/* Input row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        <input
          ref={inputRef}
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={handleKey}
          placeholder="https://yourwebsite.com"
          aria-label="Website URL to audit"
          style={{
            flex:         1,
            padding:      '14px 18px',
            borderRadius: '10px',
            background:   '#0A1628',
            border:       '1px solid #3A4557',
            color:        '#F8F6F0',
            fontSize:     '15px',
            outline:      'none',
          }}
        />
        <button
          onClick={runAudit}
          disabled={loading}
          style={{
            padding:      '14px 26px',
            borderRadius: '10px',
            background:   '#C48D32',
            color:        '#010A1F',
            fontWeight:   700,
            fontSize:     '15px',
            border:       'none',
            cursor:       loading ? 'wait' : 'pointer',
            whiteSpace:   'nowrap',
            opacity:      loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Auditing…' : 'Check now ↗'}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ padding: '20px', textAlign: 'center', color: '#9BA8B8', fontSize: '14px' }}>
          Auditing your website's AI visibility… (typically &lt; 5 seconds)
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div style={{
          padding:      '14px 18px',
          borderRadius: '10px',
          background:   STATUS_COLOR.fail.bg,
          border:       `1px solid ${STATUS_COLOR.fail.border}`,
          color:        STATUS_COLOR.fail.text,
          fontSize:     '14px',
        }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div>
          {/* Score + grade card */}
          <div style={{
            display:        'flex',
            gap:            '24px',
            alignItems:     'center',
            padding:        '24px',
            borderRadius:   '14px',
            background:     '#0A1628',
            border:         '1px solid #1A2A3F',
            marginBottom:   '1.5rem',
          }}>
            <div style={{
              width:          '120px',
              height:         '120px',
              borderRadius:   '50%',
              background:     `radial-gradient(circle at center, ${getScoreColor(result.score)}22, transparent 70%)`,
              border:         `2px solid ${getScoreColor(result.score)}`,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexDirection:  'column',
              flexShrink:     0,
            }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: getScoreColor(result.score), lineHeight: 1 }}>
                {result.score}
              </div>
              <div style={{ fontSize: '11px', color: '#9BA8B8', marginTop: '4px' }}>
                / {result.max_score}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize:      '11px',
                color:         '#9BA8B8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom:  '6px',
                wordBreak:     'break-all',
              }}>
                {result.url}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#F8F6F0', marginBottom: '8px' }}>
                Grade <span style={{ color: getGradeColor(result.grade), fontSize: '32px', fontWeight: 700 }}>{result.grade}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#9BA8B8' }}>
                {result.score >= 85 && 'Your site is well-optimized for AI assistants.'}
                {result.score >= 70 && result.score < 85 && 'Good foundation. A few fixes will push you to A.'}
                {result.score >= 50 && result.score < 70 && 'Significant gaps. AI assistants will misrepresent your business.'}
                {result.score < 50 && 'Critical: AI assistants likely cannot read your site at all.'}
              </div>
            </div>
          </div>

          {/* Checks grid */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize:      '11px',
              color:         '#9BA8B8',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom:  '12px',
            }}>
              Checks
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {Object.entries(result.checks || {}).map(([key, check]) => {
                const cfg = CHECK_LABELS[key] || { label: key, desc: '' }
                const c   = STATUS_COLOR[check.status] || STATUS_COLOR.warn
                return (
                  <div key={key} style={{
                    padding:      '12px 14px',
                    borderRadius: '10px',
                    background:   c.bg,
                    border:       `1px solid ${c.border}`,
                  }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{
                        width:        '8px',
                        height:       '8px',
                        borderRadius: '50%',
                        background:   c.dot,
                        flexShrink:   0,
                      }} />
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8F6F0' }}>
                        {cfg.label}
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#9BA8B8', paddingLeft: '16px' }}>
                      {cfg.desc}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recommendations */}
          {Array.isArray(result.recommendations) && result.recommendations.length > 0 && (
            <div>
              <div style={{
                fontSize:      '11px',
                color:         '#9BA8B8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom:  '12px',
              }}>
                What to fix
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.recommendations.map((r, i) => (
                  <div key={i} style={{
                    padding:      '14px 16px',
                    borderRadius: '10px',
                    background:   '#0A1628',
                    border:       '1px solid #1A2A3F',
                    borderLeft:   `3px solid ${SEVERITY_COLOR[r.severity] || SEVERITY_COLOR.medium}`,
                  }}>
                    <div style={{ fontSize: '14px', color: '#9BA8B8', lineHeight: 1.5 }}>
                      {r.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
