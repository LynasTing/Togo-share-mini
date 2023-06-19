<script lang="ts" setup>
</script>

<template>
  <view class="w-full h-screen relative top-0 left-0">
    <view class="scan-box absolute top-half left-half">
      <camera device-position="back" flash="off" binderror="error" mode="scanCode" resolution="high" style="width: 500rpx; height: 500rpx; border-radius: 24rpx;" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.scan-box {
  transform: translate(-50%, -50%);
  width: 500rpx;
  height: 500rpx;
  border-radius: 24rpx;
}
</style>