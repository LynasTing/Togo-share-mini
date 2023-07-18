<script lang="ts" setup>
import { post } from '@/utils/request'
import { onLoad } from '@dcloudio/uni-app';
import useStore from '@/store';

const { global } = useStore()
const redirect = ref<string>('')
onLoad(option => {
  if(option?.url) redirect.value = option?.url
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
      uni.redirectTo({ url: redirect.value })
    }else {
      uni.reLaunch({ url: '/pages/global/tab-bar/home/index' })
    } 
  }, 1 * 1500)
}
// 一键登录
const authLogin = (e: any) => {
  if(!e.detail.code) {
    uni.showToast({
      title: '用户用户授权失败',
      icon: 'none',
      duration: 1 * 1500
    })
    return
  }
  if(!agreeCheck.value) {
    uni.showToast({
      title: '请先同意用户协议',
      icon: 'none',
      duration: 1 * 1500
    })
    return 
  }
  uni.login({
     /**
       * @abstract 1. 未注册用户在访问登录接口后, 重新获取login用的code, 调用注册接口, 成功后跳Home
       * @abstract 2. 已注册用户, 登录成功后判断是否有redirect地址, 有就跳redirect, 否则跳Home
       */
    success: successRes => {
      post('/tuge/authorizedLogin', { code: successRes.code }, 'json').then(res => {
        // 未注册, 在重新拿到进行注册 (这里逻辑不完整, .length === 0 还有可能是账号冻结等情况)
        if(Object.getOwnPropertyNames(res).length === 0) {
          uni.login({
            success: toRes => {
              post('/tuge/register', { code: toRes.code, phone: e.detail.encryptedData, iv: e.detail.iv }, 'json').then(registerRes => {
                if(registerRes?.token) loginSuccess(registerRes)
              })
            }
          })
        } else {
          loginSuccess(res)
        }
      })
    },
    fail: err => {
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'none',
        duration: 1 * 1500
      })
      console.log(`获取登录授权失败err + ::>>`, err)
    }
  })
}
// 其它登录(手机号)
const otherLogin = () => {
  if(!agreeCheck.value) {
    uni.showModal({
      title: '提示',
      content: '手机号码登录即代表您同意我们的《用户协议》',
      success: res => {
        if(res.confirm) {
          agreeCheck.value = true
          uni.navigateTo({ url: '/pages/login/sign-in/index' })
        }
      }
    })
  }else {
    uni.navigateTo({ url: '/pages/login/sign-in/index' })
  }
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
// 未同意用户协议的时候点击授权登录
const unauthorized = () => {
  if(!agreeCheck.value) {
    uni.showToast({
      title: '请先同意用户协议',
      icon: 'none',
      duration: 1 * 1500
    })
    return 
  }
}
</script>

<template>
  <view class="flex-col-c login-page">
    <image src="@/static/imgs/global/login_logo.png" mode="widthFix" class="logo"/>
    <view class="desc w-full">
      即将开启途歌共享
    </view>
    <button class="wx-login w-full button relative" @getphonenumber="authLogin" open-type="getPhoneNumber">
      微信授权一键登录
      <view class="w-full h-full button absolute top-0 left-0 has-mask-box" @click.stop="unauthorized" v-show="!agreeCheck"></view>
    </button>
    <view class="other-login button w-full" @click="otherLogin">手机号码注册/登录</view>
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
  .has-mask-box {
    background-color: transparent;
    z-index: 9;
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