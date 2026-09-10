/**
 * /feed-audit/:auditId — pagina publică de rezultat audit feed (C6, PR-4).
 *
 * Nu e indexabilă: <meta name="robots" content="noindex"> aici + headerul
 * real x-robots-tag: noindex vine din API (§8.2) și din CloudFront la deploy.
 *
 * Copy RO — mesajele API sunt RO. Fără claims suplimentare: scorurile și
 * disclaimer-ele vin din răspunsul API (specs[spec].disclaimer), afișate
 * ca atare.
 */
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const API_BASE = import.meta.env.VITE_FEED_AUDIT_API || '/api/feed-audit'
const POLL_MS = 2000
const SPECS = [
  { key: 'google', label: 'Google Merchant Center' },
  { key: 'meta', label: 'Meta (Facebook/Instagram)' },
  { key: 'chatgpt', label: 'ChatGPT / AI commerce' },
]

function scoreColor(score) {
  if (score >= 90) return '#34d399'
  if (score >= 70) return '#d4b07a'
  return '#e08a8a'
}

function SpecCard({ label, spec }) {
  const problems = (spec.problems || []).slice(0, 10)
  return (
    <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h3 className="font-bold text-white">{label}</h3>
        <div className="font-mono font-extrabold text-3xl" style={{ color: scoreColor(spec.score) }}>
          {spec.score}
          <span className="text-base text-[#5c6883]">/100</span>
        </div>
      </div>
      <div className="text-sm text-[#8b96ab] mt-1">
        {spec.compliant} / {spec.total} produse fără erori
      </div>
      <p className="text-[12px] text-[#5c6883] mt-3 leading-relaxed">{spec.disclaimer}</p>
      {problems.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {problems.map((p) => (
            <li key={p.rule_id} className="border-t border-[#1f293f] pt-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded"
                  style={{
                    color: p.severity === 'error' ? '#e08a8a' : '#d4b07a',
                    background: p.severity === 'error' ? 'rgba(224,138,138,.08)' : 'rgba(212,176,122,.08)',
                  }}
                >
                  {p.severity}
                </span>
                <span className="text-sm text-white font-medium">{p.title}</span>
                <span className="text-[12px] text-[#8b96ab] ml-auto font-mono">{p.count}×</span>
              </div>
              {(p.examples || []).length > 0 && (
                <div className="mt-1.5 space-y-0.5">
                  {p.examples.slice(0, 3).map((ex, i) => (
                    <div key={i} className="text-[12px] text-[#5c6883] font-mono truncate">· {ex}</div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#34d399] mt-4">Nicio problemă detectată în eșantion pentru acest spec.</p>
      )}
    </div>
  )
}

function ComparatorBlock({ comparator }) {
  if (!comparator || comparator.skipped) {
    return (
      <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
        <h3 className="font-bold text-white">Comparație cu piața (GTIN)</h3>
        <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">
          Secțiunea de comparație cu piața nu a putut rula pentru acest audit.
        </p>
      </div>
    )
  }
  if (comparator.hidden === true) {
    return (
      <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
        <h3 className="font-bold text-white">Comparație cu piața (GTIN)</h3>
        <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">
          Eșantion insuficient pentru o comparație relevantă cu piața — prea puține produse
          din eșantion au GTIN valid.
        </p>
      </div>
    )
  }
  return (
    <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
      <h3 className="font-bold text-white">Comparație cu piața (GTIN)</h3>
      <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">
        {comparator.matched} produse din eșantion au GTIN-uri regăsite și în alte surse publice —
        un semnal de acoperire în canalele de comparație.
      </p>
    </div>
  )
}

export default function FeedAuditResult() {
  const { auditId } = useParams()
  const [lang, setLang] = useState('ro')
  const [scrolled, setScrolled] = useState(false)
  const [state, setState] = useState('loading') // loading | running | done | failed | notfound
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let cancelled = false
    let timer = null
    async function poll() {
      let res
      try {
        res = await fetch(`${API_BASE}?audit_id=${encodeURIComponent(auditId)}`)
      } catch {
        if (!cancelled) {
          setState('failed')
          setError('Nu am putut contacta serverul de audit. Reîncearcă în câteva momente.')
        }
        return
      }
      if (cancelled) return
      if (res.status === 404) {
        setState('notfound')
        return
      }
      if (!res.ok) {
        setState('failed')
        setError('Eroare la preluarea rezultatului auditului.')
        return
      }
      const body = await res.json()
      if (cancelled) return
      if (body.status === 'queued' || body.status === 'running') {
        setState('running')
        timer = setTimeout(poll, POLL_MS)
        return
      }
      if (body.status === 'done') {
        setData(body)
        setState('done')
        return
      }
      setState('failed')
      setError(body.error || 'Auditul a eșuat la procesarea feedului.')
    }
    poll()
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [auditId])

  return (
    <>
      {/* Headerul real noindex (x-robots-tag) vine din API/CloudFront la deploy;
          meta-ul de aici e al doilea strat pentru pagina servită client-side. */}
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Rezultat audit feed | CatyAI</title>
      </Helmet>

      <div className="min-h-screen bg-[#0a0f1c] text-[#c7d0e0] font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main className="max-w-5xl mx-auto px-6 py-16">
          <div style={{ width: 32, height: 3, background: '#d4b07a', borderRadius: 2, marginBottom: 18 }} />
          <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl text-white">Rezultatul auditului de feed</h1>

          {(state === 'loading' || state === 'running') && (
            <div className="mt-10 bg-[#111a2c] border border-[#1f293f] rounded-xl p-8 text-center">
              <div className="inline-block w-8 h-8 border-2 border-[#d4b07a] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#8b96ab] mt-4">
                {state === 'loading' ? 'Se încarcă rezultatul…' : 'Auditul rulează — analizăm feedul. Pagina se actualizează automat.'}
              </p>
            </div>
          )}

          {state === 'notfound' && (
            <div className="mt-10 bg-[#111a2c] border border-[#1f293f] rounded-xl p-8">
              <p className="text-[#e08a8a] font-medium">Audit negăsit</p>
              <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">
                ID-ul de audit este greșit sau rezultatul a expirat (rezultatele se păstrează 72 de ore).
              </p>
            </div>
          )}

          {state === 'failed' && (
            <div className="mt-10 bg-[#111a2c] border border-[#1f293f] rounded-xl p-8">
              <p className="text-[#e08a8a] font-medium">Auditul nu a putut fi finalizat</p>
              <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{error}</p>
            </div>
          )}

          {state === 'done' && data && data.result && (
            <div className="mt-10 space-y-8">
              {data.result.notice && (
                <div className="bg-[#111a2c] border border-[#d4b07a]/40 rounded-xl p-5 text-sm text-[#e7cfa3] leading-relaxed">
                  {data.result.notice}
                </div>
              )}

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-5">
                  <div className="font-mono font-extrabold text-2xl text-[#e7cfa3]">{data.result.sample_size}</div>
                  <div className="text-[12px] text-[#8b96ab] mt-1">produse analizate în eșantion</div>
                </div>
                <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-5">
                  <div className="font-mono font-extrabold text-2xl text-[#e7cfa3]">
                    {data.result.stats.invalid_rows ?? 0}
                  </div>
                  <div className="text-[12px] text-[#8b96ab] mt-1">rânduri invalide în feed</div>
                </div>
                <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-5">
                  <div className="font-mono font-extrabold text-2xl text-[#e7cfa3] uppercase">{data.result.stats.format || '—'}</div>
                  <div className="text-[12px] text-[#8b96ab] mt-1">
                    format detectat{data.result.stats.encoding ? ` · ${data.result.stats.encoding}` : ''}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {SPECS.map(({ key, label }) =>
                  data.result.specs && data.result.specs[key] ? (
                    <SpecCard key={key} label={label} spec={data.result.specs[key]} />
                  ) : null
                )}
              </div>

              {data.result.top_fields_missing && data.result.top_fields_missing.length > 0 && (
                <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                  <h3 className="font-bold text-white">Câmpurile cele mai des lipsă</h3>
                  <ul className="mt-3 space-y-1.5">
                    {data.result.top_fields_missing.map((f) => (
                      <li key={f.field} className="flex justify-between text-sm">
                        <span className="text-[#8b96ab] font-mono">{f.field}</span>
                        <span className="text-[#e7cfa3] font-mono">{f.missing} lipsă</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ComparatorBlock comparator={data.result.comparator} />

              <div className="bg-gradient-to-br from-[#111a2c] to-[#0d1424] border border-[#d4b07a]/30 rounded-xl p-8 text-center">
                <h3 className="font-extrabold tracking-tight text-xl text-white">Vrei un feed curat, nu doar un diagnostic?</h3>
                <p className="text-sm text-[#8b96ab] mt-3 leading-relaxed max-w-xl mx-auto">
                  Rezolvăm exact problemele de mai sus: curățare titluri, structurare atribute, prețuri și
                  disponibilitate re-verificate la fiecare generare de feed.
                </p>
                <Link
                  to="/contact?subject=refacere-feed"
                  className="inline-block mt-6 font-bold px-6 py-3 rounded-lg bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3] transition"
                  style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}
                >
                  Solicită refacerea feedului
                </Link>
              </div>
            </div>
          )}
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
