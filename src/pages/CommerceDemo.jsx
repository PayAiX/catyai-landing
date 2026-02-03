import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

/**
 * CATY COMMERCE DEMO PAGE
 * Interactive demo showcasing the Walking Robot Avatar + Profiling
 * v1.1 - Mouse following + transparent assets
 */

const ASSETS_BASE = 'https://catyai.io/widget/commerce/assets'

const AVATAR_ASSETS = {
  idle: `${ASSETS_BASE}/caty-idle.png`,
  wave: `${ASSETS_BASE}/caty-wave.png`,
  talk: `${ASSETS_BASE}/caty-talk.png`,
  walk1: `${ASSETS_BASE}/caty-walk-1.png`,
  walk2: `${ASSETS_BASE}/caty-walk-2.png`,
  happy: `${ASSETS_BASE}/caty-happy.png`,
  think: `${ASSETS_BASE}/caty-think.png`,
  pointLeft: `${ASSETS_BASE}/caty-point-left.png`,
  pointRight: `${ASSETS_BASE}/caty-point-right.png`,
  sorry: `${ASSETS_BASE}/caty-sorry.png`
}

// Demo products
const DEMO_PRODUCTS = [
  { id: 1, name: 'Nike Air Max 90', price: '449 lei', category: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop' },
  { id: 2, name: 'Geaca Piele Neagra', price: '899 lei', category: 'Jachete', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop' },
  { id: 3, name: 'Tricou Oversized', price: '129 lei', category: 'Tricouri', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop' },
  { id: 4, name: 'Jeans Slim Fit', price: '299 lei', category: 'Pantaloni', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop' },
]

const translations = {
  en: {
    title: 'Caty Commerce',
    subtitle: 'AI Shopping Assistant with Walking Robot',
    badge: 'Coming Soon',
    backHome: 'Back to Home',
    features: {
      title: 'Features',
      avatar: { title: 'Walking Robot Avatar', desc: 'Animated character that walks around your store and interacts with products' },
      profiling: { title: 'Smart Profiling', desc: 'Learns customer preferences through conversational questions' },
      pointing: { title: 'Product Pointing', desc: 'Points at products and provides personalized recommendations' },
      exitIntent: { title: 'Exit Intent Discount', desc: 'Catches leaving visitors with special offers' }
    },
    demo: {
      title: 'Interactive Demo',
      subtitle: 'Click products or interact with Caty below',
      shopTitle: 'Demo Shop'
    },
    cta: {
      title: 'Want Caty Commerce for your store?',
      subtitle: 'Join the waitlist and be the first to know when it launches.',
      button: 'Join Waitlist',
      email: 'contact@payai-x.com'
    },
    avatar: {
      greeting: "Hi! I'm Caty! 👋 Click on a product and I'll tell you about it!",
      productClick: "Great choice! This would look amazing on you! 👍",
      exitIntent: "Wait! 🛑 Get 10% off with code CATY10! 🎁",
      thinking: "Let me think...",
      addedToCart: "Added to cart! Excellent choice! 🎉"
    }
  },
  ro: {
    title: 'Caty Commerce',
    subtitle: 'Asistent AI de Shopping cu Robot Animat',
    badge: 'In Curand',
    backHome: 'Inapoi la Home',
    features: {
      title: 'Functionalitati',
      avatar: { title: 'Robot Avatar Animat', desc: 'Personaj animat care se plimba prin magazin si interactioneaza cu produsele' },
      profiling: { title: 'Profilare Inteligenta', desc: 'Invata preferintele clientilor prin intrebari conversationale' },
      pointing: { title: 'Indicare Produse', desc: 'Indica produse si ofera recomandari personalizate' },
      exitIntent: { title: 'Discount la Plecare', desc: 'Capteaza vizitatorii care pleaca cu oferte speciale' }
    },
    demo: {
      title: 'Demo Interactiv',
      subtitle: 'Click pe produse sau interactioneaza cu Caty mai jos',
      shopTitle: 'Magazin Demo'
    },
    cta: {
      title: 'Vrei Caty Commerce pentru magazinul tau?',
      subtitle: 'Inscrie-te pe lista de asteptare si fii primul care afla cand se lanseaza.',
      button: 'Inscrie-te',
      email: 'contact@payai-x.com'
    },
    avatar: {
      greeting: 'Buna! Sunt Caty! 👋 Da click pe un produs si iti spun mai multe!',
      productClick: 'Super alegere! Ti-ar sta incredibil! 👍',
      exitIntent: 'Stai! 🛑 Ai 10% reducere cu codul CATY10! 🎁',
      thinking: 'Ma gandesc...',
      addedToCart: 'Adaugat in cos! Excelenta alegere! 🎉'
    }
  }
}

// Walking Avatar Component with movement
function WalkingAvatar({ message, buttons, state, onButtonClick, position, direction, size = 160 }) {
  const [sprite, setSprite] = useState(AVATAR_ASSETS.idle)
  const [walkFrame, setWalkFrame] = useState(1)

  useEffect(() => {
    let interval
    if (state === 'walking') {
      interval = setInterval(() => {
        setWalkFrame(f => f === 1 ? 2 : 1)
      }, 180)
    }
    return () => clearInterval(interval)
  }, [state])

  useEffect(() => {
    switch(state) {
      case 'walking': setSprite(walkFrame === 1 ? AVATAR_ASSETS.walk1 : AVATAR_ASSETS.walk2); break
      case 'talking': setSprite(AVATAR_ASSETS.talk); break
      case 'waving': setSprite(AVATAR_ASSETS.wave); break
      case 'happy': setSprite(AVATAR_ASSETS.happy); break
      case 'thinking': setSprite(AVATAR_ASSETS.think); break
      case 'sorry': setSprite(AVATAR_ASSETS.sorry); break
      case 'pointing': setSprite(direction === 'left' ? AVATAR_ASSETS.pointLeft : AVATAR_ASSETS.pointRight); break
      default: setSprite(AVATAR_ASSETS.idle)
    }
  }, [state, walkFrame, direction])

  return (
    <div
      className="caty-avatar-container"
      style={{
        position: 'fixed',
        left: position.x,
        bottom: position.y,
        zIndex: 2147483646,
        transition: state === 'walking' ? 'none' : 'left 0.3s ease, bottom 0.3s ease',
      }}
    >
      {/* Speech Bubble */}
      {message && (
        <div
          className="caty-bubble"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '15px',
            background: 'white',
            borderRadius: '20px',
            padding: '16px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
            minWidth: '280px',
            maxWidth: '350px',
            zIndex: 2147483647,
          }}
        >
          <p style={{
            color: '#333',
            textAlign: 'center',
            fontSize: '15px',
            lineHeight: 1.5,
            margin: 0
          }}>{message}</p>
          {buttons && buttons.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
              justifyContent: 'center'
            }}>
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => onButtonClick(btn.action)}
                  style={{
                    padding: '10px 18px',
                    background: '#f0f0f0',
                    color: '#333',
                    border: '2px solid #e0e0e0',
                    borderRadius: '25px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = '#00d4ff'
                    e.target.style.color = 'white'
                    e.target.style.borderColor = '#00d4ff'
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = '#f0f0f0'
                    e.target.style.color = '#333'
                    e.target.style.borderColor = '#e0e0e0'
                  }}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '12px solid white',
          }} />
        </div>
      )}

      {/* Thinking Dots */}
      {state === 'thinking' && (
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '5px',
        }}>
          <span className="thinking-dot" style={{ animationDelay: '0s' }} />
          <span className="thinking-dot" style={{ animationDelay: '0.2s' }} />
          <span className="thinking-dot" style={{ animationDelay: '0.4s' }} />
        </div>
      )}

      {/* Confetti for happy state */}
      {state === 'happy' && (
        <span className="confetti-emoji">🎉</span>
      )}

      {/* Avatar Sprite */}
      <img
        src={sprite}
        alt="Caty AI Assistant"
        className={`caty-sprite caty-sprite-${state}`}
        style={{
          width: size,
          height: 'auto',
          transform: direction === 'left' && state !== 'pointing' ? 'scaleX(-1)' : 'scaleX(1)',
          filter: 'drop-shadow(0 8px 25px rgba(0, 212, 255, 0.5))',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

// Product Card Component
function ProductCard({ product, onSelect, isSelected, cardRef }) {
  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(product)}
      className={`cursor-pointer rounded-xl overflow-hidden bg-gray-800/50 border-2 transition-all hover:scale-105 hover:shadow-xl ${
        isSelected ? 'border-primary-500 shadow-lg shadow-primary-500/20' : 'border-gray-700 hover:border-gray-600'
      }`}
      data-product-id={product.id}
    >
      <div className="aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="font-semibold text-white mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-primary-400 font-bold">{product.price}</span>
          <button className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white text-xs rounded-full transition-colors">
            Adauga
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Demo Component
export default function CommerceDemo() {
  const lang = localStorage.getItem('caty-lang') || 'ro'
  const t = translations[lang] || translations.ro

  const [avatarState, setAvatarState] = useState('idle')
  const [message, setMessage] = useState('')
  const [buttons, setButtons] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [direction, setDirection] = useState('right')

  // Avatar position state
  const [position, setPosition] = useState({ x: 100, y: 50 })
  const [isWalking, setIsWalking] = useState(false)
  const walkingRef = useRef(false)
  const targetRef = useRef({ x: 100, y: 50 })
  const animationRef = useRef(null)

  // Product refs for walking to them
  const productRefs = useRef({})

  // Walking animation
  const walkTo = useCallback((targetX, targetY, onComplete) => {
    if (walkingRef.current) return

    walkingRef.current = true
    setIsWalking(true)
    setAvatarState('walking')

    const startX = position.x
    const startY = position.y
    const distance = Math.sqrt(Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2))

    if (distance < 20) {
      walkingRef.current = false
      setIsWalking(false)
      setAvatarState('idle')
      if (onComplete) onComplete()
      return
    }

    // Set direction
    setDirection(targetX > startX ? 'right' : 'left')

    const duration = distance * 4 // Speed
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const newX = startX + (targetX - startX) * easeOut
      const newY = startY + (targetY - startY) * easeOut

      setPosition({ x: newX, y: newY })

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        walkingRef.current = false
        setIsWalking(false)
        setAvatarState('idle')
        if (onComplete) onComplete()
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [position])

  // Follow mouse cursor continuously
  const lastMousePos = useRef({ x: 0, y: 0 })
  const followTimeout = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY }

      // Exit intent - near top of page
      if (e.clientY < 50 && !message && !walkingRef.current) {
        const targetX = Math.max(50, Math.min(window.innerWidth - 200, e.clientX - 80))
        walkTo(targetX, 100, () => {
          setAvatarState('sorry')
          showMessage(
            t.avatar.exitIntent,
            [
              { text: 'Raman! 😊', action: 'stay' },
              { text: 'Data viitoare', action: 'dismiss' }
            ]
          )
        })
        return
      }

      // Follow mouse with slight delay (debounce)
      if (!message && !walkingRef.current) {
        clearTimeout(followTimeout.current)
        followTimeout.current = setTimeout(() => {
          if (!message && !walkingRef.current) {
            // Calculate target position near mouse
            const targetX = Math.max(50, Math.min(window.innerWidth - 200, e.clientX - 80))
            const targetY = Math.max(30, Math.min(200, window.innerHeight - e.clientY - 100))

            // Only walk if mouse moved significantly
            const distance = Math.sqrt(
              Math.pow(targetX - position.x, 2) +
              Math.pow(targetY - position.y, 2)
            )

            if (distance > 100) {
              walkTo(targetX, targetY)
            }
          }
        }, 300)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(followTimeout.current)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [message, t, position, walkTo])

  const showMessage = (msg, btns = [], state = 'talking', duration = 0) => {
    setMessage(msg)
    setButtons(btns)
    if (state) setAvatarState(state)

    if (duration > 0) {
      setTimeout(() => {
        setMessage('')
        setButtons([])
        setAvatarState('idle')
      }, duration)
    }
  }

  const handleButtonClick = (action) => {
    if (action === 'start_profiling') {
      startProfiling()
    } else if (action === 'skip_profiling') {
      showMessage('', [], 'idle')
    } else if (action === 'set_gender_m' || action === 'set_gender_f') {
      askSize()
    } else if (action === 'set_size_s' || action === 'set_size_m' || action === 'set_size_l') {
      askStyle()
    } else if (action === 'set_style_casual' || action === 'set_style_elegant' || action === 'set_style_sport') {
      completeProfile()
    } else if (action === 'add_to_cart') {
      addToCart()
    } else if (action === 'keep_browsing') {
      showMessage('', [], 'idle')
    } else if (action === 'stay') {
      setAvatarState('happy')
      showMessage('🎉 Super! Hai sa gasim ceva perfect pentru tine!', [], 'happy', 3000)
    } else if (action === 'dismiss') {
      showMessage('', [], 'waving')
      setTimeout(() => setAvatarState('idle'), 2000)
    }
  }

  const startProfiling = () => {
    showMessage(
      'Pentru cine cumperi? 🛍️',
      [
        { text: '👨 Barbati', action: 'set_gender_m' },
        { text: '👩 Femei', action: 'set_gender_f' }
      ],
      'talking'
    )
  }

  const askSize = () => {
    showMessage(
      'Ce marime porti? 📏',
      [
        { text: 'S', action: 'set_size_s' },
        { text: 'M', action: 'set_size_m' },
        { text: 'L', action: 'set_size_l' }
      ],
      'talking'
    )
  }

  const askStyle = () => {
    showMessage(
      'Ce stil preferi? 👔',
      [
        { text: '😎 Casual', action: 'set_style_casual' },
        { text: '🎩 Elegant', action: 'set_style_elegant' },
        { text: '🏃 Sport', action: 'set_style_sport' }
      ],
      'talking'
    )
  }

  const completeProfile = () => {
    setAvatarState('thinking')
    setMessage(t.avatar.thinking)
    setButtons([])

    setTimeout(() => {
      setAvatarState('happy')
      showMessage(
        '🎉 Profilul tau e gata! Acum iti pot arata produse perfecte pentru tine!',
        [],
        'happy',
        3000
      )
    }, 1500)
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)

    // Walk to the product
    const productEl = productRefs.current[product.id]
    if (productEl) {
      const rect = productEl.getBoundingClientRect()
      const targetX = Math.max(50, rect.left - 100)
      const targetY = Math.max(30, window.innerHeight - rect.bottom - 50)

      walkTo(targetX, targetY, () => {
        setDirection('right')
        setAvatarState('pointing')
        showMessage(
          `${product.name} - ${product.price} - ${t.avatar.productClick}`,
          [
            { text: '🛒 Adauga in cos', action: 'add_to_cart' },
            { text: '👀 Mai vreau sa vad', action: 'keep_browsing' }
          ],
          'pointing'
        )
      })
    }
  }

  const addToCart = () => {
    setAvatarState('happy')
    showMessage(t.avatar.addedToCart, [], 'happy', 3000)
    setSelectedProduct(null)
  }

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarState('waving')
      showMessage(
        'Buna! 👋 Sunt Caty! Hai sa-ti creez profilul pentru recomandari personalizate!',
        [
          { text: '🚀 Hai sa incepem!', action: 'start_profiling' },
          { text: 'Vreau sa explorez', action: 'skip_profiling' }
        ],
        'waving'
      )
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Custom animations */}
      <style>{`
        .thinking-dot {
          width: 10px;
          height: 10px;
          background: #00d4ff;
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .confetti-emoji {
          position: absolute;
          top: -40px;
          left: 50%;
          font-size: 36px;
          animation: confettiPop 0.8s ease-out forwards;
          pointer-events: none;
        }
        @keyframes confettiPop {
          0% { opacity: 0; transform: translateX(-50%) scale(0) rotate(0deg); }
          50% { opacity: 1; transform: translateX(-50%) translateY(-30px) scale(1.3) rotate(15deg); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-80px) scale(0.8) rotate(-10deg); }
        }

        .caty-sprite {
          transition: transform 0.15s ease;
        }
        .caty-sprite-idle {
          animation: breathe 3s ease-in-out infinite;
        }
        .caty-sprite-walking {
          animation: walkBounce 0.35s ease-in-out infinite;
        }
        .caty-sprite-talking, .caty-sprite-waving {
          animation: talkWiggle 0.5s ease-in-out infinite;
        }
        .caty-sprite-happy {
          animation: happyJump 0.4s ease-in-out infinite;
        }
        .caty-sprite-thinking {
          animation: thinkTilt 2s ease-in-out infinite;
        }
        .caty-sprite-sorry {
          animation: sorryDroop 2s ease-in-out infinite;
        }
        .caty-sprite-pointing {
          animation: pointPulse 1s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% { transform: translateY(0) scaleX(var(--direction, 1)); }
          50% { transform: translateY(-8px) scaleX(var(--direction, 1)); }
        }
        @keyframes walkBounce {
          0%, 100% { transform: translateY(0) rotate(0deg) scaleX(var(--direction, 1)); }
          50% { transform: translateY(-6px) rotate(3deg) scaleX(var(--direction, 1)); }
        }
        @keyframes talkWiggle {
          0%, 100% { transform: rotate(0deg) scaleX(var(--direction, 1)); }
          25% { transform: rotate(4deg) scaleX(var(--direction, 1)); }
          75% { transform: rotate(-4deg) scaleX(var(--direction, 1)); }
        }
        @keyframes happyJump {
          0%, 100% { transform: translateY(0) scale(1) scaleX(var(--direction, 1)); }
          50% { transform: translateY(-25px) scale(1.1) scaleX(var(--direction, 1)); }
        }
        @keyframes thinkTilt {
          0%, 100% { transform: rotate(0deg) scaleX(var(--direction, 1)); }
          50% { transform: rotate(-8deg) scaleX(var(--direction, 1)); }
        }
        @keyframes sorryDroop {
          0%, 100% { transform: translateY(0) scaleX(var(--direction, 1)); }
          50% { transform: translateY(5px) scaleX(var(--direction, 1)); }
        }
        @keyframes pointPulse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }

        .caty-avatar-container {
          animation: avatarEntrance 0.6s ease-out;
        }
        @keyframes avatarEntrance {
          0% { opacity: 0; transform: translateY(60px) scale(0.5); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .caty-bubble {
          animation: bubbleIn 0.3s ease-out;
        }
        @keyframes bubbleIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(15px) scale(0.9); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t.title}</span>
          </h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </div>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{t.features.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold text-white mb-2">{t.features.avatar.title}</h3>
              <p className="text-gray-400 text-sm">{t.features.avatar.desc}</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="font-semibold text-white mb-2">{t.features.profiling.title}</h3>
              <p className="text-gray-400 text-sm">{t.features.profiling.desc}</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-3">👆</div>
              <h3 className="font-semibold text-white mb-2">{t.features.pointing.title}</h3>
              <p className="text-gray-400 text-sm">{t.features.pointing.desc}</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-semibold text-white mb-2">{t.features.exitIntent.title}</h3>
              <p className="text-gray-400 text-sm">{t.features.exitIntent.desc}</p>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{t.demo.title}</h2>
            <p className="text-gray-400">{t.demo.subtitle}</p>
          </div>

          <div className="card p-8">
            {/* Demo Shop */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">{t.demo.shopTitle}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DEMO_PRODUCTS.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleProductSelect}
                    isSelected={selectedProduct?.id === product.id}
                    cardRef={el => productRefs.current[product.id] = el}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t.cta.title}</h2>
            <p className="text-gray-400 mb-6">{t.cta.subtitle}</p>
            <a
              href={`mailto:${t.cta.email}?subject=Caty Commerce Waitlist`}
              className="btn-primary px-8 py-3 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.cta.button}
            </a>
          </div>
        </section>
      </div>

      {/* Walking Avatar - Fixed position on screen */}
      <WalkingAvatar
        message={message}
        buttons={buttons}
        state={avatarState}
        onButtonClick={handleButtonClick}
        position={position}
        direction={direction}
        size={160}
      />

      {/* Back link */}
      <Link
        to="/"
        className="fixed bottom-6 left-6 z-40 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {t.backHome}
      </Link>
    </div>
  )
}
