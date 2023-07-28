<script lang="ts" setup>
import { post } from '@/utils/request'
import type { RealName, RealNameBack } from '@/types/global'

// 微信临时图片转base64
const toBase64 = (file: string) => {
  const result = uni.getFileSystemManager().readFileSync(file, 'base64')
  return result  
}
const frontImg = ref<string>('')
const backImg = ref<string>('')
// 图片上传
const imgUpload = (type: number) => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    camera: 'back',
    success(res) {
      if(res.tempFiles[0].size / 1024 / 1024 > 4) {
        uni.showToast({
          title: '请您上传4MB以内的图片~',
          icon: 'none'
        })
        return
      }
      let path = res.tempFiles[0].tempFilePath
      type ? backImg.value = path : frontImg.value = path
      path = toBase64(res.tempFiles[0].tempFilePath) as string
      type ? backVerify(path) : FrontVerify(path)
    }
  })
}
// 身份证照片正面验证
const FrontVerify = (userPhoto: string) => {
  post<RealName>('/changing/userPhotoDoRealNameHead', { userPhoto }, 'json').then(res => {
    if(res.idCard) {
      realNameParams.value = res as RealName
      uni.showToast({
        title: '上传成功',
        icon: 'success'
      })
    }else {
      frontImg.value = ''
      uni.showToast({
        title: '无法识别您上传的照片，请重试',
        icon: 'none',
        mask: false
      })
    }
  })
}
// 身份证照片反面验证
const backVerify = (userPhoto: string) => {
  post<RealNameBack>('/changing/userPhotoDoRealName', { userPhoto }, 'json').then(res => {
    if(!res.authority) {
      backImg.value = ''
      uni.showToast({
        title: '无法识别您上传的照片，请重试',
        icon: 'none',
        mask: false
      })
    }else {
      uni.showToast({
        title: '上传成功',
        icon: 'success'
      })
    }
  })
}
// 提交实名认证
const realNameParams = ref<RealName>({
  name: '',
  idCard: ''
})
const submit = () => {
  post('/changing/tuGeDoRealName', { ...realNameParams.value }, 'json').then(res => {
    console.log(`提交实名认证 res + ::>>`, res)
  }) 
}
</script>

<template>
  <view class="auth">
    <view class="auth-title relative">身份证照片</view>
    <view class="auth-desc">
      为保障您的权益，请先实名认证！<br />
      信息以安全加密，仅用于实名认证审核
    </view>
    <image v-if="!frontImg" class="auth-id-img auth-id-card" src="@/static/imgs/mine/id_card_front.png" @click="imgUpload(0)" />
    <image v-else :src="frontImg" class="auth-id-img" />
    <image v-if="!backImg" class="auth-id-img auth-id-card" src="@/static/imgs/mine/id_card_back.png" @click="imgUpload(1)" />
    <image v-else :src="backImg" class="auth-id-img" />
    <view class="desc">依据身份证照片读取您的身份信息可能会有误差<br />请您在仔细确认后再提交</view>
    <view class="auth-title relative user-info">个人信息</view>
    <view class="input-box flex-c">
      <view>真实姓名</view>
      <input class="flex-1" type="text" v-model="realNameParams.name" placeholder="请填写您的真实姓名" placeholder-style="font-size: 30rpx; color: #ccc">
    </view>
    <view class="input-box flex-c">
      <view>身份证号</view>
      <input class="flex-1" type="idcard" v-model="realNameParams.idCard" maxlength="18" placeholder="请填写您的身份证号" placeholder-style="font-size: 30rpx; color: #ccc">
    </view>
    <view class="submit" @click="submit">提交认证</view>
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
  .desc {
    font-size: 26rpx;
    color: #888;
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
  .auth-id-img {
    width: 100%;
    height: 418rpx;
    border-radius: 12rpx;
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