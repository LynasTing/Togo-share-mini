import { _showLoading, _hideLoading } from "./loading"
import { notLoginIn } from '@/hooks/index'
import { logoutHook } from '@/hooks'
import type { Api } from '@/types/global'
import useStore from '@/store'

export function post<T>(url: string, data?: any, type?: string, noLoading?: boolean): Promise<T> {
  const { global } = useStore()
  return new Promise<T>((resolve, reject) => {
    let base_url
    switch (uni.getAccountInfoSync().miniProgram.envVersion) {
      case 'develop':
        base_url = 'https://hthd.hthuandian.cn/apptest1'
        break
      case 'trial':
        base_url = 'https://hthd.hthuandian.cn/apptest1'
        break  
      case 'release':
        base_url = 'https://hthd.hthuandian.cn/apptest1'
        break
    }
    // 项目有两种类型接口, json 和 x-www-form-urlencoded
    const header = {
      'HT-Token': type === 'json' ? (global.accountInfo?.token) : '',
      'HT-Account-Uid': type === 'json' ? global.accountInfo?.accountUid : '',
      'Content-Type': `application/${type === 'json' ? 'json;charset=UTF-8' : 'x-www-form-urlencoded'}`,
    }
    // 在请求参数中, 加入ACCUID和TOKEN参数
    if(type !== 'json') data = { ...data, ...{ ACCUID: global.accountInfo.accountUid, TOKEN: global.accountInfo.token } }
    if(!noLoading) _showLoading()
    uni.request({
      url: base_url + url,
      data,
      method: 'POST',
      header,
      success: res => {
        _hideLoading()
        const { code, data, msg } = res.data as Api<T>
        if(code === '000000') {
          data ? resolve(data as T) : resolve({} as T)
        } else if(code === '000005'){
          notLoginIn()
          logoutHook()
        } else {
          console.log(`请求错误 res + ::>>`, res)
          uni.showToast({
            title: msg || '请求错误',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: err => {
        console.log(`接口请求错误fail + ::>>`, err)
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
      }
    })
  })
}
export function fetchAli(url, data) {
  const { global } = useStore()
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://hthd.hthuandian.cn/sso/'
    data = { ...data, ...{ ACCUID: global.accountInfo.accountUid, TOKEN: global.accountInfo.token } }
    uni.request({
      url: baseUrl + url,
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      data,
      success: res => {
        const {code, data, msg } = res.data
        if(code === '000000') {
          resolve(data)
        }else if(code === '000003'){
         reject(code)
        }else {
          uni.showToast({
            title: msg,
            icon: 'none'
          })
        }
      },
      fail: err => {
        reject(err)
        console.log(`err + ::>>`, err)
      }
    })
  })
}
