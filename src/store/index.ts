import { createPinia } from "pinia"
import useGlobal from './modules/global'

const store = createPinia()
export default function useStore() {
  return {
    global: useGlobal()
  }
}
export { store }