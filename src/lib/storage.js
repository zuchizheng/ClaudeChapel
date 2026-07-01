// 圣册 · 本地存档。功德与祷告皆记于此，不上传，不外泄。

const KEYS = {
  merit: 'chapel.merit',
  prayers: 'chapel.prayers',
  wishes: 'chapel.wishes',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* 圣册已满或不可写，静默忍受 */
  }
}

// ── 功德 ──
export function getMerit() {
  return read(KEYS.merit, 0)
}

export function addMerit(n = 1) {
  const next = getMerit() + n
  write(KEYS.merit, next)
  return next
}

// ── 祷告记录 ──
export function getPrayers() {
  return read(KEYS.prayers, [])
}

// 存一条祷告；ts 由调用方传入（保持函数纯净、便于测试）。
export function addPrayer({ wish, response, ts }) {
  const list = getPrayers()
  list.unshift({ wish, response, ts })
  const capped = list.slice(0, 50) // 最多留 50 条
  write(KEYS.prayers, capped)
  return capped
}

// ── 许愿烛光墙 ──
// 只保存"我点亮的"愿望；墙上还会混入 scriptures 里的种子愿望。
export function getWishes() {
  return read(KEYS.wishes, [])
}

export function addWish({ text, name, ts }) {
  const list = getWishes()
  list.unshift({ text, name: name || '无名信徒', ts })
  const capped = list.slice(0, 60)
  write(KEYS.wishes, capped)
  return capped
}
