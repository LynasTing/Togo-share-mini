import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from 'uview-plus'
import { store } from '@/store'
import "@/assets/style/iconfont.css";
import Empty from '@/components/basic-empty/Empty.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.component('Empty', Empty)
  app.use(store).use(uviewPlus)
  return {
    app
  }
}
