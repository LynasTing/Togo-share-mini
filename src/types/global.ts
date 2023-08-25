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
/**
 * 账户信息(登录或注册成功返回)
 * @interface
 */
export interface AccountInfo {
  /**
   * accountUid
   * @type {string}
   */
  accountUid: string

  /**
   * 用户拥有电池状态 '0' 没有 '1' 有
   * @type {string}
   */
  batteryStatus: string

  /**
   * 用户拥有套餐状态 '0' 有套餐未使用 '1' 使用中 '2'套餐已结束
   * @type {string}
   */
  comboStatus: string

  /**
   * 收费模式 '1' 订单模式 '2' 套餐模式
   * @type {string}
   */
  mode: string

  /**
   * 用户拥有押金状态 '0' 没有 '1' 有
   * @type {string}
   */
  depositStatus: string

  /**
   * 用户地区id 
   * @type {number}
   */
  organizationId: number

  /**
   * 用户实名状态
   * @type {number}
   */
  isRealName: number

  /**
   * openId
   * @type {string}
   */
  openId: string

  /**
   * 用户手机号码
   * @type {string}
   */
  phone: string

  /**
   * token身份校验令牌
   * @type {string}
   */
  token: string
}

/**
 * 登录失败 一般用于获取openId
 * @interface
 */
export interface LoginFail {
  /**
    * openId
    */
  openId: string
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
// 实名认证(实名认证身份证返回信息)
export interface RealName {
  name: string
  idCard: string
}
/**
 * 实名认证身份证背面照
 */
export interface RealNameBack {
  /**
   * 所在派出所
   * @type {string}
   */
  authority : string

  /**
   * 身份证有效期
   * @type {string}
   */
  timelimit : string
}