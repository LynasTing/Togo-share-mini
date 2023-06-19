<script lang="ts" setup>
const id = ref<number>(0)
const title = ref<string>('map')
const latitude = ref<number>(39.909)
const longitude = ref<number>(116.39742)
</script>

<template>
  <view class="page-map relative">
    <map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
      <cover-view class="mark-card absolute">
        <!-- 上 -->
        <cover-view class="flex-row-sb-c usable-number">
          <cover-view class="flex-row-sb-c number-box">
            <cover-view class="type flex-1">
              <cover-view class="type-1">M1000S</cover-view>
              <cover-view class="line"></cover-view>
              <cover-view class="can-use">可用数量</cover-view>
            </cover-view>
            <cover-view class="num">3</cover-view>
          </cover-view>
          <cover-view class="flex-row-sb-c number-box">
            <cover-view class="type flex-1">
              <cover-view class="type-1">M1000S</cover-view>
              <cover-view class="line"></cover-view>
              <cover-view class="can-use">可用数量</cover-view>
            </cover-view>
            <cover-view class="num">13 </cover-view>
          </cover-view>
        </cover-view>
        <!-- 中 -->
        <cover-view class="address-model">
          <cover-view class="title">福州仓山万达站</cover-view>
          <cover-view class="flex-c">
            <cover-view class="distance relative">距离您39.5KM</cover-view>
            <cover-view class="separate"></cover-view>
            <cover-view class="info">福州市仓山区金山街道浦上大道274号</cover-view>
          </cover-view>
        </cover-view>
        <!-- 下 -->
        <cover-view class="nav-btn flex--c">
          <cover-view>地图导航</cover-view>
        </cover-view>
      </cover-view>
    </map>
  </view>
</template>

<style lang="scss" scoped>
.page-map {
  height: 100vh;
  .mark-card {
    box-sizing: border-box;
    left: 4%;
    bottom: 2%;
    width: 92%;
    height: 430rpx;
    padding: 40rpx 36rpx 0;
    background-color: white;
    border-radius: 24rpx;
    border: 1rpx solid #ccc;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,0,0,0.16);
    .usable-number {
      margin-bottom: 36rpx;
     .number-box {
        width: 290rpx;
        padding: 8rpx 12rpx 8rpx 20rpx;
        border: 1rpx solid #09282d;
        border-radius: 20rpx;
        .type {
          font-size: 26rpx;
          margin-right: 20rpx;
          .type-1 {
            font-weight: 500;
            padding: 0 10rpx;
          }
          .line {
            width: 90%;
            height: 1rpx;
            background-color: #09282d;
            margin: 6rpx 0;
          }
          .can-use {
            color: #666;
            font-size: 24rpx;
            padding: 0 12rpx;
            letter-spacing: 2rpx;
          }
        }
        .num {
          width: 100rpx;
          height: 100rpx;
          line-height: 100rpx;
          color: white;
          font-size: 70rpx;
          text-align: center;
          background-color: #07262b;
          border-radius: 20rpx;
        }
      }
    }
    .address-model {
      margin-bottom: 30rpx;
      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 12rpx;
      }
      .distance {
        font-size: 24rpx;
      }
      .separate {
        width: 2rpx;
        height: 30rpx;
        background-color: #333;
        margin: 0 16rpx;
      }
      .info {
        font-size: 22rpx;
        color: #888;
      }
    }
    .nav-btn {
      width: 98%;
      transform: translateX(1%);
      font-size: 34rpx;
      color: white;
      background-color: #fec400;  
      padding: 28rpx ;
      border-radius: 999rpx;
      letter-spacing: 4rpx;
      box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(0, 0, 0, 0.4)
    }
  }
}
</style>