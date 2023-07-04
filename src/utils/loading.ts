let loadingCount = 0
export const _showLoading = (title?: string) => {
  if(loadingCount === 0) {
    uni.showLoading({
      title: title || '加载中...',
      mask: true
    })
  }
  loadingCount++
}
export const _hideLoading = () => {
  if(loadingCount <= 0) return 
  loadingCount--
  if(loadingCount === 0) {
    uni.hideLoading()
  }
}