<script lang="ts" setup>
</script>

<template>
  <view class="container">
    <view class="logo">
    <image src="@/static/imgs/global/logo_op_1.png" class="logo-img" mode="widthFix" />
    </view>

    <view class="menu-list flex-col">
      <navigator url="" class="flex-row-sb-c">
        <text>公司简介</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>用户协议</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>版本信息</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
      <navigator url="" class="flex-row-sb-c">
        <text>使用说明</text>
        <i class="iconfont icon-youjiantou text-base"></i>
      </navigator>
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

.menu-list navigator {
  display: flex;
  margin-top: 45rpx;
  margin-bottom: 33rpx; 
}


</style>