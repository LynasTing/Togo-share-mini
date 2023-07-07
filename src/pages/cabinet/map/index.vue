<script lang="ts" setup>
const latitude = ref<number>(39.909)
const longitude = ref<number>(116.39742)
uni.getLocation({
  type: 'gcj02',
	success: function (res) {
    console.log(`res + ::>>`, res)
    latitude.value = res.latitude
    longitude.value = res.longitude
    // uni.openLocation({
		// 	latitude: latitude.value,
		// 	longitude: longitude.value,
		// 	success: function () {
		// 		console.log('success');
		// 	}
		// });
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
// 图标
const covers = ref([
  {
    id: 111,
    latitude: 26.0527,
    longitude: 119.31414,
    iconPath: '/static/imgs/cabinet/lightning.png',
    width: '58rpx',
    height: '58rpx',
  },
  {
    id: 112,
    latitude: 26.0537,
    longitude: 119.31424,
    iconPath: '/static/imgs/cabinet/lightning.png',
    width: '58rpx',
    height: '58rpx',
  },
  {
    id: 113,
    latitude: 26.0547,
    longitude: 119.31434,
    iconPath: '/static/imgs/cabinet/lightning.png',
    width: '58rpx',
    height: '58rpx',
  },
  {
    id: 114,
    latitude: 26.0557,
    longitude: 119.31444,
    iconPath: '/static/imgs/cabinet/lightning.png',
    width: '58rpx',
    height: '58rpx'
  },
])
const showCard = ref<boolean>(false)
// 关闭卡片
const closeCard = (e) => {
  showCard.value = false
}
// 打开卡片
const openCard = (e) => {
  showCard.value = true
}
// 跳导航
const a = () => {
  uni.getLocation({
    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
    success: function (res) {
      const latitude = res.latitude;
      const longitude = res.longitude;
      uni.openLocation({
        latitude: latitude,
        longitude: longitude,
        success: function () {
          console.log('success');
        }
      })
    }
  })
}
// 搜索
const searchFn = (e) => {
  console.log(`1 + ::>>`, )
  console.log(`e + ::>>`, e)
}
</script>

<template>
  <view class="page-map relative">
    <view class="search-box w-full">
      <input type="text" class="input iconfont relative" placeholder="请输入您的搜索内容" placeholder-style="color: black;" confirm-type="search" maxlength="10" @confirm="searchFn">
    </view>
    <map 
      style="width: 100%; height: 100vh;" 
      :latitude="latitude" 
      :longitude="longitude" 
      :markers="covers" 
      :enable-rotate="true"
      :show-location="true" 
      @regionchange="closeCard" 
      @markertap="openCard"
    >
      <cover-view class="mark-card absolute" :class="showCard ? 'slide-in-y' : 'slide-out-y'">
        <!-- 上 -->
        <cover-view class="flex-row-sb-c usable-number">         
          <cover-view class="flex-row-sb-c number-box">
            <cover-view class="type flex-1">
              <cover-view class="type-1">M1000S</cover-view>
              <cover-view class="line"></cover-view>
              <cover-view class="can-use">可用数量</cover-view>
            </cover-view>
            <cover-view class="num">3</cover-view>
          </cover-view>
          <cover-view class="flex-row-sb-c number-box">
            <cover-view class="type flex-1">
              <cover-view class="type-1">M1000S</cover-view>
              <cover-view class="line"></cover-view>
              <cover-view class="can-use">可用数量</cover-view>
            </cover-view>
            <cover-view class="num">13 </cover-view>
          </cover-view>
        </cover-view>
        <!-- 中 -->
        <cover-view class="address-model">
          <cover-view class="title">福州仓山万达站</cover-view>
          <cover-view class="flex">
            <cover-view class="flex-c distance">
              <cover-view class="relative">距离您39.5KM</cover-view>
              <cover-view class="separate"></cover-view>
            </cover-view>
            <cover-view class="info">福州市仓山区金山街道浦上大道274福州市仓山区金山街道浦上大道274福州市仓山区金山街道浦上大道274</cover-view>
          </cover-view>
        </cover-view>
        <!-- 下 -->
        <cover-view class="nav-btn flex--c">
          <cover-view @click="a">地图导航</cover-view>
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
    .input {
      height: 64rpx;
      color: black;
      font-size: 30rpx;
      background-color: white;
      padding: 0 28rpx 0 64rpx;
      border-radius: 999rpx;
      &::before {
        content: '\e67d';
        position: absolute;
        top: 50%;
        left: 2%;
        transform: translateY(-50%);
        font-size: 42rpx;
      }
    }
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
        font-size: 26rpx;
      }
      .separate {
        width: 2rpx;
        height: 30rpx;
        background-color: #333;
        margin: 0 16rpx;
      }
      .info {
        flex: 1;
        max-height: 52rpx;
        font-size: 22rpx;
        color: #888;
        white-space: pre-wrap
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