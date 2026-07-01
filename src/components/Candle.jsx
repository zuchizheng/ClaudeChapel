// 一支会摇曳的烛。纯 CSS/SVG，无资源。
export default function Candle({ size = 44, lit = true }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 40 64"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      {/* 光晕 */}
      {lit && (
        <circle
          cx="20"
          cy="14"
          r="16"
          fill="var(--color-ember)"
          opacity="0.18"
          className="candle-flame"
        />
      )}
      {/* 烛身 */}
      <rect x="14" y="26" width="12" height="34" rx="3" fill="#efe7cf" />
      <rect x="14" y="26" width="4" height="34" rx="2" fill="#fff" opacity="0.35" />
      {/* 烛芯 */}
      <rect x="19" y="20" width="2" height="8" fill="#4a3b2a" />
      {/* 火焰 */}
      {lit && (
        <g className="candle-flame">
          <ellipse cx="20" cy="14" rx="5" ry="9" fill="var(--color-ember)" />
          <ellipse cx="20" cy="15" rx="2.6" ry="5.5" fill="#ffd98a" />
          <ellipse cx="20" cy="16" rx="1.2" ry="3" fill="#fff6df" />
        </g>
      )}
    </svg>
  )
}
