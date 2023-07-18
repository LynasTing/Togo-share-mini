import { defineStore } from "pinia";
import type { UserAddressType } from '@/types/global'
import useStore from '@/store'

// 用户拒绝授权定位
const authReject = () => {
  const { global } = useStore() 
  uni.showToast({
    title: '您拒绝了授权位置信息！我们将无法为您提供更多服务',
    icon: 'none',
    duration: 2 * 1000
  })
  global.setUserAddress('clear')
}
export default defineStore('global', {
  state: () => ({
    paddingBottomHeight: 0,
    scrollHeight: 750,
    deviceType: '',
    authCodeTimer: 0,
    usingCity: '福州',
    userAddress: {} as UserAddressType,
    accountInfo: uni.getStorageSync('accountInfo') || {}
  }),
  actions: {
    setPaddingBottomHeight(val: number) {
      this.paddingBottomHeight = val
    },
    setDeviceType(val: string) {
      this.deviceType = val
    },
    // 获取用户位置
    setUserAddress(val?: string) {
      // 4.用户依然拒绝授权, 清空现有的位置信息
      if(val) {
        this.userAddress = {
          address: '--',
          location: { lat: null, lng: null }
        }
        return
      }
      // 1.先判断是否开启了设备的定位
      uni.getSystemInfo({
        success: res => {
          if(!res.locationEnabled || !res.locationAuthorized) {
            uni.showToast({
              title: '请打开手机定位',
              icon: 'error'
            })
            return 
          }
        }
      })
      uni.showLoading({
        title: '请稍后...',
        mask: true
      })
      const that = this
      uni.getLocation({
        type: 'gcj02',
        success: uniRes => {
          // 2.开始获取位置
          uni.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              key: 'IFZBZ-XTCWQ-JQO55-4ORFX-Y5QKT-R2BFV',
              coord_type: 1,
              location: uniRes.latitude + ',' + uniRes.longitude
            },
            success: aMapRes => {
              uni.hideLoading()
              const { result } = aMapRes.data as any
              const { city, district, street, street_number } = result?.address_component
              this.userAddress.address = city + district + street + street_number
              this.userAddress.location = result.location
            },
            fail(aMapErr) {
              console.log(`通过腾讯地图获取用户信息错误 aMapErr + ::>>`, aMapErr)
              uni.hideLoading()
              nextTick(() => {
                uni.showToast({
                  title: '获取您的位置信息失败，请重试',
                  icon: 'none',
                  duration: 2 * 1000
                })
              })
            }
          })
        },
        // 3.用户拒绝授权, 引导用户重新授权
        fail(err) {
          uni.hideLoading()
          uni.showModal({
            title: '您拒绝了授权位置信息',
            content: '请您授权位置信息，以便于我们更好的为您提供服务',
            confirmText: '确认',
            cancelText: '取消',
            success: res => {
              if(res.confirm) {
                uni.openSetting({
                  success: setRes => {
                    if(setRes.authSetting['scope.userLocation']) {
                      uni.showToast({
                        title: '感谢您的授权，我们将更好的为您提供服务',
                        icon: 'none',
                        duration: 2 * 1000
                      })
                      that.setUserAddress()
                    }else {
                      authReject()
                    }
                  }
                })
              }else {
                authReject()
              }
            },
            fail: err => authReject()
          })
          console.log(`uni.getLocation 获取用户信息失败或用户拒绝授权 + ::>>`, err)
        }
      })
    },
    // 用户信息
    setAccountInfo(val: object) {
      this.accountInfo = val 
    },
    // 屏幕可用高度
    setScrollHeight(val: number) {
      this.scrollHeight = val
    },
    // 验证码登录倒计时
    setAuthCodeTimer(val: number) {
      this.authCodeTimer = val
    },
    // 用户使用城市
    setUsingCity(val: string) {
      this.usingCity = val
    }
  }
})