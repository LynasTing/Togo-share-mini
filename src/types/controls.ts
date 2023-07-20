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
  batteryStatus: string
}