import { defineConfig } from 'vite'
import simpleHtmlPlugin from 'vite-plugin-simple-html'

export default defineConfig({
  base: '/library-the-odin-project/',
  plugins: [simpleHtmlPlugin({ minify: true })],
})
