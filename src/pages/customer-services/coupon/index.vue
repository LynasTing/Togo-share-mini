<script lang="ts" setup>
import { post } from '@/utils/request';
import useStore from '@/store';

const { global } = useStore()
console.log(`global + ::>>`, global)
post('/account/coupon', { accountUid: global.userInfo?.accountUid }, 'json').then(res => {
// post('/account/coupon', '', 'json').then(res => {
  console.log(`res + ::>>`, res)
})
// 使用
const useCoupon = () => {
  console.log(`1 + ::>>`, )
}
</script>

<template>
  <view class="coupon-page">
    <view class="coupon flex-row-sb">
      <!-- 金额 -->
      <view class="left flex-col--c">
        <view class="mb-20">
          <text class="num">30</text>
          <text>元</text>
        </view>
        <view>抵用</view>
      </view>
      <!-- 有效期 -->
      <view class="validity flex-col-sb-c">
        <view>
          <view>有效期</view>
          <view>2023-05-19</view>
        </view>
        <view class="flex-row-sb-c">
          <text>使用规则</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </view>
      <view class="use">
        <view @click="useCoupon">使用</view>
      </view>
    </view>
    <view class="coupon flex-row-sb">
      <!-- 金额 -->
      <view class="left flex-col--c">
        <view class="mb-20">
          <text class="num">30</text>
          <text>元</text>
        </view>
        <view>抵用</view>
      </view>
      <!-- 有效期 -->
      <view class="validity flex-col-sb-c">
        <view>
          <view>有效期</view>
          <view>2023-05-19</view>
        </view>
        <view class="flex-row-sb-c">
          <text>使用规则</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </view>
      <view class="use">
        <view @click="useCoupon">使用</view>
      </view>
    </view>
    <view class="coupon flex-row-sb">
      <!-- 金额 -->
      <view class="left flex-col--c">
        <view class="mb-20">
          <text class="num">30</text>
          <text>元</text>
        </view>
        <view>抵用</view>
      </view>
      <!-- 有效期 -->
      <view class="validity flex-col-sb-c">
        <view>
          <view>有效期</view>
          <view>2023-05-19</view>
        </view>
        <view class="flex-row-sb-c">
          <text>使用规则</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </view>
      <view class="use">
        <view @click="useCoupon">使用</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.coupon-page {
  padding: 30rpx;
  .coupon {
    width: 100%;
    height: 230rpx;
    font-size: 28rpx;
    background-image: url('@/static/imgs/mine/coupon_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 30rpx;
    padding: 30rpx 30rpx 30rpx 0;
    & > view {
      flex: 1%
    }
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
      .num {
        font-size: 80rpx;
        margin-right: 10rpx;
      }
      .mb-20 {
        margin-bottom: 10rpx;
      }
    }
    .validity {
      .iconfont {
        margin-left: 10rpx;
      }
    }
    .use {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      view {
        width: 160rpx;
        height: 60rpx;
        border-radius: 999rpx;
        opacity: 0;
      }
    }
  }
}
</style>