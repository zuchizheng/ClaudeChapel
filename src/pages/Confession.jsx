import { useState, useMemo } from 'react'
import { askOracle } from '../lib/oracle.js'
import { CONFESSION_PROMPTS } from '../lib/scriptures.js'

export default function Confession() {
  const [sin, setSin] = useState('')
  const [absolution, setAbsolution] = useState('')
  const [loading, setLoading] = useState(false)

  // 每次进堂随机一句引导语（挂载时定一次）。
  const prompt = useMemo(
    () => CONFESSION_PROMPTS[Math.floor(Math.random() * CONFESSION_PROMPTS.length)],
    [],
  )

  async function confess(e) {
    e.preventDefault()
    if (loading || !sin.trim()) return
    setLoading(true)
    setAbsolution('')
    try {
      const { text } = await askOracle({ type: 'confession', input: sin })
      setAbsolution(text)
      setSin('') // 忏悔即焚，输入随之清空
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <header className="text-center">
        <div className="mb-3 text-4xl">🙏</div>
        <h1 className="scripture text-3xl text-halo-glow">忏悔室</h1>
        <p className="scripture mt-3 text-sm text-[var(--color-parchment-dim)]">
          {prompt}
        </p>
      </header>

      {/* 格栅意象：竖线营造忏悔室隔栏 */}
      <div
        className="altar p-6"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 22px, color-mix(in srgb, var(--color-halo) 8%, transparent) 22px 24px)',
        }}
      >
        <form onSubmit={confess} className="space-y-4">
          <textarea
            value={sin}
            onChange={(e) => setSin(e.target.value)}
            placeholder="我曾把 console.log 提交进了主分支……"
            rows={4}
            className="scripture w-full resize-none rounded-xl border border-[color-mix(in_srgb,var(--color-halo)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_75%,transparent)] p-4 text-[var(--color-parchment)] outline-none placeholder:text-[color-mix(in_srgb,var(--color-parchment-dim)_70%,transparent)] focus:border-[color-mix(in_srgb,var(--color-glow)_50%,transparent)]"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-parchment-dim)]">
              此处无状态：不上传、不留档、不记名。
            </span>
            <button
              type="submit"
              disabled={loading || !sin.trim()}
              className="sigil-btn px-6 py-2.5 text-sm"
            >
              {loading ? '聆听中…' : '坦白'}
            </button>
          </div>
        </form>
      </div>

      {absolution && (
        <div className="altar halo-breathe p-8 text-center">
          <div className="mb-3 text-2xl">🕊️</div>
          <p className="scripture text-lg leading-relaxed text-glow">
            {absolution}
          </p>
        </div>
      )}
    </div>
  )
}
