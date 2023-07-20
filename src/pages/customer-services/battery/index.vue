<script lang="ts" setup>
import { post } from '@/utils/request';
import { onHide, onUnload } from '@dcloudio/uni-app';
import type { UserBattery } from '@/types/assets'
import { displayTime } from '@/utils/tools.js'
import useStore from '@/store';

const { global } = useStore()
// 电池信息
const nowTime = ref<string>('')
const batteryInfo = ref<UserBattery>()
post<UserBattery>('/account/battery', '', 'json').then(res => {
  if(res.batteryId) {
    batteryInfo.value = res 
    nowTime.value = displayTime(batteryInfo.value.ctime)
  }
})
const intervalId = setInterval(() => {
  nowTime.value = displayTime(batteryInfo.value.ctime)
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
  <view class="batter-page" v-if="global.accountInfo.batteryStatus === '1'">
    <view class="flex-col-c">
      <text class="using">正在使用</text>
      <text>{{ nowTime }}</text>
      <image src="@/static/imgs/home/battery.png" mode="widthFix" class="battery" />
    </view>
    <view class="info">
      <view>电池编号： {{ batteryInfo?.batteryId || '--' }}</view>
      <view>电池类型： {{ batteryInfo?.typeName || '--' }}</view>
      <view>电池容量： {{ batteryInfo?.capacity || '--' }}</view>
      <view>租用时间： {{ batteryInfo?.ctime || '--' }}</view>
    </view>
    <view class="btn">
      归还电源
    </view>
  </view>
  <Empty v-else text="您还未租借电池" />
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