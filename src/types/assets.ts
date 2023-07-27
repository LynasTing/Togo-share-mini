// 用户电池信息
export interface UserBattery {
  batteryId: string,
  typeName: string,
  capacity: string,
  ctime: string
}
// 押金记录
export interface DepositRecords {
  date: string
  depositType: string
  money: string
  orderNumber: string
}
// 押金可选类型
export interface DepositPay {
  depositMoney: number
  batteryTypeName: string
  id: number
}
// 我的优惠券
export interface MyCoupon {
  /**
   * @type 0兑换券 1现金券 2满减券 3折扣券
   */
  /**
   * @status 0 未使用 1已使用 2已过期
   */
  number: number
  couponId: number
  type: number
  status: number
  effectiveDay: number
  discount?: string
  useIllustrate: string
  money?: string
}
// 我的套餐
export interface MyCombo {
  /**
   * @status 套餐状态:  0 未开启 1 使用中 2 已结束
   */
  /**
   * @comboType 套餐类型 0 限次不限时 1 限次又限时 2 不限次限时 3 限时限次套餐(一天一次)
   */
  comboInfo: string
  comboType: number
  status: number
  dayTime: number
  eTime: string
}
export type TradingRecordType = {
  /**
   * 金额
   * @type {string}
   */
  money: string

  /**
   * 名称
   * @type {string}
   */
  name: string

  /**
   * 时间
   * @type {string}
   */
  time: string

  /**
   * 交易类型 0 支出 1收入
   * @type {number}
   */
  type: string

  /**
   * 类型说明
   * @type {string}
   */
  typeText: string
}
/**
 * 交易记录接口
 * @interface
 */
export interface TradingRecord {
  total: number
  list: TradingRecordType[]
}

