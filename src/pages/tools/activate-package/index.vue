<script lang="ts" setup>
import { post } from '@/utils/request';

const currIndex = ref<number>(0)
const selectCombo = ref({}) 
const combos = ref([])
post('/wallet/comboList', { latelyOrganizationId: 143 }, '').then(res => {
  if(res?.comboList.length) {
    combos.value = res?.comboList
    selectCombo.value = res.comboList[0]
  }
})
// 选择套餐
const comboSelect = (item, i) => {
  selectCombo.value = item
  currIndex.value = i
}
// 付款
const bayCombo = () => {
  uni.getProvider({
    service: 'payment',
    success: res => {
      post('user/overduePayment')
      uni.requestPayment({
        provider: res.provider[0]
      })
    }
  })
  
}
</script>

<template>
  <view class="active-package">
    <scroll-view scroll-y style="height: 100%;" class="scroll-y">
      <view class="combo flex-row-sb-c" v-for="(item, index) in combos" :key="index" :class="currIndex === index ? 'select-combo' : ''" @click="comboSelect(item, index)">
        <view>
          <view class="combo-name">{{ item.comboInfo || '套餐名字xxx' }}</view>
          <view class="">{{ item.comboCount === '9999' ? '无限次换电（不可退）' : `共可换${item.comboCount}次（不可退）` }}</view>
          <view class="">有效期至 2023-10-01</view>
        </view>
        <view class="flex-col">
          <view class="price-now price">￥{{ item.comboMoney || '2999.00' }}</view>
          <view class="original-price">原价:￥{{ item.comboMoney || '3000' }}</view>
        </view>
      </view>
    </scroll-view>
    <view class="fixed bottom-0 left-0 pay w-full flex-row-sb-c">
      <view class="pay-price">
        <view class="price">￥{{ selectCombo.comboMoney || '1000' }}</view>
        <view class="price">已优惠10000元</view>
      </view>
      <view class="pay-btn" @click="bayCombo">立即支付</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.active-package {
  height: 100vh;
  background-color: #fafcfe;
  padding: 30rpx 30rpx 0;
  .scroll-y {
    padding-bottom: 210rpx;
  }
  .price {
    color: #FA5151;
  }
  .combo {
    font-size: 24rpx;
    color: #999999;
    line-height: 1.5em;
    background-color: #FFFFFF;
    margin-bottom: 32rpx;
    padding: 34rpx 20rpx 38rpx 30rpx;
    border-radius: 24rpx ;
    border: 1rpx solid transparent;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,95,175,0.1);
    &-name {
      font-size: 32rpx;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #222222;
      margin-bottom: 26rpx;
    }
    .price-now {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 4rpx;
    }
    .original-price {
      text-align: right;
      text-decoration: line-through;
    }
  }
  .select-combo {
    border: 1rpx solid $yellow;
  }
  .pay {
    padding: 60rpx 30rpx 42rpx;
    background-color: #FFFFFF;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,0,0,0.16);
    &-price > view:first-child {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 4rpx;
    }
    &-price > view:last-child {
      font-size: 24rpx;
      font-weight: 500;
    }
    &-btn {
      font-size: 30rpx;
      padding: 24rpx 69rpx;
      color: white;
      background-color: $yellow;
      border-radius: 999rpx;
    }
  }
}
</style>