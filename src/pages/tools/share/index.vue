<script lang="ts" setup>
import { post } from '@/utils/request'
import useStore from '@/store'

const { global } = useStore()
// 滚动条
const scrollTop = ref(0)
const old = ref({
	scrollTop: 0
})
const scroll = (e: any) => {
	old.value.scrollTop = e.detail.scrollTop
}
post('/changing/tuGePromotions', { appId: uni.getAccountInfoSync().miniProgram.appId, accountUid: global.accountInfo.accountUid }, 'json')

const records = ref([
  {
    avatar:'https://c-ssl.dtstatic.com/uploads/blog/202107/19/20210719201624_6d736.thumb.1000_0.png',
    name: 'XXX',
    time: '2023-03-20'
  },
  {
    avatar:'https://c-ssl.dtstatic.com/uploads/blog/202107/19/20210719201624_6d736.thumb.1000_0.png',
    name: 'XXX',
    time: '2023-03-20'
  },
  {
    avatar:'https://c-ssl.dtstatic.com/uploads/blog/202107/19/20210719201624_6d736.thumb.1000_0.png',
    name: 'XXX',
    time: '2023-03-20'
  },
  {
    avatar:'https://c-ssl.dtstatic.com/uploads/blog/202107/19/20210719201624_6d736.thumb.1000_0.png',
    name: 'XXX',
    time: '2023-03-20'
  },
  {
    avatar:'https://c-ssl.dtstatic.com/uploads/blog/202107/19/20210719201624_6d736.thumb.1000_0.png',
    name: 'XXX',
    time: '2023-03-20'
  },
  {
    avatar:'https://c-ssl.dtstatic.com/uploads/blog/202107/19/20210719201624_6d736.thumb.1000_0.png',
    name: 'XXX',
    time: '2023-03-20'
  }
])
</script>

<template>
  <view class="container">
     <image src="@/static/imgs/mine/share.png" class="" />
     <!-- 邀请码 -->
     <view class="invitation-code flex-col-se-c">
      <text>您的邀请码:</text>
      <view>CF96DC20</view>
      <image src="@/static/imgs/mine/share.png" />
      <view class="copy-code flex-col-se-c">复制邀请码</view>
     </view>
     <!-- 邀请记录 -->
     <view class="invitation-record">
      <text>邀请记录</text>
      <view class="name-list">
        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll">
          <v-iew class="flex-row-sb-c mb-26" v-for="(item,index) in records" :key="index">
            <image class="avatar" :src="item.avatar" />
            <view>{{ item.name }}</view>
            <view></view><view></view><view></view><view></view>
            <view>{{ item.time }}</view>
          </v-iew>
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
  margin-top: 36rpx;
  margin-left: 30rpx;
  margin-right: 30rpx;
  padding: 38rpx 32rpx;
  height: 696rpx;
  background-color: #fff;
  border-radius: 28rpx;
  font-weight: 700;
  letter-spacing: 1px;
  & > text {
    display: inline-block;
    margin-bottom: 48rpx;
  }
  .name-list{
    margin-bottom: 90rpx;
    .scroll-Y {
		  height: 500rpx;
	  }
    .mb-26 {
      margin-bottom: 26rpx;
    }
    .avatar {
      width: 76rpx;
      height: 76rpx;
      border-radius: 50% 50%;
    }
  }


}

</style>