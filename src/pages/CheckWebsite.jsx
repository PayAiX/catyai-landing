import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import AiVisibilityCheck from '../components/AiVisibilityCheck'
import FooterV9 from '../components/FooterV9'

export default function CheckWebsite() {
  const [lang, setLang] = useState(localStorage.getItem('caty-lang') || 'en')

  return (
    <>
      <SEO
        url="https://catyai.io/check"
        title="AI Visibility Check"
        description="Free 30-second audit. Test if GPTBot, ClaudeBot, and Perplexity can read your business. Seven measurable checks. No signup."
        image="https://catyai.io/og-image.png"
        service={{
          name: 'AI Visibility Audit',
          description: 'Real HTTP probe — no JavaScript rendering, no marketing fluff. Runs the same checks AI crawlers (GPTBot, ClaudeBot, PerplexityBot) execute when indexing for answer engines.',
          features: [
            'robots.txt indexability',
            'llms.txt directive file',
            'sitemap.xml discovery feed',
            'AI crawler access (GPTBot, ClaudeBot, PerplexityBot)',
            'JSON-LD / schema.org structured data',
            'Canonical URL declaration',
            'Weighted scoring (0-100, Grade A-F)'
          ]
        }}
      />
      <Helmet>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
      </Helmet>

      <GlobalHeader lang={lang} setLang={setLang} />

      <main style={{ background: '#010A1F', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
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
