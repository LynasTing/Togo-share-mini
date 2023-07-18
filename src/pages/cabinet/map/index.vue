<script lang="ts" setup>
import { post } from '@/utils/request'
import { onReady } from '@dcloudio/uni-app'
import type { MapMarkersType, MapCardType } from '@/types/cabinet'

const keywords = ref<string>('')
const lat = ref<number>(39.909)
const lng = ref<number>(116.39742)
// 获取站点图标列表
const covers = ref<MapMarkersType[]>()
const getCabinetMarkers = (lat: number, lng: number, keywords: string) => {
  post<MapMarkersType[]>('/changing/mapExchangeList', { latitude: lat, longitude: lng, keywords }, 'json').then(res => {
    if(res.length) covers.value = res
  })
}
// 图标
uni.getLocation({
  type: 'gcj02',
	success: function (res) {
    lat.value = res.latitude
    lng.value = res.longitude
    getCabinetMarkers(lat.value, lng.value, keywords.value)
	},
  fail: err => {
    console.log(`err + ::>>`, err)
    uni.showToast({
      icon: 'none',
      title: '获取定位失败，请退出小程序后重试',
      duration: 2000
    })
  }
})
const showCard = ref<boolean>(false)
// 关闭卡片
const closeCard = (_e: any) => {
  showCard.value = false
}
// 获取单个机柜信息 打开卡片
const cabinetInfo = ref()
const openCard = (e: any) => {
  const params = {
    id: e.detail.markerId,
    longitude: lng.value,
    latitude: lat.value,
  }
  post<MapCardType>('/changing/mapExchangeId', { ...params }, 'json').then(res => {
    if(res.cabinetName) cabinetInfo.value = res
  })
  showCard.value = true
}
// 跳导航
const goWxNavigation = () => {
  uni.openLocation({
    name: cabinetInfo.value!.cabinetName,
    address: cabinetInfo.value!.address,
    latitude: cabinetInfo.value!.latitude,
    longitude: cabinetInfo.value!.longitude,
    success: res => {
      console.log('success', res)
    }
  })
}
// 搜索
const searchFn = (e: InputEvent) => {
  const { value } = e.target as HTMLInputElement
  keywords.value = value
  getCabinetMarkers(lat.value, lng.value, keywords.value)
}
// 地图初始化渲染
const _mapContext = ref<any>()
onReady(() => {
  _mapContext.value = uni.createMapContext('map')
})
// 定位到当前位置
const nowPosition = () => {
  _mapContext.value.moveToLocation()
}
</script>

<template>
  <view class="page-map relative">
    <view class="search-box w-full">
      <input type="text" class="search-input iconfont" v-model="keywords" placeholder="请输入您的搜索内容" placeholder-style="color: black;" confirm-type="search" maxlength="10" @confirm="searchFn">
    </view>
    <map 
      style="width: 100%; height: 100vh;" 
      class="relative"
      scale="12"
      :latitude="lat" 
      :longitude="lng" 
      :markers="covers" 
      :enable-rotate="true"
      :show-location="true" 
      @regionchange="closeCard" 
      @markertap="openCard"
      id="map"
      ref="map"
    >
      <cover-image class="absolute regression" src="@/static/imgs/cabinet/central_point.png"  @click="nowPosition" />
      <cover-view class="mark-card absolute" :class="showCard ? 'slide-in-y' : 'slide-out-y'" v-if="showCard">
        <!-- 上 -->
        <cover-view class="flex-row-sb-c usable-number">         
          <cover-view class="flex-row-sb-c number-box" v-for="(item, index) in cabinetInfo.list" :key="index">
            <cover-view class="type flex-1">
              <cover-view class="type-1">{{ item.name || '--' }}</cover-view>
              <cover-view class="line"></cover-view>
              <cover-view class="can-use">可用数量</cover-view>
            </cover-view>
            <cover-view class="num">{{ item.useableNum || 0 }}</cover-view>
          </cover-view>
        </cover-view>
        <!-- 中 -->
        <cover-view class="address-model">
          <cover-view class="title">{{ cabinetInfo.cabinetName || ' 福州仓山万达站' }}</cover-view>
          <cover-view class="flex">
            <cover-view class="flex-c distance">
              <cover-view class="relative">距离您<text class="num">{{ cabinetInfo.userFromDistance || '--' }}</text>KM</cover-view>
              <cover-view class="separate"></cover-view>
            </cover-view>
            <cover-view class="info">{{ cabinetInfo.address || '位置信息获取失败' }}</cover-view>
          </cover-view>
        </cover-view>
        <!-- 下 -->
        <cover-view class="nav-btn flex--c"  @click="goWxNavigation">
          <cover-view>地图导航</cover-view>
        </cover-view>
      </cover-view>
    </map>
  </view>
</template>

<style lang="scss" scoped>
.page-map {
  height: 100vh;
  .search-box {
    padding: 34rpx 30rpx;
    background: linear-gradient(to bottom, #373c50,#4f5263);
    z-index: 9;
  }
  .regression {
    top: 2%;
    left: 4%;
    width: 56rpx;
    height: 56rpx;
  }
  .mark-card {
    box-sizing: border-box;
    left: 4%;
    bottom: 12%;
    width: 92%;
    height: 430rpx;
    padding: 40rpx 36rpx 0;
    background-color: white;
    border-radius: 24rpx;
    border: 1rpx solid #ccc;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0,0,0,0.16);
    .number-box {
      width: 290rpx;
      padding: 8rpx 12rpx 8rpx 20rpx;
      border: 1rpx solid #09282d;
      border-radius: 20rpx;
      .type {
        font-size: 26rpx;
        margin-right: 20rpx;
        .type-1 {
          font-weight: 500;
          padding: 0 10rpx;
        }
        .line {
          width: 90%;
          height: 1rpx;
          background-color: #09282d;
          margin: 6rpx 0;
        }
        .can-use {
          color: #666;
          font-size: 24rpx;
          padding: 0 12rpx;
          letter-spacing: 2rpx;
        }
      }
      .num {
        width: 100rpx;
        height: 100rpx;
        line-height: 100rpx;
        color: white;
        font-size: 70rpx;
        text-align: center;
        background-color: #07262b;
        border-radius: 20rpx;
      }
    }
    .address-model {
      margin-bottom: 30rpx;
      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        margin: 12rpx 0;
      }
      .distance {
        font-size: 24rpx;
        .relative {
          flex: 1;
          width: 200rpx;
          .num {
            color: #0060AF ;
          }
        }
        .separate {
          width: 2rpx;
          height: 30rpx;
          font-size: 24rpx;
          background-color: #333;
          margin-right: 12rpx;
         
        }
      }
      .info {
        flex: 1;
        max-height: 52rpx;
        font-size: 22rpx;
        color: #888;
        white-space: pre-wrap;
      }
    }
    .nav-btn {
      width: 98%;
      transform: translateX(1%);
      font-size: 34rpx;
      color: white;
      background-color: #fec400;  
      padding: 28rpx ;
      border-radius: 999rpx;
      letter-spacing: 4rpx;
      box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(0, 0, 0, 0.4);
      z-index: 9;
    }
  }
  @keyframes slide-in {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    0% {
      transform: translateY(0%);
      opacity: 1
    }
    100% {
      transform: translateY(100%);
      opacity: 0
    }
  }
  .slide-in-y {
    animation: slide-in .5s forwards
  }
  .slide-out-y {
    animation: slide-out .5s forwards
  }
}
</style>