import { _showLoading, _hideLoading } from "./loading"
import type { Api } from '@/types/global'
import { modifyPostParam } from './tools.js'

export function post(url: string, data?: any, type?: string) {
  return new Promise((resolve, reject) => {
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
    const header = { 'content-type': `application/${ type === 'json' ? 'json;charset=UTF-8' : 'x-www-form-urlencoded' }` }
    _showLoading()
    uni.request({
      url: base_url + url,
      data: modifyPostParam(data),
      method: 'POST',
      header,
      success: (res) => {
        const { code, data, msg } = res.data as Api
        if(code === '000000') {
          data ? resolve(data) : resolve({})
        }else {
          uni.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (err) => {
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
        setTimeout(() => {
          _hideLoading()
        }, 2000)
      }
    })
  })
}
