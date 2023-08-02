import type { WxPay } from '@/types/assets/payment'

function paramsToPath(obj: { [key: string]: string }, path: string): string {
  const queryParams = Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&')
  if (queryParams) {
    return `${path}?${queryParams}`
  } else {
    return path
  }
}
// 未登录
export function notLoginIn() {
  var pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  let path = currentPage.route as string
  if(Object.keys(currentPage.options).length) path = paramsToPath(currentPage.options, path)
  if(!path.includes('/pages/user-access/login/index')) {
    uni.showToast({
      title: '登录状态已过期，请重新登录',
      icon: 'none',
      duration: 2 * 1000
    })
    setTimeout(() => {
      uni.reLaunch({ url: `/pages/user-access/login/index?path=${encodeURIComponent('/' + path)}` })
    }, 2 * 1000)
  }
}
// 支付 
export function payHook (order: WxPay) {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service: 'payment',
      success: provideRes => {
      uni.requestPayment({
        provider: provideRes.provider[0],
        timeStamp: order.timeStamp,
        nonceStr: order.nonceStr,
        package: order.packageInfo,
        signType: order.signType,
        paySign: order.paySign,
        success: payRes => {
          console.log(`payRes + ::>>`, payRes)
          if(Object.getOwnPropertyNames(payRes).length) {
            uni.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1.5 * 1000 
            })
            resolve('paySuccess')
          }
        },
        fail: payErr => {
          uni.showToast({
            title: '支付失败',
            icon: 'error',
            duration: 1.5 * 1000 
          })
          reject('payFail')
          console.log(`payErr + ::>>`, payErr)
        },
      })
      }
    })
  })
}