<script lang="ts" setup>
import useStore from '@/store'

const { global } = useStore()

// 跳购买押金
const goPayDeposit = () => {
  uni.navigateTo({ url: '/pages/customer-services/wallet/deposit-pay/index' })
}
// 跳我的押金
const goMine = () => {
  uni.navigateTo({ url: '/pages/customer-services/wallet/my-deposit/index' })
}
// 交易明细
const goRecord = () => {
  uni.navigateTo({ url: '/pages/customer-services/wallet/trading-records/index' })
}
// 跳套餐
const goCombo = () => {
  uni.navigateTo({ url: '/pages/customer-services/wallet/my-combo/index' })
}
</script>

<template>
  <view class="wallet-page">
    <view class="balance-card">
      <view>钱包余额</view>
      <view class="num">0.00</view>
      <view class="flex-row-sb-c">
        <view>暂不提供充值服务</view>
        <view class="btn withdraw">提现</view>
        <view class="btn top-up">充值</view>
      </view>
    </view>
    <view class="brown-card flex-row-sb-c" @click="goPayDeposit" v-if="global.accountInfo.depositStatus == '0'">
      <view>支付押金</view>
      <view class="iconfont icon-youjiantou"></view>
    </view>
    <view class="brown-card flex-row-sb-c" @click="goMine">
      <view>我的押金</view>
      <view class="flex--c">
        <view>共3000.00元</view>
        <view class="iconfont icon-youjiantou" ></view>
      </view>
    </view>
    <view class="brown-card flex-row-sb-c" @click="goCombo">
      <view>我的套餐</view>
      <view class="iconfont icon-youjiantou"></view>
    </view>
    <view class="brown-card flex-row-sb-c" @click="goRecord">
      <view>交易明细</view>
      <view class="iconfont icon-youjiantou"></view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wallet-page {
  height: 100vh;
  color: white;
  background: linear-gradient(to bottom, #9ea1aa, #ededed);
  padding: 30rpx;
  .balance-card {
    font-size: 30rpx;
    padding: 50rpx 40rpx 20rpx 50rpx;
    background: linear-gradient(135deg, transparent 30rpx, rgb(9, 40, 43) 0);
    .num {
      font-size: 36rpx;
      margin: 30rpx 0;
    }
    .btn {
      font-size: 28rpx;
      padding: 10rpx 30rpx;
      border-radius: 999rpx;
    }
    .top-up {
      color: #09282b;
      background-color: $yellow;
    }
    .withdraw {
      color: #09282b;
      background-color: white;
    }
  }
  .brown-card {
    font-size: 26rpx;
    color: white;
    background-color: #343434;
    margin: 20rpx 0;
    padding: 36rpx 30rpx;
  }
}
</style>