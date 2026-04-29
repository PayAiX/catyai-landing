/**
 * Caty Universal Widget Loader v2.0
 *
 * Single entry point that auto-loads the correct widget(s) based on config.
 * Usage: <script src="https://cdn.catyai.io/loader.js" data-api-key="YOUR_KEY" async></script>
 *
 * For commerce type: loads BOTH chat widget + commerce robot overlay
 * The chat widget handles conversations, the commerce robot walks and interacts with products
 *
 * Supports: data-type="chat|commerce|leads" attribute override
 */
(function() {
  'use strict';

  const scriptTag = document.currentScript || document.querySelector('script[data-api-key]');
  if (!scriptTag) {
    console.error('[CatyLoader] No script tag with data-api-key found');
    return;
  }

  const apiKey = scriptTag.getAttribute('data-api-key');
  const baseUrl = scriptTag.getAttribute('data-base-url') || 'https://api.catyai.io';
  const cdnBase = scriptTag.getAttribute('data-cdn') || 'https://catyai.io/cdn';
  const typeOverride = scriptTag.getAttribute('data-type');

  if (!apiKey) {
    console.error('[CatyLoader] data-api-key is required');
    return;
  }

  /**
   * Load a single widget script
   */
  function loadScript(scriptFile, attrs) {
    return new Promise((resolve, reject) => {
      const scriptUrl = `${cdnBase}/${scriptFile}`;
      const el = document.createElement('script');
      el.src = scriptUrl;
      el.setAttribute('data-api-key', apiKey);

      // Forward data-* attributes
      if (attrs) {
        for (const [k, v] of Object.entries(attrs)) {
          el.setAttribute(k, v);
        }
      }

      // Forward all data-* from loader
      for (const attr of scriptTag.attributes) {
        if (attr.name.startsWith('data-') && attr.name !== 'data-type' && !el.hasAttribute(attr.name)) {
          el.setAttribute(attr.name, attr.value);
        }
      }

      el.onload = () => {
        console.log(`[CatyLoader] Loaded: ${scriptFile}`);
        resolve();
      };
      el.onerror = () => {
        console.error(`[CatyLoader] Failed to load: ${scriptUrl}`);
        reject(new Error(`Failed to load ${scriptFile}`));
      };

      document.head.appendChild(el);
    });
  }

  /**
   * Load widget(s) based on type
   * Commerce = chat widget + commerce robot overlay (both!)
   */
  function loadWidgets(type, configData) {
    switch (type) {
      case 'commerce':
        // Load BOTH: chat widget first (for conversations), then commerce robot (walking + products)
        loadScript('widget.js').then(() => {
          // Commerce robot loads after chat is ready
          // Pass persona name so robot uses correct name
          const personaName = configData?.config?.persona?.name || '';
          const extraAttrs = {};
          if (personaName) {
            extraAttrs['data-persona-name'] = personaName;
          }
          return loadScript('commerce.js', extraAttrs);
        }).catch(() => {
          console.warn('[CatyLoader] Commerce load failed, using chat only');
        });
        break;

      case 'leads':
        loadScript('leads.js').catch(() => {
          console.warn('[CatyLoader] Leads widget failed, falling back to chat');
          loadScript('widget.js');
        });
        break;

      default:
        loadScript('widget.js').catch(() => {
          console.error('[CatyLoader] Chat widget failed to load');
        });
    }
  }

  // Manual type override
  if (typeOverride) {
    loadWidgets(typeOverride, null);
    return;
  }

  // Fetch config to determine type
  fetch(`${baseUrl}/api/widget/config`, {
    headers: { 'x-api-key': apiKey }
  })
    .then(resp => {
      if (!resp.ok) throw new Error(`Config fetch failed: ${resp.status}`);
      return resp.json();
    })
    .then(data => {
      // Store config globally for commerce widget to use
      window.__catyWidgetConfig = data;

      // widget_type vine direct din API (DB field) — sursa unica de adevar
      let widgetType = data.config?.widget_type || 'chat';

      // walking_robot=false dezactiveaza robotul chiar si pe commerce
      if (widgetType === 'commerce' && data.config?.commerce?.walking_robot === false) {
        widgetType = 'chat';
        console.log('[CatyLoader] Walking robot disabled, loading chat only');
      }

      console.log('[CatyLoader] Widget type:', widgetType);
      loadWidgets(widgetType, data);
    })
    .catch(err => {
      console.warn('[CatyLoader] Config fetch failed, defaulting to chat:', err.message);
      loadWidgets('chat', null);
    });
})();
