<script lang="ts" setup>
</script>

<template>
  <view class="lease-page">
    <image src="@/static/imgs/lease/cabinet.png" mode="widthFix" class="w-full cabinet-img" />
    <view class="flex-row-sb-c info">
      <view>机柜编号</view>
      <view>TOGO112233445566</view>
    </view>
    <view class="flex-row-sb-c info">
      <view>操作类型</view>
      <view>租用操作</view>
    </view>
    <image src="@/static/imgs/lease/rent.png" mode="widthFix" class="w-full flow-img" />
    <view class="tips">
      <view class="item">
        <view>*抓牢取出，注意安全。</view>
        <view>*请妥善保管电源，损坏须赔偿。</view>
        <view class="flex-row-sb-c">
          <view>*请将电源远离水源和火源。</view>
          <view class="btn">查看用户协议</view>
        </view>
      </view>
      <view class="item flex-row-sb-c">
        <view>*租赁业务按时计费，请及时归还。</view>
        <view class="btn">查看计费标准</view>
      </view>
      <view class="item flex-row-sb-c">
        <view>*请阅读电源产品说明。</view>
        <view class="btn">查看产品说明</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.lease-page {
  padding: 30rpx;
  .cabinet-img {
    margin-bottom: 80rpx;
  }
  .info {
    font-size: 30rpx;
    color: #444;
    margin-bottom: 32rpx;
  }
  .flow-img {
    margin: 30rpx 0 40rpx 0;
  }
  .tips {
    font-size: 28rpx;
    .item {
      margin-bottom: 40rpx;
      .btn {
        font-size: 24rpx;
        color: white;
        background-color: black;
        padding: 6rpx 20rpx;
        border-radius: 999rpx;
      }
    }
  }
}
</style>