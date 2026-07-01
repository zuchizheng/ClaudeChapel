import { useState, useEffect, useRef, useCallback } from 'react'
import { getMerit, addMerit } from '../lib/storage.js'

// 用 Web Audio 合成一记"笃"声，免去音频资源。
function useWoodblock() {
  const ctxRef = useRef(null)
  return useCallback(() => {
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext
        ctxRef.current = new AC()
      }
      const ctx = ctxRef.current
      if (ctx.state === 'suspended') ctx.resume()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(420, now)
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.06)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.5, now + 0.005)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.2)
    } catch {
      /* 无音频环境，静默 */
    }
  }, [])
}

let floatId = 0

export default function MuYu() {
  const [merit, setMerit] = useState(0)
  const [floats, setFloats] = useState([])
  const [struck, setStruck] = useState(false)
  const knock = useWoodblock()

  useEffect(() => {
    setMerit(getMerit())
  }, [])

  function strike() {
    const next = addMerit(1)
    setMerit(next)
    knock()

    // 木鱼下沉动画
    setStruck(true)
    setTimeout(() => setStruck(false), 90)

    // 飘字 "功德+1"
    const id = ++floatId
    const offset = (id % 5) * 12 - 24
    setFloats((f) => [...f, { id, offset }])
    setTimeout(() => {
      setFloats((f) => f.filter((x) => x.id !== id))
    }, 1000)
  }

  return (
    <div className="space-y-8 text-center">
      <header>
        <h1 className="scripture text-3xl text-halo-glow">电子木鱼</h1>
        <p className="mt-2 text-sm text-[var(--color-parchment-dim)]">
          轻敲以积功德。心诚则灵，多敲无妨。
        </p>
      </header>

      <div className="altar mx-auto max-w-sm p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-parchment-dim)]">
          累计功德
        </p>
        <p className="scripture mt-1 text-5xl text-halo-glow tabular-nums">
          {merit.toLocaleString()}
        </p>

        <div className="relative mt-8 flex justify-center">
          {/* 飘字层 */}
          {floats.map((f) => (
            <span
              key={f.id}
              className="merit-float scripture pointer-events-none absolute -top-2 text-lg text-glow"
              style={{ left: `calc(50% + ${f.offset}px)` }}
            >
              功德 +1
            </span>
          ))}

          <button
            onClick={strike}
            aria-label="敲木鱼"
            className="select-none text-8xl transition-transform duration-75 focus:outline-none"
            style={{
              transform: struck ? 'scale(0.92) translateY(4px)' : 'scale(1)',
              filter:
                'drop-shadow(0 0 24px color-mix(in srgb, var(--color-glow) 50%, transparent))',
            }}
          >
            🪘
          </button>
        </div>

        <p className="mt-6 text-xs text-[var(--color-parchment-dim)]">
          功德永存于本地圣册，不上传服务器。
        </p>
      </div>
    </div>
  )
}
