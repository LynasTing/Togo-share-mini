<script lang="ts" setup>
import { post } from '@/utils/request';
import type { DepositRecords } from '@/types/assets'

const records = ref<DepositRecords[]>([])
post<DepositRecords[]>('/changing/tuGeRecDeposit', '', 'json').then(res => {
  records.value = res
})
</script>

<template>
  <view class="deposit-page">
    <view class="deposit relative flex-col-sb">
      <view>我的押金</view>
      <view class="flex-row-sb-c">
        <view class="deposit-num">3000.00</view>
        <view class="deposit-refund">退款</view>
      </view>
    </view>
    <view class="h3">押金明细</view>
    <scroll-view scroll-y>
      <view class="detail" v-for="item in records" :key="item.orderNumber">
        <view class="type">{{ item.depositType }}</view>
        <view class="flex-row-sb-c">
          <view>{{ item.date }}</view>
          <view class="amount">{{ item.money }}</view>
        </view>
        <view>订单编号: {{ item.orderNumber }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.deposit-page {
  padding: 0 30rpx;
  .deposit {
    height: 240rpx;
    color: white;
    margin-bottom: 30rpx;
    padding: 60rpx 60rpx 30rpx 30rpx;
    background-image: url('http://fz.hthuandian.cn/static/apptuge/deposit_bg.png');
    background-position: inherit;
    background-repeat: no-repeat;
    background-size: cover;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 116rpx;
      height: 116rpx;
      background-color: white;
      z-index: 1;
      transform: translate(50%, -50%) rotate(45deg);
    }
    &-num {
      font-size: 40rpx;
    }
    &-refund {
      font-size: 36rpx;
      font-weight: 700;
      color: white;
      letter-spacing: 2rpx;
    }
  }
  .h3 {
    font-size: 30rpx;
    font-weight: bold;
    color: #342919;
  }
  .detail {
    font-size: 24rpx;
    font-weight: 500;
    color: #342919;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #e2e0e0 ;
    .type {
      font-size: 30rpx;
      margin-bottom: 20rpx;
    }
    .amount {
      font-size: 36rpx;
      font-weight: bold;
    }
  }
}
</style>