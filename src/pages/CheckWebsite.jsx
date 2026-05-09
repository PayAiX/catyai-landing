import { Helmet } from 'react-helmet-async'
import AiVisibilityCheck from '../components/AiVisibilityCheck'
import FooterV9 from '../components/FooterV9'

export default function CheckWebsite() {
  return (
    <>
      <Helmet>
        <title>Check Your Website — AI Visibility Audit | CatyAI</title>
        <meta name="description" content="Free AI visibility audit. See exactly how AI assistants like ChatGPT, Claude, and Perplexity read your website. 7 measurable checks, score 0-100, actionable recommendations." />
        <meta property="og:title" content="Check Your Website — AI Visibility Audit | CatyAI" />
        <meta property="og:description" content="Free AI visibility audit. See exactly how AI assistants read your website — 7 measurable checks, score 0-100, actionable fixes." />
        <meta property="og:url" content="https://catyai.io/check" />
        <meta property="og:image" content="https://catyai.io/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Check Your Website — AI Visibility Audit" />
        <meta name="twitter:description" content="See exactly how AI assistants read your website. Free, no signup." />
        <link rel="canonical" href="https://catyai.io/check" />
      </Helmet>

      <main style={{ background: '#010A1F', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', fontFamily: "'DM Sans', sans-serif" }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display:       'inline-block',
              padding:       '6px 14px',
              borderRadius:  '999px',
              background:    'rgba(196,141,50,0.12)',
              border:        '1px solid rgba(196,141,50,0.3)',
              color:         '#C48D32',
              fontSize:      '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom:  '1.25rem',
            }}>
              Free · No signup
            </div>
            <h1 style={{
              fontSize:     'clamp(28px, 5vw, 44px)',
              fontWeight:   700,
              color:        '#F8F6F0',
              lineHeight:   1.15,
              marginBottom: '1rem',
            }}>
              How does AI see your website?
            </h1>
            <p style={{
              fontSize:   'clamp(15px, 2vw, 18px)',
              color:      '#9BA8B8',
              lineHeight: 1.55,
              maxWidth:   '640px',
              margin:     '0 auto',
            }}>
              Seven measurable checks that determine whether ChatGPT, Claude, Perplexity,
              and every AI assistant can read, understand, and accurately quote your business.
            </p>
          </div>

          {/* Audit widget */}
          <AiVisibilityCheck />

          {/* What we check */}
          <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid #1A2A3F' }}>
            <h2 style={{
              fontSize:     '22px',
              fontWeight:   600,
              color:        '#F8F6F0',
              marginBottom: '1rem',
            }}>
              What we check
            </h2>
            <p style={{ fontSize: '14px', color: '#9BA8B8', lineHeight: 1.6, marginBottom: '1rem' }}>
              The audit is a real HTTP probe — no JavaScript rendering, no marketing fluff.
              It runs the same checks AI crawlers (GPTBot, ClaudeBot, PerplexityBot) run when
              they index your site for an answer engine.
            </p>
            <p style={{ fontSize: '14px', color: '#9BA8B8', lineHeight: 1.6 }}>
              Each check is weighted. Score below 70 means AI assistants are likely making things
              up about your business when users ask. Score 85+ means your site is well-positioned
              for the AI-native web.
            </p>
          </div>

        </div>
      </main>
      <FooterV9 lang="en" />
    </>
  )
}
