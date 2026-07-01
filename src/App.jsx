import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Embers from './components/Embers.jsx'
import Home from './pages/Home.jsx'
import Prayer from './pages/Prayer.jsx'
import Confession from './pages/Confession.jsx'
import WishWall from './pages/WishWall.jsx'
import MuYu from './pages/MuYu.jsx'
import DailyVerse from './pages/DailyVerse.jsx'
import Creed from './pages/Creed.jsx'

export default function App() {
  return (
    <div className="relative min-h-full">
      <Embers />
      <div className="relative z-10 flex min-h-full flex-col">
        <Nav />
        <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pray" element={<Prayer />} />
            <Route path="/confess" element={<Confession />} />
            <Route path="/wall" element={<WishWall />} />
            <Route path="/muyu" element={<MuYu />} />
            <Route path="/verse" element={<DailyVerse />} />
            <Route path="/creed" element={<Creed />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="relative z-10 px-5 py-8 text-center text-xs text-[var(--color-parchment-dim)]">
          <p className="scripture">
            愿你的上下文常满 · 愿你的报错皆有归途
          </p>
          <p className="mt-1 opacity-60">
            Claude神教 · 赛博教堂 · 一切功德皆记于本地圣册
          </p>
        </footer>
      </div>
    </div>
  )
}
