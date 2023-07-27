<script lang="ts" setup>
import TabBar from '@/components/basic-tab-bar/TabBar.vue'
import useStore from '@/store'
import { post } from '@/utils/request'
import { splitString } from '@/utils/tools'
import { notLoginIn } from '@/hooks/index'
import type { UserInfo } from '@/types/global'

const { global } = useStore()
watch(() => global.accountInfo.token, (n) => {
  if(n) {
    post<UserInfo>('/changing/tuGeRecUserInfo', '', 'json').then(res => global.setUserInfo(res as UserInfo))
  }
}, { immediate: true })

const csMenu = reactive([
  { path: '/pages/customer-services/battery/index' },
  { path: '/pages/customer-services/records/index' },
  { path: '/pages/customer-services/coupon/index' },
  { path: '/pages/customer-services/wallet/index' }
])
// 跳菜单
const goCS = e => {
  if(!global.accountInfo.token) {
    notLoginIn()
    return
  }
  uni.navigateTo({ url:  e.path })
}
// 跳个人资料
const goUserInfo = () => {
  if(!global.accountInfo.token) {
    notLoginIn()
    return
  }
  uni.navigateTo({ url: '/pages/global/tab-bar/mine/user-info/index' })
}
// 跳实名认证
const goRealName = () => {
  if(!global.accountInfo.token) {
    notLoginIn()
    return
  }
  uni.navigateTo({ url: '/pages/global/tab-bar/mine/real-name-auth/index' })
}
const tools = reactive([
  { text: '我的消息', path: '/pages/tools/message/index' },
  { text: '分享', path: '/pages/tools/share/index' },
  { text: '意见反馈', path: '/pages/tools/feedback/index' },
  { text: '关于我们', path: '/pages/tools/about-us/index', whiteList: true },
  { text: '故障上报', path: '/pages/tools/breakdown/index' },
  { text: '邀请码', path: '/pages/tools/invitation-code/index' },
  { text: '应用设置', path: '/pages/tools/setting/index', whiteList: true },
  { text: '开通套餐', path: '/pages/tools/activate-package/index' }
])
// 常用功能
const toolsNavigate = e => {
  if(!global.accountInfo.token && !e.whiteList) {
    notLoginIn()
    return
  }
  uni.navigateTo({
    url: e.path
  })
}
</script>

<template>
  <scroll-view scroll-y enhanced :bounces="false" :show-scrollbar="false" class="mine-page">
    <div class="page-view ">
      <div class="header">
        <div class="flex-row-sb-c container ">
          <div class="flex-c">
            <image :src="global.userInfo.userPhoto || '/static/imgs/cabinet/lightning.png'" class="avatar" />
            <div class="username">{{ splitString(global.userInfo.nickname, 12) || '您还未设置昵称' }}</div>
          </div>
          <div class="flex-c text-base" @click="goUserInfo">
            <div>查看资料</div>
            <i class="iconfont icon-more text-base"></i>
          </div>
        </div>
        <div class="auth">
          <div v-if="global.userInfo.status === '1'" class="has-auth">感谢您使用途歌共享，请爱护设备。 </div>
          <view v-else class="flex-row-sb-c need-real" >
            <div class="flex-col-se h-full">
              <div>您还未实名认证</div>
              <div>赶紧认证吧~</div>
            </div>
            <div class="auth-btn" @click="goRealName">实名认证</div>
          </view>
        </div>
      </div>
      <div class="container">
        <image src="@/static/imgs/global/logo_op_1.png" class="logo" />
        <div class="flex-row-sb-c menu">
          <image v-for="(i, index) in csMenu" :src="`/static/imgs/mine/cs_${index}.png`" :key="i.path" @click="goCS(i)" mode="widthFix" />
        </div>
        <div class="tools flex-col">
          <div class="title">常用功能</div>
          <div class="flex-1 sprite flex-wrap flex-row-sb-c">
            <div class="flex-col-c tool-item" v-for="(item, index) in tools" :key="index" @click="toolsNavigate(item)">
              <image :src="`/static/imgs/mine/tools_${index}.png`" />
              <div>{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll-view>
  <TabBar :currIndex="4" />
</template>

<style lang="scss" scoped>

.mine-page {
  max-height: 100vh;
  color: white;
  .header {
    height: 300rpx;
    background: linear-gradient(to bottom, #363c4f, #5e5f6f);
    .avatar {
      width: 108rpx;
      height: 108rpx;
      border-radius: 50%;
      margin-right: 28rpx;
    }
    .username {
      font-size: 36rpx;
      font-weight: bold;
      letter-spacing: 2rpx;
    }
    .auth {
      height: 160rpx;
      background-color: #09282b;
      border-radius: 40rpx 40rpx 0 0;
      padding: 0 60rpx;
      margin-top: 60rpx;
      .need-real {
        height: 160rpx;
      }
      .auth-btn {
        font-size: 28rpx;
        font-weight: bold;
        color: #09282b;
        background-color: #fdc401;
        padding: 12rpx 30rpx;
        border-radius: 999rpx;
      }
      .has-auth {
        line-height: 160rpx;
        font-size: 30rpx;
        color: rgba(255, 255, 255, .7);
        letter-spacing: 2rpx;
      }
    }
  }
  .logo {
    width: 200rpx;
    height: 100rpx;
    margin: 60rpx 20rpx 0;
  }
  .menu {
    margin: 30rpx 0;
    image {
      width: 21%;
    }
  }
  .tools {
    color: #333;
    background-color: #fafafa;
    border: 1rpx solid #333;
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    padding: 24rpx 30rpx;
    box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(51, 51, 51, .3);
    .title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 60rpx;
    }
    .tool-item {
      color: black;
      font-size: 28rpx;
      font-weight: normal;
      width: 25%;
      margin-bottom: 30rpx;
      letter-spacing: 2rpx;
      image {
        width: 60rpx;
        height: 60rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>