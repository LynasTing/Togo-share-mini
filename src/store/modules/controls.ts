import { defineStore } from "pinia"
import type { batteryCtrlType } from '@/types/controls'
import type { SelectableCoupon, MyCoupon } from '@/types/assets/coupon'

export default defineStore('controls', {
  state: () => ({
    ctrlBattery: {} as batteryCtrlType,
    ctrlType: '',
    hasCoupon: false,
    payCoupon: {} as MyCoupon | SelectableCoupon
  }),
  actions: {
    /**
     * 用户当前是否拥有优惠券
     */
    setHasCoupon(val: boolean) {
      this.hasCoupon = val
    },
    // 用户当前操作电池信息
    setCtrlBattery(val: batteryCtrlType) {
      this.ctrlBattery = val
    },
    // 用户当前操作电池类型(租赁/归还)
    setCtrlType(val: string) {
      this.ctrlType = val
    },
    // 用户当前选中优惠券
    setPayCoupon(val: MyCoupon | SelectableCoupon) {
      this.payCoupon = val
    },
  }
})