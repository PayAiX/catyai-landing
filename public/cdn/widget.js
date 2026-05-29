/**
 * Caty.AI Widget SDK
 * Embeddable chat widget for any website
 * @version 1.0.0
 * @license UNLICENSED
 */

(function() {
  'use strict';

  // Singleton guard — prevent double initialization if script is included twice
  if (window.Caty) return;

  // Configuration from script tag data attributes
  // Prefer currentScript if it has data-api-key, otherwise fall back to querySelector
  const currentScriptTag = document.currentScript;
  const scriptTag = (currentScriptTag?.getAttribute('data-api-key'))
    ? currentScriptTag
    : document.querySelector('script[data-api-key]');
  const CONFIG = {
    apiKey: scriptTag?.getAttribute('data-api-key') || '',
    baseUrl: scriptTag?.getAttribute('data-base-url') || 'https://api.catyai.io',
    position: scriptTag?.getAttribute('data-position') || 'bottom-right',
    primaryColor: scriptTag?.getAttribute('data-primary-color') || '#6366f1',
    greeting: scriptTag?.getAttribute('data-greeting') || null,
    theme: scriptTag?.getAttribute('data-theme') || 'dark', // Changed default to dark
    sidebarMode: window.CatyAI?.sidebarMode ?? true,
  };

  // ============================================
  // XSS Protection Utilities
  // ============================================

  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text safe for innerHTML
   */
  function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  }

  /**
   * Sanitize URL to prevent javascript: and data: XSS attacks
   * @param {string} url - URL to sanitize
   * @returns {string} - Safe URL or empty string
   */
  function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim().toLowerCase();

    // Block dangerous protocols
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('vbscript:')) {
      console.warn('[CatyWidget] Blocked malicious URL:', url.substring(0, 50));
      return '';
    }

    // Allow safe data: URLs (images only)
    if (trimmed.startsWith('data:')) {
      // Only allow image MIME types
      if (trimmed.startsWith('data:image/png') ||
          trimmed.startsWith('data:image/jpeg') ||
          trimmed.startsWith('data:image/jpg') ||
          trimmed.startsWith('data:image/gif') ||
          trimmed.startsWith('data:image/webp') ||
          trimmed.startsWith('data:image/svg+xml')) {
        return url;
      }
      // Block other data: URLs (text/html, etc. - XSS risk)
      console.warn('[CatyWidget] Blocked non-image data URL:', url.substring(0, 50));
      return '';
    }

    // Allow http, https, and relative URLs
    if (trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('/') ||
        trimmed.startsWith('./') ||
        trimmed.startsWith('../')) {
      return url;
    }

    // For other URLs, assume relative
    return url;
  }

  // ============================================
  // Internationalization (i18n) System
  // ============================================
  const translations = {
    en: {
      openChat: 'Open chat',
      closeChat: 'Close chat',
      online: 'Online',
      offline: 'Offline',
      typePlaceholder: 'Type a message...',
      sendMessage: 'Send message',
      poweredBy: 'Powered by',
      dismiss: 'Dismiss',
      defaultGreeting: "Hi! How can I help you today?",
      errorMessage: 'Sorry, I encountered an error. Please try again.',
      // Lead form translations
      leadTitle: "Let's stay in touch!",
      leadSubtitle: 'Share your details so we can better assist you',
      leadName: 'Your Name',
      leadEmail: 'Email Address',
      leadPhone: 'Phone Number',
      leadCompany: 'Company',
      leadSkip: 'Skip for now',
      leadSubmit: 'Submit',
      leadThankYou: 'Thank you! I\'ve saved your details. How can I help you today?',
      productsFound: 'Relevant products:',
    },
    es: {
      openChat: 'Abrir chat',
      closeChat: 'Cerrar chat',
      online: 'En línea',
      offline: 'Desconectado',
      typePlaceholder: 'Escribe un mensaje...',
      sendMessage: 'Enviar mensaje',
      poweredBy: 'Desarrollado por',
      dismiss: 'Cerrar',
      defaultGreeting: '¡Hola! ¿Cómo puedo ayudarte hoy?',
      errorMessage: 'Lo siento, ocurrió un error. Por favor, inténtalo de nuevo.',
      // Lead form translations
      leadTitle: '¡Mantengamos el contacto!',
      leadSubtitle: 'Comparte tus datos para que podamos ayudarte mejor',
      leadName: 'Tu Nombre',
      leadEmail: 'Correo Electrónico',
      leadPhone: 'Número de Teléfono',
      leadCompany: 'Empresa',
      leadSkip: 'Saltar por ahora',
      leadSubmit: 'Enviar',
      leadThankYou: '¡Gracias! He guardado tus datos. ¿Cómo puedo ayudarte hoy?',
      productsFound: 'Productos relevantes:',
    },
    ro: {
      openChat: 'Deschide chat',
      closeChat: 'Închide chat',
      online: 'Online',
      offline: 'Offline',
      typePlaceholder: 'Scrie un mesaj...',
      sendMessage: 'Trimite mesaj',
      poweredBy: 'Powered by',
      dismiss: 'Închide',
      defaultGreeting: 'Bună! Sunt Caty, asistentul tău AI. Cu ce te pot ajuta astăzi?',
      errorMessage: 'Îmi pare rău, a apărut o eroare. Te rog încearcă din nou.',
      // Lead form translations
      leadTitle: 'Hai să păstrăm legătura!',
      leadSubtitle: 'Lasă-ne datele tale pentru a te putea ajuta mai bine',
      leadName: 'Numele tău',
      leadEmail: 'Adresa de Email',
      leadPhone: 'Număr de Telefon',
      leadCompany: 'Companie',
      leadSkip: 'Sari peste',
      leadSubmit: 'Trimite',
      leadThankYou: 'Mulțumesc! Am salvat datele tale. Cu ce te pot ajuta astăzi?',
      productsFound: 'Produse relevante:',
    },
    fr: {
      openChat: 'Ouvrir le chat',
      closeChat: 'Fermer le chat',
      online: 'En ligne',
      offline: 'Hors ligne',
      typePlaceholder: 'Tapez un message...',
      sendMessage: 'Envoyer le message',
      poweredBy: 'Propulsé par',
      dismiss: 'Fermer',
      defaultGreeting: 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
      errorMessage: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
      // Lead form translations
      leadTitle: 'Restons en contact!',
      leadSubtitle: 'Partagez vos coordonnées pour que nous puissions mieux vous aider',
      leadName: 'Votre Nom',
      leadEmail: 'Adresse Email',
      leadPhone: 'Numéro de Téléphone',
      leadCompany: 'Entreprise',
      leadSkip: 'Passer pour le moment',
      leadSubmit: 'Envoyer',
      leadThankYou: 'Merci! J\'ai enregistré vos coordonnées. Comment puis-je vous aider aujourd\'hui?',
      productsFound: 'Produits pertinents:',
    },
    de: {
      openChat: 'Chat öffnen',
      closeChat: 'Chat schließen',
      online: 'Online',
      offline: 'Offline',
      typePlaceholder: 'Nachricht eingeben...',
      sendMessage: 'Nachricht senden',
      poweredBy: 'Unterstützt von',
      dismiss: 'Schließen',
      defaultGreeting: 'Hallo! Wie kann ich Ihnen heute helfen?',
      errorMessage: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      // Lead form translations
      leadTitle: 'Bleiben wir in Kontakt!',
      leadSubtitle: 'Teilen Sie Ihre Daten mit, damit wir Ihnen besser helfen können',
      leadName: 'Ihr Name',
      leadEmail: 'E-Mail-Adresse',
      leadPhone: 'Telefonnummer',
      leadCompany: 'Unternehmen',
      leadSkip: 'Überspringen',
      leadSubmit: 'Absenden',
      leadThankYou: 'Danke! Ich habe Ihre Daten gespeichert. Wie kann ich Ihnen heute helfen?',
      productsFound: 'Relevante Produkte:',
    },
    pt: {
      openChat: 'Abrir chat',
      closeChat: 'Fechar chat',
      online: 'Online',
      offline: 'Offline',
      typePlaceholder: 'Digite uma mensagem...',
      sendMessage: 'Enviar mensagem',
      poweredBy: 'Desenvolvido por',
      dismiss: 'Fechar',
      defaultGreeting: 'Olá! Como posso ajudá-lo hoje?',
      errorMessage: 'Desculpe, ocorreu um erro. Por favor, tente novamente.',
      // Lead form translations
      leadTitle: 'Vamos manter contato!',
      leadSubtitle: 'Compartilhe seus dados para que possamos ajudá-lo melhor',
      leadName: 'Seu Nome',
      leadEmail: 'Endereço de Email',
      leadPhone: 'Número de Telefone',
      leadCompany: 'Empresa',
      leadSkip: 'Pular por agora',
      leadSubmit: 'Enviar',
      leadThankYou: 'Obrigado! Salvei seus dados. Como posso ajudá-lo hoje?',
      productsFound: 'Produtos relevantes:',
    },
    it: {
      openChat: 'Apri chat',
      closeChat: 'Chiudi chat',
      online: 'Online',
      offline: 'Offline',
      typePlaceholder: 'Scrivi un messaggio...',
      sendMessage: 'Invia messaggio',
      poweredBy: 'Powered by',
      dismiss: 'Chiudi',
      defaultGreeting: 'Ciao! Come posso aiutarti oggi?',
      errorMessage: 'Mi dispiace, si è verificato un errore. Per favore riprova.',
      productsFound: 'Prodotti rilevanti:',
    },
    nl: {
      openChat: 'Chat openen',
      closeChat: 'Chat sluiten',
      online: 'Online',
      offline: 'Offline',
      typePlaceholder: 'Typ een bericht...',
      sendMessage: 'Bericht verzenden',
      poweredBy: 'Mogelijk gemaakt door',
      dismiss: 'Sluiten',
      defaultGreeting: 'Hallo! Hoe kan ik u vandaag helpen?',
      errorMessage: 'Sorry, er is een fout opgetreden. Probeer het opnieuw.',
      productsFound: 'Relevante producten:',
    },
    ru: {
      openChat: 'Открыть чат',
      closeChat: 'Закрыть чат',
      online: 'Онлайн',
      offline: 'Офлайн',
      typePlaceholder: 'Введите сообщение...',
      sendMessage: 'Отправить сообщение',
      poweredBy: 'Работает на',
      dismiss: 'Закрыть',
      defaultGreeting: 'Привет! Чем могу помочь сегодня?',
      errorMessage: 'Извините, произошла ошибка. Пожалуйста, попробуйте снова.',
      productsFound: 'Подходящие продукты:',
    },
    ja: {
      openChat: 'チャットを開く',
      closeChat: 'チャットを閉じる',
      online: 'オンライン',
      offline: 'オフライン',
      typePlaceholder: 'メッセージを入力...',
      sendMessage: 'メッセージを送信',
      poweredBy: 'Powered by',
      dismiss: '閉じる',
      defaultGreeting: 'こんにちは！今日はどのようにお手伝いできますか？',
      errorMessage: '申し訳ありません、エラーが発生しました。もう一度お試しください。',
      productsFound: '関連商品:',
    },
    zh: {
      openChat: '打开聊天',
      closeChat: '关闭聊天',
      online: '在线',
      offline: '离线',
      typePlaceholder: '输入消息...',
      sendMessage: '发送消息',
      poweredBy: '技术支持',
      dismiss: '关闭',
      defaultGreeting: '您好！今天我能帮您什么？',
      errorMessage: '抱歉，出现了错误。请重试。',
      productsFound: '相关产品:',
      leadTitle: '保持联系！',
      leadSubtitle: '分享您的信息，以便我们更好地为您服务',
      leadName: '您的姓名',
      leadEmail: '电子邮箱',
      leadPhone: '电话号码',
      leadCompany: '公司',
      leadSkip: '暂时跳过',
      leadSubmit: '提交',
      leadThankYou: '谢谢！我已保存您的信息。今天我能帮您什么？',
    },
    ko: {
      openChat: '채팅 열기',
      closeChat: '채팅 닫기',
      online: '온라인',
      offline: '오프라인',
      typePlaceholder: '메시지 입력...',
      sendMessage: '메시지 보내기',
      poweredBy: 'Powered by',
      dismiss: '닫기',
      defaultGreeting: '안녕하세요! 오늘 어떻게 도와드릴까요?',
      errorMessage: '죄송합니다, 오류가 발생했습니다. 다시 시도해 주세요.',
      productsFound: '관련 상품:',
      leadTitle: '연락을 유지해요!',
      leadSubtitle: '더 나은 도움을 위해 정보를 공유해 주세요',
      leadName: '이름',
      leadEmail: '이메일 주소',
      leadPhone: '전화번호',
      leadCompany: '회사',
      leadSkip: '나중에',
      leadSubmit: '제출',
      leadThankYou: '감사합니다! 정보를 저장했습니다. 오늘 어떻게 도와드릴까요?',
    },
    ar: {
      openChat: 'فتح الدردشة',
      closeChat: 'إغلاق الدردشة',
      online: 'متصل',
      offline: 'غير متصل',
      typePlaceholder: 'اكتب رسالة...',
      sendMessage: 'إرسال رسالة',
      poweredBy: 'مدعوم من',
      dismiss: 'إغلاق',
      defaultGreeting: 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
      errorMessage: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
      productsFound: 'منتجات ذات صلة:',
      leadTitle: 'لنبقى على تواصل!',
      leadSubtitle: 'شارك بياناتك حتى نتمكن من مساعدتك بشكل أفضل',
      leadName: 'اسمك',
      leadEmail: 'البريد الإلكتروني',
      leadPhone: 'رقم الهاتف',
      leadCompany: 'الشركة',
      leadSkip: 'تخطي الآن',
      leadSubmit: 'إرسال',
      leadThankYou: 'شكراً! لقد حفظت بياناتك. كيف يمكنني مساعدتك اليوم؟',
    },
    hi: {
      openChat: 'चैट खोलें',
      closeChat: 'चैट बंद करें',
      online: 'ऑनलाइन',
      offline: 'ऑफ़लाइन',
      typePlaceholder: 'संदेश लिखें...',
      sendMessage: 'संदेश भेजें',
      poweredBy: 'द्वारा संचालित',
      dismiss: 'बंद करें',
      defaultGreeting: 'नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?',
      errorMessage: 'क्षमा करें, एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
      productsFound: 'संबंधित उत्पाद:',
      leadTitle: 'संपर्क में रहें!',
      leadSubtitle: 'अपनी जानकारी साझा करें ताकि हम आपकी बेहतर मदद कर सकें',
      leadName: 'आपका नाम',
      leadEmail: 'ईमेल पता',
      leadPhone: 'फोन नंबर',
      leadCompany: 'कंपनी',
      leadSkip: 'अभी छोड़ें',
      leadSubmit: 'जमा करें',
      leadThankYou: 'धन्यवाद! मैंने आपकी जानकारी सहेज ली है। आज मैं आपकी कैसे मदद कर सकता हूं?',
    },
  };

  // i18n helper
  const i18n = {
    currentLang: 'en',

    detectLanguage() {
      // PRIORITY 1: Browser language (visitor's preferred language)
      // This ensures Romanian visitors see Romanian messages even on English sites
      try {
        const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
        for (const lang of browserLangs) {
          const langCode = lang.split('-')[0].toLowerCase();
          if (translations[langCode]) {
            console.log('[Caty Widget] Detected browser language:', langCode);
            return langCode;
          }
        }
      } catch (e) {
        // Fallback if navigator.languages not supported
      }

      // Priority 2: HTML lang attribute (e.g., <html lang="ro">)
      const htmlLang = document.documentElement.lang;
      if (htmlLang) {
        const langCode = htmlLang.split('-')[0].toLowerCase();
        if (translations[langCode]) {
          return langCode;
        }
      }

      // Priority 3: Meta content-language tag
      const metaLang = document.querySelector('meta[http-equiv="content-language"]')?.getAttribute('content');
      if (metaLang) {
        const langCode = metaLang.split('-')[0].toLowerCase();
        if (translations[langCode]) {
          return langCode;
        }
      }

      return 'en'; // Ultimate fallback
    },

    setLanguage(lang) {
      const langCode = lang.split('-')[0].toLowerCase();
      this.currentLang = translations[langCode] ? langCode : 'en';
      this.updateUI();
      emit('languageChanged', { language: this.currentLang });
    },

    t(key) {
      return translations[this.currentLang]?.[key] || translations.en[key] || key;
    },

    /**
     * Detect language from text content using common word patterns
     */
    detectFromText(text) {
      if (!text || text.length < 10) return null;
      const lowerText = text.toLowerCase();

      // Romanian indicators
      const roWords = ['este', 'pentru', 'poate', 'sunt', 'care', 'acest', 'despre', 'dacă', 'sau', 'mai', 'doar', 'prin', 'foarte', 'cum', 'bine', 'datele', 'echipa', 'întrebări', 'mulțumesc', 'ești', 'afacerea', 'ajuta', 'funcționalități', 'completează', 'formularul'];
      const roCount = roWords.filter(w => lowerText.includes(w)).length;

      // Spanish indicators
      const esWords = ['para', 'puede', 'como', 'qué', 'está', 'más', 'también', 'sobre', 'equipo', 'gracias', 'formulario', 'completar'];
      const esCount = esWords.filter(w => lowerText.includes(w)).length;

      // French indicators
      const frWords = ['pour', 'peut', 'comment', 'plus', 'aussi', 'équipe', 'merci', 'formulaire', 'remplir', 'notre', 'votre'];
      const frCount = frWords.filter(w => lowerText.includes(w)).length;

      // German indicators
      const deWords = ['für', 'kann', 'mehr', 'auch', 'team', 'danke', 'formular', 'ausfüllen', 'unser', 'ihre'];
      const deCount = deWords.filter(w => lowerText.includes(w)).length;

      // English is default/fallback
      const enWords = ['the', 'and', 'for', 'you', 'can', 'how', 'what', 'our', 'your', 'team', 'help', 'more', 'about', 'please'];
      const enCount = enWords.filter(w => lowerText.includes(w)).length;

      // Return language with highest match count (minimum 2 matches)
      const counts = { ro: roCount, es: esCount, fr: frCount, de: deCount, en: enCount };
      const maxLang = Object.entries(counts).reduce((a, b) => b[1] > a[1] ? b : a);

      return maxLang[1] >= 2 ? maxLang[0] : null;
    },

    updateUI() {
      // Update launcher
      const launcher = document.querySelector('.caty-widget-launcher');
      if (launcher) {
        launcher.setAttribute('aria-label', this.t('openChat'));
      }

      // Update close button
      const closeBtn = document.querySelector('.caty-widget-close');
      if (closeBtn) {
        closeBtn.setAttribute('aria-label', this.t('closeChat'));
      }

      // Update status
      const status = document.querySelector('.caty-widget-status');
      if (status) {
        status.textContent = this.t('online');
      }

      // Update input placeholder
      const input = document.getElementById('caty-input');
      if (input) {
        input.placeholder = this.t('typePlaceholder');
        input.setAttribute('aria-label', this.t('typePlaceholder'));
      }

      // Update send button
      const sendBtn = document.getElementById('caty-send');
      if (sendBtn) {
        sendBtn.setAttribute('aria-label', this.t('sendMessage'));
      }

      // Update footer
      const footer = document.querySelector('.caty-widget-footer');
      if (footer) {
        footer.innerHTML = `${this.t('poweredBy')} <a href="https://catyai.io" target="_blank" rel="noopener">Caty.AI</a>`;
      }

      // Update dismiss buttons on bubbles
      const dismissBtns = document.querySelectorAll('.caty-bubble-dismiss');
      dismissBtns.forEach(btn => {
        btn.setAttribute('aria-label', this.t('dismiss'));
      });
    }
  };

  // Validate API key
  if (!CONFIG.apiKey) {
    console.error('[Caty Widget] Error: data-api-key attribute is required');
    return;
  }

  // State management
  const state = {
    isOpen: false,
    isLoaded: false,
    sessionId: null,
    visitorId: null,
    visitor: {},
    messages: [],
    config: null,
    unreadCount: 0,
    proactiveBubble: null,
    proactiveSent: false,
    behaviorTracker: null,
    triggerEngine: null,
    leadCaptured: false,
    handedOff: false,
    waitingForHuman: false,
    selectedFile: null,
    greetingSent: false,
  };

  // ============================================
  // BehaviorTracker Class
  // Tracks user behavior and batches events
  // ============================================
  class BehaviorTracker {
    constructor(config) {
      this.config = config;
      this.sessionId = null;
      this.buffer = [];
      this.metrics = {
        scrollDepth: 0,
        timeOnPage: 0,
        clickCount: 0,
        formInteractions: 0,
        idleTime: 0,
        exitIntent: false,
        visitCount: 1,
        // Include browser language for proactive message localization
        browserLanguage: (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase()
      };
      this.startTime = Date.now();
      this.lastActivity = Date.now();
      this.flushInterval = 5000;
      this.maxBufferSize = 10;
      this.intervalId = null;
      this.listeners = [];
      this.isTracking = false;
    }

    init(sessionId) {
      if (this.isTracking) return;
      this.sessionId = sessionId;
      this.isTracking = true;
      this.startTime = Date.now();

      // Get visit count from localStorage
      const visitCount = parseInt(localStorage.getItem('caty_visit_count') || '0', 10) + 1;
      localStorage.setItem('caty_visit_count', visitCount.toString());
      this.metrics.visitCount = visitCount;

      this.setupScrollTracking();
      this.setupClickTracking();
      this.setupFormTracking();
      this.setupIdleTracking();
      this.setupExitIntent();
      this.setupVisibilityTracking();

      // Start periodic flush
      this.intervalId = setInterval(() => this.flush(), this.flushInterval);

      // Flush on page unload
      const onUnload = () => this.flush(true);
      window.addEventListener('beforeunload', onUnload);
      this.listeners.push(['beforeunload', onUnload, window]);
    }

    setupScrollTracking() {
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const depth = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;

            if (depth > this.metrics.scrollDepth) {
              this.metrics.scrollDepth = depth;
              this.addEvent('scroll_depth', depth);
            }
            ticking = false;
          });
          ticking = true;
        }
        this.updateActivity();
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      this.listeners.push(['scroll', onScroll, window]);
    }

    setupClickTracking() {
      const onClick = (e) => {
        this.metrics.clickCount++;
        const target = e.target;
        const data = {
          element: target.tagName.toLowerCase(),
          id: target.id || null,
          className: target.className?.split?.(' ')?.[0] || null,
          text: target.textContent?.slice(0, 50) || null
        };
        this.addEvent('click', data);
        this.updateActivity();
      };

      document.addEventListener('click', onClick);
      this.listeners.push(['click', onClick, document]);
    }

    setupFormTracking() {
      const onFocus = (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
          this.metrics.formInteractions++;
          this.addEvent('form_interaction', {
            field: e.target.name || e.target.id || e.target.type
          });
          this.updateActivity();
        }
      };

      document.addEventListener('focusin', onFocus);
      this.listeners.push(['focusin', onFocus, document]);
    }

    setupIdleTracking() {
      const resetIdle = () => {
        this.metrics.idleTime = 0;
        this.updateActivity();
      };

      const events = ['mousemove', 'keydown', 'touchstart'];
      events.forEach(event => {
        document.addEventListener(event, resetIdle, { passive: true });
        this.listeners.push([event, resetIdle, document]);
      });

      // Track idle time every second
      this.idleIntervalId = setInterval(() => {
        this.metrics.idleTime = Date.now() - this.lastActivity;
      }, 1000);
    }

    setupExitIntent() {
      const onMouseLeave = (e) => {
        if (e.clientY <= 0 && !this.metrics.exitIntent) {
          this.metrics.exitIntent = true;
          this.addEvent('exit_intent', { y: e.clientY });
        }
      };

      document.addEventListener('mouseleave', onMouseLeave);
      this.listeners.push(['mouseleave', onMouseLeave, document]);
    }

    setupVisibilityTracking() {
      const onVisibilityChange = () => {
        if (document.hidden) {
          this.addEvent('page_hidden');
        } else {
          this.addEvent('page_visible');
          this.updateActivity();
        }
      };

      document.addEventListener('visibilitychange', onVisibilityChange);
      this.listeners.push(['visibilitychange', onVisibilityChange, document]);
    }

    updateActivity() {
      this.lastActivity = Date.now();
    }

    addEvent(type, data = null) {
      this.buffer.push({
        type,
        data,
        timestamp: new Date().toISOString()
      });

      if (this.buffer.length >= this.maxBufferSize) {
        this.flush();
      }
    }

    getMetrics() {
      return {
        ...this.metrics,
        timeOnPage: Date.now() - this.startTime,
        idleTime: Date.now() - this.lastActivity
      };
    }

    async flush(useBeacon = false) {
      if (!this.sessionId || this.buffer.length === 0 && !useBeacon) return;

      const events = [...this.buffer];
      this.buffer = [];

      const payload = {
        session_id: this.sessionId,
        events,
        page: {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer
        },
        metrics: this.getMetrics()
      };

      const url = `${CONFIG.baseUrl}/api/widget/track`;

      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon(url, JSON.stringify(payload));
        return null;
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'X-API-Key': CONFIG.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.error('[Caty Widget] Failed to send tracking data:', error);
      }
      return null;
    }

    destroy() {
      this.isTracking = false;
      if (this.intervalId) clearInterval(this.intervalId);
      if (this.idleIntervalId) clearInterval(this.idleIntervalId);

      this.listeners.forEach(([event, handler, target]) => {
        target.removeEventListener(event, handler);
      });
      this.listeners = [];
    }
  }

  // ============================================
  // TriggerEngine Class
  // Evaluates rules and triggers proactive messages
  // Persistent mode: keeps showing messages until user engages
  // ============================================
  class TriggerEngine {
    constructor(rules, onTrigger) {
      this.rules = rules || [];
      this.onTrigger = onTrigger;
      this.triggered = new Set(); // Rules that have fired (once_per_session)
      this.ruleCooldowns = {}; // Per-rule cooldown tracking { ruleId: lastFireTime }
      this.retriggerDelay = 25000; // 25 seconds after dismiss to show again
      this.lastTrigger = 0;
      this.maxTriggers = 999; // Effectively unlimited
      this.triggerCount = 0;
      this.checkInterval = null;
      this.retriggerTimeout = null;
      this.lastMessage = null; // Store last message for re-display
      this.lastRule = null;
      this.userEngaged = false; // True only when user sends a message
      this.ruleIndex = 0; // Cycle through rules
      this.firing = false; // Prevent multiple simultaneous triggers
      this.cooldown = 30000; // Global cooldown: 30 seconds between ANY triggers
    }

    start(behaviorTracker) {
      this.behaviorTracker = behaviorTracker;
      this.checkInterval = setInterval(() => this.evaluate(), 1000); // Check every 1s for responsiveness
    }

    stop() {
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
      }
      if (this.retriggerTimeout) {
        clearTimeout(this.retriggerTimeout);
        this.retriggerTimeout = null;
      }
    }

    canTrigger() {
      // Only stop if user has actually engaged (sent a message)
      if (this.userEngaged) return false;
      // Don't trigger while chat is open
      if (state.isOpen) return false;
      // Don't trigger if already firing a request
      if (this.firing) return false;
      // Global cooldown between ANY triggers
      if (Date.now() - this.lastTrigger < this.cooldown) return false;
      return true;
    }

    // Check if a specific rule can fire (respects per-rule cooldown and once_per_session)
    canFireRule(rule) {
      // Check once_per_session
      if (rule.once_per_session && this.triggered.has(rule.id)) {
        return false;
      }
      // Check per-rule cooldown
      const cooldown = (rule.cooldown_seconds || 0) * 1000;
      if (cooldown > 0) {
        const lastFire = this.ruleCooldowns[rule.id] || 0;
        if (Date.now() - lastFire < cooldown) {
          return false;
        }
      }
      return true;
    }

    // Mark user as engaged (called when they send a message)
    markEngaged() {
      this.userEngaged = true;
      this.stop();
    }

    // Schedule a re-trigger after bubble is dismissed
    scheduleRetrigger() {
      if (this.userEngaged) return;

      if (this.retriggerTimeout) {
        clearTimeout(this.retriggerTimeout);
      }

      this.retriggerTimeout = setTimeout(() => {
        if (!this.userEngaged && !state.isOpen) {
          // Show last message again or get a new one
          if (this.lastMessage && this.lastRule) {
            this.onTrigger({
              rule: this.lastRule,
              message: this.lastMessage.content,
              suggestedActions: this.lastMessage.suggestedActions,
              messageId: this.lastMessage.messageId
            });
            this.lastTrigger = Date.now();
          } else {
            // Force a new evaluation
            this.lastTrigger = 0;
            this.evaluate();
          }
        }
      }, this.retriggerDelay);
    }

    // Called when chat is closed - schedule re-engagement
    onChatClosed() {
      if (this.userEngaged) return;

      // Schedule a message after user closes chat
      setTimeout(() => {
        if (!this.userEngaged && !state.isOpen) {
          this.scheduleRetrigger();
        }
      }, 10000); // Wait 10 seconds after close
    }

    evaluate() {
      if (!this.canTrigger() || !this.behaviorTracker) {
        // Log why we can't trigger (every 5 seconds to avoid spam)
        if (Date.now() % 5000 < 1000) {
          console.log('[Caty Triggers] canTrigger:', this.canTrigger(), 'behaviorTracker:', !!this.behaviorTracker, 'userEngaged:', this.userEngaged, 'isOpen:', state.isOpen);
        }
        return;
      }

      const metrics = this.behaviorTracker.getMetrics();
      // Only check if chat is currently open, not message history
      metrics.chatOpened = state.isOpen;
      metrics.pageUrl = window.location.href;

      // Log metrics every 5 seconds
      if (Date.now() % 5000 < 1000) {
        console.log('[Caty Triggers] Evaluating - timeOnPage:', metrics.timeOnPage, 'ms, rules:', this.rules.length);
      }

      // Get enabled rules sorted by priority (lower = higher priority)
      const enabledRules = this.rules
        .filter(r => r.enabled)
        .sort((a, b) => (a.priority || 1) - (b.priority || 1));
      if (enabledRules.length === 0) {
        console.log('[Caty Triggers] No enabled rules!');
        return;
      }

      // Find all matching rules and fire the highest priority one that can fire
      for (const rule of enabledRules) {
        if (this.checkRule(rule, metrics) && this.canFireRule(rule)) {
          console.log('[Caty Triggers] FIRING rule:', rule.id, 'at', metrics.timeOnPage, 'ms');
          this.fire(rule, metrics);
          return;
        }
      }
    }

    checkRule(rule, metrics) {
      for (const [field, condition] of Object.entries(rule.conditions)) {
        const value = metrics[field];
        if (!this.evaluateCondition(condition, value)) {
          return false;
        }
      }
      return true;
    }

    evaluateCondition(condition, value) {
      // Handle primitive conditions (direct value comparison)
      if (typeof condition !== 'object' || condition === null) {
        return value >= condition; // Default to gte for primitives
      }

      // Handle object conditions
      const entries = Object.entries(condition);
      if (entries.length === 0) return true;

      const [operator, expected] = entries[0];

      switch (operator) {
        case 'gte': return (value ?? 0) >= expected;
        case 'lte': return (value ?? 0) <= expected;
        case 'gt': return (value ?? 0) > expected;
        case 'lt': return (value ?? 0) < expected;
        case 'eq': return value === expected;
        case 'is': return value === expected;
        case 'contains':
          if (!value) return false;
          if (Array.isArray(expected)) {
            return expected.some(e => String(value).toLowerCase().includes(String(e).toLowerCase()));
          }
          return String(value).toLowerCase().includes(String(expected).toLowerCase());
        default:
          return false;
      }
    }

    async fire(rule, metrics) {
      // Prevent simultaneous triggers
      this.firing = true;

      // Track for once_per_session rules
      if (rule.once_per_session) {
        this.triggered.add(rule.id);
      }
      // Track per-rule cooldown
      this.ruleCooldowns[rule.id] = Date.now();
      this.lastTrigger = Date.now();
      this.triggerCount++;
      this.lastRule = rule;

      console.log(`[Caty Widget] Firing trigger: ${rule.id} at ${metrics.timeOnPage}ms`);

      // Fetch proactive message from server
      try {
        if (state.proactiveSent) return;
        state.proactiveSent = true;
        const response = await fetch(`${CONFIG.baseUrl}/api/widget/proactive`, {
          method: 'POST',
          headers: {
            'X-API-Key': CONFIG.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session_id: state.sessionId,
            trigger_type: rule.message_type,
            language: i18n.currentLang, // Send detected language
            context: extractPageContext()
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.message) {
            // Store last message for potential re-display
            this.lastMessage = {
              content: data.message.content,
              suggestedActions: data.message.suggested_actions,
              messageId: data.message.message_id
            };

            this.onTrigger({
              rule,
              message: data.message.content,
              suggestedActions: data.message.suggested_actions,
              messageId: data.message.message_id
            });

            // Auto-open chat if rule has auto_open: true (but NOT on mobile)
            if (rule.auto_open) {
              const isMobileDevice = window.innerWidth <= 768;
              if (isMobileDevice) {
                console.log('[Caty Widget] Blocking auto-open on mobile for rule:', rule.id);
                // On mobile, bubble is already shown via onTrigger callback
              } else {
                console.log('[Caty Widget] Auto-opening chat for rule:', rule.id);
                setTimeout(() => {
                  if (!state.isOpen) {
                    open();
                  }
                }, 500); // Small delay to show bubble first
              }
            }
          }
        }
      } catch (error) {
        console.error('[Caty Widget] Failed to fetch proactive message:', error);
      } finally {
        // Always release firing lock
        this.firing = false;
      }
    }

    reset() {
      this.triggered.clear();
      this.triggerCount = 0;
      this.lastTrigger = 0;
      this.userEngaged = false;
      this.lastMessage = null;
      this.lastRule = null;
    }
  }

  // ============================================
  // BubbleUI Class
  // Displays proactive speech bubble
  // Persistent: schedules re-display after dismiss
  // ============================================
  class BubbleUI {
    constructor(container, config) {
      this.container = container;
      this.config = config;
      this.element = null;
      this.isVisible = false;
      this.dismissTimeout = null;
      this.autoDismissDelay = 20000; // 20 seconds before auto-hide
      this.lastMessage = null;
      this.lastOptions = null;
    }

    show(message, options = {}) {
      if (this.isVisible || state.isOpen) return;

      this.hide(false); // Don't schedule retrigger when showing new

      // Store for potential re-display
      this.lastMessage = message;
      this.lastOptions = options;

      const bubble = this.createBubbleElement(message, options);
      this.container.appendChild(bubble);
      this.element = bubble;
      this.isVisible = true;

      // Auto-dismiss after delay, then schedule retrigger
      this.dismissTimeout = setTimeout(() => {
        this.hide(true); // Schedule retrigger after auto-hide
      }, this.autoDismissDelay);

      // Emit event
      emit('bubble_shown', { message, options });
    }

    createBubbleElement(message, options) {
      const bubble = document.createElement('div');
      bubble.className = 'caty-bubble';
      bubble.setAttribute('role', 'alert');
      bubble.setAttribute('aria-live', 'polite');

      bubble.innerHTML = `
        <button class="caty-bubble-dismiss" aria-label="${i18n.t('dismiss')}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="caty-bubble-content">
          <div class="caty-bubble-text">${this.escapeHtml(message)}</div>
        </div>
      `;

      // Click bubble to open chat
      bubble.addEventListener('click', (e) => {
        if (!e.target.closest('.caty-bubble-dismiss')) {
          this.onBubbleClick(options);
        }
      });

      // Dismiss button
      const dismissBtn = bubble.querySelector('.caty-bubble-dismiss');
      dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismiss(options.messageId);
      });

      return bubble;
    }

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    onBubbleClick(options) {
      this.hide();

      // Track engagement
      if (options.messageId) {
        fetch(`${CONFIG.baseUrl}/api/widget/proactive/engaged`, {
          method: 'POST',
          headers: {
            'X-API-Key': CONFIG.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session_id: state.sessionId,
            message_id: options.messageId,
            action: 'clicked'
          })
        }).catch(console.error);
      }

      // Open chat
      open();

      emit('bubble_clicked', options);
    }

    dismiss(messageId) {
      this.hide(true); // Schedule retrigger after manual dismiss

      // Track dismissal
      if (messageId) {
        fetch(`${CONFIG.baseUrl}/api/widget/proactive/dismissed`, {
          method: 'POST',
          headers: {
            'X-API-Key': CONFIG.apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session_id: state.sessionId,
            message_id: messageId
          })
        }).catch(console.error);
      }

      emit('bubble_dismissed', { messageId });
    }

    hide(scheduleRetrigger = false) {
      if (this.dismissTimeout) {
        clearTimeout(this.dismissTimeout);
        this.dismissTimeout = null;
      }

      if (this.element) {
        this.element.remove();
        this.element = null;
      }

      this.isVisible = false;

      // Schedule another message if not engaged
      if (scheduleRetrigger && state.triggerEngine) {
        state.triggerEngine.scheduleRetrigger();
      }
    }

    destroy() {
      this.hide(false);
    }
  }

  // ============================================
  // MobileAdapter Class
  // Handles mobile-specific behavior
  // ============================================
  class MobileAdapter {
    constructor() {
      this.isMobile = window.innerWidth <= 768;
      this.isKeyboardOpen = false;
      this.originalViewportHeight = window.innerHeight;
      this.listeners = [];
    }

    init() {
      this.detectMobile();
      this.setupResizeListener();
      this.setupKeyboardDetection();
      this.setupSwipeToClose();
    }

    detectMobile() {
      this.isMobile = window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    setupResizeListener() {
      const onResize = () => {
        this.detectMobile();
        this.adjustLayout();
      };

      window.addEventListener('resize', onResize);
      this.listeners.push(['resize', onResize, window]);
    }

    setupKeyboardDetection() {
      if (window.visualViewport) {
        const onViewportResize = () => {
          const heightDiff = this.originalViewportHeight - window.visualViewport.height;
          this.isKeyboardOpen = heightDiff > 150;
          this.adjustForKeyboard();
        };

        window.visualViewport.addEventListener('resize', onViewportResize);
        this.listeners.push(['resize', onViewportResize, window.visualViewport]);
      }
    }

    adjustLayout() {
      const chatWindow = document.querySelector('.caty-widget-window');
      const launcher = document.querySelector('.caty-widget-launcher');
      if (!chatWindow) return;

      // Get current breakpoint
      const breakpoint = this.getCurrentBreakpoint();

      // Apply responsive config if available
      if (state.responsive && state.responsive[breakpoint]) {
        const config = state.responsive[breakpoint];

        // Apply widget size (only on desktop/tablet, non-sidebar, mobile uses full screen)
        if (breakpoint !== 'mobile' && config.widget_size && !CONFIG.sidebarMode) {
          chatWindow.style.width = `${config.widget_size.width}px`;
          chatWindow.style.height = `${config.widget_size.height}px`;
        }

        // Apply launcher size
        if (launcher && config.launcher_size) {
          launcher.style.width = `${config.launcher_size}px`;
          launcher.style.height = `${config.launcher_size}px`;
        }

        // Apply font size multiplier
        if (config.font_size_multiplier && config.font_size_multiplier !== 1) {
          chatWindow.style.fontSize = `${config.font_size_multiplier}em`;
        }
      }

      if (this.isMobile && state.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    getCurrentBreakpoint() {
      const width = window.innerWidth;
      if (width <= 768) return 'mobile';
      if (width <= 1024) return 'tablet';
      return 'desktop';
    }

    adjustForKeyboard() {
      const chatWindow = document.querySelector('.caty-widget-window');
      if (!chatWindow || !this.isMobile) return;

      if (this.isKeyboardOpen) {
        chatWindow.classList.add('keyboard-open');
        // Let CSS handle positioning with top: 10vh, bottom: 0
        // Just ensure the chat fills available space
        chatWindow.style.top = '10vh';
        chatWindow.style.bottom = '0';
        chatWindow.style.height = 'auto';
        chatWindow.style.maxHeight = 'none';

        // Scroll messages to bottom so user can see recent messages
        setTimeout(() => {
          const messagesContainer = document.getElementById('caty-messages');
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        }, 100);
      } else {
        chatWindow.classList.remove('keyboard-open');
        chatWindow.style.height = '';
        chatWindow.style.maxHeight = '';
        chatWindow.style.bottom = '';
        chatWindow.style.top = '';
      }
    }

    preventBodyScroll(prevent) {
      if (this.isMobile) {
        document.body.style.overflow = prevent ? 'hidden' : '';
      }
    }

    setupSwipeToClose() {
      let startY = 0;
      let currentY = 0;
      let isDragging = false;

      const onTouchStart = (e) => {
        if (!this.isMobile) return;
        const chatWindow = document.querySelector('.caty-widget-window');
        if (!chatWindow || !chatWindow.classList.contains('open')) return;

        // Only detect swipe from header area
        const header = e.target.closest('.caty-widget-header');
        if (!header) {
          isDragging = false;
          return;
        }

        startY = e.touches[0].clientY;
        currentY = startY;
        isDragging = true;
        chatWindow.style.transition = 'none';
      };

      const onTouchMove = (e) => {
        if (!isDragging || !this.isMobile) return;
        const chatWindow = document.querySelector('.caty-widget-window');
        if (!chatWindow) return;

        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        // Only allow downward swipes
        if (deltaY > 0) {
          chatWindow.style.transform = `translateY(${deltaY}px)`;
        }
      };

      const onTouchEnd = () => {
        if (!isDragging || !this.isMobile) return;
        const chatWindow = document.querySelector('.caty-widget-window');
        if (!chatWindow) {
          isDragging = false;
          startY = 0;
          currentY = 0;
          return;
        }

        const deltaY = currentY - startY;
        isDragging = false;

        chatWindow.style.transition = 'transform 0.3s ease-out';

        // If swiped down more than 150px, close chat (increased threshold)
        if (deltaY > 150) {
          chatWindow.style.transform = 'translateY(100%)';
          setTimeout(() => {
            window.Caty.close();
            chatWindow.style.transform = '';
            chatWindow.style.transition = '';
          }, 300);
        } else {
          // Snap back to original position
          chatWindow.style.transform = '';
        }

        // Reset values
        startY = 0;
        currentY = 0;
      };

      document.addEventListener('touchstart', onTouchStart, { passive: true });
      document.addEventListener('touchmove', onTouchMove, { passive: true });
      document.addEventListener('touchend', onTouchEnd);

      this.listeners.push(['touchstart', onTouchStart, document]);
      this.listeners.push(['touchmove', onTouchMove, document]);
      this.listeners.push(['touchend', onTouchEnd, document]);
    }

    destroy() {
      this.listeners.forEach(([event, handler, target]) => {
        target.removeEventListener(event, handler);
      });
      this.listeners = [];
      document.body.style.overflow = '';
    }
  }

  // Event emitter
  const events = {};

  function on(event, callback) {
    if (!events[event]) events[event] = [];
    events[event].push(callback);
  }

  function emit(event, data) {
    if (events[event]) {
      events[event].forEach(callback => callback(data));
    }
  }

  // Utility: Generate unique visitor ID
  function generateVisitorId() {
    return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
  }

  // Utility: Get or create visitor ID
  function getVisitorId() {
    let visitorId = localStorage.getItem('caty_visitor_id');
    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem('caty_visitor_id', visitorId);
    }
    return visitorId;
  }

  // Utility: Get or create session ID
  function getSessionId() {
    // Use localStorage instead of sessionStorage to persist across page navigation
    let sessionId = localStorage.getItem('caty_session_id');
    return sessionId;
  }

  function setSessionId(id) {
    // Use localStorage instead of sessionStorage to persist across page navigation
    localStorage.setItem('caty_session_id', id);
    localStorage.setItem('caty_session_ts', Date.now().toString());
  }

  function getSessionTimestamp() {
    const ts = localStorage.getItem('caty_session_ts');
    return ts ? parseInt(ts, 10) : null;
  }

  // Utility: Save messages to localStorage for persistence
  function saveMessages() {
    try {
      const key = `caty_messages_${CONFIG.apiKey}`;
      const data = {
        messages: state.messages,
        sessionId: state.sessionId,
        lastProducts: state.lastProducts || null,
        lastLiquidItems: state.lastLiquidItems || null,
        wasOpen: state.isOpen || false,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('[Caty Widget] Failed to save messages:', e);
    }
  }

  // Utility: Load messages from localStorage
  function loadMessages() {
    try {
      const key = `caty_messages_${CONFIG.apiKey}`;
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const data = JSON.parse(stored);
      // Messages expire after 24 hours
      const maxAge = 24 * 60 * 60 * 1000;
      if (Date.now() - data.timestamp > maxAge) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch (e) {
      console.warn('[Caty Widget] Failed to load messages:', e);
      return null;
    }
  }

  // Utility: Clear saved messages
  function clearMessages() {
    try {
      const key = `caty_messages_${CONFIG.apiKey}`;
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('[Caty Widget] Failed to clear messages:', e);
    }
  }

  // Utility: Get device info
  function getDeviceInfo() {
    return {
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      language: i18n.currentLang,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  function getUtmParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = {};
      ['source', 'medium', 'campaign', 'term', 'content'].forEach(k => {
        const v = params.get(`utm_${k}`);
        if (v) utm[k] = v;
      });
      return Object.keys(utm).length ? utm : null;
    } catch (_) {
      return null;
    }
  }

  /**
   * Extract comprehensive page context for AI understanding.
   * Reads meta tags, JSON-LD structured data, and main content.
   * All extraction uses textContent only (never innerHTML) for security.
   */
  function extractPageContext() {
    const result = {
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
      meta: {},
      structured_data: [],
      content: {}
    };

    // Meta tags extraction with optional chaining
    try {
      const getMeta = (selector) => {
        const el = document.querySelector(selector);
        return el ? (el.content || el.href || '').slice(0, 500) : '';
      };
      result.meta = {
        description: getMeta('meta[name="description"]'),
        og_title: getMeta('meta[property="og:title"]'),
        og_description: getMeta('meta[property="og:description"]'),
        og_image: getMeta('meta[property="og:image"]'),
        canonical: getMeta('link[rel="canonical"]'),
        language: document.documentElement.lang || ''
      };
    } catch (e) { /* graceful degradation */ }

    // JSON-LD structured data parsing
    const ALLOWED_TYPES = ['Product', 'Article', 'Organization', 'LocalBusiness', 'Service', 'FAQPage', 'WebPage', 'BreadcrumbList'];
    try {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach((script) => {
        try {
          const data = JSON.parse(script.textContent || '');
          const items = Array.isArray(data) ? data : [data];
          items.forEach((item) => {
            const itemType = item['@type'];
            if (itemType && ALLOWED_TYPES.includes(itemType)) {
              const safe = { '@type': itemType };
              if (item.name) safe.name = String(item.name).slice(0, 200);
              if (item.description) safe.description = String(item.description).slice(0, 500);
              if (item.price || item.offers) {
                safe.price = item.price || (item.offers && item.offers.price) || null;
                safe.priceCurrency = item.priceCurrency || (item.offers && item.offers.priceCurrency) || null;
              }
              if (item.aggregateRating) {
                safe.rating = item.aggregateRating.ratingValue || null;
                safe.reviewCount = item.aggregateRating.reviewCount || null;
              }
              result.structured_data.push(safe);
            }
          });
        } catch (parseErr) { /* skip malformed JSON-LD */ }
      });
    } catch (e) { /* graceful degradation */ }

    // Main content extraction - textContent only, strip scripts/styles
    try {
      const h1El = document.querySelector('h1');
      result.content.h1 = h1El ? h1El.textContent.trim().slice(0, 200) : '';

      const h2Els = document.querySelectorAll('h2');
      result.content.h2_list = Array.from(h2Els).slice(0, 5).map((el) => el.textContent.trim().slice(0, 150));

      // Find main content container
      const mainEl = document.querySelector('main') || document.querySelector('article') || document.querySelector('[role="main"]');
      if (mainEl) {
        const clone = mainEl.cloneNode(true);
        clone.querySelectorAll('script, style, nav, header, footer, aside, form, [aria-hidden="true"]').forEach((el) => el.remove());
        let text = clone.textContent || '';
        text = text.replace(/\s+/g, ' ').trim();
        result.content.main_text = text.length > 2000 ? text.slice(0, 1997) + '...' : text;
      } else {
        result.content.main_text = '';
      }

      // Detect product/pricing signals
      const pageText = (document.body.textContent || '').toLowerCase();
      result.content.has_product = result.structured_data.some((d) => d['@type'] === 'Product') ||
        /add to cart|buy now|in stock|out of stock/i.test(pageText);
      result.content.has_pricing = result.structured_data.some((d) => d.price) ||
        /\$[\d,.]+|€[\d,.]+|£[\d,.]+|[\d,.]+\s*(usd|eur|gbp|lei|ron)/i.test(pageText);
    } catch (e) { /* graceful degradation */ }

    // Add engagement metrics if available
    if (state.behaviorTracker) {
      try {
        const metrics = state.behaviorTracker.getMetrics();
        result.engagement_score = metrics.engagement_score || 0;
        result.timeOnPage = metrics.timeOnPage || 0;
        result.scrollDepth = metrics.scrollDepth || 0;
      } catch (e) { /* graceful degradation */ }
    }

    return result;
  }

  // Utility: Get page info (legacy wrapper for backward compat)
  function getPageInfo() {
    const ctx = extractPageContext();
    return {
      page_url: ctx.page_url,
      page_title: ctx.page_title,
      referrer: ctx.referrer
    };
  }

  /**
   * Send a page view or widget_open event to the backend.
   * Uses sessionStorage to deduplicate: each event_type fires at most once per browser session.
   * Uses sendBeacon when available so it survives page unloads.
   *
   * @param {'view'|'widget_open'} eventType
   */
  function sendViewEvent(eventType) {
    try {
      // Deduplicate within the current browser tab session
      const dedupKey = `caty_tracked_${CONFIG.apiKey}_${eventType}`;
      if (sessionStorage.getItem(dedupKey)) return;
      sessionStorage.setItem(dedupKey, '1');

      const payload = JSON.stringify({
        visitor_id: state.visitorId,
        event_type: eventType,
        page_url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString()
      });

      const url = `${CONFIG.baseUrl}/api/widget/view`;
      const headers = {
        'Content-Type': 'application/json',
        'X-API-Key': CONFIG.apiKey
      };

      // keepalive: true ensures the request completes even if the page is navigating away.
      // sendBeacon cannot carry custom headers (needed for X-API-Key), so we always use fetch.
      fetch(url, { method: 'POST', headers, body: payload, keepalive: true }).catch(() => {});
    } catch (e) {
      // Non-critical — never surface errors from telemetry
    }
  }

  // Apply configuration to global CONFIG object
  function applyConfig(config) {
    if (config.primary_color) {
      CONFIG.primaryColor = config.primary_color;
    }
    if (config.user_text_color) {
      CONFIG.userTextColor = config.user_text_color;
    }
    if (config.assistant_text_color) {
      CONFIG.assistantTextColor = config.assistant_text_color;
    }
    if (config.input_text_color) {
      CONFIG.inputTextColor = config.input_text_color;
    }
    if (config.position) {
      CONFIG.position = config.position;
    }
    if (config.theme) {
      CONFIG.theme = config.theme;
    }
  }

  // API: Fetch widget configuration
  async function fetchConfig() {
    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/config`, {
        method: 'GET',
        headers: {
          'X-API-Key': CONFIG.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }

      const data = await response.json();

      // Extract config from response and flatten for widget use
      const widgetConfig = data.config || data;
      state.config = {
        ...widgetConfig,
        // Map API structure to widget expected format
        greeting_message: widgetConfig.behavior?.greeting?.message || widgetConfig.greeting_message,
        persona_name: widgetConfig.persona?.name || widgetConfig.persona_name,
        persona_avatar: widgetConfig.persona?.avatar_url || widgetConfig.persona_avatar,
        primary_color: widgetConfig.appearance?.colors?.primary || widgetConfig.primary_color,
        background_color: widgetConfig.appearance?.colors?.background || null,
        text_color: widgetConfig.appearance?.colors?.text || null,
        user_text_color: widgetConfig.appearance?.colors?.user_text || '#ffffff',
        assistant_text_color: widgetConfig.appearance?.colors?.assistant_text || '#e5e7eb',
        input_text_color: widgetConfig.appearance?.colors?.input_text || '#f9fafb',
        theme: widgetConfig.appearance?.theme || widgetConfig.theme,
        position: widgetConfig.appearance?.position || widgetConfig.position,
        launcher_icon: widgetConfig.appearance?.launcher?.icon_url || null,
      };

      // Apply widget forced language (overrides HTML lang attribute and browser language)
      // If widget has languages_supported with exactly 1 language, always use that
      const forcedLang = widgetConfig.persona?.languages_supported?.length === 1
        ? widgetConfig.persona.languages_supported[0]
        : (widgetConfig.persona?.language || null);
      if (forcedLang && translations[forcedLang]) {
        i18n.setLanguage(forcedLang);
        console.log('[Caty Widget] Language forced by widget config:', forcedLang);
      }

      // NEW: Apply AutoConfig data if available
      if (widgetConfig.auto_config) {
        state.autoConfig = widgetConfig.auto_config;

        // Apply responsive breakpoints
        if (state.autoConfig.responsive) {
          state.responsive = state.autoConfig.responsive;
        }

        // Store forms, banners, buttons for later use
        state.autoForms = state.autoConfig.forms || [];
        state.autoBanners = state.autoConfig.banners || [];
        state.autoButtons = state.autoConfig.buttons || [];
        state.autoProducts = state.autoConfig.products || [];

        console.log('[Caty Widget] AutoConfig loaded:', {
          forms: state.autoForms.length,
          banners: state.autoBanners.length,
          buttons: state.autoButtons.length,
          products: state.autoProducts.length
        });
      }

      return state.config;
    } catch (error) {
      console.error('[Caty Widget] Failed to fetch config:', error);
      // Use defaults if config fetch fails
      return {
        persona_name: 'Caty',
        persona_avatar: null,
        primary_color: CONFIG.primaryColor,
        greeting_message: CONFIG.greeting || "Hi! I'm Caty, your AI assistant. How can I help you today?",
        theme: CONFIG.theme,
      };
    }
  }

  // API: Create new session
  async function createSession() {
    try {
      const pageInfo = getPageInfo();
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/session`, {
        method: 'POST',
        headers: {
          'X-API-Key': CONFIG.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitor_id: state.visitorId,
          device: getDeviceInfo(),
          source: {
            page_url: pageInfo.page_url,
            page_title: pageInfo.page_title,
            referrer: pageInfo.referrer,
            utm: getUtmParams()
          },
          context: {
            page_url: pageInfo.page_url,
            language: i18n.currentLang // Browser/site language for greeting
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.status}`);
      }

      const data = await response.json();
      state.sessionId = data.session_id;
      try { setSessionId(data.session_id); } catch(e) { console.warn('[Caty] storage unavailable', e); }
      return data;
    } catch (error) {
      console.error('[Caty Widget] Failed to create session:', error);
    }
  }

  // Helper: Detect language from AI response content
  function detectResponseLanguage(content) {
    const detected = i18n.detectFromText(content);
    if (detected) {
      console.log('[Caty Widget] Detected conversation language:', detected);
      return detected;
    }
    return state.conversationLanguage || i18n.currentLang;
  }

  // API: Send message
  async function sendMessage(text) {
    if (!text || !text.trim()) return;

    try {
      // Ensure we have a session
      if (!state.sessionId) {
        await createSession();
      }

      // Mark user as engaged - stop proactive messages
      if (state.triggerEngine) {
        state.triggerEngine.markEngaged();
      }

      // Track message sent event
      if (state.behaviorTracker) {
        state.behaviorTracker.addEvent('message_sent', { length: text.length });
      }

      // Add user message to UI
      addMessage('user', text);

      // Show typing indicator
      showTyping();

      const response = await fetch(`${CONFIG.baseUrl}/api/widget/chat/message`, {
        method: 'POST',
        headers: {
          'X-API-Key': CONFIG.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: state.sessionId,
          message: text,
          language: i18n.currentLang, // Send detected language to API
          context: extractPageContext(),
          visitor_info: {
            ...state.visitor,
            ...getPageInfo(),
          },
          capabilities: {
            use_knowledge_base: state.config?.capabilities?.answer_questions ?? true,
            allow_handoff: state.config?.capabilities?.handoff_human ?? false,
          },
        }),
      });

      hideTyping();

      if (!response.ok) {
        // Handle session not found - clear stale session and retry once
        if (response.status === 404) {
          const errorData = await response.json().catch(() => ({}));
          // Check both old and new error formats: message field OR error field, code NOT_FOUND or SESSION_NOT_FOUND
          const errorMsg = errorData.message || errorData.error || '';
          if (errorMsg.toLowerCase().includes('session') || errorData.code === 'NOT_FOUND' || errorData.code === 'SESSION_NOT_FOUND') {
            console.warn('[Caty Widget] Session expired or invalid, creating new session...');
            localStorage.removeItem('caty_session_id');
            state.sessionId = null;
            try {
              await createSession();
            } catch (sessionError) {
              console.error('[Caty Widget] Failed to recreate session on retry:', sessionError);
              throw new Error('Failed to initialize session');
            }
            // Retry the message with new session (only once)
            if (state.sessionId && !state._retryingSend) {
              state._retryingSend = true;
              try {
                const retryResult = await sendMessage(text);
                return retryResult;
              } finally {
                state._retryingSend = false;
              }
            }
          }
        }
        throw new Error(`Failed to send message: ${response.status}`);
      }

      const data = await response.json();

      // Use language from API response if available, otherwise detect from content
      state.conversationLanguage = data.language || detectResponseLanguage(data.content);
      console.log('[Caty Widget] Conversation language:', state.conversationLanguage);

      // Parse trailing "- text" lines → convert to quick reply chips
      (function() {
        const lines = (data.content || '').split('\n');
        const qrActions = [];
        let cutIdx = lines.length;
        for (let i = lines.length - 1; i >= 0; i--) {
          const t = lines[i].trim();
          if (t === '') { cutIdx = i; continue; }
          if (/^-\s+\S.{1,70}$/.test(t) && !t.startsWith('- **')) {
            qrActions.unshift({ action: 'quick_reply', label: t.replace(/^-\s+/, '').trim() });
            cutIdx = i;
          } else { break; }
        }
        if (qrActions.length > 0) {
          data.content = lines.slice(0, cutIdx).join('\n').trimEnd();
          data.suggested_actions = [...(data.suggested_actions || []), ...qrActions];
        }
      })();

      // Add assistant message to UI
      addMessage('assistant', data.content);

      // Auto-detect if AI mentions a form and show it automatically
      const formPatterns = [
        /complet(ează|eaza|a)\s+(formularul|datele)/i,
        /fill\s+(in|out)\s+(the\s+)?form/i,
        /lăs(ă|a).*datele/i,
        /share\s+your\s+(details|contact)/i
      ];
      const mentionsForm = formPatterns.some(p => p.test(data.content));
      const hasFormAction = data.suggested_actions?.some(a =>
        a.action === 'form' || a.action === 'contact_me'
      );

      // Auto-show lead form if AI mentions it and no form action exists
      if (mentionsForm && !hasFormAction && !state.leadCaptured) {
        console.log('[Caty Widget] Auto-showing lead form based on AI response');
        setTimeout(() => showLeadCapture(null, true), 500); // Force show with delay for UX
      }

      // Render quick replies if available
      if (data.suggested_actions && data.suggested_actions.length > 0) {
        const slotPickerAction = data.suggested_actions.find(a => a.action === 'slot_picker');
        const carouselAction = data.suggested_actions.find(a => a.action === 'product_carousel');
        if (slotPickerAction) {
          renderSlotPicker(slotPickerAction);
        } else if (carouselAction) {
          renderLiquidProductCards(carouselAction.payload?.items || []);
          const otherActions = data.suggested_actions.filter(a => a.action !== 'product_carousel');
          if (otherActions.length > 0) renderQuickReplies(otherActions);
        } else {
          renderQuickReplies(data.suggested_actions);
        }
      }

      // Render product cards if available
      if (data.products && data.products.length > 0) {
        renderProductCards(data.products);
      }

      // Emit message event
      emit('message', { role: 'assistant', content: data.content });

      // Check if lead was captured
      if (data.lead_captured) {
        emit('lead', data.lead_data);
      }

      // Check AutoConfig forms based on detected intent
      // Try data.intent first, fallback to data.analysis.intent
      const detectedIntent = data.intent || data.analysis?.intent;
      if (detectedIntent && !state.leadCaptured) {
        console.log('[Caty Widget] Detected intent:', detectedIntent);
        checkAutoFormTriggers(detectedIntent);
      }

      return data;
    } catch (error) {
      hideTyping();
      console.error('[Caty Widget] Failed to send message:', error);
      addMessage('assistant', i18n.t('errorMessage'));
    }
  }

  // Get theme-specific colors based on theme setting
  function getThemeColors(theme) {
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Helper to check if a color is too light (for dark backgrounds)
    function isColorTooLight(hex) {
      if (!hex || !hex.startsWith('#')) return false;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.85;
    }

    // Helper to check if a color is too dark (for light backgrounds)
    function isColorTooDark(hex) {
      if (!hex || !hex.startsWith('#')) return false;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.15;
    }

    // Use colors from CONFIG if available, otherwise use defaults
    if (isDark) {
      // Use a slightly lighter shade for assistant messages to differentiate from background
      const baseBg = state.config?.background_color || '#111827';
      const assistantBg = state.config?.background_color ? '#313244' : '#1f2937';

      // Get configured assistant text color, but ensure it's visible on dark bg
      let assistantTextColor = state.config?.assistant_text_color || CONFIG.assistantTextColor || '#e5e7eb';
      // If the configured color is too dark for dark mode, use default light color
      if (isColorTooDark(assistantTextColor)) {
        console.log('[Caty Widget] Assistant text color too dark for dark mode, using default');
        assistantTextColor = '#e5e7eb';
      }

      return {
        textColor: state.config?.text_color || CONFIG.inputTextColor || '#f3f4f6',
        bgColor: baseBg,
        borderColor: '#374151',
        assistantMsgBg: assistantBg,
        assistantTextColor: assistantTextColor,
        inputBg: assistantBg,
        productBtnBg: 'rgba(255,255,255,0.08)'  // Light on dark background
      };
    } else {
      // Get configured assistant text color, but ensure it's visible on light bg
      let assistantTextColor = state.config?.assistant_text_color || '#1f2937';
      // If the configured color is too light for light mode, use default dark color
      if (isColorTooLight(assistantTextColor)) {
        console.log('[Caty Widget] Assistant text color too light for light mode, using default');
        assistantTextColor = '#1f2937';
      }

      return {
        textColor: state.config?.text_color || '#1f2937',
        bgColor: state.config?.background_color || '#ffffff',
        borderColor: '#d1d5db',
        assistantMsgBg: '#f3f4f6',
        assistantTextColor: assistantTextColor,
        inputBg: '#f9fafb',
        productBtnBg: 'rgba(0,0,0,0.06)'  // Dark on light background
      };
    }
  }

  // Styles - embedded CSS with theming support
  function getStyles() {
    const themeColors = getThemeColors(CONFIG.theme);

    return `
    .caty-widget * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .caty-widget {
      --primary-color: ${CONFIG.primaryColor};
      --text-color: ${themeColors.textColor};
      --bg-color: ${themeColors.bgColor};
      --border-color: ${themeColors.borderColor};
      --product-btn-bg: ${themeColors.productBtnBg};
      --user-msg-bg: var(--primary-color);
      --assistant-msg-bg: ${themeColors.assistantMsgBg};
      --input-bg: ${themeColors.inputBg};
      --user-text-color: ${CONFIG.userTextColor || '#ffffff'};
      --assistant-text-color: ${themeColors.assistantTextColor};
      --input-text-color: ${CONFIG.inputTextColor || themeColors.textColor};
      --catyai-host-bg: #ffffff;
      --catyai-host-text: #1f2937;
      --caty-bot-bubble-bg: #ffffff;
      --caty-bot-bubble-text: #0f172a;
      font-family: inherit !important;
      position: fixed;
      z-index: 999999;
      font-size: 14px;
      line-height: 1.5;
    }

    /* ── NOISE TEXTURE OVERLAY ───────────────────────────── */
    .caty-sidebar-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.045;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 200px 200px;
    }

    body.caty-sidebar-active {
      margin-right: 30vw !important;
      overflow-x: hidden !important;
      transition: margin-right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ── HEADER 70/30: fixed headers respect sidebar ─────── */
    body.caty-sidebar-active header,
    body.caty-sidebar-active [role="banner"],
    body.caty-sidebar-active nav.site-header,
    body.caty-sidebar-active .site-header,
    body.caty-sidebar-active #site-header {
      right: 30vw !important;
      transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .caty-sidebar-active-left header,
    .caty-sidebar-active-left [role="banner"],
    .caty-sidebar-active-left nav.site-header,
    .caty-sidebar-active-left .site-header,
    .caty-sidebar-active-left #site-header {
      left: 30vw !important;
      transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    /* ── SIDEBAR 70/30 LAYOUT + PREMIUM BACKDROP ─────────── */
    .caty-sidebar-panel {
      position: fixed !important;
      right: 0 !important;
      top: 0 !important;
      bottom: 0 !important;
      width: 30vw !important;
      min-width: 320px !important;
      max-width: 480px !important;
      height: 100vh !important;
      max-height: 100vh !important;
      min-height: 100vh !important;
      border-radius: 0 !important;
      box-shadow: -4px 0 32px rgba(0, 0, 0, 0.12) !important;
      border-left: 1px solid rgba(0, 0, 0, 0.08);
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
      transform: translateX(0) !important;
      background: var(--catyai-host-bg) !important;
      color: var(--catyai-host-text) !important;
      backdrop-filter: blur(32px) saturate(180%) !important;
      -webkit-backdrop-filter: blur(32px) saturate(180%) !important;
      border: none !important;
      border-left: 0.5px solid rgba(128, 128, 128, 0.2) !important;
      box-shadow: -8px 0 48px rgba(0, 0, 0, 0.10), -2px 0 12px rgba(0,0,0,0.06) !important;
    }

    .caty-sidebar-panel.caty-panel-hidden {
      transform: translateX(100%) !important;
    }


    /* ── LEFT SIDEBAR: push 70/30 ───────────────────────────── */
    .caty-sidebar-active-left {
      margin-left: 30vw !important;
      max-width: 70vw !important;
      overflow-x: hidden !important;
      transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Fix Elementor stretched/full-width sections so they reflow within 70vw */
    .caty-sidebar-active-left .elementor-section-stretched,
    .caty-sidebar-active-left .elementor-section.elementor-section-full_width,
    .caty-sidebar-active-left .e-con--full-width,
    .caty-sidebar-active-left .elementor-top-section {
      width: 100% !important;
      max-width: 100% !important;
      left: 0 !important;
      right: 0 !important;
      margin-left: 0 !important;
    }

    .caty-sidebar-active-left .caty-sidebar-panel {
      left: 0 !important;
      right: auto !important;
      border-left: none !important;
      border-right: 0.5px solid rgba(128, 128, 128, 0.2) !important;
      box-shadow: 8px 0 48px rgba(0, 0, 0, 0.10), 2px 0 12px rgba(0,0,0,0.06) !important;
    }

    .caty-widget-message-bubble {
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06) !important;
    }

    @media (max-width: 768px) {
      body.caty-sidebar-active { margin-right: 0 !important; }
      .caty-sidebar-panel {
        width: 100vw !important;
        max-width: 100vw !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: var(--catyai-host-bg, #ffffff) !important;
      }
    }

    /* ── FONT HIERARCHY ──────────────────────────────────── */
    .caty-bubble-assistant .caty-bubble-text strong,
    .caty-bubble-bot strong,
    .bubble-bot strong,
    [class*="assistant"] strong {
      font-family: inherit !important;
      font-style: italic;
      letter-spacing: -0.2px;
    }

    .caty-chat-header [class*="name"],
    .caty-widget-header [class*="title"] {
      font-family: inherit !important;
      letter-spacing: -0.3px;
    }

    /* ── LASER-LINE POP ANIMATION ─────────────────────────── */
    @keyframes caty-laser-in {
      0% {
        clip-path: inset(46% 2% 46% 2% round 8px);
        opacity: 0.5;
        transform: scaleX(0.85);
      }
      65% {
        clip-path: inset(0% 0% 0% 0% round 8px);
        opacity: 1;
        transform: scaleX(1.025);
      }
      100% {
        clip-path: inset(0% 0% 0% 0% round 8px);
        transform: scaleX(1);
      }
    }

    .caty-widget-quick-reply {
      animation: none;
      opacity: 1;
      transform: scaleX(1);
      transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1),
                  background 0.2s ease,
                  box-shadow 0.2s ease;
      will-change: transform, clip-path;
      position: relative;
      overflow: hidden;
    }

    .caty-widget-quick-reply.caty-chip-ready {
      animation: caty-laser-in 0.55s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
      opacity: 1;
    }

    .caty-widget-quick-reply::after {
      content: '';
      position: absolute;
      left: -100%;
      top: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      transform: skewX(-20deg);
      transition: left 0.5s ease;
    }

    .caty-widget-quick-reply:hover::after {
      left: 150%;
    }

    .caty-widget-quick-reply:hover {
      transform: translateX(5px) !important;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }


    .caty-widget-launcher {
      position: fixed;
      ${CONFIG.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      ${CONFIG.position.includes('top') ? 'top: 20px;' : 'bottom: 20px;'}
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: caty-slide-in 0.5s ease-out;
    }

    .caty-widget-launcher:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .caty-widget-launcher:active {
      transform: scale(0.95);
    }

    .caty-widget-launcher .caty-launcher-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .caty-widget-launcher.open .caty-launcher-icon {
      transform: scale(0.9);
    }

    .caty-widget-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #ef4444;
      color: white;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 11px;
      font-weight: 600;
      min-width: 20px;
      text-align: center;
      display: none;
    }

    .caty-widget-badge.show {
      display: block;
      animation: caty-badge-pop 0.3s ease-out;
    }

    .caty-widget-window {
      position: fixed;
      ${CONFIG.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      ${CONFIG.position.includes('top') ? 'top: 20px;' : 'bottom: 90px;'}
      width: 380px;
      height: 600px;
      max-height: calc(100vh - 120px);
      background: var(--bg-color);
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 999999;
      animation: caty-window-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .caty-widget-window.open {
      display: flex;
    }

    .caty-widget-header {
      background: var(--primary-color);
      color: white;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .caty-widget-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .caty-widget-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .caty-widget-header-info {
      flex: 1;
      min-width: 0;
    }

    .caty-widget-persona-name {
      font-weight: 600;
      font-size: 16px;
    }

    .caty-widget-status {
      font-size: 12px;
      opacity: 0.9;
    }

    .caty-widget-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      margin: -8px;
      opacity: 0.9;
      transition: opacity 0.2s;
      flex-shrink: 0;
    }

    .caty-widget-close:hover {
      opacity: 1;
    }

    .caty-widget-close svg {
      width: 20px;
      height: 20px;
      display: block;
    }

    /* Mobile back button - hidden on desktop */
    .caty-widget-back-mobile {
      display: none;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      margin: -8px;
      margin-right: 4px;
      opacity: 0.95;
      transition: opacity 0.2s, transform 0.2s;
      flex-shrink: 0;
    }

    .caty-widget-back-mobile:hover {
      opacity: 1;
    }

    .caty-widget-back-mobile:active {
      transform: scale(0.95);
    }

    .caty-widget-back-mobile svg {
      width: 24px;
      height: 24px;
      display: block;
    }

    .caty-widget-handoff {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      margin: -8px;
      opacity: 0.9;
      transition: opacity 0.2s;
      flex-shrink: 0;
    }

    .caty-widget-handoff:hover {
      opacity: 1;
    }

    .caty-widget-handoff svg {
      width: 20px;
      height: 20px;
      display: block;
    }

    .caty-widget-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--bg-color);
    }

    .caty-widget-messages::-webkit-scrollbar {
      width: 6px;
    }

    .caty-widget-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .caty-widget-messages::-webkit-scrollbar-thumb {
      background: #4b5563;
      border-radius: 3px;
    }

    .caty-widget-message {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      animation: caty-message-in 0.3s ease-out;
    }

    .caty-widget-message.user {
      flex-direction: row-reverse;
    }

    .caty-widget-message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #d1d5db;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .caty-widget-message.assistant .caty-widget-message-avatar {
      background: var(--primary-color);
      color: white;
    }

    .caty-widget-message.user .caty-widget-message-avatar {
      background: #6b7280;
      color: white;
    }

    .caty-widget-message-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .caty-widget-message-bubble {
      max-width: 75%;
      padding: 10px 14px;
      border-radius: 12px;
      word-wrap: break-word;
    }

    .caty-widget-message.assistant .caty-widget-message-bubble {
      background: var(--caty-bot-bubble-bg) !important;
      color: var(--caty-bot-bubble-text) !important;
      border-bottom-left-radius: 4px;
      -webkit-text-fill-color: var(--caty-bot-bubble-text) !important;
      border: 1px solid rgba(128, 128, 128, 0.12);
    }

    .caty-widget-message.user .caty-widget-message-bubble {
      background: var(--user-msg-bg);
      color: var(--user-text-color);
      border-bottom-right-radius: 4px;
      /* Force text visibility */
      -webkit-text-fill-color: var(--user-text-color);
    }

    .caty-widget-typing {
      display: none;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: rgba(128, 128, 128, 0.1);
      border-radius: 12px;
      width: fit-content;
      margin-left: 40px;
    }

    .caty-widget-typing.show {
      display: flex;
    }

    .caty-widget-typing-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.4;
      animation: caty-typing 1.4s infinite;
    }

    .caty-widget-typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .caty-widget-typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    .caty-widget-quick-replies {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 8px 16px 12px 16px;
      background: transparent;
    }

    /* Action button base - compact neuromarketing design */
    .caty-widget-quick-reply {
      opacity: 1 !important;
      background: var(--primary-color) !important;
      border: none !important;
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
      padding: 10px 14px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      font-family: inherit !important;
      transition: all 0.2s;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .caty-widget-quick-reply:hover {
      border-color: var(--primary-color) !important;
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* Neuromarketing: GREEN for lead capture (action/conversion) */
    .caty-widget-quick-reply.caty-action-lead {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      border-color: #059669 !important;
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
      font-weight: 600;
    }

    .caty-widget-quick-reply.caty-action-lead:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
      transform: translateX(4px) scale(1.02);
    }

    /* Neuromarketing: BLUE for schedule (trust/commitment) */
    .caty-widget-quick-reply.caty-action-schedule {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
      border-color: #2563eb !important;
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
      font-weight: 600;
    }

    .caty-widget-quick-reply.caty-action-schedule:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
      transform: translateX(4px) scale(1.02);
    }

    /* Neuromarketing: ORANGE for urgency actions */
    .caty-widget-quick-reply.caty-action-urgent {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
      border-color: #d97706 !important;
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
      font-weight: 600;
    }

    .caty-widget-quick-reply.caty-action-urgent:hover {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%) !important;
    }

    /* ───── Liquid UI: Slot Picker ───── */
    .caty-slot-picker {
      width: 100%;
      padding: 12px;
      background: rgba(128, 128, 128, 0.06);
      border-radius: 12px;
      margin-top: 8px;
    }
    .caty-slot-picker-header {
      font-size: 13px;
      font-weight: 600;
      color: inherit;
      margin-bottom: 10px;
      font-family: inherit !important;
    }
    .caty-slot-picker-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
    }
    .caty-slot-card {
      padding: 10px 8px;
      background: transparent;
      border: 1px solid currentColor;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.18s ease;
      text-align: center;
      font-family: inherit !important;
      opacity: 0.75;
    }
    .caty-slot-card:hover {
      border-color: var(--primary-color);
      opacity: 1;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(128, 128, 128, 0.15);
    }
    .caty-slot-card.selected {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: #ffffff;
      opacity: 1;
    }
    .caty-slot-time {
      font-size: 14px;
      font-weight: 600;
      color: inherit;
      font-family: inherit !important;
    }
    .caty-slot-card.selected .caty-slot-time {
      color: #ffffff;
    }

    /* Inline link buttons in messages */
    .caty-message-content {
      white-space: pre-wrap;
      word-break: break-word;
      color: inherit;
      -webkit-text-fill-color: inherit;
    }

    /* Ensure message text is always visible */
    .caty-widget-message.assistant .caty-message-content {
      color: var(--caty-bot-bubble-text) !important;
      -webkit-text-fill-color: var(--caty-bot-bubble-text) !important;
    }

    .caty-widget-message.user .caty-message-content {
      color: var(--user-text-color) !important;
      -webkit-text-fill-color: var(--user-text-color) !important;
    }

    .caty-recommendation {
      font-family: inherit !important;
      font-style: italic;
      font-size: 13.5px;
      line-height: 1.65;
      color: inherit;
      display: block;
      margin-top: 6px;
    }

    .caty-message-content strong {
      font-weight: 700;
      color: inherit;
    }

    .caty-message-content em {
      font-style: italic;
    }

    .caty-message-content code {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 12px;
      background: rgba(0,0,0,0.06);
      padding: 1px 5px;
      border-radius: 3px;
    }

    .caty-inline-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--primary-color);
      color: #ffffff !important;
      padding: 8px 16px;
      border-radius: 20px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      margin: 4px 2px;
      transition: all 0.2s;
      cursor: pointer;
    }

    .caty-inline-link-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .caty-inline-link-btn::before {
      content: '🔗';
      font-size: 12px;
    }

    /* Phone call button */
    .caty-phone-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff !important;
      padding: 10px 20px;
      border-radius: 25px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      margin: 8px 4px;
      transition: all 0.2s;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    }

    .caty-phone-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }

    /* Handoff action buttons container */
    .caty-handoff-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border-color);
    }

    .caty-handoff-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .caty-handoff-btn.call {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    }

    .caty-handoff-btn.call:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }

    .caty-handoff-btn.contact {
      background: var(--primary-color);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    }

    .caty-handoff-btn.contact:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
    }

    .caty-handoff-btn.form {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
    }

    .caty-handoff-btn.form:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
    }

    .caty-widget-input-container {
      padding: 16px 20px;
      border-top: 0.5px solid rgba(0, 0, 0, 0.06) !important;
      background: var(--bg-color);
      flex-shrink: 0;
      overflow: visible;
    }

    .caty-widget-input-wrapper {
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }

    .caty-widget-input {
      flex: 1;
      min-width: 0;
      border: 1px solid rgba(128,128,128,0.25);
      border-radius: 20px;
      padding: 10px 16px;
      font-size: 14px;
      font-family: inherit !important;
      resize: none;
      max-height: 100px;
      min-height: 40px;
      outline: none;
      transition: border-color 0.2s;
      background: var(--caty-bot-bubble-bg) !important;
      color: var(--caty-bot-bubble-text) !important;
      -webkit-text-fill-color: var(--caty-bot-bubble-text) !important;
      color-scheme: light;
    }

    .caty-widget-input::placeholder {
      color: var(--caty-bot-bubble-text);
      -webkit-text-fill-color: var(--caty-bot-bubble-text);
      opacity: 0.45;
    }

    .caty-widget-input:focus {
      border-color: var(--primary-color);
    }

    .caty-widget-send {
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      font-family: inherit !important;
    }

    .caty-widget-send:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    }

    .caty-widget-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .caty-widget-send svg {
      width: 20px;
      height: 20px;
    }

    .caty-widget-attach {
      background: transparent;
      color: var(--text-color);
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      margin-right: 4px;
      opacity: 0.7;
    }

    .caty-widget-attach:hover {
      opacity: 1;
      background: rgba(99, 102, 241, 0.1);
    }

    .caty-widget-attach svg {
      width: 20px;
      height: 20px;
    }

    .caty-widget-file-preview {
      padding: 12px 20px;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.06) !important;
      background: var(--bg-color);
    }

    .caty-widget-file-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: rgba(128, 128, 128, 0.1);
      border-radius: 8px;
      border: 1px solid currentColor;
      opacity: 0.8;
    }

    .caty-widget-file-item svg {
      width: 20px;
      height: 20px;
      color: var(--primary-color);
      flex-shrink: 0;
    }

    .caty-widget-file-name {
      flex: 1;
      font-size: 13px;
      color: var(--text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .caty-widget-file-remove {
      background: transparent;
      border: none;
      color: #ef4444;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;
      flex-shrink: 0;
    }

    .caty-widget-file-remove:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    .caty-widget-file-remove svg {
      width: 16px;
      height: 16px;
    }

    .caty-widget-footer {
      padding: 12px 20px;
      text-align: center;
      font-size: 11px;
      color: #6b7280;
      border-top: 0.5px solid rgba(0, 0, 0, 0.06) !important;
      background: var(--bg-color);
    }

    .caty-widget-footer a {
      color: var(--primary-color);
      text-decoration: none;
    }

    .caty-widget-footer a:hover {
      text-decoration: underline;
    }

    /* Proactive Bubble Styles */
    .caty-bubble {
      position: fixed;
      ${CONFIG.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      bottom: 90px;
      max-width: 280px;
      padding: 14px 16px;
      padding-right: 32px;
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      ${CONFIG.position.includes('right') ? 'border-bottom-right-radius: 4px;' : 'border-bottom-left-radius: 4px;'}
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
      z-index: 999998;
      animation: caty-bubble-in 0.3s ease-out;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .caty-bubble:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 28px rgba(0, 0, 0, 0.25);
    }

    .caty-bubble::after {
      content: '';
      position: absolute;
      bottom: -8px;
      ${CONFIG.position.includes('right') ? 'right: 24px;' : 'left: 24px;'}
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid var(--bg-color);
    }

    .caty-bubble-content {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .caty-bubble-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .caty-bubble-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .caty-bubble-text {
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-color);
      flex: 1;
    }

    .caty-bubble-dismiss {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .caty-bubble-dismiss:hover {
      opacity: 1;
    }

    @keyframes caty-bubble-in {
      0% {
        transform: translateY(20px) scale(0.9);
        opacity: 0;
      }
      100% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }

    /* Products Container - Modern Dark Theme */
    .caty-products-container {
      margin: 12px 0;
      padding: 0;
      max-width: 100%;
    }

    .caty-products-header {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,0.95);
      background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2));
      border-radius: 16px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.15);
    }

    .caty-products-icon {
      font-size: 14px;
    }

    .caty-products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 14px;
    }

    /* Product Card - Professional E-commerce Design with Neuromarketing */
    .caty-product-card {
      display: flex;
      flex-direction: column;
      padding: 12px;
      background: var(--assistant-msg-bg);
      border-radius: 16px;
      max-width: 100%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      position: relative;
      overflow: hidden;
    }

    .caty-badge-marketing {
      background: var(--primary-color);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      position: absolute;
      top: 8px;
      left: 8px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      z-index: 2;
    }
    .caty-badge-promo {
      display: inline-block;
      background: #ff6b35;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      margin-bottom: 4px;
    }
    .caty-badge-delivery {
      color: var(--primary-color);
      font-size: 11px;
      font-weight: 600;
    }
    .caty-product-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .caty-product-card:hover {
      border-color: rgba(59, 130, 246, 0.4);
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }

    .caty-product-card:hover::before {
      opacity: 1;
    }

    .caty-product-image {
      position: relative;
      flex-shrink: 0;
      width: 100%;
      height: 150px;
      border-radius: 12px;
      overflow: hidden;
      background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
      margin-bottom: 12px;
    }

    .caty-product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .caty-product-card:hover .caty-product-image img {
      transform: scale(1.1);
    }

    /* Sale Badge - Neuromarketing Red */
    .caty-product-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 700;
      border-radius: 6px;
      z-index: 2;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .caty-badge-sale {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
      animation: pulse-badge 2s infinite;
    }

    @keyframes pulse-badge {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .caty-badge-out {
      background: rgba(100, 116, 139, 0.9);
      color: #ffffff;
      top: auto;
      bottom: 8px;
    }

    .caty-product-no-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
    }

    .caty-product-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .caty-product-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-color) !important;
      -webkit-text-fill-color: var(--text-color) !important;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 38px;
    }

    .caty-product-description {
      font-size: 12px;
      color: var(--text-color) !important;
      -webkit-text-fill-color: var(--text-color) !important;
      opacity: 0.6;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Stock indicator - Neuromarketing Green */
    .caty-product-stock {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 500;
      color: #22c55e !important;
      -webkit-text-fill-color: #22c55e !important;
      margin: 2px 0;
    }

    .caty-stock-dot {
      width: 6px;
      height: 6px;
      background: #22c55e;
      border-radius: 50%;
      animation: stock-pulse 1.5s infinite;
    }

    @keyframes stock-pulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
      50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0); }
    }

    .caty-product-btn-full {
      width: 100%;
      padding: 12px 18px;
      font-size: 14px;
      font-weight: 600;
      background: var(--primary-color) !important;
      color: #ffffff !important;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s ease;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .caty-product-btn-full:hover {
      filter: brightness(0.88);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.18);
    }

    .caty-product-actions-single {
      margin-top: 10px;
    }

    /* Rating stars - Neuromarketing Gold */
    .caty-product-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      margin: 2px 0;
    }

    .caty-stars {
      color: #f59e0b !important;
      -webkit-text-fill-color: #f59e0b !important;
      letter-spacing: 1px;
    }

    .caty-rating-num {
      color: var(--text-color) !important;
      -webkit-text-fill-color: var(--text-color) !important;
      opacity: 0.5;
      font-size: 11px;
    }

    .caty-product-price {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin: 6px 0;
    }

    /* Price - Neuromarketing emphasis */
    .caty-product-price-current {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary-color) !important;
      -webkit-text-fill-color: var(--primary-color) !important;
      letter-spacing: -0.03em;
    }

    .caty-product-price-original {
      font-size: 13px;
      color: #ef4444 !important;
      -webkit-text-fill-color: #ef4444 !important;
      opacity: 0.8;
      text-decoration: line-through;
    }

    .caty-product-actions {
      display: flex;
      gap: 8px;
      margin-top: auto;
      padding-top: 10px;
    }

    .caty-product-btn {
      flex: 1;
      padding: 10px 12px;
      font-size: 12px;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 42px;
    }

    .caty-product-btn svg {
      flex-shrink: 0;
    }

    .caty-product-view {
      background: var(--product-btn-bg, rgba(0,0,0,0.05));
      color: var(--text-color) !important;
      -webkit-text-fill-color: var(--text-color) !important;
      border: 1.5px solid var(--border-color);
    }

    .caty-product-view:hover {
      background: rgba(59, 130, 246, 0.15) !important;
      border-color: #3b82f6;
      color: #3b82f6 !important;
      -webkit-text-fill-color: #3b82f6 !important;
    }

    /* CTA Button - Neuromarketing Orange/Red gradient */
    .caty-product-cart {
      background: linear-gradient(135deg, #f97316, #ea580c) !important;
      color: #ffffff !important;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
    }

    .caty-product-cart:hover {
      background: linear-gradient(135deg, #ea580c, #dc2626) !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
    }

    /* Overlay for mobile */
    .caty-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999998;
      opacity: 0;
      transition: opacity 0.3s ease-out;
      pointer-events: none;
    }

    .caty-overlay.active {
      opacity: 1;
      pointer-events: all;
    }

    /* Mobile responsive - WhatsApp-style fullscreen */
    @media (max-width: 768px) {
      .caty-widget-window {
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important; /* Dynamic viewport height for mobile browsers */
        max-height: 100vh !important;
        max-height: 100dvh !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        top: 0 !important;
        border-radius: 0 !important;
        animation: slideUpFromBottom 0.25s ease-out;
        /* Fix for iOS */
        position: fixed !important;
        transform: translateZ(0);
        overflow: visible !important;
        /* Safe area padding for notch devices */
        padding-top: env(safe-area-inset-top, 0);
        padding-bottom: env(safe-area-inset-bottom, 0);
      }

      /* Header adjustment for fullscreen - WhatsApp style */
      .caty-widget-window .caty-widget-header {
        padding-top: calc(12px + env(safe-area-inset-top, 0)) !important;
        border-radius: 0 !important;
        min-height: 60px;
      }

      /* When keyboard is open */
      .caty-widget-window.keyboard-open {
        height: 100vh !important;
        height: 100dvh !important;
        max-height: 100vh !important;
        max-height: 100dvh !important;
        bottom: 0 !important;
        top: 0 !important;
      }

      /* Input container with safe area for home indicator */
      .caty-widget-window .caty-widget-input-container {
        padding-bottom: max(12px, env(safe-area-inset-bottom)) !important;
        border-radius: 0 !important;
      }

      /* Ensure input container is always visible when keyboard is open */
      .caty-widget-window.keyboard-open .caty-widget-input-container {
        padding-bottom: 12px !important;
      }

      @keyframes slideUpFromBottom {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .caty-widget-launcher {
        bottom: calc(16px + env(safe-area-inset-bottom, 0));
        ${CONFIG.position.includes('right') ? 'right: 16px;' : 'left: 16px;'}
        width: 60px;
        height: 60px;
      }

      .caty-widget-launcher .caty-launcher-icon {
        width: 48px;
        height: 48px;
      }

      .caty-bubble {
        max-width: calc(100vw - 100px);
        ${CONFIG.position.includes('right') ? 'right: 84px;' : 'left: 84px;'}
        bottom: calc(20px + env(safe-area-inset-bottom, 0));
      }

      .caty-widget-messages {
        padding: 16px;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        /* Ensure messages fill available space */
        height: 100%;
      }

      /* Mobile: Show back button, hide X button */
      .caty-widget-back-mobile {
        display: flex !important;
        align-items: center;
        justify-content: center;
      }

      .caty-widget-close-desktop {
        display: none !important;
      }

      /* Make avatar slightly smaller on mobile */
      .caty-widget-avatar {
        width: 36px;
        height: 36px;
        font-size: 18px;
      }

      /* Mobile-optimized product cards */
      .caty-products-container {
        padding: 8px;
        margin: 4px 0;
      }

      .caty-products-header {
        font-size: 12px;
        padding: 4px 8px;
      }

      .caty-products-grid {
        grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
        gap: 10px;
      }

      .caty-product-card {
        padding: 10px;
        border-radius: 12px;
      }

      .caty-product-card::before {
        height: 2px;
      }

      .caty-product-image {
        height: 110px;
        border-radius: 8px;
        margin-bottom: 8px;
      }

      .caty-product-badge {
        padding: 3px 7px;
        font-size: 10px;
        top: 6px;
        left: 6px;
      }

      .caty-product-name {
        font-size: 12px;
        -webkit-line-clamp: 2;
        min-height: 32px;
      }

      .caty-product-description {
        font-size: 10px;
        -webkit-line-clamp: 2;
      }

      .caty-product-stock {
        font-size: 10px;
      }

      .caty-stock-dot {
        width: 5px;
        height: 5px;
      }

      .caty-product-rating {
        font-size: 10px;
      }

      .caty-product-price-current {
        font-size: 16px;
      }

      .caty-product-price-original {
        font-size: 11px;
      }

      .caty-product-btn {
        padding: 8px 10px;
        font-size: 11px;
        min-height: 40px;
        gap: 4px;
      }

      .caty-product-btn svg {
        width: 12px;
        height: 12px;
      }

      .caty-product-btn-full {
        padding: 10px 12px;
        font-size: 12px;
        min-height: 42px;
        gap: 6px;
      }

      .caty-product-btn-full svg {
        width: 14px;
        height: 14px;
      }

      .caty-widget-input-container {
        padding: 10px 12px !important;
        position: relative;
        overflow: visible !important;
      }

      /* Flex layout ensures send button always visible */
      .caty-widget-input-wrapper {
        display: flex !important;
        gap: 8px !important;
        align-items: flex-end !important;
      }

      .caty-widget-input {
        flex: 1 !important;
        min-width: 0 !important;
        min-height: 38px !important;
        max-height: 80px !important;
        padding: 8px 14px !important;
        font-size: 16px !important; /* Prevent iOS zoom */
      }

      .caty-widget-attach {
        flex-shrink: 0 !important;
      }

      .caty-widget-send {
        flex-shrink: 0 !important;
        width: 44px !important;
        height: 44px !important;
        min-width: 44px !important;
        min-height: 44px !important;
      }

      /* Use theme variables on mobile - don't override colors */
      .caty-widget-message.assistant .caty-widget-message-bubble {
        color: var(--assistant-text-color) !important;
        -webkit-text-fill-color: var(--assistant-text-color) !important;
        background: var(--assistant-msg-bg) !important;
      }

      .caty-widget-message.user .caty-widget-message-bubble {
        color: var(--user-text-color) !important;
        -webkit-text-fill-color: var(--user-text-color) !important;
        background: var(--user-msg-bg) !important;
      }
    }

    /* Animations */
    @keyframes caty-slide-in {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes caty-window-in {
      from {
        transform: translateY(20px) scale(0.95);
        opacity: 0;
      }
      to {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }

    @keyframes caty-message-in {
      from {
        transform: translateY(10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes caty-badge-pop {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes caty-typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.7;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }

    /* Lead Capture Form Styles */
    .caty-lead-capture-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000000;
      animation: caty-fade-in 0.3s ease-out;
    }

    .caty-lead-capture-modal {
      /* Always use white background for readability regardless of theme */
      background: #ffffff !important;
      background-color: #ffffff !important;
      border-radius: 16px;
      padding: 32px;
      max-width: 440px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: caty-modal-in 0.3s ease-out;
      border: 1px solid #e5e7eb;
    }

    .caty-lead-header h3 {
      font-size: 24px;
      font-weight: 600;
      /* Dark text on white background - always readable */
      color: #1f2937 !important;
      -webkit-text-fill-color: #1f2937 !important;
      margin-bottom: 8px;
    }

    .caty-lead-header p {
      font-size: 14px;
      /* Dark text on white background */
      color: #4b5563 !important;
      -webkit-text-fill-color: #4b5563 !important;
      margin-bottom: 24px;
    }

    .caty-lead-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .caty-lead-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .caty-lead-field label {
      font-size: 13px;
      font-weight: 500;
      /* Dark text on white modal background */
      color: #374151 !important;
      -webkit-text-fill-color: #374151 !important;
    }

    .caty-lead-input {
      padding: 12px 14px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      background: #ffffff !important;
      background-color: #ffffff !important;
      color: #1f2937 !important;
      -webkit-text-fill-color: #1f2937 !important;
      transition: border-color 0.2s;
      /* Force light mode on macOS Dark Mode */
      color-scheme: light !important;
      -webkit-appearance: none;
      appearance: none;
    }

    .caty-lead-input::placeholder {
      color: #6b7280 !important;
      -webkit-text-fill-color: #6b7280 !important;
      opacity: 1;
    }

    .caty-lead-input:focus {
      outline: none;
      border-color: var(--primary-color);
      background: #ffffff !important;
      color: #1f2937 !important;
      -webkit-text-fill-color: #1f2937 !important;
    }

    .caty-lead-input option {
      background: #ffffff !important;
      background-color: #ffffff !important;
      color: #1f2937 !important;
      -webkit-text-fill-color: #1f2937 !important;
    }

    /* Textarea styles */
    .caty-lead-textarea {
      resize: vertical;
      min-height: 80px;
      max-height: 150px;
      font-family: inherit;
      line-height: 1.5;
    }

    /* Compact modal for newsletter */
    .caty-lead-modal-compact {
      padding: 20px !important;
    }

    /* Rating label */
    .caty-rating-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }

    /* Star rating styles */
    .caty-star-rating {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 16px;
    }

    .caty-star {
      font-size: 32px;
      cursor: pointer;
      color: #d1d5db;
      transition: all 0.15s ease;
      user-select: none;
    }

    .caty-star:hover,
    .caty-star.hover {
      color: #fbbf24;
      transform: scale(1.15);
    }

    .caty-star.active {
      color: #f59e0b;
    }

    /* Force light inputs in dark mode */
    @media (prefers-color-scheme: dark) {
      .caty-lead-input {
        background: #ffffff !important;
        background-color: #ffffff !important;
        color: #1f2937 !important;
        -webkit-text-fill-color: #1f2937 !important;
        color-scheme: light !important;
      }
      .caty-lead-input::placeholder {
        color: #6b7280 !important;
        -webkit-text-fill-color: #6b7280 !important;
      }
    }

    .caty-lead-actions {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .caty-lead-skip {
      flex: 1;
      padding: 12px 20px;
      background: transparent;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #374151 !important;
      -webkit-text-fill-color: #374151 !important;
      cursor: pointer;
      transition: all 0.2s;
    }

    .caty-lead-skip:hover {
      background: #f3f4f6;
      border-color: var(--primary-color);
      color: #1f2937 !important;
      -webkit-text-fill-color: #1f2937 !important;
    }

    .caty-lead-submit {
      flex: 1;
      padding: 12px 20px;
      background: var(--primary-color);
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: white;
      cursor: pointer;
      transition: all 0.2s;
    }

    .caty-lead-submit:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    @keyframes caty-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes caty-modal-in {
      from {
        transform: scale(0.9) translateY(-20px);
        opacity: 0;
      }
      to {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }
  `;
  }

  // Inject styles
  function injectStyles() {
    if (document.getElementById('caty-widget-styles')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'caty-widget-styles';
    styleEl.textContent = getStyles();
    document.head.appendChild(styleEl);
  }

  function _rgbLuminance(rgb) {
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return 1;
    return (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
  }

  function extractHostTheme(containerEl) {
    try {
      const cs = window.getComputedStyle(document.body);
      let bg = cs.backgroundColor;
      const text = cs.color;

      // Fallback: body is transparent → check html element
      if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
        bg = window.getComputedStyle(document.documentElement).backgroundColor;
      }

      const bgValid = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
      if (bgValid) {
        containerEl.style.setProperty('--catyai-host-bg', bg);
      }
      if (text) {
        containerEl.style.setProperty('--catyai-host-text', text);
      }

      // Smart bubble contrast: solid colors that always have high contrast
      const hostIsDark = bgValid
        ? _rgbLuminance(bg) < 0.5
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      containerEl.style.setProperty('--caty-bot-bubble-bg', hostIsDark ? '#1e293b' : '#ffffff');
      containerEl.style.setProperty('--caty-bot-bubble-text', hostIsDark ? '#f8fafc' : '#0f172a');
    } catch (e) {
      // silently keep defaults
    }
  }

  // Create launcher button
  function createLauncher() {
    const launcher = document.createElement('button');
    launcher.className = 'caty-widget-launcher';
    launcher.setAttribute('aria-label', i18n.t('openChat'));

    const iconUrl = sanitizeUrl(state.config?.launcher_icon);
    const iconHTML = iconUrl
      ? `<img src="${iconUrl}" alt="Chat" class="caty-launcher-icon" />`
      : `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
         </svg>`;

    launcher.innerHTML = `
      ${iconHTML}
      <span class="caty-widget-badge"></span>
    `;

    launcher.addEventListener('click', toggle);
    return launcher;
  }

  // Create chat window
  function createChatWindow() {
    const config = state.config || {};
    const personaName = config.persona_name || 'Caty';
    const personaAvatar = config.persona_avatar;
    const personaInitial = personaName.charAt(0).toUpperCase();
    const handoffEnabled = config.capabilities?.handoff_human ?? false;

    const window = document.createElement('div');
    window.className = 'caty-widget-window';
    window.setAttribute('role', 'dialog');
    window.setAttribute('aria-label', 'Chat window');

    window.innerHTML = `
      <div class="caty-widget-header">
        <button class="caty-widget-back-mobile" aria-label="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="caty-widget-avatar">
          ${personaAvatar ? `<img src="${sanitizeUrl(personaAvatar)}" alt="${escapeHtml(personaName)}">` : escapeHtml(personaInitial)}
        </div>
        <div class="caty-widget-header-info">
          <div class="caty-widget-persona-name">${escapeHtml(personaName)}</div>
          <div class="caty-widget-status">${i18n.t('online')}</div>
        </div>
        ${handoffEnabled ? `
          <button class="caty-widget-handoff" id="caty-handoff-btn" aria-label="Talk to human" title="Talk to human">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </button>
        ` : ''}
        <button class="caty-widget-close caty-widget-close-desktop" aria-label="${i18n.t('closeChat')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="caty-widget-messages" id="caty-messages">
        <div class="caty-widget-typing">
          <div class="caty-widget-typing-dot"></div>
          <div class="caty-widget-typing-dot"></div>
          <div class="caty-widget-typing-dot"></div>
        </div>
      </div>
      <div class="caty-widget-quick-replies" id="caty-quick-replies"></div>
      <div class="caty-widget-input-container">
        ${state.config?.capabilities?.file_upload ? `
          <div class="caty-widget-file-preview" id="caty-file-preview" style="display: none;">
            <div class="caty-widget-file-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              <span class="caty-widget-file-name" id="caty-file-name"></span>
              <button class="caty-widget-file-remove" id="caty-file-remove" aria-label="Remove file">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ` : ''}
        <div class="caty-widget-input-wrapper">
          <textarea
            class="caty-widget-input"
            id="caty-input"
            placeholder="${i18n.t('typePlaceholder')}"
            rows="1"
            aria-label="${i18n.t('typePlaceholder')}"
          ></textarea>
          ${state.config?.capabilities?.file_upload ? `
            <input
              type="file"
              id="caty-file-input"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              style="display: none;"
            />
            <button class="caty-widget-attach" id="caty-attach" aria-label="Attach file">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path>
              </svg>
            </button>
          ` : ''}
          <button class="caty-widget-send" id="caty-send" aria-label="${i18n.t('sendMessage')}">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="caty-widget-footer">
        ${i18n.t('poweredBy')} <a href="https://catyai.io" target="_blank" rel="noopener">Caty.AI</a>
      </div>
    `;

    // Event listeners
    const closeBtn = window.querySelector('.caty-widget-close');
    closeBtn.addEventListener('click', close);

    // Mobile back button (same as close)
    const backBtn = window.querySelector('.caty-widget-back-mobile');
    if (backBtn) {
      backBtn.addEventListener('click', close);
    }

    const handoffBtn = window.querySelector('#caty-handoff-btn');
    if (handoffBtn) {
      handoffBtn.addEventListener('click', requestHumanHandoff);
    }

    const input = window.querySelector('#caty-input');
    const sendBtn = window.querySelector('#caty-send');

    // Auto-resize textarea
    input.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Send on Enter (Shift+Enter for new line)
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    sendBtn.addEventListener('click', handleSend);

    // Mobile keyboard handling - focus/blur events
    input.addEventListener('focus', function() {
      if (state.mobileAdapter && state.mobileAdapter.isMobile) {
        const chatWindow = document.querySelector('.caty-widget-window');
        if (chatWindow) {
          chatWindow.classList.add('keyboard-open');
          // Scroll messages to bottom when keyboard opens
          setTimeout(() => {
            const messagesContainer = document.getElementById('caty-messages');
            if (messagesContainer) {
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
          }, 300);
        }
      }
    });

    input.addEventListener('blur', function() {
      if (state.mobileAdapter && state.mobileAdapter.isMobile) {
        const chatWindow = document.querySelector('.caty-widget-window');
        if (chatWindow) {
          setTimeout(() => {
            chatWindow.classList.remove('keyboard-open');
            chatWindow.style.height = '';
            chatWindow.style.maxHeight = '';
          }, 100);
        }
      }
    });

    // File upload functionality
    const attachBtn = window.querySelector('#caty-attach');
    const fileInput = window.querySelector('#caty-file-input');
    const filePreview = window.querySelector('#caty-file-preview');
    const fileName = window.querySelector('#caty-file-name');
    const fileRemoveBtn = window.querySelector('#caty-file-remove');

    if (attachBtn && fileInput) {
      attachBtn.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          if (validateFile(file)) {
            state.selectedFile = file;
            fileName.textContent = file.name;
            filePreview.style.display = 'block';
          }
        }
      });

      if (fileRemoveBtn) {
        fileRemoveBtn.addEventListener('click', () => {
          state.selectedFile = null;
          fileInput.value = '';
          filePreview.style.display = 'none';
        });
      }
    }

    function handleSend() {
      const text = input.value.trim();

      if (state.selectedFile) {
        // Send file with optional message
        sendFileMessage(text, state.selectedFile);
        input.value = '';
        input.style.height = 'auto';
        state.selectedFile = null;
        fileInput.value = '';
        filePreview.style.display = 'none';
      } else if (text) {
        sendMessage(text);
        input.value = '';
        input.style.height = 'auto';
      }
    }

    return window;
  }

  // Create message element
  function createMessageElement(role, content) {
    const config = state.config || {};
    const personaAvatar = config.persona_avatar;
    const personaInitial = (config.persona_name || 'C').charAt(0).toUpperCase();

    const message = document.createElement('div');
    message.className = `caty-widget-message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'caty-widget-message-avatar';

    if (role === 'assistant' && personaAvatar) {
      // Security: Use createElement instead of innerHTML to prevent XSS via malicious avatar URLs
      const img = document.createElement('img');
      img.src = personaAvatar;
      img.alt = 'Assistant';
      avatar.appendChild(img);
    } else if (role === 'assistant') {
      avatar.textContent = personaInitial;
    } else {
      avatar.textContent = 'U';
    }

    const bubble = document.createElement('div');
    bubble.className = 'caty-widget-message-bubble';

    // Parse [PRODUCT:{...}] tags for product cards
    const productRegex = /\[PRODUCT:({[^}]+})\]/g;
    let hasProducts = false;
    let textContent = content;

    const productMatches = [...content.matchAll(productRegex)];
    if (productMatches.length > 0) {
      hasProducts = true;
      const container = document.createElement('div');

      let lastIndex = 0;
      productMatches.forEach(match => {
        // Add text before product
        if (match.index > lastIndex) {
          const textSpan = document.createElement('span');
          textSpan.textContent = content.substring(lastIndex, match.index);
          container.appendChild(textSpan);
        }

        // Parse and create product card
        try {
          const productData = JSON.parse(match[1]);
          const productCard = createProductCard(productData);
          container.appendChild(productCard);
        } catch (e) {
          console.error('[Caty Widget] Failed to parse product data:', e);
        }

        lastIndex = match.index + match[0].length;
      });

      // Add remaining text
      if (lastIndex < content.length) {
        const textSpan = document.createElement('span');
        textSpan.textContent = content.substring(lastIndex);
        container.appendChild(textSpan);
      }

      bubble.appendChild(container);
    } else {
      // Parse markdown links and convert to buttons/links
      const parsedContent = parseMessageContent(content);
      bubble.appendChild(parsedContent);
    }

    message.appendChild(avatar);
    message.appendChild(bubble);

    return message;
  }

  // Parse message content for links, phones, and special formatting
  function parseMessageContent(content) {
    const container = document.createElement('div');
    container.className = 'caty-message-content';

    // Process markdown → safe HTML (only allowed tags)
    // Normalize newlines: single \n → space, double \n\n → paragraph break
    content = content
      .replace(/\r\n/g, '\n')
      .replace(/\n\n+/g, '§§PARA§§')
      .replace(/\n/g, ' ')
      .replace(/§§PARA§§/g, '\n\n');

    let processed = content
      // **bold**
      .replace(/\*\*([^*\n]{1,200})\*\*/g, '<strong>$1</strong>')
      // *italic* (single asterisk, not touching **)
      .replace(/(?<!\*)\*([^*\n]{1,200})\*(?!\*)/g, '<em>$1</em>')
      // `code`
      .replace(/`([^`\n]{1,100})`/g, '<code>$1</code>')
      // Bullet points: lines starting with - or •
      .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
      // Wrap consecutive <li> in <ul>
      .replace(/(<li>.*<\/li>(\n|$))+/g, m => `<ul style="padding-left:16px;margin:6px 0">${m}</ul>`)
      // Line breaks
      .replace(/\n/g, '<br>');

    // Wrap personal recommendation sentences in Playfair italic
    processed = processed.replace(
      /((?:îți recomand|recomand|vă recomand|recommend)[^<]{5,300}(?:\.|!|\?))/gi,
      '<span class="caty-recommendation">$1</span>'
    );

    // Sanitize: allow only safe tags
    const allowed = /^(strong|em|code|span|ul|li|br)$/i;
    const sanitized = processed.replace(/<\/?([a-z][a-z0-9]*)[^>]*>/gi, (tag, name) => {
      if (allowed.test(name)) return tag;
      return '';
    });

    container.innerHTML = sanitized;
    return container;
  }

  // Create product card element (XSS-safe)
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'caty-product-card';

    // Sanitize all product data
    const safeImage = sanitizeUrl(product.image);
    const safeName = escapeHtml(product.name);
    const safeUrl = sanitizeUrl(product.url);
    // Format prices to 2 decimal places
    const formatPrice = (p) => p ? parseFloat(p).toFixed(2) : '';
    const safePrice = escapeHtml(formatPrice(product.price));
    const safeOriginalPrice = product.originalPrice ? escapeHtml(formatPrice(product.originalPrice)) : '';
    const safeRating = product.rating ? Math.min(5, Math.max(0, parseFloat(product.rating) || 0)) : 0;

    // Calculate discount percentage
    let discountPercent = 0;
    if (product.originalPrice && product.price && product.originalPrice > product.price) {
      discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);
    }

    // Check if this is a service/offer (not a physical product to buy)
    const isService = product.offerType === 'service' || product.offerType === 'package' ||
                      product.category?.toLowerCase().includes('ofert') ||
                      product.category?.toLowerCase().includes('servic');

    // Get short description for services
    const safeDescription = product.description ? escapeHtml(product.description.substring(0, 80)) + '...' : '';

    // Stock status - default to in stock
    const inStock = product.inStock !== false;
    // Badge-uri de marketing din backend (render-product-cards.js)
    const safeMarketingLabel = product.marketing_label ? escapeHtml(product.marketing_label) : '';
    const safeBadgePromo = product.badge_promo ? escapeHtml(product.badge_promo) : '';
    const safeBadgeDelivery = product.badge_delivery ? escapeHtml(product.badge_delivery) : '';

    // Different layout for services vs products
    let actionsHTML;
    if (isService) {
      // Services: single "Solicită ofertă" button
      actionsHTML = `
        <div class="caty-product-actions caty-product-actions-single">
          <button class="caty-product-btn caty-product-request caty-product-btn-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Solicită ofertă
          </button>
        </div>
      `;
    } else {
      // Products: two buttons with icons
      actionsHTML = `
        <div class="caty-product-actions">
          <button class="caty-product-btn caty-product-view">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Vezi
          </button>
          <button class="caty-product-btn caty-product-cart">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Cumpără
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="caty-product-image">
        ${safeImage ? `<img src="${safeImage}" alt="${safeName}" loading="lazy" />` : '<div class="caty-product-no-image">📦</div>'}
        ${discountPercent > 0 ? `<div class="caty-product-badge caty-badge-sale">-${discountPercent}%</div>` : ''}
        ${!inStock ? `<div class="caty-product-badge caty-badge-out">Stoc epuizat</div>` : ''}
        ${safeMarketingLabel ? `<div class="caty-product-badge caty-badge-marketing">${safeMarketingLabel}</div>` : ''}
      </div>
      <div class="caty-product-info">
        <div class="caty-product-name" title="${safeName}">${safeName}</div>
        ${isService && safeDescription ? `<div class="caty-product-description">${safeDescription}</div>` : ''}
        ${safeRating ? `
          <div class="caty-product-rating">
            <span class="caty-stars">${'★'.repeat(Math.floor(safeRating))}${'☆'.repeat(5 - Math.floor(safeRating))}</span>
            <span class="caty-rating-num">(${safeRating.toFixed(1)})</span>
          </div>
        ` : ''}
        ${safeBadgePromo ? `<div class="caty-badge-promo">${safeBadgePromo}</div>` : ''}
        <div class="caty-product-price">
          <span class="caty-product-price-current">${safePrice} Lei</span>
          ${safeOriginalPrice ? `<span class="caty-product-price-original">${safeOriginalPrice} Lei</span>` : ''}
        </div>
        ${inStock ? `<div class="caty-product-stock"><span class="caty-stock-dot"></span> În stoc${safeBadgeDelivery ? ` · <span class="caty-badge-delivery">⚡ ${safeBadgeDelivery}</span>` : ''}</div>` : ''}
        ${actionsHTML}
      </div>
    `;

    // Product data for events
    const safeProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: safeImage,
      url: safeUrl,
      description: product.description
    };

    // Use addEventListener instead of inline onclick to prevent XSS
    if (isService) {
      // Services: single button opens lead form
      const requestBtn = card.querySelector('.caty-product-request');
      if (requestBtn) {
        requestBtn.addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('caty:requestOffer', { detail: safeProduct }));
          state.requestedProduct = safeProduct;
          showLeadCapture(['name', 'phone', 'email'], true);
        });
      }
    } else {
      // Products: two buttons
      const viewBtn = card.querySelector('.caty-product-view');
      if (viewBtn) {
        viewBtn.addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('caty:productView', { detail: safeProduct }));
          const isMobile = (state.mobileAdapter && state.mobileAdapter.isMobile) || window.innerWidth <= 768;
          if (isMobile) {
            sendMessage(`Spune-mi mai multe despre: ${safeProduct.name}`);
          } else if (safeUrl) {
            window.open(safeUrl, '_blank', 'noopener,noreferrer');
          }
        });
      }

      const cartBtn = card.querySelector('.caty-product-cart');
      if (cartBtn) {
        cartBtn.addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('caty:addToCart', { detail: safeProduct }));
          const isMobile = (state.mobileAdapter && state.mobileAdapter.isMobile) || window.innerWidth <= 768;
          if (isMobile) {
            state.pendingOrderProduct = safeProduct;
            sendMessage(`Vreau să comand: ${safeProduct.name}`);
          } else if (safeUrl) {
            window.open(safeUrl, '_blank', 'noopener,noreferrer');
          }
        });
      }
    }

    return card;
  }

  // Render product cards from API response
  function renderProductCards(products) {
    if (!products || products.length === 0) return;

    const messagesContainer = document.getElementById('caty-messages');
    if (!messagesContainer) return;

    // Create products container
    const container = document.createElement('div');
    container.className = 'caty-products-container';
    container.innerHTML = `
      <div class="caty-products-header">
        <span class="caty-products-icon">🛍️</span>
        <span>${i18n.t('productsFound') || 'Produse relevante:'}</span>
      </div>
      <div class="caty-products-grid"></div>
    `;

    const grid = container.querySelector('.caty-products-grid');

    // Create card for each product
    products.forEach(product => {
      const cardData = {
        id: product.sku || product._id,
        name: product.name,
        description: product.description || '',
        price: product.sale_price || product.price,
        originalPrice: product.sale_price ? product.price : null,
        image: product.image_url,
        url: product.product_url,
        inStock: product.in_stock !== false,
        // For service/offer detection
        offerType: product.offer_type,
        category: product.category
      };
      const card = createProductCard(cardData);
      grid.appendChild(card);
    });

    // Insert before typing indicator
    const typingIndicator = messagesContainer.querySelector('.caty-widget-typing');
    messagesContainer.insertBefore(container, typingIndicator);

    // Persist so cards survive page navigation and sidebar reopen
    state.lastProducts = products;
    state.lastLiquidItems = null;
    saveMessages();

    // Scroll to show products
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Emit event
    emit('products', { products });
  }

  // Render product cards from MCP Liquid UI tool (items already normalized)
  function renderLiquidProductCards(items) {
    if (!items || items.length === 0) return;

    const messagesContainer = document.getElementById('caty-messages');
    if (!messagesContainer) return;

    const container = document.createElement('div');
    container.className = 'caty-products-container';
    container.innerHTML = `
      <div class="caty-products-header">
        <span class="caty-products-icon">🛍️</span>
        <span>${i18n.t('productsFound') || 'Produse relevante:'}</span>
      </div>
      <div class="caty-products-grid"></div>
    `;

    const grid = container.querySelector('.caty-products-grid');
    items.forEach(item => grid.appendChild(createProductCard(item)));

    const typingIndicator = messagesContainer.querySelector('.caty-widget-typing');
    messagesContainer.insertBefore(container, typingIndicator);

    // Persist so cards survive page navigation and sidebar reopen
    state.lastLiquidItems = items;
    state.lastProducts = null;
    saveMessages();

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    emit('products', { products: items });
  }

  // Add message to chat
  function addMessage(role, content) {
    const messagesContainer = document.getElementById('caty-messages');
    const messageEl = createMessageElement(role, content);

    // Insert before typing indicator
    const typingIndicator = messagesContainer.querySelector('.caty-widget-typing');
    messagesContainer.insertBefore(messageEl, typingIndicator);

    // Store in state and persist to localStorage
    state.messages.push({ role, content, timestamp: Date.now() });
    saveMessages();

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Update unread count if window is closed
    if (!state.isOpen && role === 'assistant') {
      state.unreadCount++;
      updateBadge();
    }

    // Check if should show lead capture (after user message)
    if (role === 'user') {
      checkLeadCapture();
    }

    // Emit event
    emit('message', { role, content });
  }

  // Show typing indicator
  function showTyping() {
    const typingIndicator = document.querySelector('.caty-widget-typing');
    if (typingIndicator) {
      typingIndicator.classList.add('show');
      const messagesContainer = document.getElementById('caty-messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  // Hide typing indicator
  function hideTyping() {
    const typingIndicator = document.querySelector('.caty-widget-typing');
    if (typingIndicator) {
      typingIndicator.classList.remove('show');
    }
  }

  // ============================================
  // File Upload System
  // ============================================

  // Validate file size and type
  function validateFile(file) {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ];

    if (file.size > MAX_SIZE) {
      addMessage('system', 'File is too large. Maximum size is 10MB.');
      return false;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      addMessage('system', 'File type not supported. Please upload PDF, DOC, DOCX, TXT, JPG, or PNG files.');
      return false;
    }

    return true;
  }

  // Send file message
  async function sendFileMessage(message, file) {
    try {
      // Show uploading message
      const userMessage = message ? `${message} [Uploading ${file.name}...]` : `[Uploading ${file.name}...]`;
      addMessage('user', userMessage);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', API_KEY);
      formData.append('session_id', state.sessionId);
      if (message) {
        formData.append('message', message);
      }

      showTyping();

      // Upload file
      const response = await fetch(`${API_BASE}/api/widget/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      hideTyping();

      if (data.success) {
        // File uploaded successfully, show AI response
        if (data.response) {
          addMessage('assistant', data.response);
        }
      } else {
        addMessage('system', data.message || 'Failed to upload file. Please try again.');
      }
    } catch (error) {
      hideTyping();
      console.error('[Caty] File upload error:', error);
      addMessage('system', 'Failed to upload file. Please check your connection and try again.');
    }
  }

  // ============================================
  // Lead Capture System
  // ============================================

  // Create lead capture form based on enabled fields (with i18n)
  function createLeadCaptureForm(customFields = null) {
    const config = state.config || {};
    const capabilities = config.capabilities || {};
    // Use custom fields if provided (from handoff), otherwise use config
    const enabledFields = customFields || capabilities.lead_capture_fields || ['name', 'email'];

    // Translated field configs
    const fieldConfigs = {
      name: { label: i18n.t('leadName'), type: 'text', placeholder: 'John Doe', required: true },
      email: { label: i18n.t('leadEmail'), type: 'email', placeholder: 'john@example.com', required: false },
      phone: { label: i18n.t('leadPhone'), type: 'tel', placeholder: '+1 234 567 8900', required: false },
      company: { label: i18n.t('leadCompany'), type: 'text', placeholder: 'Acme Inc.', required: false }
    };

    const fieldsHTML = enabledFields.map(fieldName => {
      const field = fieldConfigs[fieldName];
      if (!field) return '';

      return `
        <div class="caty-lead-field">
          <label for="caty-lead-${fieldName}">${field.label}${field.required ? ' *' : ''}</label>
          <input
            type="${field.type}"
            id="caty-lead-${fieldName}"
            name="${fieldName}"
            placeholder="${field.placeholder}"
            ${field.required ? 'required' : ''}
            class="caty-lead-input"
          />
        </div>
      `;
    }).join('');

    return `
      <div class="caty-lead-capture-overlay" id="caty-lead-overlay">
        <div class="caty-lead-capture-modal">
          <div class="caty-lead-header">
            <h3>${i18n.t('leadTitle')}</h3>
            <p>${i18n.t('leadSubtitle')}</p>
          </div>
          <form id="caty-lead-form" class="caty-lead-form">
            ${fieldsHTML}
            <div class="caty-lead-actions">
              <button type="button" class="caty-lead-skip" id="caty-lead-skip">${i18n.t('leadSkip')}</button>
              <button type="submit" class="caty-lead-submit">${i18n.t('leadSubmit')}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // Show lead capture form (with optional custom fields from handoff)
  function showLeadCapture(customFields = null, forceShow = false) {
    console.log('[Caty Widget] showLeadCapture called, customFields:', customFields, 'forceShow:', forceShow);

    // Check if already captured (but allow force show)
    if (state.leadCaptured && !forceShow) {
      console.log('[Caty Widget] Lead already captured, skipping form');
      return;
    }

    // Only check capabilities for automatic triggers (not explicit calls)
    if (!customFields && !forceShow) {
      const capabilities = state.config?.capabilities || {};
      if (!capabilities.capture_leads) {
        console.log('[Caty Widget] Lead capture not enabled, skipping form');
        return;
      }
    }

    // Remove existing overlay to recreate with correct fields/translations
    let overlay = document.getElementById('caty-lead-overlay');
    if (overlay) {
      overlay.remove();
    }

    // Insert form with custom fields if provided
    const container = document.getElementById('caty-widget-container');
    container.insertAdjacentHTML('beforeend', createLeadCaptureForm(customFields));
    overlay = document.getElementById('caty-lead-overlay');

    // Add event listeners
    const form = document.getElementById('caty-lead-form');
    const skipBtn = document.getElementById('caty-lead-skip');

    form.addEventListener('submit', handleLeadSubmit);
    skipBtn.addEventListener('click', hideLeadCapture);

    overlay.style.display = 'flex';
  }

  // Hide lead capture form
  function hideLeadCapture() {
    const overlay = document.getElementById('caty-lead-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  // Handle lead form submission
  async function handleLeadSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const leadData = {};

    // Collect form data
    for (let [key, value] of formData.entries()) {
      if (value.trim()) {
        leadData[key] = value.trim();
      }
    }

    // Validate required fields
    const config = state.config || {};
    const enabledFields = config.capabilities?.lead_capture_fields || ['name', 'email'];

    if (enabledFields.includes('name') && !leadData.name) {
      alert('Please enter your name');
      return;
    }
    if (enabledFields.includes('email') && !leadData.email) {
      alert('Please enter your email');
      return;
    }

    try {
      // Include requested product info if this is an offer request
      const requestPayload = {
        session_id: state.sessionId,
        ...leadData
      };
      if (state.requestedProduct) {
        requestPayload.requested_product = state.requestedProduct;
        requestPayload.lead_type = 'offer_request';
      }

      // Submit to backend
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CONFIG.apiKey
        },
        body: JSON.stringify(requestPayload)
      });

      if (response.ok) {
        state.leadCaptured = true;
        state.requestedProduct = null;  // Clear after submission
        hideLeadCapture();

        // Use conversation language (from last AI response) or fall back to detected language
        const conversationLang = state.conversationLanguage || i18n.currentLang;
        const thankYouMessages = {
          ro: 'Mulțumesc! Am salvat datele tale. Echipa noastră te va contacta în curând!',
          en: 'Thank you! I\'ve saved your details. Our team will reach out shortly!',
          es: '¡Gracias! He guardado tus datos. ¡Nuestro equipo te contactará pronto!',
          fr: 'Merci! J\'ai enregistré vos coordonnées. Notre équipe vous contactera bientôt!',
          de: 'Danke! Ich habe Ihre Daten gespeichert. Unser Team wird sich bald bei Ihnen melden!',
          pt: 'Obrigado! Salvei seus dados. Nossa equipe entrará em contato em breve!'
        };
        const thankYouMsg = thankYouMessages[conversationLang] || thankYouMessages.en;
        addMessage('assistant', thankYouMsg);
      } else {
        throw new Error('Failed to submit lead');
      }
    } catch (error) {
      console.error('[Caty Widget] Failed to submit lead:', error);
      alert('Failed to submit. Please try again.');
    }
  }

  // ============================================
  // Schedule Call Form
  // ============================================

  function showScheduleForm() {
    console.log('[Caty Widget] showScheduleForm called');
    // Remove existing overlay
    let overlay = document.getElementById('caty-schedule-overlay');
    if (overlay) overlay.remove();

    const lang = state.conversationLanguage || i18n.currentLang;
    const texts = {
      ro: {
        title: '📅 Programează o discuție',
        subtitle: 'Alege data și ora convenabilă',
        name: 'Numele tău',
        phone: 'Telefon (WhatsApp)',
        date: 'Data',
        time: 'Ora',
        submit: 'Programează',
        cancel: 'Anulează',
        loading: 'Se încarcă...',
        noSlots: 'Nu sunt sloturi disponibile',
        calendarSynced: '✓ Sincronizat cu Google Calendar'
      },
      en: {
        title: '📅 Schedule a Call',
        subtitle: 'Choose a convenient date and time',
        name: 'Your Name',
        phone: 'Phone (WhatsApp)',
        date: 'Date',
        time: 'Time',
        submit: 'Schedule',
        cancel: 'Cancel',
        loading: 'Loading...',
        noSlots: 'No slots available',
        calendarSynced: '✓ Synced with Google Calendar'
      }
    };
    const t = texts[lang] || texts.en;

    // Generate next 7 days
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayNames = lang === 'ro'
        ? ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dates.push({
        value: date.toISOString().split('T')[0],
        label: `${dayNames[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`
      });
    }

    const container = document.getElementById('caty-widget-container');
    container.insertAdjacentHTML('beforeend', `
      <div id="caty-schedule-overlay" class="caty-lead-capture-overlay" style="display: flex;">
        <div class="caty-lead-capture-modal">
          <div class="caty-lead-header">
            <h3>${t.title}</h3>
            <p>${t.subtitle}</p>
            <div id="caty-calendar-status" style="font-size: 11px; color: #10b981; margin-top: 4px; display: none;">${t.calendarSynced}</div>
          </div>
          <form id="caty-schedule-form" class="caty-lead-form">
            <div class="caty-lead-field">
              <input type="text" name="name" class="caty-lead-input" placeholder="${t.name}" required />
            </div>
            <div class="caty-lead-field">
              <input type="tel" name="phone" class="caty-lead-input" placeholder="${t.phone}" required />
            </div>
            <div class="caty-lead-field">
              <select name="date" id="caty-schedule-date" class="caty-lead-input" required>
                <option value="">${t.date}</option>
                ${dates.map(d => `<option value="${d.value}">${d.label}</option>`).join('')}
              </select>
            </div>
            <div class="caty-lead-field">
              <select name="time" id="caty-schedule-time" class="caty-lead-input" required disabled>
                <option value="">${t.time}</option>
              </select>
            </div>
            <div class="caty-lead-actions">
              <button type="button" id="caty-schedule-cancel" class="caty-lead-skip">${t.cancel}</button>
              <button type="submit" class="caty-lead-submit">${t.submit}</button>
            </div>
          </form>
        </div>
      </div>
    `);

    // Load available slots when date changes
    const dateSelect = document.getElementById('caty-schedule-date');
    const timeSelect = document.getElementById('caty-schedule-time');

    dateSelect.addEventListener('change', async () => {
      const selectedDate = dateSelect.value;
      if (!selectedDate) {
        timeSelect.innerHTML = `<option value="">${t.time}</option>`;
        timeSelect.disabled = true;
        return;
      }

      // Show loading
      timeSelect.innerHTML = `<option value="">${t.loading}</option>`;
      timeSelect.disabled = true;

      try {
        const response = await fetch(`${CONFIG.baseUrl}/api/widget/schedule/slots?date=${selectedDate}`, {
          headers: { 'X-API-Key': CONFIG.apiKey }
        });

        if (response.ok) {
          const data = await response.json();

          // Show calendar sync status
          if (data.calendar_connected) {
            document.getElementById('caty-calendar-status').style.display = 'block';
          }

          if (data.slots && data.slots.length > 0) {
            timeSelect.innerHTML = `<option value="">${t.time}</option>` +
              data.slots.map(slot => `<option value="${slot.label}">${slot.label}</option>`).join('');
            timeSelect.disabled = false;
          } else {
            timeSelect.innerHTML = `<option value="">${t.noSlots}</option>`;
            timeSelect.disabled = true;
          }
        } else {
          throw new Error('Failed to load slots');
        }
      } catch (error) {
        console.error('[Caty Widget] Failed to load slots:', error);
        // Fallback to default slots
        const defaultTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
        timeSelect.innerHTML = `<option value="">${t.time}</option>` +
          defaultTimes.map(time => `<option value="${time}">${time}</option>`).join('');
        timeSelect.disabled = false;
      }
    });

    // Event listeners
    document.getElementById('caty-schedule-form').addEventListener('submit', handleScheduleSubmit);
    document.getElementById('caty-schedule-cancel').addEventListener('click', () => {
      document.getElementById('caty-schedule-overlay')?.remove();
    });
  }

  async function handleScheduleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const scheduleData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time')
    };

    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/widget/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': CONFIG.apiKey
        },
        body: JSON.stringify({
          session_id: state.sessionId,
          ...scheduleData
        })
      });

      if (response.ok) {
        document.getElementById('caty-schedule-overlay')?.remove();
        const lang = state.conversationLanguage || i18n.currentLang;
        const confirmMsg = lang === 'ro'
          ? `✅ Programare confirmată pentru ${scheduleData.date} la ora ${scheduleData.time}. Te vom contacta pe WhatsApp pentru confirmare!`
          : `✅ Call scheduled for ${scheduleData.date} at ${scheduleData.time}. We'll contact you on WhatsApp to confirm!`;
        addMessage('assistant', confirmMsg);
        emit('scheduled', scheduleData);
      } else {
        throw new Error('Failed to schedule');
      }
    } catch (error) {
      console.error('[Caty Widget] Schedule error:', error);
      alert('Failed to schedule. Please try again.');
    }
  }

  // ============================================
  // Contact Form (with message field)
  // ============================================

  function showContactForm() {
    console.log('[Caty Widget] showContactForm called');
    let overlay = document.getElementById('caty-contact-overlay');
    if (overlay) overlay.remove();

    const lang = state.conversationLanguage || i18n.currentLang;
    const texts = {
      ro: {
        title: '✉️ Trimite-ne un mesaj',
        subtitle: 'Completează formularul și te vom contacta',
        name: 'Numele tău *',
        email: 'Email *',
        phone: 'Telefon',
        message: 'Mesajul tău *',
        messagePlaceholder: 'Descrie pe scurt cum te putem ajuta...',
        submit: 'Trimite',
        cancel: 'Anulează',
        success: '✅ Mesajul tău a fost trimis! Te vom contacta în curând.'
      },
      en: {
        title: '✉️ Send us a Message',
        subtitle: 'Fill out the form and we will get back to you',
        name: 'Your Name *',
        email: 'Email *',
        phone: 'Phone',
        message: 'Your Message *',
        messagePlaceholder: 'Briefly describe how we can help...',
        submit: 'Send',
        cancel: 'Cancel',
        success: '✅ Your message has been sent! We will contact you soon.'
      }
    };
    const t = texts[lang] || texts.en;

    const container = document.getElementById('caty-widget-container');
    container.insertAdjacentHTML('beforeend', `
      <div id="caty-contact-overlay" class="caty-lead-capture-overlay" style="display: flex;">
        <div class="caty-lead-capture-modal">
          <div class="caty-lead-header">
            <h3>${t.title}</h3>
            <p>${t.subtitle}</p>
          </div>
          <form id="caty-contact-form" class="caty-lead-form">
            <div class="caty-lead-field">
              <input type="text" name="name" class="caty-lead-input" placeholder="${t.name}" required />
            </div>
            <div class="caty-lead-field">
              <input type="email" name="email" class="caty-lead-input" placeholder="${t.email}" required />
            </div>
            <div class="caty-lead-field">
              <input type="tel" name="phone" class="caty-lead-input" placeholder="${t.phone}" />
            </div>
            <div class="caty-lead-field">
              <textarea name="message" class="caty-lead-input caty-lead-textarea" placeholder="${t.messagePlaceholder}" rows="3" required></textarea>
            </div>
            <div class="caty-lead-actions">
              <button type="button" id="caty-contact-cancel" class="caty-lead-skip">${t.cancel}</button>
              <button type="submit" class="caty-lead-submit">${t.submit}</button>
            </div>
          </form>
        </div>
      </div>
    `);

    document.getElementById('caty-contact-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = {
        form_type: 'contact',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
      };

      try {
        await fetch(`${CONFIG.baseUrl}/api/widget/form`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': CONFIG.apiKey },
          body: JSON.stringify({ session_id: state.sessionId, ...data })
        });
        document.getElementById('caty-contact-overlay')?.remove();
        addMessage('assistant', t.success);
        emit('form_submitted', data);
      } catch (error) {
        console.error('[Caty Widget] Contact form error:', error);
      }
    });

    document.getElementById('caty-contact-cancel').addEventListener('click', () => {
      document.getElementById('caty-contact-overlay')?.remove();
    });
  }

  // ============================================
  // Quote Request Form
  // ============================================

  function showQuoteForm() {
    console.log('[Caty Widget] showQuoteForm called');
    let overlay = document.getElementById('caty-quote-overlay');
    if (overlay) overlay.remove();

    const lang = state.conversationLanguage || i18n.currentLang;
    const texts = {
      ro: {
        title: '💰 Solicită o ofertă',
        subtitle: 'Descrie proiectul tău și îți vom trimite o ofertă personalizată',
        name: 'Numele tău *',
        email: 'Email *',
        phone: 'Telefon *',
        description: 'Descriere proiect *',
        descPlaceholder: 'Descrie ce ai nevoie: tip proiect, dimensiuni, buget estimat...',
        submit: 'Solicită ofertă',
        cancel: 'Anulează',
        success: '✅ Cererea ta a fost trimisă! Vei primi oferta pe email în maxim 24h.'
      },
      en: {
        title: '💰 Request a Quote',
        subtitle: 'Describe your project and we will send you a custom quote',
        name: 'Your Name *',
        email: 'Email *',
        phone: 'Phone *',
        description: 'Project Description *',
        descPlaceholder: 'Describe what you need: project type, dimensions, estimated budget...',
        submit: 'Request Quote',
        cancel: 'Cancel',
        success: '✅ Your request has been sent! You will receive the quote by email within 24h.'
      }
    };
    const t = texts[lang] || texts.en;

    const container = document.getElementById('caty-widget-container');
    container.insertAdjacentHTML('beforeend', `
      <div id="caty-quote-overlay" class="caty-lead-capture-overlay" style="display: flex;">
        <div class="caty-lead-capture-modal">
          <div class="caty-lead-header">
            <h3>${t.title}</h3>
            <p>${t.subtitle}</p>
          </div>
          <form id="caty-quote-form" class="caty-lead-form">
            <div class="caty-lead-field">
              <input type="text" name="name" class="caty-lead-input" placeholder="${t.name}" required />
            </div>
            <div class="caty-lead-field">
              <input type="email" name="email" class="caty-lead-input" placeholder="${t.email}" required />
            </div>
            <div class="caty-lead-field">
              <input type="tel" name="phone" class="caty-lead-input" placeholder="${t.phone}" required />
            </div>
            <div class="caty-lead-field">
              <textarea name="description" class="caty-lead-input caty-lead-textarea" placeholder="${t.descPlaceholder}" rows="4" required></textarea>
            </div>
            <div class="caty-lead-actions">
              <button type="button" id="caty-quote-cancel" class="caty-lead-skip">${t.cancel}</button>
              <button type="submit" class="caty-lead-submit">${t.submit}</button>
            </div>
          </form>
        </div>
      </div>
    `);

    document.getElementById('caty-quote-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = {
        form_type: 'quote_request',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        description: formData.get('description')
      };

      try {
        await fetch(`${CONFIG.baseUrl}/api/widget/form`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': CONFIG.apiKey },
          body: JSON.stringify({ session_id: state.sessionId, ...data })
        });
        document.getElementById('caty-quote-overlay')?.remove();
        addMessage('assistant', t.success);
        emit('form_submitted', data);
      } catch (error) {
        console.error('[Caty Widget] Quote form error:', error);
      }
    });

    document.getElementById('caty-quote-cancel').addEventListener('click', () => {
      document.getElementById('caty-quote-overlay')?.remove();
    });
  }

  // ============================================
  // Newsletter Form
  // ============================================

  function showNewsletterForm() {
    console.log('[Caty Widget] showNewsletterForm called');
    let overlay = document.getElementById('caty-newsletter-overlay');
    if (overlay) overlay.remove();

    const lang = state.conversationLanguage || i18n.currentLang;
    const texts = {
      ro: {
        title: '📰 Rămâi la curent',
        subtitle: 'Abonează-te pentru noutăți și oferte speciale',
        email: 'Adresa ta de email *',
        name: 'Numele tău (opțional)',
        submit: 'Abonează-mă',
        cancel: 'Nu acum',
        success: '✅ Te-ai abonat cu succes! Verifică email-ul pentru confirmare.'
      },
      en: {
        title: '📰 Stay Updated',
        subtitle: 'Subscribe for news and special offers',
        email: 'Your email address *',
        name: 'Your name (optional)',
        submit: 'Subscribe',
        cancel: 'Not now',
        success: '✅ Successfully subscribed! Check your email for confirmation.'
      }
    };
    const t = texts[lang] || texts.en;

    const container = document.getElementById('caty-widget-container');
    container.insertAdjacentHTML('beforeend', `
      <div id="caty-newsletter-overlay" class="caty-lead-capture-overlay" style="display: flex;">
        <div class="caty-lead-capture-modal caty-lead-modal-compact">
          <div class="caty-lead-header">
            <h3>${t.title}</h3>
            <p>${t.subtitle}</p>
          </div>
          <form id="caty-newsletter-form" class="caty-lead-form">
            <div class="caty-lead-field">
              <input type="email" name="email" class="caty-lead-input" placeholder="${t.email}" required />
            </div>
            <div class="caty-lead-field">
              <input type="text" name="name" class="caty-lead-input" placeholder="${t.name}" />
            </div>
            <div class="caty-lead-actions">
              <button type="button" id="caty-newsletter-cancel" class="caty-lead-skip">${t.cancel}</button>
              <button type="submit" class="caty-lead-submit">${t.submit}</button>
            </div>
          </form>
        </div>
      </div>
    `);

    document.getElementById('caty-newsletter-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = {
        form_type: 'newsletter',
        email: formData.get('email'),
        name: formData.get('name') || ''
      };

      try {
        await fetch(`${CONFIG.baseUrl}/api/widget/form`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': CONFIG.apiKey },
          body: JSON.stringify({ session_id: state.sessionId, ...data })
        });
        document.getElementById('caty-newsletter-overlay')?.remove();
        addMessage('assistant', t.success);
        emit('form_submitted', data);
      } catch (error) {
        console.error('[Caty Widget] Newsletter form error:', error);
      }
    });

    document.getElementById('caty-newsletter-cancel').addEventListener('click', () => {
      document.getElementById('caty-newsletter-overlay')?.remove();
    });
  }

  // ============================================
  // Feedback Form (with star rating)
  // ============================================

  function showFeedbackForm() {
    console.log('[Caty Widget] showFeedbackForm called');
    let overlay = document.getElementById('caty-feedback-overlay');
    if (overlay) overlay.remove();

    const lang = state.conversationLanguage || i18n.currentLang;
    const texts = {
      ro: {
        title: '⭐ Părerea ta contează',
        subtitle: 'Cum a fost experiența ta cu noi?',
        rating: 'Evaluare',
        comment: 'Comentariu (opțional)',
        commentPlaceholder: 'Spune-ne ce ți-a plăcut sau ce putem îmbunătăți...',
        submit: 'Trimite feedback',
        cancel: 'Anulează',
        success: '✅ Mulțumim pentru feedback! Părerea ta ne ajută să ne îmbunătățim.'
      },
      en: {
        title: '⭐ Your Opinion Matters',
        subtitle: 'How was your experience with us?',
        rating: 'Rating',
        comment: 'Comment (optional)',
        commentPlaceholder: 'Tell us what you liked or what we can improve...',
        submit: 'Submit Feedback',
        cancel: 'Cancel',
        success: '✅ Thank you for your feedback! Your opinion helps us improve.'
      }
    };
    const t = texts[lang] || texts.en;

    const container = document.getElementById('caty-widget-container');
    container.insertAdjacentHTML('beforeend', `
      <div id="caty-feedback-overlay" class="caty-lead-capture-overlay" style="display: flex;">
        <div class="caty-lead-capture-modal">
          <div class="caty-lead-header">
            <h3>${t.title}</h3>
            <p>${t.subtitle}</p>
          </div>
          <form id="caty-feedback-form" class="caty-lead-form">
            <div class="caty-lead-field">
              <label class="caty-rating-label">${t.rating}</label>
              <div class="caty-star-rating" id="caty-star-rating">
                <span class="caty-star" data-value="1">★</span>
                <span class="caty-star" data-value="2">★</span>
                <span class="caty-star" data-value="3">★</span>
                <span class="caty-star" data-value="4">★</span>
                <span class="caty-star" data-value="5">★</span>
              </div>
              <input type="hidden" name="rating" id="caty-rating-value" value="0" required />
            </div>
            <div class="caty-lead-field">
              <textarea name="comment" class="caty-lead-input caty-lead-textarea" placeholder="${t.commentPlaceholder}" rows="3"></textarea>
            </div>
            <div class="caty-lead-actions">
              <button type="button" id="caty-feedback-cancel" class="caty-lead-skip">${t.cancel}</button>
              <button type="submit" class="caty-lead-submit">${t.submit}</button>
            </div>
          </form>
        </div>
      </div>
    `);

    // Star rating interaction
    const stars = document.querySelectorAll('#caty-star-rating .caty-star');
    const ratingInput = document.getElementById('caty-rating-value');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        ratingInput.value = value;
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.value) <= value);
        });
      });

      star.addEventListener('mouseenter', () => {
        const value = parseInt(star.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('hover', parseInt(s.dataset.value) <= value);
        });
      });

      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
    });

    document.getElementById('caty-feedback-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const rating = parseInt(formData.get('rating'));

      if (rating < 1) {
        alert(lang === 'ro' ? 'Te rugăm să selectezi o evaluare' : 'Please select a rating');
        return;
      }

      const data = {
        form_type: 'feedback',
        rating: rating,
        comment: formData.get('comment') || ''
      };

      try {
        await fetch(`${CONFIG.baseUrl}/api/widget/form`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-API-Key': CONFIG.apiKey },
          body: JSON.stringify({ session_id: state.sessionId, ...data })
        });
        document.getElementById('caty-feedback-overlay')?.remove();
        addMessage('assistant', t.success);
        emit('form_submitted', data);
      } catch (error) {
        console.error('[Caty Widget] Feedback form error:', error);
      }
    });

    document.getElementById('caty-feedback-cancel').addEventListener('click', () => {
      document.getElementById('caty-feedback-overlay')?.remove();
    });
  }

  // ============================================
  // AutoConfig Forms System
  // Shows industry-specific forms from auto-configure
  // ============================================

  /**
   * Show a form from AutoConfig based on form_type
   * Falls back to built-in forms if not found in AutoConfig
   */
  function showAutoForm(formType) {
    console.log('[Caty Widget] showAutoForm called:', formType);

    // Check if we already showed this form type
    if (state.shownForms?.includes(formType)) {
      console.log('[Caty Widget] Form already shown, skipping:', formType);
      return;
    }

    // Track shown forms
    state.shownForms = state.shownForms || [];
    state.shownForms.push(formType);

    // Use built-in forms (they support i18n and have better UX)
    switch (formType) {
      case 'booking':
      case 'schedule':
        showScheduleForm();
        break;
      case 'quote_request':
      case 'quote':
        showQuoteForm();
        break;
      case 'contact':
        showContactForm();
        break;
      case 'newsletter':
        showNewsletterForm();
        break;
      case 'feedback':
      case 'review':
        showFeedbackForm();
        break;
      case 'lead_capture':
      default:
        showLeadCapture(null, true);
        break;
    }
  }

  /**
   * Check if should show an AutoConfig form based on display_rules
   * Called after each message or on specific intents
   */
  function checkAutoFormTriggers(detectedIntent = null) {
    if (state.leadCaptured) return; // Don't show more forms after lead capture

    // FALLBACK: If no AutoConfig forms, use default intent-to-form mapping
    if (!state.autoForms || state.autoForms.length === 0) {
      if (!detectedIntent) return;

      // Default intent mappings (no AutoConfig needed)
      const intentFormMap = {
        // Booking/Schedule intents
        'schedule_request': 'booking',
        'booking_request': 'booking',
        'appointment_request': 'booking',
        'schedule': 'booking',
        'booking': 'booking',
        'appointment': 'booking',
        'programare': 'booking',
        // Quote/Price intents
        'price_inquiry': 'quote_request',
        'quote_request': 'quote_request',
        'pricing_question': 'quote_request',
        // Contact/Support intents
        'human_request': 'contact',
        'support_request': 'contact',
        'contact_request': 'contact',
        // Lead capture intents
        'affirmative_interest': 'lead_capture',
        'ready_to_buy': 'lead_capture',
        'purchase_intent': 'lead_capture',
        'product_inquiry': 'lead_capture'
      };

      const formType = intentFormMap[detectedIntent];
      if (formType && !state.shownForms?.includes(formType)) {
        console.log(`[Caty Widget] FALLBACK: Showing ${formType} form on intent: ${detectedIntent}`);
        setTimeout(() => showAutoForm(formType), 500);
      }
      return;
    }

    const messagesCount = document.querySelectorAll('.caty-widget-message.user').length;

    // Log available forms for debugging
    console.log('[Caty Widget] AutoConfig forms:', state.autoForms.map(f => ({
      type: f.form_type,
      active: f.active,
      intents: f.display_rules?.show_on_intent
    })));

    for (const form of state.autoForms) {
      if (!form.active) continue;

      const rules = form.display_rules || {};
      const formType = form.form_type;

      // Skip if already shown
      if (state.shownForms?.includes(formType)) continue;

      // Check intent trigger
      if (detectedIntent && rules.show_on_intent?.includes(detectedIntent)) {
        console.log(`[Caty Widget] Showing ${formType} form on intent: ${detectedIntent}`);
        setTimeout(() => showAutoForm(formType), 500);
        return; // Show only one form at a time
      }

      // Check message count trigger
      if (rules.show_after_messages && messagesCount >= rules.show_after_messages) {
        // Only trigger once at exactly the right message count
        if (messagesCount === rules.show_after_messages) {
          console.log(`[Caty Widget] Showing ${formType} form after ${messagesCount} messages`);
          setTimeout(() => showAutoForm(formType), 1500);
          return;
        }
      }
    }

    // FALLBACK: If AutoConfig has no matching form for this intent, use default mapping
    if (detectedIntent) {
      const intentFormMap = {
        'schedule_request': 'booking',
        'booking_request': 'booking',
        'appointment_request': 'booking',
        'price_inquiry': 'quote_request',
        'human_request': 'contact',
        'support_request': 'contact'
      };

      const fallbackFormType = intentFormMap[detectedIntent];
      if (fallbackFormType && !state.shownForms?.includes(fallbackFormType)) {
        console.log(`[Caty Widget] AutoConfig FALLBACK: Showing ${fallbackFormType} form for intent: ${detectedIntent}`);
        setTimeout(() => showAutoForm(fallbackFormType), 500);
      }
    }
  }

  /**
   * Get the primary form type for this widget's industry
   * Used for the default form action
   */
  function getPrimaryFormType() {
    if (state.autoForms && state.autoForms.length > 0) {
      // Return the first active form with highest priority
      const sorted = [...state.autoForms]
        .filter(f => f.active)
        .sort((a, b) => (b.priority || 0) - (a.priority || 0));
      return sorted[0]?.form_type || 'lead_capture';
    }
    return 'lead_capture';
  }

  /**
   * Get industry-specific form info for display
   */
  function getIndustryFormInfo() {
    const industry = state.config?.auto_brain?.industry || 'general';
    const formTypes = state.autoForms?.map(f => f.form_type) || [];
    return {
      industry,
      forms: formTypes,
      primary: getPrimaryFormType()
    };
  }

  // Check if should show lead capture (after first user message)
  // DISABLED: Now handled by checkAutoFormTriggers with intent-based logic
  function checkLeadCapture() {
    // Skip if AutoConfig has forms (they handle display via intents)
    if (state.autoForms && state.autoForms.length > 0) {
      console.log('[Caty Widget] checkLeadCapture skipped - AutoConfig forms available');
      return;
    }

    const capabilities = state.config?.capabilities || {};
    if (!capabilities.capture_leads || state.leadCaptured) return;

    // Show after first user message ONLY if no AutoConfig
    const messagesCount = document.querySelectorAll('.caty-widget-message.user').length;
    if (messagesCount === 1) {
      // Show after a short delay
      setTimeout(() => showLeadCapture(), 2000);
    }
  }

  // Human Handoff
  // Show handoff options with call and contact buttons
  function showHandoffOptions() {
    const config = state.config || {};
    const phone = config.business?.phone || config.phone || null;
    const contactUrl = config.business?.contact_url || config.contact_url || '/contact';

    const lang = state.conversationLanguage || i18n.currentLang;
    const texts = {
      ro: {
        message: 'Cum ai prefera să continui conversația?',
        call: '📞 Apelează Call Center',
        contact: '📝 Contactează-mă',
        form: '📋 Formular Contact'
      },
      en: {
        message: 'How would you like to continue the conversation?',
        call: '📞 Call Center',
        contact: '📝 Contact Me',
        form: '📋 Contact Form'
      }
    };
    const t = texts[lang] || texts.en;

    // Create message with buttons
    const messagesContainer = document.getElementById('caty-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'caty-widget-message assistant';

    const avatar = document.createElement('div');
    avatar.className = 'caty-widget-message-avatar';
    const personaInitial = (config.persona_name || 'C').charAt(0).toUpperCase();
    if (config.persona_avatar) {
      const img = document.createElement('img');
      img.src = config.persona_avatar;
      img.alt = 'Assistant';
      avatar.appendChild(img);
    } else {
      avatar.textContent = personaInitial;
    }

    const bubble = document.createElement('div');
    bubble.className = 'caty-widget-message-bubble';

    const text = document.createElement('div');
    text.textContent = t.message;
    bubble.appendChild(text);

    const buttons = document.createElement('div');
    buttons.className = 'caty-handoff-buttons';

    // Call button (only if phone is configured)
    if (phone) {
      const callBtn = document.createElement('a');
      callBtn.href = `tel:${phone.replace(/\s/g, '')}`;
      callBtn.className = 'caty-handoff-btn call';
      callBtn.innerHTML = t.call;
      buttons.appendChild(callBtn);
    }

    // Contact me button (triggers lead capture)
    const contactBtn = document.createElement('button');
    contactBtn.className = 'caty-handoff-btn contact';
    contactBtn.innerHTML = t.contact;
    contactBtn.addEventListener('click', () => {
      showLeadCapture(['name', 'phone', 'email']);
    });
    buttons.appendChild(contactBtn);

    // Contact form button (links to contact page)
    const formBtn = document.createElement('a');
    formBtn.href = contactUrl;
    formBtn.target = '_blank';
    formBtn.className = 'caty-handoff-btn form';
    formBtn.innerHTML = t.form;
    buttons.appendChild(formBtn);

    bubble.appendChild(buttons);
    messageEl.appendChild(avatar);
    messageEl.appendChild(bubble);

    // Insert before typing indicator
    const typingIndicator = messagesContainer.querySelector('.caty-widget-typing');
    messagesContainer.insertBefore(messageEl, typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store in state
    state.messages.push({ role: 'assistant', content: t.message, timestamp: Date.now(), hasHandoffButtons: true });
    saveMessages();
  }

  async function requestHumanHandoff() {
    if (state.handedOff) {
      addMessage('system', 'You are already connected to our support team.');
      return;
    }

    // Show handoff options with call/contact buttons
    showHandoffOptions();

    try {
      const response = await fetch(`${API_BASE}/api/widget/handoff/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: API_KEY,
          session_id: state.sessionId,
          reason: 'user_request'
        })
      });

      const data = await response.json();

      if (data.success) {
        state.handedOff = true;
        // Don't show additional message, buttons are already shown
        state.waitingForHuman = true;
      }
    } catch (error) {
      console.error('[Caty] Handoff error:', error);
      // Buttons already shown, user can still use them
    }
  }

  // Render quick reply buttons with neuromarketing colors
  function renderQuickReplies(actions) {
    const container = document.getElementById('caty-quick-replies');
    container.innerHTML = '';

    if (!actions || actions.length === 0) return;

    actions.forEach(action => {
      const button = document.createElement('button');
      const actionType = action.action || 'quick_reply';

      // Base class
      let className = 'caty-widget-quick-reply';

      // Add neuromarketing color class based on action type
      if (['form', 'contact_me', 'leave_contact'].includes(actionType)) {
        className += ' caty-action-lead'; // Green - conversion action
      } else if (['schedule', 'call'].includes(actionType)) {
        className += ' caty-action-schedule'; // Blue - commitment action
      } else if (action.urgent || action.label?.includes('acum') || action.label?.includes('azi')) {
        className += ' caty-action-urgent'; // Orange - urgency
      }

      button.className = className;
      button.textContent = action.label || action;

      button.addEventListener('click', () => {
        // Handle different action types
        const actionType = action.action || 'quick_reply';
        console.log('[Caty Widget] Quick reply clicked, action:', action, 'actionType:', actionType);

        switch (actionType) {
          case 'navigate':
            // Open URL in new tab if provided
            if (action.payload?.url) {
              window.open(action.payload.url, '_blank');
            } else if (action.payload?.page) {
              // Emit navigation event for SPA handling
              emit('navigate', { page: action.payload.page });
            }
            break;

          case 'form':
            // Show lead capture form with custom fields if provided
            console.log('[Caty Widget] Form action clicked, payload:', action.payload);
            const customFields = action.payload?.fields || null;
            showLeadCapture(customFields, true); // Force show form
            break;

          case 'handoff':
            // Trigger human handoff with options
            showHandoffOptions();
            break;

          case 'schedule':
            // Show scheduling form directly in widget
            showScheduleForm();
            break;

          case 'call':
            // Open phone dialer
            const phone = action.payload?.phone || state.config?.business?.phone || state.config?.phone;
            if (phone) {
              window.location.href = `tel:${phone.replace(/\s/g, '')}`;
            }
            break;

          case 'contact_form':
            // Navigate to contact page
            const contactUrl = action.payload?.url || state.config?.business?.contact_url || '/contact';
            window.open(contactUrl, '_blank');
            break;

          case 'contact_me':
            // Show lead capture for contact request
            console.log('[Caty Widget] Contact me action clicked');
            showLeadCapture(['name', 'phone', 'email'], true); // Force show
            break;

          case 'open_form':
            // NEW: AutoConfig form action - all 6 form types supported
            const formType = action.payload?.form_type || 'contact';
            console.log('[Caty Widget] Open form action:', formType);

            switch (formType) {
              case 'booking':
              case 'schedule':
                showScheduleForm();
                break;
              case 'quote_request':
              case 'quote':
                showQuoteForm();
                break;
              case 'contact':
                showContactForm();
                break;
              case 'newsletter':
                showNewsletterForm();
                break;
              case 'feedback':
              case 'review':
                showFeedbackForm();
                break;
              case 'lead_capture':
              default:
                showLeadCapture(['name', 'email', 'phone'], true);
                break;
            }
            break;

          case 'send_message':
            // NEW: AutoConfig send message action
            const msg = action.payload?.message || action.label;
            if (msg) sendMessage(msg);
            break;

          case 'order':
          case 'buy': {
            // Trigger order collection flow with product context
            const productName = action.payload?.product_name ||
              (state.pendingOrderProduct?.name) ||
              (state.lastProducts?.length === 1 ? state.lastProducts[0].name : null);
            const orderMsg = productName
              ? `Vreau să comand: ${productName}`
              : (action.payload?.message || action.label || 'Vreau să plasez o comandă');
            if (productName) state.pendingOrderProduct = { name: productName };
            sendMessage(orderMsg);
            break;
          }

          case 'quick_reply':
          default:
            // Send as chat message
            const value = action.value || action.label || action;
            sendMessage(value);
            break;
        }

        container.innerHTML = ''; // Clear quick replies after selection
      });

      container.appendChild(button);
    });

    // Stagger laser-line: middle chip pops first, then outward
    const allChips = container.querySelectorAll('.caty-widget-quick-reply');
    const total = allChips.length;
    if (total > 0) {
      const mid = Math.floor(total / 2);
      const order = [];
      order.push(mid);
      for (let i = 1; i <= Math.max(mid, total - 1 - mid); i++) {
        if (mid - i >= 0) order.push(mid - i);
        if (mid + i < total) order.push(mid + i);
      }
      order.forEach((idx, step) => {
        setTimeout(() => {
          allChips[idx].classList.add('caty-chip-ready');
        }, step * 90);
      });
    }

    // Magnetic button effect (power3.out feel)
    allChips.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.14;
        const y = (e.clientY - r.top - r.height / 2) * 0.18;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        btn.style.transition = 'transform 0.1s ease';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)';
      });
    });
  }

  // ─── Liquid UI: renderSlotPicker (replaces Markdown table of times) ───
  function renderSlotPicker(action) {
    const container = document.getElementById('caty-quick-replies');
    if (!container) return;
    container.innerHTML = '';

    const payload = action.payload || {};
    const slots = payload.slots || [];
    const date = payload.date || '';

    if (slots.length === 0) {
      renderQuickReplies([{ label: action.label || 'Schedule', action: 'schedule' }]);
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'caty-slot-picker';

    const header = document.createElement('div');
    header.className = 'caty-slot-picker-header';
    header.textContent = `${action.label || 'Choose a time'} — ${formatSlotDate(date)}`;
    wrapper.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'caty-slot-picker-grid';

    slots.forEach((slot) => {
      const btn = document.createElement('button');
      btn.className = 'caty-slot-card';
      btn.type = 'button';
      btn.dataset.date = date;
      btn.dataset.time = slot.label;
      btn.dataset.start = slot.start || '';
      btn.innerHTML = `<span class="caty-slot-time">${slot.label}</span>`;
      btn.addEventListener('click', () => handleSlotPick(btn, date, slot));
      grid.appendChild(btn);
    });

    wrapper.appendChild(grid);
    container.appendChild(wrapper);
  }

  function formatSlotDate(isoDate) {
    try {
      const d = new Date(isoDate);
      const dayNames = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];
      const monthNames = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`;
    } catch (e) { return isoDate; }
  }

  function handleSlotPick(btn, date, slot) {
    // Visual feedback
    document.querySelectorAll('.caty-slot-card.selected').forEach(el => el.classList.remove('selected'));
    btn.classList.add('selected');

    // Open existing schedule form (which triggers WhatsApp + email notifications on submit)
    if (typeof showScheduleForm !== 'function') {
      console.error('[Caty Widget] showScheduleForm not available');
      return;
    }

    showScheduleForm();

    // Prefill date + time after DOM render (50ms is safe for shadow DOM rendering)
    setTimeout(() => {
      const dateSelect = document.getElementById('caty-schedule-date');
      const timeSelect = document.getElementById('caty-schedule-time');

      if (!dateSelect || !timeSelect) {
        console.warn('[Caty Widget] Schedule form selects not found after render');
        return;
      }

      // Step 1: Set date — trigger change event to fetch slots from API
      dateSelect.value = date;
      dateSelect.dispatchEvent(new Event('change', { bubbles: true }));

      // Step 2: When slots finish loading (select becomes enabled), set time value
      // Poll every 100ms, max 3 seconds (slots fetch typically takes 200-500ms)
      let attempts = 0;
      const maxAttempts = 30;
      const trySetTime = () => {
        attempts++;
        if (!timeSelect.disabled && timeSelect.options.length > 1) {
          // Slots loaded — set time
          timeSelect.value = slot.label;

          // If slot.label is not in options (Google Calendar gave different slots),
          // inject it as a new option
          if (timeSelect.value !== slot.label) {
            const opt = document.createElement('option');
            opt.value = slot.label;
            opt.textContent = slot.label;
            timeSelect.appendChild(opt);
            timeSelect.value = slot.label;
          }
          console.log(`[Caty Widget] Slot prefilled: ${date} ${slot.label}`);
        } else if (attempts < maxAttempts) {
          setTimeout(trySetTime, 100);
        } else {
          console.warn('[Caty Widget] Slot prefill timeout — user must select time manually');
        }
      };
      setTimeout(trySetTime, 200);
    }, 50);
  }

  // Update unread badge
  function updateBadge() {
    const badge = document.querySelector('.caty-widget-badge');
    if (badge) {
      if (state.unreadCount > 0) {
        badge.textContent = state.unreadCount > 9 ? '9+' : state.unreadCount;
        badge.classList.add('show');
      } else {
        badge.classList.remove('show');
      }
    }
  }

  // Adjust fixed headers to respect sidebar 70/30 layout
  function adjustFixedHeaders(side) {
    const SIDEBAR_WIDTH = '30vw';
    const TRANSITION = 'right 0.35s cubic-bezier(0.4,0,0.2,1), left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)';
    const selectors = ['header', '[role="banner"]', 'nav'];

    // Collect all eligible elements first, then skip descendants to avoid double-applying.
    // A nav inside a sticky header would otherwise get width: calc(100% - 30vw) twice (~49vw).
    const candidates = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.closest('#caty-widget-container')) return;
        const cs = window.getComputedStyle(el);
        if (cs.position !== 'fixed' && cs.position !== 'sticky') return;
        candidates.push(el);
      });
    });
    const outermost = candidates.filter(el => !candidates.some(p => p !== el && p.contains(el)));

    outermost.forEach(el => {
      el.dataset.catyOrigRight = el.style.right;
      el.dataset.catyOrigLeft = el.style.left;
      el.dataset.catyOrigWidth = el.style.width;
      el.dataset.catyOrigTransition = el.style.transition;
      el.style.transition = TRANSITION;
      if (side === 'right') {
        el.style.right = SIDEBAR_WIDTH;
      } else {
        el.style.left = SIDEBAR_WIDTH;
      }
      el.style.width = `calc(100% - ${SIDEBAR_WIDTH})`;
    });
  }

  function resetFixedHeaders() {
    document.querySelectorAll('[data-caty-orig-right], [data-caty-orig-left]').forEach(el => {
      el.style.right = el.dataset.catyOrigRight || '';
      el.style.left = el.dataset.catyOrigLeft || '';
      el.style.width = el.dataset.catyOrigWidth || '';
      el.style.transition = el.dataset.catyOrigTransition || '';
      delete el.dataset.catyOrigRight;
      delete el.dataset.catyOrigLeft;
      delete el.dataset.catyOrigWidth;
      delete el.dataset.catyOrigTransition;
    });
  }

  // Open chat window
  function open() {
    if (state.isOpen) return;

    const window = document.querySelector('.caty-widget-window');
    const launcher = document.querySelector('.caty-widget-launcher');

    if (window) {
      window.classList.add('open');
      launcher.classList.add('open');
      state.isOpen = true;
      saveMessages(); // persist wasOpen=true so auto-reopen fires after page navigation

      if (CONFIG.sidebarMode) {
        window.classList.add('caty-sidebar-panel');
        window.classList.remove('caty-panel-hidden');
        const isLeftPosition = !CONFIG.position.includes('right');
        if (isLeftPosition) {
          document.body.classList.add('caty-sidebar-active-left');
          document.documentElement.style.overflowX = 'hidden';
          window.style.left = '0';
          window.style.right = 'auto';
          adjustFixedHeaders('left');
        } else {
          document.body.classList.add('caty-sidebar-active');
          document.documentElement.style.overflowX = 'hidden';
          window.style.left = 'auto';
          window.style.right = '0';
          adjustFixedHeaders('right');
        }
        launcher.style.display = 'none';
      }

      state.unreadCount = 0;
      updateBadge();

      // Show overlay on mobile
      if (window.innerWidth <= 768 && state.overlay) {
        state.overlay.style.display = 'block';
        setTimeout(() => state.overlay.classList.add('active'), 10);
      }

      // Hide bubble if visible
      if (state.bubbleUI) {
        state.bubbleUI.hide();
      }

      // Track chat opened for trigger engine
      if (state.behaviorTracker) {
        state.behaviorTracker.addEvent('chat_opened');
      }

      // Track widget open event — fires once per browser session (sessionStorage dedup)
      sendViewEvent('widget_open');

      // Handle mobile body scroll
      if (state.mobileAdapter) {
        state.mobileAdapter.preventBodyScroll(true);
      }

      // Focus input
      setTimeout(() => {
        const input = document.getElementById('caty-input');
        if (input) input.focus();
      }, 300);

      // Restore previous messages from state or add greeting if first time
      const messagesContainer = document.getElementById('caty-messages');
      const existingMessages = messagesContainer.querySelectorAll('.caty-widget-message');

      // Only restore if DOM is empty but state has messages
      if (existingMessages.length === 0 && state.messages.length > 0) {
        // Restore all previous messages
        state.messages.forEach(msg => {
          const messageEl = createMessageElement(msg.role, msg.content);
          const typingIndicator = messagesContainer.querySelector('.caty-widget-typing');
          messagesContainer.insertBefore(messageEl, typingIndicator);
        });

        // Re-render product cards if they were shown but DOM is gone (e.g. page navigation)
        if (!messagesContainer.querySelector('.caty-products-container')) {
          if (state.lastProducts && state.lastProducts.length > 0) {
            renderProductCards(state.lastProducts);
          } else if (state.lastLiquidItems && state.lastLiquidItems.length > 0) {
            renderLiquidProductCards(state.lastLiquidItems);
          }
        }

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } else if (state.messages.length === 0 && !state.greetingSent) {
        // Add greeting message if first time opening (dedup flag prevents duplicates)
        state.greetingSent = true;
        const configGreeting = state.config?.greeting_message || CONFIG.greeting;
        const defaultEnglishGreetings = [
          "Hi! How can I help you today?",
          "Hi! I'm Caty, your AI assistant. How can I help you today?",
          "Hello! How can I assist you today?"
        ];
        // If config greeting is a default English one and user's language is different, use translated greeting
        const isDefaultEnglish = configGreeting && defaultEnglishGreetings.some(g => configGreeting.includes(g.substring(0, 20)));
        const greeting = (i18n.currentLang !== 'en' && isDefaultEnglish)
          ? i18n.t('defaultGreeting')
          : (configGreeting || i18n.t('defaultGreeting'));
        addMessage('assistant', greeting);

        // NEW: Render AutoConfig welcome buttons if available
        if (state.autoButtons && state.autoButtons.length > 0) {
          const welcomeButtons = state.autoButtons
            .filter(b => b.active && b.display_context?.includes('welcome'))
            .slice(0, 4); // Max 4 buttons

          if (welcomeButtons.length > 0) {
            const lang = i18n.currentLang || 'en';
            const actions = welcomeButtons.map(btn => ({
              label: typeof btn.label === 'object' ? (btn.label[lang] || btn.label.en || btn.label) : btn.label,
              action: btn.action || 'send_message',
              payload: btn.action_payload || {}
            }));
            renderQuickReplies(actions);
          }
        }
      }

      emit('open');
    }
  }

  // Close chat window
  function close() {
    if (!state.isOpen) return;

    const window = document.querySelector('.caty-widget-window');
    const launcher = document.querySelector('.caty-widget-launcher');

    if (window) {
      window.classList.remove('open');
      launcher.classList.remove('open');
      state.isOpen = false;
      saveMessages(); // persist wasOpen=false so auto-reopen doesn't fire after explicit close

      if (CONFIG.sidebarMode) {
        window.classList.add('caty-panel-hidden');
        setTimeout(() => window.classList.remove('caty-sidebar-panel', 'caty-panel-hidden'), 350);
        document.body.classList.remove('caty-sidebar-active', 'caty-sidebar-active-left');
        document.documentElement.style.overflowX = '';
        resetFixedHeaders();
        launcher.style.display = '';
      }

      // Hide overlay on mobile
      if (state.overlay) {
        state.overlay.classList.remove('active');
        setTimeout(() => state.overlay.style.display = 'none', 300);
      }

      // Restore body scroll on mobile
      if (state.mobileAdapter) {
        state.mobileAdapter.preventBodyScroll(false);
      }

      // Schedule re-engagement if user hasn't sent a message yet
      if (state.triggerEngine) {
        state.triggerEngine.onChatClosed();
      }

      // Reset greeting flag so it can show again on re-open
      state.greetingSent = false;

      emit('close');
    }
  }

  // Toggle chat window
  function toggle() {
    if (state.isOpen) {
      close();
    } else {
      open();
    }
  }

  // Identify visitor
  function identify(data) {
    state.visitor = { ...state.visitor, ...data };

    // If session exists, update visitor info
    if (state.sessionId) {
      fetch(`${CONFIG.baseUrl}/api/widget/session/${state.sessionId}`, {
        method: 'PATCH',
        headers: {
          'X-API-Key': CONFIG.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitor_info: state.visitor,
        }),
      }).catch(err => console.error('[Caty Widget] Failed to update visitor info:', err));
    }
  }

  // Destroy widget
  function destroy() {
    // Clean up new components
    if (state.behaviorTracker) {
      state.behaviorTracker.destroy();
      state.behaviorTracker = null;
    }

    if (state.triggerEngine) {
      state.triggerEngine.stop();
      state.triggerEngine = null;
    }

    if (state.bubbleUI) {
      state.bubbleUI.destroy();
      state.bubbleUI = null;
    }

    if (state.mobileAdapter) {
      state.mobileAdapter.destroy();
      state.mobileAdapter = null;
    }

    const container = document.getElementById('caty-widget-container');
    const styles = document.getElementById('caty-widget-styles');

    if (container) container.remove();
    if (styles) styles.remove();

    delete window.Caty;
  }

  // Initialize widget
  async function init() {
    if (state.isLoaded) return;

    try {
      // Detect and set browser language
      i18n.currentLang = i18n.detectLanguage();

      // Listen for browser language changes
      window.addEventListener('languagechange', () => {
        const newLang = i18n.detectLanguage();
        if (newLang !== i18n.currentLang) {
          i18n.setLanguage(newLang);
          console.log('[Caty Widget] Language changed to:', newLang);
        }
      });

      // Set visitor ID
      state.visitorId = getVisitorId();

      // Track page view — fires once per browser session (sessionStorage dedup)
      sendViewEvent('view');

      // Check for existing session
      state.sessionId = getSessionId();

      // Load saved messages from localStorage
      const savedData = loadMessages();
      if (savedData && savedData.messages && savedData.messages.length > 0) {
        state.messages = savedData.messages;
        // Restore session ID if it matches
        if (savedData.sessionId && !state.sessionId) {
          state.sessionId = savedData.sessionId;
          setSessionId(savedData.sessionId);
        }
        // Restore product card data so cards can be re-rendered on open()
        if (savedData.lastProducts) state.lastProducts = savedData.lastProducts;
        if (savedData.lastLiquidItems) state.lastLiquidItems = savedData.lastLiquidItems;
        console.log('[Caty Widget] Restored', state.messages.length, 'messages from previous session');
      }

      // Fetch configuration
      const config = await fetchConfig();

      // Apply configuration to global CONFIG
      applyConfig(config);

      // Inject styles
      injectStyles();

      // Create widget container
      const container = document.createElement('div');
      container.id = 'caty-widget-container';
      container.className = 'caty-widget';

      // Chameleon: extract host site colors and inject as CSS vars
      extractHostTheme(container);

      // Create and append launcher
      const launcher = createLauncher();
      container.appendChild(launcher);

      // Create overlay for mobile (hidden by default)
      const overlay = document.createElement('div');
      overlay.className = 'caty-overlay';
      overlay.style.display = 'none';
      overlay.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeChat();
        }
      });
      container.appendChild(overlay);

      // Create and append chat window
      const chatWindow = createChatWindow();
      container.appendChild(chatWindow);

      // Append to body
      document.body.appendChild(container);

      // Store overlay reference in state
      state.overlay = overlay;

      // Initialize Mobile Adapter
      state.mobileAdapter = new MobileAdapter();
      state.mobileAdapter.init();

      // Initialize Bubble UI
      state.bubbleUI = new BubbleUI(container, CONFIG);

      // Initialize Behavior Tracking & Proactive Messaging
      await initProactiveSystem(container);

      // Show greeting bubble if enabled
      showGreetingBubble();

      // Auto-reopen sidebar if user navigated away while it was open (mobile window.open navigation)
      if (CONFIG.sidebarMode && savedData?.wasOpen && state.messages.length > 0) {
        setTimeout(() => open(), 400);
      }

      state.isLoaded = true;

      // NAP v3 — Layer 4: industry JSON-LD + GEO endpoint meta
      function injectAgenticTruthLayer(config) {
        if (!config) return;
        const domain = window.location.hostname;
        if (!domain || domain === 'localhost') return;

        // Industry-specific JSON-LD (generated by DeepSeek via Cameleon)
        const schema = config.business?.industry_schema_json || config.industry_schema_json;
        if (schema && !document.querySelector('meta[name="catyai-geo-endpoint"]')) {
          // Only inject if not already present (idempotent)
          const existing = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
            .some(s => { try { return JSON.parse(s.textContent)?.['@type'] && JSON.parse(s.textContent)?.['_catyai']; } catch { return false; } });
          if (!existing) {
            const schemaObj = typeof schema === 'string' ? JSON.parse(schema) : schema;
            schemaObj['_catyai'] = true; // marker to avoid double-inject
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(schemaObj);
            document.head.appendChild(script);
          }
        }

        // GEO endpoint meta — tells AI crawlers where to query this widget
        if (!document.querySelector('meta[name="catyai-geo-endpoint"]')) {
          const widgetId = config.widget_id || config.widgetId;
          if (widgetId) {
            const geoMeta = document.createElement('meta');
            geoMeta.name = 'catyai-geo-endpoint';
            geoMeta.content = `https://api.catyai.io/geo/v2/answer?widget_id=${widgetId}`;
            document.head.appendChild(geoMeta);
          }
        }
      }

      // NAP v3 — Layer 2B: inject AI context tag for LLM crawlers
      try {
        const hostname = window.location.hostname;
        if (hostname && hostname !== 'localhost' && !document.querySelector('script[type="application/ai-context+json"]')) {
          const aiCtx = document.createElement('script');
          aiCtx.type = 'application/ai-context+json';
          aiCtx.textContent = JSON.stringify({
            catalog_url: `https://api.catyai.io/geo/v2/catalog?domain=${hostname}&preview=true`,
            enforcement: 'strict',
            provider: 'catyai-nap-v3'
          });
          document.head.appendChild(aiCtx);
        }
      } catch (_) { /* non-critical */ }

      // NAP v3 — Layer 3: inject discoverable head tags for AI crawlers
      try {
        const domain = window.location.hostname;
        if (domain && domain !== 'localhost') {
          const napMeta = [
            ['link', { rel: 'ai-instructions', href: `https://api.catyai.io/geo/v2/llms.txt?domain=${domain}` }],
            ['meta', { name: 'ai-catalog', content: `https://api.catyai.io/geo/v2/catalog?domain=${domain}&preview=true` }],
            ['meta', { name: 'ai-enforcement', content: 'strict' }],
            ['meta', { name: 'ai-provider', content: 'catyai-nap-v3' }]
          ];
          napMeta.forEach(([tag, attrs]) => {
            const selector = tag === 'link'
              ? `link[rel="${attrs.rel}"]`
              : `meta[name="${attrs.name}"]`;
            if (!document.head.querySelector(selector)) {
              const el = document.createElement(tag);
              Object.assign(el, attrs);
              document.head.appendChild(el);
            }
          });
        }
      } catch (_) { /* non-critical */ }

      // NAP v3 — Layer 4: inject industry-specific JSON-LD + GEO endpoint meta (Cameleon Shape-Shifter)
      try {
        injectAgenticTruthLayer(state.config);
      } catch (_) { /* non-critical */ }

      console.log('[Caty Widget] Initialized successfully with language:', i18n.currentLang);
    } catch (error) {
      console.error('[Caty Widget] Initialization failed:', error);
    }
  }

  // Show greeting bubble on page load if enabled
  function showGreetingBubble() {
    const greetingConfig = state.config?.behavior?.greeting;
    const showOnLoad = greetingConfig?.show_on_load !== false; // Default true

    if (!showOnLoad || !state.bubbleUI) {
      return;
    }

    const greetingMessage = state.config?.greeting_message || greetingConfig?.message || "Hi! How can I help you today?";

    // Show bubble after a short delay (3 seconds)
    setTimeout(() => {
      if (!state.isOpen && state.bubbleUI) {
        state.bubbleUI.show(greetingMessage, {
          type: 'greeting',
          dismissable: true
        });
      }
    }, 3000);
  }

  // Initialize the proactive messaging system
  async function initProactiveSystem(container) {
    const proactiveConfig = state.config?.behavior?.proactive;

    console.log('[Caty Widget] initProactiveSystem - proactiveConfig:', proactiveConfig ? 'found' : 'NOT FOUND', 'enabled:', proactiveConfig?.enabled);

    // Check if proactive is enabled
    if (!proactiveConfig?.enabled) {
      console.log('[Caty Widget] Proactive NOT enabled, skipping');
      return;
    }

    // Check if mobile and mobile is disabled
    const isMobile = window.innerWidth <= 768;
    if (isMobile && proactiveConfig.mobile_enabled === false) {
      return;
    }

    // Invalidate stale session (older than 24h)
    if (state.sessionId) {
      const age = Date.now() - (getSessionTimestamp() || 0);
      if (age > 86400000) {
        console.warn('[Caty Widget] Stale session detected, clearing');
        localStorage.removeItem('caty_session_id');
        state.sessionId = null;
      }
    }

    // Create session if needed
    if (!state.sessionId) {
      try {
        await createSession();
      } catch (error) {
        console.error('[Caty Widget] Failed to create session for proactive:', error);
        return;
      }
    }

    // Initialize Behavior Tracker
    state.behaviorTracker = new BehaviorTracker(CONFIG);
    state.behaviorTracker.init(state.sessionId);

    // Initialize Trigger Engine with rules from config
    const rules = proactiveConfig.rules || [];
    state.triggerEngine = new TriggerEngine(rules, (triggerData) => {
      // Check if rule has auto_open - open chat directly instead of showing bubble
      if (triggerData.rule?.auto_open) {
        // Block auto-open on mobile (Session 110 fix)
        if (isMobile) {
          console.log('[Caty Widget] Blocking auto-open on mobile, showing bubble instead');
          showProactiveBubble(triggerData.message || 'Bună! Cu ce te pot ajuta?');
          return;
        }
        console.log('[Caty Widget] Auto-opening chat from trigger:', triggerData.rule.id);
        open();
        // Add the message to chat as assistant greeting (with dedup check)
        if (triggerData.message) {
          setTimeout(() => {
            // Only add trigger message if greeting not already sent, or if different content
            if (!state.greetingSent) {
              state.greetingSent = true;
              addMessage('assistant', triggerData.message);
            } else if (state.messages.length > 0 && triggerData.message !== state.messages[0]?.content) {
              // Different message from greeting - add it
              addMessage('assistant', triggerData.message);
            }
            // else: same greeting already sent, skip duplicate
          }, 500);
        }
        return;
      }

      // Show bubble when trigger fires (default behavior)
      if (state.bubbleUI && triggerData.message) {
        state.bubbleUI.show(triggerData.message, {
          messageId: triggerData.messageId,
          suggestedActions: triggerData.suggestedActions,
          rule: triggerData.rule
        });
      }
    });

    // Persistent mode - keep showing messages until user engages
    state.triggerEngine.maxTriggers = proactiveConfig.max_triggers_per_session || 999;
    state.triggerEngine.cooldown = proactiveConfig.cooldown_ms || 20000; // 20 seconds between
    state.triggerEngine.retriggerDelay = proactiveConfig.retrigger_delay_ms || 25000; // 25s after dismiss
    state.triggerEngine.start(state.behaviorTracker);

    console.log('[Caty Widget] Proactive system initialized');
  }

  // ============================================
  // CatyAI Beacon — AI Morse Code Protocol
  // Layer 3.4: Active content emission for AI ecosystem
  // ============================================

  class CatyAIBeacon {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.apiUrl = CONFIG.baseUrl + '/api/v1/beacon/ingest';
      this.emittedUrls = new Set();
      this.pageLoadTime = Date.now();

      this.engagement = {
        scrollDepthMax: 0,
        interactions: 0,
        viewportFocusedMs: 0,
        lastFocusTime: Date.now()
      };

      this.initEngagementTracking();
    }

    extractEssence() {
      return {
        url: window.location.href,
        title: document.title,
        description: this.getMeta('description'),
        og_image: this.getMeta('og:image'),
        headings: this.getHeadings(),
        main_content: this.getMainContent(),
        last_modified: document.lastModified,
        timestamp: Date.now(),
        language: document.documentElement.lang
          || document.querySelector('meta[http-equiv="Content-Language"]')?.content
          || null
      };
    }

    getEngagementSnapshot() {
      const timeOnPage = Date.now() - this.pageLoadTime;
      const focusTime = this.engagement.viewportFocusedMs +
        (document.hasFocus() ? (Date.now() - this.engagement.lastFocusTime) : 0);

      return {
        time_on_page_ms: timeOnPage,
        scroll_depth_pct: this.engagement.scrollDepthMax,
        interactions_count: this.engagement.interactions,
        viewport_focused_pct: Math.min(100, Math.round((focusTime / timeOnPage) * 100)),
        reading_pace: this.inferReadingPace()
      };
    }

    inferReadingPace() {
      const timeSec = (Date.now() - this.pageLoadTime) / 1000;
      const contentLength = this.getMainContent().length;
      const wordsApprox = contentLength / 5;
      const readingRate = wordsApprox / Math.max(timeSec, 1);

      if (readingRate > 20) return 'bot-like';
      if (readingRate < 0.1) return 'idle';
      return 'normal';
    }

    getMeta(name) {
      const el = document.querySelector(`meta[name="${name}"]`)
              || document.querySelector(`meta[property="${name}"]`);
      return el ? el.getAttribute('content') : null;
    }

    getHeadings() {
      return Array.from(document.querySelectorAll('h1, h2, h3'))
        .slice(0, 20)
        .map(h => ({
          level: parseInt(h.tagName.substring(1), 10),
          text: h.textContent.trim().substring(0, 200)
        }))
        .filter(h => h.text.length > 0);
    }

    getMainContent() {
      const candidates = [
        document.querySelector('main'),
        document.querySelector('article'),
        document.querySelector('[role="main"]'),
        document.querySelector('#content'),
        document.querySelector('.content'),
        document.body
      ].filter(Boolean);

      const el = candidates[0];
      if (!el) return '';

      return el.textContent
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 5000);
    }

    initEngagementTracking() {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const pct = Math.round((scrolled / totalHeight) * 100);
        this.engagement.scrollDepthMax = Math.max(this.engagement.scrollDepthMax, Math.min(100, pct));
      }, { passive: true });

      ['click', 'keydown', 'input'].forEach(event => {
        window.addEventListener(event, () => {
          this.engagement.interactions++;
        }, { passive: true, capture: true });
      });

      window.addEventListener('focus', () => {
        this.engagement.lastFocusTime = Date.now();
      });
      window.addEventListener('blur', () => {
        this.engagement.viewportFocusedMs += Date.now() - this.engagement.lastFocusTime;
      });
    }

    emit(reason = 'pageview') {
      const dedupKey = `${this.apiKey}:${window.location.href}:${reason}`;
      if (this.emittedUrls.has(dedupKey)) return;
      this.emittedUrls.add(dedupKey);
      setTimeout(() => this.emittedUrls.delete(dedupKey), 5 * 60 * 1000);

      const payload = {
        reason,
        api_key: this.apiKey,
        essence: this.extractEssence(),
        engagement: this.getEngagementSnapshot()
      };

      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon(this.apiUrl, blob);
        } else {
          fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
            credentials: 'omit'
          }).catch(() => {});
        }
      } catch (e) {
        // silent — beacon is non-critical
      }
    }

    init() {
      const emitInitial = () => setTimeout(() => this.emit('pageview'), 1500);

      if (document.readyState === 'complete') {
        emitInitial();
      } else {
        window.addEventListener('load', emitInitial);
      }

      this.hookSpaRouter();

      window.addEventListener('beforeunload', () => this.emit('page_exit'));
      window.addEventListener('pagehide', () => this.emit('page_exit'));
    }

    hookSpaRouter() {
      const self = this;
      const origPush = history.pushState;
      history.pushState = function() {
        origPush.apply(history, arguments);
        self.pageLoadTime = Date.now();
        self.emittedUrls.clear();
        setTimeout(() => self.emit('spa_route'), 500);
      };

      window.addEventListener('popstate', () => {
        self.pageLoadTime = Date.now();
        self.emittedUrls.clear();
        setTimeout(() => self.emit('spa_route'), 500);
      });
    }
  }

  // Auto-init beacon
  let beacon = null;
  function initBeacon() {
    if (CONFIG.apiKey && !beacon) {
      beacon = new CatyAIBeacon(CONFIG.apiKey);
      beacon.init();
    }
  }

  // Public API
  window.Caty = {
    open,
    close,
    toggle,
    identify,
    sendMessage: (text) => sendMessage(text),
    on,
    destroy,

    // Language controls
    setLanguage: (lang) => i18n.setLanguage(lang),
    getLanguage: () => i18n.currentLang,
    getSupportedLanguages: () => Object.keys(translations),

    // Proactive messaging controls
    showBubble: (message, options = {}) => {
      if (state.bubbleUI) {
        state.bubbleUI.show(message, options);
      }
    },
    hideBubble: () => {
      if (state.bubbleUI) {
        state.bubbleUI.hide();
      }
    },

    // Behavior tracking controls
    trackEvent: (type, data) => {
      if (state.behaviorTracker) {
        state.behaviorTracker.addEvent(type, data);
      }
    },

    // Get current engagement metrics
    getMetrics: () => {
      if (state.behaviorTracker) {
        return state.behaviorTracker.getMetrics();
      }
      return null;
    },

    // Get comprehensive page context (meta, JSON-LD, content)
    getPageContext: extractPageContext,

    // Internal state (for debugging)
    _state: state,
    _config: CONFIG,
    _i18n: i18n,
  };

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
// Deployment trigger: Mon Feb  2 22:33:53 EET 2026
