<script lang="ts" setup>
import useStore from '@/store'
import { post } from '@/utils/request';
 
const { global } = useStore()
const indexList = ref([])
const cities = ref([])
post('/account/area', {}, 'json').then(res => {
	if(res?.list.length) {
		indexList.value = res.list
		cities.value = res.data
	}
})
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
		<view class="search-box flex--c">
			<input type="text" class="search-input flex-1 iconfont" placeholder="请输入您的搜索内容">
			<view class="btn">搜索</view>
		</view>
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
		<view class="cities overflow-h flex-1">
			<u-index-list :index-list="indexList" customNavHeight="109"  activeColor="#FDC401">
				<template v-for="(item, index) in cities" :key="index">
					<u-index-item>
						<u-index-anchor :text="indexList[index]" bgColor="#FFFFFF"></u-index-anchor>
						<view class="list-cell" v-for="(sub, index) in item" :key="index" @click="selectCity(sub)">{{ sub || '--' }}</view>
					</u-index-item>
				</template>
			</u-index-list>
		</view>
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
}

.cities {
	height: 200rpx ;
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
</style>