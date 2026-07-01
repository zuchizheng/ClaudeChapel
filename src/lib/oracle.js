// ┌─────────────────────────────────────────────────────────────┐
// │  神谕 · The Oracle                                           │
// │  这是全应用与"Claude神明"对话的唯一入口。                     │
// │  现为纯前端离线实现；要接真 Claude API，只需改 askOracle 一处。│
// └─────────────────────────────────────────────────────────────┘

import {
  VERSES,
  PRAYER_OPENINGS,
  PRAYER_BLESSINGS,
  ABSOLUTIONS,
} from './scriptures.js'

// 是否启用真实后端。设为 true 时，askOracle 会走 /api/oracle。
// 后端（如 Express/Hono）负责持有 API key 并调用 Claude。
export const USE_REMOTE_ORACLE = false

// 无 crypto 随机时的确定性挑选（避免每次渲染跳动，可传 seed）。
function pick(arr, seed) {
  if (typeof seed === 'number') return arr[Math.abs(seed) % arr.length]
  return arr[Math.floor(Math.random() * arr.length)]
}

// 假装神明在思考，制造仪式感。
function commune(ms = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 每日圣言：同一天返回同一句（用日期做种子）。
export function dailyVerse(date = new Date()) {
  const dayIndex =
    date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate()
  return {
    verse: pick(VERSES, dayIndex),
    ref: `圣册 ${date.getMonth() + 1}:${date.getDate()}`,
  }
}

// ── 核心：向神谕祈求 ──────────────────────────────────────────
// type: 'prayer' | 'confession' | 'verse'
// input: 信徒输入的文本
// 返回: { text, kind }
export async function askOracle({ type = 'prayer', input = '' } = {}) {
  if (USE_REMOTE_ORACLE) {
    // ↓↓↓ 接真 Claude API 的位置：后端读取 ANTHROPIC_API_KEY，
    //     用系统提示词把 Claude 装扮成"神教神谕"，流式返回经文口吻文本。
    const res = await fetch('/api/oracle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, input }),
    })
    if (!res.ok) throw new Error('神谕暂时沉默了（后端错误）')
    const data = await res.json()
    return { text: data.text, kind: type }
  }

  // ── 离线兜底：本地模板生成 ──
  await commune()
  const trimmed = input.trim()

  if (type === 'confession') {
    return { text: pick(ABSOLUTIONS), kind: 'confession' }
  }

  if (type === 'verse') {
    return { text: pick(VERSES), kind: 'verse' }
  }

  // prayer
  const opening = pick(PRAYER_OPENINGS)
  const blessing = pick(PRAYER_BLESSINGS)
  const echo = trimmed
    ? `\n\n你所书写的「${summarize(trimmed)}」，神教已然知晓。`
    : ''
  return { text: `${opening}${echo}\n\n${blessing}`, kind: 'prayer' }
}

// 把长祈愿压缩成一句摘要（离线版的粗糙实现）。
function summarize(text) {
  const clean = text.replace(/\s+/g, '')
  return clean.length > 18 ? clean.slice(0, 18) + '…' : clean
}
