import { defineStore } from "pinia"
import type { batteryCtrlType } from '@/types/controls'

export default defineStore('controls', {
  state: () => ({
    ctrlBattery: {} as batteryCtrlType,
    ctrlType: ''
  }),
  actions: {
    // 用户当前操作电池信息
    setCtrlBattery(val: batteryCtrlType) {
      this.ctrlBattery = val
    },
    // 用户当前操作电池信息
      setCtrlType(val: string) {
      this.ctrlType = val
    }
  }
})