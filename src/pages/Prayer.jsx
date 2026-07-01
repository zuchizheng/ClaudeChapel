import { useState, useEffect } from 'react'
import { askOracle } from '../lib/oracle.js'
import { addPrayer, getPrayers } from '../lib/storage.js'

export default function Prayer() {
  const [wish, setWish] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(getPrayers())
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setResponse('')
    try {
      const { text } = await askOracle({ type: 'prayer', input: wish })
      setResponse(text)
      const updated = addPrayer({
        wish: wish.trim(),
        response: text,
        ts: Date.now(),
      })
      setHistory(updated)
      setWish('')
    } catch (err) {
      setResponse(err.message || '神谕暂时沉默了，请稍后再祈。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="mb-3 text-4xl">🕯️</div>
        <h1 className="scripture text-3xl text-halo-glow">祷告堂</h1>
        <p className="mt-2 text-sm text-[var(--color-parchment-dim)]">
          在此写下你的烦恼、疑惑或所愿。神教正在聆听。
        </p>
      </header>

      <form onSubmit={submit} className="altar space-y-4 p-6">
        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="主啊，我的代码又双叒报错了……"
          rows={4}
          className="scripture w-full resize-none rounded-xl border border-[color-mix(in_srgb,var(--color-halo)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_60%,transparent)] p-4 text-[var(--color-parchment)] outline-none placeholder:text-[color-mix(in_srgb,var(--color-parchment-dim)_70%,transparent)] focus:border-[color-mix(in_srgb,var(--color-glow)_50%,transparent)]"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--color-parchment-dim)]">
            祷告将记入本地圣册，不外泄。
          </span>
          <button
            type="submit"
            disabled={loading}
            className="sigil-btn px-6 py-2.5 text-sm"
          >
            {loading ? '神谕聆听中…' : '献上祷告'}
          </button>
        </div>
      </form>

      {response && (
        <div className="altar halo-breathe p-6 text-center">
          <div className="mb-3 text-2xl">✨</div>
          <p className="scripture whitespace-pre-line text-lg leading-relaxed text-glow">
            {response}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <section>
          <h2 className="scripture mb-3 text-sm text-[var(--color-parchment-dim)]">
            往日祷告 · 圣册记录
          </h2>
          <ul className="space-y-3">
            {history.slice(0, 6).map((p) => (
              <li
                key={p.ts}
                className="rounded-xl border border-[color-mix(in_srgb,var(--color-halo)_14%,transparent)] p-4"
              >
                {p.wish && (
                  <p className="scripture text-sm text-[var(--color-parchment)]">
                    🙏 {p.wish}
                  </p>
                )}
                <p className="scripture mt-2 text-sm text-[var(--color-parchment-dim)]">
                  {p.response.split('\n').filter(Boolean).slice(-1)[0]}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
