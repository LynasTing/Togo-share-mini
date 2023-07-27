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
// 实时时间
export const displayTime = (timestamp: string): string => {
  const elapsedTime = (Date.now() - new Date(timestamp).getTime()) / 1000
  let now = ''
  let h, m, s
  const padZero = (val: number): string => {
    return (val < 10 ? '0' : '') + val
  }
  if (elapsedTime >= 3600) {
    h = Math.floor(elapsedTime / 3600)
    m = Math.floor((elapsedTime % 3600) / 60)
    s = Math.floor(elapsedTime % 60)
  } else {
    h = Math.floor(elapsedTime / 3600)
    m = Math.floor(elapsedTime / 60)
    s = Math.floor(elapsedTime % 60)
  }
  now = padZero(h) + ' 时 ' + padZero(m) + ' 分 ' + padZero(s)
  return now
}
