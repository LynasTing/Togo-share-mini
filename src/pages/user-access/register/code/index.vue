<script lang="ts" setup>
import { post } from '@/utils/request'
import useStore from '@/store'
import type { LoginSuccess } from '@/types/global'

const { global } = useStore()
// 登录
const loginParams = ref({
  phone: '',
  authCode: '',
  openId: global.openId
})
// 验证码输入事件
const authCodeChange = (e: string) => {
  if(!uni.$u.test.code(e)) return
  loginParams.value.authCode = e
}
// 手机号码输入
const inputPhone = (e) => {
  if(!uni.$u.test.mobile(e.detail.value)) return
  loginParams.value.phone = e.detail.value
}
// 验证码倒计时
const timerCount = ref<number>(global.authCodeTimer || 60)
const countDown = ref<number>()
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
// 定时器执行后到结束前这段时间里，如果用户返回了上一页再回来，要保证定时器继续执行
if(global.authCodeTimer) startCounting()
// 发送验证码
const sendCode = () => {
  if(!uni.$u.test.mobile(loginParams.value.phone)) {
    uni.showToast({
      title: '请输入合法的手机号',
      icon: 'none',
      duration: 1 * 1500
    })
    return
  }
  if(timerCount.value < 60) return
  timerCount.value--
  post('/tuge/authCode', { phone: loginParams.value.phone }, 'json').then(res => {
    if(Object.getOwnPropertyNames(res).length === 0) {
      startCounting()
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
  post<LoginSuccess>('/tuge/login', { ...loginParams.value }, 'json').then(res => {
    if('token' in res) {
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })
      global.setAccountInfo(res)
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
    <view class="desc w-full">欢迎您注册途歌共享</view>
    <view class="login-params">
      <view class="flex-c phone-box">
        <input type="number" class="flex-1" v-model="loginParams.phone" border="none" maxlength="11" clearable @input="inputPhone" />
        <button class="code-btn" :loading="timerCount < 60 ? true : false" :disabled="timerCount < 60 ? true : false" @click="sendCode">
          {{ timerCount < 60 ? `请在${timerCount}秒后重试` : '获取验证码' }}
        </button>
      </view>
      <u-code-input :value="loginParams.authCode" :maxlength="6" mode="box" hairline @change="authCodeChange"></u-code-input>
    </view>
    <view class="other-login button w-full disabled" @click="formSubmit">注册</view>
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
  .login-params {
    width: 100%;
     
    .phone-box {
      margin-bottom: 40rpx;
      padding-bottom: 10rpx;
      border-bottom: 1rpx solid #ccc;
      .code-btn {
        width: 260rpx;
        font-size: 26rpx;
        text-align: right;
        color: #333;
        background-color: transparent;
        margin-left: 30rpx;
        padding-right: 6rpx;
      }
    }
  }
  .other-login {
    margin-top: 100rpx;  
    color: #FDC401;
    text-align: center;
    background: linear-gradient(-48deg, transparent 30rpx, rgb(84, 85, 90) 0);
    letter-spacing: 10rpx;
  }
}
</style>