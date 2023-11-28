import { defineConfig } from 'vite'
import simpleHtmlPlugin from 'vite-plugin-simple-html'
import { webfontDownload } from 'vite-plugin-webfont-dl'

export default defineConfig({
  base: '/library-the-odin-project/',
  plugins: [simpleHtmlPlugin({ minify: true }), webfontDownload()],
})
