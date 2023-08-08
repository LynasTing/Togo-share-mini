<script lang="ts" setup>
import TabBar from '@/components/basic-tab-bar/TabBar.vue'
import useStore from '@/store'
import type { Activities } from '@/types/global'
import { post } from '@/utils/request'
import { onShow } from '@dcloudio/uni-app'

const { global } = useStore() 
const activities = ref<Activities[]>([])
post<Activities[]>('/tuge/tuGeActivityList', '', 'json').then(res => {
  activities.value = res
})
onShow(() => {
  // #ifdef MP-ALIPAY
  uni.hideTabBar()
  // #endif
})
</script>

<template>
  <view class="active-page">
    <view class="h1">活动中心</view>
    <scroll-view scroll-y="true" class="ac-ls" :style="{'height': global.scrollHeight + 'px'}">
      <view class="ac-ls-item" v-for="item in activities" :key="item.id">
        <view class="ac-ls-item-title">{{ item.name }}</view>
        <image :src="item.img" class="ac-ls-item-img w-full h-full" />
        <view class="ac-ls-item-end-time">{{ item.endTime }}</view>
      </view>
    </scroll-view>
  </view>
  <TabBar :currIndex="1" />
</template>

<style lang="scss" scoped>
.active-page {
  background-color: #f9fbfc;
  .h1 {
    font-size: 40rpx;
    font-weight: 600;
    margin: 0 0 30rpx 20rpx;
    letter-spacing: 2rpx;
  }
  .ac-ls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10rpx 30rpx 90rpx;
    &-item {
      width: 98%;
      height: 432rpx;
      color: #342919;
      background-color: white;
      margin: 15rpx auto 30rpx;
      padding: 28rpx 34rpx;
      border-radius: 20rpx;
      box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(27,103,164,0.2);
      &-title {
        font-size: 30rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
      }
      &-img {
        width: 622rpx;
        height: 264rpx;
        margin: 18rpx 0;
        border-radius: 24rpx;
      }
      &-end-time {
        font-size: 22rpx;
        font-weight: 500;
      }
    }
  }
}
</style>