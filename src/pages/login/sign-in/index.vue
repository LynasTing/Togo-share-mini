<script lang="ts" setup>
import { post } from '@/utils/request'

const agreeCheck = ref<boolean>(false)
// 同意用户协议
const agreeCheckChange = () => {
  agreeCheck.value = !agreeCheck.value
}
// 跳用户协议页面
const goUserAgreement = () => {
  uni.navigateTo({
    url: '/pages/global/protocol/index'
  })
}
// 登录
const formSubmit = (e) => {
  const { value } = e.detail
  console.log(`value + ::>>`, value)
  
}
</script>

<template>
  <view class="flex-col-c login-page">
    <image src="@/static/imgs/global/login_logo.png" mode="widthFix" class="logo"/>
    <view class="desc w-full">
      即将开启途歌共享
    </view>
    <form @submit="formSubmit" class="w-full">
      <input class="form-input w-full" name="account" type="number" placeholder="请输入用户名" maxlength="11" />
      <input class="form-input w-full" name="password" :password="true" type="safe-password" placeholder="请输入密码" maxlength="14" safe-password-length="14" />
      <radio-group name="radioChecked">
        <label class="flex-c w-full agreement"  @click.stop="agreeCheckChange">
          <radio :value="agreeCheck" name="checked" :checked="agreeCheck" color="#fcc300" style="transform: scale(0.8)" />
          <view>
            请阅读并同意
            <text @click.stop="goUserAgreement">《用户协议》</text>
          </view>
        </label>
      </radio-group>
      <button class="wx-login w-full button" form-type="submit">登录</button>
    </form>
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
  .form-input {
    height: 100rpx;
    font-size: 30rpx;
    color: #838385;
    background-color: #ededed;
    margin-bottom: 32rpx;
    padding: 0 34rpx;
    border-radius: 24rpx;
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
    margin: 80rpx 0;
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