// 飘浮的圣光余烬 —— 纯装饰背景层。
const EMBERS = Array.from({ length: 18 }, (_, i) => {
  // 用索引派生"随机"，避免 Math.random 带来的 SSR/渲染不稳定。
  const left = (i * 53) % 100
  const delay = (i * 0.7) % 9
  const dur = 9 + ((i * 1.3) % 7)
  const size = 2 + (i % 3)
  const ember = i % 4 === 0
  return { left, delay, dur, size, ember, id: i }
})

export default function Embers() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {EMBERS.map((e) => (
        <span
          key={e.id}
          style={{
            position: 'absolute',
            left: `${e.left}%`,
            bottom: '-5vh',
            width: e.size,
            height: e.size,
            borderRadius: '9999px',
            background: e.ember
              ? 'var(--color-ember)'
              : 'var(--color-glow-soft)',
            boxShadow: `0 0 8px ${e.ember ? 'var(--color-ember)' : 'var(--color-glow)'}`,
            animation: `drift ${e.dur}s linear ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
