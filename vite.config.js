const { defineConfig } = require('vite')
const { svelte } = require('@sveltejs/vite-plugin-svelte')
const path = require('path')

module.exports = defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      formats: ['cjs', 'es'],
      name: 'svelte-trigger-action',
    },
  },
})
