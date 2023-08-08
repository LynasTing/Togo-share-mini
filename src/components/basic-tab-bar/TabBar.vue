<script lang="ts" setup>
import type { TabBarType } from '@/types/global';
import useStore from '@/store'
import { onLoad } from '@dcloudio/uni-app';
import { post } from '@/utils/request';
import type { BatteryStatus } from '@/types/controls'

const { global } = useStore()
onLoad(() => {
  uni.getSystemInfo({
    success: res => global.setScrollHeight(res.windowHeight - 78),
    fail: err => {
      console.log(`获取设备高度失败 + ::>>`, err)
      global.setScrollHeight(443)
    }
  })
})
const tabs = reactive<TabBarType[]>([
  {
    text: '首页',
    icon: '/static/imgs/global/home.png',
    chooseIcon: '/static/imgs/global/home_select.png',
    path: '/pages/global/tab-bar/home/index'
  },
  {
    text: '活动',
    icon: '/static/imgs/global/active.png',
    chooseIcon: '/static/imgs/global/home_select.png',
    path: '/pages/global/tab-bar/activity/index'
  },
  {
    icon: '',
    text: '',
    path: ''
  },
  {
    text: '订单',
    icon: '/static/imgs/global/records.png',
    chooseIcon: '/static/imgs/global/mall_select.png',
    path: '/pages/customer-services/records/index'

  },
  {
    text: '我的',
    icon: '/static/imgs/global/mine.png',
    chooseIcon: '/static/imgs/global/mine_select.png',
    path: '/pages/global/tab-bar/mine/index'
  }
])
const props = defineProps({
  currIndex: {
    type: Number,
    default: 0
  }
})
// tabBar切换
const switchTab = (e: TabBarType, i: number) => {
  if(i === 2) return 
  if(i === 3) {
    uni.navigateTo({ url: '/pages/customer-services/records/index' })
    return
  }
  uni.switchTab({  url: e.path })
}
// 跳扫码
const goScan = () => {
  if(!global.accountInfo.token) {
    uni.showToast({
      title: '您还未登录~请在登陆后使用功能',
      icon: 'none',
      mask: true,
      duration: 2 * 1000
    })
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/user-access/login/index' })
    }, 2 * 1000)
    return
  }
  /**
   * 用户无套餐
   */
  if(global.accountInfo.comboStatus !== '0' && global.accountInfo.comboStatus !== '1') {
    uni.showToast({
      title: '您当前无法使用套餐功能',
      icon: 'none'
    })
    return
  }

  /**
   * 查询取电资格
   * @function
   */
  post<BatteryStatus>('/account/batterySituation', '', 'json').then(res => {
    if(Object.getOwnPropertyNames(res).length === 0) {
      uni.showToast({
        title: '您暂无法取电，请确认是否缴纳押金以及购买套餐',
        icon: 'none',
        duration: 3 * 1000
      })
    }else if(res.batteryStatus === '2') {
      uni.showToast({
        title: '您的押金处于审核状态，无法为您提供服务',
        icon: 'none',
        mask: true,
        duration: 3 * 1000
      }) 
    }else {
      global.setAccountInfo({ ...global.accountInfo, batteryStatus: res.batteryStatus })
      uni.setStorageSync('accountInfo', { ...global.accountInfo, batteryStatus: res.batteryStatus })
      uni.navigateTo({ url: '/pages/global/tab-bar/scan/index' })
    }
  })
}
</script>

<template>
  <view class="fixed bottom-0 left-0 w-full cus-tab-bar">
    <ul class="flex-row-sb w-full h-full tabs-ul">
      <li class="flex-col-sb-c" @click="switchTab(item, index)" v-for="(item, index) in tabs" :key="index" :class="[index === 2 ? 'opacity-0 curve' : '']">
        <image :src="props.currIndex === index ? item.chooseIcon : item.icon" />
        <view class="text-xs" :class="props.currIndex === index ? 'chooseText' : ''">{{ item.text }}</view>
      </li>
    </ul>
    <image src="@/static/imgs/global/scan.png" class="scan-icon" @click="goScan" />
  </view>
</template>

<style lang="scss" scoped>
.cus-tab-bar {
  height: 156rpx;
  padding: 34rpx 60rpx;
  background-image: url('@/static/imgs/global/tab_bar_bg.png');
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #F5F5F5;
  z-index: 999;
  .chooseText {
    color: #ffc500;
  }
  image {
    width: 44rpx;
    height: 44rpx;
    color: rgb(51, 51, 51);
  }
  .curve {
    background-color: red;
    border-radius: -20rpx;
  }
  .scan-icon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 110rpx;
    height: 110rpx;
    border-radius: 99rpx;
    opacity: 1;
  }
}
</style>