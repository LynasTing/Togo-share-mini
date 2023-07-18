<script lang="ts" setup>
import { post } from '@/utils/request';
import type { CabinetDetail } from '@/types/cabinet'

/**
 * 1 正常  2 空仓 3 禁用 4 锁定 
 */
const data = {
  name: 'xxx',
  code: 'xxx',
} 
// 样式
const formatType = computed(()=> {
  return function(type: string) {
    switch (type) {
      case '1':
        return 'green'
      case '2':
        return 'black'
      case '3':
        return 'disable'
      case '4':
        return 'purple'
    }
  }
})
// 文字
const formatTypeText = computed(()=> {
  return function(text: string) {
    switch (text) {
      case '2':
        return '空仓'
      case '3':
        return '禁用'
      case '4':
        return '锁定'
    }
  }
})
// 机柜基本信息
const cabinetDetail = ref<CabinetDetail>()
post<CabinetDetail>('/changing/cabinetDetails', { cabinetUid: 'GZ122304001' }, 'json').then(res => {
  if(res.uid) cabinetDetail.value = res
})
</script>

<template>
  <view class="detail-page container"> 
    <!-- 信息 -->
    <view class="info">
      <view class="name">{{ cabinetDetail?.cabinetName }}</view>
      <view class="code">柜组编码： {{ cabinetDetail?.uid }}</view>
      <view class="flex-row-sb-c data">
        <view class="flex-row-sb-c flex-1">
          <view class="flex-col-c" :class="index === 3 ? 'right' : ''" v-for="(item, index) in cabinetDetail?.list" :key="index">
            <view>{{ item.value }}</view>  
            <view>{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 仓门 -->
    <view class="bin-door flex-row-sb-c flex-wrap" >
      <view class="bin flex-col" v-for="(item, index) in cabinetDetail?.boxList" :key="index" >
        <view class="header">{{ index }}</view> 
        <view class="green"  :class="formatType(item.type)">
          <view v-if="item.type === '1'">
            <text class="num">
              {{ item.batterySoc || 0 }}
              %</text>
            <progress :percent="item.batterySoc" stroke-width="10" border-radius="20rpx"	/>
            <text class="type">{{ item.batteryName }}</text>
          </view>
          <view v-else  class="num">{{ formatTypeText(item.type) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail-page {
  padding: 30rpx;
  .info {
    font-size: 26rpx;
    color: #ccc;
    background: linear-gradient(135deg, transparent 30rpx, rgb(9, 40, 43) 0);
    padding: 30rpx 30rpx;
    .name {
      color: white;
      font-size: 34rpx;
      font-weight: 600;
    }
    .code {
      margin: 16rpx 0 40rpx;
    }
    .data {
      .flex-col-c>view:first-child {
        margin-bottom: 10rpx;
      }
    }
    .right {
      min-width: 20%;
      margin-left: 100rpx;
    }
  }
  .bin-door {
    margin-top: 30rpx;
    .header {
      font-size: 26rpx;
      color: #736340;
      background-color: #fdc401;
      padding: 0 20rpx;
    }
    .green {
      background-color: #64b491;
    }
    .cyan {
      background-color: #4bbcca;
    }
    .black {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #222222;
    }
    .purple {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222222;
      background-color: #cec0fd;
    }
    .disable {
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      background-color: #edf1f4;
    }
    .bin {
      width: calc(50% - 15rpx);
      margin: 0 20rpx 30rpx 0;
      border-radius: 20rpx;
      overflow: hidden;
      .num {
        font-size: 50rpx;
      }
      .type {
        font-size: 26rpx;
        color: #50695c;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
      &>view:last-child {
        height: 190rpx;
        text-align: center;
        padding: 30rpx 70rpx;
      }
    }
  }
}
</style>