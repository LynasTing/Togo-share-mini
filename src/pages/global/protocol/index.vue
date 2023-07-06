<script lang="ts" setup>
</script>

<template>
  <view class="protocol-page">
    <view class="title">用户协议与隐私政策</view>
    <view class="content">
      <view>感谢使用途歌共享。在您开始使用本应用时，我们可能会对您的部分个人信息进行收集、使用。<br />为便于您使用我们的产品和服务，向您说明如下：</view>
      <view class="p">1.为帮助您注册验证、租借、使用、归还和得到更好的体验，我们收集您的部分必要信息。</view>
      <view class="p">2.为提供上述服务，我们可能会收集您的联络方式位置信息、音视频等敏感信息，您有权拒绝或撤回授权。</view>
      <view class="p">3.未经您的准许，我们不会从第三方获取、共享或对外提供您的信息。</view>
      <view class="p">4.您可以访问、更正、删除您所预留的个人信息，我们也将为您提供投诉方式。</view>
      <view class="p">5.您的使用习惯我们将以数据的方式记录，并用于用户体验的改善。</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.protocol-page {
  padding: 40rpx 50rpx;
  background-color: white;
  .title {
    font-size: 40rpx;
    font-weight: 700;
    margin-bottom: 80rpx;
  }
  .content {
    font-size: 28rpx;
    font-weight: 600;
    line-height: 50rpx;
    &>view:first-child {
      margin-bottom: 50rpx;
    }
    .p {
      font-weight: 400;
      padding: 0 10rpx;
      text-indent: -1.5ch;
    }
  }
}
</style>