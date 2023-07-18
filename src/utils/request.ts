import { _showLoading, _hideLoading } from "./loading"
import type { Api } from '@/types/global'
import useStore from '@/store'

export function post<T>(url: string, data?: any, type?: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let base_url
    switch (uni.getAccountInfoSync().miniProgram.envVersion) {
      case 'develop':
        base_url = 'http://fz.hthuandian.cn/apptuge'
        break
      case 'release':
        base_url = 'http://fz.hthuandian.cn/apptuge'
        break
    }
    // 项目有两种类型接口, json 和 x-www-form-urlencoded
    const { global } = useStore()
    const header = {
      'HT-Token': type === 'json' ? global.accountInfo?.token : '',
      'HT-Account-Uid': type === 'json' ? global.accountInfo?.accountUid : '',
      'Content-Type': `application/${type === 'json' ? 'json;charset=UTF-8' : 'x-www-form-urlencoded'}`,
    }
    // 在请求参数中, 加入ACCUID和TOKEN参数
    if(type !== 'json') data = { ...data, ...{ ACCUID: global.accountInfo.accountUid, TOKEN: global.accountInfo.token } }
    _showLoading()
    uni.request({
      url: base_url + url,
      // data: type ? modifyPostParam(data) : data,
      data,
      method: 'POST',
      header,
      success: async res => {
        _hideLoading()
        const { code, data, msg } = res.data as Api<T>
        if(code === '000000') {
          data ? resolve(data as T) : resolve({} as T)
        } else if(code === '000005'){
          uni.showToast({
            title: '登录状态已过期，请重新登录',
            icon: 'none',
            duration: 2 * 1000
          })
          var pages = await getCurrentPages()
          const url = pages[pages.length - 1]?.route
          setTimeout(() => {
            uni.redirectTo({ url: `/pages/login/auth/index?url=${'/' + url}` })
          }, 2 * 1000)
        } else {
          uni.showToast({
            title: msg || '请求错误',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: err => {
        _hideLoading()
        uni.getNetworkType({
          success: res => {
            if(res.networkType === '2g' || res.networkType === '3g') {
              uni.showToast({
                title: '您的网络状况不佳，请重试',
                icon: 'none',
                duration: 2000
              })
            }
            if(res.networkType === 'unknown' || res.networkType === 'none' ) {
              uni.showToast({
                title: '未检查到网络连接',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
        reject(err)
      },
      complete(result) {
      }
    })
  })
}
