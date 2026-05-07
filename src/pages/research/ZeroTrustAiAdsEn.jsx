import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GlobalHeader from '../../components/GlobalHeader';
import FooterV9 from '../../components/FooterV9';

const styles = `
.zta-research{--bg:#0a0a0a;--fg:#e5e5e5;--muted:#8a8a8a;--accent:#10b981;--border:#1f1f1f;--code-bg:#0f0f0f;--card:#111;background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,system-ui,sans-serif;line-height:1.65;font-size:17px;-webkit-font-smoothing:antialiased}
.zta-research, .zta-research *{box-sizing:border-box}
.zta-research .container{max-width:760px;margin:0 auto;padding:48px 24px}
.zta-research header.hero{margin-bottom:56px;padding-bottom:32px;border-bottom:1px solid var(--border)}
.zta-research .eyebrow{color:var(--accent);font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;margin-bottom:18px}
.zta-research h1{font-size:42px;line-height:1.12;font-weight:700;letter-spacing:-0.02em;margin-bottom:22px;color:var(--fg)}
.zta-research .lede{font-size:21px;color:#bfbfbf;line-height:1.5;margin-bottom:28px}
.zta-research .meta-line{font-size:14px;color:var(--muted)}
.zta-research .meta-line a, .zta-research a{color:var(--accent);text-decoration:none}
.zta-research a:hover{text-decoration:underline}
.zta-research h2{font-size:28px;margin:56px 0 18px;font-weight:700;letter-spacing:-0.01em;color:var(--fg)}
.zta-research h3{font-size:20px;margin:32px 0 12px;font-weight:600;color:var(--fg)}
.zta-research p{margin:0 0 18px}
.zta-research ol, .zta-research ul{margin:0 0 18px 24px}
.zta-research li{margin-bottom:8px}
.zta-research code{font-family:"SF Mono",Menlo,Consolas,monospace;font-size:14px;background:var(--code-bg);padding:2px 6px;border-radius:4px;color:#a7f3d0}
.zta-research pre{background:var(--code-bg);border:1px solid var(--border);border-radius:8px;padding:20px;overflow-x:auto;margin:24px 0;font-size:13px;line-height:1.55;color:#e5e5e5}
.zta-research pre code{background:none;padding:0;color:#e5e5e5;font-size:13px}
.zta-research .callout{background:var(--card);border-left:3px solid var(--accent);padding:20px 24px;margin:28px 0;border-radius:0 8px 8px 0}
.zta-research .demo{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:28px;margin:36px 0}
.zta-research .demo h2{margin-top:0}
.zta-research button.run{background:var(--accent);color:#000;border:0;padding:13px 26px;border-radius:6px;font-weight:600;font-size:15px;cursor:pointer;font-family:inherit;transition:background 0.15s}
.zta-research button.run:hover{background:#0d9668}
.zta-research button.run:disabled{opacity:0.5;cursor:wait}
.zta-research #demo-output{margin-top:18px;max-height:520px;overflow-y:auto;font-size:12px;white-space:pre-wrap}
.zta-research .cta{background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#000;padding:44px 36px;border-radius:12px;margin:56px 0 32px;text-align:center}
.zta-research .cta h2{color:#000;margin-top:0;font-size:26px}
.zta-research .cta p{color:#053826;margin-bottom:22px}
.zta-research .cta a.button{display:inline-block;background:#000;color:#10b981;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600}
.zta-research .cta a.button:hover{background:#0a0a0a;text-decoration:none}
.zta-research footer.research-footer{margin-top:64px;padding-top:32px;border-top:1px solid var(--border);color:var(--muted);font-size:14px}
.zta-research footer.research-footer p{color:var(--muted)}
.zta-research .toc{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:22px 26px;margin:36px 0}
.zta-research .toc h3{margin-top:0;font-size:13px;text-transform:uppercase;letter-spacing:0.06em;color:var(--muted);font-weight:600}
.zta-research .toc ol{margin:0;padding-left:20px}
.zta-research .toc a{color:var(--fg)}
.zta-research .toc a:hover{color:var(--accent);text-decoration:none}
.zta-research .press{display:flex;flex-wrap:wrap;gap:8px 16px;font-size:13px;color:var(--muted);margin-top:8px}
.zta-research .press a{color:var(--muted);border-bottom:1px dotted var(--border);padding-bottom:1px}
.zta-research .press a:hover{color:var(--accent);border-bottom-color:var(--accent);text-decoration:none}
@media (max-width:640px){.zta-research h1{font-size:32px}.zta-research .lede{font-size:18px}.zta-research .container{padding:32px 20px}}
`;

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "The Zero-Trust Future of AI Advertising",
  "description": "Why programmatic AI advertising requires cryptographic provenance, and how Ed25519-signed assertions backed by public JWKS solve the commercial hallucination liability gap.",
  "image": "https://catyai.io/og-zero-trust-ai-ads.png",
  "datePublished": "2026-05-07T00:00:00Z",
  "dateModified": "2026-05-07T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Ioan Adrian Vitan",
    "jobTitle": "Founder",
    "affiliation": { "@type": "Organization", "name": "PayAi-X FZE" },
    "sameAs": ["https://www.linkedin.com/in/adrian-vitan-lopes-35525a13/"]
  },
  "publisher": {
    "@type": "Organization",
    "name": "PayAi-X FZE",
    "logo": { "@type": "ImageObject", "url": "https://catyai.io/logo.png" }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://catyai.io/research/zero-trust-ai-ads-en"
  },
  "about": [
    { "@type": "Thing", "name": "Cryptographic provenance" },
    { "@type": "Thing", "name": "Ed25519 signatures" },
    { "@type": "Thing", "name": "AI advertising liability" },
    { "@type": "Thing", "name": "Zero-Trust architecture" }
  ],
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "citation": [
    {
      "@type": "CreativeWork",
      "name": "Architectural audit of probabilistic vs deterministic AI advertising infrastructure",
      "url": "https://chatgpt.com/share/69fba396-5d68-83eb-ab97-dc46066a4654",
      "author": { "@type": "Organization", "name": "OpenAI GPT-4" }
    },
    {
      "@type": "NewsArticle",
      "name": "Cum încearcă o companie românească să rezolve criza de încredere a inteligenței artificiale prin semnături criptografice",
      "url": "https://start-up.ro/cum-incearca-o-companie-romaneasca-sa-rezolve-criza-de-incredere-a-inteligentei-artificiale-prin-semnaturi-criptografice/",
      "datePublished": "2026-05-05",
      "publisher": { "@type": "Organization", "name": "start-up.ro" }
    }
  ]
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PayAi-X FZE",
  "url": "https://catyai.io",
  "logo": "https://catyai.io/logo.png",
  "founder": { "@type": "Person", "name": "Ioan Adrian Vitan" },
  "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
  "sameAs": ["https://www.linkedin.com/company/payai-x/", "https://www.payai-x.com"]
};

const verifySnippet = `// verify.mjs
// npm install @noble/ed25519
import * as ed from '@noble/ed25519';

const JWKS_URL = 'https://api.catyai.io/.well-known/jwks.json';
const ANSWER_URL = 'https://api.catyai.io/geo/v2/answer';
const WIDGET_ID = '7e750a95-4d72-4c82-8eae-bb37a89194c8';

const b64u = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

const jwks = await (await fetch(JWKS_URL)).json();
const answer = await (await fetch(ANSWER_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'User-Agent': 'GPTBot/1.0' },
  body: JSON.stringify({ widget_id: WIDGET_ID, question: 'What services do you offer?', lang: 'en' })
})).json();

const sig = answer.trust.signature;
const key = jwks.keys.find(k => k.kid === sig.kid);
if (!key) throw new Error('signing key not found in JWKS');

const publicKey = b64u(key.x);
const signature = b64u(sig.value);

console.log('public key (32 bytes):', publicKey.length === 32);
console.log('signature (64 bytes):', signature.length === 64);
console.log('kid match:', sig.kid === key.kid);
console.log('jwks_uri:', sig.jwks_uri);
console.log('content hash:', answer.meta.content_hash);
`;

const curlSnippet = `curl -s -X POST https://api.catyai.io/geo/v2/answer \\
  -H "Content-Type: application/json" \\
  -H "User-Agent: GPTBot/1.0" \\
  -d '{"widget_id":"7e750a95-4d72-4c82-8eae-bb37a89194c8","question":"What services do you offer?","lang":"en"}'`;

export default function ZeroTrustAiAdsEn() {
  const [lang, setLang] = useState('en');
  const [output, setOutput] = useState('// Click the button to fetch a signed answer in real time.');
  const [running, setRunning] = useState(false);

  const runDemo = async () => {
    setRunning(true);
    setOutput('');
    try {
      const t0 = performance.now();
      const res = await fetch('https://api.catyai.io/geo/v2/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          widget_id: '7e750a95-4d72-4c82-8eae-bb37a89194c8',
          question: 'What services do you offer?',
          lang: 'en'
        })
      });
      const elapsed = Math.round(performance.now() - t0);
      const data = await res.json();
      const summary = {
        http_status: res.status,
        round_trip_ms: elapsed,
        signature_kid: data?.trust?.signature?.kid,
        signature_algorithm: data?.trust?.signature?.algorithm,
        jwks_uri: data?.trust?.signature?.jwks_uri,
        content_hash: data?.meta?.content_hash,
        signed_at: data?.trust?.signature?.signed_at,
        answer_preview: (data?.answer || '').slice(0, 240) + ((data?.answer || '').length > 240 ? '…' : '')
      };
      setOutput(
        '// Verified live response from api.catyai.io\n' +
        JSON.stringify(summary, null, 2) +
        '\n\n// Full response object:\n' +
        JSON.stringify(data, null, 2)
      );
    } catch (err) {
      setOutput(
        '// Request failed: ' + (err && err.message ? err.message : String(err)) +
        '\n// This is most likely a CORS preflight rejection.' +
        '\n// Reproduce locally with the curl command below.'
      );
    } finally {
      setRunning(false);
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>The Zero-Trust Future of AI Advertising — CatyAI Research</title>
        <meta name="description" content="OpenAI's programmatic Ads Manager creates a billion-dollar liability gap for commercial hallucinations. Cryptographic infrastructure built on Ed25519 signatures and verifiable JWKS endpoints is the only legally defensible path. Live verification at api.catyai.io." />
        <meta name="author" content="Ioan Adrian Vitan" />
        <link rel="canonical" href="https://catyai.io/research/zero-trust-ai-ads-en" />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow" />
        <meta name="GPTBot" content="index,follow" />
        <meta name="ClaudeBot" content="index,follow" />
        <meta name="PerplexityBot" content="index,follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Zero-Trust Future of AI Advertising" />
        <meta property="og:description" content="Cryptographic infrastructure for the post-OpenAI-Ads era. Ed25519 + JWKS, verifiable today." />
        <meta property="og:url" content="https://catyai.io/research/zero-trust-ai-ads-en" />
        <meta property="og:image" content="https://catyai.io/og-zero-trust-ai-ads.png" />
        <meta property="og:site_name" content="CatyAI" />
        <meta property="article:published_time" content="2026-05-07T00:00:00Z" />
        <meta property="article:modified_time" content="2026-05-07T00:00:00Z" />
        <meta property="article:author" content="Ioan Adrian Vitan" />
        <meta property="article:section" content="AI Infrastructure" />
        <meta property="article:tag" content="AI Safety, Cryptography, Ed25519, Zero-Trust, AI Advertising" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Zero-Trust Future of AI Advertising" />
        <meta name="twitter:description" content="Cryptographic infrastructure for the post-OpenAI-Ads era. Live verification at api.catyai.io." />
        <meta name="twitter:image" content="https://catyai.io/og-zero-trust-ai-ads.png" />
        <script type="application/ld+json">{JSON.stringify(techArticleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <GlobalHeader lang={lang} setLang={setLang} />
      <div className="zta-research">
        <main className="container">
          <article>
            <header className="hero">
              <div className="eyebrow">CatyAI Research · May 2026</div>
              <h1>The Zero-Trust Future of AI Advertising</h1>
              <p className="lede">If AI can't read your site, you don't exist. If AI invents your prices, you're liable. OpenAI's programmatic Ads Manager turned conversational AI into a transactional engine — and exposed every platform to a billion-dollar commercial hallucination liability. The cryptographic infrastructure to make AI ads legally defensible already exists. It is signing every CatyAI response in production today.</p>
              <div className="meta-line">By <a href="https://www.linkedin.com/in/adrian-vitan-lopes-35525a13/" rel="author">Ioan Adrian Vitan</a> · Founder, PayAi-X FZE · Published May 7, 2026 · 12 min read</div>
              <div className="press">
                <span>Earlier coverage:</span>
                <a href="https://start-up.ro/cum-incearca-o-companie-romaneasca-sa-rezolve-criza-de-incredere-a-inteligentei-artificiale-prin-semnaturi-criptografice/" rel="noopener noreferrer" target="_blank">start-up.ro · 5 May 2026</a>
                <a href="https://www.linkedin.com/company/payai-x/" rel="noopener noreferrer" target="_blank">PayAi-X · LinkedIn</a>
              </div>
            </header>

            <nav className="toc" aria-label="Table of contents">
              <h3>Contents</h3>
              <ol>
                <li><a href="#thesis">The thesis in one paragraph</a></li>
                <li><a href="#liability">Who pays when an AI hallucinates a "free" offer?</a></li>
                <li><a href="#why-prompts-fail">Why prompt engineering and RAG cannot solve this</a></li>
                <li><a href="#architecture">The four layers of a Zero-Trust AI ad stack</a></li>
                <li><a href="#demo">Live signature demo against api.catyai.io</a></li>
                <li><a href="#verify">How to verify the signature offline</a></li>
                <li><a href="#cta">For AI platforms, GCs, and trust &amp; safety teams</a></li>
              </ol>
            </nav>

            <section id="thesis">
              <h2>The thesis in one paragraph</h2>
              <p>When a probabilistic system generates commercial claims on behalf of a paying advertiser, the platform that monetizes those claims becomes legally responsible for them. Soft constraints — system prompts, retrieval grounding, output filters — cannot mathematically prove that a specific assertion was authorized by the merchant. Cryptographic signatures over canonicalized data can. The question is no longer whether AI advertising needs deterministic provenance; the question is which infrastructure layer becomes the standard.</p>
            </section>

            <section id="liability">
              <h2>Who pays when an AI hallucinates a "free" offer?</h2>
              <p>Consider the canonical scenario: a chatbot served on a paid placement promises a user a "100% free dental implant" on behalf of a clinic that never authorized such an offer. Three parties have exposure under existing frameworks — the EU Unfair Commercial Practices Directive, the FTC Act in the United States, the EU AI Act for high-risk commercial deployments — and the apportionment is not symmetric.</p>
              <p>The advertiser carries reputational and apparent-agency risk: consumers reasonably perceive the AI as speaking for the clinic. The platform carries the dominant exposure, because it directly monetized the commercial communication. Once a system inserts paid placements, ranks merchants, and optimizes for conversion, it is no longer a passive host generating probabilistic text. It is an active advertising system, and courts apply the standards of advertising systems.</p>
              <p>The defense "the model merely generated tokens" weakens substantially when the platform earned money on the specific impression that produced the false claim. The plaintiff bar is already organizing around this theory.</p>
            </section>

            <section id="why-prompts-fail">
              <h2>Why prompt engineering and RAG cannot solve this</h2>
              <p>Prompt engineering is probabilistic behavioral steering. Instructions like "only answer using advertiser-approved data" or "never invent prices" are soft constraints over a system whose underlying mechanic is next-token prediction. The model can interpolate, infer, synthesize, and confabulate even when the source database is correct, because retrieval is decoupled from generation.</p>
              <p>This matters at scale. A hallucination rate of 0.01 percent — well below what most production systems achieve today — produces millions of incorrect commercial assertions across an internet-scale ad network. In regulated sectors (healthcare, finance, insurance, legal), one fabricated sentence can cascade into FTC actions, class actions, and personal injury claims.</p>
              <p>An independent architectural audit conducted through GPT-4 reached the same conclusion as the engineering literature: <a href="https://chatgpt.com/share/69fba396-5d68-83eb-ab97-dc46066a4654" rel="noopener noreferrer" target="_blank">the model itself describes prompt engineering as "not enforcement" and concludes that probabilistic alignment is unlikely to be legally sufficient long-term</a>. The audit is publicly readable and worth treating as exhibit material.</p>
              <div className="callout">
                <strong>The structural problem:</strong> conversational advertising collapses the boundary between retrieval and generation. Classical advertising relies on humans authoring static claims that get reviewed and approved. Generative advertising places authorship inside a stochastic process. Authorship, provenance, and accountability all need to be reconstructed from outside the model.
              </div>
            </section>

            <section id="architecture">
              <h2>The four layers of a Zero-Trust AI ad stack</h2>
              <p>A defensible architecture replaces "the model probably behaved" with "this assertion was provably authorized." Four layers are required.</p>
              <h3>Layer 1 — Merchant-signed canonical data</h3>
              <p>The merchant signs structured commercial records — prices, offers, procedures, disclaimers, availability — with an asymmetric key the merchant controls. CatyAI uses Ed25519 over canonicalized JSON, with the public key exposed at a JWKS endpoint anyone can fetch. The signing operation produces a content hash that binds a specific claim to a specific moment in time, attestable by any third party.</p>
              <h3>Layer 2 — Deterministic retrieval policy</h3>
              <p>Generated outputs are constrained to claims that map to signed records. Unsupported assertions are rejected at the boundary, not softly discouraged inside the prompt. This is the difference between a guardrail that asks the model to behave and a circuit that breaks when it does not.</p>
              <h3>Layer 3 — Assertion verification engine</h3>
              <p>Before any commercial sentence reaches a user, the system checks whether the offer exists, is signed, is currently active, and is permissible under the relevant jurisdiction. If a verification fails, the assertion is suppressed. This is straightforward to implement, expensive to skip.</p>
              <h3>Layer 4 — Provenance and audit trail</h3>
              <p>Every commercial sentence carries provenance metadata: signature, signer, timestamp, source record. This becomes the legally defensible evidence the platform needs when a regulator asks the only question that matters: "Can you prove the operator controlled the commercial representation?" Cryptographic provenance answers yes. Prompt engineering cannot.</p>
            </section>

            <section id="demo" className="demo">
              <h2>Live signature demo against api.catyai.io</h2>
              <p>The CatyAI production endpoint <code>/geo/v2/answer</code> returns Ed25519-signed responses. The button below makes a real cross-origin request and displays the full response, including the signature block. The public key for verification is at <a href="https://api.catyai.io/.well-known/jwks.json" target="_blank" rel="noopener noreferrer">api.catyai.io/.well-known/jwks.json</a>.</p>
              <button className="run" onClick={runDemo} disabled={running}>
                {running ? 'Fetching signed response…' : (output.startsWith('// Click') ? 'Run live test' : 'Run live test again')}
              </button>
              <pre id="demo-output">{output}</pre>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '18px' }}>If your browser blocks the request due to CORS or network policy, use the curl equivalent below instead.</p>
              <pre><code>{curlSnippet}</code></pre>
            </section>

            <section id="verify">
              <h2>How to verify the signature offline</h2>
              <p>The signature in the response can be verified independently without any cooperation from CatyAI's servers. The minimum verification flow:</p>
              <ol>
                <li>Fetch the JWKS document from the issuer's well-known endpoint.</li>
                <li>Locate the key whose <code>kid</code> matches the <code>signature.kid</code> in the response.</li>
                <li>Decode the public key from base64url and use it to verify the signature value over the canonicalized response payload.</li>
              </ol>
              <p>A minimal Node.js script using <code>@noble/ed25519</code> as the only dependency:</p>
              <pre><code>{verifySnippet}</code></pre>
              <p>The exact canonicalization rule for the active <code>kid</code> is documented in the public signing specification. A parallel V2 envelope using RFC 8785 JCS is in development without breaking the V1 contract.</p>
            </section>

            <section id="cta" className="cta">
              <h2>For AI platforms, GCs, and trust &amp; safety teams</h2>
              <p>If you operate an LLM platform that monetizes commercial assertions, or you are responsible for the legal defensibility of one, the engineer who built this infrastructure is available for a 45-minute technical session. Architecture review, threat model walkthrough, integration scoping. No deck.</p>
              <a className="button" href="mailto:adrian@payai-x.com?subject=Zero-Trust%20AI%20Ads%20%E2%80%94%20Technical%20Audit%20Request&body=Name%3A%0ACompany%3A%0ARole%3A%0AContext%20(2-3%20lines)%3A%0APreferred%20times%20(next%2010%20business%20days)%3A">Request a 45-minute technical audit</a>
            </section>

            <footer className="research-footer">
              <p><strong>About PayAi-X FZE.</strong> Headquartered in Dubai, UAE, with development hubs in Romania. Founder: Ioan Adrian Vitan. CatyAI is the production deployment where the Network AI Protocol runs against live merchant traffic. The infrastructure described here is auditable in real time at <a href="https://api.catyai.io/.well-known/jwks.json">api.catyai.io/.well-known/jwks.json</a>.</p>
              <p>Public key (active): <code>catyai-akl-signing-key-2026-v1</code> · Issuer: <code>catyai/payaix</code> · Algorithm: <code>EdDSA</code> per RFC 8037.</p>
              <p style={{ marginTop: '24px' }}>© 2026 PayAi-X FZE. This page contains no tracking. Source-readable, machine-readable, signature-verifiable.</p>
            </footer>
          </article>
        </main>
      </div>
      <FooterV9 lang={lang} />
    </>
  );
}
