<script lang="ts" setup>
import { post } from '@/utils/request'

// 一键登录
const onClickLogin = (e: object) => {
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
      post('/miniapp/login', { code: successRes.code, wxMaAppId: info.miniProgram.appId }).then(res => {
        console.log(`res + ::>>`, res)
      })
    },
    fail: err => {
      console.log(`获取登录授权失败err + ::>>`, err)
    }
  })
  console.log(`e + ::>>`, e)
}
const agreeCheck = ref<boolean>(false)
// 同意用户协议
const agreeCheckChange = () => {
  agreeCheck.value = !agreeCheck.value
}
// 跳用户协议页面
const goUserAgreement = () => {
  console.log(`1 + ::>>`, )
}
</script>

<template>
  <view class="flex-col-c login-page">
    <image src="@/static/imgs/global/login_logo.png" mode="widthFix" class="logo"/>
    <view class="desc w-full">
      即将开启途歌共享
    </view>
    <button class="wx-login w-full button" @getuserinfo="onClickLogin" open-type="getUserInfo">微信授权一键登录</button>
    <view class="other-login button w-full">其它方式登录</view>
    <label class="flex-c w-full agreement" @click.stop="agreeCheckChange">
      <radio :value="agreeCheck" :checked="agreeCheck" color="#0B5CA3" style="transform: scale(0.8)" />
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