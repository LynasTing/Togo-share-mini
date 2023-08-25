// 租赁/归还回调轮询
export interface batteryCtrlType {
  typeName: string
  batteryId: string
  ctime: string
  cabinetName: string
  status: number
}
// 用户电池状态
export interface BatteryStatus {
  /**
   * 拥有电池状态
   * @type {string} '0' 拥有电池但未领取 '1' 已领取电池 '0' 电池已退押金未退
   */
  batteryStatus: string
}
export type CityListType = string[]
export type CityIndexType = string[]
/**
 * 全国城市列表
 * @interface
 */
export interface CityList {
 /**
   * 城市
   * @type {Array<string>}
   */
  data: string[]
  /**
   * 索引首字母
   * @type {string}
   */
  list: string[]
}

/**
 * 分享
 * @interface
 */
