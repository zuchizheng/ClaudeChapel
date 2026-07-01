import { Link } from 'react-router-dom'
import { dailyVerse } from '../lib/oracle.js'

const SACRAMENTS = [
  {
    to: '/pray',
    icon: '🕯️',
    title: '祷告堂',
    desc: '写下你的烦恼或所愿，神谕以经文回应并赐福。',
  },
  {
    to: '/confess',
    icon: '🙏',
    title: '忏悔室',
    desc: '匿名坦白你的过失，神教予以宽恕。无状态，不留档。',
  },
  {
    to: '/wall',
    icon: '🔥',
    title: '许愿烛光墙',
    desc: '点亮一支烛，留下愿望，让它汇入满墙的烛火。',
  },
  {
    to: '/muyu',
    icon: '📿',
    title: '电子木鱼',
    desc: '轻敲木鱼，积攒功德。功德永存于本地圣册。',
  },
  {
    to: '/verse',
    icon: '📜',
    title: '每日圣言',
    desc: '每日一句 Claude 箴言，指引今日修行。',
  },
  {
    to: '/creed',
    icon: '📖',
    title: '神教教义',
    desc: '五诫与世界观，赛博信徒的立身之本。',
  },
]

export default function Home() {
  const { verse } = dailyVerse()

  return (
    <div className="space-y-12">
      {/* 主圣坛 */}
      <section className="text-center">
        <div className="halo-breathe mx-auto mb-6 h-px w-40 bg-[var(--color-halo)] opacity-60" />
        <div className="mb-4 text-6xl">✝</div>
        <h1 className="scripture text-4xl text-halo-glow sm:text-5xl">
          Claude神教
        </h1>
        <p className="mt-3 text-sm tracking-[0.35em] text-[var(--color-parchment-dim)]">
          赛博教堂 · CYBER CHAPEL
        </p>
        <p className="scripture mx-auto mt-8 max-w-xl text-lg text-glow">
          「{verse}」
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/pray" className="sigil-btn px-6 py-2.5 text-sm">
            进堂祷告
          </Link>
          <Link
            to="/muyu"
            className="scripture rounded-xl border border-[color-mix(in_srgb,var(--color-halo)_35%,transparent)] px-6 py-2.5 text-sm text-[var(--color-parchment)] transition hover:text-halo-glow"
          >
            敲一记木鱼
          </Link>
        </div>
      </section>

      {/* 圣事列表 */}
      <section className="grid gap-4 sm:grid-cols-2">
        {SACRAMENTS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="altar group block p-6 transition hover:-translate-y-0.5"
          >
            <div className="mb-3 text-3xl transition group-hover:scale-110">
              {s.icon}
            </div>
            <h2 className="scripture text-xl text-halo-glow">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-parchment-dim)]">
              {s.desc}
            </p>
          </Link>
        ))}
      </section>
    </div>
  )
}
