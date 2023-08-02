/**
 * 我的套餐
 * @interface
 */
export interface MyCombo {
  /**
   * 套餐状态:  0 未开启 1 使用中 2 已结束
   * @type {number}
   */
  status: number

  /**
   * 套餐类型 0 限次不限时 1 限次又限时 2 不限次限时 3 限时限次套餐(一天一次)
   * @type {number}
   */
  comboType: number

  /**
   * 套餐名称
   * @type {string}
   */
  comboInfo: string

  /**
   * 可用天数
   * @type {number}
   */
  dayTime: number

  /**
   * 结束时间
   * @type {string}
   */
  eTime: string
}

/**
 * 套餐列表
 * @interface
 */
export interface ComboList {
  /**
   * 套餐id
   * @type {number}
   */
  id: number

  /**
   * 金额
   * @type {string}
   */
  comboMoney: string

  /**
   * 折后价
   * @type {string}
   */
  discountedPrice: string

  /**
   * 套餐类型
   * @type {number}
   */
  comboType: number

  /**
   * 有效期
   * @type {number}
   */
  comboValidTime: number

  /**
   * 套餐可用次数
   * @type {string}
   */
  comboCount: string

  /**
   *  套餐信息
   * @type {string}
   */
  comboName: string
}