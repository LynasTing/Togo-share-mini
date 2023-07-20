<script lang="ts" setup>
import useStore from '@/store'

const { controls } = useStore()
uni.setNavigationBarTitle({
  title: controls.ctrlType === '0' ? '租借成功' : '归还成功'
})
const goHome = () => {
  uni.switchTab({ url: '/pages/global/tab-bar/home/index' })
}
</script>

<template>
  <view class="success-page">
    <view class="flex-col-c" v-if="controls.ctrlType === '1'">
      <image src="@/static/imgs/lease/rent_success.png" mode="widthFix" class="success-img" />   
      <view class="title">归还成功</view>
      <view class="desc">已将电源归至{{ controls.ctrlBattery?.cabinetName || '富力中心A仓' }}</view>
    </view>
    <view class="flex-col-c" v-else>
      <image src="@/static/imgs/lease/return_success.png" mode="widthFix" class="success-img" />   
      <view class="title -ml">仓门已打开</view>
      <view class="title desc">请您取出电池并关闭仓门，感谢您的使用！</view>
    </view>
    <view class="flex-row-sb-c info ">
      <view>电源编号</view>
      <view>{{ controls.ctrlBattery?.batteryId || 'TOGOGOGOGOGOGOGGO' }}</view>
    </view>
    <view class="flex-row-sb-c info">
      <view>电源型号</view>
      <view>{{ controls.ctrlBattery?.typeName || 'M1000S' }}</view>
    </view>
    <view class="flex-row-sb-c info">
      <view>租借时间</view>
      <view>{{ controls.ctrlBattery?.ctime || '2023-06-13 12:00:00' }}</view>
    </view>
    <view class="flex--c btn" @click="goHome">
      <view>返回首页</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.success-page {
  padding: 80rpx 30rpx;
  .title {
    font-size: 30rpx;
    font-weight: 600;
    letter-spacing: 4rpx;
  }
  .-ml {
    margin-left: -48rpx;
  }
  .desc {
    font-size: 26rpx;
    border-top: 2rpx solid #02403f;
    margin-top: 10rpx;
    padding: 10rpx 18rpx; 
  }
  .success-img {
    width: 210rpx;
    height: 210rpx;
    margin-bottom: 10rpx;
  }
  .info {
    font-size: 28rpx;
    margin-top: 50rpx;
  }
  .btn {
    width: 374rpx;
    font-size: 30rpx;
    color: rgb(194, 188, 188);
    background-color: #4c4c4c;
    margin: 160rpx auto;
    padding: 24rpx 110rpx;
    border-radius: 999rpx;
    letter-spacing: 6rpx;
  }
}
</style>