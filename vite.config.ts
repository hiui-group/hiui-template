import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: '/hiui-template/',
  plugins: [react()],

  resolve: {
    alias: {
      '@hi-ui/schema-types': path.resolve(
        __dirname,
        'src/typical-page-reuse/shims/schema-types-empty.js',
      ),
    },
  },
})
