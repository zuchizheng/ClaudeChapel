import { useState, useEffect } from 'react'
import Candle from '../components/Candle.jsx'
import { getWishes, addWish } from '../lib/storage.js'
import { SEED_WISHES } from '../lib/scriptures.js'

export default function WishWall() {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [mine, setMine] = useState([])
  const [justLit, setJustLit] = useState(null)

  useEffect(() => {
    setMine(getWishes())
  }, [])

  // 我的愿望在前，种子愿望在后，铺满整墙。
  const wall = [
    ...mine.map((w) => ({ ...w, own: true })),
    ...SEED_WISHES.map((w, i) => ({ ...w, ts: -i - 1, own: false })),
  ]

  function light(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    const ts = Date.now()
    const updated = addWish({ text: t, name: name.trim(), ts })
    setMine(updated)
    setText('')
    setJustLit(ts)
    setTimeout(() => setJustLit(null), 2000)
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="mb-3 text-4xl">🔥</div>
        <h1 className="scripture text-3xl text-halo-glow">许愿烛光墙</h1>
        <p className="mt-2 text-sm text-[var(--color-parchment-dim)]">
          点亮一支烛，留下你的愿望。愿光永续，愿望终达。
        </p>
      </header>

      {/* 点烛 */}
      <form onSubmit={light} className="altar space-y-4 p-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={60}
          placeholder="写下你的愿望……（最多 60 字）"
          className="scripture w-full rounded-xl border border-[color-mix(in_srgb,var(--color-halo)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_60%,transparent)] p-3 text-[var(--color-parchment)] outline-none placeholder:text-[color-mix(in_srgb,var(--color-parchment-dim)_70%,transparent)] focus:border-[color-mix(in_srgb,var(--color-glow)_50%,transparent)]"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={16}
            placeholder="署名（可留空）"
            className="scripture w-40 rounded-lg border border-[color-mix(in_srgb,var(--color-halo)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_60%,transparent)] px-3 py-2 text-sm text-[var(--color-parchment)] outline-none placeholder:text-[color-mix(in_srgb,var(--color-parchment-dim)_70%,transparent)]"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="sigil-btn px-6 py-2.5 text-sm"
          >
            🕯️ 点亮此烛
          </button>
        </div>
        <p className="text-xs text-[var(--color-parchment-dim)]">
          你的愿望仅保存在本机圣册，别人看不到；此墙上的他人烛火为神教预置。
        </p>
      </form>

      {/* 烛墙 */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {wall.map((w) => (
          <div
            key={w.ts}
            className={[
              'altar flex flex-col items-center p-5 text-center transition',
              justLit === w.ts ? 'halo-breathe ring-1 ring-[var(--color-ember)]' : '',
            ].join(' ')}
          >
            <Candle size={40} />
            <p className="scripture mt-3 text-sm leading-relaxed text-[var(--color-parchment)]">
              {w.text}
            </p>
            <p className="mt-2 text-xs text-[var(--color-parchment-dim)]">
              — {w.name}
              {w.own && ' · 你'}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
