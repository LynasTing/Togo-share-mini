<script lang="ts" setup>
</script>

<template>
  <view class="w-full h-screen relative top-0 left-0 scan-page relative">
    <view class="scan-box absolute top-half left-half overflow-h">
      <!-- <camera device-position="back" flash="off" binderror="error" mode="scanCode" resolution="high" style="width: 500rpx; height: 500rpx; border-radius: 24rpx;" /> -->
    </view>
    <view class="desc absolute">请扫描租赁柜屏幕上的二维码</view>
    <view class="controls fixed bottom-0 left-0 flex-c">
      <view>
        <view class=""></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.scan-page {
  background: rgba(50, 50, 50, 1);
  .scan-box {
    transform: translate(-50%, -50%);
    width: 500rpx;
    height: 500rpx;
    border-radius: 24rpx;
    border: 1rpx solid #FDC401;
  }
  .desc {
    bottom: 24%;
    left: 0%;
    width: 100%;
    color: white;
    font-size: 30rpx;
    text-align: center;
    letter-spacing: 4rpx;
  }
  .controls {
    width: 100%;
    padding: 60rpx 60rpx;
    background-color: red;
  }
}

</style>