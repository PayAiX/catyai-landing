/**
 * Caty.AI Lead Capture Widget
 * Embeddable widget for lead capture, social proof, and conversion optimization
 * @version 2.0.0
 */

(function() {
  'use strict';

  // Get config from script tag
  const scriptTag = document.currentScript || document.querySelector('script[data-api-key]');
  const CONFIG = {
    apiKey: scriptTag?.getAttribute('data-api-key') || '',
    baseUrl: scriptTag?.getAttribute('data-base-url') || 'https://api.catyai.io',
    position: scriptTag?.getAttribute('data-position') || 'bottom-right',
    primaryColor: scriptTag?.getAttribute('data-primary-color') || '#6366f1',
    discount: scriptTag?.getAttribute('data-discount') || '15',
    showPopupDelay: parseInt(scriptTag?.getAttribute('data-popup-delay') || '5000'),
    showSocialProof: scriptTag?.getAttribute('data-social-proof') !== 'false',
    showExitIntent: scriptTag?.getAttribute('data-exit-intent') !== 'false',
    countdownMinutes: parseInt(scriptTag?.getAttribute('data-countdown') || '15'),
    language: scriptTag?.getAttribute('data-language') || navigator.language?.slice(0, 2) || 'ro',
  };

  // Translations
  const translations = {
    ro: {
      popupTitle: 'Ofertă Exclusivă!',
      popupSubtitle: `Primește ${CONFIG.discount}% reducere la prima comandă`,
      emailPlaceholder: 'Adresa ta de email',
      phonePlaceholder: 'Număr telefon (opțional)',
      submitButton: 'VREAU REDUCEREA',
      noThanks: 'Nu, mulțumesc',
      successTitle: 'Felicitări!',
      successMessage: 'Verifică email-ul pentru codul de reducere',
      exitTitle: 'Stai! Nu pleca încă!',
      exitSubtitle: `Ai uitat reducerea de ${CONFIG.discount}%`,
      exitButton: 'VREAU REDUCEREA',
      countdownText: 'Oferta expiră în:',
      socialProofBought: 'tocmai a cumpărat',
      socialProofViewing: 'persoane văd acest produs',
      minutes: 'min',
      seconds: 'sec',
    },
    en: {
      popupTitle: 'Exclusive Offer!',
      popupSubtitle: `Get ${CONFIG.discount}% off your first order`,
      emailPlaceholder: 'Your email address',
      phonePlaceholder: 'Phone number (optional)',
      submitButton: 'GET MY DISCOUNT',
      noThanks: 'No, thanks',
      successTitle: 'Congratulations!',
      successMessage: 'Check your email for the discount code',
      exitTitle: 'Wait! Don\'t leave yet!',
      exitSubtitle: `You forgot your ${CONFIG.discount}% discount`,
      exitButton: 'GET MY DISCOUNT',
      countdownText: 'Offer expires in:',
      socialProofBought: 'just purchased',
      socialProofViewing: 'people viewing this product',
      minutes: 'min',
      seconds: 'sec',
    },
  };

  const t = translations[CONFIG.language] || translations.ro;

  // State
  const STATE = {
    popupShown: false,
    leadCaptured: false,
    exitIntentShown: false,
    countdownEnd: null,
    visitorId: null,
    sessionId: null,
    // NEW: AutoConfig & Responsive
    autoConfig: null,
    autoForms: [],
    responsive: null,
  };

  // Storage helpers
  const storage = {
    get: (key) => {
      try {
        return JSON.parse(localStorage.getItem(`caty_${key}`));
      } catch {
        return null;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(`caty_${key}`, JSON.stringify(value));
      } catch {}
    }
  };

  // Check if lead already captured
  if (storage.get('lead_captured')) {
    STATE.leadCaptured = true;
  }

  // Generate visitor ID
  STATE.visitorId = storage.get('visitor_id') || `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  storage.set('visitor_id', STATE.visitorId);

  // ============================================
  // STYLES
  // ============================================
  const STYLES = `
    .caty-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999998;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      backdrop-filter: blur(4px);
    }
    .caty-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    .caty-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background: linear-gradient(135deg, ${CONFIG.primaryColor} 0%, ${adjustColor(CONFIG.primaryColor, -20)} 100%);
      border-radius: 20px;
      padding: 40px;
      z-index: 999999;
      max-width: 420px;
      width: 90%;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      text-align: center;
      color: white;
    }
    .caty-popup.visible {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
    }

    .caty-popup-close {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 32px;
      height: 32px;
      border: none;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      color: white;
      font-size: 20px;
    }
    .caty-popup-close:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .caty-popup-icon {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 40px;
    }

    .caty-popup-title {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .caty-popup-subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 25px;
    }

    .caty-popup-discount {
      font-size: 64px;
      font-weight: 900;
      margin: 20px 0;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .caty-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .caty-input {
      width: 100%;
      padding: 16px 20px;
      min-height: 52px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      font-size: 16px;
      outline: none;
      transition: all 0.25s ease;
      box-sizing: border-box;
    }
    .caty-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    .caty-input:focus {
      border-color: white;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
    }
    .caty-input:hover:not(:focus) {
      border-color: rgba(255, 255, 255, 0.5);
    }

    .caty-submit {
      width: 100%;
      padding: 18px;
      min-height: 56px;
      border: none;
      border-radius: 12px;
      background: white;
      color: ${CONFIG.primaryColor};
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    .caty-submit:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
      background: rgba(255, 255, 255, 0.95);
    }
    .caty-submit:active {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    .caty-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .caty-no-thanks {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      cursor: pointer;
      margin-top: 15px;
      text-decoration: underline;
    }
    .caty-no-thanks:hover {
      color: white;
    }

    .caty-countdown {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin: 20px 0;
    }
    .caty-countdown-item {
      background: rgba(255, 255, 255, 0.2);
      padding: 15px 20px;
      border-radius: 10px;
      min-width: 70px;
    }
    .caty-countdown-number {
      font-size: 32px;
      font-weight: 800;
    }
    .caty-countdown-label {
      font-size: 12px;
      opacity: 0.8;
      text-transform: uppercase;
    }

    /* Social Proof Toast */
    .caty-social-proof {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: white;
      border-radius: 12px;
      padding: 15px 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 15px;
      z-index: 999997;
      max-width: 350px;
      transform: translateX(-120%);
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .caty-social-proof.visible {
      transform: translateX(0);
    }
    .caty-social-proof-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: ${CONFIG.primaryColor};
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
    }
    .caty-social-proof-content {
      flex: 1;
    }
    .caty-social-proof-name {
      font-weight: 600;
      color: #1f2937;
      font-size: 14px;
    }
    .caty-social-proof-action {
      color: #6b7280;
      font-size: 13px;
    }
    .caty-social-proof-product {
      color: ${CONFIG.primaryColor};
      font-weight: 600;
    }
    .caty-social-proof-time {
      color: #9ca3af;
      font-size: 12px;
    }
    .caty-social-proof-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      border: none;
      background: #f3f4f6;
      border-radius: 50%;
      cursor: pointer;
      font-size: 12px;
      color: #6b7280;
    }

    /* Success State */
    .caty-success {
      text-align: center;
    }
    .caty-success-icon {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 40px;
    }

    /* Animations */
    @keyframes caty-shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .caty-shake {
      animation: caty-shake 0.3s ease;
    }

    @keyframes caty-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .caty-pulse {
      animation: caty-pulse 2s infinite;
    }
  `;

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  // ============================================
  // API CALLS
  // ============================================
  async function trackEvent(event, data = {}) {
    try {
      await fetch(`${CONFIG.baseUrl}/api/widget/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CONFIG.apiKey,
        },
        body: JSON.stringify({
          visitor_id: STATE.visitorId,
          event,
          data,
          page_url: window.location.href,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('CatyAI tracking error:', err);
    }
  }

  async function submitLead(email, phone = null) {
    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CONFIG.apiKey,
        },
        body: JSON.stringify({
          visitor_id: STATE.visitorId,
          email,
          phone,
          source: 'popup',
          page_url: window.location.href,
          discount_code: `CATY${CONFIG.discount}`,
        }),
      });
      return await response.json();
    } catch (err) {
      console.warn('CatyAI lead error:', err);
      return { success: false };
    }
  }

  async function getSocialProof() {
    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/social-proof`, {
        headers: { 'X-API-Key': CONFIG.apiKey },
      });
      return await response.json();
    } catch {
      return null;
    }
  }

  // NEW: Fetch widget config for AutoConfig support
  async function fetchConfig() {
    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/config`, {
        headers: { 'X-API-Key': CONFIG.apiKey },
      });
      const widgetConfig = await response.json();

      // Apply AutoConfig data if available
      if (widgetConfig.auto_config) {
        STATE.autoConfig = widgetConfig.auto_config;
        if (STATE.autoConfig.responsive) {
          STATE.responsive = STATE.autoConfig.responsive;
        }
        STATE.autoForms = STATE.autoConfig.forms || [];

        console.log('[CatyLeads] AutoConfig loaded:', {
          forms: STATE.autoForms.length,
        });
      }

      return widgetConfig;
    } catch (error) {
      console.warn('[CatyLeads] Failed to fetch config:', error);
      return null;
    }
  }

  // NEW: Responsive breakpoint helper
  function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  // ============================================
  // UI COMPONENTS
  // ============================================
  function createPopup() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'caty-overlay';
    overlay.id = 'caty-overlay';

    // Popup
    const popup = document.createElement('div');
    popup.className = 'caty-popup';
    popup.id = 'caty-popup';

    popup.innerHTML = `
      <button class="caty-popup-close" onclick="window.CatyLeads.closePopup()">×</button>
      <div class="caty-popup-icon">🎁</div>
      <div class="caty-popup-title">${t.popupTitle}</div>
      <div class="caty-popup-discount">${CONFIG.discount}%</div>
      <div class="caty-popup-subtitle">${t.popupSubtitle}</div>

      <div class="caty-countdown" id="caty-countdown">
        <div class="caty-countdown-item">
          <div class="caty-countdown-number" id="caty-countdown-min">15</div>
          <div class="caty-countdown-label">${t.minutes}</div>
        </div>
        <div class="caty-countdown-item">
          <div class="caty-countdown-number" id="caty-countdown-sec">00</div>
          <div class="caty-countdown-label">${t.seconds}</div>
        </div>
      </div>

      <form class="caty-form" id="caty-form">
        <input type="email" class="caty-input" id="caty-email" placeholder="${t.emailPlaceholder}" required>
        <input type="tel" class="caty-input" id="caty-phone" placeholder="${t.phonePlaceholder}">
        <button type="submit" class="caty-submit caty-pulse">${t.submitButton}</button>
      </form>
      <button class="caty-no-thanks" onclick="window.CatyLeads.closePopup()">${t.noThanks}</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Form submit handler
    const catyForm = document.getElementById('caty-form');
    if (catyForm) {
      catyForm.addEventListener('submit', handleFormSubmit);
    }

    // Close on overlay click
    overlay.addEventListener('click', () => window.CatyLeads.closePopup());
  }

  function createSocialProofToast() {
    const toast = document.createElement('div');
    toast.className = 'caty-social-proof';
    toast.id = 'caty-social-proof';
    document.body.appendChild(toast);
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================
  async function handleFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('caty-email').value;
    const phone = document.getElementById('caty-phone').value;
    const button = e.target.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = '...';

    const result = await submitLead(email, phone);

    if (result.success !== false) {
      STATE.leadCaptured = true;
      storage.set('lead_captured', true);
      trackEvent('lead_captured', { email, source: 'popup' });

      // Show success
      const popup = document.getElementById('caty-popup');
      popup.innerHTML = `
        <div class="caty-success">
          <div class="caty-success-icon">✓</div>
          <div class="caty-popup-title">${t.successTitle}</div>
          <div class="caty-popup-subtitle">${t.successMessage}</div>
          <div class="caty-popup-discount">CATY${CONFIG.discount}</div>
        </div>
      `;

      setTimeout(() => window.CatyLeads.closePopup(), 4000);
    } else {
      button.disabled = false;
      button.textContent = t.submitButton;
      button.classList.add('caty-shake');
      setTimeout(() => button.classList.remove('caty-shake'), 300);
    }
  }

  function showPopup() {
    if (STATE.popupShown || STATE.leadCaptured) return;
    STATE.popupShown = true;

    document.getElementById('caty-overlay')?.classList.add('visible');
    document.getElementById('caty-popup')?.classList.add('visible');

    // Start countdown
    STATE.countdownEnd = Date.now() + (CONFIG.countdownMinutes * 60 * 1000);
    updateCountdown();

    trackEvent('popup_shown');
  }

  function closePopup() {
    document.getElementById('caty-overlay')?.classList.remove('visible');
    document.getElementById('caty-popup')?.classList.remove('visible');
    trackEvent('popup_closed');
  }

  function updateCountdown() {
    if (!STATE.countdownEnd) return;

    const now = Date.now();
    const remaining = Math.max(0, STATE.countdownEnd - now);

    if (remaining <= 0) {
      closePopup();
      return;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    const minEl = document.getElementById('caty-countdown-min');
    const secEl = document.getElementById('caty-countdown-sec');

    if (minEl) minEl.textContent = String(minutes).padStart(2, '0');
    if (secEl) secEl.textContent = String(seconds).padStart(2, '0');

    requestAnimationFrame(updateCountdown);
  }

  // Exit Intent Detection
  function setupExitIntent() {
    if (!CONFIG.showExitIntent) return;

    let triggered = false;

    document.addEventListener('mouseout', (e) => {
      if (triggered || STATE.leadCaptured || STATE.exitIntentShown) return;
      if (e.clientY < 10 && e.relatedTarget === null) {
        triggered = true;
        STATE.exitIntentShown = true;

        // Change popup content for exit intent
        const popup = document.getElementById('caty-popup');
        if (popup && !STATE.popupShown) {
          popup.querySelector('.caty-popup-title').textContent = t.exitTitle;
          popup.querySelector('.caty-popup-subtitle').textContent = t.exitSubtitle;
        }

        showPopup();
        trackEvent('exit_intent_triggered');
      }
    });
  }

  // Social Proof
  async function showSocialProof() {
    if (!CONFIG.showSocialProof) return;

    const data = await getSocialProof();
    if (!data?.notifications?.length) return;

    const toast = document.getElementById('caty-social-proof');
    if (!toast) return;

    let index = 0;

    function showNext() {
      if (STATE.leadCaptured) return; // Stop if lead captured

      const notification = data.notifications[index % data.notifications.length];

      toast.innerHTML = `
        <button class="caty-social-proof-close" onclick="this.parentElement.classList.remove('visible')">×</button>
        <div class="caty-social-proof-avatar">${notification.name?.charAt(0) || 'C'}</div>
        <div class="caty-social-proof-content">
          <div class="caty-social-proof-name">${notification.name || 'Cineva'}</div>
          <div class="caty-social-proof-action">
            ${t.socialProofBought} <span class="caty-social-proof-product">${notification.product || 'un produs'}</span>
          </div>
          <div class="caty-social-proof-time">${notification.time || 'acum 2 minute'}</div>
        </div>
      `;

      toast.classList.add('visible');

      setTimeout(() => {
        toast.classList.remove('visible');
        index++;
        setTimeout(showNext, 30000 + Math.random() * 30000); // 30-60s interval
      }, 5000);
    }

    // Start after delay
    setTimeout(showNext, 10000);
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  async function init() {
    if (!CONFIG.apiKey) {
      console.warn('CatyAI: Missing API key');
      return;
    }

    // NEW: Fetch config for AutoConfig support
    await fetchConfig();

    injectStyles();
    createPopup();
    createSocialProofToast();
    setupExitIntent();

    // NEW: Apply responsive sizing to popup
    applyResponsiveSizing();
    window.addEventListener('resize', applyResponsiveSizing);

    // Track page view
    trackEvent('page_view');

    // Show popup after delay (if not already captured)
    if (!STATE.leadCaptured) {
      setTimeout(showPopup, CONFIG.showPopupDelay);
    }

    // Start social proof
    showSocialProof();

    // Expose API
    window.CatyLeads = {
      showPopup,
      closePopup,
      trackEvent,
      getState: () => STATE,
      getCurrentBreakpoint,
    };
  }

  // NEW: Apply responsive sizing based on breakpoint
  function applyResponsiveSizing() {
    const breakpoint = getCurrentBreakpoint();
    const popup = document.getElementById('caty-popup');
    if (!popup) return;

    // Apply responsive sizing from AutoConfig if available
    if (STATE.responsive && STATE.responsive[breakpoint]) {
      const sizing = STATE.responsive[breakpoint];
      if (sizing.width) popup.style.width = sizing.width;
      if (sizing.maxWidth) popup.style.maxWidth = sizing.maxWidth;
      if (sizing.padding) popup.style.padding = sizing.padding;
    } else {
      // Default responsive sizing
      if (breakpoint === 'mobile') {
        popup.style.width = '95%';
        popup.style.maxWidth = '95%';
        popup.style.padding = '30px 20px';
      } else if (breakpoint === 'tablet') {
        popup.style.width = '85%';
        popup.style.maxWidth = '500px';
        popup.style.padding = '35px 25px';
      } else {
        popup.style.width = '90%';
        popup.style.maxWidth = '420px';
        popup.style.padding = '40px';
      }
    }
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
