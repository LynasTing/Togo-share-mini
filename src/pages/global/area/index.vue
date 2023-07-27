<script lang="ts" setup>
import useStore from '@/store'
import { post } from '@/utils/request'
 
const { global } = useStore()
// 城市索引列表
const indexList = ref([])
const cities = ref([])
post('/tuge/area', {}, 'json').then(res => {
	if(res?.list.length) {
		indexList.value = res.list
		cities.value = res.data
	}
})
// 热门城市
const hotCities = ref([])
watch(() => global.userAddress, (n, o) => {
  if(n?.location || o?.location) {
		const hotCityParams = ref({
			organizationId: 142,
			latitude: global.userAddress.location?.lat,
			longitude: global.userAddress.location?.lng
		})
		post('/cabinet/getCityInfoByOrganizationId', { ...hotCityParams.value }, '').then(res => {
			if(res.allRegionList.length) hotCities.value = res.allRegionList
		})
  }
}, { immediate: true, deep: true })
// 选择热门城市
const hotCitySelect = (item) => {
	uni.showModal({
		title: '提示',
		content: `您确定要将地区切换为${item.cityName}吗？`,
		success: res => {
			if (res.confirm) {
				global.setUsingCity(item.cityName)
				uni.showToast({
					title: '操作成功',
					duration: 1.5 * 1000
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1.5 * 1000)
			}
		}
	})
}
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
// 选择城市
const selectCity = (sub : string) => {
	if(!hotCities.value.some(item => item.cityName === sub)) {
		uni.showToast({
			title: '您所选的城市暂未开通服务',
			icon: 'none',
			duration: 1.5 * 1000,
			mask: false
		})
		return
	}
	uni.showModal({
		title: '提示',
		content: `您确定要将地区切换为${sub}吗？`,
		success: res => {
			if (res.confirm) {
				global.setUsingCity(sub)
				uni.showToast({
					title: '操作成功',
					duration: 1.5 * 1000
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1.5 * 1000)
			}
		}
	})
}
</script>

<template>
	<view class="page flex-col">
		<!-- <view class="search-box flex--c">
			<input type="text" class="search-input flex-1 iconfont" placeholder="请输入您的搜索内容">
			<view class="btn">搜索</view>
		</view> -->
		<view class="flex-row-sb address-info">
      <view class="now-location flex-1">
        <view class="desc">当前定位</view>
        <view class="address">{{ global.userAddress?.address || '--'}}</view>
      </view>
      <view class="flex--c refresh" @click="refreshPosition">
        <text class="iconfont icon-shuaxin2" :class="inRotation ? 'rotate' : ''"></text>
        <view>重新定位</view>
      </view>
    </view>
		<view class="hot-city" v-if="hotCities.length">
			<view class="hot-city-title">热门城市</view>
			<view class="hot-city-list">
				<view class="hot-city-list-item inline-block" v-for="(item) in hotCities" :key="item.organizationId" @click="hotCitySelect(item)">{{ item.cityName }}</view>
			</view>
		</view>
		<view class="cities overflow-h flex-1" v-if="cities.length">
			<u-index-list :index-list="indexList" customNavHeight="160"  activeColor="#FDC401">
				<template v-for="(item, index) in cities" :key="index">
					<u-index-item>
						<u-index-anchor :text="indexList[index]" bgColor="#FFFFFF"></u-index-anchor>
						<view class="list-cell" v-for="(sub, index) in item" :key="index" @click="selectCity(sub)">{{ sub || '--' }}</view>
					</u-index-item>
				</template>
			</u-index-list>
		</view>
		<Empty v-else text="暂无地区" />
	</view>
</template>

<style lang="scss" scoped>

.page {
	height: 100vh;
	background-color: #fafbfd;
	.search-box {
		color: #999;
		background-color: #f8f8f8;
		padding: 10rpx 30rpx;
		letter-spacing: 2rpx;
		input {
			font-size: 26rpx;
		}
		.btn {
			font-size: 28rpx;
			margin-left: 30rpx;
		}
		
	}
	.address-info {
		font-size: 30rpx;
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		.now-location {
			overflow: hidden;
			letter-spacing: 2rpx;
			.desc {
				font-weight: 700;
				margin-bottom: 16rpx;
			}
			.address {
				font-size: 24rpx;
				color: #aaa;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.refresh {
			min-width: 88rpx;
			color: #aed05f;
			font-size: 26rpx;
			.iconfont {
				font-size: 36rpx;
				margin-right: 14rpx;
			}
			.rotate {
				animation: rotation .5s forwards linear;
			}
			@keyframes rotation {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(180deg);
				}
			}
		}
	}
	.hot-city {
		margin-top: 14rpx;
		padding: 10rpx 30rpx;
		background-color: white;
		&-title {
			font-size: 28rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-bottom: 28rpx;
		}
		
		.hot-city-list {
			display: flex;
			flex-wrap: nowrap;
			overflow-x: auto;
			.hot-city-list-item {
				font-size: 26rpx;
				color: #333333;
				white-space: nowrap;
				text-align: center;
				margin: 0 28rpx 18rpx 0;
				padding: 10rpx 40rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				border: 1rpx solid #707070;
			}
		}
	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
}

</style>