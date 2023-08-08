/**
 * 可选的优惠券列表
 * @interface
 */
export interface SelectableCoupon {
  /**
   * 有效天数
   * @type {number}
   */
  effectiveDay: number

  /**
   * 优惠券id
   * @type {number}
   */
  couponId: number

  /**
   * 优惠券名称
   * @type {string}
   */
  name: string

  /**
   * 发放时间
   * @type {string}
   */
  ctime: string

  /**
   * 满减金额
   * @type {string}
   */
  limitationMoney: string

  /**
   * 0 兑换券 1 现金券 2 满减券 3 折扣券
   * @type {number}
   */
  type: number

  /**
   * 折扣
   * @type {string}
   */
  discount?: string

  /**
   * 金额
   * @type {string}
   */
  money?: string

  /**
   * 是否选中
   * @type {boolean}
   */
  showChoose?: boolean
}

/**
 * 我的优惠券
 * @interface
 */
export interface MyCoupon {
  /**
   * 优惠券限制使用电池
   * @type {string}
   */
  batteryTypeName?: string

  /**
   * 优惠券限制使用套餐
   * @type {string}
   */
  comboName?: string

  /**
   * 优惠券限制使用企业
   * @type {string}
   */
  enterpriseName?: string

  /**
   * 优惠券限制使用地区
   * @type {string}
   */
  organizationName?: string

  /**
   * 优惠券名称
   * @type {string}
   */
  name: string

  /**
   * 0 兑换券 1 现金券 2 满减券 3 折扣券
   * @type {number}
   */
  type: number

  /**
   * 0 未使用 1 已使用 2 已过期
   * @type {number} 
   */
  status: number

  /**
   * 可使用次数
   * @type {number} 
   */
  number: number

   /**
   * 优惠券ID
   * @type {number} 
   */
  couponId: number
  
  /**
   * 有效天数
   * @type {number} 
   */
  effectiveDay: number

  /**
   * 折扣
   * @type {string}
   */
  discount?: string

  /**
   * 使用门槛
   * @type {string}
   */
  limitationMoney: string

  /**
   * 使用规则
   * @type {string}
   */
  useIllustrate: string

  /**
   * 金额
   * @type {string}
   */
  money?: string
}