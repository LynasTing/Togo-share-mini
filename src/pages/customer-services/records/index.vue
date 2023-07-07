<script lang="ts" setup>
const tabs = reactive([
  { name : '全部', resultText: '成功' },
  { name : '租用' },
  { name : '归还' }
])
const records = ref([
  { type: '租用', time: '2023-03-19 12:00: 00', result: 'success', resultText: '成功' },
  { type: '租用', time: '2023-03-19 12:00: 00', result: 'success', resultText: '成功' },
  { type: '归还', time: '2023-03-19 12:00: 00', result: 'error', resultText: '失败' },
  { type: '租用', time: '2023-03-19 12:00: 00', result: 'success', resultText: '成功' },
  { type: '归还', time: '2023-03-19 12:00: 00', result: 'success', resultText: '成功' },
  { type: '租用', time: '2023-03-19 12:00: 00', result: 'abnormal', resultText: '异常' },
  { type: '租用', time: '2023-03-19 12:00: 00', result: 'success', resultText: '成功'  }
])
const changeTab = (i: any) => {
}
</script>

<template>
  <view class="record-page">
    <u-sticky bgColor="#fff">
      <u-tabs 
        :list="tabs" 
        scrollable="false" 
        lineColor="#FDC401" 
        @click="changeTab" 
        :activeStyle="{ color: '#303133', fontWeight: 'bold', transform: 'scale(1.05)' }"
        itemStyle="padding-left: 45px; padding-right: 45px; height: 40px;"
      ></u-tabs>
    </u-sticky>
    <view class="banner">
      <image src="@/static/imgs/global/logo_op_1.png" mode="widthFix" />
      <view class="flex-row-sb-c">
        <view>
          Realize the freedom of electricity <br>
          Made in TYBOL POWER
        </view>
        <view>
          勇敢、睿智、耀目, <br />
          我们努力为您<br />
          创造更为自由的电力供应。
        </view>
      </view>
    </view>
    <view class="table">
      <view class="header flex-row-sb-c">
        <text>操作类型</text>
        <text>记录时间</text>
        <text>结果</text>
      </view>
      <view class="record flex-row-sb-c" v-for="(item, index) in records" :key="index" :class="index % 2 !== 0 ? 'bg-gray' : ''">
        <text class="rent inline-block">{{ item.type }}</text>
        <view class="flex-1 flex-row-sb-c" :class="index !== records.length - 1 ? 'has-border' : '' ">
          <text class="time">{{ item.time }}</text>
          <text :class="item.result">{{ item.resultText }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.record-page {
  .banner {
    font-size: 20rpx;
    padding: 30rpx 40rpx;
    background-color: #f7f7f7;
    image {
      width: 200rpx;
    }
  }
  .table {
    font-size: 26rpx;
    .header {
      font-size: 22rpx;
      padding: 20rpx 50rpx;
      color: white;
      background-color: #222222;
    }
    .record {
      letter-spacing: 2rpx;
      text {
        padding: 12rpx 50rpx;
        white-space: nowrap;
      }
      .rent {
        width: 50rpx;
      }
      .time {
        flex: 1;
        font-size: 24rpx;
        padding: 0;
        text-align: center;
      }
      .has-border {
        border-bottom: 1rpx solid $yellow;
      }
      .success {
        background-color: $babyBlue;
      }
      .error {
        background-color: $scarlet;
      }
      .abnormal {
        background-color: $lightOrange;
      }
    }
  .bg-gray {
      background-color: #e5e9ec;
    }
  }
}
</style>