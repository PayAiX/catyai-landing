/**
 * Badge-urile de partener — O SINGURĂ sursă pentru catyai.io (PAS 2).
 * Perechea de pe shop (SSR) e src/api/shop/partner-badges.js în repo-ul
 * Caty.AI — texte identice, aceleași reguli.
 *
 * Reguli (brief PAS 2):
 * - Texte EXACTE. Schimbarea statutului OpenAI = UN edit aici.
 * - FĂRĂ logo-uri (până la kit-ul oficial — cerere trimisă la Google).
 * - FĂRĂ „powered by / recommended by / certified by".
 * - Poziție: LÂNGĂ ofertă/CTA, nu în footer.
 * - Statut real azi: Google CSS aprobat 7 aug 2026 · Anthropic = membru ·
 *   OpenAI = step 3/4 în review → „onboarding in progress", NU „partner".
 */

export function partnerBadges(locale = 'en') {
  return [
    locale === 'ro'
      ? 'Comparison Shopping Service aprobat de Google'
      : 'Google-approved Comparison Shopping Service',
    'Anthropic Claude Partner Network member',
    'OpenAI Partner Network — onboarding in progress',
  ]
}

export default function PartnerBadges({ locale = 'en', className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Partner programs">
      {partnerBadges(locale).map((b) => (
        <li
          key={b}
          className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-400"
        >
          {b}
        </li>
      ))}
    </ul>
  )
}
