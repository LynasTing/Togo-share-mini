<script lang="ts" setup>


// 跳机柜详情
const goDetail = () => {
  console.log(`1 + ::>>`, )
  uni.navigateTo({ url: '/pages/cabinet/detail/index' })
}
</script>

<template>
  <view class="info-page">
    <image mode="widthFix" src="@/static/imgs/cabinet/info_banner.png" class="w-full" />
    <!-- 位置 -->
    <view class="location">
      <view class="flex-row-sb">
        <view class="name">福州苍山万达站</view>
        <image src="@/static/imgs/cabinet/nav.png" mode="widthFix" />
      </view>
      <view class="address flex-c">
        <view class="iconfont icon-yuandian"></view>
        <view class="distance">距您99.99KM</view>
        <view class="iconfont icon-shuxian"></view>
        <view class="text-del-1">福州市仓山区金山街道浦上大道274号</view>
      </view>
    </view>
    <!-- 可用 -->
    <view class="useable">
      <view class="flex-c h4">可用电池数量</view>
      <view class="type flex-row-sb-c">
        <view class="left flex-col-c">
          <view class="num-text">M1000S</view>
          <view>电源型号</view>
        </view>
        <view class="right flex-c flex-1">
          <view class="flex-col-sb-c flex-1">
            <view class="num-text">3</view>
            <view>可用电源</view>
          </view>
          <view class="flex-col-sb-c flex-1">
            <view class="num-text">8</view>
            <view>电量≥90%</view>
          </view>
        </view>
      </view>
      <view class="type flex-row-sb-c">
        <view class="left flex-col-c">
          <view class="num-text">M1000S</view>
          <view>电源型号</view>
        </view>
        <view class="right flex-c flex-1">
          <view class="flex-col-sb-c flex-1">
            <view class="num-text">3</view>
            <view>可用电源</view>
          </view>
          <view class="flex-col-sb-c flex-1">
            <view class="num-text">8</view>
            <view>电量≥90%</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 信息 -->
    <view class="info">
      <view class="flex-c h4">机柜信息</view>
      <view class="flex-row-sb-c" @click="goDetail">
        <view class="name-code">
          <view>机柜名称: XXXXXXXXXXXXXXX</view>
          <view>机柜编号: XXXXXXXXXXXXXXX</view>
        </view>
        <view class="iconfont icon-youjiantou"></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.info-page {
  padding: 0 30rpx;
  .location {
    margin: 40rpx 0 60rpx;
    .name {
      font-size: 36rpx;
      font-weight: 600;
    }
    image {
      width: 140rpx;
      margin-bottom: 20rpx;
    }
    .address {
      font-size: 24rpx;
      .icon-yuandian {
        color: #ccc;
        font-size: 40rpx;
      }
      .distance {
        min-width: 150rpx;
        color: #0dc2da;
      }
    }
  }
  .useable {
    .h4 {
      border-left: 6rpx solid #4f717c;
      margin-bottom: 20rpx;
      padding-left: 24rpx;
      .icon-shuxian {
        font-size: 46rpx;
        color: #012f3f;
      }
    }
    .type {
      font-size: 24rpx;
      color: #bdcace;
      background-color: #012f3f;
      margin-bottom: 30rpx;
      padding: 30rpx 60rpx;
      border-radius: 20rpx;
      letter-spacing: 2rpx;
      .num-text {
        font-size: 26rpx;
        color: #dab10c;
        margin-bottom: 20rpx;
      }
      .left {
        padding-right: 100rpx;
        border-right: 2rpx solid #4f717c;
      }
      .right {
        padding-left: 60rpx;
      }
    }
  }
  .info {
    font-size: 26rpx;
    letter-spacing: 2rpx;
    .h4 {
      font-size: 30rpx;
      border-left: 6rpx solid #fdc401;
      margin-bottom: 20rpx;
      padding-left: 24rpx;
    }
    .name-code {
      color: #333;
      line-height: 1.8rem;
    }
  }
}
</style>