<script lang="ts" setup>
import { post } from '@/utils/request'

// 识别机柜信息
const recognizeCabinet = () => {
  setTimeout(() => {
    timer.value = true
  }, 3 * 1000)
  post('/account/checkCabinet', { ...obj.value }, 'json').then(res => {
    uni.redirectTo({ url: `/pages/global/tab-bar/scan/lease/index?cabinetUid=${res}` })
  })
}
// 识别到二维码回调
const obj = ref<any>()
const timer = ref<boolean>(true)
const scanCodeCallBack = (e: { detail: { result: any } }) => {
  if(!timer.value) return
  if(e?.detail?.result) {
    /**
     * @_1 公众号、万维、迪川: 如果res中包含deviceUid,就使用device作为主体请求参数
     * @_2 当res中只有一个参数时,就使用这个参数做主体请求参数(暂时保留)
     * @_3 当res有多个参数且不包含deviceUid,则识别第一个参数作为主体请求参数(暂时保留)
     * @_4 康普顿(厂商APK)当res并非请求地址(http开头),例如 HTDC122305001 则直接将二维码内容作为请求参数
     */
    const { result } = e?.detail
    const _d = 'deviceUid'
    if(result.includes(_d)) {
      const startIndex = result.indexOf(_d)
      const endIndex = result.indexOf('&', startIndex + _d.length)
      if (endIndex !== -1) {
        obj.value = { qrCodeInfo: result.substring(startIndex + _d.length + 1, endIndex) }
      } else {
        obj.value = { qrCodeInfo: result.slice(startIndex + _d.length + 1) }
      }
    }else if (!result.includes('http')) {
      obj.value = { deviceId: result }
    }
    timer.value = false
    recognizeCabinet()
  }
}
const flashLight = ref<boolean>(false)
// 输入换电码
const inputCabinetUid = () => {
  uni.showToast({
    title: '暂未开放，敬请期待~',
    icon: 'none',
    duration: 1 * 1000
  })
}
// 打开/关闭手电筒
const flashChange = () => {
  flashLight.value = !flashLight.value
}
</script>

<template>
  <camera 
    binderror="error" 
    device-position="back" 
    :flash="flashLight ? 'on' : 'off'"  
    mode="scanCode" 
    resolution="high" 
    class="w-full h-screen"
    @scancode="scanCodeCallBack"
  />
  <cover-view class="w-full h-screen absolute top-0 left-0 scan-page flex-col overflow-h">
    <cover-image src="@/static/imgs/global/scan_animate.gif" class="animate-img absolute top-half left-half" />
    <cover-view class="desc absolute left-half">请扫描租赁柜屏幕上的二维码</cover-view>
    <cover-view class="flex-1 scan-container"></cover-view>
    <cover-view class="controls fixed bottom-0 left-0 flex-row-sa-c">
      <cover-view class="flex-col-c">
        <cover-image src="@/static/imgs/global/bar_code.png" class="icon" @click="inputCabinetUid" />
        <cover-view>输入换电码</cover-view>
      </cover-view>
      <cover-view class="flex-col-c">
        <cover-image src="@/static/imgs/global/fash_light.png" class="icon" @click="flashChange"/>
        <cover-view>打开手电筒</cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>
<style lang="scss" scoped>
.scan-page {
  background: rgba(49, 49, 49, 0.4);
  .animate-img {
    width: 460rpx;
    height: 460rpx;
    transform: translate(-50%, -80%);
  }
  .desc {
    top: 58%;
    transform: translate(-50%, 50%);
    width: 100%;
    color: white;
    font-size: 28rpx;
    text-align: center;
    z-index: 9;
    letter-spacing: 4rpx;
  }
  .scan-container {
    background-color: rgba(0, 0, 0, 0.01);
    opacity: 0.1;
    z-index: 9;
  }
  .controls {
    width: 100%;
    font-size: 28rpx;
    color: white;
    background-color: rgba(35, 37, 36, .6);
    padding: 40rpx 30rpx;
    letter-spacing: 4rpx;
    z-index: 9;
    .icon {
      width: 100rpx;
      height: 100rpx;
      margin-bottom: 14rpx;
    }
  }
}

</style>