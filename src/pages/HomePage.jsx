import { useState, useEffect } from 'react'
import AICarouselSection from './home/AICarouselSection'

const loadingPhrases = [
  'Initiating Neural Scan...',
  'Bypassing Client-Side JavaScript...',
  'Analyzing NAP Structure...',
  'Verifying Ed25519 Signatures...',
  'Calculating GEO Trust Score...'
]

const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--navy:#010A1F;--gold:#C8A165;--gold-light:#D4B57A;--gold-dark:#A68246}
body{background:#010A1F;color:#e8e4de;font-family:'Inter',sans-serif;overflow-x:hidden}
.glass-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(1,10,31,0.7);backdrop-filter:blur(12px);border-bottom:1px solid rgba(200,161,101,0.15);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px}
.badge-glow{display:inline-flex;align-items:center;gap:.5rem;padding:.35rem 1rem;border-radius:9999px;background:rgba(200,161,101,0.08);border:1px solid rgba(200,161,101,0.25);color:#D4B57A;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase}
.btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1.4rem;border-radius:8px;background:#C8A165;color:#010A1F;font-weight:700;font-size:.875rem;cursor:pointer;border:none;text-decoration:none;transition:background .2s}
.btn-primary:hover{background:#D4B57A}
.btn-secondary{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1.4rem;border-radius:8px;background:transparent;color:#C8A165;font-weight:600;font-size:.875rem;cursor:pointer;border:1px solid rgba(200,161,101,0.4);text-decoration:none;transition:all .2s}
.btn-secondary:hover{background:rgba(200,161,101,0.08)}
.stack-card{position:sticky;top:10vh;margin-bottom:20vh}
.stack-card-inner{background:rgba(255,255,255,0.03);border:1px solid rgba(200,161,101,0.12);border-radius:16px;padding:2.5rem;transform-origin:top center;transition:transform .1s linear}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
.reveal.visible{opacity:1;transform:none}
.hero-fullscreen{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:6rem 1.5rem 4rem;background:linear-gradient(180deg,rgba(1,10,31,0) 0%,rgba(1,10,31,0.85) 60%,rgba(1,10,31,1) 100%),url('/hero-neural-node.jpg') center/cover no-repeat fixed}
.hero-title{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(2.5rem,7vw,6rem);line-height:1.1;color:#fff;margin-bottom:1.5rem}
.hero-input{width:100%;padding:.875rem 1.25rem;background:rgba(1,10,31,0.6);border:1px solid rgba(200,161,101,0.3);border-radius:8px;color:#e8e4de;font-size:1rem;outline:none;transition:border-color .2s}
.hero-input:focus{border-color:#C8A165}
.card-product{background:rgba(255,255,255,0.03);border:1px solid rgba(200,161,101,0.12);border-radius:16px;padding:2rem;position:relative;transition:all .3s}
.card-product.popular{border-color:rgba(200,161,101,0.4);background:rgba(200,161,101,0.05)}
.card-product:hover{transform:translateY(-4px);border-color:rgba(200,161,101,0.35)}
.marquee-track{display:flex;gap:1.5rem;width:max-content;animation:marquee-scroll 40s linear infinite}
@keyframes marquee-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.review-card{flex:0 0 320px;background:rgba(255,255,255,0.03);border:1px solid rgba(200,161,101,0.12);border-radius:12px;padding:1.5rem}
details.faq-item{border:1px solid rgba(200,161,101,0.12);border-radius:12px;overflow:hidden;margin-bottom:.75rem}
details.faq-item summary{padding:1.25rem 1.5rem;cursor:pointer;font-weight:600;list-style:none;display:flex;justify-content:space-between;align-items:center}
details.faq-item summary::-webkit-details-marker{display:none}
details.faq-item summary::after{content:'+';color:#C8A165;font-size:1.25rem;font-weight:400}
details.faq-item[open] summary::after{content:'-'}
details.faq-item .faq-body{padding:0 1.5rem 1.25rem;color:rgba(232,228,222,0.7);line-height:1.7}
.token-card{background:rgba(255,255,255,0.03);border:1px solid rgba(200,161,101,0.12);border-radius:12px;overflow:hidden}
.footer-wordmark{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(3rem,10vw,8rem);color:transparent;-webkit-text-stroke:1px rgba(200,161,101,0.2);user-select:none;line-height:1;padding:1rem 0}
.industry-card{background:rgba(255,255,255,0.03);border:1px solid rgba(200,161,101,0.1);border-radius:12px;padding:1.5rem;transition:all .3s}
.industry-card:hover{border-color:rgba(200,161,101,0.3);background:rgba(200,161,101,0.05)}
@keyframes progress-bar{from{width:0}to{width:100%}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@media(max-width:768px){.nav-links,.nav-right{display:none}}
`

const products = [
  {href:'/qr-first',icon:'qr-code',name:'QR-First',tag:null,price:'€10',period:'/lună',desc:'Prezență AI pentru afaceri locale. QR smart, NAP structurat, crawling optimizat.',features:['QR cod inteligent','NAP verificat','Local AI indexing']},
  {href:'/web-widget',icon:'bot',name:'Web Widget',tag:'POPULAR',price:'€49',period:'/lună',desc:'Agent AI conversațional pe site-ul tău. Vânzări și suport 24/7.',features:['Chat AI personalizat','Lead capture','Integrare CRM']},
  {href:'/fraud-ai',icon:'shield',name:'FraudAI',tag:null,price:'GRATUIT',period:'',desc:'Detectare automată a recenziilor false și atacurilor reputaționale.',features:['Analiză în timp real','Rapoarte detaliate','Alertă instantă']},
  {href:'/geo-gateway',icon:'globe',name:'GEO Gateway',tag:'PRO+',price:'Custom',period:'',desc:'Infrastructură enterprise pentru prezența ta în ecosistemul AI global.',features:['Ed25519 signatures','Multi-region CDN','SLA 99.99%']},
]

const stackCards = [
  {icon:'eye',title:'Vizibilitate AI',desc:'Crawlerele AI indexează milioane de surse zilnic. CatyAI asigură că afacerea ta apare în răspunsurile generate de ChatGPT, Gemini și Perplexity.',stat:'3.2B',label:'căutări AI/zi procesate'},
  {icon:'check-circle',title:'Zero Halucinații',desc:'Informațiile incorecte despre afacerea ta în răspunsurile AI costă clienți. Verificăm și corectăm datele structurate în timp real.',stat:'99.7%',label:'acuratețe date verificate'},
  {icon:'trending-up',title:'Vânzări Automate',desc:'Agenții AI conversaționali captează lead-uri, răspund la întrebări și ghidează vizitatorii spre conversie — non-stop, fără intervenție umană.',stat:'4.8×',label:'ROI mediu clienți activi'},
  {icon:'shield-check',title:'Paza de Noapte',desc:'Monitorizare continuă a reputației tale în ecosistemul AI. Detectăm dezinformarea, recenziile false și atacurile reputaționale înainte să facă daune.',stat:'<15min',label:'timp mediu detecție amenințări'},
]

const reviews = [
  {name:'Ana M.',role:'Restaurant Aurora, Cluj',text:'De când folosesc CatyAI, restaurantul meu apare în recomandările ChatGPT când cineva întreabă de cel mai bun restaurant din Cluj.'},
  {name:'Bogdan P.',role:'Consultant IT, București',text:'FraudAI mi-a salvat reputația. A detectat o campanie de recenzii false înainte să ajungă pe Google.'},
  {name:'Maria S.',role:'Boutique Moda, Timișoara',text:'Clientele mele mă găsesc acum prin Perplexity și Gemini. Traficul a crescut cu 67% în 3 luni.'},
  {name:'Ion D.',role:'Cabinet Stomatologic, Iași',text:'Setup simplu, rezultate clare. În 2 săptămâni apaream în răspunsurile AI pentru "stomatolog Iași".'},
  {name:'Cristina L.',role:'Agenție Imobiliară, Brașov',text:'GEO Gateway ne-a dat infrastructura enterprise de care aveam nevoie. Recomandat pentru orice business serios.'},
]

const industries = [
  {icon:'utensils',name:'Restaurante & HoReCa',desc:'Recomandări locale AI, meniu structurat'},
  {icon:'stethoscope',name:'Sănătate & Medicină',desc:'Clinici vizibile în căutările medicale AI'},
  {icon:'building-2',name:'Imobiliare',desc:'Proprietăți indexate de asistenți AI'},
  {icon:'shopping-bag',name:'Retail & eCommerce',desc:'Produse recomandate de ChatGPT'},
  {icon:'briefcase',name:'Servicii Profesionale',desc:'Avocați, consultanți, experți contabili'},
  {icon:'car',name:'Auto & Transport',desc:'Dealeri și servicii auto în AI'},
  {icon:'graduation-cap',name:'Educație & Training',desc:'Cursuri recomandate de asistenți AI'},
  {icon:'landmark',name:'Turism & Travel',desc:'Destinații și servicii turistice AI-first'},
]

const faqs = [
  {q:'Ce este AI visibility și de ce contează?',a:'AI visibility reprezintă capacitatea afacerii tale de a apărea în răspunsurile generate de asistenți AI precum ChatGPT, Gemini sau Perplexity. Cu peste 3 miliarde de căutări AI zilnic, dacă nu ești optimizat, pierzi clienți în fiecare zi.',open:true},
  {q:'Cât durează până văd rezultate?',a:'Primele îmbunătățiri de indexare apar în 7-14 zile. Rezultate complete sunt vizibile în 30-60 de zile, în funcție de autoritatea domeniului și competiția din nișă.',open:false},
  {q:'CatyAI funcționează pentru afaceri mici?',a:'Absolut. QR-First a fost conceput special pentru afaceri locale și IMM-uri. La €10/lună, este cea mai accesibilă soluție de AI visibility din piață.',open:false},
  {q:'Cum protejează CatyAI reputația mea?',a:'FraudAI monitorizează continuu mențiunile afacerii tale pe platformele majore, detectând recenzii false, dezinformare și atacuri coordonate. Primești alerte în timp real și rapoarte săptămânale.',open:false},
  {q:'Este CatyAI conform cu GDPR și EU AI Act?',a:'Da. CatyAI este construit conform GDPR și EU AI Act 2024. Datele sunt procesate în data centere UE, nu vindem niciodată datele tale terților, iar toate deciziile AI sunt explicabile și auditabile.',open:false},
]

const tokens = [
  {label:'--navy',hex:'#010A1F',bg:'#010A1F',bordered:true},
  {label:'--gold',hex:'#C8A165',bg:'#C8A165',bordered:false},
  {label:'--gold-light',hex:'#D4B57A',bg:'#D4B57A',bordered:false},
  {label:'--gold-dark',hex:'#A68246',bg:'#A68246',bordered:false},
  {label:'surface',hex:'rgba(255,255,255,0.03)',bg:'rgba(255,255,255,0.03)',bordered:true},
]

const monoFont = {fontFamily:'JetBrains Mono,monospace'}
const mutedText = {color:'rgba(232,228,222,0.6)'}
const goldText = {color:'#C8A165'}

export default function HomePage() {
  const [formState, setFormState] = useState('idle')
  const [urlValue, setUrlValue] = useState('')
  const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0])
  const [scannedUrl, setScannedUrl] = useState('')

  useEffect(() => { if (window.lucide) window.lucide.createIcons() }, [formState])

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    reveals.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('.stack-card')
    const total = cards.length
    const handler = () => {
      cards.forEach((card, idx) => {
        const inner = card.querySelector('.stack-card-inner')
        if (!inner) return
        const rect = card.getBoundingClientRect()
        const distance = window.innerHeight * 0.10 - rect.top
        const baseScale = 1 - idx * 0.03
        if (distance > 0 && idx < total - 1) {
          inner.style.transform = `scale(${baseScale - Math.min(distance / (window.innerHeight * 0.5), 1) * 0.05})`
        } else {
          inner.style.transform = `scale(${baseScale})`
        }
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    handler()
    return () => { window.removeEventListener('scroll', handler); window.removeEventListener('resize', handler) }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (!urlValue) return
    setScannedUrl(urlValue)
    setFormState('loading')
    let idx = 0
    const iv = setInterval(() => { idx = (idx + 1) % loadingPhrases.length; setLoadingPhrase(loadingPhrases[idx]) }, 800)
    setTimeout(() => { clearInterval(iv); setFormState('result') }, 3500)
  }

  return (
    <div style={{background:'#010A1F',color:'#e8e4de',minHeight:'100vh',overflowX:'hidden'}}>
      <style>{css}</style>

      <nav className="glass-nav">
        <a href="/" style={{display:'flex',alignItems:'center',gap:'8px',textDecoration:'none'}}>
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#C8A165"/><path d="M12 28L20 12L28 28M15.5 22h9" stroke="#010A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{fontFamily:'"Playfair Display",serif',fontStyle:'italic',fontSize:'1.25rem',...goldText,fontWeight:700}}>CatyAI</span>
        </a>
        <div className="nav-links" style={{display:'flex',alignItems:'center',gap:'1.5rem',fontSize:'.9rem'}}>
          {[['Produse','/produse'],['Prețuri','/preturi'],['Blog','/blog'],['Trust','/trust'],['Docs','/docs']].map(([n,h]) =>
            <a key={n} href={h} style={{...mutedText,textDecoration:'none'}}>{n}</a>)}
        </div>
        <div className="nav-right" style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <select style={{background:'transparent',border:'1px solid rgba(200,161,101,0.2)',...mutedText,fontSize:'.8rem',padding:'4px 8px',borderRadius:'6px',cursor:'pointer'}}>
            <option>RO</option><option>EN</option><option>DE</option><option>FR</option><option>ES</option>
          </select>
          <a href="https://app.catyai.io" className="btn-secondary">Login</a>
          <a href="https://app.catyai.io/register" className="btn-primary">Începe gratuit</a>
        </div>
      </nav>

      <section className="hero-fullscreen" id="hero">
        <div className="badge-glow" style={{marginBottom:'1.5rem'}}>
          <i data-lucide="zap" style={{width:14,height:14}}></i>
          Crawlerele AI îți scanează site-ul chiar acum
        </div>
        <h1 className="hero-title">Fii Găsit de AI,<br/><span style={goldText}>Nu Ignorat</span></h1>
        <p style={{fontSize:'clamp(1rem,2vw,1.25rem)',...mutedText,maxWidth:'600px',marginBottom:'2.5rem',lineHeight:1.6}}>
          CatyAI optimizează prezența digitală a afacerii tale pentru crawlerele AI — ChatGPT, Gemini, Perplexity și Bingbot.
        </p>

        {formState === 'idle' && (
          <form onSubmit={handleSubmit} style={{width:'100%',maxWidth:'540px',display:'flex',flexDirection:'column',gap:'12px'}}>
            <input className="hero-input" type="url" placeholder="https://afacerea-ta.ro" value={urlValue} onChange={e => setUrlValue(e.target.value)} required />
            <button type="submit" className="btn-primary" style={{justifyContent:'center',padding:'.875rem'}}>
              <i data-lucide="scan" style={{width:18,height:18}}></i>
              Scanează gratuit
            </button>
          </form>
        )}

        {formState === 'loading' && (
          <div style={{width:'100%',maxWidth:'540px',background:'rgba(1,10,31,0.8)',border:'1px solid rgba(200,161,101,0.2)',borderRadius:'12px',padding:'1.5rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'1rem'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C8A165',animation:'pulse 1s infinite'}}></div>
              <span style={{fontSize:'.875rem',color:'#D4B57A',...monoFont}}>{loadingPhrase}</span>
            </div>
            <div style={{height:'4px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',overflow:'hidden'}}>
              <div style={{height:'100%',background:'linear-gradient(90deg,#C8A165,#D4B57A)',borderRadius:'2px',animation:'progress-bar 3.5s linear forwards'}}></div>
            </div>
          </div>
        )}

        {formState === 'result' && (
          <div style={{width:'100%',maxWidth:'540px',background:'rgba(1,10,31,0.8)',border:'1px solid rgba(200,161,101,0.3)',borderRadius:'12px',padding:'2rem',textAlign:'center'}}>
            <div style={{fontSize:'3rem',fontWeight:800,...goldText,marginBottom:'.5rem'}}>34<span style={{fontSize:'1.5rem'}}>/100</span></div>
            <p style={{...mutedText,marginBottom:'1.5rem'}}>Scor AI Visibility pentru <strong style={{color:'#D4B57A'}}>{scannedUrl}</strong></p>
            <a href="https://app.catyai.io/register" className="btn-primary" style={{justifyContent:'center',display:'flex'}}>Obține raportul complet gratuit</a>
          </div>
        )}

        <p style={{marginTop:'1.5rem',fontSize:'.75rem',color:'rgba(232,228,222,0.4)',display:'flex',alignItems:'center',gap:'6px'}}>
          <i data-lucide="shield-check" style={{width:14,height:14,color:'rgba(200,161,101,0.6)'}}></i>
          Fără card. Fără contract. GDPR compliant.
        </p>
      </section>

      <section style={{padding:'4rem 0',background:'rgba(0,0,0,0.3)'}}>
        <p style={{textAlign:'center',fontSize:'.75rem',letterSpacing:'.15em',textTransform:'uppercase',color:'rgba(200,161,101,0.5)',marginBottom:'2rem'}}>Monitorizat de crawlerele AI majore</p>
        <AICarouselSection />
      </section>

      <section style={{padding:'5rem 2rem',maxWidth:'1200px',margin:'0 auto'}} id="produse">
        <div style={{textAlign:'center',marginBottom:'3rem'}} className="reveal">
          <span className="badge-glow" style={{marginBottom:'1rem',display:'inline-flex'}}>Produse</span>
          <h2 style={{fontSize:'clamp(1.75rem,4vw,3rem)',fontWeight:800,marginBottom:'1rem'}}>Soluții pentru fiecare etapă</h2>
          <p style={{...mutedText,maxWidth:'500px',margin:'0 auto'}}>De la vizibilitate locală la protecție avansată împotriva fraudei AI.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'1.5rem'}}>
          {products.map(p => (
            <div key={p.name} className={`card-product${p.tag === 'POPULAR' ? ' popular' : ''}`}>
              {p.tag && <span style={{position:'absolute',top:'1rem',right:'1rem',background:'#C8A165',color:'#010A1F',fontSize:'.65rem',fontWeight:700,padding:'2px 8px',borderRadius:'4px'}}>{p.tag}</span>}
              <i data-lucide={p.icon} style={{width:32,height:32,...goldText,display:'block',marginBottom:'1rem'}}></i>
              <h3 style={{fontSize:'1.25rem',fontWeight:700,marginBottom:'.5rem'}}>{p.name}</h3>
              <p style={{fontSize:'.875rem',...mutedText,marginBottom:'1.25rem',lineHeight:1.5}}>{p.desc}</p>
              <div style={{marginBottom:'1.25rem'}}>
                <span style={{fontSize:'1.75rem',fontWeight:800,...goldText}}>{p.price}</span>
                <span style={{fontSize:'.875rem',color:'rgba(232,228,222,0.5)'}}>{p.period}</span>
              </div>
              <ul style={{listStyle:'none',marginBottom:'1.5rem',display:'flex',flexDirection:'column',gap:'.5rem'}}>
                {p.features.map(f => (
                  <li key={f} style={{fontSize:'.875rem',color:'rgba(232,228,222,0.7)',display:'flex',alignItems:'center',gap:'8px'}}>
                    <i data-lucide="check" style={{width:14,height:14,...goldText,flexShrink:0}}></i>{f}
                  </li>
                ))}
              </ul>
              <a href={p.href} className={p.tag === 'POPULAR' ? 'btn-primary' : 'btn-secondary'} style={{justifyContent:'center',display:'flex'}}>Află mai mult</a>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'5rem 2rem',maxWidth:'900px',margin:'0 auto'}} id="cum-functioneaza">
        <div style={{textAlign:'center',marginBottom:'3rem'}} className="reveal">
          <span className="badge-glow" style={{marginBottom:'1rem',display:'inline-flex'}}>Cum funcționează</span>
          <h2 style={{fontSize:'clamp(1.75rem,4vw,3rem)',fontWeight:800}}>Tehnologie care lucrează pentru tine</h2>
        </div>
        {stackCards.map((c, idx) => (
          <div key={c.title} className="stack-card" data-index={idx}>
            <div className="stack-card-inner">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.5rem'}}>
                <i data-lucide={c.icon} style={{width:40,height:40,...goldText}}></i>
                <span style={{fontSize:'.75rem',color:'rgba(200,161,101,0.5)',...monoFont}}>0{idx + 1}</span>
              </div>
              <h3 style={{fontSize:'1.75rem',fontWeight:800,marginBottom:'.75rem'}}>{c.title}</h3>
              <p style={{color:'rgba(232,228,222,0.65)',lineHeight:1.7,marginBottom:'1.5rem'}}>{c.desc}</p>
              <div style={{fontSize:'2rem',fontWeight:800,...goldText}}>{c.stat}</div>
              <div style={{fontSize:'.75rem',color:'rgba(232,228,222,0.5)'}}>{c.label}</div>
            </div>
          </div>
        ))}
      </section>

      <section style={{padding:'3rem 2rem',textAlign:'center'}} className="reveal">
        <div style={{display:'inline-flex',flexDirection:'column',alignItems:'center',gap:'1rem',padding:'2rem 3rem',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,161,101,0.15)',borderRadius:'16px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'2rem'}}>🇪🇺</span>
            <span style={{fontWeight:700,fontSize:'1.1rem'}}>EU AI Act Compliant</span>
          </div>
          <p style={{...mutedText,fontSize:'.875rem',maxWidth:'400px',lineHeight:1.6}}>CatyAI respectă pe deplin reglementările EU AI Act 2024. Transparență, explicabilitate și control uman garantate.</p>
          <a href="/trust" className="btn-secondary" style={{fontSize:'.8rem',display:'inline-flex',alignItems:'center',gap:'6px'}}>
            Trust Center <i data-lucide="arrow-right" style={{width:14,height:14}}></i>
          </a>
        </div>
      </section>

      <section style={{padding:'5rem 0',overflow:'hidden'}} className="reveal">
        <div style={{textAlign:'center',marginBottom:'2.5rem',padding:'0 2rem'}}>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2.5rem)',fontWeight:800,marginBottom:'.75rem'}}>Afaceri care deja sunt găsite de AI</h2>
          <p style={mutedText}>Peste 1,200 de companii din România și Europa</p>
        </div>
        <div style={{overflow:'hidden'}}>
          <div className="marquee-track">
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="review-card">
                <div style={{display:'flex',gap:'3px',marginBottom:'.75rem'}}>{[1,2,3,4,5].map(s => <span key={s} style={goldText}>★</span>)}</div>
                <p style={{fontSize:'.875rem',color:'rgba(232,228,222,0.8)',lineHeight:1.6,marginBottom:'1rem'}}>"{r.text}"</p>
                <div style={{fontWeight:600,fontSize:'.875rem'}}>{r.name}</div>
                <div style={{fontSize:'.75rem',color:'rgba(232,228,222,0.5)'}}>{r.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'5rem 2rem',maxWidth:'1200px',margin:'0 auto'}} className="reveal">
        <div style={{textAlign:'center',marginBottom:'3rem'}}>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2.5rem)',fontWeight:800,marginBottom:'.75rem'}}>Soluții pentru orice industrie</h2>
          <p style={mutedText}>Optimizat pentru specificul fiecărui sector</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1rem'}}>
          {industries.map(ind => (
            <div key={ind.name} className="industry-card">
              <i data-lucide={ind.icon} style={{width:28,height:28,...goldText,display:'block',marginBottom:'.75rem'}}></i>
              <h3 style={{fontSize:'1rem',fontWeight:700,marginBottom:'.25rem'}}>{ind.name}</h3>
              <p style={{fontSize:'.8rem',color:'rgba(232,228,222,0.55)'}}>{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'5rem 2rem',maxWidth:'780px',margin:'0 auto'}} id="faq" className="reveal">
        <div style={{textAlign:'center',marginBottom:'3rem'}}>
          <span className="badge-glow" style={{marginBottom:'1rem',display:'inline-flex'}}>FAQ</span>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2.5rem)',fontWeight:800}}>Întrebări frecvente</h2>
        </div>
        {faqs.map((item, i) => (
          <details key={i} className="faq-item" open={item.open || undefined}>
            <summary>{item.q}</summary>
            <div className="faq-body">{item.a}</div>
          </details>
        ))}
      </section>

      <section style={{padding:'5rem 2rem',textAlign:'center',background:'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(200,161,101,0.08) 0%,transparent 70%)'}} className="reveal">
        <h2 style={{fontSize:'clamp(2rem,5vw,4rem)',fontWeight:800,marginBottom:'1rem'}}>Pregătit să fii găsit de AI?</h2>
        <p style={{...mutedText,fontSize:'1.125rem',maxWidth:'500px',margin:'0 auto 2.5rem'}}>Alătură-te celor 1,200+ afaceri care domină căutările AI.</p>
        <a href="https://app.catyai.io/register" className="btn-primary" style={{fontSize:'1.125rem',padding:'1rem 2.5rem'}}>
          <i data-lucide="rocket" style={{width:20,height:20}}></i>
          Începe gratuit — fără card
        </a>
      </section>

      <section style={{padding:'4rem 2rem',maxWidth:'1100px',margin:'0 auto'}}>
        <p style={{fontSize:'.75rem',letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(200,161,101,0.4)',marginBottom:'1.5rem'}}>Design Tokens</p>
        <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
          {tokens.map(t => (
            <div key={t.label} className="token-card" style={{minWidth:'160px'}}>
              <div style={{height:'64px',background:t.bg,border:t.bordered ? '1px solid rgba(200,161,101,0.2)' : 'none'}}></div>
              <div style={{padding:'.75rem'}}>
                <div style={{fontSize:'.8rem',fontWeight:600,...monoFont,color:'#D4B57A'}}>{t.label}</div>
                <div style={{fontSize:'.7rem',color:'rgba(232,228,222,0.4)',...monoFont}}>{t.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{borderTop:'1px solid rgba(200,161,101,0.1)',paddingTop:'4rem'}}>
        <div style={{background:'rgba(200,161,101,0.04)',borderTop:'1px solid rgba(200,161,101,0.08)',borderBottom:'1px solid rgba(200,161,101,0.08)',padding:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem',maxWidth:'1200px',margin:'0 auto'}}>
          <div>
            <p style={{fontWeight:600,marginBottom:'.25rem'}}>Rămâi la curent cu AI visibility</p>
            <p style={{fontSize:'.875rem',color:'rgba(232,228,222,0.5)'}}>Ghiduri, studii de caz și actualizări ale algoritmilor AI — direct în inbox.</p>
          </div>
          <form style={{display:'flex',gap:'8px'}} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="email@afacerea.ro" style={{padding:'.6rem 1rem',background:'rgba(1,10,31,0.8)',border:'1px solid rgba(200,161,101,0.2)',borderRadius:'8px',color:'#e8e4de',fontSize:'.875rem',outline:'none',width:'220px'}}/>
            <button type="submit" className="btn-primary" style={{fontSize:'.875rem'}}>Abonează-te</button>
          </form>
        </div>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'3rem 2rem',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'2rem'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'1rem'}}>
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#C8A165"/><path d="M12 28L20 12L28 28M15.5 22h9" stroke="#010A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{fontFamily:'"Playfair Display",serif',fontStyle:'italic',...goldText,fontWeight:700}}>CatyAI</span>
            </div>
            <p style={{fontSize:'.8rem',color:'rgba(232,228,222,0.45)',lineHeight:1.6}}>Platforma #1 de AI visibility pentru afaceri din România și Europa.</p>
          </div>
          {[
            ['Produse',['QR-First','/qr-first'],['Web Widget','/web-widget'],['FraudAI','/fraud-ai'],['GEO Gateway','/geo-gateway']],
            ['Companie',['Despre noi','/about'],['Blog','/blog'],['Trust Center','/trust'],['Contact','/contact']],
            ['Resurse',['Documentație','/docs'],['API Reference','/api'],['Status','/status'],['Changelog','/changelog']],
            ['Legal',['Termeni & Condiții','/termeni'],['Politică Confidențialitate','/privacy'],['Cookie Policy','/cookies'],['GDPR','/gdpr']],
          ].map(([heading, ...links]) => (
            <div key={heading}>
              <p style={{fontSize:'.75rem',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(200,161,101,0.5)',marginBottom:'1rem'}}>{heading}</p>
              {links.map(([n, h]) => <a key={n} href={h} style={{display:'block',fontSize:'.875rem',color:'rgba(232,228,222,0.5)',textDecoration:'none',marginBottom:'.5rem'}}>{n}</a>)}
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',padding:'0 2rem',overflow:'hidden'}}>
          <p className="footer-wordmark">CatyAI</p>
        </div>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'1.5rem 2rem',borderTop:'1px solid rgba(200,161,101,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem',fontSize:'.75rem',color:'rgba(232,228,222,0.35)'}}>
          <span>© 2025 PayAi-X FZE, Dubai, UAE. Proprietary License.</span>
          <div style={{display:'flex',gap:'1rem'}}>
            <a href="https://linkedin.com/company/payai-x" style={{color:'rgba(232,228,222,0.35)',textDecoration:'none'}}>LinkedIn</a>
            <a href="https://medium.com/@adrianvitan" style={{color:'rgba(232,228,222,0.35)',textDecoration:'none'}}>Medium</a>
            <a href="mailto:contact@payai-x.com" style={{color:'rgba(232,228,222,0.35)',textDecoration:'none'}}>contact@payai-x.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
