<script lang="ts" setup>
import { onHide, onUnload } from '@dcloudio/uni-app';

const nowTime = ref<string>('')
// 实时时间
const displayTime = (timestamp: number) => {
  const elapsedTime = ((Date.now() - timestamp) / 1000 )
  let h: number, m: number, s: number
  const padZero = (val: number) => {
    return (val < 10 ? '0' : '') + val
  }
  if(elapsedTime >= 3600) {
    h = Math.floor(elapsedTime / 3600)
    m = Math.floor((elapsedTime % 3600) / 60)
    s = Math.floor(elapsedTime % 60)
  }else {
    h = Math.floor(elapsedTime / 3600)
    m = Math.floor(elapsedTime / 60) 
    s = Math.floor(elapsedTime % 60) 
  }
  nowTime.value = padZero(h) + '：' + padZero(m) + '：' + padZero(s)
}
displayTime(1688613926394)
const intervalId = setInterval(() => {
  displayTime(1688613926394)
}, 1000)
// 小程序隐藏或页面销毁时清除定时器
onHide(() => {
  clearInterval(intervalId)
})
onUnload(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <view class="batter-page">
    <view class="flex-col-c">
      <text class="using">正在使用</text>
      <text>{{ nowTime }}</text>
      <image src="@/static/imgs/home/battery.png" mode="widthFix" class="battery" />
    </view>
    <view class="info">
      <view>电池编号： HTDDHTDDHTDDHTDD</view>
      <view>电池类型： HTDDHTDDHTDDHTDD</view>
      <view>电池容量： HTDDHTDDHTDDHTDD</view>
      <view>租用时间： HTDDHTDDHTDDHTDD</view>
    </view>
    <view class="btn">
      归还电源
    </view>
  </view>
</template>

<style lang="scss" scoped>
.batter-page {
  padding: 60rpx 30rpx;
  .using {
    font-size: 28rpx;
  }
  .battery {
    width: 50%;
    margin-top: 40rpx;
  }
  .info {
    font-size: 30rpx;
    color: #747577;
    line-height: 2.5em;
    background-color: #f2f6f9;
    margin: 100rpx auto;
    padding: 30rpx 40rpx;
    border-radius: 20rpx;
  }
  .btn {
    width: 70%;
    font-size: 34rpx;
    font-weight: 600;
    color: $darkgray;
    background-color: $yellow;
    margin: 0 auto;
    padding: 20rpx 0;
    text-align: center;
    border-radius: 999rpx;
    letter-spacing: 2rpx;
  }
}
</style>