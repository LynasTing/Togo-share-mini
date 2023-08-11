<script lang="ts" setup>
import type { MediaType } from "@/types/global";
import { post } from "@/utils/request";

// 图片上传
const imgUpload = () => {
  // #ifdef MP-WEIXIN
  uni.chooseMedia({
    count: 3 - params.value.imgUrl.length,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      params.value.imgUrl = params.value.imgUrl.concat(res.tempFiles[0].tempFilePath)
    }
  })
  // #endif

  // #ifdef MP-ALIPAY
  uni.chooseImage({
    count: 3 - params.value.imgUrl.length,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      params.value.imgUrl = params.value.imgUrl.concat(res.tempFilePaths)
    }
  })
  // #endif
}
// 图片删除
const imgDel = (e: string) => {
  params.value.imgUrl = params.value.imgUrl.filter((obj: string) => obj !== e)
}
// 扫描机柜二维码
const scanCabinetCode = () =>{
  uni.scanCode({
    onlyFromCamera: true,
    scanType: ['qrCode'],
    success: res => {
      const { result } = res
      const regex = /deviceUid=([^&]+)/
      const match = result.match(regex)
      if (match) {
        params.value.deviceUid = match[1]
      } else if (!result.includes('http')) {
        params.value.deviceUid = result
      } else {
        uni.showToast({
          title: '无法识别的类型',
          icon: 'error',
          duration: 1.5 * 1000
        })
      }
    },
    fail: err => {
      console.log(`err + ::>>`, err)
      uni.showToast({
        title: '无法识别的类型',
        icon: 'error',
        duration: 1.5 * 1000
      })
    }
  })
}
// 微信临时图片转base64
const toBase64 = (file: string) => {
  const result = uni.getFileSystemManager().readFileSync(file, 'base64')
  return result  
}
// 提交
const params = ref<any>({
  deviceUid: '',
  imgUrl: [],
  problemText: '',
  appId: uni.getAccountInfoSync().miniProgram.appId
})
const submit = () => {
  if(!params.value.deviceUid) {
    uni.showToast({
      title: '请输入机柜编码',
      icon: 'none',
    })
    return
  }
  if(!params.value.problemText) {
    uni.showToast({
      title: '请输入您遇到的问题',
      icon: 'none',
    })
    return
  }
  if(!params.value.imgUrl.length) {
    uni.showToast({
      title: '请您简单提供下故障图片',
      icon: 'none',
    })
    return
  }
  params.value.imgUrl = params.value.imgUrl.map((item: string) => toBase64(item)).join(',')
  post('/changing/tuGeFaultReporting', { ...params.value }, 'json').then(res => {
    if(Object.getOwnPropertyNames(res).length === 0) {
      uni.showToast({
        title: '提交成功，感谢您为我们提供故障信息！',
        icon: 'none',
        duration: 2.5 * 1000
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 2.5 * 1000)
    }
  })
}

</script>

<template>
    <view class="container">
      <view class="cabinet-code">
        <text>租赁柜编码</text>
        <view class="cab-input flex">
          <view class="iconfont icon-saomiaoerweima cab-scan" @click="scanCabinetCode"></view>
          <input class="cab-code w-full" v-model="params.deviceUid"  placeholder="点击输入或点击左侧扫描按钮" maxlength="35" placeholder-style="color:rgb(219,219,219);"/>
        </view>
      </view>
      <view class="description">
        <text>问题描述</text>
        <textarea v-model="params.problemText" placeholder="请详细描述您遇到的问题" placeholder-style="color:rgb(219,219,219);" maxlength="200"  />
      </view>
      <view class="upload-img">
        <text>上传故障照片(最多三张)</text>
        <view class="flex">
          <view class="relative left-0 top-0 flex upload-img-box" v-for="item in params.imgUrl" :key="item" >
            <image class="w-full h-full" :src="item" />
            <view class="iconfont icon-jiaochacross78 icon-del" @click="imgDel(item)"></view>
          </view>
          <image src="@/static/imgs/mine/upload_img.png" @click="imgUpload" v-if="params.imgUrl.length < 3" class="file-upload" />
        </view>
      </view> 
      <view class="submit flex--c" @click="submit">
        <view class="sub" >提 交</view>
      </view>
    </view>
</template>

<style lang="scss" scoped>
.container {
  color: #342919;
  font-size: 30rpx;
  font-weight: bold;
  padding: 30rpx;
  letter-spacing: 1px;
}
.cabinet-code {
  .cab-input {
    margin-top: 32rpx;
    width: 100%;
    height: 100rpx;
    border-radius: 20rpx;
    background-color: #F2F2F2;
    align-items: center;
    font-weight: 400;
    .cab-scan {
      width: 80rpx;
      height: 48rpx;
      font-size: 40rpx;
      color: rgb(114,114,114) ;
      line-height: 48rpx;
      text-align: center;
      padding: 0 30rpx 0 20rpx;
      border-right: rgb(219,219,219) 2rpx solid;
    }
    .cab-code {
      padding-left: 18rpx;
    }
  }
}
.description {
  margin-top: 54rpx;
  & > textarea {
    margin-top: 36rpx;
    padding: 8rpx 18rpx;
    width: 100%;
    height: 200rpx;
    border-radius: 20rpx;
    background-color: #F2F2F2;
    font-weight: 400;
  }
}

.upload-img {
  margin-top: 64rpx;
  & > text {
    display: inline-block;
    margin-bottom: 30rpx;
  }
  .upload-img-box{
    margin-right: 30rpx;
    width: 200rpx;
    height: 200rpx;
    image {
      border-radius: 20rpx;
    }
    .icon-del {
      position: absolute;
      top: -15rpx;
      right: -15rpx;
      font-size: 40rpx;
    }
  }
  .file-upload {
    position: relative;
    display: block;
    width: 200rpx;
    height: 200rpx;
  }
}

.submit {
  margin-top: 200rpx;
  .sub {
    width: 625rpx;
    height: 96rpx;
    line-height: 96rpx;
    color:#000;
    font-size: 35rpx;
    font-weight: 500;
    text-align: center;
    background-color: rgb(252,195,0);
    border-radius: 48rpx;
    letter-spacing: 1px;
  }
}

</style>