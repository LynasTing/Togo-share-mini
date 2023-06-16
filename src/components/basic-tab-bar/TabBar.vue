<script lang="ts" setup>
let paddingBottomHeight = ref<number>(0) //  适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
const getSystemInfo = async () => {
  try {
    const model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15']
    const res = await uni.getSystemInfo()
    model.forEach(item => {
      if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) paddingBottomHeight.value = 40
    })
  } catch(err) {
    console.log(`获取设备信息捕获错误 + ::>>`, err)
  }
}
// getSystemInfo()
const tabs = [
  {
    text: '首页',
    icon: '/static/imgs/global/home.png',
    chooseIcon: '/static/imgs/global/home_select.png',
    path: '/pages/global/home/index'
  },
  {
    text: '活动',
    icon: '/static/imgs/global/active.png',
    chooseIcon: '/static/imgs/global/home_select.png',
    path: '/pages/global/active/index'
  },
  {
    icon: '',
    text: ''
  },
  {
    text: '商城',
    icon: '/static/imgs/global/mall.png',
    chooseIcon: '/static/imgs/global/mall_select.png',
    path: '/pages/global/mall/index'

  },
  {
    text: '我的',
    icon: '/static/imgs/global/mine.png',
    chooseIcon: '/static/imgs/global/mine_select.png',
    path: '/pages/global/mine/index'
  }
]
const props = defineProps({
  currIndex: {
    type: Number,
    default: 0
  }
})
// tabBar切换
const switchTab = (e, i) => {
  console.log(`e + ::>>`, e)
  uni.switchTab({
    url: e.path
  })
}
</script>

<template>
  <view class="fixed bottom-0 left-0 w-full cus-tab-bar bg-white" :style="{'margin-bottom': paddingBottomHeight + 'rpx'}">
    <ul class="flex-row-sb w-full h-full tabs-ul">
      <li class="flex-col-sb-c" @click="switchTab(item, index)" v-for="(item, index) in tabs" :key="index" :class="[index === 2 ? 'opacity-0 curve' : '']">
        <image :src="props.currIndex === index ? item.chooseIcon : item.icon" />
        <view class="text-xs" :class="props.currIndex === index ? 'chooseText' : ''">{{ item.text }}</view>
      </li>
    </ul>
    <image src="@/static/imgs/global/scan.png" class="scan-icon" />
  </view>
</template>

<style lang="scss" scoped>
.cus-tab-bar {
  height: 156rpx;
  padding: 34rpx 60rpx;
  background-image: url('@/static/imgs/global/tab_bar_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
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