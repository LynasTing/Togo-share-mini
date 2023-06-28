<script lang="ts" setup>
// 超时提醒
const switch1Change = (e: any) => {
  console.log('switch1 发生 change 事件，携带值为', e.detail.value)
}
// 是否关闭推送
const switch2Change = (e: any) => {
  console.log('switch2 发生 change 事件，携带值为', e.detail.value)
}
</script>

<template>
  <view class="container flex-col">
    <view class="head flex-col-sb"> 
      <view class="flex-row-sb-c">
        <text>超时提醒</text>
        <switch color="#FFCC33" style="transform:scale(0.7)" @change="switch1Change"/>
      </view>
      <view class="flex-row-sb-c">
        <text>是否关闭推送</text>
        <switch color="#FFCC33" style="transform:scale(0.7)" @change="switch2Change"/>
      </view>
      <view class="cancel-account">注销账号</view>
    </view>
    <view class="content flex-col-sb">
      <navigator url="" class="flex-row-sb-c">
        <text>操作指南</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>用户协议</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>修改密码</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>押金协议</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>充值协议</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>隐私政策</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>检查新版</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
    </view>
    <view class="back flex-col-se-c">
      <text>退出登录</text>
    </view>
    <view class="foot"></view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 0;
  background-color: rgb(249,249,249);
  color: #342919;
  font-size: 30rpx;
  font-weight: Bold;
  letter-spacing: 2rpx;
}
.head {
  margin-top: 22rpx;
  padding: 15px;
  height: 346rpx;
  background-color: #fff;
  .cancel-account {
    color: rgb(106,139,141);
    font-weight: 600;
  }
}
.content {
  margin-top: 22rpx;
  padding: 15px;
  height: 756rpx;
  background-color: #fff;

}
.back {
  margin-top: 22rpx;
  height: 102rpx;
  background-color: #fff;
  text-align: center;

}
.foot {
  margin-top: 22rpx;
  height: 168rpx;
  background-color: #fff;
}

</style>