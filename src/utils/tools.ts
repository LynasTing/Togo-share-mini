// 字符串过长切割
export function splitString(str: string, length: number): string {
  if (typeof str !== 'string' || typeof length !== 'number') {
    return ''
  }
  if (length <= 0) {
    console.log('未传入切割位数或位数小于 0')
  }
  if (str.length <= length) {
    return str
  }
  return str.substring(0, length) + '...'
}

/**
 * 电池租用实时时间
 * @type { function }
 */
export const displayTime = (timestamp: string): string => {
  const elapsedTime = (Date.now() - new Date(timestamp).getTime()) / 1000
  let now = ''
  let h, m, s
  const padZero = (val: number): string => {
    return (val < 10 ? '0' : '') + val
  }
  if (elapsedTime >= 86400) {
    const d = Math.floor(elapsedTime / 86400)
    h = Math.floor((elapsedTime % 86400) / 3600)
    m = Math.floor((elapsedTime % 3600) / 60)
    s = Math.floor(elapsedTime % 60)
    now = d + '天' + padZero(h) + '时' + padZero(m) + '分' + padZero(s) + '秒'
  } else if (elapsedTime >= 3600) {
    h = Math.floor(elapsedTime / 3600)
    m = Math.floor((elapsedTime % 3600) / 60)
    s = Math.floor(elapsedTime % 60)
    now = padZero(h) + '时' + padZero(m) + '分' + padZero(s) + '秒'
  } else {
    m = Math.floor(elapsedTime / 60)
    s = Math.floor(elapsedTime % 60)
    now = padZero(m) + '分' + padZero(s) + '秒'
  }
  return now
}

// 优惠券到期时间
export const getMaturityTime = (startTime: string, days: number): string => {
  const sd = new Date(startTime)
  const vpm = days * 24 * 60 * 60 * 1000
  const ed = new Date(sd.getTime() + vpm)
  const date = new Date(ed)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}