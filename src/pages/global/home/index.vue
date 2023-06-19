<script lang="ts" setup>
import TabBar from '@/components/basic-tab-bar/TabBar.vue'

const currText = ref<number>(0)
const tabs = reactive([{ text: '附近租赁柜' }, { text: '附近零售门店' }])
const cabinets = ref([
  {
    name: '福州仓山万达站',
    address: '福建省福州市鼓楼区XXX',
    num: 999
  },
  {
    name: '福州仓山万达站',
    address: '福建省福州市鼓楼区XXX',
    num: 999
  },
  {
    name: '福州仓山万达站',
    address: '福建省福州市鼓楼区XXX',
    num: 999
  }
])
const tabChange = (e: number) => {
  currText.value = e
}
// 查看更多
const goMore = () => {
  uni.navigateTo({
    url: '/pages/cabinet/list/index'
  })
}
</script>

<template>
  <view class="home-page page-view container">
    <!-- 顶部 -->
    <view class="flex-c">
      <image src="@/static/imgs/global/logo.png" class="logo-img" mode="widthFix" />
      <view class="flex-c">
        <span>福州</span>
        <view class="ar-down"></view>
      </view>
    </view>
    <!-- 当前租赁信息 -->
    <view class="curr-info relative flex-row-sb-c">
      <view class="green-point absolute"></view>
      <view class="flex--c img">
        <image src="@/static/imgs/home/togo_box.png" mode="widthFix" class="w-full h-full" />
      </view>
      <view class="">
        <view class="title">TOGO001TOGO001000</view>
        <ul>
          <li class="flex">
            <view>设备型号</view>
            <view>M1000-S</view>
          </li>
          <li class="flex">
            <view>设备型号</view>
            <view>M1000-S</view>
          </li>
          <li class="flex">
            <view>设备型号</view>
            <view>M1000-S</view>
          </li>
        </ul>
      </view>
    </view>
    <!-- 附近租赁 -->
    <view class="nearby">
      <view class="header flex-c">
        <view v-for="(item, index) in tabs" :key="index" class="relative" :class="[index === currText ? 'curr-text': '', currText === 0 ? 'tran-left': 'tran-right']" @click="tabChange(index)">{{ item.text }}</view>
        <view class="flex-c flex-1 flex-end">
          <view class="text-xs" @click="goMore">查看更多</view>
          <i class="iconfont icon-more text-base"></i>
        </view>
      </view>
      <ul class="cab-ls">
        <li class="flex-c cab bg-white" v-for="(item, index) in cabinets" :key="index">
          <image mode="widthFix" src="@/static/imgs/home/cabinet.png" class="cover" />
          <view class="flex-col-sb flex-1">
            <view>
              <view class="title">{{ item.name }}</view>
              <view class="address">地址：{{ item.address }}</view>
            </view>
            <view class="flex-row-sb-c bottom-box">
              <view class="lightning-box flex-c">
                <image mode="widthFix" src="@/static/imgs/home/lightning.png"  />
                <view class="cabinet">租赁柜</view>
                <view>{{ item.num }}</view>
              </view>
              <image mode="widthFix" src="@/static/imgs/home/navigate.png" class="nav" />
            </view>
          </view>
        </li>
      </ul>
    </view>
    <!-- 轮播图 -->
    <view class="swiper-group">
      <swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
        <swiper-item v-for="(i, index) in 3" :key="index">
          <image src="@/static/imgs/home/carousel_01.png" mode="widthFix" class="w-full h-full" />
          <!-- <image :src="`/static/imgs/home/cabinet_0${index + 1}.png`" mode="widthFix" class="w-full h-full" /> -->
          <view>{{ index }}</view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 客服 -->
    <view class="fixed cs">
      <image src="@/static/imgs/home/service.png" mode="widthFix" />
    </view>
  </view>
  <TabBar :currIndex="0" />
</template>

<style lang="scss" scoped>
.home-page {
  height: calc(100vh + (156rpx * 3) - 40rpx);
  background: linear-gradient(to bottom, #363c4f, #bfbec3, #FFFFFF);
  .logo-img {
    width: 160rpx;
    height: 80rpx;
    margin-right: 60rpx;
  }
  .ar-down {
    width: 0;
    height: 0;
    border-left: 12rpx solid transparent;
    border-right: 12rpx solid transparent;
    border-top: 22rpx solid white;
    margin-left: 10rpx;
    transform: translateY(4rpx);
  }
  .curr-info {
    color: black;
    background-color: white;
    margin: 30rpx 0;
    padding: 18rpx 30rpx 26rpx;
    border-radius: 24rpx;
    .green-point {
      left: 16rpx;
      top: 16rpx;
      width: 20rpx;
      height: 20rpx;
      background-color: #38d902;
      border-radius: 50%;
    }
    .title {
      text-align: right;
      margin-bottom: 30rpx;
    }
    .img {
      width: 200rpx;
      height: 180rpx;
      margin: 30rpx 30rpx 0 0 ;
    }
  }
  .nearby {
    .header {
      font-size: 30rpx;
      color: #edeff1;
      & > view:first-child {
        margin-right: 40rpx;
      }
      .curr-text {
        color: white;
        font-size: 40rpx;
        font-weight: 500;
        letter-spacing: 2rpx;
        &::before {
          content: '';
          position: absolute;
          bottom: -16rpx;
          transform: translateX(-50%);
          left: 50%;
          width: 74rpx;
          height: 12rpx;
          background-color: #fdc401;
          border-radius: 8rpx;
        }
      }
      .tran-left {
        &::before {
          animation: textAnimateLeft .5s forwards;
        }
      }
      @keyframes textAnimateLeft {
        0% {
          transform: translateX(180rpx);
        }
        100% {
          transform: translateX(-20rpx);
        }
      }
      .tran-right {
        &::before {
          animation: textAnimateRight .5s forwards;
        }
      }
      @keyframes textAnimateRight {
        0% {
          transform: translateX(-180rpx);
        }
        100% {
          transform: translateX(-40rpx);
        }
      }
    }
    .cab-ls {
      .cab {
        color: black;
        margin-top: 30rpx;
        padding: 30rpx 30rpx 28rpx;
        border-radius: 20rpx;
        box-shadow: 0 4rpx 4rpx rgba(0, 0, 0, .3);
        .cover {
          width: 204rpx;
          height: 150rpx;
          margin-right: 36rpx;
        }
        .title {
          font-size: 30rpx;
          font-weight: bold;
          color: #333333;
        }
        .address {
          font-size: 26rpx;
          color: #aaaaaa;
        }
        .bottom-box {
          margin-top: 36rpx;
          .lightning-box {
            font-size: 24rpx;
            color: #888;
            image {
              width: 36rpx;
              height: 36rpx;
            }
            .cabinet {
              margin: 0 20rpx 0 16rpx;
            }
          }
          .nav {
            width: 142rpx;
            height: 64rpx;
          }
        }
      }
    }
  }
  .swiper-group {
    height: 200rpx;
    overflow: hidden;
    margin-top: 30rpx;
    border-radius: 24rpx;
    overflow: hidden;
    .swiper {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 24rpx;
    }
    image {
      display: block;
      max-width: 690rpx;
      max-height: 200rpx;
      border-radius: 24rpx;
    }
  }
  .cs {
    right: 4%;
    bottom: 18%;
    image {
      width: 100rpx;
      height: 100rpx;
    }
  }
}
</style>