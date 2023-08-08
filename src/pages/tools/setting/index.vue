<script lang="ts" setup>
import { post } from '@/utils/request'
import { logoutHook } from '@/hooks'

// 超时提醒
const switch1Change = (e: any) => {
  console.log('switch1 发生 change 事件，携带值为', e.detail.value)
}
// 是否关闭推送
const switch2Change = (e: any) => {
  console.log('switch2 发生 change 事件，携带值为', e.detail.value)
}

const menu = ref([
  { title: '操作指南' },
  { title: '用户协议', url: '/pages/global/protocol/index' },
  { title: '修改密码' },
  { title: '押金协议' },
  { title: '充值协议' },
  { title: '隐私政策' },
  { title: '检查新版' }
])

// 退出登录
const logout = () => {
  uni.showModal({ 
    title: '退出',
    content: '您确定要退出登录吗？',
    success: res => {
      if(res.confirm) {
        post('/account/exitLogin', '', 'json').then(res => {
          if(Object.getOwnPropertyNames(res).length === 0) {
            uni.showToast({
              title: '退出成功',
              icon: 'success',
              duration: 1.5 * 1000 
            })
            logoutHook()
            setTimeout(() => {
              uni.switchTab({ url: '/pages/global/tab-bar/home/index' })
            }, 1.5 * 1000)
          }
        })
      }
    }
  })
}
</script>

<template>
  <view class="container flex-col h-screen">
    <view class="head flex-col-sb w-full"> 
      <view class="flex-row-sb-c">
        <text>超时提醒</text>
        <switch color="#FFCC33" style="transform:scale(0.7)" @change="switch1Change"/>
      </view>
      <view class="flex-row-sb-c">
        <text>是否关闭推送</text>
        <switch color="#FFCC33" style="transform:scale(0.7)" @change="switch2Change"/>
      </view>
      <view class="cancel-account">注销账号</view>
    </view>
    <view class="content flex-col-sb">
      <navigator :url="item.url" class="flex-row-sb-c" v-for="item in menu" :key="item.title">
        <text>{{ item.title }}</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
    </view>
    <view class="back flex-col-se-c" @click="logout">
      <text>退出登录</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 0 16rpx;
  background-color: #f6f6f6;
  color: #342919;
  font-size: 30rpx;
  font-weight: Bold;
  letter-spacing: 2rpx;
}
.head {
  padding: 30rpx;
  height: 326rpx;
  background-color: #fff;
  .cancel-account {
    color: #6a8b8d;
    font-weight: 600;
  }
}
.content {
  margin-top: 22rpx;
  padding: 30rpx;
  height: 706rpx;
  background-color: #fff;
}
.back {
  margin-top: 22rpx;
  height: 102rpx;
  background-color: #fff;
  text-align: center;
}

</style>