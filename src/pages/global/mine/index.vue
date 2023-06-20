<script lang="ts" setup>
import TabBar from '@/components/basic-tab-bar/TabBar.vue'

const tools = reactive([
  { text: '我的消息', path: '/pages/tools/message/index' },
  { text: '分享', path: '/pages/tools/share/index' },
  { text: '意见反馈', path: '/pages/tools/feedback/index' },
  { text: '关于我们', path: '/pages/tools/about-us/index' },
  { text: '故障上报', path: '/pages/tools/breakdown/index' },
  { text: '邀请码', path: '/pages/tools/invitation-code/index' },
  { text: '应用设置', path: '/pages/tools/setting/index' },
  { text: '开通套餐', path: '/pages/tools/activate-package/index' }
])
const toolsNavigate = e => {
  uni.navigateTo({
    url: e.path
  })
}
</script>

<template>
  <div class="page-view mine-page">
    <div class="header">
      <div class="flex-row-sb-c container ">
        <div class="flex-c">
          <image src="@/static/imgs/mine/coupon.png" class="avatar" />
          <div class="username">丁凌</div>
        </div>
        <div class="flex-c text-base">
          <div>查看资料</div>
          <i class="iconfont icon-more text-base"></i>
        </div>
      </div>
      <div class="auth flex-row-sb-c">
        <!-- <div class="flex-col-se h-full">
          <div>您还未实名认证</div>
          <div>赶紧认证吧~</div>
        </div>
        <div class="auth-btn">实名认证</div> -->
        <div class="has-auth">感谢您使用途歌共享，请爱护设备。 </div>
      </div>
    </div>
    <div class="container">
      <image src="@/static/imgs/global/logo_op_1.png" class="logo" />
      <div class="flex-row-sb-c menu">
        <image src="@/static/imgs/mine/battery.png" mode="widthFix" />
        <image src="@/static/imgs/mine/lease.png" mode="widthFix" />
        <image src="@/static/imgs/mine/coupon.png" mode="widthFix" />
        <image src="@/static/imgs/mine/wallet.png" mode="widthFix" />
      </div>
      <div class="tools flex-col">
        <div class="title">常用功能</div>
        <div class="flex-1 sprite flex-wrap flex-row-sb-c">
          <div class="flex-col-c tool-item" v-for="(item, index) in tools" :key="index" @click="toolsNavigate(item)">
            <image :src="`/static/imgs/mine/tools_${index}.png`" />
            <div>{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TabBar :currIndex="4" />
</template>

<style lang="scss" scoped>

.mine-page {
  color: white;
  .header {
    height: 300rpx;
    background: linear-gradient(to bottom, #363c4f, #5e5f6f);
    .avatar {
      width: 108rpx;
      height: 108rpx;
      border-radius: 50%;
      margin-right: 28rpx;
    }
    .username {
      font-size: 36rpx;
      font-weight: bold;
      letter-spacing: 2rpx;
    }
    .auth {
      height: 160rpx;
      background-color: #09282b;
      border-radius: 40rpx 40rpx 0 0;
      padding: 0 60rpx;
      margin-top: 60rpx;
      .auth-btn {
        font-size: 28rpx;
        font-weight: bold;
        color: #09282b;
        background-color: #fdc401;
        padding: 12rpx 30rpx;
        border-radius: 999rpx;
      }
      .has-auth {
        font-size: 30rpx;
        color: rgba(255, 255, 255, .7);
        letter-spacing: 2rpx;
      }
    }
  }
  .logo {
    width: 200rpx;
    height: 100rpx;
    margin: 60rpx 20rpx 0;
  }
  .menu {
    margin: 30rpx 0;
    image {
      width: 21%;
    }
  }
  .tools {
    color: #333;
    background-color: #fafafa;
    border: 1rpx solid #333;
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    padding: 24rpx 30rpx;
    box-shadow: 0rpx 0rpx 10rpx 2rpx rgba(51, 51, 51, .3);
    .title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 60rpx;
    }
    .tool-item {
      color: black;
      font-size: 28rpx;
      font-weight: normal;
      width: 25%;
      margin-bottom: 30rpx;
      letter-spacing: 2rpx;
      image {
        width: 60rpx;
        height: 60rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>