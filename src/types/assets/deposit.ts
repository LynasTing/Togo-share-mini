/**
 * 押金记录
 * @interface
 */
export interface DepositRecords {
  /**
   * 订单号
   * @type {string}
   */
  orderNumber: string

  /**
   * 时间
   * @type {string}
   */
  date: string
  
  /**
   * 押金状态
   * @type {string}
   */
  depositTypeText: string

  /**
   * 金额
   * @type {string}
   */
  money: string
}

export type UnpaidOrderType = {
  /**
   * 订单id
   */
   id: number

  /**
   * 订单编号
   * @type {string}
   */
  orderNumber: string

  /**
    * 租赁时间
    * @type {string}
    */
  ctime: string

  /**
    * 结束时间
    * @type {string}
    */
  endTime: string

  /**
    * 订单金额
    * @type {string}
    */
  money: string
} 

/**
 * 待支付订单
 * @interface
 */
export interface UnpaidOrder {
  /**
   * 总金额
   */
  totalMoney: string

  /**
   * 总数
   */
  total: number
  list: UnpaidOrderType[]
}

/**
 * 可缴纳的押金列表
 * @interface
 */
export interface DepositPay {
  /**
   * 金额
   * @type {string}
   */
  depositMoney: number

  /**
   * 电池类型名称
   * @type {string}
   */
  batteryTypeName: string

  /**
   * 押金id
   * @type {number}
   */
  id: number
}

/**
 * 用户押金
 * @interface
 */
export interface UserDeposit {
  /**
   * 当前押金余额
   * @type {string}
   */
  money: string

   /**
   * 当前押金订单号
   * @type {string}
   */
  orderNumber: string

   /**
   * 当前押金 1 已缴纳 2 退回中 3 已退回
   * @type {string}
   */
  status: number
}