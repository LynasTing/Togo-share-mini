import { defineStore } from "pinia";
export default defineStore('global', {
  state: () => ({
    paddingBottomHeight: 0,
    deviceType: ''
  }),
  actions: {
    setPaddingBottomHeight(val: number) {
      this.paddingBottomHeight = val
    },
    setDeviceType(val: string) {
      this.deviceType = val
    }
  }
})