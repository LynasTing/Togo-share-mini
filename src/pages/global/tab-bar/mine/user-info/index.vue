<script lang="ts" setup>
import useStore from '@/store'
import type { UserInfo } from '@/types/global'
import { post } from '@/utils/request'
import { onShow } from '@dcloudio/uni-app'

const { global } = useStore()
onShow(() => {
  if(global.accountInfo.token) {
    post<UserInfo>('/changing/tuGeRecUserInfo', '', 'json').then(res => global.setUserInfo(res as UserInfo))
  }
})

// 跳填写个人信息
const goFillOut = () => {
  uni.navigateTo({ url: '/pages/global/tab-bar/mine/fill-out/index' })
}
// 跳实名认证
const goRealName = () => {
  if(global.accountInfo.isRealName || global.userInfo.status) {
    uni.showToast({
      title: '您已完成实名认证，请开始使用吧~',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({ url: '/pages/global/tab-bar/mine/real-name-auth/index' })
}
</script>

<template>
  <view class="info-page">
    <view class="avatar flex-row-sb-c" @click="goFillOut">
      <view>头像</view>
      <view class="flex--c">
        <image mode="widthFix" :src="global.userInfo.userPhoto || '/static/imgs/cabinet/lightning.png'"  />
        <text class="iconfont icon-youjiantou"></text>
      </view>
    </view>
    <view class="px-30">
      <view class="has-border" @click="goFillOut">
        <view>昵称</view>
        <view >
          <text>{{ global.userInfo.nickname || '请前往填写' }}</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </view>
    </view>
    <view class="px-30">
      <view class="has-border">
        <view>手机号</view>
        <view class="pr-20">{{ global.accountInfo.phone || '--' }}</view>
      </view>
    </view>
    <view class="px-30">
      <view class="has-border" @click="goRealName">
        <view>实名认证</view>
        <view>
          <text>{{ global.userInfo.status === '0' ? '未完成认证' : '已完成认证' }}</text>
          <text class="iconfont icon-youjiantou" v-if="!global.accountInfo.isRealName"></text>
        </view>
      </view>
    </view>
    <view v-show="global.userInfo.status === '1'">
      <view class="px-30">
        <view class="has-border">
          <view>性别</view>
          <view @click="goFillOut">
            <text class="pr-20">男</text>
          </view>
        </view>
      </view>
      <view class="px-30">
        <view class="has-border">
          <view>出生年月</view>
          <view @click="goFillOut" class="pr-20">1997-06</view>
        </view>
      </view>
      <view class="px-30">
        <view class="has-border no-border">
          <view>归属地区</view>
          <view @click="goFillOut" class="pr-20">福建福州</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.info-page {
  height: 100vh;
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
  background-color: #f9fbfc;
  padding: 22rpx 0;
  .iconfont {
    color: #ccc;
    margin-left: 10rpx;
  }
  .px-30 {
    padding: 0 30rpx;
    background-color: white;
    .has-border {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #eeeaea;
      &>view:last-child {
        font-weight: 500;
        color: #999999;
      }
      .pr-20 {
        padding-right: 20rpx;
      }
    }
    .no-border {
      border-bottom: 1rpx solid transparent;
    }
  }
  .avatar {
    margin-bottom: 22rpx;
    padding: 20rpx 30rpx;
    background-color: white;
    image {
      width: 92rpx;
      height: 92rpx;
      border-radius: 999rpx;
    }
  }
}
</style>