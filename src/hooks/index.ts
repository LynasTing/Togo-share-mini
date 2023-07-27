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