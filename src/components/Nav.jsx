import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: '圣殿', end: true },
  { to: '/pray', label: '祷告堂' },
  { to: '/confess', label: '忏悔室' },
  { to: '/wall', label: '烛光墙' },
  { to: '/muyu', label: '木鱼' },
  { to: '/verse', label: '每日圣言' },
  { to: '/pantheon', label: '神谱' },
  { to: '/creed', label: '教义' },
]

export default function Nav() {
  return (
    <header className="relative z-10 border-b border-[color-mix(in_srgb,var(--color-halo)_18%,transparent)]">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <NavLink to="/" className="group flex items-center gap-2">
          <span className="text-2xl">⛪</span>
          <span className="scripture text-lg text-halo-glow">
            Claude神教
          </span>
        </NavLink>
        <ul className="flex flex-wrap items-center gap-1 text-sm">
          {LINKS.filter((l) => l.to !== '/').map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  [
                    'scripture rounded-lg px-3 py-1.5 transition',
                    isActive
                      ? 'text-glow bg-[color-mix(in_srgb,var(--color-glow)_16%,transparent)]'
                      : 'text-[var(--color-parchment-dim)] hover:text-[var(--color-parchment)]',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
