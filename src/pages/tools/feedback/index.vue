<script lang="ts" setup>
import { post } from "@/utils/request";
import useStore from "@/store";

const { global } = useStore() 

// 类型切换
const currIndex = ref<number>(0)
const btnList = reactive([{ text: '租赁' }, { text: '归还' }, { text: '退费' }])
const typeChange = (e: number) => {
  currIndex.value = e
  params.value.feeedbackType = btnList[e].text
}
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
// 提交
const params = ref<any>({
  feedback: '',
  imgUrl: [],
  feedbackType: '租赁',
  phone: '',
  organizationId: global.accountInfo.organizationId,
  appId: uni.getAccountInfoSync().miniProgram.appId
})
// 微信临时图片转base64
const toBase64 = (file: string) => {
  const result = uni.getFileSystemManager().readFileSync(file, 'base64')
  return result  
}
const submit = () => {
  if(!params.value.feedback) {
    uni.showToast({
      title: '请您简述下您的宝贵意见',
      icon: 'none',
    })
    return
  }
  if(!params.value.phone || !uni.$u.test.mobile(params.value.phone)) {
    uni.showToast({
      title: '请留下您的联系电话',
      icon: 'none',
    })
    return
  }
  params.value.imgUrl = params.value.imgUrl.map((item: string) => toBase64(item)).join(',')
  post('/changing/tuGeFeedback', { ...params.value }, 'json')
    .then(res => {
      uni.showToast({
        title: `提交成功，感谢您的反馈！`,
        icon: 'none',
        duration: 2 * 1000
      })
    })
    .catch(err => {
      console.log(`进入catch + ::>>`, )
    })
    params.value = {}
    setTimeout(() => {
      uni.navigateBack()
    }, 2 * 1000)
}

</script>
<template>
  <view class="container">
    <view class="feedback-type">
      <text>反馈类型</text>
      <view class="btn flex-row-sb">
        <view class="box btn-normal" v-for="(item,index) in btnList" :key="index" :class="currIndex === index ? 'btn-choose' : ''" @click="typeChange(index)">{{ item.text }}</view>
      </view>
    </view>
    <view class="description">
      <text>详细描述</text>
      <textarea v-model="params.feedback" placeholder="请输入问题描述" placeholder-style="color:rgb(219,219,219);" maxlength="100"  />
    </view>
    <view class="upload-img">
      <text>上传图片({{ params.imgUrl.length }}/3)</text>
      <view class="flex">
        <view class="relative left-0 top-0 flex upload-img-box" v-for="item in params.imgUrl" :key="item" >
          <image class="w-full h-full" :src="item" />
          <view class="iconfont icon-jiaochacross78 icon-del" @click="imgDel(item)"></view>
        </view>
        <image src="@/static/imgs/mine/upload_img.png" @click="imgUpload" v-if="params.imgUrl.length < 3" class="file-upload" />
      </view>
    </view>    
    <view class="phone">
      <view>联系方式</view>
      <input v-model="params.phone" type="tel" class="phone-input w-full" maxlength="11" placeholder="请输入联系方式" placeholder-style="color:rgb(219,219,219);"/>
    </view>
    <view class="submit flex--c" @click="submit">
      <view class="sub">提交</view>
    </view>
  </view>
</template>
<style lang="scss" scoped>

.container {
  color: #342919;
  font-size: 30rpx;
  font-weight: bold;
  padding: 30rpx ;
}
.btn-normal {
  width: 200rpx;
  height: 76rpx;
  line-height: 76rpx;
  color: #999;
  background-color: #fff;
  margin-top: 30rpx;
  text-align: center;
  border: 2rpx solid #707070 ;
  border-radius: 15rpx;
  letter-spacing: 4rpx;
}
// .btn-choose {
//   width: 200rpx;
//   height: 76rpx;
//   margin-top: 30rpx;
//   border-radius: 15rpx;
//   font-weight: normal;
//   text-align: center;
//   letter-spacing: 2px;
//   line-height: 2.3rem;
// }
.btn-choose {
  color: #fff;
  background-color: rgb(10,34,44);
}

.description {
  margin-top: 48rpx;
}
.description textarea {
  width: 100%;
  height: 166rpx;
  font-size: 28rpx;
  font-weight: 400;
  margin-top: 34rpx;
  padding: 8rpx 18rpx;
  border-radius: 20rpx;
  background-color: #F2F2F2;
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
  margin-top: 70rpx;
  .sub {
    width: 625rpx;
    height: 105rpx;
    line-height: 105rpx;
    color:#fff;
    font-size: 35rpx;
    font-weight: 500;
    text-align: center;
    background: linear-gradient(135deg, transparent 30rpx, rgb(252,195,0) 0);
    background-repeat: no-repeat;
    border-radius: 0;
    letter-spacing: 4px;
  }
}

</style>