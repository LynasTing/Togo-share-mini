<script lang="ts" setup>
import { post } from '@/utils/request'
import useStore from '@/store'
import type { ComboList } from '@/types/assets/combo'
import type { WxPay } from '@/types/assets/payment'
import type { MyCoupon } from '@/types/assets/coupon'
import { weChatPayHook, alipayHook } from '@/hooks'
import { onUnload } from '@dcloudio/uni-app'
import type { SelectableCoupon } from '@/types/assets/coupon.ts'

const { global, controls } = useStore()
const currIndex = ref<number>(0)
const selectCombo = ref<ComboList>() 
const combos = ref<ComboList[]>([])
const getCombos = () => {
  post<ComboList[]>('/account/comboList', { organizationId: 143 }, 'json').then(res => {
    if(res.length) {
      combos.value = res
      selectCombo.value = res[0]
    }
  })
}
getCombos()
watch([() => controls.payCoupon, () => combos.value.length], ([n1], [n2]) => {
  if(n1?.couponId && n2) {
    combos.value.forEach(item => {     
      switch (n1.type) {
        case 1:
          item.discountedPrice = (Number(item.comboMoney) - Number(n1.money)).toFixed(2)
          break;
        case 2:
          if(Number(item.comboMoney) >= Number(n1.limitationMoney)) item.discountedPrice = (Number(item.comboMoney) - Number(n1.money)).toFixed(2)
          break
        case 3: 
          item.discountedPrice = (Math.floor(Number(item.comboMoney) * (Number(n1.discount) / 10) * 100) / 100).toFixed(2)
          break
      }
    })
  }
}, { immediate: true, deep: true })

// 选择套餐
const comboSelect = (item: ComboList, i: number) => {
  selectCombo.value = item
  currIndex.value = i
}
// 选择优惠券
const chooseCoupon = () => {
  uni.navigateTo({ url: '/pages/tools/activate-package/select-coupon/index' })
}

/**
 * 可用优惠券列表
 * @function 
 */
const { assets } = useStore()
post<SelectableCoupon[]>('/account/available', '', 'json').then(res => {
  assets.setUsableCoupons(res)
})

// 付款
const bayCombo = () => {
  // #ifdef MP-WEIXIN
  const weixinPayParams = ref({
    openId: global.accountInfo.openId,
    organizationId: global.accountInfo.organizationId,
    comboId: selectCombo.value?.id,
    couponId: controls.payCoupon.couponId || ''
  })
  post<WxPay>('/wallet/user/buyCombo', { ...weixinPayParams.value }).then(res => {
    if(res.paySign) {
      weChatPayHook(res)
      .then(() => {
        uni.setStorageSync('accountInfo', { ...uni.getStorageSync('account'), comboStatus: '1' })
        global.setAccountInfo({ ...global.accountInfo, comboStatus: '1' })
        setTimeout(() => {
          uni.navigateBack()
        }, 1.5 * 1000)
      })
      .catch(() => {
        console.log(`支付失败, 走了catch + ::>>`, )
      })
    }
  })
  // #endif
  // #ifdef MP-ALIPAY  
  my.getAuthCode({
    scopes: 'auth_base',
    success: res => {
      const params = ref({
        authCode: res.authCode,
        organizationId: 143,
        comboId: selectCombo.value?.id,
        couponId: controls.payCoupon.couponId || ''
      })
      post('/changing/tuGeAliPayCombo', { ...params.value }, 'json').then((res: any) => {
        alipayHook(res.tradeNo)
      })
    }
  })
 
  // #endif
}
onUnload(() => {
  controls.setPayCoupon({} as MyCoupon)
})
const isAliPay = ref<boolean>(false)
// #ifdef MP-ALIPAY
// isAliPay.value = true
// #endif
</script>

<template>
  <view class="active-package flex-col" v-if="!isAliPay">
    <view class="flex-row-sb-c choose-coupon" @click="chooseCoupon" v-if="assets.usableCoupons?.length">
      <view>{{ controls.payCoupon.name ? '已选择优惠券' : '您还未选择优惠券' }}</view>
      <view class="flex-c">
        <text class="price" v-if="controls.payCoupon.name">{{ controls.payCoupon.name || '--'}}</text>
        <text class="iconfont icon-youjiantou"></text>
      </view>
    </view>
    <scroll-view scroll-y class="scroll-y h-full">
      <view class="combo flex-row-sb-c" v-for="(item, index) in combos" :key="index" :class="currIndex === index ? 'select-combo' : ''" @click="comboSelect(item, index)">
        <view>
          <view class="combo-name">{{ item.comboName || '套餐名字xxx' }}</view>
          <view class="">{{ item.comboCount === '9999' ? '无限次换电（不可退）' : `共可换${item.comboCount}次（不可退）` }}</view>
          <view class="">有效期至 2023-10-01</view>
        </view>
        <view class="flex-col">
          <view class="price-now price">￥{{ item.discountedPrice || item.comboMoney }}</view>
          <view class="original-price" v-if="item.discountedPrice">原价:￥{{ item.comboMoney }}</view>
        </view>
      </view>
    </scroll-view>
    <view class="fixed bottom-0 left-0 pay w-full flex-row-sb-c">
      <view class="pay-price">
        <view class="price">￥{{ selectCombo?.discountedPrice || selectCombo?.comboMoney }}</view>
        <view></view>
      </view>
      <view class="pay-btn" @click="bayCombo">立即支付</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.active-package {
  height: 100vh;
  background-color: #e7eaec;
  .choose-coupon {
    font-size: 28rpx;
    background-color: rgb(255, 255, 255);
    margin-top: 30rpx;
    padding: 20rpx 50rpx;
    box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0,0,0,0.16);
    .iconfont {
      margin-left: 10rpx;
    }
  }
  .scroll-y {
    padding: 30rpx 30rpx 150rpx;
  }
  .price {
    color: #FA5151;
  }
  .combo {
    font-size: 24rpx;
    color: #999999;
    line-height: 1.5em;
    background-color: #FFFFFF;
    margin-bottom: 32rpx;
    padding: 34rpx 20rpx 38rpx 30rpx;
    border-radius: 24rpx ;
    border: 2rpx solid transparent;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,95,175,0.1);
    &-name {
      font-size: 32rpx;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #222222;
      margin-bottom: 26rpx;
    }
    .price-now {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 4rpx;
    }
    .original-price {
      text-align: right;
      text-decoration: line-through;
    }
  }
  .select-combo {
    border: 2rpx solid $yellow;
  }
  .pay {
    padding: 30rpx 30rpx 22rpx;
    background-color: #FFFFFF;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,0,0,0.16);
    &-price > view:first-child {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 4rpx;
    }
    &-price > view:last-child {
      font-size: 24rpx;
      font-weight: 500;
    }
    &-btn {
      font-size: 30rpx;
      padding: 24rpx 69rpx;
      color: white;
      background-color: $yellow;
      border-radius: 999rpx;
    }
  }
}
</style>