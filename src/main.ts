import { createSSRApp } from "vue";
import App from "./App.vue";
import "@/assets/style/iconfont.css";

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
