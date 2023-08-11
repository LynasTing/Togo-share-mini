<script lang="ts" setup>
import { post } from '@/utils/request'
import type { Share, InvitationRecord } from '@/types/tools'
import useStore from '@/store'
import { splitString } from '@/utils/tools'

const { global } = useStore()
// 滚动条
const scrollTop = ref(0)
const old = ref({
	scrollTop: 0
})
const scroll = (e: any) => {
	old.value.scrollTop = e.detail.scrollTop
}

/**
 * 邀请码及分享二维码 
 */
const codeAndImage = ref<Share>() 
const invitationRecords = ref<InvitationRecord[]>([])
post<Share>('/changing/tuGePromotions', { appId: uni.getAccountInfoSync().miniProgram.appId, accountUid: global.accountInfo.accountUid }, 'json')
  .then(res => {
    codeAndImage.value = res
    // 邀请记录
    post<InvitationRecord[]>('/changing/tuGeInvitationRecord', { appId: uni.getAccountInfoSync().miniProgram.appId }, 'json').then(res => {
      invitationRecords.value = res
    })
  })

/**
 * 复制邀请码
 */
const copyCode = () => {
  if(!codeAndImage.value?.invitationCode) return
  uni.setClipboardData({
    data: codeAndImage.value?.invitationCode,
  })
}
</script>

<template>
  <view class="container">
    <image src="@/static/imgs/mine/share.png" class="" />
    <view class="invitation-code flex-col-se-c">
      <text>您的邀请码:</text>
      <view>{{ codeAndImage?.invitationCode || 'CF96DC20' }}</view>
      <image :src="codeAndImage?.path || '@/static/imgs/mine/share.png'" />
      <view class="copy-code flex-col-se-c" @click="copyCode">复制邀请码</view>
     </view>
    <view class="invitation-record" v-if="invitationRecords.length">
      <text>邀请记录</text>
      <view class="name-list">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-y" @scroll="scroll">
          <view class="flex-row-sb-c mb-26" v-for="(item,index) in invitationRecords" :key="index">
            <view class="flex-c">
              <image class="avatar" :src="item.userPhoto || 'https://c-ssl.dtstatic.com/uploads/blog/202107/19/20210719201624_6d736.thumb.1000_0.png'" />
              <view>{{ splitString(item.userNickname, 7) }}</view>
            </view>
            <view class="time">{{ item.time }}</view>
          </view>
        </scroll-view>
      </view>
     </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 0;
  padding-bottom: 62rpx;
  color: #342919;
  font-size: 30rpx;
  background-color: rgb(42,57,189);
  
  & > image {
    width: 100%;
    height: 800rpx;
  }
}
.invitation-code {
  margin-left: 30rpx;
  margin-right: 30rpx;
  height: 734rpx;
  background-color: #fff;
  border-radius: 28rpx;
  & > text {
    color: #999;
    font-size: 36rpx; 
    letter-spacing: 1px;

  }
  & > image {
    width: 392rpx;
    height: 392rpx;
  }
  .copy-code {
    width: 392rpx;
    height: 96rpx;
    background-color: #0060AF;
    border-radius: 48rpx;
    color: #fff;
    font-weight: 400;
    letter-spacing: 1px;
  }
}
.invitation-record {
  font-weight: 600;
  margin: 36rpx 30rpx 0 30rpx;
  padding: 38rpx 32rpx;
  background-color: #fff;
  border-radius: 28rpx;
  letter-spacing: 1px;
  & > text {
    display: inline-block;
    margin-bottom: 48rpx;
  }
  .name-list {
    .scroll-y {
		  max-height: 500rpx;
	  }
    .mb-26 {
      margin-bottom: 26rpx;
      font-size: 26rpx;
      .avatar {
        width: 66rpx;
        height: 66rpx;
        margin-right: 20rpx;
        border-radius: 50% 50%;
      }
      .time {
        font-size: 24rpx;
      }
    }
  }
}

</style>