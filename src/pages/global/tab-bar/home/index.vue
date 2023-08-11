<script lang="ts" setup>
import TabBar from '@/components/basic-tab-bar/TabBar.vue'
import useStore from '@/store'
import { post } from '@/utils/request'
import { onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app';
import { displayTime } from '@/utils/tools'
import type { UserBattery } from '@/types/assets/battery'
import type { CabinetsType } from '@/types/cabinet' 

const { global, controls } = useStore()
// 电池信息
const intervalId = ref()
const nowTime = ref<string>('')
const batteryInfo = ref<UserBattery>()
const getBatteryInfo = () => {
  post<UserBattery>('/account/battery', '', 'json').then(res => {
    if(res.batteryId) {
      batteryInfo.value = res 
      global.setBatteryInfo(res)
      nowTime.value = displayTime(batteryInfo.value?.ctime)
    }
  })
}
onLoad((options) => {
  if(options?.scene) controls.setInvitationCode(options!.scene)
})
onShow(() => {
  global.setUserAddress()
  // #ifdef MP-ALIPAY
  uni.hideTabBar()
  // #endif
})
watch(() => global.accountInfo.token, (n, o) => {
  if(n && n !== o) {
    getBatteryInfo()
  }else {
    batteryInfo.value = {} as UserBattery
    clearInterval(intervalId.value)
  }
}, { immediate: true })

watch(() => global?.userAddress, (n, o) => {
  if(n?.location) {
    post<CabinetsType[]>('/tuge/homePageCabinetList', { longitude: n.location.lng, latitude: n.location.lat }, 'json').then(res => {
      if(res?.length) cabinets.value = res 
    })
  }
}, { immediate: true, deep: true })
watch(() => batteryInfo.value?.batteryId, (n) => {
  if(n) {
    intervalId.value = setInterval(() => {
      nowTime.value = displayTime(batteryInfo.value!.ctime)
    }, 1000)
  }else {
    batteryInfo.value = {} as UserBattery
    clearInterval(intervalId.value)
  }
}, { immediate: true })

// 小程序隐藏或页面销毁时清除定时器(节省性能)
onHide(() => {
  clearInterval(intervalId.value)
})
onUnload(() => {
  clearInterval(intervalId.value)
})
const cabinets = ref<CabinetsType[]>()
// 附近柜子
const getNearbyCabinet = ()  => {
  global.setUserAddress()
}
getNearbyCabinet()
// 跳柜子信息
const goCabinetInfo = (e: CabinetsType) => {
  uni.navigateTo({ url: `/pages/cabinet/info/index?id=${e.id}` })
}
// 机柜导航
const mapNavigation = (i: CabinetsType) => {
  uni.openLocation({
    latitude: i.latitude,
    longitude: i.longitude,
    address: i.address,
    name: i.name,
    success: res =>  {
      console.log(`机柜导航成功 + ::>>`, res)
    }
  })
}
// 跳地区选择
const goAreaSelect = () => {
  uni.navigateTo({ url: '/pages/global/area/index'})
}
// 查看更多电池
const goMore = () => {
  uni.navigateTo({ url: '/pages/cabinet/list/index' })
}
// 联系客服拨打电话
const contactCS = () => {
  uni.showModal({
    title: '联系客服',
    content: '是否拨打13810001639',
    success: function (res) {
      if (res.confirm) {
        uni.makePhoneCall({ phoneNumber: '13810001639' })
      }
    }
  })
}
</script>
<template>
  <view class="home-page page-view container" :style="{ 'padding-bottom': 180 + 'rpx' }">
    <!-- 顶部 -->
    <view class="flex-c">
      <image src="@/static/imgs/global/logo.png" class="logo-img" mode="widthFix" />
      <view class="flex-c" @click="goAreaSelect">
        <span>{{ global.usingCity || '福州' }}</span>
        <view class="ar-down"></view>
      </view>
    </view>
    <!-- 当前租赁信息 -->
    <view v-if="batteryInfo?.batteryId" class="battery-info">
      <view class="flex-row-sb-c">
        <view class="green-point"></view>
        <view class="code-num">{{ batteryInfo.batteryId }}</view>
      </view>
      <view class="flex-row-sb-c">
        <view class="flex--c img">
          <image src="@/static/imgs/home/battery.png" mode="widthFix" class="w-full h-full" />
        </view>
        <view class="right flex-1">
          <ul class="use-situation">
            <li class="flex">
              <view>设备型号：</view>
              <view>{{ batteryInfo.typeName }}</view>
            </li>
            <li class="flex">
              <view>起租时间：</view>
              <view>{{ batteryInfo?.ctime }}</view>
            </li>
            <li class="flex">
              <view>累计使用：</view>
              <view>{{ nowTime }}</view>
            </li>
          </ul>
        </view>
      </view>
    </view>
    <image v-else mode="widthFix" src="@/static/imgs/cabinet/no_owned.png" class="w-full default-img" />
    <!-- 附近租赁 -->
    <view class="nearby">
      <view class="header flex-c">
        <view class="relative" >附近租赁柜</view>
        <view class="flex-c flex-1 flex-end">
          <view class="text-xs" @click="goMore">查看更多</view>
          <i class="iconfont icon-more text-base"></i>
        </view>
      </view>
      <ul class="cab-ls" v-if="cabinets?.length">
        <li class="flex-c cab bg-white " v-for="(item, index) in cabinets" :key="index"  @click="goCabinetInfo(item)">
          <image mode="widthFix" src="@/static/imgs/home/cabinet.png" class="cover" />
          <view class="flex-col-sb flex-1 overflow-h">
            <view class="w-full">
              <view class="title">{{ item.name }}</view>
              <view class="address flex">
                <text>地址：</text>
                <text class="del-text-2">{{ item.address }}</text>
              </view>
            </view>
            <view class="flex-row-sb-c bottom-box">
              <view class="lightning-box flex-c">
                <image mode="widthFix" src="@/static/imgs/home/lightning.png"  />
                <view class="cabinet">可租借</view>
                <view>{{ item.useAbleNum || 0 }}</view>
              </view>
              <image mode="widthFix" src="@/static/imgs/home/navigate.png" class="nav" @click.stop="mapNavigation(item)" />
            </view>
          </view>
        </li>
      </ul>
      <view v-else class="empty-ls flex--c">
        <Empty text="没有找到您附近的机柜" class="w-full" />
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="swiper-group">
      <swiper class="swiper overflow-h" circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
        <swiper-item v-for="(i, index) in 2" :key="index" class="item">
          <!-- <image src="@/static/imgs/home/carousel_01.png" mode="widthFix" class="w-full h-full" /> -->
          <image :src="`/static/imgs/home/carousel_0${index + 1}.png`" mode="widthFix" class="w-full h-full" />
          <view>{{ index }}</view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 客服 -->
    <view class="fixed cs">
      <image src="@/static/imgs/home/service.png" mode="widthFix" @click="contactCS" />
    </view>
  </view>
  <TabBar :currIndex="0" class="tab-bar-ref" />
</template>

<style lang="scss" scoped>
.home-page {
  height: 100vh;
  background: linear-gradient(to bottom, #363c4f, #bfbec3, #FFFFFF);
  overflow-y: auto;
  .logo-img {
    width: 160rpx;
    height: 80rpx;
    margin-right: 60rpx;
  }
  .ar-down {
    width: 0;
    height: 0;
    border-left: 12rpx solid transparent;
    border-right: 12rpx solid transparent;
    border-top: 22rpx solid white;
    margin-left: 10rpx;
    transform: translateY(4rpx);
  }
  .battery-info {
    height: 214rpx;
    font-size: 28rpx;
    color: black;
    background-color: white;
    margin: 30rpx 0;
    padding: 10rpx 30rpx 26rpx 20rpx;
    border-radius: 24rpx;
    .green-point {
      left: 16rpx;
      top: 16rpx;
      width: 20rpx;
      height: 20rpx;
      background-color: #38d902;
      border-radius: 50%;
    }
    .code-num {
      font-size: 28rpx;
      margin-top: 10rpx;
    }
    .title {
      text-align: right;
      margin-bottom: 30rpx;
    }
    .img {
      width: 150rpx;
      height: 150rpx;
      margin-right: 50rpx;
    }
    .use-situation {
      white-space: nowrap;
    }
  }
  .default-img {
    margin-top: 10rpx;
  }
  .nearby {
    .header {
      font-size: 30rpx;
      color: #edeff1;
      & > view:first-child {
        margin-right: 40rpx;
      }
      .curr-text {
        color: white;
        font-size: 40rpx;
        font-weight: 500;
        letter-spacing: 2rpx;
        &::before {
          content: '';
          position: absolute;
          bottom: -16rpx;
          transform: translateX(-50%);
          left: 40%;
          width: 84rpx;
          height: 12rpx;
          background-color: #fdc401;
          border-radius: 8rpx;
        }
      }
      .tran-left {
        &::before {
          animation: textAnimateLeft .5s forwards;
        }
      }
      @keyframes textAnimateLeft {
        0% {
          transform: translateX(180rpx);
        }
        100% {
          transform: translateX(-20rpx);
        }
      }
      .tran-right {
        &::before {
          animation: textAnimateRight .5s forwards;
        }
      }
      @keyframes textAnimateRight {
        0% {
          transform: translateX(-180rpx);
        }
        100% {
          transform: translateX(-40rpx);
        }
      }
    }
    .cab-ls {
      .cab {
        color: black;
        margin-top: 30rpx;
        padding: 30rpx 30rpx 28rpx;
        border-radius: 20rpx;
        box-shadow: 0 4rpx 4rpx rgba(0, 0, 0, .3);
        .cover {
          width: 204rpx !important;
          height: 150rpx !important;
          margin-right: 36rpx;
        }
        .title {
          font-size: 30rpx;
          font-weight: bold;
          color: #333333;
        }
        .address {
          font-size: 26rpx;
          color: #aaaaaa;
          white-space: nowrap;
          .del-text-2 {
            font-size: 24rpx;
            max-height: 68rpx;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .bottom-box {
          margin-top: 26rpx;
          .lightning-box {
            font-size: 24rpx;
            color: #888;
            image {
              width: 36rpx;
              height: 36rpx;
            }
            .cabinet {
              margin: 0 10rpx;
            }
          }
          .nav {
            width: 142rpx;
            height: 64rpx;
            z-index: 9;
          }
        }
      }
    }
    .empty-ls {
      min-height: 680rpx;
    }
  }
  .swiper-group {
    height: 200rpx;
    overflow: hidden;
    margin-top: 30rpx;
    border-radius: 24rpx;
    overflow: hidden;
    .swiper {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 24rpx;
      .item {
        border-radius: 24rpx;
      }
    }
    image {
      display: block;
      max-width: 690rpx;
      max-height: 200rpx;
      border-radius: 24rpx;
    }
  }
  .cs {
    right: 4%;
    bottom: 18%;
    z-index: 999;
    image {
      width: 100rpx;
      height: 100rpx;
    }
  }
}
</style>