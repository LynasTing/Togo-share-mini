<script lang="ts" setup>
import { post } from '@/utils/request'
import type { MyCombo } from '@/types/assets'

// 套餐类型
const formatComboType = computed(() => {
  return function(type: number | null) {
    switch (type) {
      case 0:
        return '限次不限时'
      case 1:
        return '限次又限时'
      case 2:
        return '不限次限时' 
      case 3:
        return '限时限次套餐'
    }
  }
})
// 套餐使用状态
const formatStatus = computed(() => {
  return function(status: number | null) {
    switch (status) {
      case 0:
        return '未激活'
      case 1:
        return '使用中'
      case 2:
        return '' 
    }
  }
})
// 剩余天数
const surplusDays = computed(() => {
  return function(times: string | null) {
    if(!times) return 
    const today = new Date()
    const targetDate = new Date(times)
    var timeDiff = targetDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 60 * 60 *24))
    console.log(`daysDiff + ::>>`, daysDiff)
  }
})
const combos = ref<MyCombo[]>()
post<MyCombo[]>('/account/userCombo', '', 'json').then(res => {
  combos.value = res
})
</script>

<template>
  <view class="combo-page flex-col overflow-h" v-if="combos?.length">
    <view class="desc fixed top-0 left-0">
      套餐服务须后台申请，目前仅对消防、应急部门开放；共享电源是一种基建辅助设施，涉及到公共安全与救助， 请爱护使用; 套餐账户限同时租用一台，归还后可租新。其他请参见用户协议。
    </view>
    <scroll-view class="flex-1 scroll-y" scroll-y >
      <view class="combo relative flex-row-sb-c" v-for="(item, index) in combos" :key="index" :class="item.status !== 2 ? '' : 'loss'">
        <view class="info">
          <view class="info-name">{{ item.comboInfo || '包年套餐' }}</view>
          <view class="info-type">{{ formatComboType(item.comboType) }}（不可退）</view>
          <view>有效期至 {{ item.eTime || '2023年12月30日' }}</view>
        </view>
        <view class="flex-col" v-if="item.status !== 2">
          <text class="absolute top-0 right-0 info-status">{{ formatStatus(item.status) || '' }}</text>
          <view class="remaining" v-if="item.status === 1">
            <text>剩余</text>
            <text class="remaining-days">{{ surplusDays(item.eTime || '') }}</text>天
          </view>
          <view v-if="item.status === 0">未开始计算剩余天数</view>
        </view>
        <view class="loss-exp" v-else>失效</view>
      </view>
    </scroll-view>
  </view>
  <Empty text="您还未购买套餐" />
</template>

<style lang="scss" scoped>
.combo-page {
  padding: 160rpx 30rpx 30rpx;
  .desc {
    font-size: 26rpx;
    padding: 30rpx;
    letter-spacing: 2rpx;
    z-index: 9;
    color: $darkgray;
    background-color: white;
  }
  .scroll-y {
    margin-top: 10rpx;
  }
  .combo {
    font-size: 24rpx;
    color: $yellow;
    margin-top: 30rpx;
    padding: 34rpx 44rpx 28rpx 30rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    background-image: url('http://fz.hthuandian.cn/static/apptuge/combo_active.png');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    letter-spacing: 2rpx;
    .info {
      &-name {
        font-size: 32rpx;
        font-weight: bold;
      }
      &-type {
        margin: 20rpx 0 40rpx;
      }
      &-status {
        padding: 14rpx 34rpx 0 0;
      }
    }
    .remaining {
      &-days {
        font-size: 44rpx;
        margin: 0 2rpx 0 0;
      }
    }
  }
  
  .loss {
    background-image: url('http://fz.hthuandian.cn/static/apptuge/combo_expired.png');
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 24rpx;
      background-color: rgba(0, 0, 0, .4);
    }
    &-exp {
      font-size: 48rpx;
      writing-mode: vertical-rl;
      text-orientation: upright;
      margin: 20rpx 40rpx 0 0 ;
      letter-spacing: 10rpx;
    }
  }
}
</style>