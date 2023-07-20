<script lang="ts" setup>
const cabinetUid = ref('')
// 识别到二维码回调
const scanCodeCallBack = e => {
  console.log(`e + ::>>`, e)
  if(e?.detail?.result) {
    /**
     * @_1 公众号、万维、迪川: 如果res中包含deviceUid,就使用device作为主体请求参数;
     * @_2 当res中只有一个参数时,就使用这个参数做主体请求参数;(暂时保留)
     * @_3 当res有多个参数且不包含deviceUid,则识别第一个参数作为主体请求参数;(暂时保留)
     * @_4 康普顿(厂商APK)当res并非请求地址(http开头),例如 HTDC122305001 则直接将二维码内容作为请求参数
     */
    const { result } = e?.detail
    const _d = 'deviceUid'
    let start
    let end
    if(result.indexOf(_d) !== -1) {
      start = result.indexOf(_d) 
      end = result.indexOf('&')
      cabinetUid.value = end !== -1 ? result.substring(start + 10, end) : result.slice(start + 10)
      uni.navigateTo({ url: `/pages/global/tab-bar/scan/lease/index?cabinetUid=${cabinetUid.value}` })
    }else if(!result.includes('http')) {
      cabinetUid.value = result
      uni.navigateTo({ url: `/pages/global/tab-bar/scan/lease/index?cabinetUid=${cabinetUid.value}` })
    }else {
      uni.showToast({
        title: '不支持的类型',
        icon: 'none'
      })
      return
    }
  }
}
const flashLight = ref<boolean>(false)
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
    <cover-image src="@/static/imgs/global/scan_animate.gif " class="animate-img absolute top-half left-half" />
    <cover-view class="desc absolute left-half">请扫描租赁柜屏幕上的二维码</cover-view>
    <cover-view class="flex-1 scan-container"></cover-view>
    <cover-view class="controls fixed bottom-0 left-0 flex-row-sa-c">
      <cover-view class="flex-col-c">
        <cover-image src="@/static/imgs/global/bar_code.png" class="icon" />
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
  z-index: 9;
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