/**
 * 租赁记录
 * @interface
 */
export interface LeaseRecord {
  /**
   * 租用时间
   * @type {string}
   */
  ctime: string

  /**
   * 订单编号
   * @type {string}
   */
  orderNumber: string

  /**
   * 订单状态 0 租赁中 1已结束
   * @type {number} 
   */
  status: number

  /**
   * 归还电池ID
   * @type {string}
   */
  returnBatteryId: string

  /**
   * 租用电池ID
   * @type {string}
   */
  getBatteryId: string

  /**
   * 租用机柜名
   * @type {string}
   */
  getCabinetName: string

  /**
   * 归还电池名
   * @type {string}
   */
  returnCabinetName: string

  /**
   * 归还时间
   * @type {string}
   */
  endTime: string
}

/**
 * 机柜基本信息
 * @interface
 */
export interface CabinetInfo {
  /**
   * uid
   * @type {string}
   */
  uid: string

  /**
   * 柜子名称
   * @type {string}
   */
  cabinetName: string

  /**
   * 柜子地址
   * @type {string}
   */
  address: string

  /**
   * 距用户距离
   * @type {number}
   */
  userFromDistance: number

  /**
   * 纬度
   * @type {number}
   */
  latitude: number

  /**
   * 经度
   * @type {number}
   */
  longitude: number

  list: {
    /**
     * 电池类型
     * @type {string}
     */
    name: string

    /**
     * 大于设置电量电池
     * @type {number}
     */
    noLessThanSoc: number

    /**
     * 可用电池数
     * @type {number}
     */
    useAbleNum: number
  }[]
}
// 机柜列表信息
export type CabinetsType =  {
  address: string
  name: string
  useAbleNum: string
  id: number
  distance: number
  latitude: number
  longitude: number
}
export interface Cabinet {
  list: CabinetsType[]
  total: number
}
// 列表详情
export interface CabinetDetail {
  boxId: string
  uid: string
  cabinetName: string
  address: string
  type: string
  batterySoc: string
  batteryName: string
  useAbleNum: string
  list: {
    name: string
    value: number
  }[]
  boxList: {
    type: string
    boxId: number
    batterySoc?: number | null
    batteryName: string
  }[]
}
// 地图Markers
export interface MapMarkersType {
  width: string
  height: string
  iconPath: string
  id: number
  latitude: number
  longitude: number
  
  /**
   * 是否参与点聚合
   * @type {boolean}
   */
  joinCluster: boolean
}
// 地图单个Markers卡片信息
export type MapCardType = {
  address: string
  cabinetName: string
  latitude: number
  longitude: number
  userFromDistance: number
  list: {
    name: string
    useAbleNum: number
  }[]
}