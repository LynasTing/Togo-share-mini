/**
 * 用户电池信息
 * @interface
 */
export interface UserBattery {
  /**
   * 电池id
   * @type {string}
   */
  batteryId: string

  /**
   * 电池类型
   * @type {string}
   */
  typeName: string

  /**
   * 电池容量
   * @type {string}
   */
  capacity: string

  /**
   * 租用时间
   * @type {string}
   */
  ctime: string
}