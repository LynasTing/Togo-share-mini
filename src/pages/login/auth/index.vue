<script lang="ts" setup>
import { post } from '@/utils/request'
import { onLoad } from '@dcloudio/uni-app';

const redirect = ref<string>('')
onLoad(option => {
  if(option?.url) redirect.value = option?.url
})
// 一键登录
const authLogin = (e: any) => {
  console.log(`e + ::>>`, e)
  if(!agreeCheck.value) {
    uni.showToast({
      title: '请先同意用户协议',
      icon: 'none',
      duration: 1* 1500
    })
    return 
  }
  uni.login({
    success: successRes => {
      const info = uni.getAccountInfoSync()
      post('/tuge/authorizedLogin', { code: successRes.code, wxMaAppId: info.miniProgram.appId }, 'json').then(res => {
        console.log(`res + ::>>`, res)
        if(redirect.value) {
          uni.redirectTo({ url: redirect.value })
          return 
        }
      })
    },
    fail: err => {
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'none',
        duration: 1* 1500
      })
      console.log(`获取登录授权失败err + ::>>`, err)
    }
  })
}
// 其它登录
const otherLogin = () => {
  uni.navigateTo({ url: '/pages/login/sign-in/index' })
}
const agreeCheck = ref<boolean>(false)
// 同意用户协议
const agreeCheckChange = () => {
  agreeCheck.value = !agreeCheck.value
}
// 跳用户协议页面
const goUserAgreement = () => {
  uni.navigateTo({ url:'/pages/global/protocol/index' })
}
</script>

<template>
  <view class="flex-col-c login-page">
    <image src="@/static/imgs/global/login_logo.png" mode="widthFix" class="logo"/>
    <view class="desc w-full">
      即将开启途歌共享
    </view>
    <button class="wx-login w-full button" @getphonenumber="authLogin" open-type="getPhoneNumber">微信授权一键登录</button>
    <view class="other-login button w-full" @click="otherLogin">其它方式登录</view>
    <label class="flex-c w-full agreement" @click.stop="agreeCheckChange">
      <radio :value="agreeCheck" :checked="agreeCheck" color="#fcc300" style="transform: scale(0.8)" />
      <view>
        请阅读并同意
        <text @click.stop="goUserAgreement">《用户协议》</text>
      </view>
    </label>
  </view>
</template>

<style lang="scss" scoped>
.login-page {
  padding: 66rpx;
  .logo {
    margin: 0 auto;
    width: 50%;
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
    margin: 40rpx 0 30rpx;
    color: #FDC401;
    text-align: center;
    background: linear-gradient(-48deg, transparent 30rpx, rgb(84, 85, 90) 0);
  }
  .agreement {
    text-align: left;
    font-size: 24rpx;
    text {
      color: #0B5CA3;
    }
  }
}
</style>