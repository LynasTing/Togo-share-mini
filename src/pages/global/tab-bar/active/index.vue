<script lang="ts" setup>
import TabBar from '@/components/basic-tab-bar/TabBar.vue'
import useStore from '@/store';

const { global } = useStore()
</script>

<template>
  <view class="active-page">
    <view class="h1">活动中心</view>
    <scroll-view 
      :scroll-top="scrollTop" 
      scroll-y="true" 
      class="cab-ls" 
      @scrolltoupper="upper" 
      @scrolltolower="lower" 
      @scroll="scroll" 
      :style="{'height': global.scrollHeight + 'px'}"
    >
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
      <view class="active w-full"></view>
    </scroll-view>
  </view>
  <TabBar :currIndex="1" />
</template>

<style lang="scss" scoped>
.active-page {
  padding: 0 30rpx;
  .h1 {
    font-size: 40rpx;
    font-weight: 600;
    margin-bottom: 30rpx;
    letter-spacing: 2rpx;
  }
  .active {
    height: 332rpx;
    border-radius: 20rpx;
    background-color: #013e3f;
    margin-bottom: 30rpx;
  }
}
</style>