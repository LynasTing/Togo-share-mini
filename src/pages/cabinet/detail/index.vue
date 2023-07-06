<script lang="ts" setup>
</script>

<template>
  <view class="detail-page container"> 
    <!-- 信息 -->
    <view class="info">
      <view class="name">富力中心A333柜</view>
      <view class="code">柜组编码： TGGGGGGGGGGGGGGGGGGGG</view>
      <view class="flex-row-sb-c data">
        <view class="flex-row-sb-c flex-1">
          <view class="flex-col-c">
            <view>3</view>  
            <view>M1000S</view>
          </view>
          <view class="flex-col-c">
            <view>3</view>
            <view>M1000S</view>
          </view>
          <view class="flex-col-c">
            <view>3</view>
            <view>空仓</view>
          </view>
        </view>
        <view class="right flex-col-c">
          <view>≥90%</view>
          <view>满电标准</view>
        </view>
      </view>
    </view>
    <!-- 仓门 -->
    <view class="bin-door flex-row-sb-c flex-wrap ">
      <view class="bin flex-col">
        <view class="header">1</view>
        <view class="green">
          <text class="num">95%</text>
          <progress :percent="99" stroke-width="10" border-radius="20rpx"	/>
          <text class="type">M1000S</text>
        </view>
      </view>
      <view class="bin flex-col">
        <view class="header">1</view>
        <view class="cyan">
          <text class="num">95%</text>
          <progress :percent="99" stroke-width="10" border-radius="20rpx"	/>
          <text class="type">M1000S</text>
        </view>
      </view>
      <view class="bin flex-col">
        <view class="header">1</view>
        <view class="purple">
          <text class="num">锁定</text>
        </view>
      </view>
      <view class="bin flex-col">
        <view class="header">1</view>
        <view class="black">
          <text class="num">空仓</text>
        </view>
      </view>
      <view class="bin flex-col">
        <view class="header">1</view>
        <view class="disable">
          <text class="num">禁用</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail-page {
  padding: 30rpx;
  .info {
    font-size: 26rpx;
    color: #ccc;
    background: linear-gradient(135deg, transparent 30rpx, rgb(9, 40, 43) 0);
    padding: 30rpx 30rpx;
    .name {
      color: white;
      font-size: 34rpx;
      font-weight: 600;
    }
    .code {
      margin: 16rpx 0 40rpx;
    }
    .data {
      .flex-col-c>view:first-child {
        margin-bottom: 10rpx;
      }
    }
    .right {
      min-width: 20%;
      margin-left: 100rpx;
    }
  }
  .bin-door {
    margin-top: 30rpx;
    .header {
      font-size: 26rpx;
      color: #736340;
      background-color: #fdc401;
      padding: 0 20rpx;
    }
    .green {
      background-color: #64b491;
    }
    .cyan {
      background-color: #4bbcca;
    }
    .black {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #222222;
    }
    .purple {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222222;
      background-color: #cec0fd;
    }
    .disable {
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      background-color: #edf1f4;
    }
    .bin {
      width: calc(50% - 15rpx);
      margin: 0 20rpx 30rpx 0;
      border-radius: 20rpx;
      overflow: hidden;
      .num {
        font-size: 50rpx;
      }
      .type {
        font-size: 26rpx;
        color: #50695c;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
      &>view:last-child {
        height: 190rpx;
        text-align: center;
        padding: 30rpx 70rpx;
      }
    }
  }
}
</style>