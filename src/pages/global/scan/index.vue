<script lang="ts" setup>
const flashLight = ref<boolean>(false)
// 打开/关闭手电筒
const flashChange = () => {
  flashLight.value = !flashLight.value
}
</script>

<template>
  <view class="w-full h-screen relative top-0 left-0 scan-page flex-col">
    <view class="relative scan-bg">
      <view class="scan-box absolute top-half left-half overflow-h">
        <view>
          <camera 
            binderror="error" 
            device-position="back" 
            :flash="flashLight ? 'on' : 'off'"
            mode="scanCode" 
            resolution="high" 
            class="w-full h-full"
          />
          <view class="desc">请扫描租赁柜屏幕上的二维码</view>
        </view>
      </view>
    </view>
    <view class="controls fixed bottom-0 left-0 flex-row-sa-c">
      <view class="flex-col-c">
        <view class="iconfont icon-jujuetiaoxingma icon"></view>
        <view>输入换电码</view>
      </view>
      <view class="flex-col-c">
        <view class="iconfont icon-shoudiantong icon" @click="flashChange"></view>
        <view>打开手电筒</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.scan-page {
  background: rgba(50, 50, 50, 1);
  .scan-bg {
    height: calc(100% - 240rpx);
  }
  .scan-box {
    transform: translate(-50%, -50%);
    width: 500rpx;
    height: 500rpx;
    border-radius: 24rpx;
    border: 1rpx solid #FDC401;
  }
  .desc {
    width: 100%;
    color: white;
    font-size: 30rpx;
    text-align: center;
    letter-spacing: 4rpx;
  }
  .controls {
    width: 100%;
    font-size: 28rpx;
    color: white;
    background-color: #232524;
    padding: 40rpx 30rpx;
    letter-spacing: 4rpx;
    .icon {
      font-size: 60rpx;
      background-color: #5c5e5f;
      padding: 24rpx;
      border-radius: 999rpx;
      margin-bottom: 14rpx;
    }
  }
}

</style>