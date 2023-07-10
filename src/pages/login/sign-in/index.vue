<script lang="ts" setup>
import { post } from '@/utils/request'
import useStore from '@/store'

const { global } = useStore()
// 登录
const loginParams = ref({
  phone: 17621217520,
  authCode: ''
})
// 验证码输入事件
const authCodeChange = (e: string) => {
  if(!uni.$u.test.code(e)) return
  loginParams.value.authCode = e
}

// 手机号码输入
const inputPhone = (e) => {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
  console.log(`e + ::>>`, e)
}
// 发送验证码
const timerCount = ref<number>(global.authCodeTimer || 60)
const countDown = ref()
const startCounting = () => {
  countDown.value = setInterval(() => {
    if(timerCount.value >= 1 ) {
      timerCount.value--
      global.setAuthCodeTimer(timerCount.value)
    }else {
      clearInterval(countDown.value)
      timerCount.value = 60
    }
  }, 1 * 1000)
}

if(global.authCodeTimer) startCounting()
const sendCode = () => {
  if(timerCount.value < 60 ) return
  startCounting()
  post('/tuge/authCode', { phone: loginParams.value.phone }, 'json').then(res => {
    if(Object.getOwnPropertyNames(res).length === 0) {
      uni.showToast({
        title: '验证码已发送，请注意短信',
        icon: 'none',
        duration: 1.5 * 1000
      })
    }
  })
}
// 提交登录 (因为u-code-input组件有Bug, 所以这里没有用表单校验)
const formSubmit = () => {
  if(!uni.$u.test.mobile(loginParams.value.phone)) {
    uni.showToast({
      title: '请输入合法的手机号',
      icon: 'none',
      duration: 1 * 1500
    })
    return
  }
  if(!uni.$u.test.code(loginParams.value.authCode)) {
    uni.showToast({
      title: '请输入合法的验证码',
      icon: 'none',
      duration: 1 * 1500
    })
    return
  }
  post('/tuge/login', { ...loginParams.value }, 'json').then(res => {
    console.log(`res + ::>>`, res)
    if(res?.token) {
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })
      global.setUserInfo(res)
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/global/tab-bar/home/index' })
      }, 1 * 1500)
    }
  })
}
</script>

<template>
  <view class="flex-col-c login-page">
    <image src="@/static/imgs/global/login_logo.png" mode="widthFix" class="logo"/>
    <view class="desc w-full">
      即将开启途歌共享
    </view>
    <view class="login-params">
      <view class="flex-c phone-box">
        <u--input v-model="loginParams.phone" border="none" type="number" maxlength="11" clearable />
        <view class="code-btn" @click="sendCode">
        <text v-if="timerCount < 60">请在{{ timerCount }}秒后重试</text>
        <text v-else>获取验证码</text>
        </view>
      </view>
      <u-code-input :value="loginParams.authCode" :maxlength="6" mode="box" hairline @change="authCodeChange"></u-code-input>
      <button class="wx-login w-full button" @click="formSubmit">登录</button>
    </view>
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
  .login-params {
    width: 100%;
    .phone-box {
      margin-bottom: 60rpx;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #ccc;
    }
    .code-btn {
      width: 240rpx;
      text-align: right;
      margin-left: 60rpx;
    }
  }
  .wx-login {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    font-weight: 600;
    letter-spacing: 4rpx;
    color: #54555A;
    background: linear-gradient(135deg, transparent 30rpx, rgb(252,195,0) 0);
    margin: 60rpx 0;
  }
}
</style>