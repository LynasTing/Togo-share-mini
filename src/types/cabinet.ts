
export interface LeaseRecord {
  /**
   * @orderNumber 订单编号
   * @getBatteryId 租用电池ID
   * @getCabinetName 租用机柜
   * @ctime 租用时间
   * @returnBatteryId 归还电池ID
   * @returnCabinetName 归还机柜
   * @endTime 归还时间
   * @status 租赁状态
   */
  ctime: string
  orderNumber: string
  status: number
  returnBatteryId: string
  getBatteryId: string
  getCabinetName: string
  returnCabinetName: string
  endTime: string
}
// 机柜基本信息
export interface CabinetInfo {
  /**
   * @uid 柜子uid
   * @cabinetName 柜子名称
   * @address 柜子地址
   * @name 电池类型
   * @userFromDistance 到用户距离
   * @useAbleNum 可用电池数
   * @noLessThanSoc 大于设置电量电池
   */
  uid: string
  cabinetName: string
  address: string
  userFromDistance: number
  latitude: number
  longitude: number
  list: {
    name: string
    noLessThanSoc: number
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