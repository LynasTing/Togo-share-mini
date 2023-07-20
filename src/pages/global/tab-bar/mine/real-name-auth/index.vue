<script lang="ts" setup>
// 图片上传
const imgUpload = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      console.log(`res + ::>>`, res)
      // params.value.imgUrl = params.value.imgUrl.concat(res.tempFiles[0].tempFilePath)
    }
  })
}
// 图片删除
// const imgDel = (e: string) => {
//   params.value.imgUrl = params.value.imgUrl.filter((obj: string) => obj !== e)
// }
</script>

<template>
  <view class="auth">
    <view class="auth-title relative">身份证照片</view>
    <view class="auth-desc">
      为保障您的权益，请先实名认证！<br />
      信息以安全加密，仅用于实名认证审核
    </view>
    <view class="auth-id-card auth-front" @click="imgUpload">
    </view>
    <view class="auth-id-card auth-back">
    </view>
    <view class="auth-title relative user-info">个人信息</view>
    <view class="input-box flex-c">
      <view>真实姓名</view>
      <input type="text" placeholder="请输入您的真实姓名" placeholder-style="font-size: 30rpx; color: #ccc">
    </view>
    <view class="input-box flex-c">
      <view>身份证号</view>
      <input type="idcard" placeholder="请输入您的真实身份证号" placeholder-style="font-size: 30rpx; color: #ccc">
    </view>
    <view class="submit">提交认证</view>
  </view>
</template>

<style lang="scss" scoped>
.auth {
  padding: 0 30rpx 64rpx;
  &-title {
    width: 180rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #342919;
    white-space: nowrap;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 70%;
      height: 18rpx;
      background: linear-gradient(to right, #FFFFFF 0%, #005FAF 100%);
      opacity: 0.7;
    }
  }
  .user-info {
    width: 144rpx;
    margin: 60rpx 0 40rpx;
  }
  &-desc {
    font-size: 24rpx;
    font-weight: 500;
    color: #005FAF;
    margin: 22rpx  0 20rpx;
  }
  .auth-id-card {
    height: 418rpx;
    margin-bottom: 30rpx;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .auth-front {
    background-image: url('@/static/imgs/mine/id_card_front.png');
  }
  .auth-back {
    background-image: url('@/static/imgs/mine/id_card_back.png');
  }
  .input-box {
    padding: 26rpx 0;
    border-bottom: 2rpx solid #e7e1e1;
    view {
      font-size: 30rpx;
      font-weight: bold;
      color: #342919;
      margin-right: 64rpx;
    }
  }
  .submit {
    font-size: 30rpx;
    font-weight: bold;
    color: white;
    text-align: center;
    margin-top: 134rpx;
    padding: 24rpx 0;
    background-color: $yellow;
    border-radius: 999rpx;
  }
}
</style>