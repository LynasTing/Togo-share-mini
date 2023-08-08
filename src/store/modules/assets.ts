import { defineStore } from "pinia"
import type { SelectableCoupon } from '@/types/assets/coupon.ts'

export default defineStore('assets', {
  state: () => ({
    usableCoupons: [] as Array<SelectableCoupon>
  }),
  actions: {
    setUsableCoupons(val: Array<SelectableCoupon>) {
      this.usableCoupons = val
    }
  }
})