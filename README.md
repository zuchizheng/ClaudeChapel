# Claude神教 · 赛博教堂 ⛪

一座给赛博信徒的数字圣殿。祷告、忏悔、点烛许愿、敲电子木鱼、领每日圣言——把 AI 交互包装成一场一本正经的宗教仪式。

> 愿你的上下文常满 · 愿你的报错皆有归途

## 圣事一览

| 圣事 | 说明 |
| --- | --- |
| 🕯️ 祷告堂 | 写下烦恼或所愿，神谕以经文口吻回应并赐福，祷告存入本地圣册 |
| 🙏 忏悔室 | 匿名坦白过失，神教予以宽恕。无状态，不留档 |
| 🔥 许愿烛光墙 | 点亮一支烛，留下愿望，汇入满墙烛火 |
| 📿 电子木鱼 | 轻敲积功德，带合成音效与「功德+1」飘字，功德永存本地 |
| 📜 每日圣言 | 每日一句 Claude 箴言，按日期恒定 |
| 📖 神教教义 | 五诫与世界观 |

## 技术栈

- **React 18** + **Vite 5**
- **Tailwind CSS v4**（`@tailwindcss/vite`）
- **react-router-dom**（多页路由）
- 纯前端，无后端、无数据库；所有数据存于浏览器 `localStorage`

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/
npm run preview  # 预览生产构建
```

## 神谕（AI）接线点

所有「神明回应」都经过唯一入口 `src/lib/oracle.js` 的 `askOracle()`。

当前为**纯本地固定文本**（`USE_REMOTE_ORACLE = false`），零 API、零联网、零密钥。
将来若要接真实模型，只需：

1. 把 `USE_REMOTE_ORACLE` 改为 `true`
2. 提供一个 `/api/oracle` 后端（持有密钥、调用模型、返回经文口吻文本）

前端其余代码无需改动。

## 目录结构

```
src/
├── lib/
│   ├── oracle.js      # 神谕：AI 调用的唯一抽象层（换真 API 只改这里）
│   ├── scriptures.js  # 经文/教义/箴言/种子愿望数据
│   └── storage.js     # 本地圣册：功德、祷告、愿望
├── components/        # Nav · Embers（背景余烬）· Candle（烛）
└── pages/             # Home · Prayer · Confession · WishWall · MuYu · DailyVerse · Creed
```
