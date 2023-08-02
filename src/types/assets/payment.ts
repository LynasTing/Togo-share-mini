/**
 * 交易记录类型
 * @typedef
 */
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

/**
 * 微信支付接口回调
 * @interface
 */
export interface WxPay {
  /**
   * 前端用不到，但是后端返回了
   * @type {string}
   */
  appId: string

  /**
   * 支付金额(此时的值 x 100 了)
   * @type {string}
   */
  money: string

  /**
   * 随机字符串
   * @type {string}
   */
  nonceStr: string

  /**
   * 未知
   * @type {string}
   */
  packageInfo: string

  /**
   * 签名
   * @type {string}
   */
  paySign: string

  /**
   * 签名算法，应与后台下单时的值一致
   * @type {string}
   */
  signType: string

  /**
   * 时间戳(当前)
   * @type {string}
   */
  timeStamp: string

  /**
   * 内部订单号
   * @type {string}
   */
  tradeNo: string
}
