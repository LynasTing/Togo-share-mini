<script lang="ts" setup>
import { post } from '@/utils/request'
import useStore from '@/store'
import type { AccountInfo } from '@/types/global'

const { global } = useStore()

// 一键登录
const authLogin = (e: any) => {
  if(!e.detail.code) {
    uni.showToast({
      title: '用户授权失败',
      icon: 'none',
      duration: 1 * 1500
    })
    return
  }
  const params = {
    openId: global.accountInfo.openId,
    phone: e.detail.encryptedData,
    iv: e.detail.iv,
    wxAppId: uni.getAccountInfoSync().miniProgram.appId
  }
  post<AccountInfo>('/tuge/register', { ...params }, 'json').then(res => {
    if(res.token) {
      global.setAccountInfo(res)
      uni.setStorageSync('accountInfo', res)
      uni.showToast({
        title: '注册成功，欢迎使用',
        icon: 'success',
        duration: 2 * 1000
      })
      setTimeout(() => {
        uni.switchTab({ url: '/pages/global/tab-bar/home/index' })
      }, 2 * 1000)
    }
  })
}
// 手机号码注册
const goPhoneRegister = () => {
  uni.navigateTo({ url: '/pages/user-access/register/code/index' })
}
</script>

<template>
  <view class="flex-col-c login-page">
    <image src="@/static/imgs/global/login_logo.png" mode="widthFix" class="logo"/>
    <view class="desc w-full">欢迎您注册途歌共享</view>
    <button class="wx-login w-full button" @getphonenumber="authLogin" open-type="getPhoneNumber">微信授权一键注册</button>
    <view class="other-login button w-full" @click="goPhoneRegister">手机号码注册</view>
  </view>
</template>

<style lang="scss" scoped>
.login-page {
  padding: 66rpx;
  .logo {
    margin: 0 auto;
    width: 40%;
  }
  .desc {
    font-size: 40rpx;
    font-weight: bold;
    text-align: left;
    margin: 40rpx 0;
  }
  .button {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    font-weight: 600;
    letter-spacing: 4rpx;
  } 
  .wx-login {
    color: #54555A;
    background: linear-gradient(135deg, transparent 30rpx, rgb(252,195,0) 0);
  }
  .other-login {
    margin-top: 40rpx;  
    color: #FDC401;
    text-align: center;
    background: linear-gradient(-48deg, transparent 30rpx, rgb(84, 85, 90) 0);
  }
}
</style>