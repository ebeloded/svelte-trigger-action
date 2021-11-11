import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const name = 'svelte-trigger-action'

export default defineConfig({
  build: {
    lib: {
      entry: new URL('src/lib/index.ts', import.meta.url).pathname,
      formats: ['cjs', 'es'],
      name,
      fileName: (format) =>
        ({
          cjs: 'lib.cjs',
          es: 'lib.js',
        }[format]),
    },
  },
})
