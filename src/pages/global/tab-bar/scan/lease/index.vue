<script lang="ts" setup>
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { post } from '@/utils/request'
import useStore from '@/store'
import type { batteryCtrlType, BatteryStatus } from '@/types/controls'

const { global, controls } = useStore()
const cabinetUid = ref<string>('')
onLoad(options => {
  if(options?.cabinetUid) cabinetUid.value = options.cabinetUid
})
// 租赁/归还操作
const batteryControls = (type: string) => {
  post(`/battery/${type === '0' ? 'getBattery' : 'returnBattery'}`, { cabinetUid: cabinetUid.value }).then(res => {
    if(Object.getOwnPropertyNames(res).length === 0) checkBoxCloseFn(type)
  })
}
watch(() => global.accountInfo.batteryStatus, async (n, o) => {
  if(n === '0' || n === '1') {
    await nextTick(() => {})
    batteryControls(n)
  }
}, { immediate: true })

const orderInfo = ref<batteryCtrlType>()
// 租赁/归还回调轮询
const showOverlay = ref<boolean>(false)
const intervalId = ref<number>(0)
const countDown = ref<number>(180)
const checkBoxCloseFn = (type: string) => {
  showOverlay.value = true
  intervalId.value = setInterval(() => {
    if(countDown.value >= 3) countDown.value--
    post<batteryCtrlType>('/account/polling', { type }, 'json', true).then(res => {
      if(res?.status === 1) {
        orderInfo.value = res
        uni.hideLoading()
        clearInterval(intervalId.value)
        controls.setCtrlBattery(orderInfo.value)
        controls.setCtrlType(type)
        uni.reLaunch({ url: `/pages/global/tab-bar/scan/lease/succeed/index` })
      }else if(res.status === 2) {
        clearInterval(intervalId.value)
        uni.showToast({
          title: `${type === '1' ? '租借' : '归还'}电池失败，请联系管理员`,
          icon: 'none',
          mask: true,
          duration: 3 * 1000
        })
        setTimeout(() => {
          clearInterval(intervalId.value)
          uni.switchTab({ url: '/pages/global/tab-bar/home/index' })
        }, 3 * 1000)
      }
    }).catch(err => {
      console.log(`err + ::>>`, err)
      clearInterval(intervalId.value)
      uni.showToast({
        title: `请求错误，请联系管理员`,
        icon: 'none',
        mask: false,
        duration: 2 * 1000
      })
    })
  }, 1 * 1000)
}
onUnload(() => {
  uni.hideLoading()
  clearInterval(intervalId.value)
  clearTimeout(timeOut)
})
// 三分钟为超时，直接提示超时，然后跳首页
const timeOut = setTimeout(() => {
  uni.hideLoading()
  uni.showToast({
    title: '您的操作超时，将结束操作',
    icon: 'none',
    mask: true,
    duration: 2.5 * 1000
  })
  setTimeout(() => {
    uni.switchTab({ url: `/pages/global/tab-bar/home/index` })
  }, 2.5 * 1000)
}, 3 * 60 * 1000)
</script>

<template>
  <view class="lease-page">
    <image src="@/static/imgs/lease/cabinet.png" mode="widthFix" class="w-full cabinet-img" />
    <view class="flex-row-sb-c info">
      <view>机柜编号</view>
      <view>{{ cabinetUid || 'TOGO112233445566' }}</view>
    </view>
    <view class="flex-row-sb-c info">
      <view>操作类型</view>
      <view>{{ global.accountInfo?.batteryStatus === '0' ? '租用操作' : '电池归还' }}</view>
    </view>
    <image :src="`/static/imgs/lease/${global.accountInfo?.batteryStatus === '0' ? 'rent' : 'return'}.png`" mode="widthFix" class="w-full flow-img" />
    <view class="tips">
      <view class="item">
        <view>*抓牢取出，注意安全。</view>
        <view>*请妥善保管电源，损坏须赔偿。</view>
        <view class="flex-row-sb-c">
          <view>*请将电源远离水源和火源。</view>
          <view class="btn">查看用户协议</view>
        </view>
      </view>
      <view class="item flex-row-sb-c">
        <view>*租赁业务按时计费，请及时归还。</view>
        <view class="btn">查看计费标准</view>
      </view>
      <view class="item flex-row-sb-c">
        <view>*请阅读电源产品说明。</view>
        <view class="btn">查看产品说明</view>
      </view>
    </view>
  </view>
  <u-overlay :show="showOverlay">
		<view class="mask h-full">
      <u-loading-icon mode="semicircle" size="36" color="white" />
      您的操作正在进行中，请勿离开本页面<br>{{ countDown }}秒后自动结束流程，
    </view>
	</u-overlay>
</template>

<style lang="scss" scoped>
.lease-page {
  padding: 30rpx;
  .cabinet-img {
    margin-bottom: 80rpx;
  }
  .info {
    font-size: 30rpx;
    color: #444;
    margin-bottom: 32rpx;
  }
  .flow-img {
    margin: 30rpx 0 40rpx 0;
  }
  .tips {
    font-size: 28rpx;
    .item {
      margin-bottom: 40rpx;
      .btn {
        font-size: 24rpx;
        color: white;
        background-color: black;
        padding: 6rpx 20rpx;
        border-radius: 999rpx;
      }
    }
  }
}
.mask {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 30rpx;
}
</style>