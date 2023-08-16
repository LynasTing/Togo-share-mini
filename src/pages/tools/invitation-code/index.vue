<script lang="ts" setup>
import { post } from '@/utils/request';

/**
 * 手动绑定邀请码 
 */
const params = ref({
  invitationCode: '',
  appId: uni.getAccountInfoSync().miniProgram.appId
})
const submit = () => {
  if(!params.value.invitationCode || params.value.invitationCode.length < 6) {
    uni.showToast({
      title: '请输入正确邀请码',
      icon: 'none'
    })
    return
  }
  post('/changing/tuGeBinding', { ...params.value }, 'json').then(res => {
    if(Object.getOwnPropertyNames(res).length === 0) {
      uni.showToast({
        title: '绑定成功！',
        icon: 'success',
        duration: 1.5 * 1000
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1.5 * 1000)
    }
  })
}
</script>

<template>
  <view class="invitation-code h-screen">
    <view class="title">邀请码</view>
    <input type="text" maxlength="6" v-model="params.invitationCode" placeholder="请输入邀请码" class="code-input">
    <view class="btn" @click="submit">确定</view>
  </view>
</template>

<style lang="scss" scoped>
.invitation-code {
  background-color: #f9fbfc;
  padding: 50rpx;
  .title {
    font-size: 40rpx;
    font-weight: 600;
    margin-bottom: 100rpx;
  }
  .desc {
    font-size: 34rpx;
    font-weight: 600;
    margin-bottom: 10rpx;
  }
  .code-input {
    height: 80rpx;
    line-height: 60rpx;
    font-size: 28rpx;
    padding: 0 40rpx;
    border: 1rpx solid $darkgray;
    border-radius: 8rpx;
  }
  .btn {
    position: fixed;
    bottom: 12%;
    left: 10%;
    width: 80%;
    font-weight: 600;
    text-align: center;
    color: #FDC401;
    background: linear-gradient(135deg, transparent 30rpx, rgb(84, 85, 90) 0);
    padding: 20rpx 60rpx;
    border-radius: 12rpx;
    letter-spacing: 4rpx;
  }
}
</style>