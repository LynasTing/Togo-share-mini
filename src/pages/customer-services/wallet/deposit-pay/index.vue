<script lang="ts" setup>
import { post, fetchAli } from '@/utils/request'
import useStore from '@/store'
import type { DepositPay } from '@/types/assets/deposit'
import type { WxPay } from '@/types/assets/payment'
import { payHook } from '@/hooks'
import { onShow } from '@dcloudio/uni-app'

const { global } = useStore()
const deposits = ref<DepositPay[]>()
onShow(() => {
  post('/changing/tuGeGetDepositList', { organizationId: global.accountInfo.organizationId || 143 }, 'json').then(res => {
    deposits.value = res as DepositPay[]
    if(deposits.value.length) {
      currDeposit.value.amount = deposits.value[0].depositMoney
      currDeposit.value.id = deposits.value[0].id
    }
  })
})

/**
 * 切换押金
 */
const changeSpecies = (item: DepositPay, index: number) => {
  currDeposit.value.amount = item!.depositMoney
  currDeposit.value.id = item!.id
  currDeposit.value.index = index
}
/**
 * 当前选择押金
 */
const currDeposit = ref({
  id: -1,
  index: 0,
  amount: 0
})
const payToDeposit = () => {
  // #ifdef MP-WEIXIN
  post<WxPay>('/miniapp/payDeposit', { organizationId: global.accountInfo.organizationId, openId: global.accountInfo.openId, id: currDeposit.value.id }, '')
  .then(res => {
    if(res.paySign) {
      payHook(res)
      .then(() => {
        uni.setStorageSync('accountInfo', { ...uni.getStorageSync('accountInfo'), depositStatus: '1' })
        global.setAccountInfo({ ...global.accountInfo, depositStatus: '1' })
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
  fetchAli('pay/aliFundFreezeOrder', { organizationId: global.accountInfo.organizationId, accountUid: global.accountInfo.accountUid, depositId: currDeposit.value.id })
  .then(res => {
    my.tradePay({
      orderStr: res,
      success: res => {
        if(res.resultCode == '9000') {
          uni.showToast({
            title: '支付成功！',
            duration: 2000
          })
        }
      },
      fail: err => {
        console.log(`失败err + ::>>`, err)
      }
    })
  })
  // #endif
}
</script>

<template>
  <div class="serve-page">
    <!-- <view class="species flex-row-sb-c" @click="changeSpecies" :class="currAmount ? '' : 'curr-type'">
      <view class="flex-c">
        <view class="iconfont icon-weixin"></view>
        <view>
          <view>微信支付免押金</view>
          <view class="text-sm">微信信用分≥550分</view>
        </view>
      </view>
      <view>
        <view>免押金</view>
        <view class="text-sm free">￥3000.00</view>
      </view>
    </view> -->
    <block v-if="deposits?.length">
      <view class="species flex-row-sb-c" v-for="(item, index) in deposits" :key="index" @click="changeSpecies(item, index)" :class="currDeposit.index === index ? 'curr-type' : ''">
        <view class="flex-c">
          <view class="iconfont icon-rmb"></view>
          <view>
            <view>支付押金</view>
            <view class="text-sm">{{ item.batteryTypeName || '--'}}(归还电池后可退)</view>
          </view>
        </view>
        <view>
          <view class="text-sm">￥{{ item.depositMoney }}</view>
        </view>
      </view>
    </block>
    <Empty v-else text="您当前地区没有可缴纳押金，请联系管理员" />
    <view class="flex-row-sb-c pay-card w-full" v-if="deposits?.length">
      <view class="flex-c">
        <view class="text-sm">金额<text v-show="!currDeposit.amount">（免押金）</text>：</view>
        <view class="num">￥{{ currDeposit.amount }}</view>
      </view>
      <button @click="payToDeposit">立即支付</button>
    </view>
  </div>
</template>

<style lang="scss" scoped>
.serve-page {
  height: 100vh;
  padding: 30rpx;
  background-color: #fafafa;
  .species {
    font-size: 30rpx;
    color: white;
    background-color: #bbbbbb;
    border-radius: 14rpx;
    margin-bottom: 30rpx;
    padding: 52rpx 30rpx 40rpx 30rpx;
    .iconfont {
      margin-right: 20rpx;
    }
    .icon-weixin {
      font-size: 60rpx;
    }
    .icon-rmb {
      font-size: 50rpx;
    }
    .text-sm {
      font-size: 26rpx;
      margin-top: 12rpx;
    }
    .free {
      text-decoration: line-through;
    }
  }
  .curr-type {
    background-color: #01ae52;
  }
  .pay-card {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 168rpx;
    background-color: white;
    padding: 52rpx 32rpx 36rpx 32rpx;
    box-shadow: 0 -1rpx 10rpx 0 rgba(231, 227, 227, 0.7);
    z-index: 9;
    .text-sm {
      font-size: 24rpx;
      color: #ccc;
    }
    .num {
      color: #af0100;
    }
    button {
      font-size: 30rpx;
      color: white;
      background-color: $yellow;
      border-radius: 999rpx;
      margin: 0;
      padding: 0 80rpx;
      letter-spacing: 2rpx;
    }
  }
}
</style>