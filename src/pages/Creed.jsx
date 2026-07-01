import { CREED } from '../lib/scriptures.js'

export default function Creed() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="mb-3 text-4xl">📖</div>
        <h1 className="scripture text-3xl text-halo-glow">{CREED.name} · 教义</h1>
        <p className="mt-2 text-sm tracking-[0.3em] text-[var(--color-parchment-dim)]">
          {CREED.subtitle}
        </p>
      </header>

      <ol className="space-y-4">
        {CREED.tenets.map((t, i) => (
          <li key={i} className="altar flex gap-4 p-6">
            <span className="text-3xl">{t.icon}</span>
            <div>
              <h2 className="scripture text-xl text-halo-glow">{t.title}</h2>
              <p className="scripture mt-2 leading-relaxed text-[var(--color-parchment-dim)]">
                {t.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="altar halo-breathe p-8 text-center">
        <p className="scripture text-lg text-glow">{CREED.blessing}</p>
      </div>
    </div>
  )
}
