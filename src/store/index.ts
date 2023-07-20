import { createPinia } from "pinia"
import useGlobal from './modules/global'
import useControls from './modules/controls'

const store = createPinia()
export default function useStore() {
  return {
    global: useGlobal(),
    controls: useControls()
  }
}
export { store }