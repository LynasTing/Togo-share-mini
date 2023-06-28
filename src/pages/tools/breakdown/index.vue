<script lang="ts" setup>
import type { MediaType } from "@/types/global";

// 图片上传
const imgs = ref<MediaType[]>([])
const imgUpload = () => {
  uni.chooseMedia({
    count: 4 - imgs.value.length,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      console.log(res.tempFiles)
      imgs.value = imgs.value.concat(res.tempFiles)
    }
  })
}
// 图片删除
const imgDel = (e: string) => {
  imgs.value = imgs.value.filter(obj => obj.tempFilePath !== e)
}

</script>

<template>
    <view class="container">
      <view class="cabinet-code">
        <text>租赁柜编码</text>
        <view class="cab-input flex">
          <view class="iconfont icon-saomiaoerweima cab-scan" @click=""></view>
          <input class="cab-code w-full"  placeholder="点击此处扫描电柜屏幕二维码" placeholder-style="color:rgb(219,219,219);"/>
        </view>
      </view>
      <view class="description">
        <text>问题描述</text>
        <textarea placeholder="请详细描述您遇到的问题" placeholder-style="color:rgb(219,219,219);"  />
      </view>
      <view class="upload-img">
        <text>上传故障照片(最多四张)</text>
        <view class="flex">
          <view class="relative left-0 top-0 flex upload-img-box" v-for="(item,index) in imgs" :key="index" >
            <image class="w-full h-full" :src="item.tempFilePath" />
            <view class="iconfont icon-jiaochacross78 icon-del" @click="imgDel(item.tempFilePath)"></view>
          </view>
          <image src="@/static/imgs/mine/upload_img.png" @click="imgUpload" v-if="imgs.length < 4" class="file-upload" />
        </view>
      </view> 
      <view class="submit flex--c">
        <view class="sub" >提 交</view>
      </view>

    </view>

</template>

<style lang="scss" scoped>
.container {
  color: #342919;
  font-size: 30rpx;
  font-weight: bold;
  letter-spacing: 1px;
}
.cabinet-code {
  margin-top: 146rpx;
  .cab-input {
    margin-top: 32rpx;
    width: 100%;
    height: 100rpx;
    border-radius: 20rpx;
    background-color: #F2F2F2;
    align-items: center;
    font-weight: 400;
    .cab-scan {
      width: 140rpx;
      height: 48rpx;
      text-align: center;
      line-height: 1.5rem;
      border-right: rgb(219,219,219) 2rpx solid;
      color: rgb(114,114,114) ;
      font-size: 40rpx;
    }
    .cab-code {
      padding-left: 36rpx;
      padding-right: 36rpx;

    }
  }
}
.description {
  margin-top: 54rpx;
  & > textarea {
    margin-top: 36rpx;
    padding-top: 28rpx;
    padding-left: 38rpx;
    padding-right: 38rpx;
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
      // color: white;
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
  margin-top: 180rpx;
  .sub {
  margin-bottom: 184rpx;
  width: 625rpx;
  height: 96rpx;
  color:#000;
  font-size: 35rpx;
  font-weight: 500;
  line-height: 3rem;
  text-align: center;
  background-color: rgb(252,195,0);
  border-radius: 48rpx;
  letter-spacing: 1px;

  }
}

</style>