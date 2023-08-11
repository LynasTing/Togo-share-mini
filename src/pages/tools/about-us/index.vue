<script lang="ts" setup>

const menuList = reactive([
  { text: '公司简介', url: 'xxx' },
  { text: '用户协议', url: 'xxx' },
  { text: '版本信息', url: 'xxx' },
  { text: '使用说明', url: '/pages/tools/about-us/boot-page/index' }
])
const menuFn = (i: any) => {
  // uni.navigateTo({ url: item.url})

  if(i !== 2) {
    uni.showToast({
      title: '敬请期待~',
      icon: 'none',
    })
    return
  }
  uni.showModal({
    title: '应用版本',
    content: 'v0.0.3',
    showCancel: false
  })
  // #ifdef MP-WEIXIN
  // #endif
}
</script>

<template>
  <view class="container">
    <view class="logo">
    <image src="@/static/imgs/global/logo_op_1.png" class="logo-img" mode="widthFix" />
    </view>

    <view class="menu-list flex-col">
      <view class="flex-row-sb-c" v-for="(item, index) in menuList" :key="index" @click="menuFn(index)">
        <text>{{ item.text }}</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  color: black;
}
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-img {
  width: 340rpx;
  margin-top: 165rpx;
}

.menu-list {
  padding: 10px;
  margin-top: 100rpx;
  color:#342919 ;
  font-size: 30rpx;
  font-weight: Bold;
}

.menu-list view {
  margin: 25rpx 0 23rpx;
  border-bottom: 1rpx solid #f8f8f8;
}


</style>