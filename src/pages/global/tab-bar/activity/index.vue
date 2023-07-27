<script lang="ts" setup>
import TabBar from '@/components/basic-tab-bar/TabBar.vue'
import useStore from '@/store'
import type { Activities } from '@/types/global'
import { post } from '@/utils/request'

const { global } = useStore() 
const activities = ref<Activities[]>([])
post<Activities[]>('/tuge/tuGeActivityList', '', 'json').then(res => {
  console.log(`res + ::>>`, res)
  activities.value = res
})
</script>

<template>
  <view class="active-page">
    <view class="h1">活动中心</view>
    <scroll-view 
      :scroll-top="scrollTop" 
      scroll-y="true" 
      class="ac-ls" 
      @scrolltolower="lower" 
      @scroll="scroll" 
      :style="{'height': global.scrollHeight + 'px'}"
    >
      <view class="ac-ls-item" v-for="item in activities" :key="item.id">
        <!-- <image :src="item.img" /> -->
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
    margin-bottom: 30rpx;
    letter-spacing: 2rpx;
  }
  .ac-ls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10rpx 30rpx 90rpx;
    &-item {
      width: 98%;
      height: 332rpx;
      border-radius: 20rpx;
      background-color: white;
      margin: 15rpx auto 30rpx;
      box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(27,103,164,0.2);
    }
  }
}
</style>