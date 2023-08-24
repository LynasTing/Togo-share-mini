<script lang="ts" setup>
import { post } from '@/utils/request'
import type { UnpaidOrder, UnpaidOrderType } from '@/types/assets/deposit'
import type { WxPay } from '@/types/assets/payment'
import { weChatPayHook } from '@/hooks'
import useStore from '@/store'

const { global } = useStore()

/**
 * 待支付订单
 */
const records = ref<UnpaidOrderType[]>([])
const fullAmount = ref<string>('')
const getUnpaid = () => {
  post<UnpaidOrder>('/account/unpaidOrder', '', 'json').then(res => {
    records.value = res.list
    fullAmount.value = res.totalMoney
  })
}
getUnpaid()

/**
 * 支付
 */
const pay = (item: UnpaidOrderType) => {
  uni.showModal({
    title: '完成付款',
    content: '您想要为当前订单完成付款吗？',
    success: res => {
      if(res.confirm) {
        const payParams = ref({
          money: item.money,
          operatorId: global.accountInfo.organizationId,
          openId: global.accountInfo.openId,
          id: [item.id]
        })
        post('/account/payment', { ...payParams.value }, 'json').then(result => {
          weChatPayHook(result as WxPay)
            .then(res => {
              getUnpaid()
              console.log(`res + ::>>`, res)
            })
            .catch(err => {
              console.log(`err + ::>>`, err)
            })
        })
      }else if(res.cancel) {
        console.log(`取消 + ::>>`, )
      }
    }
  })
}

/**
 * 全部结算
 */
const fullSettlement = () => {
  uni.showModal({
    title: '全部结清',
    content: '您确定要完成所有未付款订单吗？',
    success: res => {
      if(res.confirm) {
        const payParams = ref({
          money: fullAmount.value,
          operatorId: global.accountInfo.organizationId,
          openId: global.accountInfo.openId,
          id: records.value.map(i => i.id)
        })
        post('/account/payment', { ...payParams.value }, 'json').then(result => {
          weChatPayHook(result as WxPay)
            .then(res => {
              getUnpaid()
              console.log(`res + ::>>`, res)
            })
            .catch(err => {
              console.log(`err + ::>>`, err)
            })
        })
      }else if(res.cancel) {
        console.log(`取消 + ::>>`, )
      }
    }
  })
} 

</script>

<template>
  <view class="record-page" v-if="records.length">
    <u-alert title="有多个订单未支付？点我一键全部结算" type="warning" @click="fullSettlement" fontSize="15" />
    <view v-if="records.length" scroll-y="true" class="scroll-y-list overflow-h px-30" :enable-back-to-top="true">
      <view class="record relative" v-for="(item, index) in records" :key="index">
        <view class="title flex-row-sb-c">
          <view>待付款</view>
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
          <view>归还时间：</view>
          <view>{{ item.endTime }}</view>
        </view>
        <view class="record-info">
          <view>待支付金额：</view>
          <view class="using">{{ item.money }}</view>
        </view>
        <view class="pay-order" @click="pay(item)">支付</view>
        <view class="iconfont icon-sanjiao using-icon"></view>
      </view>
    </view>
  </view>
  <Empty v-else text="您没有待支付的订单哦~祝您出行平安" />
</template>

<style lang="scss" scoped>
.record-page {
  .px-30 {
    padding: 0 30rpx;
  }
  .scroll-y-list {
    padding: 30rpx 30rpx 18rpx;
    background-color: #f8f9fd;
    .record {
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      margin-bottom: 30rpx;
      padding: 30rpx 30rpx 90rpx;
      background-color: white;
      border-radius: 24rpx;
      border: 1rpx solid #7d9c9c;
      box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,96,175,0.1);
      .title {
        font-size: 30rpx;
        font-weight: bold;
        padding: 0 10rpx 14rpx;
        border-bottom: 1rpx solid #7d9c9c;
        box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(71, 77, 82, 0.102);
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
        .money {
          color: #7d9c9c;
        }
      }
      .pay-order {
        position: absolute;
        bottom: 5%;
        right: 6%;
        font-size: 24rpx;
        color: whitesmoke;
        background-color: #7d9c9c;
        padding: 8rpx 30rpx;
        border-radius: 8rpx;
      }
      .iconfont {
        position: absolute;
        top: 7%;
        right: 4%;
        font-size: 40rpx;
      }
      .using-icon {
        color: #ffc500;
      }
    } 
  }
}
</style>