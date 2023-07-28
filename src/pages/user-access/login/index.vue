<script lang="ts" setup>
import { post } from '@/utils/request'
import { onLoad } from '@dcloudio/uni-app'
import type { LoginSuccess, LoginFail } from '@/types/global'
import useStore from '@/store'

const tabBarPage = ref([
  '/pages/global/tab-bar/home/index',
  '/pages/global/tab-bar/activity/index',
  '/pages/global/tab-bar/mall/index',
  '/pages/global/tab-bar/mine/index'
])
const { global } = useStore()
const redirect = ref<string>('')
const platform = ref<string>('wx')
uni.getSystemInfo({
  success: res => { platform.value = res.uniPlatform }
})
// #ifdef MP-ALIPAY
my.setNavigationBar({ textStyle: 'black' })
// #endif
onLoad(option => {
  if(option?.path) redirect.value = decodeURIComponent(option?.path)
})
// 登录成功
const loginSuccess = (val: any) => {
  uni.showToast({
    title: '登录成功',
    icon: 'success',
    duration: 1 * 1500
  })
  global.setAccountInfo(val)
  uni.setStorageSync('accountInfo', val)
  setTimeout(() => {
    if(redirect.value) {
      if(tabBarPage.value.includes(redirect.value)) {
        uni.switchTab({ url: redirect.value })
      }else {
        uni.redirectTo({ url: redirect.value })
      }
    }else {
      uni.switchTab({ url: '/pages/global/tab-bar/home/index' })
    } 
  }, 1 * 1500)
}
// 一键登录
const authLogin = (e: any) => {
  if(!agreeCheck.value) {
    uni.showToast({
      title: '请先同意用户协议',
      icon: 'none',
      duration: 1 * 1500
    })
    return 
  }
  uni.login({
    success: successRes => {
      post<LoginSuccess | LoginFail>('/tuge/authorizedLogin', { code: successRes.code, wxAppId: uni.getAccountInfoSync().miniProgram.appId }, 'json').then(res => {
        if('openId' in res) {
          uni.showToast({
            title: '您还未注册，请先注册',
            icon: 'none'
          })
          global.setOpenId(res.openId as string)
          setTimeout(() => {
            uni.navigateTo({ url: '/pages/user-access/register/auth/index' })
          }, 2 * 1000)
          return 
        }
        loginSuccess(res)
      })
    }
  })
}
const agreeCheck = ref<boolean>(false)
// 同意用户协议
const agreeCheckChange = () => {
  console.log(`agreeCheck.value + ::>>`, agreeCheck.value)
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
    <view class="desc w-full">即将开启途歌共享</view>
    <button class="wx-login w-full button relative" @click="authLogin">{{ platform === 'mp-alipay' ? '支付宝' : '微信' }}授权一键登录</button>
    <view class="flex-c w-full agreement" @click.stop="agreeCheckChange">  
      <radio :value="agreeCheck" :checked="agreeCheck" color="#fcc300" style="transform: scale(0.8)" />
      <view>
        请阅读并同意
        <text @click.stop="goUserAgreement">《用户协议》</text>
      </view>
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
  .wx-login {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: #54555A;
    background: linear-gradient(135deg, transparent 30rpx, rgb(252,195,0) 0);
    border: none;
    margin-bottom: 50rpx;;
    letter-spacing: 4rpx;
  }
  .agreement {
    text-align: left;
    font-size: 24rpx;
    z-index: 9;
    text {
      color: #0B5CA3;
    }
  }
}
</style>