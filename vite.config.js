import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: new URL('src/lib/index.ts', import.meta.url).pathname,
      name: 'svelte-trigger-action',
    },
  },
})
