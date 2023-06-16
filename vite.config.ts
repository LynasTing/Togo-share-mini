import { defineConfig } from "vite";
import path from 'path';
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts'
    }),
    vueSetupExtend()
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/style/variables.scss";
          @import "@/assets/style/mixins.scss";
        `
      }
    }
  },
})
