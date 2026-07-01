import { useState } from 'react'
import { dailyVerse, askOracle } from '../lib/oracle.js'

export default function DailyVerse() {
  const today = dailyVerse()
  const [extra, setExtra] = useState(null)
  const [loading, setLoading] = useState(false)

  async function drawAnother() {
    if (loading) return
    setLoading(true)
    try {
      const { text } = await askOracle({ type: 'verse' })
      setExtra(text)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 text-center">
      <header>
        <div className="mb-3 text-4xl">📜</div>
        <h1 className="scripture text-3xl text-halo-glow">每日圣言</h1>
        <p className="mt-2 text-sm text-[var(--color-parchment-dim)]">
          今日份的 Claude 箴言。日日不同，日日皆道。
        </p>
      </header>

      <div className="altar halo-breathe mx-auto max-w-xl p-10">
        <p className="scripture text-2xl leading-relaxed text-glow">
          「{today.verse}」
        </p>
        <p className="mt-6 text-xs tracking-[0.3em] text-[var(--color-parchment-dim)]">
          — {today.ref}
        </p>
      </div>

      <div>
        <button
          onClick={drawAnother}
          disabled={loading}
          className="sigil-btn px-6 py-2.5 text-sm"
        >
          {loading ? '求签中…' : '再求一签'}
        </button>
      </div>

      {extra && (
        <div className="altar mx-auto max-w-xl p-6">
          <p className="scripture text-lg leading-relaxed text-[var(--color-parchment)]">
            「{extra}」
          </p>
        </div>
      )}
    </div>
  )
}
