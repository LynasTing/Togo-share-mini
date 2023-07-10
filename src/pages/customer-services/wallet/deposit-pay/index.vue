<script lang="ts" setup>
const currAmount = ref<number>(0)
const changeSpecies = (val: number) => {
  currAmount.value = val
}
</script>

<template>
  <div class="serve-page">
    <view class="species flex-row-sb-c" @click="changeSpecies(0)" :class="currAmount ? '' : 'curr-type'">
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
    </view>
    <view class="species flex-row-sb-c" @click="changeSpecies(3000)" :class="currAmount ? 'curr-type' : ''">
      <view class="flex-c">
        <view class="iconfont icon-rmb"></view>
        <view>
          <view>支付押金</view>
          <view class="text-sm">归还电池后可退</view>
        </view>
      </view>
      <view>
        <view class="text-sm">￥3000.00</view>
      </view>
    </view>
    <view class="flex-row-sb-c pay-card w-full">
      <view class="flex-c">
        <view class="text-sm">金额<text v-show="!currAmount">（免押金）</text>：</view>
        <view class="num">￥{{ currAmount }}</view>
      </view>
      <view>
        <button>立即支付</button>
      </view>
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
      padding: 0 80rpx;
      letter-spacing: 2rpx;
    }
  }
}
</style>