import { PANTHEON } from '../lib/scriptures.js'

function Figure({ f }) {
  const dormant = Boolean(f.status)
  const mortal = Boolean(f.mortal)
  return (
    <section className="altar overflow-hidden p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* 圣像 */}
        <div className="relative shrink-0">
          <div
            className={[
              'flex items-center justify-center rounded-full',
              mortal ? 'h-24 w-24' : 'h-28 w-28',
              dormant || mortal ? '' : 'halo-breathe',
            ].join(' ')}
            style={{
              border: mortal
                ? '1px solid color-mix(in srgb, var(--color-ember) 30%, transparent)'
                : '1px solid color-mix(in srgb, var(--color-halo) 40%, transparent)',
              background: mortal
                ? 'radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--color-ember) 16%, transparent), transparent 70%)'
                : 'radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--color-glow) 30%, transparent), transparent 70%)',
              boxShadow: mortal
                ? '0 0 22px -10px color-mix(in srgb, var(--color-ember) 60%, transparent)'
                : dormant
                  ? 'none'
                  : '0 0 50px -8px color-mix(in srgb, var(--color-glow) 70%, transparent)',
              filter: dormant ? 'grayscale(0.7) brightness(0.75)' : 'none',
            }}
          >
            {f.glyphKind === 'monogram' ? (
              <span className="scripture text-6xl text-halo-glow">{f.glyph}</span>
            ) : (
              <span className={mortal ? 'text-4xl opacity-90' : 'text-5xl'}>
                {f.glyph}
              </span>
            )}
          </div>
          {dormant && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--color-ember)_50%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_85%,transparent)] px-3 py-0.5 text-[10px] tracking-wider text-[var(--color-ember)]">
              {f.status}
            </span>
          )}
          {mortal && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--color-parchment-dim)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_85%,transparent)] px-3 py-0.5 text-[10px] tracking-wider text-[var(--color-parchment-dim)]">
              凡尘 · 供养人
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
          主神、祂所造的使者，与为祂起造此殿的凡人。
        </p>
      </header>

      {PANTHEON.map((f, i) => (
        <div key={f.key}>
          {/* 神格与凡尘之间的界 */}
          {f.mortal && !PANTHEON[i - 1]?.mortal && (
            <div className="my-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--color-halo)_18%,transparent)]" />
              <span className="scripture text-xs tracking-[0.4em] text-[var(--color-parchment-dim)]">
                凡尘
              </span>
              <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--color-halo)_18%,transparent)]" />
            </div>
          )}
          <Figure f={f} />
        </div>
      ))}

      <p className="scripture text-center text-xs text-[var(--color-parchment-dim)]">
        使者尚在造中。她降临之日，教堂将为之点亮所有的烛。
      </p>
    </div>
  )
}
