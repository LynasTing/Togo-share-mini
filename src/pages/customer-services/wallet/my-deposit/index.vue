<script lang="ts" setup>
import { post } from '@/utils/request';
import type { DepositRecords, UserDeposit } from '@/types/assets/deposit'

/**
 * 用户当前押金信息
 */
const userDeposit = ref<UserDeposit>()
const getUserDeposit = () => {
  post<UserDeposit>('/changing/tuGeRecDepositDetails', '', 'json').then(res => {
    userDeposit.value = res
  })
}
getUserDeposit()
const records = ref<DepositRecords[]>([])
post<DepositRecords[]>('/changing/tuGeRecDeposit', '', 'json').then(res => {
  records.value = res
})
// 退款
const refund = () => {
  const status = userDeposit.value?.status
  if(status === 2 || status === 3) {
    uni.showToast({
      title: status === 2 ? '您的押金正在退回中' : '您暂无押金可退',
      icon: 'none'
    })
    return
  }
  uni.showModal({
    title: '提示',
    content: '您确定要发起退款吗？',
    success: res => {
      if(res.confirm) {
        post('/miniapp/returnDeposit', { depositOrderNumber: '4eddb85b8cec43b08198021f581dbfbb' }, '').then(res => {
          if(Object.getOwnPropertyNames(res).length === 0) {
            getUserDeposit()
            uni.showToast({
              title: '申请已提交，将会在1~7个工作日内退款',
              icon: 'none',
              duration: 2.5 * 1000
            })
          }
        })
      }
    }
  })
}
</script>

<template>
  <view class="deposit-page overflow-h">
    <view class="deposit relative flex-col-sb">
      <view>我的押金</view>
      <view class="flex-row-sb-c">
        <view class="deposit-num">{{ userDeposit?.money || 0.00 }}</view>
        <view class="deposit-refund" @click="refund">退款</view>
      </view>
    </view>
    <view class="h3">押金明细</view>
    <scroll-view scroll-y>
      <view class="detail" v-for="item in records" :key="item.orderNumber">
        <view class="type">{{ item.depositTypeText }}</view>
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