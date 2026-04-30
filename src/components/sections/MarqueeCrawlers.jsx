const DEFAULT_CRAWLERS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Gemini', 'Bingbot'];

export default function MarqueeCrawlers({ label = 'Optimizat pentru AI crawlers', items = DEFAULT_CRAWLERS }) {
  const looped = [...items, ...items];
  return (
    <div className="mt-20 w-full max-w-5xl mx-auto relative overflow-hidden">
      <p className="text-xs uppercase tracking-widest text-slate-600 mb-6 font-mono text-center">{label}</p>
      <div className="flex gap-16 whitespace-nowrap">
        <div className="marquee">
          {looped.map((name, i) => (
            <span key={i} className="text-slate-500 font-bold text-lg">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
