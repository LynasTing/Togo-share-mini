<script lang="ts" setup>
import type { MediaType } from "@/types/global";

// 类型切换
const currIndex = ref<number>(0)
const btns = reactive([{ text: '租赁' }, { text: '归还' }, { text: '退费' }])
const typeChange = (e: number) => {
  currIndex.value = e
}

// 图片上传
const imgs = ref<MediaType[]>([])
const imgUpload = () => {
  uni.chooseMedia({
    count: 3 - imgs.value.length,
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
    <view class="feedback-type">
      <text>反馈类型</text>
      <view class="btn flex-row-sb">
        <view class="box btn-normal" v-for="(item,index) in btns" :key="index" :class="currIndex === index ? 'btn-choose' : ''" @click="typeChange(index)">{{ item.text }}</view>
        <!-- <view class="box btn-normal" :class="currIndex === 0 ? 'btn-choose' : ''" @click="typeChange(0)">租赁</view>
        <view class="box btn-normal" :class="currIndex === 1 ? 'btn-choose' : ''" @click="typeChange(1)">归还</view>
        <view class="box btn-normal" :class="currIndex === 2 ? 'btn-choose' : ''" @click="typeChange(2)">退费</view> -->
      </view>
    </view>
    <view class="description">
      <text>详细描述</text>
      <textarea placeholder="请输入问题描述" placeholder-style="color:#999;font-weight:400;"  />
    </view>
    <view class="upload-img">
      <text>上传图片({{ imgs.length }}/3)</text>
      <view class="flex">
        <view class="relative left-0 top-0 flex upload-img-box" v-for="(item,index) in imgs" :key="index" >
          <image class="w-full h-full" :src="item.tempFilePath" />
          <view class="iconfont icon-jiaochacross78 icon-del" @click="imgDel(item.tempFilePath)"></view>
        </view>
        <image src="@/static/imgs/mine/upload_img.png" @click="imgUpload" v-if="imgs.length < 3" class="file-upload" />
      </view>
    </view>    
    <view class="phone">
      <text>联系方式</text>
      <input class="phone-input" maxlength="11" placeholder="请输入联系方式"/>
    </view>
    <view class="submit flex--c">
      <view class="sub" >提交</view>
    </view>
  </view>

</template>

<style lang="scss" scoped>

.container {
  color: #333;
  font-size: 30rpx;
  font-weight: bold;

}
.feedback-type {
  margin-top: 77rpx;
}
.btn-normal {
  margin-top: 30rpx;
  margin-left: 0;
  margin-right: 0;
  width: 200rpx;
  height: 76rpx;
  background: #fff;
  border: 1px solid #707070 ;
  border-radius: 15rpx;
  color: #999;
  font-weight: normal;
  text-align: center;
  letter-spacing: 2px;
  line-height: 2.3rem;

}

.btn-choose {
  margin-top: 30rpx;
  margin-left: 0;
  margin-right: 0;
  width: 200rpx;
  height: 76rpx;
  background: rgb(10,34,44);
  border-radius: 15rpx;
  color: #fff;
  font-weight: normal;
  text-align: center;
  letter-spacing: 2px;
  line-height: 2.3rem;
}

.description {
  margin-top: 48rpx;
  
}

.description textarea {
  margin-top: 34rpx;
  height: 166rpx;
  padding: 30rpx;
  border-radius: 20rpx;
  background-color: #F2F2F2;
  font-weight: 400;
  letter-spacing: 1px;

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

.phone {
  margin-top: 42rpx;
}
.phone-input {
  height: 86rpx;
  padding-left: 36rpx;
  margin-top: 28rpx;
  border-radius: 20rpx;
  background-color: #F2F2F2;
  font-weight: 400;
}

.submit {
  margin-top: 180rpx;
}
.sub {
  margin-bottom: 114rpx;
  width: 625rpx;
  height: 105rpx;
  color:#fff;
  font-size: 35rpx;
  font-weight: 500;
  line-height: 3rem;
  text-align: center;
  background: linear-gradient(135deg, transparent 15px, rgb(252,195,0) 0);
  background-repeat: no-repeat;
  border-radius: 0;
  letter-spacing: 1px;

}
</style>