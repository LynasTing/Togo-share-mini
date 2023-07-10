<script lang="ts" setup>
const records = ref([
  {
    type: '退款',
    amount: 3000
  }
])
</script>

<template>
  <view class="deposit-page">
    <view class="h3">押金明细</view>
    <scroll-view scroll-y>
      <view class="detail">
        <view class="type">退款</view>
        <view class="flex-row-sb-c">
          <view>2023-03-22 05：54：24</view>
          <view class="amount">-3000</view>
        </view>
        <view>订单编号: KKKKKKKKKKKKKKKKKKKKKKK</view>
      </view>
      <view class="detail">
        <view class="type">退款</view>
        <view class="flex-row-sb-c">
          <view>2023-03-22 05：54：24</view>
          <view class="amount">-3000</view>
        </view>
        <view>订单编号: KKKKKKKKKKKKKKKKKKKKKKK</view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.deposit-page {
  padding: 0 30rpx;
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