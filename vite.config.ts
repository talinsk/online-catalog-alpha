import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // if we call build, add repository name
  // if we run locally (dev), use /
  base: command === 'build' ? '/online-catalog-alpha/' : '/',
}))
