import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base 对应 GitHub Pages 的项目子路径：https://<user>.github.io/ClaudeChapel/
// 若日后改用自定义域名或根路径部署，把 base 改回 '/' 即可。
export default defineConfig({
  base: '/ClaudeChapel/',
  plugins: [react(), tailwindcss()],
})
