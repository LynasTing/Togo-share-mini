<script lang="ts" setup>
import { post } from '@/utils/request'
import type { TradingRecord, TradingRecordType } from '@/types/assets/payment'
import { splitString } from '@/utils/tools'

const params = ref({
  page: 1,
  pageSize: 10
})
const total = ref<number>(0)
const records = ref<TradingRecordType[]>([])
const getDataList = () => {
  post<TradingRecord>('/changing/tugeTransactionDetails', { ...params.value }, 'json').then(res => {
    records.value = records.value?.concat(res.list)
    total.value = res.total
  })
}
getDataList()
// scroll-view 触底
const scrollToLower = () => {
  if(records.value.length >= total.value) return
  params.value.page += 1
  getDataList()
}
</script>

<template>
  <view v-if="records?.length" class="records-page">
    <scroll-view class="scroll-y" style="height: 100%" scroll-y="true" @scrolltolower="scrollToLower">
      <view class="record" v-for="item in records" :key="item.time">
        <view class="flex-row-sb-c h1">
          <view>{{ splitString(item.name, 20 ) }}</view>
          <view :class="item.type === '1' ? 'income': ''">{{ item.money }}</view>
        </view>
        <view class="type">{{ item.typeText }}</view>
        <view class="time">{{ item.time }}</view>
      </view>
    </scroll-view>
  </view>
  <Empty v-else text="没有找到您的交易记录" />
</template>

<style lang="scss" scoped>
.records-page {
  height: 100vh;
  padding: 30rpx;
  background: linear-gradient(to bottom, #9ea1aa, #ededed);
  .record {
    color: #222222;
    background-color: white;
    margin-bottom: 30rpx;
    padding: 32rpx 52rpx 32rpx 32rpx;
    border-radius: 24rpx;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(46, 50, 53, 0.2);
    .h1 {
      font-size: 32rpx;
      font-weight: bold;
    }
    .income {
      color: #FA5151;
    }
    .type {
      font-size: 28rpx;
      margin: 12rpx 0 18rpx;
    }
    .time {
      font-size: 22rpx;
    }
  }
}
</style>