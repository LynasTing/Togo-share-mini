export interface Api<T> {
  code: string
  data: T | any
  msg: string
}
export type TabBarType = {
  text?: string
  icon?: string
  chooseIcon?: string
  path: string
} 
export type MediaType = {
  fileType: string
  size: number
  tempFilePath: string 
}
export type UserAddressType = {
  address: string | null
  location: {
    lat: number | null
    lng: number | null
  }
}
// 账户信息
export type AccountInfoType = {
  accountUid: string
  batteryStatus: string
  comboStatus: string
  depositStatus: string
  organizationId: number
  phone: string
  token: string
  userName: string
}
// 用户个人资料
export interface UserInfo {
  /**
   * @sex 0 男 1 女
   * @status 0 未实名制认证 1 已认证
   */
  userPhoto: string
  sex: string
  nickname: string
  belongingRegion: string
  birthDate: string
  status: string
}
// 活动列表
export interface Activities {
  startTime:  string
  img: string
  name:  string
  endTime: string
  introduce: string
  id: number
  status: number
}