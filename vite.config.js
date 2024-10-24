import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    root: 'src',
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext'
  }
})
