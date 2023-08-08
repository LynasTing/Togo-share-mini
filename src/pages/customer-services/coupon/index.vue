<script lang="ts" setup>
import { post } from '@/utils/request'
import useStore from '@/store'
import type { MyCoupon } from '@/types/assets/coupon'

const { controls } = useStore()

/**
 * 优惠券列表
 */
const coupons = ref<MyCoupon[]>()
const getCoupons = () => {
  post<MyCoupon[]>('/account/coupon', '', 'json').then(res => {
    if(res.length) coupons.value = res
  })
}
getCoupons()
// 使用
const useCoupon = (i: MyCoupon) => {
  if(i.status !== 0) {
    uni.showToast({
      title: '当前优惠券已无法使用~',
      icon: 'none',
      duration: 1.5 * 1000
    })
    return
  }
  if(i.type === 0) {
    uni.showModal({
      title: '使用兑换券',
      content: '您确定要兑换当前券吗？',
      success: res => {
        if(res.confirm) {
          post('/account/useExchange', { couponId: i.couponId }, 'json').then(res => {
            if(Object.getOwnPropertyNames(res).length === 0) {
              uni.setStorageSync('account', { ...uni.getStorageSync('account'), comboStatus: '1'} )
              uni.showToast({
                title: '套餐兑换成功',
                icon: 'success',
                duration: 1.5 * 1000
              })
              setTimeout(() => {
                getCoupons()
              }, 1.5 * 1000)
            }
          })
        }
      }
    })
  }else {
    controls.setPayCoupon(i)
    uni.navigateTo({ url: '/pages/tools/activate-package/index' })
  }
}
// 使用规则
const useRules = (e: MyCoupon) => {
  uni.showModal({
    title: '使用规则',
    content: e.useIllustrate,
    showCancel: false,
    confirmText: '我知道了'
  })
}
const formatType = computed(() => {
  return function (type: number) {
    switch (type) {
      case 0:
        return '兑换券'
      case 1:
        return '现金券'
      case 2:
        return '满减券'
      case 3:
        return '折扣券'
    }
  }
})
const formatStatus = computed(() => {
  return function (status: number) {
    switch (status) {
      case 0:
        return '未使用'
      case 1:
        return '已使用'
      case 2:
        return '已过期'
    }
  }
})
</script>

<template>
  <view v-if="coupons?.length" class="coupon-page">
    <view class="coupon flex-row-sb" v-for="item in coupons" :key="item.couponId" >
      <!-- 金额 -->
      <view class="left flex-col--c">
        <view class="mb-20">
          <text class="num" v-if="item.money" :class="item.money?.length > 5 ? 'text-3xl' : ''">{{ item.money }}</text>
          <text class="num" v-if="item.discount">{{ item.discount }}</text>
          <text v-if="item.type === 0" class="exchange">{{ item.comboName }}</text>
          <text v-else>{{ item.type === 3 ? '折' : '元' }}</text>
        </view>
        <view>{{ formatType(item.type) }}<text v-if="item.limitationMoney" class="threshold">满{{ item.limitationMoney }}可用</text></view>
      </view>
      <!-- 有效期 -->
      <view class="validity flex-col-sb-c">
        <view>
          <view>有效期</view>
          <view>2023-05-19</view>
        </view>
        <view class="flex-row-sb-c" @click="useRules(item)">
          <text>使用规则</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </view>
      <view class="use">
        <view>{{ formatStatus(item.status) }}</view>
        <view @click="useCoupon(item)" :class="item.status === 0 ? 'use-btn' : 'use-disable'">{{ item.status === 0 ? '使用' : '无法使用' }}</view>
      </view>
    </view>
  </view>
  <Empty v-else text="您暂无优惠券" />
</template>

<style lang="scss" scoped>
.coupon-page {
  padding: 30rpx;
  .coupon {
    width: 100%;
    height: 230rpx;
    font-size: 28rpx;
    background-image: url('@/static/imgs/mine/coupon_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 30rpx;
    padding: 30rpx 30rpx 30rpx 0;
    & > view {
      flex: 1%
    }
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
      .num {
        font-size: 60rpx;
        margin-right: 10rpx;
      }
      .mb-20 {
        margin-bottom: 10rpx;
        .exchange {
          font-size: 24rpx;
        }
        .text-3xl {
          font-size: 48rpx;
        }
      }
      .threshold {
        font-size: 22rpx;
        color: #ccc;
        margin-left: 6rpx;
      }
    }
    .validity {
      .iconfont {
        margin-left: 10rpx;
      }
    }
    .use {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      view {
        text-align: center;
        line-height: 2em;
      }
      &-btn {
        width: 162rpx;
        height: 60rpx;
        border-radius: 999rpx;
        opacity: 0;
      }
      &-disable {
        width: 162rpx;
        height: 60rpx;
        font-size: 28rpx;
        color: white;
        border-radius: 999rpx;
        opacity: 1;
        background-color: #0a292c;
        z-index: 9;
      }
    }
    
  }
}
</style>