<script lang="ts" setup>
import type { TabBarType } from '@/types/global';
import useStore from '@/store'
import { onLoad } from '@dcloudio/uni-app';

const { global } = useStore()
let paddingBottomHeight = computed(() => global.paddingBottomHeight) //  适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
const getSystemInfo = async () => {
  try {
    const model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15', 'SE']
    const res = await uni.getSystemInfo()
    const { global } = useStore()
    model.forEach(item => {
      if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) global.setPaddingBottomHeight(40)
    })
  } catch(err) {
    console.log(`获取设备信息捕获错误 + ::>>`, err)
  }
}
getSystemInfo()
const tabs = reactive<TabBarType[]>(
  [
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
      path: '/pages/global/tab-bar/active/index'
    },
    {
      icon: '',
      text: '',
      path: ''
    },
    {
      text: '商城',
      icon: '/static/imgs/global/mall.png',
      chooseIcon: '/static/imgs/global/mall_select.png',
      path: '/pages/global/tab-bar/mall/index'

    },
    {
      text: '我的',
      icon: '/static/imgs/global/mine.png',
      chooseIcon: '/static/imgs/global/mine_select.png',
      path: '/pages/global/tab-bar/mine/index'
    }
  ]
)
const props = defineProps({
  currIndex: {
    type: Number,
    default: 0
  }
})
// tabBar切换
const switchTab = (e: TabBarType, i: number) => {
  if(i === 2) return 
  uni.switchTab({  url: e.path })
}
// 跳扫码
const goScan = () => uni.navigateTo({ url: '/pages/global/scan/index' })
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