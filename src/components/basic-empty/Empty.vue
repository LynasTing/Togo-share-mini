<script lang="ts" setup name="Empty">

const props = defineProps({
  text: {
    type: String,
    default: '内容为空'
  }
})
</script>

<template>
  <view class="empty flex-1">
    <view class="banner-text">
      <image src="@/static/imgs/global/logo_op_1.png" mode="widthFix" />
      <view class="flex-row-sb-c ">
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
    <view class="flex-col-c">
      <image class="empty-img" src="@/static/imgs/global/togo_empty.png" />
      <view class="desc">{{ props.text }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.empty {
  color: black;
  background-color: transparent;
  margin: 0rpx 0;
  border-radius: 16rpx;
  padding-bottom: 30rpx;
  .banner-text {
    font-size: 20rpx;
    padding: 30rpx 0rpx;
    image {
      width: 200rpx;
    }
  }
  .iconfont {
    color: $darkgray;
    font-size: 100rpx;
  }
  .empty-img {
    width: 250rpx;
    height: 280rpx;
    margin: 30rpx 0 10rpx;
  }
  .desc {
    font-size: 28rpx;
    color: #999;
  }
}

</style>