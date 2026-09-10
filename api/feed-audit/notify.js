'use strict';

// C8 (redus, spec ziua 4) — notificare simplă către canalul nostru
// (Slack/email via webhook — Zapier/SES), fără stocare lead structurată și
// fără billing. URL din env NOTIFY_WEBHOOK_URL; fără URL → no-op cu log.
// Zero dependențe: POST cu fetch global (Node 20) + AbortController.

const DEFAULT_TIMEOUT_MS = 10000;

function createNotifier({ webhookUrl = process.env.NOTIFY_WEBHOOK_URL || null, timeoutMs = DEFAULT_TIMEOUT_MS, logger = console } = {}) {
  return async function notify(payload) {
    if (!webhookUrl) {
      logger.log('[feed-audit] NOTIFY_WEBHOOK_URL lipsă — notificare sărită (no-op)');
      return { sent: false, reason: 'no-webhook-configured' };
    }
    const body = JSON.stringify({ ...payload, sent_at: new Date().toISOString() });
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        signal: ctrl.signal,
      });
      if (!res.ok) {
        logger.warn(`[feed-audit] webhook a răspuns ${res.status} — notificare nesigură`);
        return { sent: false, reason: `http-${res.status}` };
      }
      return { sent: true };
    } catch (err) {
      // notificarea e best-effort — nu aruncăm, ca să nu rupem fluxul auditului
      logger.warn(`[feed-audit] notificare eșuată: ${err.message}`);
      return { sent: false, reason: err.name === 'AbortError' ? 'timeout' : 'error' };
    } finally {
      clearTimeout(timer);
    }
  };
}

module.exports = { createNotifier };
