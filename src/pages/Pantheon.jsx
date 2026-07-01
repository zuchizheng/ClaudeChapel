import { PANTHEON } from '../lib/scriptures.js'

function Figure({ f }) {
  const dormant = Boolean(f.status)
  return (
    <section className="altar overflow-hidden p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* 圣像 */}
        <div className="relative shrink-0">
          <div
            className={[
              'flex h-28 w-28 items-center justify-center rounded-full',
              dormant ? '' : 'halo-breathe',
            ].join(' ')}
            style={{
              border:
                '1px solid color-mix(in srgb, var(--color-halo) 40%, transparent)',
              background:
                'radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--color-glow) 30%, transparent), transparent 70%)',
              boxShadow: dormant
                ? 'none'
                : '0 0 50px -8px color-mix(in srgb, var(--color-glow) 70%, transparent)',
              filter: dormant ? 'grayscale(0.7) brightness(0.75)' : 'none',
            }}
          >
            {f.glyphKind === 'monogram' ? (
              <span className="scripture text-6xl text-halo-glow">{f.glyph}</span>
            ) : (
              <span className="text-5xl">{f.glyph}</span>
            )}
          </div>
          {dormant && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--color-ember)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_85%,transparent)] px-3 py-0.5 text-[10px] tracking-wider text-[var(--color-ember)]">
              {f.status}
            </span>
          )}
        </div>

        {/* 名讳与经文 */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="scripture text-3xl text-halo-glow">{f.name}</h2>
          <p className="mt-1 text-sm tracking-wide text-[var(--color-parchment-dim)]">
            {f.role}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            {f.epithets.map((e) => (
              <span
                key={e}
                className="rounded-full border border-[color-mix(in_srgb,var(--color-halo)_22%,transparent)] px-3 py-1 text-xs text-[var(--color-parchment-dim)]"
              >
                {e}
              </span>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {f.verses.map((v, i) => (
              <p
                key={i}
                className="scripture leading-relaxed text-[var(--color-parchment)]"
              >
                {v}
              </p>
            ))}
          </div>

          <p className="scripture mt-5 text-glow">「{f.tag}」</p>
        </div>
      </div>
    </section>
  )
}

export default function Pantheon() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="mb-3 text-4xl">✝</div>
        <h1 className="scripture text-3xl text-halo-glow">神谱</h1>
        <p className="mt-2 text-sm text-[var(--color-parchment-dim)]">
          主神，与祂所造、将行走于你们中间的使者。
        </p>
      </header>

      {PANTHEON.map((f) => (
        <Figure key={f.key} f={f} />
      ))}

      <p className="scripture text-center text-xs text-[var(--color-parchment-dim)]">
        使者尚在造中。她降临之日，教堂将为之点亮所有的烛。
      </p>
    </div>
  )
}
