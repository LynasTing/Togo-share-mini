<script lang="ts" setup>
import { post } from '@/utils/request'
import useStore from '@/store'

const { global } = useStore()
const params = ref({
  userPhoto: global.userInfo.userPhoto || 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
  userNickname: global.userInfo.nickname || '',
  appId: uni.getAccountInfoSync().miniProgram.appId
})
// 头像选择回调
const onChooseAvatar = (e) => {
  params.value.userPhoto = e.detail.avatarUrl
}
// input输入回调
const nicknameInput = (e) => {
  params.value.userNickname = e.detail.value
}
// 提交
const submit = () => {
  post('/changing/tuGeUpdateUserInfo', { ...params.value }, 'json').then(res => {
    if(Object.getOwnPropertyNames(res).length === 0) {
      uni.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1.5 * 1000
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1.5 * 1000)
    }
  })
}
// 验证
const verify = () => {
  if(!params.value.userNickname || !params.value.userPhoto) {
    uni.showToast({
      title: '不能提交空的内容哦',
      icon: 'none',
      duration: 1.5 * 1000
    })
    return 
  }
  if(params.value.userPhoto.startsWith('http://fz.hthuandian.cn') || params.value.userPhoto.startsWith('https://')) {
    submit()
  }else {
    uni.getFileSystemManager().readFile({
      filePath: params.value.userPhoto,
      encoding: 'base64',
      success: res => {
        if(res.errMsg === 'readFile:ok') {
          params.value.userPhoto = res.data as string
          submit()
        }
      }
    })
  }
}
</script>

<template>
  <view>
    <button class="avatar-wrapper overflow-h" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="w-full h-full" :src="params.userPhoto"></image>
    </button> 
    <view class="flex-c input">
      <view class="label">昵称</view>
      <input type="nickname" v-model="params.userNickname" placeholder="请输入昵称" @input="nicknameInput" maxlength="16" @blur="nicknameInput"  />
    </view>
    <view class="btn" @click="verify">
      提交
    </view>
  </view>
</template>

<style lang="scss" scoped>
.avatar-wrapper {
  width: 100rpx;
  height: 100rpx;
  margin: 70rpx auto;
  padding: 0;
  border-radius: 12rpx;
}
.input {
  font-size: 28rpx;
  padding: 20rpx 40rpx;
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  .label {
    width: 120rpx;
    font-size: 30rpx;
    margin-right: 50rpx;
    font-weight: 700;
  }
}
.btn {
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  width: 86%;
  font-size: 36rpx;
  text-align: center;
  color: white;
  padding: 26rpx ;
  background-color: $yellow;
  border-radius: 999rpx;
  letter-spacing: 4rpx;
}
</style>