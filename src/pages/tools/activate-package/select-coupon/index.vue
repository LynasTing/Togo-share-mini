<script lang="ts" setup>
import { post } from '@/utils/request'
import { splitString } from '@/utils/tools'
import type { SelectableCoupon } from '@/types/assets/coupon.ts'
import { getMaturityTime } from '@/utils/tools'
import useStore from '@/store'
import { onShow } from '@dcloudio/uni-app'

const { controls, assets } = useStore()
/**
 * 可用券列表
 */
const coupons = ref<SelectableCoupon[]>([])
onShow(() => {
  coupons.value = assets.usableCoupons
  if(controls.payCoupon.couponId) {
    const i = coupons.value.findIndex(i => i.couponId === controls.payCoupon.couponId)
    coupons.value[i].showChoose = true
    currCoupon.value = coupons.value[i]
  }
})

/**
 * 当前选中优惠券
 */
const currCoupon = ref({} as SelectableCoupon)
const radioChange = (e: SelectableCoupon) => {
  const i = coupons.value.indexOf(e)
  if(coupons.value[i].showChoose) {
    coupons.value[i].showChoose = false
    currCoupon.value = {} as SelectableCoupon
  }else {
    coupons.value.forEach(i => i.showChoose = false)
    coupons.value[i].showChoose = true
    currCoupon.value = coupons.value[i]
  }
}

// 优惠券选择完毕
const chooseCoupon = () => {
  controls.setPayCoupon(currCoupon.value)
  uni.navigateBack()
}
</script>

<template>
  <view class="coupon-page">
    <view class="desc">
      请选择优惠券
      <text>可选1张</text>
    </view>
    <scroll-view scroll-y class="coupon-list w-full h-screen">
      <view class="coupon flex-row-sb-c" v-for="(item, index) in coupons" :key="index" @click="radioChange(item)">
        <view class="flex">
          <view class="flex-col-sb-c coupon-discount">
            <view class="coupon-discount-price price-color">
              <text v-if="item.money">￥</text>
              <text class="text-3xl">{{ item.discount ? item.discount : item.money }}</text>
              <text v-if="item.discount">折</text>
            </view>
            <view v-if="item.type !== 1">{{ `满${item.limitationMoney}可用` }}</view>
          </view>
          <view class="flex-col-se">
            <view class="coupon-name">{{ splitString(item.name, 11) }}</view>
            <view class="coupon-time price-color">{{ getMaturityTime(item.ctime, item.effectiveDay) }} 到期</view>
          </view>
        </view>
        <view class="coupon-check-box flex--c">
          <view class="iconfont icon-xuanzhong" v-show="item.showChoose"></view>
        </view>
      </view>
    </scroll-view>
    <view class="btn-box fixed right-0 bottom-0 w-full flex-c">
      <view v-if="!currCoupon.couponId">您还未选择优惠券</view>
      <view v-else>
        <text>已选1张，</text>
        <text>可{{ currCoupon?.discount ? '打' : '减' }}</text>
        <text class="price-color">
          <text v-if="currCoupon?.money">￥</text>
          <text class="text-3xl">{{ currCoupon?.discount ? currCoupon?.discount :  currCoupon.money }}</text>
          <text v-if="currCoupon?.discount">折</text>
        </text>
      </view>
      <view class="btn-box-submit" @click="chooseCoupon">确定</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.price-color {
  color: #ea6750;
}
.text-3xl {
  font-weight: 600;
  font-size: 50rpx;
}
.coupon-page {
  background-color: #f6f6f6;
  margin-bottom: 12rpx;
  padding: 30rpx;
  .desc {
    font-size: 30rpx;
    text {
      font-size: 24rpx;
      color: #999;
      margin-left: 10rpx;
    }
  }
  .coupon-list {
    padding: 20rpx 0 210rpx;
    background-color: #f6f6f6;
    border-radius: 20rpx;
    .coupon {
      margin-bottom: 20rpx;
      padding: 40rpx 30rpx;
      background-color: white;
      border-radius: 20rpx;
      &-discount {
        font-size: 26rpx;
        color: #777;
        margin-right: 36rpx;
      }
      &-name {
        font-size: 32rpx;
        font-weight: 600;
      }
      &-time {
        font-size: 24rpx ;
        color: #ea6750;
      }
      &-check-box {
        width: 60rpx;
        height: 60rpx;
        border-radius: 999rpx;
        border: 1rpx solid $yellow;
        .iconfont {
          font-size: 40rpx;
          color: $yellow;
        } 
      }
    }
  }
  .btn-box {
    justify-content: flex-end;
    background-color: white;
    padding: 14rpx 30rpx 40rpx 0;
    &-submit {
      color: white;
      background-color: #51b2f6;
      margin-left: 18rpx;
      padding: 16rpx 46rpx;
      border-radius: 999rpx;
    }
  }
}
</style>