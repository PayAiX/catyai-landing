/**
 * Caty E-Commerce Widget v6.0 - NEURAL SENTIENCE EDITION
 *
 * MODUL 1: Sales Assistant + Profiling
 * MODUL 2: Neural Sentience Avatar (Canvas)
 * MODUL 3: Support Chat + Human Escalation
 * MODUL 4: Voice Synthesis (warm feminine)
 *
 * FEATURES:
 * - Neural Sentience canvas avatar (replaces PNG)
 * - Voice synthesis with warm feminine voice
 * - Glassmorphism bubbles integrated with site CSS
 * - Mobile-optimized (no overlap with chat widget)
 * - Profiling rapid pentru recomandari
 * - Teleportare, laser, particule
 * - Confetti la add to cart
 */

(function() {
  'use strict';

  const scriptTag = document.currentScript || document.querySelector('script[data-api-key][src*="commerce"]');
  const CONFIG = {
    apiKey: scriptTag?.getAttribute('data-api-key') || '',
    baseUrl: scriptTag?.getAttribute('data-base-url') || 'https://api.catyai.io',
    position: scriptTag?.getAttribute('data-position') || 'bottom-right',
    primaryColor: scriptTag?.getAttribute('data-primary-color') || '#3b82f6',
    language: scriptTag?.getAttribute('data-language') || 'ro',
    avatarSize: parseInt(scriptTag?.getAttribute('data-avatar-size') || '200'),

    // Persona name - from data attribute or API config (loaded dynamically)
    personaName: scriptTag?.getAttribute('data-persona-name') || '',

    // Timings
    greetingDelay: 2000,           // 2s dupa page load
    walkIntervalMin: 8000,         // min 8s intre plimbari
    walkIntervalMax: 15000,        // max 15s intre plimbari
    profilingStartDelay: 5000,     // 5s pana la profiling

    // Exit intent
    exitIntentDiscount: 'CATY10',
    exitIntentPercent: 10,

    // Product selector (auto-detected by platform, fallback below)
    productSelector: '[data-product-id], .product-card, .product',
    addToCartSelector: '.add-to-cart, [data-action="add-to-cart"]',
    priceSelector: '.product-price, .price',
    nameSelector: '.product-name, h2, h3',

    // Support chat - DISABLED when chat widget is also loaded (handled by loader)
    disableSupportChat: true,
    idleSupportDelay: 20000,
    supportEmail: 'support@catyai.io',
    supportPhone: '+40 XXX XXX XXX',
    whatsappNumber: scriptTag?.getAttribute('data-whatsapp') || '',
  };

  // ============================================
  // Translations (persona name injected dynamically)
  // ============================================
  function getPersonaName() {
    return CONFIG.personaName || 'Caty';
  }

  const translations = {
    ro: {
      get greeting() { return `Bună! Sunt ${getPersonaName()}! Hai să-ți găsesc ceva perfect pentru tine!`; },
      startProfiling: 'Hai să începem!',
      skipProfiling: 'Vreau să explorez singur',

      // Profiling questions
      profiling: {
        q1: 'Pentru cine cumpărați?',
        q1_options: ['Bărbați', 'Femei', 'Ambele'],

        q2: 'Ce mărime purtați?',
        q2_options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

        q3: 'Ce culori vă plac?',
        q3_options: [
          { name: 'Negru', hex: '#1a1a1a' },
          { name: 'Alb', hex: '#ffffff' },
          { name: 'Albastru', hex: '#3b82f6' },
          { name: 'Rosu', hex: '#ef4444' },
          { name: 'Verde', hex: '#22c55e' },
          { name: 'Maro', hex: '#92400e' },
          { name: 'Gri', hex: '#6b7280' },
          { name: 'Bej', hex: '#d4b896' },
          { name: 'Roz', hex: '#ec4899' },
          { name: 'Mov', hex: '#a855f7' },
          { name: 'Portocaliu', hex: '#f97316' },
          { name: 'Galben', hex: '#eab308' },
        ],

        q4: 'Ce stil preferați?',
        q4_options: ['Casual', 'Elegant', 'Sport', 'Boho', 'Minimalist'],

        q5: 'Ce buget aveți în vedere?',
        q5_options: ['Sub 100 lei', '100-300 lei', '300-500 lei', 'Peste 500 lei'],

        q6: 'Căutați ceva anume?',
        q6_options: [
          { id: 'sneakers', icon: '👟', label: 'Încălțăminte' },
          { id: 'tricouri', icon: '👕', label: 'Tricouri' },
          { id: 'pantaloni', icon: '👖', label: 'Pantaloni' },
          { id: 'rochii', icon: '👗', label: 'Rochii' },
          { id: 'geci', icon: '🧥', label: 'Geci și Jachete' },
          { id: 'accesorii', icon: '👜', label: 'Accesorii' },
          { id: 'all', icon: '🛍️', label: 'Vreau să văd tot' },
        ],

        complete: 'Perfect! Acum știu exact ce să vă recomand!',
        searching: 'Caut produsele perfecte pentru dumneavoastră...',
        foundProducts: 'Am găsit {count} produse care vi se potrivesc!',
        noProducts: 'Hmm, nu am găsit produse cu aceste criterii. Permiteți-mi să vă arăt ce avem!',
      },

      // Product interactions
      productClick: 'Excelentă alegere!',
      addToCartPrompt: 'Doriți să-l adăugați în coș?',
      addToCart: 'Adaugă în coș',
      keepBrowsing: 'Mai vreau să văd',
      addedToCart: 'Excelentă alegere! Am adăugat în coș!',

      // Recommendations
      foundProduct: 'Uitați ce am găsit pentru dumneavoastră!',
      matchScore: 'potrivire',

      // Exit intent
      exitIntent: 'Stați! Nu plecați încă!',
      exitIntentOffer: `Aveți ${CONFIG.exitIntentPercent}% reducere cu codul`,
      stayButton: 'Rămân!',
      leaveButton: 'Data viitoare',

      // Random walking messages
      walkingMessages: [
        'Hmm, să vedem ce avem pe aici...',
        'Oare ce v-ar plăcea?',
        'Hai să vedem ce vă pot recomanda...',
        'Am găsit ceva interesant!',
        'Permiteți-mi să vă arăt ceva!',
      ],

      // Idle messages (shown only when user clicks on avatar)
      idleMessages: [
        'Cu ce vă pot ajuta?',
        'Căutați ceva anume? Vă pot recomanda.',
        'Sunt la dispoziția dumneavoastră.',
        'Spuneți-mi ce produse vă interesează și vă ajut.',
      ],

      compliments: [
        'Aveți gusturi rafinate!',
        'Văd că știți ce doriți!',
        'Excelentă alegere, aveți stil!',
        'Îmi place cum gândiți!',
        'Aveți un ochi bun pentru calitate!',
      ],

      // MODUL 3: Support Chat
      support: {
        title: 'Suport Clienți',
        subtitle: 'Cu ce vă pot ajuta?',
        categories: [
          { id: 'returns', icon: '📦', label: 'Retururi și Schimburi', desc: 'Vreau să returnez un produs' },
          { id: 'warranty', icon: '🛡️', label: 'Garanții și Reclamații', desc: 'Am o problemă cu produsul' },
          { id: 'tracking', icon: '🚚', label: 'Status Comandă', desc: 'Unde este comanda mea?' },
          { id: 'delivery', icon: '📍', label: 'Probleme Livrare', desc: 'Comanda nu a ajuns' },
          { id: 'other', icon: '💬', label: 'Altceva', desc: 'Altă întrebare' },
        ],
        responses: {
          returns: 'Pentru retururi, aveți la dispoziție 14 zile de la primirea coletului. Produsul trebuie să fie în ambalajul original, nefolosit. Doriți să inițiez un retur?',
          warranty: 'Produsele noastre au garanție 24 de luni. Descrieți problema și vă vom ajuta. Aveți numărul comenzii la îndemână?',
          tracking: 'Pentru a verifica statusul comenzii, am nevoie de numărul comenzii sau emailul folosit. Îl aveți?',
          delivery: 'Îmi pare rău pentru inconvenient! Haideți să verificăm împreună. Care este numărul comenzii?',
          other: 'Sunt aici să vă ajut! Scrieți-mi întrebarea și voi face tot posibilul să găsesc o soluție.',
        },
        inputPlaceholder: 'Scrieți mesajul dumneavoastră...',
        sendButton: 'Trimite',
        humanEscalation: 'Vorbiți cu un agent',
        humanEscalationDesc: 'Un coleg uman vă va răspunde în câteva minute',
        humanConnecting: 'Vă conectez cu un agent...',
        humanConnected: 'Sunteți conectat cu un agent. Vă rugăm să așteptați răspunsul.',
        backToCategories: '← Înapoi la categorii',
        suggestSupport: 'Aveți nevoie de ajutor? Deschideți chatul de suport!',
        openChat: '💬 Deschide Chat Suport',
      },
    },
    en: {
      get greeting() { return `Hi! I'm ${getPersonaName()}! Let me find something perfect for you!`; },
      startProfiling: 'Let\'s start!',
      skipProfiling: 'I want to explore myself',

      profiling: {
        q1: 'Who are you shopping for?',
        q1_options: ['Men', 'Women', 'Both'],

        q2: 'What size do you wear?',
        q2_options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

        q3: 'What colors do you like?',
        q3_options: [
          { name: 'Black', hex: '#1a1a1a' },
          { name: 'White', hex: '#ffffff' },
          { name: 'Blue', hex: '#3b82f6' },
          { name: 'Red', hex: '#ef4444' },
          { name: 'Green', hex: '#22c55e' },
          { name: 'Brown', hex: '#92400e' },
          { name: 'Gray', hex: '#6b7280' },
          { name: 'Beige', hex: '#d4b896' },
          { name: 'Pink', hex: '#ec4899' },
          { name: 'Purple', hex: '#a855f7' },
          { name: 'Orange', hex: '#f97316' },
          { name: 'Yellow', hex: '#eab308' },
        ],

        q4: 'What style do you prefer?',
        q4_options: ['Casual', 'Elegant', 'Sport', 'Boho', 'Minimalist'],

        q5: 'What\'s your budget?',
        q5_options: ['Under $50', '$50-150', '$150-300', 'Over $300'],

        q6: 'Looking for something specific?',
        q6_options: [
          { id: 'sneakers', icon: '👟', label: 'Footwear' },
          { id: 'tricouri', icon: '👕', label: 'T-Shirts' },
          { id: 'pantaloni', icon: '👖', label: 'Pants' },
          { id: 'rochii', icon: '👗', label: 'Dresses' },
          { id: 'geci', icon: '🧥', label: 'Jackets' },
          { id: 'accesorii', icon: '👜', label: 'Accessories' },
          { id: 'all', icon: '🛍️', label: 'Show me everything' },
        ],

        complete: 'Perfect! Now I know exactly what to recommend!',
        searching: 'Searching for your perfect products...',
        foundProducts: 'Found {count} products that match your style!',
        noProducts: 'Hmm, no products match these criteria. Let me show you what we have!',
      },

      productClick: 'Great choice!',
      addToCartPrompt: 'Add to cart?',
      addToCart: 'Add to cart',
      keepBrowsing: 'Keep browsing',
      addedToCart: 'Excellent choice! Added to cart!',

      foundProduct: 'Look what I found for you!',
      matchScore: 'match for you',

      exitIntent: 'Wait! Don\'t leave yet!',
      exitIntentOffer: `Get ${CONFIG.exitIntentPercent}% off with code`,
      stayButton: 'I\'ll stay!',
      leaveButton: 'Maybe later',

      walkingMessages: [
        'Hmm, what do we have here...',
        'What would you like?',
        'Let me see...',
        'Found something interesting!',
        'Let me show you this!',
      ],

      idleMessages: [
        'Need any help?',
        'Can I help you with something?',
        'Looking for something specific?',
        'Ask me anything!',
      ],

      compliments: [
        'Wow, you have refined taste! 😍',
        'I see you know what you want! 👏',
        'Excellent choice, you have style! ✨',
        'I like how you think! 🎯',
        'You have a good eye for quality! 👁️',
      ],

      // MODUL 3: Support Chat
      support: {
        title: 'Customer Support',
        subtitle: 'How can I help you?',
        categories: [
          { id: 'returns', icon: '📦', label: 'Returns & Exchanges', desc: 'I want to return a product' },
          { id: 'warranty', icon: '🛡️', label: 'Warranty & Claims', desc: 'I have a product issue' },
          { id: 'tracking', icon: '🚚', label: 'Order Status', desc: 'Where is my order?' },
          { id: 'delivery', icon: '📍', label: 'Delivery Issues', desc: 'Order not delivered' },
          { id: 'other', icon: '💬', label: 'Other', desc: 'Other question' },
        ],
        responses: {
          returns: 'For returns, you have 14 days from delivery. The product must be in original packaging, unused. Would you like to initiate a return?',
          warranty: 'Our products have a 24-month warranty. Describe the issue and we will help. Do you have the order number?',
          tracking: 'To check order status, I need the order number or email used. Do you have it?',
          delivery: 'Sorry for the inconvenience! Let\'s check together. What is the order number?',
          other: 'I\'m here to help! Write your question and I will do my best to find a solution.',
        },
        inputPlaceholder: 'Type your message...',
        sendButton: 'Send',
        humanEscalation: 'Talk to an agent',
        humanEscalationDesc: 'A human colleague will respond in a few minutes',
        humanConnecting: 'Connecting you with an agent...',
        humanConnected: 'You are connected with an agent. Please wait for a response.',
        backToCategories: '← Back to categories',
        suggestSupport: 'Need help? Open the support chat!',
        openChat: '💬 Open Support Chat',
      },
    }
  };

  const t = translations[CONFIG.language] || translations.ro;

  // ============================================
  // NEURAL PULSE - Neuromarketing Edition
  // Blue-turquoise solid background + aggressive pulsing for maximum attention
  // ============================================
  const NEURAL = {
    // Turquoise-blue neuromarketing palette
    bgColors: {
      inner: '#003a5c',   // deep ocean core
      mid:   '#005f8a',   // electric ocean
      outer: '#007ab8',   // vivid turquoise-blue border
    },
    moodColors: {
      idle:       '#00e5ff',  // electric cyan
      talk:       '#00ffea',  // neon turquoise
      wave:       '#00ffd0',  // mint flash
      happy:      '#00ff99',  // vivid green
      think:      '#aa55ff',  // neural purple
      sorry:      '#ff8800',  // alert orange
      walk:       '#00bbff',  // sky pulse
      pointLeft:  '#00bbff',
      pointRight: '#00bbff',
    }
  };

  /**
   * Neural Pulse Renderer - Mission Impossible AI Interface
   * Central pulsing core, expanding radar rings, holographic scan,
   * particle field, heartbeat wave
   */
  class NeuralSentience {
    constructor(size) {
      this.size = size;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas = document.createElement('canvas');
      this.canvas.width = size * this.dpr;
      this.canvas.height = size * this.dpr;
      this.canvas.style.width = size + 'px';
      this.canvas.style.height = size + 'px';
      this.canvas.style.borderRadius = '50%';
      this.ctx = this.canvas.getContext('2d');
      this.time = 0;
      this.mood = 'idle';
      this.intensity = 0.5;
      this.targetIntensity = 0.5;
      this.animFrame = null;
      this._destroyed = false;

      // Expanding pulse rings (radar)
      this.pulseRings = [];
      // Floating particles
      this.particles = [];
      // Heartbeat wave points
      this.heartbeat = [];

      this.initParticles();
      this.animate();
    }

    initParticles() {
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 10 + Math.random() * (this.size * 0.45);
        this.particles.push({
          angle, dist,
          baseAngle: angle,
          speed: (0.002 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : -1),
          size: 0.5 + Math.random() * 1.5,
          brightness: 0.3 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    setMood(mood) {
      this.mood = mood;
      // Higher base intensity for neuromarketing effect
      const map = { idle: 0.75, talk: 1.0, wave: 0.90, happy: 1.0, think: 0.80, sorry: 0.70, walk: 0.78 };
      this.targetIntensity = map[mood] || 0.75;
      // Spawn more rings for active moods
      if (mood === 'talk' || mood === 'happy' || mood === 'wave') {
        this.spawnPulseRing();
        this.spawnPulseRing();
        this.spawnPulseRing();
      } else {
        this.spawnPulseRing(); // even idle spawns one ring
      }
    }

    color(alpha = 1) {
      const hex = NEURAL.moodColors[this.mood] || '#00d4ff';
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    spawnPulseRing() {
      // Stronger, faster rings for neuromarketing attention
      this.pulseRings.push({ radius: 0, maxRadius: this.size * 0.52, alpha: 1.0, speed: 1.2 + Math.random() * 0.9 });
    }

    animate() {
      if (this._destroyed) return;
      this.time += 1;
      this.intensity += (this.targetIntensity - this.intensity) * 0.03;

      const ctx = this.ctx;
      const d = this.dpr;
      const s = this.size * d;
      const cx = s / 2;
      const cy = s / 2;

      // SOLID BLUE-TURQUOISE BACKGROUND - Neuromarketing Edition
      ctx.clearRect(0, 0, s, s);

      const breathe = Math.sin(this.time * 0.018) * 0.25 + 0.75;

      // === 1. SOLID BLUE-TURQUOISE BASE (opaque circle, not transparent) ===
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, cx, 0, Math.PI * 2);
      ctx.clip();

      // Deep ocean radial gradient - fully opaque
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
      bgGrad.addColorStop(0,   NEURAL.bgColors.inner);   // '#003a5c' deep core
      bgGrad.addColorStop(0.5, NEURAL.bgColors.mid);     // '#005f8a' electric mid
      bgGrad.addColorStop(1,   NEURAL.bgColors.outer);   // '#007ab8' turquoise rim
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, s, s);

      // Breathing pulse overlay on background
      const breathOverlay = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx * 0.7);
      breathOverlay.addColorStop(0,   this.color(0.18 * breathe));
      breathOverlay.addColorStop(0.6, this.color(0.06 * breathe));
      breathOverlay.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = breathOverlay;
      ctx.fillRect(0, 0, s, s);
      ctx.restore();

      // === 2. CONCENTRIC RINGS (strong grid for neuromarketing depth) ===
      ctx.strokeStyle = this.color(0.22 * breathe);
      ctx.lineWidth = 0.8 * d;
      for (let r = 18 * d; r < cx; r += 20 * d) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // === 3. EXPANDING PULSE RINGS (faster spawn for neuromarketing) ===
      if (this.time % Math.round(30 / (this.intensity + 0.2)) === 0) {
        this.spawnPulseRing();
      }

      this.pulseRings = this.pulseRings.filter(ring => {
        ring.radius += ring.speed * d * this.intensity;
        ring.alpha = (1 - ring.radius / (ring.maxRadius * d)) * 0.85 * this.intensity;
        if (ring.alpha <= 0.01) return false;

        ctx.strokeStyle = this.color(ring.alpha);
        ctx.lineWidth = (2.5 - ring.radius / (ring.maxRadius * d) * 2.0) * d;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      // === 4. ROTATING SWEEP (stronger for attention) ===
      const sweepAngle = (this.time * 0.025) % (Math.PI * 2);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, cx * 0.88, 0, Math.PI * 2);
      ctx.clip();
      const sweepGrad = ctx.createConicGradient(sweepAngle, cx, cy);
      sweepGrad.addColorStop(0,    this.color(0.28 * this.intensity));
      sweepGrad.addColorStop(0.08, this.color(0.12 * this.intensity));
      sweepGrad.addColorStop(0.18, 'rgba(0,0,0,0)');
      sweepGrad.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, s, s);
      ctx.restore();

      // === 5. FLOATING PARTICLES (brighter, more visible on dark bg) ===
      for (const p of this.particles) {
        p.angle += p.speed * this.intensity;
        const wobble = Math.sin(this.time * 0.012 + p.phase) * 6 * d;
        const px = cx + Math.cos(p.angle) * (p.dist * d + wobble);
        const py = cy + Math.sin(p.angle) * (p.dist * d + wobble);
        const bright = (0.55 + Math.sin(this.time * 0.025 + p.phase) * 0.45) * this.intensity;

        // Particle glow (larger, brighter)
        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 5 * d);
        pGrad.addColorStop(0, this.color(bright * 0.9));
        pGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 5 * d, 0, Math.PI * 2);
        ctx.fill();

        // Particle dot (sharper)
        ctx.fillStyle = this.color(Math.min(bright * 1.4, 1.0));
        ctx.beginPath();
        ctx.arc(px, py, p.size * d * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // === 6. HEARTBEAT WAVE (stronger on dark bg) ===
      ctx.strokeStyle = this.color(0.65 * this.intensity);
      ctx.lineWidth = 1.8 * d;
      ctx.beginPath();
      const waveW = cx * 1.2;
      for (let i = 0; i < waveW; i += 2) {
        const wx = cx - waveW / 2 + i;
        const t = (i / waveW) * Math.PI * 5 + this.time * 0.08;
        const amp = Math.sin(t) * 6 * d * this.intensity * Math.sin(i / waveW * Math.PI);
        if (i === 0) ctx.moveTo(wx, cy + amp);
        else ctx.lineTo(wx, cy + amp);
      }
      ctx.stroke();

      // === 7. CENTRAL CORE - Neuromarketing pulsing sphere ===
      const coreSize = (12 + Math.sin(this.time * 0.05) * 5 * this.intensity) * d;

      // Wide halo (big glow for attention)
      const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 4.5);
      haloGrad.addColorStop(0,   this.color(0.6 * this.intensity * breathe));
      haloGrad.addColorStop(0.3, this.color(0.25 * this.intensity));
      haloGrad.addColorStop(0.7, this.color(0.08 * this.intensity));
      haloGrad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Core sphere
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
      coreGrad.addColorStop(0,    `rgba(255,255,255,${Math.min(this.intensity, 1.0)})`);
      coreGrad.addColorStop(0.2,  this.color(0.95 * this.intensity));
      coreGrad.addColorStop(0.6,  this.color(0.55 * this.intensity));
      coreGrad.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
      ctx.fill();

      // Bright center dot
      ctx.fillStyle = `rgba(255,255,255,${Math.min(this.intensity * 1.1, 1.0)})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5 * d, 0, Math.PI * 2);
      ctx.fill();

      // === 8. OUTER RING (vivid double border) ===
      ctx.strokeStyle = this.color(0.5 * breathe);
      ctx.lineWidth = 2 * d;
      ctx.beginPath();
      ctx.arc(cx, cy, cx - 2 * d, 0, Math.PI * 2);
      ctx.stroke();
      // Second inner ring
      ctx.strokeStyle = this.color(0.25 * breathe);
      ctx.lineWidth = 1 * d;
      ctx.beginPath();
      ctx.arc(cx, cy, cx - 6 * d, 0, Math.PI * 2);
      ctx.stroke();

      this.animFrame = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      this._destroyed = true;
      if (this.animFrame) cancelAnimationFrame(this.animFrame);
    }
  }

  // ============================================
  // VOICE SYNTHESIS — Web Speech API
  // Singura metodă garantat funcțională în browser fără API key.
  // Chrome folosește vocile Google online (calitate bună pentru ro-RO).
  // Activare: necesită click/touchstart real (browser autoplay policy).
  // ============================================
  const VoiceEngine = {
    _enabled: true,
    _unlocked: false,     // true după primul gesture real
    _speaking: false,
    _audio: null,         // HTMLAudioElement curent
    _pendingText: null,   // text în așteptare până la primul gesture

    init() {
      const self = this;
      const unlock = (e) => {
        if (self._unlocked) return;
        self._unlocked = true;
        console.log('[CatyVoice] ✅ Audio deblocat prin', e.type);

        // Dacă există text în așteptare, redă-l după mic delay
        if (self._pendingText) {
          const txt = self._pendingText;
          self._pendingText = null;
          setTimeout(() => self.speak(txt), 300);
        }
      };
      ['click','touchend','pointerdown','keydown'].forEach(evt => {
        document.addEventListener(evt, unlock, { passive: true });
      });
    },

    _clean(text) {
      return (text || '')
        .replace(/<[^>]*>/g, '')
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu, '')
        .replace(/[✦✧⚡🛒←→•·]/g, '')
        .replace(/&amp;/g, 'si').replace(/&/g, 'si')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 400);
    },

    speak(text) {
      if (!this._enabled || !text) return;
      const cleanText = this._clean(text);
      if (!cleanText || cleanText.length < 2) return;

      // Dacă userul nu a interacționat încă → pune în așteptare
      if (!this._unlocked) {
        this._pendingText = cleanText;
        console.log('[CatyVoice] ⏳ Aștept gesture:', cleanText.substring(0, 60));
        return;
      }

      this.stop();

      const lang = CONFIG.language || 'ro';
      const ttsUrl = CONFIG.baseUrl + '/api/widget/tts?lang=' + lang +
                     '&text=' + encodeURIComponent(cleanText);

      console.log('[CatyVoice] 🎙️ Fetch TTS:', cleanText.substring(0, 60));

      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      this._audio = audio;

      audio.onplay  = () => { this._speaking = true; };
      audio.onended = () => { this._speaking = false; };
      audio.onerror = (e) => {
        this._speaking = false;
        console.warn('[CatyVoice] ❌ Audio error, no fallback (voice consistency)');
        // Nu mai folosim Web Speech API fallback - voce inconsistentă
      };

      audio.src = ttsUrl;
      audio.play().catch(err => {
        console.warn('[CatyVoice] ❌ Play blocked:', err.message, '(no fallback)');
        // Nu mai folosim Web Speech API fallback - voce inconsistentă
      });
    },

    _fallbackWebSpeech(text, lang) {
      if (!window.speechSynthesis) return;
      const ss = window.speechSynthesis;
      if (ss.speaking) ss.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ro' ? 'ro-RO' : 'en-US';
      utterance.rate = 0.90;
      utterance.volume = 1.0;

      const voices = ss.getVoices();
      const roVoice = voices.find(v => v.lang.startsWith('ro'));
      if (roVoice && lang === 'ro') utterance.voice = roVoice;

      utterance.onstart = () => { this._speaking = true; console.log('[CatyVoice] 🎙️ Web Speech:', text.substring(0, 40)); };
      utterance.onend   = () => { this._speaking = false; };

      setTimeout(() => ss.speak(utterance), 50);
    },

    stop() {
      this._speaking = false;
      if (this._audio) {
        this._audio.pause();
        this._audio.src = '';
        this._audio = null;
      }
      if (window.speechSynthesis?.speaking) {
        window.speechSynthesis.cancel();
      }
    }
  };

  // ============================================
  // SITE CSS INTEGRATION - Extract dominant colors
  // ============================================
  function detectSiteColors() {
    const body = document.body;
    const computed = window.getComputedStyle(body);
    const bgColor = computed.backgroundColor;
    const textColor = computed.color;
    const fontFamily = computed.fontFamily;

    // Try to find dominant accent color from links/buttons
    let accentColor = null;
    const links = document.querySelectorAll('a, button, .btn, [class*="primary"]');
    for (const el of links) {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;
      // Skip transparent/white/black
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(255, 255, 255)' && bg !== 'rgb(0, 0, 0)') {
        accentColor = bg;
        break;
      }
    }

    return {
      bgColor: bgColor || 'rgba(255,255,255,1)',
      textColor: textColor || '#1f2937',
      fontFamily: fontFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      accentColor: accentColor || CONFIG.primaryColor,
    };
  }

  // Keep reference for PNG fallback (old sites with custom avatar images)
  const getImageBase = () => {
    if (window.location.hostname === 'localhost') {
      return '/public/widget/assets';
    }
    return 'https://catyai.io/widget/assets';
  };
  const IMAGE_BASE = getImageBase();
  const AVATARS = {
    idle: `${IMAGE_BASE}/caty-idle.png`,
    wave: `${IMAGE_BASE}/caty-wave.png`,
    talk: `${IMAGE_BASE}/caty-talk.png`,
    walk1: `${IMAGE_BASE}/caty-walk-1.png`,
    walk2: `${IMAGE_BASE}/caty-walk-2.png`,
    happy: `${IMAGE_BASE}/caty-happy.png`,
    think: `${IMAGE_BASE}/caty-think.png`,
    sorry: `${IMAGE_BASE}/caty-sorry.png`,
    pointLeft: `${IMAGE_BASE}/caty-point-left.png`,
    pointRight: `${IMAGE_BASE}/caty-point-right.png`,
  };
  const FALLBACK_AVATAR = `${IMAGE_BASE}/caty-idle.png`;

  // ============================================
  // State
  // ============================================
  const state = {
    // Profile
    profile: null,
    profilingStep: 0,
    profilingStarted: false,
    profilingComplete: false,

    // Avatar
    avatarState: 'idle',
    avatarPosition: { x: 100, y: 50 },
    avatarDirection: 'right',
    isWalking: false,
    walkFrame: 1,

    // UI
    container: null,
    avatar: null,
    bubble: null,
    confetti: null,

    // Timers
    walkInterval: null,
    walkAnimation: null,
    idleTimeout: null,

    // Flags
    exitIntentTriggered: false,
    userEngaged: false,

    // Products
    products: [],
    selectedProduct: null,

    // Cart
    cart: [],

    // Support Chat (Modul 3)
    supportChatOpen: false,
    supportChatWindow: null,
    supportCategory: null,
    supportMessages: [],
    supportHumanMode: false,
    supportBtn: null,
    lastActivityTime: Date.now(),

    // NEW: AutoConfig & Responsive
    autoConfig: null,
    responsive: null,
    autoForms: [],
    autoBanners: [],
    autoButtons: [],
    autoProducts: [],

    // Neural Sentience
    neuralEngine: null,
    siteColors: null,
    isMobile: window.innerWidth <= 768,

    // Cart Reminder
    _cartReminderTimer: null,
    _cartReminderCount: 0,
    _voiceOnlyMode: false,

    // Product View Tracking (IntersectionObserver + hover)
    _viewedProducts: new Set(),   // products already pitched this session
    _viewTimers: new Map(),       // productEl → timer (waiting to confirm real attention)
    _lastAutoPitch: 0,            // timestamp of last auto-pitch (debounce)
    _viewObserver: null,          // IntersectionObserver instance
  };

  // ============================================
  // Platform Auto-Detection (Shopify, WooCommerce, PrestaShop, Magento, OpenCart)
  // ============================================
  const PLATFORM_CONFIGS = {
    shopify: {
      detect: () => !!(window.Shopify || document.querySelector('meta[name="shopify-checkout-api-token"]') || document.querySelector('[id*="shopify"]')),
      productSelector: '.product-card, .grid__item, .product-item, .card--product, [data-product-id], .product',
      addToCartSelector: 'button[name="add"], .product-form__submit, .add-to-cart, [data-action="add-to-cart"], .shopify-payment-button button',
      priceSelector: '.price, .price__regular, .product__price, .price-item--regular, .money, [data-product-price]',
      nameSelector: '.product-card__title, .card__heading, .product__title, h2 a, h3 a, .full-unstyled-link',
      cartSelector: '.cart-count, .cart-count-bubble, [data-cart-count]',
      getProductId: (el) => el.dataset.productId || el.closest('[data-product-id]')?.dataset.productId || el.querySelector('[data-product-id]')?.dataset.productId,
    },
    woocommerce: {
      detect: () => !!(document.querySelector('.woocommerce') || document.body.classList.contains('woocommerce') || window.wc_add_to_cart_params),
      productSelector: '.product, .wc-block-grid__product, .type-product, li.product',
      addToCartSelector: '.add_to_cart_button, .single_add_to_cart_button, .ajax_add_to_cart, button[name="add-to-cart"]',
      priceSelector: '.woocommerce-Price-amount, .price ins .amount, .price > .amount, .price',
      nameSelector: '.woocommerce-loop-product__title, .woocommerce-loop-category__title, h2.product-title, h2 a',
      cartSelector: '.cart-contents-count, .wc-block-mini-cart__badge',
      getProductId: (el) => el.dataset.productId || el.querySelector('[data-product_id]')?.dataset.product_id || el.querySelector('.add_to_cart_button')?.dataset.product_id,
    },
    prestashop: {
      detect: () => !!(window.prestashop || document.querySelector('#js-product-list') || document.querySelector('[data-id-product]')),
      productSelector: '.product-miniature, .product_list .ajax_block_product, .js-product-miniature, [data-id-product]',
      addToCartSelector: '.add-to-cart, button[data-button-action="add-to-cart"], .ajax_add_to_cart_button',
      priceSelector: '.product-price, .price, .regular-price, [itemprop="price"]',
      nameSelector: '.product-title a, .product-name a, h2.product-title',
      cartSelector: '.cart-products-count, ._cart-qty',
      getProductId: (el) => el.dataset.idProduct || el.querySelector('[data-id-product]')?.dataset.idProduct,
    },
    magento: {
      detect: () => !!(window.require?.s?.contexts?._ || document.querySelector('.catalog-product-view') || document.querySelector('[data-role="tocart-form"]')),
      productSelector: '.product-item, .item.product, .product-card, li.product-item',
      addToCartSelector: 'button.action.tocart, button.action.primary, [data-role="tocart-form"] button',
      priceSelector: '.price-wrapper .price, .special-price .price, .normal-price .price, [data-price-amount]',
      nameSelector: '.product-item-name a, .product.name a, .product-item-link',
      cartSelector: '.counter-number, .minicart-wrapper .counter',
      getProductId: (el) => el.dataset.productId || el.querySelector('[data-product-id]')?.dataset.productId,
    },
    opencart: {
      detect: () => !!(document.querySelector('#product-list') || document.querySelector('.product-layout') || document.querySelector('input[name="product_id"]')),
      productSelector: '.product-layout, .product-thumb, .product-list .product-grid',
      addToCartSelector: 'button[onclick*="cart.add"], .button-group button:first-child, button.btn-cart',
      priceSelector: '.price, .price-new, .product-price',
      nameSelector: '.product-thumb .caption h4 a, .name a',
      cartSelector: '#cart-total, .cart-badge',
      getProductId: (el) => {
        const btn = el.querySelector('button[onclick*="cart.add"]');
        if (btn) {
          const match = btn.getAttribute('onclick')?.match(/cart\.add\('?(\d+)/);
          return match?.[1];
        }
        return null;
      },
    },

    // inotools.ro — OpenCart cu temă custom (product-box, .title.match-height-product-title)
    inotools: {
      detect: () => !!(
        document.querySelector('.product-box') ||
        document.querySelector('.match-height-product-title') ||
        document.querySelector('.bottomprice') ||
        (document.querySelector('link[href*="product_box.css"]'))
      ),
      productSelector: '.product-box',
      addToCartSelector: '.buttons a, .buttons button, button[onclick*="cart"], a[onclick*="cart"]',
      priceSelector: '.price, .bottomprice .price, .price-new',
      nameSelector: '.title.match-height-product-title, .match-height-product-title a, h4 a, h3 a',
      cartSelector: '#cart-total, .header-cart',
      getProductId: (el) => {
        const btn = el.querySelector('[onclick*="cart"]');
        if (btn) {
          const m = btn.getAttribute('onclick')?.match(/['""](\d+)['""]/) || btn.getAttribute('href')?.match(/product_id=(\d+)/);
          return m?.[1] || null;
        }
        return null;
      },
    },
  };

  /**
   * Detect e-commerce platform and adapt selectors
   */
  function detectPlatform() {
    for (const [name, config] of Object.entries(PLATFORM_CONFIGS)) {
      try {
        if (config.detect()) {
          console.log(`[CatyCommerce] Platform detected: ${name}`);
          // Override CONFIG selectors with platform-specific ones
          CONFIG.productSelector = config.productSelector;
          CONFIG.addToCartSelector = config.addToCartSelector;
          CONFIG.priceSelector = config.priceSelector;
          CONFIG.nameSelector = config.nameSelector;
          CONFIG._platform = name;
          CONFIG._platformConfig = config;
          return name;
        }
      } catch (e) {
        // Detection failed, try next
      }
    }
    console.log('[CatyCommerce] No known platform detected, using generic selectors');
    CONFIG._platform = 'generic';
    return 'generic';
  }

  /**
   * Fetch WhatsApp number and widget config from API
   */
  async function loadWidgetConfig() {
    // Check if loader already fetched config
    const cachedConfig = window.__catyWidgetConfig;

    let data = cachedConfig;
    if (!data && CONFIG.apiKey) {
      try {
        const resp = await fetch(`${CONFIG.baseUrl}/api/widget/config`, {
          headers: { 'x-api-key': CONFIG.apiKey }
        });
        if (resp.ok) data = await resp.json();
      } catch (e) {
        console.debug('[CatyCommerce] Config load failed:', e.message);
      }
    }

    if (!data) return;

    // Persona name from config (overrides hardcoded "Caty")
    if (data.config?.persona?.name) {
      CONFIG.personaName = data.config.persona.name;
    }

    // Business name fallback
    if (!CONFIG.personaName && data.config?.business?.name) {
      CONFIG.personaName = data.config.business.name;
    }

    // Dynamic WhatsApp number from config
    if (data.config?.notifications?.whatsapp?.phone) {
      CONFIG.whatsappNumber = data.config.notifications.whatsapp.phone;
    }

    // Industry info for SAG
    if (data.config?.auto_brain?.industry) {
      CONFIG._industry = data.config.auto_brain.industry;
    }

    // Commerce config
    if (data.config?.commerce?.exit_discount_code) {
      CONFIG.exitIntentDiscount = data.config.commerce.exit_discount_code;
    }
    if (data.config?.commerce?.exit_discount_percent) {
      CONFIG.exitIntentPercent = data.config.commerce.exit_discount_percent;
    }

    // Walking robot toggle - if disabled, don't show robot at all
    if (data.config?.commerce?.walking_robot === false) {
      CONFIG._robotDisabled = true;
      console.log('[CatyCommerce] Walking robot DISABLED by config');
    }

    // Profiling toggle - if disabled, skip profiling
    if (data.config?.commerce?.profiling_enabled === false) {
      CONFIG._skipProfiling = true;
      console.log('[CatyCommerce] Profiling DISABLED by config');
    }

    // Dynamic commerce profiling from SAG/Auto-Crawl
    if (data.config?.commerce_profiling?.enabled && data.config.commerce_profiling.questions?.length > 0) {
      CONFIG._dynamicProfiling = data.config.commerce_profiling;
      CONFIG._skipProfiling = false; // Use dynamic profiling
    } else {
      // No profiling data - check if fashion
      const industry = CONFIG._industry || '';
      const businessType = data.config?.business?.type || '';
      const isFashion = ['fashion', 'clothing', 'apparel'].some(k =>
        industry.includes(k) || businessType.includes(k)
      );
      if (!isFashion) {
        CONFIG._skipProfiling = true;
      }
    }

    // Custom robot avatar
    if (data.config?.commerce_avatar?.use_custom && data.config.commerce_avatar.custom_url) {
      CONFIG._customAvatar = data.config.commerce_avatar.custom_url;
    }

    // Greeting message from dashboard (overrides hardcoded defaults)
    if (data.config?.behavior?.greeting?.message) {
      CONFIG._greetingMessage = data.config.behavior.greeting.message;
    }

    // If chat widget is also loaded, disable built-in support chat
    if (document.querySelector('script[src*="widget.js"]') || window.CatyWidget) {
      CONFIG.disableSupportChat = true;
    }

    console.log('[CatyCommerce] Config loaded', {
      persona: CONFIG.personaName,
      industry: CONFIG._industry || 'unknown',
      dynamicProfiling: !!CONFIG._dynamicProfiling,
      customAvatar: !!CONFIG._customAvatar,
      greetingMessage: CONFIG._greetingMessage ? CONFIG._greetingMessage.substring(0, 40) + '...' : 'hardcoded',
      supportChat: !CONFIG.disableSupportChat
    });
  }

  // ============================================
  // Styles
  // ============================================
  const styles = `
    .caty-ecom * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .caty-ecom {
      --primary: ${CONFIG.primaryColor};
      --glow-color: ${CONFIG.primaryColor};
      --particle-color: ${CONFIG.primaryColor};
      --site-font: var(--caty-site-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --site-bg: var(--caty-site-bg, rgba(255,255,255,0.85));
      --site-text: var(--caty-site-text, #1f2937);
      position: fixed;
      z-index: 2147483640;
      pointer-events: none;
    }

    /* ========== TELEPORT EFFECT ========== */
    .caty-teleport-out {
      animation: teleportOut 0.4s ease-in forwards;
    }

    .caty-teleport-in {
      animation: teleportIn 0.4s ease-out forwards;
    }

    @keyframes teleportOut {
      0% { opacity: 1; transform: scale(1); filter: blur(0) brightness(1); }
      50% { opacity: 0.8; transform: scale(1.3); filter: blur(0) brightness(2); }
      100% { opacity: 0; transform: scale(0); filter: blur(10px) brightness(3); }
    }

    @keyframes teleportIn {
      0% { opacity: 0; transform: scale(0); filter: blur(10px) brightness(3); }
      50% { opacity: 0.8; transform: scale(1.2); filter: blur(0) brightness(2); }
      100% { opacity: 1; transform: scale(1); filter: blur(0) brightness(1); }
    }

    /* ========== TRAIL EFFECT ========== */
    .caty-trail {
      position: fixed;
      width: 12px;
      height: 12px;
      background: var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483644;
      animation: trailFade 0.6s ease-out forwards;
      box-shadow: 0 0 8px var(--primary);
    }

    @keyframes trailFade {
      0% { opacity: 0.5; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.1); }
    }

    /* ========== LASER POINTER ========== */
    .caty-laser {
      position: fixed;
      height: 2px;
      background: linear-gradient(90deg, var(--primary), transparent);
      pointer-events: none;
      z-index: 2147483643;
      transform-origin: left center;
      animation: laserPulse 0.3s ease-in-out infinite;
      box-shadow: 0 0 8px var(--primary), 0 0 16px var(--primary);
    }

    @keyframes laserPulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }

    .caty-laser-dot {
      position: fixed;
      width: 16px;
      height: 16px;
      background: var(--primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483643;
      animation: laserDotPulse 0.5s ease-in-out infinite;
      box-shadow: 0 0 15px var(--primary), 0 0 30px var(--primary);
    }

    @keyframes laserDotPulse {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.3); opacity: 1; }
    }

    /* ========== MAGIC SPARKLES ========== */
    .caty-sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 2147483650;
      animation: sparklePop 0.8s ease-out forwards;
    }

    .caty-sparkle::before,
    .caty-sparkle::after {
      content: '\\2726';
      position: absolute;
      font-size: 20px;
      color: #00d4ff;
      text-shadow: 0 0 10px #00d4ff;
    }

    .caty-sparkle::after {
      content: '\\2727';
      font-size: 14px;
      top: -15px;
      left: 10px;
    }

    @keyframes sparklePop {
      0% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
      100% { opacity: 0; transform: scale(0.5) rotate(360deg) translateY(-30px); }
    }

    /* ========== AVATAR CONTAINER (Neural Sentience) ========== */
    .caty-avatar {
      position: fixed;
      z-index: 2147483645;
      cursor: pointer;
      pointer-events: auto;
      transition: transform 0.15s ease;
    }

    .caty-avatar:hover {
      transform: scale(1.08);
    }

    .caty-avatar-inner {
      position: relative;
    }

    .caty-neural-canvas {
      border-radius: 50%;
      filter:
        drop-shadow(0 0 12px rgba(0, 229, 255, 0.85))
        drop-shadow(0 0 28px rgba(0, 180, 255, 0.55))
        drop-shadow(0 4px 20px rgba(0, 90, 160, 0.6));
      transition: filter 0.3s ease;
    }

    .caty-avatar:hover .caty-neural-canvas {
      filter:
        drop-shadow(0 0 18px rgba(0, 229, 255, 1.0))
        drop-shadow(0 0 40px rgba(0, 200, 255, 0.75))
        drop-shadow(0 6px 30px rgba(0, 100, 180, 0.7));
    }

    /* Outer pulse ring — stronger neuromarketing beacon */
    .caty-neural-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 2px solid rgba(0, 229, 255, 0.7);
      animation: neuralRingPulse 1.4s ease-in-out infinite;
      pointer-events: none;
    }
    /* Second outer ring */
    .caty-neural-ring::after {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid rgba(0, 200, 255, 0.35);
      animation: neuralRingPulse 1.4s ease-in-out infinite 0.7s;
    }

    @keyframes neuralRingPulse {
      0%   { transform: scale(1);    opacity: 0.8; }
      50%  { transform: scale(1.14); opacity: 0.3; }
      100% { transform: scale(1);    opacity: 0.8; }
    }

    /* Fallback for custom PNG avatar */
    .caty-avatar-img {
      width: ${CONFIG.avatarSize}px;
      height: auto;
      filter: drop-shadow(0 8px 25px rgba(59, 130, 246, 0.4));
      transition: transform 0.2s ease;
      border-radius: 50%;
    }

    .caty-avatar-img.walking { animation: catyWalk 0.3s steps(2) infinite; }
    .caty-avatar-img.talking { animation: catyTalk 0.4s ease-in-out infinite; }
    .caty-avatar-img.happy { animation: catyHappy 0.5s ease-in-out infinite; }
    .caty-avatar-img.thinking { animation: catyThink 1.5s ease-in-out infinite; }
    .caty-avatar-img.sorry { animation: catySorry 1s ease-in-out infinite; }

    @keyframes catyWalk {
      0%, 100% { transform: translateY(0) rotate(-2deg); }
      50% { transform: translateY(-8px) rotate(2deg); }
    }
    @keyframes catyTalk {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(3deg); }
      75% { transform: rotate(-3deg); }
    }
    @keyframes catyHappy {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-12px) scale(1.05); }
    }
    @keyframes catyThink {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-5deg) translateY(-3px); }
    }
    @keyframes catySorry {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(5px); }
    }

    /* ========== SPEECH BUBBLE - GLASSMORPHISM ========== */
    .caty-bubble {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 15px;
      background: var(--site-bg);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(0, 212, 255, 0.15);
      border-radius: 18px;
      padding: 16px 20px;
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.12),
        0 0 0 1px rgba(0, 212, 255, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      min-width: 260px;
      max-width: 340px;
      pointer-events: auto;
      animation: bubbleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      font-family: var(--site-font);
    }

    .caty-bubble::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 16px;
      height: 16px;
      background: var(--site-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-right: 1px solid rgba(0, 212, 255, 0.15);
      border-bottom: 1px solid rgba(0, 212, 255, 0.15);
    }

    @keyframes bubbleIn {
      from { opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.92); }
      to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    }

    .caty-bubble-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 22px;
      height: 22px;
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.2);
      border-radius: 50%;
      color: var(--site-text);
      cursor: pointer;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      font-family: var(--site-font);
    }

    .caty-bubble-close:hover {
      background: rgba(0, 212, 255, 0.2);
      border-color: rgba(0, 212, 255, 0.4);
    }

    .caty-bubble-text {
      color: var(--site-text);
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 14px;
      text-align: center;
      font-family: var(--site-font);
    }

    .caty-bubble-text.large {
      font-size: 16px;
      font-weight: 600;
    }

    /* Bubble Buttons - Neural styled */
    .caty-bubble-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }

    .caty-bubble-btn {
      padding: 10px 18px;
      background: rgba(0, 212, 255, 0.08);
      border: 1px solid rgba(0, 212, 255, 0.25);
      border-radius: 22px;
      color: var(--site-text);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: var(--site-font);
    }

    .caty-bubble-btn:hover {
      background: rgba(0, 212, 255, 0.2);
      border-color: rgba(0, 212, 255, 0.5);
      transform: translateY(-1px);
      box-shadow: 0 2px 10px rgba(0, 212, 255, 0.15);
    }

    .caty-bubble-btn.primary {
      background: rgba(0, 212, 255, 0.15);
      border-color: rgba(0, 212, 255, 0.4);
      font-weight: 600;
    }

    .caty-bubble-btn.primary:hover {
      background: rgba(0, 212, 255, 0.3);
    }

    .caty-bubble-btn.small {
      padding: 7px 12px;
      font-size: 12px;
    }

    .caty-bubble-btn.selected {
      background: rgba(0, 212, 255, 0.25);
      border-color: rgba(0, 212, 255, 0.6);
      box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
    }

    .caty-bubble-btn-continue {
      width: 100%;
      margin-top: 10px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(0, 136, 255, 0.8), rgba(0, 212, 255, 0.8));
      border: none;
      border-radius: 22px;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: var(--site-font);
    }

    .caty-bubble-btn-continue:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }

    .caty-bubble-btn-continue:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
    }

    /* Color palette */
    .caty-color-palette {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }

    .caty-color-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 3px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .caty-color-btn:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }

    .caty-color-btn.selected {
      border-color: var(--primary);
      transform: scale(1.1);
    }

    .caty-color-btn.selected::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      font-weight: bold;
      color: white;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }

    .caty-color-btn[data-color="#ffffff"].selected::after,
    .caty-color-btn[data-color="#eab308"].selected::after,
    .caty-color-btn[data-color="#d4b896"].selected::after {
      color: #1a1a1a;
      text-shadow: none;
    }

    .caty-color-name {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: #6b7280;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .caty-color-btn:hover .caty-color-name {
      opacity: 1;
    }

    /* Category Selector Grid */
    .caty-category-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 15px;
      padding: 5px;
    }

    .caty-category-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 15px 10px;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .caty-category-btn:hover {
      border-color: var(--primary);
      background: rgba(255, 255, 255, 1);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .caty-category-btn:active {
      transform: translateY(0);
    }

    .caty-category-icon {
      font-size: 28px;
      line-height: 1;
    }

    .caty-category-label {
      font-size: 11px;
      font-weight: 600;
      color: #374151;
      text-align: center;
      line-height: 1.2;
    }

    .caty-category-btn:hover .caty-category-label {
      color: var(--primary);
    }

    /* Product Price in Bubble */
    .caty-bubble-price {
      font-size: 24px;
      font-weight: 700;
      color: var(--primary);
      margin: 10px 0;
      text-align: center;
    }

    .caty-bubble-match {
      background: rgba(34, 197, 94, 0.1);
      color: #16a34a;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 12px;
    }

    /* Exit Intent Special */
    .caty-bubble.exit-intent {
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      border: 2px solid #f59e0b;
    }

    .caty-bubble.exit-intent::after {
      border-top-color: #fde68a;
    }

    .caty-discount-code {
      background: #1f2937;
      color: #fbbf24;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 20px;
      font-weight: 700;
      font-family: monospace;
      margin: 12px 0;
      text-align: center;
      letter-spacing: 2px;
    }

    /* Confetti */
    .caty-confetti {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483650;
      overflow: hidden;
    }

    .caty-confetti-piece {
      position: absolute;
      width: 12px;
      height: 12px;
      animation: confettiFall 3s ease-out forwards;
    }

    @keyframes confettiFall {
      0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }

    /* ========== SUPPORT CHAT MODULE ========== */
    .caty-support-btn {
      position: fixed;
      bottom: 100px;
      right: 30px;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 14px 24px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      z-index: 2147483644;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
    }

    .caty-support-btn:hover {
      transform: scale(1.05);
      filter: brightness(1.1);
    }

    .caty-chat-window {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 380px;
      max-height: 550px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 50px rgba(0, 0, 0, 0.25);
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: chatWindowIn 0.3s ease-out;
    }

    @keyframes chatWindowIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .caty-chat-header {
      background: var(--primary);
      color: white;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .caty-chat-header-avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: white;
      padding: 3px;
    }

    .caty-chat-header-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .caty-chat-header-info {
      flex: 1;
    }

    .caty-chat-header-title {
      font-weight: 600;
      font-size: 16px;
    }

    .caty-chat-header-status {
      font-size: 12px;
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .caty-chat-header-status::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
    }

    .caty-chat-close {
      background: rgba(255,255,255,0.2);
      border: 2px solid rgba(255,255,255,0.5);
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 22px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .caty-chat-close:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.1);
    }

    .caty-chat-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #f8fafc;
      min-height: 300px;
    }

    .caty-chat-categories {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .caty-chat-category {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .caty-chat-category:hover {
      border-color: var(--primary);
      background: rgba(59, 130, 246, 0.05);
      transform: translateX(5px);
    }

    .caty-chat-category-icon {
      font-size: 24px;
    }

    .caty-chat-category-text {
      flex: 1;
    }

    .caty-chat-category-label {
      font-weight: 600;
      color: #1f2937;
      font-size: 14px;
    }

    .caty-chat-category-desc {
      font-size: 12px;
      color: #6b7280;
    }

    .caty-chat-messages {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .caty-chat-message {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
      animation: messageIn 0.3s ease-out;
    }

    @keyframes messageIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .caty-chat-message.bot {
      background: white;
      color: #1f2937;
      border: 1px solid #e5e7eb;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }

    .caty-chat-message.user {
      background: var(--primary);
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    .caty-chat-message.system {
      background: #fef3c7;
      color: #92400e;
      align-self: center;
      font-size: 13px;
      border-radius: 8px;
    }

    .caty-chat-back {
      background: none;
      border: none;
      color: var(--primary);
      font-size: 13px;
      cursor: pointer;
      padding: 8px 0;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .caty-chat-back:hover {
      text-decoration: underline;
    }

    .caty-chat-human-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 14px 16px;
      margin-top: 15px;
      background: var(--primary);
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .caty-chat-human-btn:hover {
      transform: scale(1.02);
      filter: brightness(1.1);
    }

    .caty-chat-human-icon {
      font-size: 20px;
    }

    .caty-chat-footer {
      padding: 12px 16px;
      background: white;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 10px;
    }

    .caty-chat-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 25px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .caty-chat-input:focus {
      border-color: var(--primary);
    }

    .caty-chat-send {
      background: var(--primary);
      border: none;
      color: white;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .caty-chat-send:hover {
      background: #2563eb;
      transform: scale(1.05);
    }

    /* ========== MOBILE OPTIMIZATION ========== */
    @media (max-width: 768px) {
      /* Neural avatar smaller on mobile */
      .caty-neural-canvas,
      .caty-avatar-img {
        width: ${Math.min(CONFIG.avatarSize * 0.55, 80)}px !important;
        height: ${Math.min(CONFIG.avatarSize * 0.55, 80)}px !important;
      }

      .caty-avatar-inner {
        width: ${Math.min(CONFIG.avatarSize * 0.55, 80)}px !important;
        height: ${Math.min(CONFIG.avatarSize * 0.55, 80)}px !important;
      }

      /* Position avatar at top-left on mobile to avoid chat widget overlap */
      .caty-avatar {
        bottom: auto !important;
        top: 80px !important;
        left: 10px !important;
        right: auto !important;
      }

      .caty-bubble {
        min-width: 200px;
        max-width: calc(100vw - 100px);
        padding: 12px 14px;
        font-size: 13px;
        /* Position bubble to the right of avatar on mobile */
        bottom: auto !important;
        top: -10px;
        left: calc(100% + 10px) !important;
        transform: none !important;
        margin-bottom: 0;
      }

      .caty-bubble::after {
        /* Arrow points left instead of down */
        bottom: auto;
        top: 20px;
        left: -8px;
        right: auto;
        transform: rotate(135deg);
      }

      @keyframes bubbleIn {
        from { opacity: 0; transform: translateX(-10px) scale(0.92); }
        to { opacity: 1; transform: none; }
      }

      .caty-bubble-btn {
        padding: 8px 14px;
        font-size: 12px;
      }

      .caty-bubble-text {
        font-size: 13px;
      }

      .caty-bubble-text.large {
        font-size: 14px;
      }

      .caty-chat-window {
        width: calc(100vw - 20px);
        right: 10px;
        bottom: 10px;
        max-height: calc(100vh - 100px);
      }

      .caty-support-btn {
        right: 15px;
        bottom: 80px;
        padding: 10px 16px;
        font-size: 13px;
      }

      /* Hide walking on very small screens */
      .caty-trail,
      .caty-laser,
      .caty-laser-dot {
        display: none !important;
      }
    }

    /* Very small screens - minimal mode */
    @media (max-width: 480px) {
      .caty-bubble {
        max-width: calc(100vw - 90px);
        padding: 10px 12px;
      }

      .caty-neural-canvas,
      .caty-avatar-img {
        width: ${Math.min(CONFIG.avatarSize * 0.45, 60)}px !important;
        height: ${Math.min(CONFIG.avatarSize * 0.45, 60)}px !important;
      }

      .caty-avatar-inner {
        width: ${Math.min(CONFIG.avatarSize * 0.45, 60)}px !important;
        height: ${Math.min(CONFIG.avatarSize * 0.45, 60)}px !important;
      }
    }
  `;

  // ============================================
  // Utility Functions
  // ============================================
  function injectStyles() {
    if (document.getElementById('caty-ecom-styles')) return;
    const style = document.createElement('style');
    style.id = 'caty-ecom-styles';
    style.textContent = styles;
    document.head.appendChild(style);
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getVisitorId() {
    let id = localStorage.getItem('caty_visitor_id');
    if (!id) {
      id = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('caty_visitor_id', id);
    }
    return id;
  }

  function loadProfile() {
    try {
      const saved = localStorage.getItem('caty_profile');
      if (saved) {
        state.profile = JSON.parse(saved);
        state.profilingComplete = true;
        return true;
      }
    } catch (e) {}
    return false;
  }

  function loadCart() {
    try {
      const saved = localStorage.getItem('caty_cart');
      if (saved) {
        state.cart = JSON.parse(saved);
      }
    } catch (e) {}
  }

  function saveProfile() {
    try {
      localStorage.setItem('caty_profile', JSON.stringify(state.profile));
    } catch (e) {}
  }

  // NEW: Responsive breakpoint helper
  function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  // ============================================
  // Avatar Functions
  // ============================================
  function createAvatar() {
    const avatar = document.createElement('div');
    avatar.className = 'caty-avatar';
    avatar.dataset.mood = 'idle';
    avatar.style.left = state.avatarPosition.x + 'px';
    avatar.style.bottom = state.avatarPosition.y + 'px';

    // Avatar container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'caty-avatar-inner';
    imgContainer.style.position = 'relative';

    // Use custom PNG avatar if configured, otherwise Neural Sentience canvas
    if (CONFIG._customAvatar) {
      // Custom avatar fallback (PNG)
      imgContainer.style.width = CONFIG.avatarSize + 'px';
      imgContainer.style.height = CONFIG.avatarSize + 'px';

      const img = document.createElement('img');
      img.className = 'caty-avatar-img';
      img.src = CONFIG._customAvatar;
      state._useCustomAvatar = true;
      img.alt = getPersonaName();
      img.onerror = () => { img.src = FALLBACK_AVATAR; };
      imgContainer.appendChild(img);
    } else {
      // NEURAL SENTIENCE - Canvas Avatar
      const canvasSize = state.isMobile ? Math.min(CONFIG.avatarSize * 0.55, 80) : CONFIG.avatarSize;
      imgContainer.style.width = canvasSize + 'px';
      imgContainer.style.height = canvasSize + 'px';

      state.neuralEngine = new NeuralSentience(canvasSize);
      state.neuralEngine.canvas.className = 'caty-neural-canvas';
      imgContainer.appendChild(state.neuralEngine.canvas);

      // Pulse ring
      const ring = document.createElement('div');
      ring.className = 'caty-neural-ring';
      imgContainer.appendChild(ring);

      state._useNeuralAvatar = true;
    }

    avatar.appendChild(imgContainer);
    avatar.addEventListener('click', onAvatarClick);

    // Hover → wave mood
    avatar.addEventListener('mouseenter', function() {
      if (!state.supportChatOpen && !state.bubble) {
        setAvatarState('wave');
        showSupportButton();
      }
    });

    avatar.addEventListener('mouseleave', function() {
      if (!state.supportChatOpen && !state.bubble) {
        setAvatarState('idle');
      }
    });

    state.avatar = avatar;
    state.container.appendChild(avatar);
  }

  function setAvatarState(newState) {
    state.avatarState = newState;

    // Update mood for CSS
    if (state.avatar) state.avatar.dataset.mood = newState;

    // Neural Sentience - update mood on canvas
    if (state._useNeuralAvatar && state.neuralEngine) {
      state.neuralEngine.setMood(newState);
      if (newState === 'happy') createSparkles();
      return;
    }

    // PNG fallback
    const img = state.avatar?.querySelector('.caty-avatar-img');
    if (!img) return;

    img.className = 'caty-avatar-img';

    switch (newState) {
      case 'idle':
        if (!state._useCustomAvatar) img.src = AVATARS.idle;
        break;
      case 'wave':
        if (!state._useCustomAvatar) img.src = AVATARS.wave;
        img.classList.add('talking');
        break;
      case 'talk':
        if (!state._useCustomAvatar) img.src = AVATARS.talk;
        img.classList.add('talking');
        break;
      case 'walk':
        if (!state._useCustomAvatar) img.src = state.walkFrame === 1 ? AVATARS.walk1 : AVATARS.walk2;
        img.classList.add('walking');
        break;
      case 'happy':
        if (!state._useCustomAvatar) img.src = AVATARS.happy;
        img.classList.add('happy');
        createSparkles();
        break;
      case 'think':
        if (!state._useCustomAvatar) img.src = AVATARS.think;
        img.classList.add('thinking');
        break;
      case 'sorry':
        if (!state._useCustomAvatar) img.src = AVATARS.sorry;
        img.classList.add('sorry');
        break;
      case 'pointLeft':
        if (!state._useCustomAvatar) img.src = AVATARS.pointLeft;
        break;
      case 'pointRight':
        if (!state._useCustomAvatar) img.src = AVATARS.pointRight;
        break;
    }
  }

  // ============================================
  // FUTURISTIC EFFECTS
  // ============================================

  function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'caty-trail';
    trail.style.left = x + 'px';
    trail.style.bottom = y + 'px';
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
  }

  function createSparkles() {
    if (!state.avatar) return;
    const rect = state.avatar.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'caty-sparkle';
        sparkle.style.left = (rect.left + random(0, rect.width)) + 'px';
        sparkle.style.top = (rect.top + random(0, rect.height)) + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
      }, i * 100);
    }
  }

  function showLaserPointer(targetElement) {
    if (!state.avatar || !targetElement) return;

    const avatarRect = state.avatar.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const startX = avatarRect.left + avatarRect.width / 2;
    const startY = avatarRect.top + avatarRect.height / 3;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    const angle = Math.atan2(endY - startY, endX - startX);
    const distance = Math.hypot(endX - startX, endY - startY);

    // Create laser beam
    const laser = document.createElement('div');
    laser.className = 'caty-laser';
    laser.style.left = startX + 'px';
    laser.style.top = startY + 'px';
    laser.style.width = distance + 'px';
    laser.style.transform = `rotate(${angle}rad)`;
    document.body.appendChild(laser);

    // Create laser dot on target
    const dot = document.createElement('div');
    dot.className = 'caty-laser-dot';
    dot.style.left = (endX - 10) + 'px';
    dot.style.top = (endY - 10) + 'px';
    document.body.appendChild(dot);

    state.laserElements = [laser, dot];

    // Auto remove after delay
    setTimeout(() => hideLaserPointer(), 3000);
  }

  function hideLaserPointer() {
    if (state.laserElements) {
      state.laserElements.forEach(el => el.remove());
      state.laserElements = null;
    }
  }

  function teleportTo(targetX, targetY, callback) {
    if (!state.avatar) return;

    const img = state.avatar.querySelector('.caty-avatar-inner');
    if (!img) {
      // Fallback to walk
      walkTo(targetX, targetY, callback);
      return;
    }

    // Teleport out
    img.classList.add('caty-teleport-out');

    setTimeout(() => {
      // Move position
      state.avatarPosition.x = targetX;
      state.avatarPosition.y = targetY;
      updateAvatarPosition();

      // Teleport in
      img.classList.remove('caty-teleport-out');
      img.classList.add('caty-teleport-in');

      setTimeout(() => {
        img.classList.remove('caty-teleport-in');
        if (callback) callback();
      }, 400);
    }, 400);
  }

  function teleportToElement(element, callback) {
    // On mobile, don't teleport - just callback directly
    if (state.isMobile) {
      if (callback) callback();
      return;
    }

    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    const targetX = rect.left + rect.width / 2 - CONFIG.avatarSize / 2;
    const targetY = window.innerHeight - (rect.bottom - scrollY) - CONFIG.avatarSize / 2;

    const clampedX = Math.max(20, Math.min(window.innerWidth - CONFIG.avatarSize - 20, targetX));
    const clampedY = Math.max(20, Math.min(300, targetY));

    teleportTo(clampedX, clampedY, () => {
      showLaserPointer(element);
      if (callback) callback();
    });
  }

  function updateAvatarPosition() {
    if (!state.avatar) return;
    state.avatar.style.left = state.avatarPosition.x + 'px';
    state.avatar.style.bottom = state.avatarPosition.y + 'px';

    // Flip based on direction
    const img = state.avatar.querySelector('.caty-avatar-img');
    if (img && state.avatarState === 'walk') {
      img.style.transform = state.avatarDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
    } else if (img) {
      img.style.transform = '';
    }
  }

  function walkTo(targetX, targetY, callback) {
    if (state.isWalking) {
      if (callback) callback();
      return;
    }

    const startX = state.avatarPosition.x;
    const startY = state.avatarPosition.y;
    const distance = Math.sqrt(Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2));

    if (distance < 30) {
      if (callback) callback();
      return;
    }

    state.isWalking = true;
    state.avatarDirection = targetX > startX ? 'right' : 'left';
    setAvatarState('walk');

    const duration = Math.min(distance * 4, 3000); // Max 3 seconds
    const startTime = Date.now();

    // Walk frame animation
    const frameInterval = setInterval(() => {
      state.walkFrame = state.walkFrame === 1 ? 2 : 1;
      const img = state.avatar?.querySelector('.caty-avatar-img');
      if (img) {
        img.src = state.walkFrame === 1 ? AVATARS.walk1 : AVATARS.walk2;
      }
    }, 150);

    let lastTrailTime = 0;

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      state.avatarPosition.x = startX + (targetX - startX) * ease;
      state.avatarPosition.y = startY + (targetY - startY) * ease;
      updateAvatarPosition();

      // Create trail effect every 100ms
      if (Date.now() - lastTrailTime > 100) {
        createTrail(state.avatarPosition.x + CONFIG.avatarSize / 2, state.avatarPosition.y + CONFIG.avatarSize / 2);
        lastTrailTime = Date.now();
      }

      if (progress < 1) {
        state.walkAnimation = requestAnimationFrame(animate);
      } else {
        clearInterval(frameInterval);
        state.isWalking = false;
        setAvatarState('idle');
        if (callback) callback();
      }
    }

    state.walkAnimation = requestAnimationFrame(animate);
  }

  function walkToElement(element, callback) {
    // On mobile, skip walking
    if (state.isMobile) {
      if (callback) callback();
      return;
    }

    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    const targetX = rect.left + rect.width / 2 - CONFIG.avatarSize / 2;
    const targetY = window.innerHeight - (rect.bottom - scrollY) - CONFIG.avatarSize / 2;

    const clampedX = Math.max(20, Math.min(window.innerWidth - CONFIG.avatarSize - 20, targetX));
    const clampedY = Math.max(20, Math.min(300, targetY));

    walkTo(clampedX, clampedY, () => {
      const direction = rect.left > state.avatarPosition.x ? 'pointRight' : 'pointLeft';
      setAvatarState(direction);
      if (callback) callback();
    });
  }

  function walkRandom() {
    if (state.isWalking || state.bubble || state.isMobile) return;

    const targetX = random(50, window.innerWidth - CONFIG.avatarSize - 50);
    const targetY = random(30, 150);

    // Walk silently - no random messages. Only speaks when user interacts with a product.
    walkTo(targetX, targetY);
  }

  function startRandomWalking() {
    if (state.walkInterval) return;

    state.walkInterval = setInterval(() => {
      if (!state.bubble && !state.isWalking && !state.userEngaged) {
        walkRandom();
      }
    }, random(CONFIG.walkIntervalMin, CONFIG.walkIntervalMax));
  }

  function stopRandomWalking() {
    if (state.walkInterval) {
      clearInterval(state.walkInterval);
      state.walkInterval = null;
    }
  }

  // ============================================
  // Bubble Functions
  // ============================================
  function showBubble(text, buttons = [], options = {}) {
    hideBubble();

    const bubble = document.createElement('div');
    bubble.className = 'caty-bubble' + (options.exitIntent ? ' exit-intent' : '');

    let html = `<button class="caty-bubble-close">&times;</button>`;
    html += `<div class="caty-bubble-text ${options.large ? 'large' : ''}">${text}</div>`;

    if (options.price) {
      html += `<div class="caty-bubble-price">${options.price}</div>`;
    }

    if (options.match) {
      html += `<div class="caty-bubble-match">${options.match}% ${t.matchScore}</div>`;
    }

    if (options.discountCode) {
      html += `<div class="caty-discount-code">${options.discountCode}</div>`;
    }

    if (buttons.length > 0) {
      html += '<div class="caty-bubble-buttons">';
      buttons.forEach((btn, i) => {
        const cls = btn.primary ? 'primary' : '';
        const small = btn.small ? 'small' : '';
        html += `<button class="caty-bubble-btn ${cls} ${small}" data-action="${btn.action || i}">${btn.text}</button>`;
      });
      html += '</div>';
    }

    if (options.multiSelect) {
      html += `<button class="caty-bubble-btn-continue" disabled>Continua</button>`;
    }

    bubble.innerHTML = html;

    // Close button
    bubble.querySelector('.caty-bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      hideBubble();
    });

    // Button clicks
    bubble.querySelectorAll('.caty-bubble-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;

        if (options.multiSelect) {
          btn.classList.toggle('selected');
          const selected = bubble.querySelectorAll('.caty-bubble-btn.selected');
          const continueBtn = bubble.querySelector('.caty-bubble-btn-continue');
          continueBtn.disabled = selected.length === 0;
        } else if (options.onSelect) {
          options.onSelect(action, btn.textContent);
        }
      });
    });

    // Continue button for multi-select
    const continueBtn = bubble.querySelector('.caty-bubble-btn-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        const selected = Array.from(bubble.querySelectorAll('.caty-bubble-btn.selected'))
          .map(b => b.textContent);
        if (options.onSelect && selected.length > 0) {
          options.onSelect('continue', selected);
        }
      });
    }

    state.avatar.appendChild(bubble);
    state.bubble = bubble;
    setAvatarState('talk');

    // Voice - always speak unless explicitly silenced
    if (!options.silent) {
      VoiceEngine.speak(text);
    }

    // Auto-hide after delay (if no buttons)
    if (buttons.length === 0 && !options.persistent) {
      setTimeout(() => {
        if (state.bubble === bubble) {
          hideBubble();
        }
      }, options.duration || 5000);
    }
  }

  function hideBubble() {
    if (state.bubble) {
      state.bubble.remove();
      state.bubble = null;
    }
    VoiceEngine.stop();
    if (state.avatarState === 'talk') {
      setAvatarState('idle');
    }
  }

  function showColorPalette(question, colors, onSelect) {
    hideBubble();

    const bubble = document.createElement('div');
    bubble.className = 'caty-bubble';

    let html = `<button class="caty-bubble-close">&times;</button>`;
    html += `<div class="caty-bubble-text large">${question}</div>`;
    html += `<div class="caty-color-palette">`;

    colors.forEach(color => {
      const borderStyle = color.hex === '#ffffff' ? 'border: 1px solid #e5e7eb;' : '';
      html += `<button class="caty-color-btn" data-color="${color.hex}" data-name="${color.name}" style="background: ${color.hex}; ${borderStyle}">
        <span class="caty-color-name">${color.name}</span>
      </button>`;
    });

    html += `</div>`;
    html += `<button class="caty-bubble-btn-continue" disabled>Continua →</button>`;

    bubble.innerHTML = html;

    // Close button
    bubble.querySelector('.caty-bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      hideBubble();
    });

    // Color clicks
    const selectedColors = [];
    bubble.querySelectorAll('.caty-color-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('selected');

        const colorName = btn.dataset.name;
        const idx = selectedColors.indexOf(colorName);
        if (idx > -1) {
          selectedColors.splice(idx, 1);
        } else {
          selectedColors.push(colorName);
        }

        const continueBtn = bubble.querySelector('.caty-bubble-btn-continue');
        continueBtn.disabled = selectedColors.length === 0;
      });
    });

    // Continue button
    bubble.querySelector('.caty-bubble-btn-continue').addEventListener('click', () => {
      if (selectedColors.length > 0) {
        onSelect(selectedColors);
      }
    });

    state.avatar.appendChild(bubble);
    state.bubble = bubble;
    setAvatarState('talk');
  }

  // ============================================
  // Confetti
  // ============================================
  function showConfetti() {
    const container = document.createElement('div');
    container.className = 'caty-confetti';

    const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];

    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'caty-confetti-piece';
      piece.style.left = random(0, 100) + '%';
      piece.style.background = randomItem(colors);
      piece.style.animationDelay = random(0, 500) + 'ms';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      container.appendChild(piece);
    }

    document.body.appendChild(container);

    setTimeout(() => container.remove(), 3500);
  }

  // ============================================
  // Profiling
  // ============================================
  function startProfiling() {
    state.profilingStarted = true;
    state.profilingStep = 0;
    state.profile = {
      gender: null,
      size: null,
      colors: [],
      style: null,
      budget: null,
      category: null,
    };
    stopRandomWalking();
    showProfilingStep();
  }

  function showProfilingStep() {
    const step = state.profilingStep;
    const p = t.profiling;

    if (step === 0) {
      showBubble(p.q1, p.q1_options.map(opt => ({ text: opt })), {
        large: true,
        onSelect: (_, value) => {
          state.profile.gender = value;
          state.profilingStep++;
          setAvatarState('happy');
          setTimeout(() => showProfilingStep(), 500);
        }
      });
    } else if (step === 1) {
      showBubble(p.q2, p.q2_options.map(opt => ({ text: opt, small: true })), {
        onSelect: (_, value) => {
          state.profile.size = value;
          state.profilingStep++;
          setAvatarState('happy');
          setTimeout(() => showProfilingStep(), 500);
        }
      });
    } else if (step === 2) {
      // Show color palette
      showColorPalette(p.q3, p.q3_options, (selectedColors) => {
        state.profile.colors = selectedColors;
        state.profilingStep++;
        setAvatarState('happy');
        setTimeout(() => showProfilingStep(), 500);
      });
    } else if (step === 3) {
      showBubble(p.q4, p.q4_options.map(opt => ({ text: opt })), {
        onSelect: (_, value) => {
          state.profile.style = value;
          state.profilingStep++;
          setAvatarState('happy');
          setTimeout(() => showProfilingStep(), 500);
        }
      });
    } else if (step === 4) {
      showBubble(p.q5, p.q5_options.map(opt => ({ text: opt })), {
        onSelect: (_, value) => {
          state.profile.budget = value;
          state.profilingStep++;
          setAvatarState('happy');
          setTimeout(() => showProfilingStep(), 500);
        }
      });
    } else if (step === 5) {
      // Show category selection with icons
      showCategorySelector(p.q6, p.q6_options, (categoryId) => {
        state.profile.category = categoryId;
        completeProfiling();
      });
    }
  }

  function showCategorySelector(question, options, callback) {
    hideBubble();

    const bubble = document.createElement('div');
    bubble.className = 'caty-bubble large';

    let html = `<button class="caty-bubble-close">&times;</button>`;
    html += `<div class="caty-bubble-text large">${question}</div>`;
    html += '<div class="caty-category-grid">';

    options.forEach(opt => {
      html += `
        <button class="caty-category-btn" data-category="${opt.id}">
          <span class="caty-category-icon">${opt.icon}</span>
          <span class="caty-category-label">${opt.label}</span>
        </button>
      `;
    });

    html += '</div>';
    bubble.innerHTML = html;

    // Close button
    bubble.querySelector('.caty-bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      hideBubble();
    });

    // Category buttons
    bubble.querySelectorAll('.caty-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const category = btn.dataset.category;
        setAvatarState('happy');
        callback(category);
      });
    });

    state.avatar.appendChild(bubble);
    state.bubble = bubble;
    setAvatarState('talk');
  }

  function completeProfiling() {
    state.profilingComplete = true;
    saveProfile();

    setAvatarState('happy');
    showBubble(t.profiling.complete, [], { duration: 2000 });

    setTimeout(() => {
      hideBubble();
      // Find matching products and show them
      showMatchingProducts();
    }, 2000);
  }

  function getProductData(productEl) {
    const platformConfig = CONFIG._platformConfig;
    const nameSelector = CONFIG.nameSelector || '.product-name, h2, h3';
    const priceSelector = CONFIG.priceSelector || '.product-price, .price';

    // Platform-specific product ID extraction
    let productId = productEl.dataset.productId || productEl.id;
    if (!productId && platformConfig?.getProductId) {
      productId = platformConfig.getProductId(productEl);
    }
    productId = productId || Math.random().toString(36).substr(2, 9);

    return {
      element: productEl,
      id: productId,
      name: productEl.querySelector(nameSelector)?.textContent?.trim() || '',
      price: parseFloat(productEl.dataset.price) || parseFloat(productEl.querySelector(priceSelector)?.textContent?.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0,
      color: productEl.dataset.color?.toLowerCase() || '',
      colors: (productEl.dataset.colors || '').toLowerCase().split(',').filter(c => c),
      category: productEl.dataset.category?.toLowerCase() || '',
      style: productEl.dataset.style?.toLowerCase() || '',
      gender: productEl.dataset.gender?.toLowerCase() || 'ambele',
      size: (productEl.dataset.sizes || 'xs,s,m,l,xl,xxl').toLowerCase().split(','),
      image: productEl.querySelector('img')?.src || '',
      platform: CONFIG._platform || 'generic',
    };
  }

  function calculateMatchScore(product, profile) {
    let score = 0;
    let factors = 0;

    // Gender match (25 points)
    if (profile.gender) {
      factors++;
      const gender = profile.gender.toLowerCase();
      const productGender = product.gender.toLowerCase();
      if (productGender === 'ambele' || productGender === 'both' ||
          productGender === gender ||
          gender === 'ambele' || gender === 'both') {
        score += 25;
      }
    }

    // Size match (15 points)
    if (profile.size) {
      factors++;
      const size = profile.size.toLowerCase();
      if (product.size.includes(size)) {
        score += 15;
      }
    }

    // Color match (30 points)
    if (profile.colors && profile.colors.length > 0) {
      factors++;
      const profileColors = profile.colors.map(c => c.toLowerCase());
      const productColors = product.colors.length > 0 ? product.colors : [product.color];

      const hasMatch = productColors.some(pc =>
        profileColors.some(uc => pc.includes(uc) || uc.includes(pc))
      );
      if (hasMatch) {
        score += 30;
      }
    }

    // Style match (20 points)
    if (profile.style) {
      factors++;
      const style = profile.style.toLowerCase();
      if (product.style && (product.style.includes(style) || style.includes(product.style))) {
        score += 20;
      }
    }

    // Budget match (10 points)
    if (profile.budget && product.price > 0) {
      factors++;
      const budget = profile.budget.toLowerCase();
      let maxBudget = Infinity;

      if (budget.includes('sub 100') || budget.includes('under')) maxBudget = 100;
      else if (budget.includes('100-300') || budget.includes('50-150')) maxBudget = 300;
      else if (budget.includes('300-500') || budget.includes('150-300')) maxBudget = 500;

      if (product.price <= maxBudget) {
        score += 10;
      }
    }

    // Normalize score to percentage
    const maxScore = factors > 0 ? factors * (100 / 5) : 100;
    return Math.round((score / maxScore) * 100);
  }

  function showMatchingProducts() {
    findProducts();

    if (state.products.length === 0) {
      setAvatarState('idle');
      return;
    }

    // Show searching message
    setAvatarState('think');
    showBubble(t.profiling.searching, [], { duration: 1500 });

    setTimeout(() => {
      hideBubble();

      // Calculate match scores
      let productsWithScores = state.products.map(el => {
        const product = getProductData(el);
        product.matchScore = calculateMatchScore(product, state.profile);
        return product;
      });

      // Filter by category if specified (not 'all')
      const selectedCategory = state.profile.category;
      if (selectedCategory && selectedCategory !== 'all') {
        productsWithScores = productsWithScores.filter(p => {
          const productCategory = p.category.toLowerCase();
          const productName = p.name.toLowerCase();

          // Match category aliases
          const categoryMatches = {
            'sneakers': ['sneakers', 'incaltaminte', 'pantofi', 'adidasi', 'ghete', 'cizme', 'sandale', 'papuci'],
            'tricouri': ['tricouri', 'tricou', 'top', 'bluze', 'camasi', 'camasa'],
            'pantaloni': ['pantaloni', 'jeans', 'shorts', 'sort', 'leggings'],
            'rochii': ['rochii', 'rochie', 'fuste', 'fusta', 'salopeta'],
            'geci': ['geci', 'geaca', 'jachete', 'jacheta', 'haina', 'palton', 'pufoaica', 'vesta'],
            'accesorii': ['accesorii', 'geanta', 'genti', 'curea', 'ceas', 'bijuterii', 'ochelari', 'esarfa', 'palarie'],
          };

          const aliases = categoryMatches[selectedCategory] || [selectedCategory];
          return aliases.some(alias =>
            productCategory.includes(alias) || productName.includes(alias)
          );
        });
      }

      // Sort by match score
      productsWithScores.sort((a, b) => b.matchScore - a.matchScore);

      // Get top matches (score >= 50%)
      const topMatches = productsWithScores.filter(p => p.matchScore >= 50).slice(0, 8);

      if (topMatches.length === 0) {
        // No good matches with 50%+, try with category filter only
        const categoryMatches = productsWithScores.slice(0, 5);

        if (categoryMatches.length > 0) {
          setAvatarState('talk');
          const msg = (t.profiling.foundProducts || 'Am găsit {count} produse!').replace('{count}', categoryMatches.length);
          showBubble(msg, [], { duration: 2000 });

          setTimeout(() => {
            hideBubble();
            showNextMatch(categoryMatches, 0);
          }, 2000);
        } else {
          // No matches at all
          setAvatarState('sorry');
          showBubble(t.profiling.noProducts, [], { duration: 2000 });
          setTimeout(() => {
            hideBubble();
            setAvatarState('idle');
            // Stay in position - no random walking
          }, 2000);
        }
        return;
      }

      // Show found products message
      setAvatarState('happy');
      const foundMsg = (t.profiling.foundProducts || 'Am găsit {count} produse!').replace('{count}', topMatches.length);
      showBubble(foundMsg, [], { duration: 2000 });

      // Walk to first match
      setTimeout(() => {
        hideBubble();
        showNextMatch(topMatches, 0);
      }, 2000);
    }, 1500);
  }

  function showNextMatch(matches, index) {
    if (index >= matches.length) {
      setAvatarState('idle');
      hideLaserPointer();
      // Stay in position - professional consultant
      return;
    }

    const product = matches[index];

    // Use teleport for futuristic effect
    teleportToElement(product.element, () => {
      const priceText = product.price > 0 ? `${product.price} lei` : '';

      showBubbleWithTyping(product.name || 'Uite ce ti-am gasit!', [
        { text: '🛒 Adauga in cos', primary: true, action: 'add' },
        { text: 'Urmatorul →', action: 'next' }
      ], {
        price: priceText,
        match: product.matchScore,
        onSelect: (action) => {
          hideLaserPointer();
          if (action === 'add') {
            addToCart(product.element);
            setTimeout(() => {
              if (index < matches.length - 1) {
                showNextMatch(matches, index + 1);
              } else {
                setAvatarState('idle');
                // Stay in position - no random walking
              }
            }, 4000);
          } else {
            hideBubble();
            showNextMatch(matches, index + 1);
          }
        }
      });
    });
  }

  function showBubbleWithTyping(text, buttons = [], options = {}) {
    hideBubble();

    const bubble = document.createElement('div');
    bubble.className = 'caty-bubble' + (options.exitIntent ? ' exit-intent' : '');

    let html = `<button class="caty-bubble-close">&times;</button>`;
    html += `<div class="caty-bubble-text ${options.large ? 'large' : ''}" id="caty-typing-text"></div>`;

    if (options.price) {
      html += `<div class="caty-bubble-price">${options.price}</div>`;
    }

    if (options.match) {
      html += `<div class="caty-bubble-match">⚡ ${options.match}% ${t.matchScore}</div>`;
    }

    if (options.discountCode) {
      html += `<div class="caty-discount-code">${options.discountCode}</div>`;
    }

    if (buttons.length > 0) {
      html += '<div class="caty-bubble-buttons" style="opacity: 0; transition: opacity 0.3s;">';
      buttons.forEach((btn, i) => {
        const cls = btn.primary ? 'primary' : '';
        const small = btn.small ? 'small' : '';
        html += `<button class="caty-bubble-btn ${cls} ${small}" data-action="${btn.action || i}">${btn.text}</button>`;
      });
      html += '</div>';
    }

    bubble.innerHTML = html;

    // Close button
    bubble.querySelector('.caty-bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      hideBubble();
    });

    // Button clicks
    const buttonsContainer = bubble.querySelector('.caty-bubble-buttons');
    bubble.querySelectorAll('.caty-bubble-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (options.onSelect) {
          options.onSelect(action, btn.textContent);
        }
      });
    });

    state.avatar.appendChild(bubble);
    state.bubble = bubble;
    setAvatarState('talk');

    // Voice - always speak
    VoiceEngine.speak(text);

    // Typing animation
    const textEl = bubble.querySelector('#caty-typing-text');
    let charIndex = 0;
    const typingSpeed = 30;

    function typeChar() {
      if (charIndex < text.length) {
        textEl.textContent += text[charIndex];
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        // Show buttons after typing
        if (buttonsContainer) {
          buttonsContainer.style.opacity = '1';
        }
      }
    }

    typeChar();
  }

  // ============================================
  // Dynamic Profiling (SAG-aware, from Auto-Crawl)
  // ============================================
  function startDynamicProfiling() {
    const profiling = CONFIG._dynamicProfiling;
    if (!profiling || !profiling.questions || profiling.questions.length === 0) {
      skipProfiling();
      return;
    }

    state.profilingStarted = true;
    state.dynamicStep = 0;
    state.dynamicAnswers = {};
    setAvatarState('talk');

    showDynamicQuestion(0);
  }

  function showDynamicQuestion(stepIndex) {
    const profiling = CONFIG._dynamicProfiling;
    if (!profiling || stepIndex >= profiling.questions.length) {
      // Profiling complete
      completeDynamicProfiling();
      return;
    }

    const question = profiling.questions[stepIndex];
    const lang = CONFIG.language || 'ro';
    const questionText = typeof question.question === 'object'
      ? (question.question[lang] || question.question.ro || question.question.en || '')
      : question.question;

    const buttons = (question.options || []).map(opt => {
      const label = typeof opt.label === 'object'
        ? (opt.label[lang] || opt.label.ro || opt.label.en || opt.id)
        : (opt.label || opt.id);
      return {
        text: (opt.icon ? opt.icon + ' ' : '') + label,
        action: opt.id
      };
    });

    if (buttons.length > 0) {
      buttons[0].primary = true;
    }

    showBubble(questionText, buttons, {
      large: true,
      onSelect: (action) => {
        state.dynamicAnswers[question.id] = action;
        state.dynamicStep = stepIndex + 1;

        // Next question or complete
        if (stepIndex + 1 < profiling.questions.length) {
          setAvatarState('think');
          setTimeout(() => {
            setAvatarState('talk');
            showDynamicQuestion(stepIndex + 1);
          }, 500);
        } else {
          completeDynamicProfiling();
        }
      }
    });
  }

  function completeDynamicProfiling() {
    state.profilingComplete = true;
    state.dynamicProfile = state.dynamicAnswers;

    // Save to localStorage
    try {
      localStorage.setItem('caty_dynamic_profile', JSON.stringify(state.dynamicAnswers));
    } catch (e) {}

    const lang = CONFIG.language || 'ro';
    const name = getPersonaName();
    const completeMsg = lang === 'ro'
      ? `Perfect! Acum știu exact ce să vă recomand! Permiteți-mi să caut cele mai bune opțiuni.`
      : `Perfect! Now I know exactly what to recommend! Let me find the best options for you.`;

    setAvatarState('happy');
    showBubble(completeMsg, [], { duration: 2500 });

    // Track profiling completion
    trackCommerceEvent('profiling_complete', {
      answers: state.dynamicAnswers,
      source: 'dynamic_sag'
    });

    setTimeout(() => {
      hideBubble();
      setAvatarState('idle');
      // Stay in position - professional consultant
    }, 2500);
  }

  function skipProfiling() {
    state.profilingStarted = false;
    hideBubble();
    setAvatarState('idle');
    // Stay in position - professional consultant
  }

  // ============================================
  // Product Interactions
  // ============================================
  function findProducts() {
    state.products = Array.from(document.querySelectorAll(CONFIG.productSelector));
    return state.products;
  }

  // ============================================
  // CROSS-SELL ENGINE - Knows what goes with what
  // Like a real salesperson who knows complementary products
  // ============================================
  const CROSS_SELL_MAP = {
    // Tools & Construction (inotools etc.)
    'mașină de găurit|bormasina|bormasină|drill|gaurit': ['burghie', 'set burghie', 'mandrina', 'acumulator', 'baterie'],
    'flex|polizor|grinder': ['disc', 'discuri', 'ochelari protecție', 'mănuși'],
    'fierăstrău|circular|ferastrau|saw': ['pânză', 'lame', 'cleme', 'ochelari'],
    'șurubelnița|surubelnita|screwdriver': ['set biți', 'biti', 'prelungitor'],
    'compresor|compressor': ['furtun', 'pistol vopsit', 'manometru'],
    'sudura|sudură|aparat sudura|welder': ['electrozi', 'mască sudură', 'mănuși sudură'],
    'betoniera|betonieră|mixer': ['ciment', 'nisip', 'roaba', 'lopată'],
    'generator|grup electrogen': ['cablu prelungitor', 'ulei', 'bujie'],
    'motocoasa|motocosă|trimmer': ['fir trimmer', 'disc', 'ulei amestec', 'ham'],
    'motosapa|motosapă|cultivator': ['plug', 'roți', 'ulei'],
    'drujba|drujbă|chainsaw': ['lanț', 'ulei lanț', 'pilă', 'lame'],
    'pistol|impact|cheie impact': ['tubulare', 'set tubulare', 'prelungitor'],
    'masina spalat|aparat spalat|pressure washer': ['furtun', 'lance', 'detergent'],
    'nivela|nivelă|laser': ['trepied', 'stativ', 'ruletă'],
    'scara|scară|ladder': ['platformă', 'centură siguranță'],
    'vopsea|paint': ['trafalet', 'pensulă', 'diluant', 'bandă adezivă'],
    'parchet|laminat|floor': ['underlay', 'plintă', 'adeziv', 'distanțiere'],
    'faianța|faianta|gresie|tile': ['adeziv', 'chit rosturi', 'crucișoare', 'nivelator'],

    // Electronics
    'laptop|notebook': ['mouse', 'husă', 'suport laptop', 'tastatură'],
    'telefon|smartphone|phone': ['husă', 'folie', 'încărcător', 'căști'],
    'imprimanta|imprimantă|printer': ['cartus', 'hârtie', 'toner'],
    'monitor|display': ['cablu HDMI', 'suport monitor', 'kit curățare'],

    // Furniture / Home
    'masa|masă|table': ['scaune', 'fata de masă', 'protecție'],
    'scaun|chair': ['pernă', 'roți scaun', 'protecție podea'],
    'dulap|sifonier|wardrobe': ['umerașe', 'cutii depozitare', 'organizator'],
    'pat|bed': ['saltea', 'lenjerie', 'pernă', 'protecție saltea'],
  };

  /**
   * Find complementary products on the page based on what user is looking at
   */
  function findCrossSellProducts(productName) {
    const lowerName = (productName || '').toLowerCase();
    let suggestions = [];

    // Find matching cross-sell category
    for (const [pattern, complements] of Object.entries(CROSS_SELL_MAP)) {
      const keywords = pattern.split('|');
      if (keywords.some(kw => lowerName.includes(kw))) {
        suggestions = complements;
        break;
      }
    }

    if (suggestions.length === 0) return [];

    // Search for these complementary products on the current page
    const allProducts = document.querySelectorAll(CONFIG.productSelector);
    const found = [];

    for (const prodEl of allProducts) {
      const nameEl = prodEl.querySelector(CONFIG.nameSelector || '.product-name, h2, h3');
      const name = nameEl?.textContent?.trim()?.toLowerCase() || '';
      if (!name) continue;

      for (const suggestion of suggestions) {
        if (name.includes(suggestion.toLowerCase())) {
          found.push({
            element: prodEl,
            name: nameEl.textContent.trim(),
            matchedSuggestion: suggestion,
          });
          break;
        }
      }
    }

    return found.slice(0, 3); // Max 3 cross-sell suggestions
  }

  /**
   * Generate cross-sell message
   */
  function getCrossSellMessage(productName, crossSellProducts) {
    const lang = CONFIG.language || 'ro';
    const names = crossSellProducts.map(p => p.name).slice(0, 2);

    if (lang === 'ro') {
      if (names.length === 1) {
        return `Dacă luați ${productName}, vă recomand și ${names[0]}. Merg foarte bine împreună!`;
      } else if (names.length >= 2) {
        return `Pentru ${productName}, vă sugerez și ${names[0]} sau ${names[1]}. Le veți avea nevoie sigur!`;
      }
    } else {
      if (names.length === 1) {
        return `If you're getting ${productName}, I also recommend ${names[0]}. They go great together!`;
      } else {
        return `For ${productName}, you might also want ${names[0]} or ${names[1]}. You'll definitely need them!`;
      }
    }
    return '';
  }

  /**
   * Extract detailed product info from the page element
   * Reads description, features, brand, stock, rating - everything visible
   */
  function extractProductDetails(productEl) {
    const details = { description: '', features: [], brand: '', rating: '', stock: '', discount: '' };

    // Try multiple selectors for description
    const descSelectors = [
      '.product-description', '.description', '.short-description',
      '.woocommerce-product-details__short-description',
      '[itemprop="description"]', '.product-text', '.product-info',
      '.product_meta', '.product-excerpt', 'p.description',
    ];
    for (const sel of descSelectors) {
      const el = productEl.querySelector(sel) || document.querySelector(sel);
      if (el?.textContent?.trim()) {
        details.description = el.textContent.trim().substring(0, 200);
        break;
      }
    }

    // Features / specs
    const featureEls = productEl.querySelectorAll('.feature, .spec, li, .attribute');
    featureEls.forEach(el => {
      const text = el.textContent?.trim();
      if (text && text.length > 3 && text.length < 80) {
        details.features.push(text);
      }
    });
    details.features = details.features.slice(0, 4);

    // Brand
    const brandEl = productEl.querySelector('.brand, [itemprop="brand"], .product-brand, .manufacturer');
    if (brandEl) details.brand = brandEl.textContent?.trim() || '';

    // Rating
    const ratingEl = productEl.querySelector('.rating, .star-rating, [itemprop="ratingValue"], .review-count');
    if (ratingEl) details.rating = ratingEl.textContent?.trim() || ratingEl.getAttribute('aria-label') || '';

    // Discount / sale
    const saleEl = productEl.querySelector('.sale, .discount, .onsale, .badge-sale, del, .old-price, .price-old');
    if (saleEl) details.discount = saleEl.textContent?.trim() || '';

    // Stock
    const stockEl = productEl.querySelector('.stock, .availability, [itemprop="availability"], .in-stock');
    if (stockEl) details.stock = stockEl.textContent?.trim() || '';

    return details;
  }

  /**
   * Real Salesperson AI - generates natural sales pitch in the site's language
   * Like walking into a store and having a salesperson explain the product
   */
  function getSmartProductComment(name, price, productEl) {
    const persona = getPersonaName();
    const priceNum = parseFloat((price || '').replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
    const details = productEl ? extractProductDetails(productEl) : {};
    const hasDesc = details.description && details.description.length > 10;
    const hasBrand = details.brand && details.brand.length > 1;
    const hasFeatures = details.features && details.features.length > 0;
    const hasDiscount = details.discount && details.discount.length > 1;

    if (CONFIG.language === 'ro') {
      // === ROMANIAN - Perfect grammar with diacritics ===
      const pitches = [];

      // Opening lines (warm, professional)
      const openings = [
        `Văd că te uiți la ${name}.`,
        `Ah, ${name} - alegere excelentă!`,
        `${name} - permiteți-mi să vă spun câteva cuvinte despre acest produs.`,
        `Bună alegere! ${name} este unul dintre cele mai apreciate produse ale noastre.`,
        `Ați pus ochii pe ${name} - aveți un gust foarte bun!`,
      ];
      pitches.push(openings[Math.floor(Math.random() * openings.length)]);

      // Description-based pitch
      if (hasDesc) {
        pitches.push(details.description.split('.')[0] + '.');
      }

      // Brand mention
      if (hasBrand) {
        pitches.push(`Este un produs ${details.brand}, o marcă de încredere.`);
      }

      // Feature highlight
      if (hasFeatures) {
        pitches.push(`Printre caracteristici: ${details.features[0]}.`);
      }

      // Price-based selling
      if (priceNum > 0) {
        if (hasDiscount) {
          pitches.push(`Și este la reducere acum! O oportunitate pe care nu ar trebui să o ratați.`);
        } else if (priceNum < 50) {
          pitches.push(`La acest preț este o ofertă de neratat!`);
        } else if (priceNum < 200) {
          pitches.push(`Un raport calitate-preț foarte bun.`);
        } else if (priceNum < 500) {
          pitches.push(`Este o investiție care merită fiecare leu.`);
        } else {
          pitches.push(`Un produs premium, pentru cei care apreciază calitatea superioară.`);
        }
      }

      // Closing - call to action
      const closings = [
        `Doriți să îl adăugați în coș?`,
        `Vă recomand cu încredere!`,
        `Ce ziceți, îl luăm?`,
      ];
      pitches.push(closings[Math.floor(Math.random() * closings.length)]);

      // Return 2-3 sentences max for voice clarity
      return pitches.slice(0, Math.min(3, pitches.length)).join(' ');
    }

    // === ENGLISH ===
    const pitches = [];

    const openings = [
      `I see you're looking at ${name}.`,
      `${name} - excellent choice!`,
      `Let me tell you about ${name}.`,
      `Great taste! ${name} is one of our most popular products.`,
    ];
    pitches.push(openings[Math.floor(Math.random() * openings.length)]);

    if (hasDesc) {
      pitches.push(details.description.split('.')[0] + '.');
    }

    if (hasBrand) {
      pitches.push(`It's a ${details.brand} product, a trusted brand.`);
    }

    if (hasFeatures) {
      pitches.push(`Key feature: ${details.features[0]}.`);
    }

    if (priceNum > 0) {
      if (hasDiscount) {
        pitches.push(`And it's on sale right now! Don't miss this opportunity.`);
      } else if (priceNum < 50) {
        pitches.push(`At this price, it's a steal!`);
      } else if (priceNum < 200) {
        pitches.push(`Great value for the quality you get.`);
      } else {
        pitches.push(`A premium product for those who appreciate quality.`);
      }
    }

    const closings = [
      `Would you like to add it to your cart?`,
      `I highly recommend it!`,
      `What do you think, shall we go for it?`,
    ];
    pitches.push(closings[Math.floor(Math.random() * closings.length)]);

    return pitches.slice(0, 3).join(' ');
  }

  function onProductClick(e) {
    const productEl = e.target.closest(CONFIG.productSelector);
    if (!productEl || state.isWalking) return;

    state.userEngaged = true;
    state.selectedProduct = productEl;
    stopRandomWalking();

    // Get product info (platform-aware selectors)
    const nameSelector = CONFIG.nameSelector || '.product-name, h2, h3';
    const priceSelector = CONFIG.priceSelector || '.product-price, .price';
    const name = productEl.querySelector(nameSelector)?.textContent?.trim() || 'Acest produs';
    const priceEl = productEl.querySelector(priceSelector);
    const price = priceEl?.textContent?.trim() || '';

    // Real salesperson pitch about this specific product
    const smartComment = getSmartProductComment(name, price, productEl);

    // Find cross-sell products BEFORE teleporting
    const crossSellProducts = findCrossSellProducts(name);
    const crossSellMsg = crossSellProducts.length > 0 ? getCrossSellMessage(name, crossSellProducts) : '';

    // Full sales pitch = product comment + cross-sell suggestion
    const fullPitch = crossSellMsg ? smartComment + ' ' + crossSellMsg : smartComment;

    // SPEAK IMMEDIATELY on click (before teleport) - critical for mobile gesture chain
    VoiceEngine.speak(fullPitch);

    // Teleport to product with laser (visual only)
    teleportToElement(productEl, () => {
      setAvatarState('talk');

      // Show bubble with add-to-cart buttons (unless voice-only mode)
      if (!state._voiceOnlyMode) {
        showBubbleWithTyping(fullPitch, [
          { text: '🛒 ' + t.addToCart, primary: true, action: 'add' },
          { text: t.keepBrowsing, action: 'browse' }
        ], {
          price: price,
          silent: true, // Already speaking via VoiceEngine above
          onSelect: (action) => {
            hideLaserPointer();
            if (action === 'add') {
              addToCart(productEl);
            } else {
              hideBubble();
              setAvatarState('idle');
            }
          }
        });
      } else {
        // Voice-only mode: just show talk state, auto-reset
        setTimeout(() => {
          setAvatarState('idle');
          hideLaserPointer();
          state.userEngaged = false;
        }, 8000);
      }
    });
  }

  function addToCart(productEl) {
    const product = getProductData(productEl);

    // Try to click actual add to cart button on the page
    const addBtn = productEl.querySelector(CONFIG.addToCartSelector);
    if (addBtn) {
      addBtn.click();
    }

    // Add to internal cart
    if (!state.cart) state.cart = [];
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      addedAt: Date.now()
    });

    // Save cart to localStorage
    try {
      localStorage.setItem('caty_cart', JSON.stringify(state.cart));
    } catch (e) {}

    // Dispatch custom event for external cart integration
    window.dispatchEvent(new CustomEvent('caty:addToCart', {
      detail: { product, cart: state.cart }
    }));

    // Celebrate!
    hideBubble();
    showConfetti();
    createSparkles();

    // Set happy mood
    if (state._useNeuralAvatar && state.neuralEngine) {
      state.neuralEngine.setMood('happy');
      if (state.avatar) state.avatar.dataset.mood = 'happy';
    } else {
      const img = state.avatar?.querySelector('.caty-avatar-img');
      if (img) {
        if (!state._useCustomAvatar) img.src = AVATARS.happy;
        img.className = 'caty-avatar-img happy';
        state.avatar.dataset.mood = 'happy';
      }
    }

    // Voice confirmation - like a real salesperson
    const cartCount = state.cart.length;
    const cartTotal = state.cart.reduce((sum, item) => sum + (item.price || 0), 0);
    const lang = CONFIG.language || 'ro';
    let voiceMsg;

    if (lang === 'ro') {
      if (cartCount === 1) {
        voiceMsg = `Excelentă alegere! Am adăugat ${product.name} în coșul dumneavoastră.`;
      } else if (cartCount === 2) {
        voiceMsg = `Perfect! Aveți acum ${cartCount} produse în coș. Gusturi foarte bune!`;
      } else if (cartCount >= 3 && cartCount <= 5) {
        voiceMsg = `Adăugat! Aveți ${cartCount} produse în coș` +
          (cartTotal > 0 ? `, în valoare de ${Math.round(cartTotal)} lei.` : '.') +
          ` Nu uitați să finalizați comanda!`;
      } else {
        voiceMsg = `Încă un produs excelent! Aveți ${cartCount} produse în coș. Vă recomand să finalizați comanda pentru a nu pierde stocul!`;
      }
    } else {
      if (cartCount === 1) {
        voiceMsg = `Excellent choice! I've added ${product.name} to your cart.`;
      } else if (cartCount <= 3) {
        voiceMsg = `Added! You now have ${cartCount} items in your cart. Great taste!`;
      } else {
        voiceMsg = `Another great pick! You have ${cartCount} items in your cart. Don't forget to checkout!`;
      }
    }

    VoiceEngine.speak(voiceMsg);

    // Show bubble only in standalone mode
    if (!state._voiceOnlyMode) {
      const bubble = document.createElement('div');
      bubble.className = 'caty-bubble';
      const totalText = cartTotal > 0 ? ` - ${Math.round(cartTotal)} lei` : '';
      bubble.innerHTML = `
        <button class="caty-bubble-close">&times;</button>
        <div class="caty-bubble-text large">${t.addedToCart}</div>
        <div class="caty-bubble-text" style="color: #22c55e; font-weight: 600;">${cartCount} produs${cartCount > 1 ? 'e' : ''} în coș${totalText}</div>
      `;
      bubble.querySelector('.caty-bubble-close').addEventListener('click', () => {
        bubble.remove();
        state.bubble = null;
      });
      state.avatar.appendChild(bubble);
      state.bubble = bubble;

      setTimeout(() => {
        if (state.bubble === bubble) {
          bubble.remove();
          state.bubble = null;
        }
      }, 3500);
    }

    // Schedule cart reminder
    scheduleCartReminder();

    setTimeout(() => {
      setAvatarState('idle');
      // Stay in position - professional consultant
    }, 3500);
  }

  // ============================================
  // CART REMINDER - Professional Sales Follow-up
  // Reminds user to checkout if they have items in cart
  // ============================================
  function scheduleCartReminder() {
    // Clear any existing reminder
    if (state._cartReminderTimer) {
      clearTimeout(state._cartReminderTimer);
    }

    // First reminder: 60 seconds after last add to cart
    state._cartReminderTimer = setTimeout(() => {
      triggerCartReminder();
    }, 60000);
  }

  function triggerCartReminder() {
    if (!state.cart || state.cart.length === 0) return;
    if (state.bubble || state.supportChatOpen) return; // Don't interrupt

    const cartCount = state.cart.length;
    const cartTotal = state.cart.reduce((sum, item) => sum + (item.price || 0), 0);
    const lang = CONFIG.language || 'ro';
    const name = getPersonaName();

    let reminderMsg;
    const reminderLevel = state._cartReminderCount || 0;

    if (lang === 'ro') {
      if (reminderLevel === 0) {
        // First reminder - gentle
        reminderMsg = `Văd că aveți ${cartCount} produs${cartCount > 1 ? 'e' : ''} în coș` +
          (cartTotal > 0 ? ` în valoare de ${Math.round(cartTotal)} lei` : '') +
          `. Nu uitați să finalizați comanda! Stocurile sunt limitate.`;
      } else if (reminderLevel === 1) {
        // Second reminder - urgency
        reminderMsg = `Încă sunteți aici? Produsele din coșul dumneavoastră vă așteaptă! ` +
          `Finalizați comanda acum pentru a beneficia de cele mai bune prețuri.`;
      } else {
        // Third+ reminder - helpful
        reminderMsg = `Aveți nevoie de ajutor cu comanda? Sunt ${name}, și vă pot ajuta oricând. ` +
          `Aveți ${cartCount} produs${cartCount > 1 ? 'e' : ''} care vă așteaptă în coș.`;
      }
    } else {
      if (reminderLevel === 0) {
        reminderMsg = `I see you have ${cartCount} item${cartCount > 1 ? 's' : ''} in your cart` +
          (cartTotal > 0 ? ` worth $${Math.round(cartTotal)}` : '') +
          `. Don't forget to checkout! Stock is limited.`;
      } else if (reminderLevel === 1) {
        reminderMsg = `Still browsing? Your cart items are waiting! ` +
          `Complete your order now for the best prices.`;
      } else {
        reminderMsg = `Need help with your order? I'm ${name}, happy to assist anytime. ` +
          `You have ${cartCount} item${cartCount > 1 ? 's' : ''} waiting in your cart.`;
      }
    }

    state._cartReminderCount = (state._cartReminderCount || 0) + 1;

    // Speak the reminder
    setAvatarState('talk');
    VoiceEngine.speak(reminderMsg);

    // Show bubble only in standalone mode
    if (!state._voiceOnlyMode) {
      // Find cart/checkout link on the page
      const checkoutLink = document.querySelector(
        'a[href*="checkout"], a[href*="cart"], a[href*="cos"], .checkout-btn, .cart-link, ' +
        'a[href*="comanda"], a[href*="finalizare"], .btn-checkout'
      );
      const checkoutUrl = checkoutLink?.href || '';

      const buttons = [];
      if (checkoutUrl) {
        buttons.push({ text: lang === 'ro' ? 'Finalizează comanda' : 'Checkout now', primary: true, action: 'checkout' });
      }
      buttons.push({ text: lang === 'ro' ? 'Mai cumpăr' : 'Keep shopping', action: 'browse' });

      showBubble(reminderMsg, buttons, {
        persistent: true,
        silent: true, // Don't double-speak
        onSelect: (action) => {
          if (action === 'checkout' && checkoutUrl) {
            window.location.href = checkoutUrl;
          } else {
            hideBubble();
            setAvatarState('idle');
            // Stay in position - no random walking
          }
        }
      });
    }

    setTimeout(() => {
      setAvatarState('idle');
    }, 4000);

    // Schedule next reminder (increasing intervals: 60s, 120s, 180s, max 3)
    if (state._cartReminderCount < 3) {
      state._cartReminderTimer = setTimeout(() => {
        triggerCartReminder();
      }, (state._cartReminderCount + 1) * 60000);
    }
  }

  function recommendProduct() {
    if (!state.profilingComplete || state.products.length === 0) return;

    const product = randomItem(state.products);
    if (!product) return;

    setAvatarState('think');
    showBubble(t.foundProduct, [], { duration: 2000 });

    setTimeout(() => {
      walkToElement(product, () => {
        const name = product.querySelector(CONFIG.nameSelector || '.product-name, h2, h3')?.textContent?.trim() || '';
        const price = product.querySelector(CONFIG.priceSelector || '.product-price, .price')?.textContent?.trim() || '';
        const match = random(80, 98);

        showBubble(name || t.foundProduct, [
          { text: t.addToCart, primary: true, action: 'add' },
          { text: t.keepBrowsing, action: 'browse' }
        ], {
          price: price,
          match: match,
          onSelect: (action) => {
            if (action === 'add') {
              addToCart(product);
            } else {
              hideBubble();
              setAvatarState('idle');
            }
          }
        });
      });
    }, 2000);
  }

  // ============================================
  // Exit Intent
  // ============================================
  function setupExitIntent() {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY > 20 || state.exitIntentTriggered || state.bubble) return;

      state.exitIntentTriggered = true;
      stopRandomWalking();

      // Walk to center
      const centerX = window.innerWidth / 2 - CONFIG.avatarSize / 2;
      walkTo(centerX, 80, () => {
        setAvatarState('sorry');
        showBubble(
          `${t.exitIntent}<br>${t.exitIntentOffer}`,
          [
            { text: t.stayButton, primary: true, action: 'stay' },
            { text: t.leaveButton, action: 'leave' }
          ],
          {
            exitIntent: true,
            discountCode: CONFIG.exitIntentDiscount,
            persistent: true,
            onSelect: (action) => {
              if (action === 'stay') {
                setAvatarState('happy');
                showConfetti();
                hideBubble();
                setTimeout(() => {
                  setAvatarState('idle');
                  // Stay in position - no random walking
                }, 2000);
              } else {
                hideBubble();
                setAvatarState('wave');
                setTimeout(() => setAvatarState('idle'), 2000);
              }
            }
          }
        );
      });
    });
  }

  // ============================================
  // Chat-Only Mode (walking_robot: false) — Premium 70/30 Cameleon Sidebar
  // ============================================

  function initChatOnlyMode() {
    // Defer to widget.js if already present — it owns the sidebar
    if (document.querySelector('script[src*="widget.js"]') ||
        window.CatyWidget || window.Caty) {
      console.log('[CatyCommerce] Chat-only: widget.js present, deferring');
      return;
    }

    const primary = CONFIG.primaryColor || '#3b82f6';
    const personaName = getPersonaName();
    const avatarSrc = CONFIG._customAvatar || AVATARS.talk;
    const industry = (CONFIG._industry || '').toLowerCase();

    // Extract host page colors for glassmorphism context
    const bodyStyles = window.getComputedStyle(document.body);
    const hostBg = bodyStyles.backgroundColor || 'rgba(255,255,255,0.95)';
    const hostText = bodyStyles.color || '#1f2937';

    // ── Premium 70/30 sidebar CSS ─────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
      body.caty-cs-active {
        margin-right: 30vw !important;
        overflow-x: hidden !important;
        transition: margin-right 0.35s cubic-bezier(0.4,0,0.2,1);
      }
      .caty-cs-panel {
        position: fixed !important;
        right: 0 !important; top: 0 !important; bottom: 0 !important;
        width: 30vw !important;
        min-width: 320px !important;
        max-width: 480px !important;
        height: 100vh !important;
        background: ${hostBg} !important;
        color: ${hostText} !important;
        backdrop-filter: blur(32px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(32px) saturate(180%) !important;
        border-left: 0.5px solid rgba(128,128,128,0.2) !important;
        box-shadow: -8px 0 48px rgba(0,0,0,0.10),-2px 0 12px rgba(0,0,0,0.06) !important;
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateX(0);
        transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
      }
      .caty-cs-panel.caty-cs-hidden { transform: translateX(110%); }
      /* ── Header ── */
      .caty-cs-header {
        background: ${primary};
        color: #fff;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      .caty-cs-avatar {
        width: 44px; height: 44px; border-radius: 50%;
        background: rgba(255,255,255,0.2); overflow: hidden;
        display: flex; align-items: center; justify-content: center;
      }
      .caty-cs-avatar img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
      .caty-cs-name { font-weight: 700; font-size: 15px; line-height: 1.2; }
      .caty-cs-status {
        font-size: 11px; opacity: 0.85;
        display: flex; align-items: center; gap: 4px; margin-top: 2px;
      }
      .caty-cs-status::before {
        content:''; width:7px; height:7px;
        background:#22c55e; border-radius:50%; display:inline-block;
      }
      .caty-cs-close {
        background:none; border:none; color:#fff; font-size:22px;
        cursor:pointer; margin-left:auto; padding:0 4px; line-height:1;
      }
      /* ── Body ── */
      .caty-cs-body {
        flex:1; overflow-y:auto; padding:16px;
        display:flex; flex-direction:column; gap:10px;
      }
      .caty-cs-msg {
        max-width:85%; padding:10px 14px; border-radius:14px;
        font-size:14px; line-height:1.5; word-break:break-word;
      }
      .caty-cs-msg.bot {
        background:rgba(0,0,0,0.06); color:inherit;
        align-self:flex-start; border-radius:4px 14px 14px 14px;
      }
      .caty-cs-msg.user {
        background:${primary}; color:#fff;
        align-self:flex-end; border-radius:14px 14px 4px 14px;
      }
      /* ── Chips (vertical-adaptive) ── */
      .caty-cs-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:4px; }
      .caty-cs-chip {
        background:rgba(0,0,0,0.05); border:1px solid rgba(0,0,0,0.12);
        color:inherit; border-radius:20px; padding:6px 14px;
        font-size:13px; cursor:pointer;
        transition:background 0.2s,color 0.2s,border-color 0.2s;
        white-space:nowrap;
      }
      .caty-cs-chip:hover { background:${primary}; color:#fff; border-color:${primary}; }
      /* ── Typing ── */
      .caty-cs-typing {
        display:flex; gap:4px; padding:10px 14px;
        align-self:flex-start;
      }
      .caty-cs-typing span {
        width:7px; height:7px; background:${primary};
        border-radius:50%; opacity:0.4;
        animation:catyCSPulse 1.2s infinite;
      }
      .caty-cs-typing span:nth-child(2){animation-delay:0.2s}
      .caty-cs-typing span:nth-child(3){animation-delay:0.4s}
      @keyframes catyCSPulse{0%,80%,100%{opacity:0.4;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}
      /* ── Footer ── */
      .caty-cs-footer {
        padding:12px 16px; border-top:1px solid rgba(0,0,0,0.08);
        display:flex; gap:8px; flex-shrink:0;
      }
      .caty-cs-input {
        flex:1; border:1px solid rgba(0,0,0,0.15); border-radius:24px;
        padding:10px 16px; font-size:14px; outline:none;
        background:rgba(255,255,255,0.8); font-family:inherit;
      }
      .caty-cs-input:focus { border-color:${primary}; box-shadow:0 0 0 2px ${primary}22; }
      .caty-cs-send {
        background:${primary}; color:#fff; border:none; border-radius:50%;
        width:40px; height:40px; font-size:16px; cursor:pointer;
        display:flex; align-items:center; justify-content:center; flex-shrink:0;
        transition:filter 0.2s;
      }
      .caty-cs-send:hover { filter:brightness(1.1); }
      /* ── FAB launcher ── */
      .caty-cs-fab {
        position:fixed; bottom:24px; right:24px;
        width:60px; height:60px; border-radius:50%;
        background:${primary}; color:#fff; border:none; cursor:pointer;
        box-shadow:0 4px 20px rgba(0,0,0,0.25);
        z-index:2147483644;
        display:flex; align-items:center; justify-content:center;
        transition:transform 0.2s,filter 0.2s;
      }
      .caty-cs-fab:hover { transform:scale(1.1); filter:brightness(1.1); }
      .caty-cs-fab svg { width:28px; height:28px; fill:#fff; }
      @media (max-width:768px) {
        body.caty-cs-active { margin-right:0 !important; }
        .caty-cs-panel { width:100vw !important; max-width:100vw !important; }
        .caty-cs-fab { bottom:16px; right:16px; width:52px; height:52px; }
      }
    `;
    document.head.appendChild(style);

    // ── Build sidebar panel ───────────────────────────────────────────────
    const panel = document.createElement('div');
    panel.className = 'caty-cs-panel caty-cs-hidden';
    panel.innerHTML = `
      <div class="caty-cs-header">
        <div class="caty-cs-avatar"><img src="${avatarSrc}" alt="${personaName}"></div>
        <div>
          <div class="caty-cs-name">${personaName}</div>
          <div class="caty-cs-status">Online</div>
        </div>
        <button class="caty-cs-close" aria-label="Închide">&times;</button>
      </div>
      <div class="caty-cs-body" id="caty-cs-body"></div>
      <div class="caty-cs-footer">
        <input class="caty-cs-input" id="caty-cs-input" type="text"
          placeholder="${t.support?.inputPlaceholder || 'Scrieți un mesaj...'}"
          autocomplete="off">
        <button class="caty-cs-send" id="caty-cs-send" aria-label="Trimite">&#10148;</button>
      </div>
    `;
    document.body.appendChild(panel);

    // ── FAB launcher ─────────────────────────────────────────────────────
    const fab = document.createElement('button');
    fab.className = 'caty-cs-fab';
    fab.setAttribute('aria-label', `Chat cu ${personaName}`);
    fab.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
    </svg>`;
    document.body.appendChild(fab);
    state._chatFab = fab;

    // ── Open / Close ──────────────────────────────────────────────────────
    function openSidebar() {
      panel.classList.remove('caty-cs-hidden');
      document.body.classList.add('caty-cs-active');
      fab.style.display = 'none';
      const input = panel.querySelector('#caty-cs-input');
      if (input) input.focus();

      if (!state._csGreeted) {
        state._csGreeted = true;
        const greeting = CONFIG._greetingMessage || t.greeting;
        addMsg('bot', greeting);
        const chips = getVerticalChips();
        if (chips.length) addChips(chips);
      }
    }

    function closeSidebar() {
      panel.classList.add('caty-cs-hidden');
      document.body.classList.remove('caty-cs-active');
      fab.style.display = 'flex';
    }

    // ── Vertical-adaptive chips ───────────────────────────────────────────
    function getVerticalChips() {
      const lang = CONFIG.language || 'ro';
      const isRetail = ['fashion','retail','ecommerce','clothing','apparel','shop','store','magazin','produse']
        .some(k => industry.includes(k));
      if (isRetail) {
        return lang === 'ro'
          ? ['Recomandă-mi produse', 'Caut un cadou', 'Ce e în trend?', 'Ajutor comandă']
          : ['Recommend products', 'Looking for a gift', "What's trending?", 'Order help'];
      }
      return lang === 'ro'
        ? ['Am o întrebare', 'Ajutor produs', 'Returnare', 'Status comandă']
        : ['I have a question', 'Product help', 'Returns', 'Order status'];
    }

    // ── DOM helpers ───────────────────────────────────────────────────────
    function addMsg(role, text) {
      const body = panel.querySelector('#caty-cs-body');
      if (!body) return;
      const el = document.createElement('div');
      el.className = `caty-cs-msg ${role}`;
      el.textContent = text;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
    }

    function addChips(labels) {
      const body = panel.querySelector('#caty-cs-body');
      if (!body) return;
      const wrap = document.createElement('div');
      wrap.className = 'caty-cs-chips';
      labels.forEach(label => {
        const btn = document.createElement('button');
        btn.className = 'caty-cs-chip';
        btn.textContent = label;
        btn.addEventListener('click', () => { wrap.remove(); sendMsg(label); });
        wrap.appendChild(btn);
      });
      body.appendChild(wrap);
      body.scrollTop = body.scrollHeight;
    }

    // ── Session creation (required by /chat/message) ─────────────────────
    async function ensureSession() {
      if (state._csSessionId) return state._csSessionId;
      const resp = await fetch(`${CONFIG.baseUrl}/api/widget/session`, {
        method: 'POST',
        headers: { 'X-API-Key': CONFIG.apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id: getSessionId(),
          device: { user_agent: navigator.userAgent, language: navigator.language },
          source: { page_url: window.location.href, referrer: document.referrer },
          context: { page_url: window.location.href, language: CONFIG.language || 'ro' },
        }),
      });
      const data = await resp.json();
      state._csSessionId = data.session_id;
      return state._csSessionId;
    }

    // ── Real AI call ──────────────────────────────────────────────────────
    async function sendMsg(text) {
      if (!text.trim()) return;
      addMsg('user', text);
      const input = panel.querySelector('#caty-cs-input');
      if (input) input.value = '';

      const body = panel.querySelector('#caty-cs-body');
      const typing = document.createElement('div');
      typing.className = 'caty-cs-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(typing);
      body.scrollTop = body.scrollHeight;

      try {
        const sessionId = await ensureSession();
        const resp = await fetch(`${CONFIG.baseUrl}/api/widget/chat/message`, {
          method: 'POST',
          headers: { 'X-API-Key': CONFIG.apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            message: text,
            language: CONFIG.language || 'ro',
            context: {
              page_url: window.location.href,
              vertical: CONFIG._industry || '',
              platform: CONFIG._platform || 'generic',
            },
          }),
        });
        const data = await resp.json();
        typing.remove();
        addMsg('bot', data.response || data.message || '...');
      } catch (_) {
        typing.remove();
        addMsg('bot', CONFIG.language === 'en'
          ? 'Sorry, something went wrong. Please try again.'
          : 'Ne pare rău, a apărut o eroare. Încercați din nou.');
      }
    }

    // ── Wire events ───────────────────────────────────────────────────────
    fab.addEventListener('click', openSidebar);
    panel.querySelector('.caty-cs-close').addEventListener('click', closeSidebar);
    const sendBtn = panel.querySelector('#caty-cs-send');
    const input = panel.querySelector('#caty-cs-input');
    sendBtn.addEventListener('click', () => sendMsg(input.value));
    input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(input.value); });

    trackCommerceEvent('widget_loaded', {
      mode: 'sidebar_only',
      language: CONFIG.language,
      vertical: CONFIG._industry || 'unknown',
    });
  }

  // ============================================
  // MODUL 3: Support Chat
  // ============================================

  function createSupportButton() {
    if (state.supportBtn) return;

    const btn = document.createElement('button');
    btn.className = 'caty-support-btn';
    btn.innerHTML = `💬 ${t.support.openChat || 'Chat Suport'}`;
    btn.addEventListener('click', openSupportChat);
    btn.style.display = 'none'; // Hidden initially

    document.body.appendChild(btn);
    state.supportBtn = btn;
  }

  function showSupportButton() {
    if (state.supportBtn) {
      state.supportBtn.style.display = 'flex';
    }
  }

  function hideSupportButton() {
    if (state.supportBtn) {
      state.supportBtn.style.display = 'none';
    }
  }

  function openSupportChat() {
    if (state.supportChatOpen) return;

    state.supportChatOpen = true;
    state.supportCategory = null;
    state.supportMessages = [];
    state.supportHumanMode = false;
    hideSupportButton();
    hideBubble();

    const chatWindow = document.createElement('div');
    chatWindow.className = 'caty-chat-window';
    chatWindow.innerHTML = `
      <div class="caty-chat-header">
        <div class="caty-chat-header-avatar">
          <img src="${CONFIG._customAvatar || AVATARS.talk}" alt="${getPersonaName()}">
        </div>
        <div class="caty-chat-header-info">
          <div class="caty-chat-header-title">${getPersonaName()}</div>
          <div class="caty-chat-header-status">Online</div>
        </div>
        <button class="caty-chat-close">&times;</button>
      </div>
      <div class="caty-chat-body" id="caty-chat-body">
        <div class="caty-chat-categories" id="caty-chat-categories"></div>
      </div>
      <div class="caty-chat-footer">
        <input type="text" class="caty-chat-input" placeholder="${t.support.inputPlaceholder}" id="caty-chat-input">
        <button class="caty-chat-send" id="caty-chat-send">➤</button>
      </div>
    `;

    // Close button
    chatWindow.querySelector('.caty-chat-close').addEventListener('click', closeSupportChat);

    // Render categories
    renderSupportCategories(chatWindow);

    // Input handling
    const input = chatWindow.querySelector('#caty-chat-input');
    const sendBtn = chatWindow.querySelector('#caty-chat-send');

    sendBtn.addEventListener('click', () => sendSupportMessage(input.value));
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendSupportMessage(input.value);
    });

    document.body.appendChild(chatWindow);
    state.supportChatWindow = chatWindow;

    setAvatarState('talk');
  }

  function closeSupportChat() {
    if (state.supportChatWindow) {
      state.supportChatWindow.remove();
      state.supportChatWindow = null;
    }
    state.supportChatOpen = false;
    state.supportCategory = null;
    state.supportHumanMode = false;
    setAvatarState('idle');
    if (state._chatFab) state._chatFab.style.display = 'flex';
  }

  function renderSupportCategories(chatWindow) {
    const container = chatWindow.querySelector('#caty-chat-categories');
    if (!container) return;

    const greet = CONFIG._greetingMessage || t.support.subtitle;
    let html = `<div class="caty-chat-message bot">${greet}</div>`;

    t.support.categories.forEach(cat => {
      html += `
        <div class="caty-chat-category" data-category="${cat.id}">
          <span class="caty-chat-category-icon">${cat.icon}</span>
          <div class="caty-chat-category-text">
            <div class="caty-chat-category-label">${cat.label}</div>
            <div class="caty-chat-category-desc">${cat.desc}</div>
          </div>
        </div>
      `;
    });

    // Human escalation button
    html += `
      <button class="caty-chat-human-btn" id="caty-human-escalate">
        <span class="caty-chat-human-icon">👤</span>
        <div>
          <div>${t.support.humanEscalation}</div>
          <div style="font-size: 11px; opacity: 0.9; font-weight: normal;">${t.support.humanEscalationDesc}</div>
        </div>
      </button>
    `;

    container.innerHTML = html;

    // Category click handlers
    container.querySelectorAll('.caty-chat-category').forEach(el => {
      el.addEventListener('click', () => {
        const categoryId = el.dataset.category;
        selectSupportCategory(categoryId);
      });
    });

    // Human escalation
    container.querySelector('#caty-human-escalate')?.addEventListener('click', escalateToHuman);
  }

  function selectSupportCategory(categoryId) {
    state.supportCategory = categoryId;
    const category = t.support.categories.find(c => c.id === categoryId);
    const response = t.support.responses[categoryId];

    const body = state.supportChatWindow?.querySelector('#caty-chat-body');
    if (!body) return;

    // Show conversation view
    body.innerHTML = `
      <button class="caty-chat-back" id="caty-back-btn">${t.support.backToCategories}</button>
      <div class="caty-chat-messages" id="caty-messages">
        <div class="caty-chat-message user">${category.desc}</div>
        <div class="caty-chat-message bot">${response}</div>
      </div>
      <button class="caty-chat-human-btn" id="caty-human-escalate" style="margin-top: 15px;">
        <span class="caty-chat-human-icon">👤</span>
        <div>${t.support.humanEscalation}</div>
      </button>
    `;

    // Back button
    body.querySelector('#caty-back-btn')?.addEventListener('click', () => {
      state.supportCategory = null;
      body.innerHTML = '<div class="caty-chat-categories" id="caty-chat-categories"></div>';
      renderSupportCategories(state.supportChatWindow);
    });

    // Human escalation
    body.querySelector('#caty-human-escalate')?.addEventListener('click', escalateToHuman);

    state.supportMessages = [
      { type: 'user', text: category.desc },
      { type: 'bot', text: response }
    ];

    setAvatarState('talk');
  }

  function sendSupportMessage(text) {
    if (!text.trim()) return;

    const input = state.supportChatWindow?.querySelector('#caty-chat-input');
    if (input) input.value = '';

    const messagesContainer = state.supportChatWindow?.querySelector('#caty-messages');
    if (!messagesContainer) {
      // If no category selected, just show a generic response
      if (!state.supportCategory) {
        selectSupportCategory('other');
        setTimeout(() => sendSupportMessage(text), 300);
        return;
      }
    }

    // Add user message
    addChatMessage('user', text);

    // Bot response
    setTimeout(() => {
      if (state.supportHumanMode) {
        addChatMessage('system', t.support.humanConnected);
      } else {
        // Simple bot response
        const responses = [
          'Inteleg. Lasa-mi te rog numarul comenzii sau mai multe detalii.',
          'Multumesc pentru informatii. Verific imediat.',
          'Am notat. Mai ai si alte detalii relevante?',
          'Perfect. Vom rezolva aceasta situatie cat mai repede.',
        ];
        addChatMessage('bot', responses[Math.floor(Math.random() * responses.length)]);
      }
    }, 1000);
  }

  function addChatMessage(type, text) {
    let messagesContainer = state.supportChatWindow?.querySelector('#caty-messages');

    if (!messagesContainer) {
      const body = state.supportChatWindow?.querySelector('#caty-chat-body');
      if (body && !body.querySelector('#caty-messages')) {
        body.innerHTML = `
          <button class="caty-chat-back" id="caty-back-btn">${t.support.backToCategories}</button>
          <div class="caty-chat-messages" id="caty-messages"></div>
        `;
        body.querySelector('#caty-back-btn')?.addEventListener('click', () => {
          state.supportCategory = null;
          body.innerHTML = '<div class="caty-chat-categories" id="caty-chat-categories"></div>';
          renderSupportCategories(state.supportChatWindow);
        });
      }
      messagesContainer = state.supportChatWindow?.querySelector('#caty-messages');
    }

    if (messagesContainer) {
      const msgEl = document.createElement('div');
      msgEl.className = `caty-chat-message ${type}`;
      msgEl.textContent = text;
      messagesContainer.appendChild(msgEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    state.supportMessages.push({ type, text });
  }

  function escalateToHuman() {
    state.supportHumanMode = true;
    setAvatarState('think');

    // Show form to collect user data
    const body = state.supportChatWindow?.querySelector('#caty-chat-body');
    if (!body) return;

    body.innerHTML = `
      <button class="caty-chat-back" id="caty-back-btn">${t.support.backToCategories}</button>
      <div class="caty-chat-message bot">Pentru a te conecta cu un agent, am nevoie de cateva date:</div>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 15px;">
        <input type="text" id="escalate-name" placeholder="Numele tau *" style="padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 14px;">
        <input type="tel" id="escalate-phone" placeholder="Telefon (WhatsApp) *" style="padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 14px;">
        <input type="email" id="escalate-email" placeholder="Email" style="padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 14px;">
        <input type="text" id="escalate-order" placeholder="Nr. Comanda / AWB (optional)" style="padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 14px;">
        <textarea id="escalate-message" placeholder="Descrie problema ta..." style="padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 14px; min-height: 80px; resize: none;"></textarea>
        <button id="escalate-submit" style="padding: 14px; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer;">
          📱 Trimite pe WhatsApp
        </button>
      </div>
    `;

    // Back button
    body.querySelector('#caty-back-btn')?.addEventListener('click', () => {
      state.supportHumanMode = false;
      body.innerHTML = '<div class="caty-chat-categories" id="caty-chat-categories"></div>';
      renderSupportCategories(state.supportChatWindow);
    });

    // Submit button
    body.querySelector('#escalate-submit')?.addEventListener('click', () => {
      const name = body.querySelector('#escalate-name')?.value?.trim();
      const phone = body.querySelector('#escalate-phone')?.value?.trim();
      const email = body.querySelector('#escalate-email')?.value?.trim() || 'N/A';
      const order = body.querySelector('#escalate-order')?.value?.trim() || 'N/A';
      const message = body.querySelector('#escalate-message')?.value?.trim() || 'Solicit asistenta';

      if (!name || !phone) {
        alert('Te rog completeaza numele si telefonul!');
        return;
      }

      // Build WhatsApp message
      const waMessage = `🆘 *SOLICITARE SUPORT*

👤 *Client:* ${name}
📱 *Telefon:* ${phone}
📧 *Email:* ${email}
📦 *Nr. Comanda/AWB:* ${order}

💬 *Mesaj:*
${message}

---
📍 Pagina: ${window.location.href}
🕐 Data: ${new Date().toLocaleString('ro-RO')}`;

      // Open WhatsApp
      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');

      // Show confirmation
      body.innerHTML = `
        <div style="text-align: center; padding: 30px;">
          <div style="font-size: 50px; margin-bottom: 15px;">✅</div>
          <div style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 10px;">Mesaj trimis!</div>
          <div style="color: #6b7280; font-size: 14px;">Un agent te va contacta in curand pe WhatsApp.</div>
          <button onclick="CatyCommerce.closeSupport()" style="margin-top: 20px; padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: 500;">Inchide</button>
        </div>
      `;

      setAvatarState('happy');
      createSparkles();
    });
  }

  function suggestSupportChat() {
    if (state.supportChatOpen || state.bubble || state.profilingStarted) return;

    // Show Caty suggesting support
    setAvatarState('wave');
    showBubble(t.support.suggestSupport, [
      { text: t.support.openChat, primary: true, action: 'openSupport' }
    ], {
      onSelect: (action) => {
        if (action === 'openSupport') {
          hideBubble();
          openSupportChat();
        }
      }
    });

    showSupportButton();
  }

  function trackActivity() {
    state.lastActivityTime = Date.now();
  }

  function setupIdleSupportSuggestion() {
    // Only track significant activity (not mouse move)
    ['click', 'scroll', 'keypress'].forEach(event => {
      document.addEventListener(event, trackActivity, { passive: true });
    });

    // Professional consultant: NO random compliments, NO unsolicited support suggestions
    // Only react when user interacts with products or clicks on avatar
  }

  // ============================================
  // Event Handlers
  // ============================================
  function onAvatarClick() {
    // Click pe avatar → deschide DIRECT chatul principal (window.Caty = caty-widget.js API)
    // Voice-unlock se face automat prin event-ul 'click' captat deja de VoiceEngine

    // Chat widget extern (caty-widget.js expune window.Caty)
    if (window.Caty && typeof window.Caty.open === 'function') {
      window.Caty.open();
      return;
    }
    // Fallback: window.Caty.toggle()
    if (window.Caty && typeof window.Caty.toggle === 'function') {
      window.Caty.toggle();
      return;
    }

    // Fără chat widget extern → deschide support chat intern
    if (!CONFIG.disableSupportChat) {
      openSupportChat();
      return;
    }

    // Chat dezactivat complet → bubble scurt
    if (state.bubble) {
      hideBubble();
      return;
    }
    showBubble(randomItem(t.idleMessages), [], { duration: 4000 });
  }

  // ============================================
  // Public API
  // ============================================
  window.CatyCommerce = {
    open: () => onAvatarClick(),

    startProfiling,
    skipProfiling,

    getProfile: () => state.profile,
    resetProfile: () => {
      localStorage.removeItem('caty_profile');
      state.profile = null;
      state.profilingComplete = false;
      state.profilingStarted = false;
    },

    walkTo,
    walkToElement,
    walkRandom,

    // Futuristic effects
    teleportTo,
    teleportToElement,
    showLaserPointer,
    hideLaserPointer,
    createSparkles,
    showBubbleWithTyping,

    setAvatarState,

    showBubble,
    hideBubble,

    showConfetti,

    // Cart methods
    getCart: () => state.cart,
    clearCart: () => {
      state.cart = [];
      localStorage.removeItem('caty_cart');
      trackCommerceEvent('cart_cleared', {});
    },
    getCartTotal: () => state.cart.reduce((sum, item) => sum + (item.price || 0), 0),

    // Tracking methods (exposed for external use)
    trackEvent: trackCommerceEvent,
    trackProduct: trackProductInteraction,
    flushEvents: flushEventQueue,

    // Support Chat methods (Modul 3)
    openSupport: openSupportChat,
    closeSupport: closeSupportChat,
    showSupportButton,
    hideSupportButton,
    isSupportOpen: () => state.supportChatOpen,

    destroy: () => {
      stopRandomWalking();
      if (state.walkAnimation) cancelAnimationFrame(state.walkAnimation);
      state.container?.remove();
      state.supportBtn?.remove();
      state.supportChatWindow?.remove();
      document.getElementById('caty-ecom-styles')?.remove();
    },

    _state: state,
    _config: CONFIG
  };

  // ============================================
  // SERVER-SIDE TRACKING
  // Sends commerce events to Caty API for analytics
  // ============================================

  // Generate or retrieve session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('caty_session_id');
    if (!sessionId) {
      sessionId = 'cs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('caty_session_id', sessionId);
    }
    return sessionId;
  };

  // Event queue for batching
  const eventQueue = [];
  let flushTimer = null;

  /**
   * Track a commerce event to the server
   * Events are batched and sent every 5 seconds
   */
  function trackCommerceEvent(eventType, eventData = {}) {
    if (!CONFIG.apiKey || CONFIG.apiKey === 'test_key') return;

    eventQueue.push({
      type: eventType,
      data: eventData,
      timestamp: new Date().toISOString()
    });

    // Flush every 5 seconds (debounced)
    if (!flushTimer) {
      flushTimer = setTimeout(flushEventQueue, 5000);
    }
  }

  /**
   * Flush event queue to server
   */
  async function flushEventQueue() {
    flushTimer = null;

    if (eventQueue.length === 0) return;

    const events = eventQueue.splice(0, eventQueue.length);
    const sessionId = getSessionId();

    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CONFIG.apiKey
        },
        body: JSON.stringify({
          session_id: sessionId,
          events,
          page: {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer
          },
          metrics: {
            timeOnPage: Math.round(performance.now()),
            scrollDepth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) || 0
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Handle proactive triggers from server
        if (result.proactive?.should_trigger && !state.bubble && !state.supportChatOpen) {
          showBubbleWithTyping(result.proactive.message, result.proactive.suggested_actions || []);
        }
      }
    } catch (err) {
      // Silent fail - don't break widget for tracking errors
      console.debug('[CatyCommerce] Track error:', err.message);
    }
  }

  /**
   * Track profiling completion with profile data
   */
  function trackProfilingComplete(profile) {
    trackCommerceEvent('profiling_complete', {
      gender: profile.gender,
      style: profile.style,
      budget: profile.budget,
      category: profile.category,
      colors: profile.colors
    });
  }

  /**
   * Track product interaction
   */
  function trackProductInteraction(action, productData) {
    trackCommerceEvent(`product_${action}`, {
      product_id: productData.id,
      product_name: productData.name,
      price: productData.price,
      category: productData.category
    });
  }

  /**
   * Track add to cart
   */
  function trackAddToCart(product) {
    trackCommerceEvent('add_to_cart', {
      product_id: product.id || product.name,
      product_name: product.name,
      price: product.price,
      cart_total: state.cart.reduce((sum, item) => sum + (item.price || 0), 0),
      cart_items: state.cart.length
    });
  }

  /**
   * Track exit intent
   */
  function trackExitIntent(discountShown) {
    trackCommerceEvent('exit_intent', {
      discount_shown: discountShown,
      cart_items: state.cart.length,
      profiling_complete: state.profilingComplete
    });
  }

  /**
   * Track support chat interaction
   */
  function trackSupportInteraction(action, data = {}) {
    trackCommerceEvent(`support_${action}`, data);
  }

  // Flush events before page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      if (eventQueue.length > 0) {
        // Use sendBeacon for reliable delivery on page close
        const sessionId = getSessionId();
        const payload = JSON.stringify({
          session_id: sessionId,
          events: eventQueue,
          page: { url: window.location.href }
        });

        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            `${CONFIG.baseUrl}/api/widget/track`,
            new Blob([payload], { type: 'application/json' })
          );
        }
      }
    });
  }

  // ============================================
  // Initialize
  // ============================================
  async function init() {
    // Step 0: Detect mobile
    state.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      state.isMobile = window.innerWidth <= 768;
    });

    // Step 1: Detect e-commerce platform FIRST (adapts selectors)
    const platform = detectPlatform();

    // Step 2: Load dynamic config from API (WhatsApp, industry, etc.)
    await loadWidgetConfig();

    // Step 2b: If walking robot is disabled, show chat-only FAB with full persona
    if (CONFIG._robotDisabled) {
      console.log('[CatyCommerce] Robot disabled - switching to chat-only mode');
      initChatOnlyMode();
      return;
    }

    // Step 3: Detect site CSS colors for bubble integration
    state.siteColors = detectSiteColors();

    // Step 4: Inject styles with site colors
    injectStyles();

    // Step 5: Initialize Voice Engine
    VoiceEngine.init();

    // Apply site colors as CSS vars
    const root = document.documentElement;
    root.style.setProperty('--caty-site-font', state.siteColors.fontFamily);
    root.style.setProperty('--caty-site-text', state.siteColors.textColor);
    // Use semi-transparent version of site background for glassmorphism
    root.style.setProperty('--caty-site-bg', state.siteColors.bgColor.replace('rgb(', 'rgba(').replace(')', ',0.82)'));

    // Create container
    state.container = document.createElement('div');
    state.container.className = 'caty-ecom';
    document.body.appendChild(state.container);

    // Create Neural Sentience avatar
    createAvatar();

    // Load saved profile and cart
    loadProfile();
    loadCart();

    // Find products (uses platform-adapted selectors)
    findProducts();

    // Setup product click handlers
    state.products.forEach(product => {
      product.addEventListener('click', onProductClick);
    });

    // Watch for dynamically loaded products (SPA / infinite scroll / AJAX)
    setupProductObserver();

    // Track what user is viewing and pitch automatically (after greeting)
    setTimeout(() => setupProductViewTracking(), CONFIG.greetingDelay + 2000);

    // Setup exit intent
    setupExitIntent();

    // Detect if chat widget is ACTUALLY loaded (dual mode)
    // Only check for real widget.js presence, NOT disableSupportChat flag
    const chatWidgetPresent =
      !!document.querySelector('script[src*="widget.js"]') ||
      !!document.querySelector('.caty-widget-container') ||
      !!window.CatyWidget ||
      !!window.Caty; // caty-widget.js expune window.Caty
    state._voiceOnlyMode = chatWidgetPresent; // When chat widget present, robot uses voice only (no bubble text)
    console.log(`[CatyCommerce] Voice-only mode: ${state._voiceOnlyMode}, Chat widget detected: ${chatWidgetPresent}`);

    // Initial greeting after delay
    setTimeout(() => {
      setAvatarState('wave');

      // === VOICE-ONLY MODE: Chat widget handles all text, robot only speaks ===
      if (state._voiceOnlyMode) {
        // Professional salesperson: brief greeting, then stand ready
        const name = getPersonaName();
        const lang = CONFIG.language || 'ro';
        const defaultVoiceGreeting = lang === 'ro'
          ? `Bună ziua! Sunt ${name}, consultantul dumneavoastră. Dacă aveți nevoie de ajutor, sunt aici.`
          : `Hello! I'm ${name}, your shopping consultant. If you need help, I'm right here.`;
        const voiceGreeting = CONFIG._greetingMessage || defaultVoiceGreeting;
        VoiceEngine.speak(voiceGreeting);

        state.profilingComplete = true; // Skip profiling in dual mode
        setTimeout(() => {
          setAvatarState('idle');
          // NO random walking - stand ready like a professional salesperson
        }, 2000);
      }
      // === STANDALONE MODE: Commerce widget handles everything ===
      else if (CONFIG._dynamicProfiling && !state.profilingComplete) {
        const name = getPersonaName();
        const lang = CONFIG.language || 'ro';
        const defaultGreeting = lang === 'ro'
          ? `Bună ziua! Sunt ${name}, asistentul dumneavoastră de cumpărături. Permiteți-mi să vă ajut să găsiți exact ce aveți nevoie!`
          : `Hello! I'm ${name}, your shopping assistant. Let me help you find exactly what you need!`;
        const greeting = CONFIG._greetingMessage || defaultGreeting;
        showBubble(greeting, [
          { text: lang === 'ro' ? 'Hai să începem!' : "Let's start!", primary: true, action: 'start_dynamic' },
          { text: lang === 'ro' ? 'Vreau să explorez singur' : 'I want to browse', action: 'skip' }
        ], {
          large: true,
          onSelect: (action) => {
            if (action === 'start_dynamic') {
              startDynamicProfiling();
            } else {
              skipProfiling();
            }
          }
        });
      } else if (CONFIG._skipProfiling || state.profilingComplete) {
        state.profilingComplete = true;
        const name = getPersonaName();
        const lang = CONFIG.language || 'ro';
        const defaultGreeting = lang === 'ro'
          ? `Bună ziua! Sunt ${name}, consultantul dumneavoastră. Cu ce vă pot ajuta?`
          : `Hello! I'm ${name}, your shopping consultant. How can I help you?`;
        const greeting = CONFIG._greetingMessage || defaultGreeting;
        showBubble(greeting, [], { duration: 3000 });
        setTimeout(() => {
          hideBubble();
          setAvatarState('idle');
          // NO random walking - stand ready
        }, 3000);
      } else {
        const customGreeting = CONFIG._greetingMessage;
        showBubble(customGreeting || t.greeting, [
          { text: t.startProfiling, primary: true, action: 'start' },
          { text: t.skipProfiling, action: 'skip' }
        ], {
          large: true,
          onSelect: (action) => {
            if (action === 'start') {
              startProfiling();
            } else {
              skipProfiling();
            }
          }
        });
      }
    }, CONFIG.greetingDelay);

    // Initialize support chat only if not disabled (disabled when chat widget is also loaded)
    if (!CONFIG.disableSupportChat) {
      createSupportButton();
      setupIdleSupportSuggestion();
    }

    // If user already has items in cart from previous visit, remind after 30s
    if (state.cart && state.cart.length > 0) {
      state._cartReminderTimer = setTimeout(() => {
        triggerCartReminder();
      }, 30000);
    }

    // Track widget initialization
    trackCommerceEvent('widget_loaded', {
      products_found: state.products.length,
      profiling_complete: state.profilingComplete,
      language: CONFIG.language,
      page_url: window.location.href,
      platform: platform,
      industry: CONFIG._industry || 'unknown'
    });

    console.log(`[CatyCommerce] Widget initialized v6.0 Neural Sentience - Platform: ${platform}, Products: ${state.products.length}, Mobile: ${state.isMobile}`);
  }

  // ============================================
  // PRODUCT VIEW TRACKING — Professional Salesperson
  // Caty urmărește ce privește clientul și vorbește automat
  // IntersectionObserver (scroll) + MouseEnter (hover) + Debounce
  // ============================================

  /**
   * Generates a voice pitch for a product the client is currently viewing.
   * Speaks: product description + cross-sell suggestions.
   * Called automatically when user views/hovers a product.
   */
  function autoPitchProduct(productEl) {
    if (!productEl) return;

    // Don't pitch if: user is mid-interaction, already talking, recently pitched, or pitching disabled
    const now = Date.now();
    const minInterval = 12000; // min 12s between auto-pitches
    if (state.userEngaged) return;
    if (state.isWalking) return;
    if (now - state._lastAutoPitch < minInterval) return;
    if (state._viewedProducts.has(productEl)) return;
    if (!VoiceEngine._unlocked) return; // need user gesture first

    // Mark as pitched & update timestamp
    state._viewedProducts.add(productEl);
    state._lastAutoPitch = now;

    // Extract product info
    const nameSelector = CONFIG.nameSelector || '.product-name, h2, h3, .woocommerce-loop-product__title';
    const priceSelector = CONFIG.priceSelector || '.price, .product-price, .woocommerce-Price-amount';
    const name  = productEl.querySelector(nameSelector)?.textContent?.trim() || '';
    const price = productEl.querySelector(priceSelector)?.textContent?.trim() || '';

    if (!name) return; // no name → skip

    // Build professional sales pitch
    const details      = extractProductDetails(productEl);
    const pitch        = getSmartProductComment(name, price, productEl);
    const crossSell    = findCrossSellProducts(name);
    const crossMsg     = crossSell.length > 0 ? getCrossSellMessage(name, crossSell) : '';
    const fullPitch    = crossMsg ? pitch + ' ' + crossMsg : pitch;

    // Teleport avatar near the product (visual attention signal)
    teleportToElement(productEl, () => {
      setAvatarState('talk');
      VoiceEngine.speak(fullPitch);

      // Show bubble only in standalone mode (not voice-only)
      if (!state._voiceOnlyMode) {
        showBubbleWithTyping(fullPitch, [
          { text: '🛒 ' + (CONFIG.language === 'ro' ? 'Adaugă în coș' : 'Add to cart'), primary: true, action: 'add' },
          { text: CONFIG.language === 'ro' ? 'Mulțumesc, explorez' : 'Just browsing', action: 'browse' }
        ], {
          price: price,
          silent: true, // already speaking via VoiceEngine
          onSelect: (action) => {
            hideLaserPointer();
            if (action === 'add') {
              addToCart(productEl);
            } else {
              hideBubble();
              setAvatarState('idle');
              state.userEngaged = false;
            }
          }
        });
      } else {
        // Voice-only: just speak, auto-reset after pitch
        const pitchDuration = Math.min(fullPitch.length * 65, 12000);
        setTimeout(() => {
          setAvatarState('idle');
          hideLaserPointer();
          state.userEngaged = false;
        }, pitchDuration);
      }
    });

    console.log(`[CatyCommerce] Auto-pitch → "${name}"`);
  }

  /**
   * Setup IntersectionObserver (scroll tracking) + MouseEnter (hover tracking)
   * Attaches to all products. Re-attach when new products are discovered.
   */
  function setupProductViewTracking() {
    if (!window.IntersectionObserver) return;

    // Cleanup previous observer if any
    if (state._viewObserver) state._viewObserver.disconnect();

    state._viewObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const productEl = entry.target;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          // Product entered viewport with 45%+ visibility
          // Wait 2.8s to confirm real attention (not just scrolling past)
          if (!state._viewTimers.has(productEl)) {
            const timer = setTimeout(() => {
              state._viewTimers.delete(productEl);
              autoPitchProduct(productEl);
            }, 2800);
            state._viewTimers.set(productEl, timer);
          }
        } else {
          // Product left viewport → cancel pending pitch
          const timer = state._viewTimers.get(productEl);
          if (timer) {
            clearTimeout(timer);
            state._viewTimers.delete(productEl);
          }
        }
      });
    }, {
      threshold: [0, 0.45, 1.0],
      rootMargin: '0px 0px -60px 0px' // needs to be meaningfully in viewport
    });

    // Attach hover tracking (desktop) — faster response on hover
    function attachHover(productEl) {
      if (productEl._catyHoverAttached) return;
      productEl._catyHoverAttached = true;

      let hoverTimer = null;

      productEl.addEventListener('mouseenter', () => {
        // Hover for 2.2s → pitch
        hoverTimer = setTimeout(() => {
          autoPitchProduct(productEl);
        }, 2200);
      });

      productEl.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
      });
    }

    // Observe all current products
    state.products.forEach(productEl => {
      state._viewObserver.observe(productEl);
      attachHover(productEl);
    });

    // Expose attach function for dynamic products (called from MutationObserver)
    state._attachProductTracking = (productEl) => {
      state._viewObserver.observe(productEl);
      attachHover(productEl);
    };

    console.log(`[CatyCommerce] View tracking active on ${state.products.length} products`);
  }

  /**
   * MutationObserver for dynamically loaded products (SPA, infinite scroll, AJAX)
   * Watches for new product elements added to the DOM
   */
  function setupProductObserver() {
    if (!window.MutationObserver) return;

    let debounceTimer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const newProducts = Array.from(document.querySelectorAll(CONFIG.productSelector));
        const existingIds = new Set(state.products.map(p => p.dataset?.productId || p.id));

        let added = 0;
        newProducts.forEach(product => {
          const id = product.dataset?.productId || product.id;
          if (!existingIds.has(id) && !state.products.includes(product)) {
            state.products.push(product);
            product.addEventListener('click', onProductClick);
            // Attach view tracking to newly discovered product
            if (state._attachProductTracking) state._attachProductTracking(product);
            added++;
          }
        });

        if (added > 0) {
          console.log(`[CatyCommerce] ${added} new products detected (dynamic load)`);
          trackCommerceEvent('products_dynamic_load', { new_count: added, total: state.products.length });
        }
      }, 500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
