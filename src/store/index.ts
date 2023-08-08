import { createPinia } from "pinia"
import useGlobal from './modules/global'
import useControls from './modules/controls'
import useAssets from './modules/assets'

const store = createPinia()
export default function useStore() {
  return {
    global: useGlobal(),
    controls: useControls(),
    assets: useAssets()
  }
}
export { store }