<script lang="ts" setup>
import useStore from '@/store'
import { post } from '@/utils/request'
import type { Cabinet, CabinetsType } from '@/types/cabinet' 

const { global } = useStore()
global.setUserAddress()
// 查机柜列表
const params = ref({
  longitude: '',
  latitude: '',
  page: 1,
  pageSize: 10,
  keywords: ''
})
const cabinets = ref<CabinetsType[]>([])
const total = ref<number>(0)
const getDataList = (val?: number) => {
  params.value.page = val ? val : params.value.page
  post<Cabinet>('/tuge/powerExchangeCabinetList', { ...params.value }, 'json').then(res => {
    cabinets.value = val === 1 ? res.list : cabinets.value.concat(res.list) 
    total.value = res.total
  })
}
watch(() => global.userAddress, (n, o) => {
  if(n?.location || o?.location) {
    params.value.latitude = n.location.lat as unknown as string
    params.value.longitude = n.location.lng as unknown as string
    getDataList()
  }
}, { deep: true })
// 刷新位置
const requestCount = ref<number>(3)
const inRotation = ref<boolean>(false)
const refreshPosition = () => {
  if(inRotation.value) {
    uni.showToast({
      title: `您的请求过于频繁，请在${requestCount.value}秒后重试`,
      icon: 'none',
      duration: 2 * 1000
    })
    return
  }
  inRotation.value = true
  requestCount.value++
  global.setUserAddress()
  setTimeout(() => {
    inRotation.value = false
  }, requestCount.value * 1000)
}

// scroll-view 触底
const scrollToLower = () => {
  if(cabinets.value.length >= total.value) return
  params.value.page += 1
  getDataList()
}
// 跳机柜信息
const goCabinetInfo = (e: CabinetsType) => {
  uni.navigateTo({ url: `/pages/cabinet/info/index?id=${e.id}` })
}
// 跳地图
const goMap = () => {
  uni.navigateTo({ url: '/pages/cabinet/map/index' })
}
// 单个机柜导航
const mapNavigation = (item: any) => {
  uni.openLocation({
    latitude: item.latitude,
    longitude: item.longitude,
    address: item.address,
    name: item.name,
    success: res =>  {}
  })
}
</script>

<template>
  <div class="container list-page flex-col">
    <div class="flex-c search-box">
      <input class="input relative iconfont" v-model="params.keywords" @confirm="getDataList(1)"  confirm-type="search" placeholder="请输入您的搜索内容" placeholder-class="input-plc" maxlength="18" />
      <image src="@/static/imgs/cabinet/map_mark.png" class="mar-mark" @click="goMap" />
    </div>
    <div class="flex-row-sb address-info">
      <div class="now-location flex-1">
        <div class="desc">当前定位</div>
        <div class="address">{{ global.userAddress.address || '--'}}</div>
      </div>
      <div class="flex-c refresh" @click="refreshPosition">
        <i class="iconfont icon-shuaxin" :class="inRotation ? 'rotate' : ''"></i>
        <div>重新定位</div>
      </div>
    </div>
    <scroll-view 
      v-if="cabinets.length"
      scroll-y="true" 
      class="scroll-y-list overflow-h" 
      :enable-back-to-top="true"
      @scrolltolower="scrollToLower" 
      :style="{'height': global.scrollHeight + 'px'}"
    >
      <div class="flex-c cab bg-white" v-for="(item, index) in cabinets" :key="index" @click="goCabinetInfo(item)">
        <image mode="widthFix" src="@/static/imgs/home/cabinet.png" class="cover" />
        <view class="flex-col-sb flex-1 overflow-h">
          <view class="w-full">
            <view class="title">{{ item.name }}</view>
            <view class="address flex">
              <text>地址：</text>
              <text class="del-text-2">{{ item.address }}</text>
            </view>
          </view>
          <view class="flex-row-sb-c bottom-box">
            <view class="lightning-box flex-c">
              <image mode="widthFix" src="@/static/imgs/home/lightning.png"  />
              <view class="cabinet">可租借</view>
              <view>{{ item.useAbleNum || 0 }}</view>
            </view>
            <image mode="widthFix" src="@/static/imgs/home/navigate.png" class="nav" @click.stop="mapNavigation(item)" />
          </view>
        </view>
      </div>
    </scroll-view>
    <Empty v-else text="列表数据为空~" />
  </div>
</template>

<style lang="scss" scoped>
.list-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #363c4f, #8f8f92, #bdbcbc);
  padding: 30rpx 30rpx 0;
  .search-box {
    margin-bottom: 40rpx;
    .input {
      flex: 1;
      height: 60rpx;
      font-size: 24rpx;
      color: black;
      background-color: white;
      border-radius: 999rpx;
      margin-right: 40rpx;
      padding-left: 60rpx;
      &::before {
        content: "\e65c";
        position: absolute;
        top: 14rpx;
        left: 16rpx;
        font-size: 36rpx;
        margin-right: 30rpx;
      }
    }
    ::v-deep .input-plc{
      color: black;
    }
    .mar-mark {
      width: 46rpx;
      height: 46rpx;
    }
  }
  .address-info {
    padding: 0 10rpx;
    .now-location {
      letter-spacing: 2rpx;
      overflow: hidden;
      .desc {
        margin-bottom: 20rpx;
      }
      .address {
        font-size: 24rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .refresh {
    min-width: 88rpx;
    color: #03ceca;
    font-size: 28rpx;
    .iconfont {
      font-size: 50rpx;
      margin-right: 14rpx;
    }
    .rotate {
      animation: rotation .4s forwards linear;
    }
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .scroll-y-list {
    margin: 30rpx 0;
    border-radius: 24rpx;
    .cab {
      color: black;
      margin-bottom: 30rpx ;
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
        .del-text-2 {
            font-size: 24rpx;
            max-height: 68rpx;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
      }
      .bottom-box {
        margin-top: 26rpx;
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
          z-index: 9;
        }
      }
    }
  }
}
</style>