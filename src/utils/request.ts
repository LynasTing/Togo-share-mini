export function post(url: string, data?: any) {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data,
      success: (res) => {
        console.log(`res + ::>>`, res)
        return
        const { code, data, msg } = res
        if (code === '000000') {
          
        }
        else {
          reject(err)
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
