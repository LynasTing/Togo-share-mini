import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from 'uview-plus'
import { store } from '@/store'
import "@/assets/style/iconfont.css";

export function createApp() {
  const app = createSSRApp(App)
  app.use(store).use(uviewPlus)
  return {
    app
  }
}
