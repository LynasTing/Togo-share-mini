<script lang="ts" setup>
import useStore from '@/store'
import { post } from '@/utils/request'
import type { LeaseRecord } from '@/types/cabinet'

const { global } = useStore()

// scroll-view 触底
const scrollToLower = () => {
  if(records.value.length >= total.value) return
  params.value.page += 1
  getDataList()
}
const params = ref({ page: 1,  pageSize: 10 })
const records = ref<LeaseRecord[]>([])
const total = ref<number>(0)
const getDataList = () => {
  post('/account/charging', { ...params.value }, 'json').then(res => {
    if(res.list.length) {
      records.value = records.value?.concat(res.list)
      total.value = res.total
    }
  })
}
getDataList()
</script>

<template>
  <view class="record-page">
    <scroll-view v-if="records.length" scroll-y="true" class="scroll-y-list overflow-h" :enable-back-to-top="true" @scrolltolower="scrollToLower">
      <view class="record relative" v-for="(item, index) in records" :key="index">
        <view class="title flex-row-sb-c">
          <view>订单状态</view>
          <view class="flex-c">
            <view :class="item.status ? 'return': 'using'">{{ item.status ? '已归还' : '租赁中' }}</view>
          </view>
        </view>
        <view class="record-info">
          <view>订单编号：</view>
          <view>{{ item.orderNumber }}</view>
        </view>
        <view class="record-info">
          <view>租借时间：</view>
          <view>{{ item.ctime }}</view>
        </view>
        <view class="record-info">
          <view>租借机柜：</view>
          <view>{{ item.getCabinetName }}</view>
        </view>
        <view class="record-info">
          <view>租借电池编号：</view>
          <view>{{ item.getBatteryId }}</view>
        </view>
        <view class="record-info">
          <view>归还时间：</view>
          <view>{{ item.endTime }}</view>
        </view>
        <view class="record-info">
          <view>归还机柜：</view>
          <view>{{ item.returnCabinetName }}</view>
        </view>
        <view class="record-info">
          <view>归还电池编号：</view>
          <view>{{ item.returnBatteryId }}</view>
        </view>
        <view class="iconfont icon-sanjiao" :class="item.status ? 'return-icon': 'using-icon'"></view>
      </view>
    </scroll-view>
    <Empty v-else text="没有找到您的租赁记录~" />
  </view>
</template>

<style lang="scss" scoped>
.record-page {
  .scroll-y-list {
    height: 100vh;
    padding: 30rpx;
    background-color: #f8f9fd;
    .record {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      margin-bottom: 30rpx;
      padding: 30rpx 30rpx 50rpx;
      background-color: white;
      border-radius: 24rpx;
      border: 1rpx solid #7d9c9c;
      box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,96,175,0.1);
      .title {
        font-size: 30rpx;
        font-weight: bold;
        padding: 0 10rpx 20rpx;
        border-bottom: 1rpx solid #7d9c9c;
        box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(71, 77, 82, 0.102);
        .status {
          font-size: 26rpx;
          margin-right: 30rpx;
        }
        .return {
          color: #0060AF
        }
        .using {
          color: #ffce00;
        }
      }
      &-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 26rpx;
        padding: 20rpx 10rpx 0;
        & > view:first-child {
          font-size: 28rpx;
          color: #707070;
        }
      }
      .iconfont {
        position: absolute;
        bottom: 3%;
        right: 1%;
        font-size: 40rpx;
      }
      .using-icon {
        color: #ffc500;
      }
      .return-icon {
        color: #548080;
      }
    } 
  }
}
</style>